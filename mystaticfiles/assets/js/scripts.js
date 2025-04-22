document.addEventListener("DOMContentLoaded", () => {
    // Navbar functionality
    const navbar = document.getElementById("navbar")
    const navbarToggle = document.getElementById("navbar-toggle")
    const navLinks = document.querySelectorAll(".nav-link")
    const sections = document.querySelectorAll("section")
    const backToTop = document.getElementById("back-to-top")

    // Toggle mobile menu
    navbarToggle.addEventListener("click", function () {
      this.classList.toggle("active")
      navbar.classList.toggle("mobile-open")
      document.body.classList.toggle("no-scroll")
    })

    // Make sure the logo is visible in mobile menu
    navbarToggle.addEventListener("click", function () {
      this.classList.toggle("active")
      navbar.classList.toggle("mobile-open")
      document.body.classList.toggle("no-scroll")
    })

    // Close mobile menu when clicking on a nav link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navbarToggle.classList.remove("active")
        navbar.classList.remove("mobile-open")
        document.body.classList.remove("no-scroll")
      })
    })

    // Change navbar on scroll - simplified to only handle back-to-top button
    window.addEventListener("scroll", () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Only handle back-to-top button visibility
      if (scrollTop <= 50) {
        if (backToTop) backToTop.classList.remove("visible");
      } else {
        if (backToTop) backToTop.classList.add("visible");
      }

      // Navbar is always visible with our new CSS

      // Store current scroll position for future reference

      // Highlight active section in navbar
      let current = ""

      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        // Get section position

        if (pageYOffset >= sectionTop - 150) {
          current = section.getAttribute("id")
        }
      })

      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active")
        }
      })
    })

    // Carousel functionality
    const carouselSlides = document.querySelector(".carousel-slides")
    const slides = document.querySelectorAll(".carousel-slide")
    const prevButton = document.querySelector(".carousel-prev")
    const nextButton = document.querySelector(".carousel-next")
    const indicators = document.querySelectorAll(".carousel-indicator")

    let currentIndex = 0
    const slideCount = slides.length

    // Set initial position
    updateCarousel()

    // Event listeners
    prevButton.addEventListener("click", goToPrevious)
    nextButton.addEventListener("click", goToNext)

    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        currentIndex = index
        updateCarousel()
      })
    })

    // Auto play
    let interval = setInterval(goToNext, 5000)

    // Reset interval on manual navigation
    function resetInterval() {
      clearInterval(interval)
      interval = setInterval(goToNext, 5000)
    }

    function goToPrevious() {
      currentIndex = currentIndex === 0 ? slideCount - 1 : currentIndex - 1
      updateCarousel()
      resetInterval()
    }

    function goToNext() {
      currentIndex = currentIndex === slideCount - 1 ? 0 : currentIndex + 1
      updateCarousel()
      resetInterval()
    }

    function updateCarousel() {
      // Update slides position
      carouselSlides.style.transform = `translateX(-${currentIndex * 100}%)`

      // Update indicators
      indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
          indicator.classList.add("active")
        } else {
          indicator.classList.remove("active")
        }
      })
    }

    // Packages Carousel functionality
    const packagesCarousel = document.querySelector(".packages-carousel")
    const packageCards = document.querySelectorAll(".package-card-horizontal")
    const packagesPrevBtn = document.querySelector(".packages-prev")
    const packagesNextBtn = document.querySelector(".packages-next")

    if (packagesCarousel && packageCards.length > 0) {
      let currentPackageIndex = 0
      const packageCount = packageCards.length

      // Set initial position
      updatePackagesCarousel()

      // Event listeners for navigation buttons
      if (packagesPrevBtn) {
        packagesPrevBtn.addEventListener("click", goToPreviousPackage)
      }

      if (packagesNextBtn) {
        packagesNextBtn.addEventListener("click", goToNextPackage)
      }

      function goToPreviousPackage() {
        currentPackageIndex = currentPackageIndex === 0 ? packageCount - 1 : currentPackageIndex - 1
        updatePackagesCarousel()
      }

      function goToNextPackage() {
        currentPackageIndex = currentPackageIndex === packageCount - 1 ? 0 : currentPackageIndex + 1
        updatePackagesCarousel()
      }

      function updatePackagesCarousel() {
        // Scroll to the current package
        packageCards[currentPackageIndex].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" })
      }
    }

    // Documentation Gallery Filter
    const filterButtons = document.querySelectorAll(".filter-button")
    const documentationCards = document.querySelectorAll(".documentation-card")

    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"))

        // Add active class to clicked button
        this.classList.add("active")

        // Get filter value
        const filterValue = this.getAttribute("data-filter")

        // Filter cards
        documentationCards.forEach((card) => {
          if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
            card.style.display = "block"
          } else {
            card.style.display = "none"
          }
        })
      })
    })

    // Contact form handling
    const contactForm = document.getElementById("contact-form")
    const submitBtn = document.getElementById("submit-btn")
    const successMessage = document.getElementById("form-success-message")

    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()

        // Change button text
        submitBtn.textContent = "Sending..."
        submitBtn.disabled = true

        // Simulate form submission (in a real application, you would send data to a server)
        setTimeout(() => {
          // Show success message
          successMessage.style.display = "block"

          // Reset form
          contactForm.reset()

          // Reset button
          submitBtn.textContent = "Send Message"
          submitBtn.disabled = false

          // Hide success message after 5 seconds
          setTimeout(() => {
            successMessage.style.display = "none"
          }, 5000)
        }, 1500)
      })
    }

    // Newsletter form handling
    const newsletterForm = document.querySelector(".newsletter-form")

    if (newsletterForm) {
      newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault()

        // Get the email input
        const emailInput = newsletterForm.querySelector('input[type="email"]')

        // Simple validation
        if (emailInput.value.trim() !== "") {
          // In a real application, you would send this to a server
          alert("Terima kasih telah berlangganan buletin kami!")

          // Reset form
          newsletterForm.reset()
        }
      })
    }

    // Set current year in footer
    const currentYearElement = document.getElementById("current-year")
    if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear()
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()

        const targetId = this.getAttribute("href")

        if (targetId === "#") return

        const targetElement = document.querySelector(targetId)

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100, // Offset for fixed header
            behavior: "smooth",
          })
        }
      })
    })

    // Back to top button
    backToTop.addEventListener("click", (e) => {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  })

