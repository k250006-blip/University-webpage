// === Interactive Feature 1: Form Validation ===
const contactForm = document.getElementById("contactForm")

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form values
    const name = document.getElementById("name").value.trim()
    const email = document.getElementById("email").value.trim()
    const subject = document.getElementById("subject").value
    const message = document.getElementById("message").value.trim()

    // Clear previous error messages
    document.getElementById("nameError").textContent = ""
    document.getElementById("emailError").textContent = ""
    document.getElementById("subjectError").textContent = ""
    document.getElementById("messageError").textContent = ""

    let isValid = true

    // Name validation
    if (name.length < 3) {
      document.getElementById("nameError").textContent = "Name must be at least 3 characters"
      isValid = false
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      document.getElementById("emailError").textContent = "Please enter a valid email"
      isValid = false
    }

    // Subject validation
    if (!subject) {
      document.getElementById("subjectError").textContent = "Please select a subject"
      isValid = false
    }

    // Message validation
    if (message.length < 10) {
      document.getElementById("messageError").textContent = "Message must be at least 10 characters"
      isValid = false
    }

    // If form is valid, show success message
    if (isValid) {
      const submitMessage = document.getElementById("submitMessage")
      submitMessage.textContent = "✓ Message sent successfully! We will get back to you soon."
      submitMessage.style.background = "#d1fae5"
      submitMessage.style.color = "#065f46"
      submitMessage.style.display = "block"

      // Reset form
      contactForm.reset()

      // Hide success message after 5 seconds
      setTimeout(() => {
        submitMessage.style.display = "none"
      }, 5000)
    }
  })
}

// === Interactive Feature 2: Button Color Change on Home Page ===
const exploreBtn = document.getElementById("exploreBtn")

if (exploreBtn) {
  const colors = ["#7c3aed", "#ef4444", "#10b981", "#f59e0b", "#06b6d4"]
  let colorIndex = 0

  exploreBtn.addEventListener("click", function () {
    colorIndex = (colorIndex + 1) % colors.length
    this.style.backgroundColor = colors[colorIndex]

    // Show alert with color name
    const colorNames = ["Purple", "Red", "Green", "Amber", "Cyan"]
    alert(`Button color changed to ${colorNames[colorIndex - 1]}! 🎨\n\nReady to explore our programs?`)
  })

  // Add hover effect
  exploreBtn.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.05)"
  })

  exploreBtn.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)"
  })
}

// === Additional Feature: Smooth Scrolling for Navigation Links ===
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href")
    if (href !== "#") {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        })
      }
    }
  })
})

// === Feature 3: Counter Animation for Statistics ===
function animateCounter(element, target, duration = 2000) {
  let start = 0
  const increment = target / (duration / 16)

  const timer = setInterval(() => {
    start += increment
    if (start >= target) {
      element.textContent = target.toLocaleString() + "+"
      clearInterval(timer)
    } else {
      element.textContent = Math.floor(start).toLocaleString() + "+"
    }
  }, 16)
}

// Trigger counter animation when page loads
window.addEventListener("load", () => {
  const studentCount = document.getElementById("studentCount")
  if (studentCount) {
    animateCounter(studentCount, 5000)
  }
})

// === Active Navigation Link Highlighting ===
const currentPage = window.location.pathname.split("/").pop() || "index.html"
document.querySelectorAll(".nav-links a").forEach((link) => {
  const href = link.getAttribute("href")
  if (href === currentPage) {
    link.classList.add("active")
  } else {
    link.classList.remove("active")
  }
})

// === Scroll Animation for Elements ===

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

document
  .querySelectorAll(
    ".program-card, .stat-card, .team-member, .info-card, .value-card, .testimonial-card, .faq-item"
  )
  .forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(element)
  })

// === Simplified Image Slider with Automatic Rotation ===
let currentSlide = 0
const slides = document.querySelectorAll(".slide")
const dots = document.querySelectorAll(".slider-dot")

function showSlide(n) {
  slides.forEach((slide) => slide.classList.remove("active"))
  dots.forEach((dot) => dot.classList.remove("active"))

  currentSlide = (n + slides.length) % slides.length
  slides[currentSlide].classList.add("active")
  dots[currentSlide].classList.add("active")
}

function changeSlide(direction) {
  showSlide(currentSlide + direction)
}

function goToSlide(n) {
  showSlide(n)
}

// Auto-rotate slides every 5 seconds
setInterval(() => changeSlide(1), 5000)

// === Simplified Popups for News/Events/Updates ===
class PopupManager {
  constructor() {
    this.popups = {
      news: {
        title: "📰 Latest News",
        content:
          "Premier University ranked #18 in National University Rankings 2025! Celebrating excellence in education worldwide.",
      },
      events: {
        title: "🎉 Upcoming Events",
        content:
          "Join us for the Annual University Gala on February 14, 2025. Meet faculty, alumni, and network with fellow students!",
      },
    }
    this.init()
  }

  init() {
    this.createNotification()
    this.showRandomPopup()
  }

  createNotification() {
    const notifHtml = `
      <div class="notification-bar" id="notificationBar">
        <span>Important: Spring 2025 enrollment now open. Limited spots available.</span>
        <button style="background: none; border: none; color: inherit; cursor: pointer; font-size: 1.2rem;" onclick="document.getElementById('notificationBar').classList.add('hidden')">✕</button>
      </div>
    `
    document.body.insertAdjacentHTML("afterbegin", notifHtml)
  }

  showRandomPopup() {
    setTimeout(() => {
      const keys = Object.keys(this.popups)
      const popup = this.popups[keys[Math.floor(Math.random() * keys.length)]]
      alert(`${popup.title}\n\n${popup.content}`)
    }, 3000)
  }
}

// Initialize on page load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new PopupManager()
  })
} else {
  new PopupManager()
}
