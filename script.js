document.addEventListener("DOMContentLoaded", () => {
    // Loading Animation
    const loader = document.getElementById("loader")

    // Hide loader after page loads
    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.classList.add("hidden")
            // Remove loader from DOM after animation
            setTimeout(() => {
                loader.remove()
            }, 500)
        }, 1000)
    })

    // Navbar Scroll Effect
    const navbar = document.getElementById("navbar")
    let lastScrollY = window.scrollY

    window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY

        if (currentScrollY > 50) {
            navbar.classList.add("scrolled")
        } else {
            navbar.classList.remove("scrolled")
        }

        lastScrollY = currentScrollY
    })

    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById("mobileMenuToggle")
    const navLinks = document.querySelector(".nav-links")

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active")
            mobileMenuToggle.classList.toggle("active")
        })
    }

    // Phone Carousel Functionality
    const phoneStack = document.getElementById("phoneStack")
    const prevBtn = document.getElementById("prevBtn")
    const nextBtn = document.getElementById("nextBtn")
    const phones = document.querySelectorAll(".carousel-phone")

    let currentIndex = 0
    const totalPhones = phones.length

    function updatePhonePositions() {
        phones.forEach((phone, index) => {
            // Calculate relative position from current active phone
            const relativeIndex = (index - currentIndex + totalPhones) % totalPhones

            // Remove active class from all phones
            phone.classList.remove("active")

            // Set data-index for CSS positioning
            phone.setAttribute("data-index", relativeIndex)

            // Add active class to current phone
            if (relativeIndex === 0) {
                phone.classList.add("active")
            }
        })
    }

    function nextPhone() {
        currentIndex = (currentIndex + 1) % totalPhones
        updatePhonePositions()
    }

    function prevPhone() {
        currentIndex = (currentIndex - 1 + totalPhones) % totalPhones
        updatePhonePositions()
    }

    // Event listeners for carousel controls
    if (nextBtn) {
        nextBtn.addEventListener("click", nextPhone)
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", prevPhone)
    }

    // Click on phones to make them active
    phones.forEach((phone, index) => {
        phone.addEventListener("click", () => {
            currentIndex = index
            updatePhonePositions()
        })
    })

    // Auto-rotate carousel every 4 seconds
    setInterval(() => {
        nextPhone()
    }, 4000)

    // Initialize carousel positions
    updatePhonePositions()

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault()
            const target = document.querySelector(this.getAttribute("href"))
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                })
            }
        })
    })

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible")
                observer.unobserve(entry.target)
            }
        })
    }, observerOptions)

    // Observe all elements with animation classes
    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
        observer.observe(el)
    })

    // Watch Demo Button
    const watchDemoBtn = document.getElementById("watchDemo")
    if (watchDemoBtn) {
        watchDemoBtn.addEventListener("click", () => {
            // Create modal or redirect to demo video
            showDemoModal()
        })
    }

    // Demo Modal Function
    function showDemoModal() {
        // Create modal overlay
        const modal = document.createElement("div")
        modal.className = "demo-modal"
        modal.innerHTML = `
            <div class="demo-modal-content">
                <div class="demo-modal-header">
                    <h3>عرض توضيحي للتطبيق</h3>
                    <button class="demo-modal-close">&times;</button>
                </div>
                <div class="demo-modal-body">
                    <p>شاهد كيف يعمل تطبيق رزنامة الولاية</p>
                    <div class="demo-screenshots">
                        <img src="screen1.jpg" alt="شاشة 1" class="demo-img active">
                        <img src="screen2.jpg" alt="شاشة 2" class="demo-img">
                        <img src="screen3.jpg" alt="شاشة 3" class="demo-img">
                        <img src="screen4.jpg" alt="شاشة 4" class="demo-img">
                    </div>
                    <div class="demo-controls">
                        <button class="demo-prev">السابق</button>
                        <div class="demo-indicators">
                            <span class="demo-dot active" data-slide="0"></span>
                            <span class="demo-dot" data-slide="1"></span>
                            <span class="demo-dot" data-slide="2"></span>
                            <span class="demo-dot" data-slide="3"></span>
                        </div>
                        <button class="demo-next">التالي</button>
                    </div>
                </div>
            </div>
        `

        // Add modal styles
        const modalStyles = `
            <style>
                .demo-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    opacity: 0;
                    animation: fadeIn 0.3s ease forwards;
                }
                .demo-modal-content {
                    background: white;
                    border-radius: 1rem;
                    max-width: 600px;
                    width: 90%;
                    max-height: 80vh;
                    overflow: hidden;
                    transform: scale(0.9);
                    animation: scaleIn 0.3s ease forwards;
                }
                .demo-modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.5rem;
                    border-bottom: 1px solid #e5e7eb;
                }
                .demo-modal-close {
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #6b7280;
                }
                .demo-modal-body {
                    padding: 1.5rem;
                    text-align: center;
                }
                .demo-screenshots {
                    position: relative;
                    height: 300px;
                    margin: 1rem 0;
                    overflow: hidden;
                    border-radius: 0.5rem;
                }
                .demo-img {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                .demo-img.active {
                    opacity: 1;
                }
                .demo-controls {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 1rem;
                }
                .demo-prev, .demo-next {
                    background: var(--primary);
                    color: white;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 0.5rem;
                    cursor: pointer;
                }
                .demo-indicators {
                    display: flex;
                    gap: 0.5rem;
                }
                .demo-dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: #d1d5db;
                    cursor: pointer;
                    transition: background 0.3s ease;
                }
                .demo-dot.active {
                    background: var(--primary);
                }
                @keyframes fadeIn {
                    to { opacity: 1; }
                }
                @keyframes scaleIn {
                    to { transform: scale(1); }
                }
            </style>
        `

        document.head.insertAdjacentHTML("beforeend", modalStyles)
        document.body.appendChild(modal)

        // Modal functionality
        let currentSlide = 0
        const slides = modal.querySelectorAll(".demo-img")
        const dots = modal.querySelectorAll(".demo-dot")
        const prevBtn = modal.querySelector(".demo-prev")
        const nextBtn = modal.querySelector(".demo-next")
        const closeBtn = modal.querySelector(".demo-modal-close")

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle("active", i === index)
            })
            dots.forEach((dot, i) => {
                dot.classList.toggle("active", i === index)
            })
            currentSlide = index
        }

        prevBtn.addEventListener("click", () => {
            currentSlide = currentSlide > 0 ? currentSlide - 1 : slides.length - 1
            showSlide(currentSlide)
        })

        nextBtn.addEventListener("click", () => {
            currentSlide = currentSlide < slides.length - 1 ? currentSlide + 1 : 0
            showSlide(currentSlide)
        })

        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => showSlide(index))
        })

        closeBtn.addEventListener("click", () => {
            modal.style.opacity = "0"
            setTimeout(() => modal.remove(), 300)
        })

        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.style.opacity = "0"
                setTimeout(() => modal.remove(), 300)
            }
        })

        // Auto-advance slides
        setInterval(() => {
            currentSlide = currentSlide < slides.length - 1 ? currentSlide + 1 : 0
            showSlide(currentSlide)
        }, 3000)
    }

    // Parallax Effect for Hero Section
    window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset
        const parallaxElements = document.querySelectorAll(".floating-element")

        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + index * 0.1
            element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`
        })
    })

    // Phone Mockup Hover Effects
    document.querySelectorAll(".phone-mockup-modern").forEach((phone) => {
        phone.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-10px) scale(1.05)"
        })

        phone.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0) scale(1)"
        })
    })

    // Feature Cards Stagger Animation
    const featureCards = document.querySelectorAll(".feature-card")
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`
    })

    // Add loading states for images
    document.querySelectorAll("img").forEach((img) => {
        img.addEventListener("load", function () {
            this.style.opacity = "1"
        })

        img.addEventListener("error", function () {
            this.style.opacity = "0.5"
            console.warn("Failed to load image:", this.src)
        })
    })

    // Keyboard navigation for accessibility
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            const modal = document.querySelector(".demo-modal")
            if (modal) {
                modal.style.opacity = "0"
                setTimeout(() => modal.remove(), 300)
            }
        }

        if (e.key === "ArrowLeft") {
            prevPhone()
        } else if (e.key === "ArrowRight") {
            nextPhone()
        }
    })

    console.log("[v0] Modern landing page with carousel initialized successfully")
})

// Utility function for smooth animations
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3)
}

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle
    return function () {
        const args = arguments

        if (!inThrottle) {
            func.apply(this, args)
            inThrottle = true
            setTimeout(() => (inThrottle = false), limit)
        }
    }
}

// Apply throttling to scroll events
window.addEventListener(
    "scroll",
    throttle(() => {
        // Scroll-based animations go here
    }, 16),
) // ~60fps
