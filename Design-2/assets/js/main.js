/**
 * Design-2 Main JavaScript
 * Bhandari Export - Alternating White/Dark Architectural Textile Showcase
 */

document.addEventListener('DOMContentLoaded', () => {
    // 0. Luxury Diagonal Cut Preloader Controller
    const preloader = document.getElementById('sitePreloader');
    const preloaderBar = document.getElementById('preloaderBar');
    const preloaderCounter = document.getElementById('preloaderCounter');

    if (preloader) {
        document.body.style.overflow = 'hidden';
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.floor(Math.random() * 6) + 4;
            if (progress >= 100) {
                progress = 100;
                clearInterval(progressInterval);
                if (preloaderBar) preloaderBar.style.width = '100%';
                if (preloaderCounter) preloaderCounter.textContent = '100%';

                // Hold at 100% for smooth visual satisfaction
                setTimeout(() => {
                    preloader.classList.add('fading');
                    
                    // Trigger diagonal split screen reveal
                    setTimeout(() => {
                        preloader.classList.add('reveal');
                        document.body.style.overflow = '';
                        
                        if (typeof AOS !== 'undefined') {
                            AOS.refresh();
                        }

                        // Complete concealment
                        setTimeout(() => {
                            preloader.classList.add('hidden');
                        }, 1200);
                    }, 300);
                }, 350);
            } else {
                if (preloaderBar) preloaderBar.style.width = progress + '%';
                if (preloaderCounter) preloaderCounter.textContent = progress + '%';
            }
        }, 30);
    }

    // 1. Initialize AOS (Animate On Scroll) - Instant Snappy Reveal
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 500,
            easing: 'ease-out-cubic',
            once: true,
            offset: 10,
            delay: 0
        });
    }

    // 2. Hero Animated Image Slideshow for Left and Right Floating Frames
    const leftFrameImages = document.querySelectorAll('#heroLeftFrame .hero-slide-img');
    const rightFrameImages = document.querySelectorAll('#heroRightFrame .hero-slide-img');

    if (leftFrameImages.length > 0) {
        let leftIndex = 0;
        setInterval(() => {
            leftFrameImages[leftIndex].classList.remove('active');
            leftIndex = (leftIndex + 1) % leftFrameImages.length;
            leftFrameImages[leftIndex].classList.add('active');
        }, 2600);
    }

    if (rightFrameImages.length > 0) {
        let rightIndex = 0;
        // Offset timing slightly for dynamic visual rhythm
        setTimeout(() => {
            setInterval(() => {
                rightFrameImages[rightIndex].classList.remove('active');
                rightIndex = (rightIndex + 1) % rightFrameImages.length;
                rightFrameImages[rightIndex].classList.add('active');
            }, 2800);
        }, 1200);
    }

    // 3. Stats Counter Animation on Scroll - Instant Early Trigger
    const statsCounters = document.querySelectorAll('.stat-counter');
    let countersDone = false;

    function runCounters() {
        statsCounters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 1600;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOut = 1 - (1 - progress) * (1 - progress);
                const current = Math.floor(easeOut * target);

                counter.innerText = current;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            }
            requestAnimationFrame(updateCounter);
        });
    }

    const statsWrap = document.getElementById('statsCounterWrap');
    if (statsWrap) {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersDone) {
                    countersDone = true;
                    runCounters();
                }
            });
        }, { threshold: 0.05 });
        obs.observe(statsWrap);
    }

    // 4. Sticky Header & Back to Top Controller
    const siteHeader = document.getElementById('siteHeader');
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            siteHeader?.classList.add('scrolled');
        } else {
            siteHeader?.classList.remove('scrolled');
        }

        if (window.scrollY > 400) {
            backToTopBtn?.classList.add('visible');
        } else {
            backToTopBtn?.classList.remove('visible');
        }
    });

    backToTopBtn?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 5. Off-Canvas Mobile Drawer Toggle
    const menuToggleBtn = document.querySelector('.menu-toggle-btn');
    const mobileDrawer = document.getElementById('mobileNavDrawer');
    const mobileBackdrop = document.getElementById('mobileNavBackdrop');
    const mobileDrawerClose = document.getElementById('mobileDrawerClose');

    function openMobileMenu() {
        mobileDrawer?.classList.add('open');
        mobileBackdrop?.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileDrawer?.classList.remove('open');
        mobileBackdrop?.classList.remove('open');
        document.body.style.overflow = '';
    }

    menuToggleBtn?.addEventListener('click', openMobileMenu);
    mobileDrawerClose?.addEventListener('click', closeMobileMenu);
    mobileBackdrop?.addEventListener('click', closeMobileMenu);

    // 5.1 Mobile Collapsible Submenu Accordion Handler
    const mobileDropdownTriggers = document.querySelectorAll('.mobile-menu-toggle-trigger');
    mobileDropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const parentItem = trigger.closest('.mobile-dropdown-item');
            const isOpen = parentItem.classList.contains('open');

            // Close other open submenus for clean accordion behaviour
            document.querySelectorAll('.mobile-dropdown-item').forEach(item => {
                if (item !== parentItem) {
                    item.classList.remove('open');
                }
            });

            if (isOpen) {
                parentItem.classList.remove('open');
            } else {
                parentItem.classList.add('open');
            }
        });
    });

    // 6. Smooth Anchor Scrolling & Auto-Close Drawer
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElem = document.querySelector(targetId);
                if (targetElem) {
                    e.preventDefault();
                    closeMobileMenu();
                    const headerOffset = 80;
                    const elementPosition = targetElem.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 7. RFQ Form Submission Handler
    const rfqForm = document.getElementById('enquiryRfqForm');
    const rfqFeedback = document.getElementById('enquiryFeedbackMsg');

    if (rfqForm) {
        rfqForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = rfqForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span>Processing RFQ...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
                submitBtn.disabled = true;

                setTimeout(() => {
                    if (rfqFeedback) {
                        rfqFeedback.innerHTML = '<i class="fa-solid fa-circle-check"></i> <strong>Thank you!</strong> Your manufacturing RFQ has been received. Our sales merchandising team will send your proposal within 24 hours.';
                        rfqFeedback.style.display = 'block';
                    }
                    rfqForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;

                    setTimeout(() => {
                        if (rfqFeedback) rfqFeedback.style.display = 'none';
                    }, 8000);
                }, 1000);
            }
        });
    }
});
