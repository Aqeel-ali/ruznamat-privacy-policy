document.addEventListener("DOMContentLoaded", () => {
    // Loading Animation Control
    const loader = document.getElementById("loader");
    if (loader) {
        window.addEventListener("load", () => {
            setTimeout(() => {
                loader.classList.add("hidden");
                setTimeout(() => {
                    loader.remove();
                }, 600);
            }, 800);
        });
    }

    // Navbar Scroll & Tinting Effect
    const navbar = document.getElementById("navbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 40) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        });
    }

    // Mobile Menu Overlay Toggle
    const mobileMenuToggle = document.getElementById("mobileMenuToggle");
    const navLinks = document.querySelector(".nav-links");

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            mobileMenuToggle.classList.toggle("active");
        });

        // Close menu when clicking links in drawer
        const linkItems = navLinks.querySelectorAll(".nav-link");
        linkItems.forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                mobileMenuToggle.classList.remove("active");
            });
        });
    }

    // 3D Phone Carousel Control
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const phones = document.querySelectorAll(".carousel-phone");

    let currentIndex = 0;
    const totalPhones = phones.length;

    function updatePhonePositions() {
        phones.forEach((phone, index) => {
            // Calculate circular offset relative to current active index
            const relativeIndex = (index - currentIndex + totalPhones) % totalPhones;

            phone.classList.remove("active");
            phone.setAttribute("data-index", relativeIndex);

            if (relativeIndex === 0) {
                phone.classList.add("active");
            }
        });
    }

    function nextPhone() {
        currentIndex = (currentIndex + 1) % totalPhones;
        updatePhonePositions();
    }

    function prevPhone() {
        currentIndex = (currentIndex - 1 + totalPhones) % totalPhones;
        updatePhonePositions();
    }

    if (nextBtn) nextBtn.addEventListener("click", nextPhone);
    if (prevBtn) prevBtn.addEventListener("click", prevPhone);

    // Make side phones clickable to transition focus
    phones.forEach((phone, index) => {
        phone.addEventListener("click", () => {
            currentIndex = index;
            updatePhonePositions();
        });
    });

    // Auto-rotation with pause on hover
    let carouselTimer = setInterval(nextPhone, 5000);
    const carouselContainer = document.querySelector(".phone-carousel");
    if (carouselContainer) {
        carouselContainer.addEventListener("mouseenter", () => {
            clearInterval(carouselTimer);
        });
        carouselContainer.addEventListener("mouseleave", () => {
            carouselTimer = setInterval(nextPhone, 5000);
        });
    }

    updatePhonePositions();

    // Mouse Parallax for Glowing Background Orbs
    document.addEventListener("mousemove", (e) => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;

        const orbs = document.querySelectorAll(".orb");
        orbs.forEach((orb, index) => {
            const factor = (index + 1) * 20; // Staggered movement speed
            orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });
    });

    // Smooth Navigation Scrolling with Offsets
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        });
    });

    // Intersection Observer for Premium Scroll Reveal Transitions
    const observerOptions = {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
        revealObserver.observe(el);
    });

    // Feature Cards Stagger Animation Delay Allocation
    const featureCards = document.querySelectorAll(".feature-card");
    featureCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 80}ms`;
    });

    // Watch Demo Modal Triggers
    const watchDemoBtn = document.getElementById("watchDemo");
    if (watchDemoBtn) {
        watchDemoBtn.addEventListener("click", () => {
            showDemoModal();
        });
    }

    // Modal Presentation Engine (Completely Emojiless!)
    function showDemoModal() {
        const modal = document.createElement("div");
        modal.className = "demo-modal";
        modal.innerHTML = `
            <div class="demo-modal-content">
                <div class="demo-modal-header">
                    <h3><i class="fa-solid fa-circle-play" style="color: var(--primary); margin-left: 0.5rem;"></i>عرض توضيحي للتطبيق</h3>
                    <button class="demo-modal-close" aria-label="إغلاق">&times;</button>
                </div>
                <div class="demo-modal-body">
                    <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 1.5rem;">تصفح واجهة تطبيق رزنامة الولاية المميزة</p>
                    <div class="demo-screenshots">
                        <img src="screen1.jpg" alt="شاشة 1" class="demo-img active">
                        <img src="screen2.jpg" alt="شاشة 2" class="demo-img">
                        <img src="screen3.jpg" alt="شاشة 3" class="demo-img">
                        <img src="screen4.jpg" alt="شاشة 4" class="demo-img">
                    </div>
                    <div class="demo-controls">
                        <button class="demo-prev"><i class="fa-solid fa-arrow-right" style="margin-left: 0.25rem;"></i>السابق</button>
                        <div class="demo-indicators">
                            <span class="demo-dot active" data-slide="0"></span>
                            <span class="demo-dot" data-slide="1"></span>
                            <span class="demo-dot" data-slide="2"></span>
                            <span class="demo-dot" data-slide="3"></span>
                        </div>
                        <button class="demo-next">التالي<i class="fa-solid fa-arrow-left" style="margin-right: 0.25rem;"></i></button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Force repaint then add opacity for transition
        setTimeout(() => {
            modal.style.opacity = "1";
            modal.querySelector(".demo-modal-content").style.transform = "scale(1)";
        }, 30);

        let currentSlide = 0;
        const slides = modal.querySelectorAll(".demo-img");
        const dots = modal.querySelectorAll(".demo-dot");
        const modalPrev = modal.querySelector(".demo-prev");
        const modalNext = modal.querySelector(".demo-next");
        const closeBtn = modal.querySelector(".demo-modal-close");

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle("active", i === index);
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle("active", i === index);
            });
            currentSlide = index;
        }

        modalPrev.addEventListener("click", () => {
            const index = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
            showSlide(index);
        });

        modalNext.addEventListener("click", () => {
            const index = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
            showSlide(index);
        });

        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => showSlide(index));
        });

        function destroyModal() {
            modal.style.opacity = "0";
            modal.querySelector(".demo-modal-content").style.transform = "scale(0.9)";
            setTimeout(() => modal.remove(), 300);
        }

        closeBtn.addEventListener("click", destroyModal);
        
        modal.addEventListener("click", (e) => {
            if (e.target === modal) destroyModal();
        });

        // Automatic slides cycling
        let modalInterval = setInterval(() => {
            const index = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
            showSlide(index);
        }, 3500);

        // Clear modal interval when closed
        closeBtn.addEventListener("click", () => clearInterval(modalInterval));
        modal.addEventListener("click", (e) => {
            if (e.target === modal) clearInterval(modalInterval);
        });
    }

    // Keyboard support for accessibility
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            const activeModal = document.querySelector(".demo-modal");
            if (activeModal) {
                activeModal.style.opacity = "0";
                activeModal.querySelector(".demo-modal-content").style.transform = "scale(0.9)";
                setTimeout(() => activeModal.remove(), 300);
            }
        }

        if (e.key === "ArrowLeft") {
            prevPhone();
        } else if (e.key === "ArrowRight") {
            nextPhone();
        }
    });

    console.log("[Ruznamat Redesign] Custom high-end interactive dynamics initialized successfully.");
});
