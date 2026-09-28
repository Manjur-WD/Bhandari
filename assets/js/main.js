/**
 * Bhandari Hosiery Exports - Main Interactive JavaScript
 * Modular, clean, and ready for easy conversion to WordPress / Elementor
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Animate On Scroll (AOS)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 80
        });
    }

    // 2. Sticky Header Effect & Back to Top
    const siteHeader = document.getElementById('site-header');
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            siteHeader.classList.add('scrolled');
        } else {
            siteHeader.classList.remove('scrolled');
        }

        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // 3. Back to Top Smooth Scroll
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 4. Mobile Navigation Drawer
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerBackdrop = document.getElementById('drawerBackdrop');
    const drawerClose = document.getElementById('drawerClose');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    function openDrawer() {
        mobileDrawer.classList.add('active');
        drawerBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        mobileDrawer.classList.remove('active');
        drawerBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', openDrawer);
    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);
    drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

    // 5. Number Counter Animation on Scroll (Intersection Observer)
    const counters = document.querySelectorAll('.counter');
    let countersStarted = false;

    function runCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeProgress = 1 - (1 - progress) * (1 - progress);
                const currentVal = Math.floor(easeProgress * target);

                counter.innerText = currentVal;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    const statsSection = document.getElementById('capabilities');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersStarted) {
                    countersStarted = true;
                    runCounters();
                }
            });
        }, { threshold: 0.3 });

        observer.observe(statsSection);
    }

    // 6. Hero Counter Controls (Slide indicator simulator)
    let currentSlide = 1;
    const totalSlides = 5;
    const heroCurrentSlideElem = document.getElementById('heroCurrentSlide');
    const heroPrevBtn = document.getElementById('heroPrevBtn');
    const heroNextBtn = document.getElementById('heroNextBtn');

    function updateHeroSlide(index) {
        currentSlide = index;
        if (currentSlide > totalSlides) currentSlide = 1;
        if (currentSlide < 1) currentSlide = totalSlides;
        if (heroCurrentSlideElem) {
            heroCurrentSlideElem.textContent = String(currentSlide).padStart(2, '0');
        }
    }

    if (heroPrevBtn) heroPrevBtn.addEventListener('click', () => updateHeroSlide(currentSlide - 1));
    if (heroNextBtn) heroNextBtn.addEventListener('click', () => updateHeroSlide(currentSlide + 1));

    // 7. Interactive World Map Pins & Tooltip
    const mapPins = document.querySelectorAll('.map-pin');
    const mapTooltip = document.getElementById('mapTooltip');
    const mapWrapper = document.querySelector('.world-map-wrapper');

    if (mapWrapper && mapTooltip) {
        mapPins.forEach(pin => {
            pin.addEventListener('mouseenter', () => {
                const regionInfo = pin.getAttribute('data-region');
                mapTooltip.textContent = regionInfo;
                mapTooltip.style.opacity = '1';
                
                const pinRect = pin.getBoundingClientRect();
                const wrapperRect = mapWrapper.getBoundingClientRect();
                
                const posX = pinRect.left - wrapperRect.left - (mapTooltip.offsetWidth / 2) + 10;
                const posY = pinRect.top - wrapperRect.top - 36;
                
                mapTooltip.style.left = `${Math.max(10, posX)}px`;
                mapTooltip.style.top = `${posY}px`;
            });

            pin.addEventListener('mouseleave', () => {
                mapTooltip.style.opacity = '0';
            });
        });
    }

    // 8. RFQ Form Submission Handler
    const leadForm = document.getElementById('leadInquiryForm');
    const formFeedback = document.getElementById('formFeedback');
    const rfqSubmitBtn = document.getElementById('rfqSubmitBtn');

    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const originalText = rfqSubmitBtn.innerHTML;
            rfqSubmitBtn.innerHTML = '<span>Processing Request...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
            rfqSubmitBtn.disabled = true;

            setTimeout(() => {
                formFeedback.className = 'form-feedback success';
                formFeedback.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your manufacturing inquiry has been submitted. Our team will contact you within 24 hours with a detailed proposal.';
                leadForm.reset();
                rfqSubmitBtn.innerHTML = originalText;
                rfqSubmitBtn.disabled = false;

                setTimeout(() => {
                    formFeedback.style.display = 'none';
                }, 8000);
            }, 1200);
        });
    }

    // 9. Footer Mini Form Handler
    const footerForm = document.getElementById('footerMiniForm');
    const footerFeedback = document.getElementById('footerFeedback');

    if (footerForm) {
        footerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            footerFeedback.style.display = 'block';
            footerFeedback.style.background = '#203d25';
            footerFeedback.style.color = '#a4d65e';
            footerFeedback.innerHTML = '<i class="fa-solid fa-check"></i> Message sent successfully!';
            footerForm.reset();

            setTimeout(() => {
                footerFeedback.style.display = 'none';
            }, 5000);
        });
    }
});
