const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true,
    smartphone: {
        smooth: true
    },
    tablet: {
        smooth: true
    }
});
function videoAnime(){let       videoIcon=document.  querySelector("#video-container")
videoButton=document.querySelector("#play")
 videoIcon.addEventListener("mouseenter",function() {
    gsap.to(videoButton,{scale:1,opacity:1})
})
 videoIcon.addEventListener("mouseleave",function() {
    gsap.to(videoButton,{scale:0,opacity:0})
})
 videoIcon.addEventListener("mousemove",function(e) {
    gsap.to(videoButton,{left:e.x,top:e.y})
})}
videoAnime()
function loadinganimation() {
  gsap.to("#page1 h1", {
    y: 0,
    delay: 0.3,
    opacity: 1,
    duration: 1.2,
    ease: "power4.out",
    stagger: 0.25
  })
  gsap.to("#page1 #video-container", {
    scale:0.9,
    delay: 0.3,
    opacity: 1,
    duration: 1.2,
    
    stagger: 0.25
  })
}
loadinganimation();
const cursor = document.querySelector("#cursor");

// Find the main container for our products with the ID "page3"
const page3Container = document.querySelector("#page3");

// Find ALL the product boxes that have the class "child"
const allProducts = document.querySelectorAll(".child");


// --- Step 2: Create a function to make the circle follow the mouse ---

function setupCursorFollow() {
  // Center the circle on the mouse pointer. 
  // xPercent: -50 moves it left by 50% of its own width.
  gsap.set(cursor, { xPercent: -50, yPercent: -50 });

  // Listen for the "mousemove" event on the entire window.
  window.addEventListener("mousemove", function(event) {
    // 'event.clientX' is the mouse's horizontal position (left/right)
    // 'event.clientY' is the mouse's vertical position (up/down)

    // Use gsap.set() to instantly "teleport" the circle to the mouse's position.
    // We use .set() instead of .to() to avoid any lag or delay.
    gsap.set(cursor, {
      x: event.clientX,
      y: event.clientY
    });
  });
}


// --- Step 3: Create a function to control when the circle is visible ---

function setupCursorVisibility() {
  // When the mouse pointer ENTERS the product area (#page3)...
  page3Container.addEventListener("mouseenter", function() {
    // ...animate the circle to become visible.
    gsap.to(cursor, {
      scale: 1,      // Animate its size to normal
      opacity: 1     // Animate it from transparent to fully visible
    });
  });

  // When the mouse pointer LEAVES the product area (#page3)...
  page3Container.addEventListener("mouseleave", function() {
    // ...animate the circle to become invisible.
    gsap.to(cursor, {
      scale: 0,      // Animate its size to zero
      opacity: 0     // Animate it to be fully transparent
    });
  });
}


// --- Step 4: Create a function for the cool 3D product hover effect ---

function setupProductHoverEffects() {
  // We need to do this for EACH product, so we use a loop.
  allProducts.forEach(function(product) {

    // When the mouse ENTERS a specific product box...
    product.addEventListener("mouseenter", function() {
      // ...make the pink cursor disappear.
      gsap.to(cursor, { scale: 0 });
    });

    // When the mouse LEAVES that product box...
    product.addEventListener("mouseleave", function() {
      // ...make the pink cursor reappear.
      gsap.to(cursor, { scale: 1 });

      // ...and reset the product image back to its normal, flat state.
      const imageInside = product.querySelector("img");
      gsap.to(imageInside, {
        transform: "rotateX(0deg) rotateY(0deg) scale(1)",
        duration: 0.5 // Make the reset smooth
      });
    });

    // When the mouse MOVES WHILE OVER that product box...
    product.addEventListener("mousemove", function(event) {
      // Find the image inside this specific product
      const imageInside = product.querySelector("img");
      
      // Get the size and position of the product box on the screen
      const boxPosition = product.getBoundingClientRect();
      
      // Calculate the mouse position from the center of the box (-0.5 to 0.5)
      const mouseX = (event.clientX - boxPosition.left) / boxPosition.width - 0.5;
      const mouseY = (event.clientY - boxPosition.top) / boxPosition.height - 0.5;
      
      // Animate the image to tilt based on the mouse position.
      // We multiply by 30 to control how much it tilts.
      gsap.to(imageInside, {
        transform: `scale(1.05) rotateX(${-mouseY * 30}deg) rotateY(${mouseX * 30}deg)`,
      });
    });
  });
}


// --- Step 5: Run all our functions to start the effects ---

setupCursorFollow();
setupCursorVisibility();
setupProductHoverEffects();
function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
locomotiveAnimation();
function navbarAnimation() {
  gsap.to("#svg1 svg", {
    transform: "translateY(-100%)",
    scrollTrigger: {
      trigger: "#page1",
      scroller: "#main",
      start: "top 0",
      end: "top -5%",
      scrub: true,
    },
  });
  gsap.to("#nav2 #link", {
    transform: "translateY(-100%)",
    opacity: 0,
    scrollTrigger: {
      trigger: "#page1",
      scroller: "#main",
      start: "top 0",
      end: "top -5%",
      scrub: true,
    },
  });
}
navbarAnimation()
