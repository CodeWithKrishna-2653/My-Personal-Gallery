/*--------------------
Vars
--------------------*/
let progress = 50
let startX = 0
let active = 0
let isDown = false

/*--------------------
Contants
--------------------*/
const speedWheel = 0.02
const speedDrag = -0.1

/*--------------------
Get Z
--------------------*/
const getZindex = (array, index) => (array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i)))

/*--------------------
Items
--------------------*/
const $items = document.querySelectorAll('.carousel-item')
const $cursors = document.querySelectorAll('.cursor')

const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index]
  item.style.setProperty('--zIndex', zIndex)
  item.style.setProperty('--active', (index-active)/$items.length)
}

/*--------------------
Animate
--------------------*/
const animate = () => {
  progress = Math.max(0, Math.min(progress, 100))
  active = Math.floor(progress/100*($items.length-1))
  
  $items.forEach((item, index) => displayItems(item, index, active))
}
animate()

/*--------------------
Click on Items
--------------------*/
$items.forEach((item, i) => {
  item.addEventListener('click', () => {
    progress = (i/$items.length) * 100 + 10
    animate()
  })
})

/*--------------------
Handlers
--------------------*/
const handleWheel = e => {
  const wheelProgress = e.deltaY * speedWheel
  progress = progress + wheelProgress
  animate()
}

const handleMouseMove = (e) => {
  if (e.type === 'mousemove') {
    $cursors.forEach(($cursor) => {
      $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    })
  }
  if (!isDown) return
  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
  const mouseProgress = (x - startX) * speedDrag
  progress = progress + mouseProgress
  startX = x
  animate()
}

const handleMouseDown = e => {
  isDown = true
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0
}

const handleMouseUp = () => {
  isDown = false
}

// Password Security System


function checkPassword() {
    const correctPassword = "Krishna.Ayushi"; // Replace with your desired password
    const blackScreen = document.getElementById("black-screen");
    const passwordModal = document.getElementById("password-modal");
    const passwordInput = document.getElementById("password-input");
    const submitButton = document.getElementById("submit-password");
    const errorMessage = document.getElementById("error-message");

    // Show the password modal
    passwordModal.style.display = "flex";

    // Handle password submission
    submitButton.addEventListener("click", () => {
        const userPassword = passwordInput.value;

        if (userPassword === correctPassword) {
            blackScreen.classList.add("hidden"); // Hide the black screen
            passwordModal.style.display = "none"; // Hide the modal
        } else {
            errorMessage.textContent = "Incorrect password. Please try again.";
            errorMessage.style.display = "block";
        }
    });
}

// Call the password check function when the page loads
window.onload = checkPassword;

/*--------------------
Listeners
--------------------*/
document.addEventListener('mousewheel', handleWheel)
document.addEventListener('mousedown', handleMouseDown)
document.addEventListener('mousemove', handleMouseMove)
document.addEventListener('mouseup', handleMouseUp)
document.addEventListener('touchstart', handleMouseDown)
document.addEventListener('touchmove', handleMouseMove)
document.addEventListener('touchend', handleMouseUp)
document.addEventListener("DOMContentLoaded", () => {
    const carouselItems = document.querySelectorAll(".carousel-item");

    let activeIndex = 0;
    carouselItems.forEach((item, index) => {
        if (item.querySelector(".carousel-box").classList.contains("active")) {
            activeIndex = index;
        }
    });

    progress = (activeIndex / (carouselItems.length - 1)) * 100;
    
    animate();
});