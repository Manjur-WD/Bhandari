/**
 * DESIGN-3: MAIN JAVASCRIPT LOGIC
 * Brand: Bhandari Export
 * Theme: Ravox Modern Dark & Electric Lime
 */

document.addEventListener('DOMContentLoaded', () => {
    // 0. Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-out-cubic',
            offset: 60
        });
    }

    // 1. Preloader Simulation
    const preloader = document.getElementById('ravoxPreloader');
    const preloaderFill = document.getElementById('preloaderFill');
    const preloaderPercent = document.getElementById('preloaderPercent');

    if (preloader) {
        let count = 0;
        const interval = setInterval(() => {
            count += Math.floor(Math.random() * 8) + 4;
            if (count > 100) count = 100;

            if (preloaderFill) preloaderFill.style.width = count + '%';
            if (preloaderPercent) preloaderPercent.textContent = count + '%';

            if (count === 100) {
                clearInterval(interval);
                setTimeout(() => {
                    preloader.classList.add('fade-out');
                    if (typeof AOS !== 'undefined') {
                        AOS.refresh();
                    }
                }, 300);
            }
        }, 30);
    }

    // 2. Sticky Header & Scroll To Top Button
    const header = document.getElementById('ravoxHeader');
    const backToTopBtn = document.getElementById('backToTopBtn') || document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY || document.documentElement.scrollTop;
        if (scrollPos > 60) {
            if (header) header.classList.add('scrolled');
        } else {
            if (header) header.classList.remove('scrolled');
        }

        if (scrollPos > 250) {
            if (backToTopBtn) backToTopBtn.classList.add('visible');
        } else {
            if (backToTopBtn) backToTopBtn.classList.remove('visible');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Fallback Scroll Reveal Observer
    const revealElements = document.querySelectorAll('.reveal-init');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // 3. Stats Counter Animation on Scroll
    const statCounters = document.querySelectorAll('.stat-counter');
    let counted = false;

    const runCounters = () => {
        statCounters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let current = 0;
            const increment = target / 40;

            const update = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target;
                }
            };
            update();
        });
    };

    const statsSection = document.getElementById('capabilities-stats') || document.getElementById('statsSection');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !counted) {
                counted = true;
                runCounters();
            }
        }, { threshold: 0.2 });
        observer.observe(statsSection);
    } else {
        runCounters();
    }

    // 4. Testimonial Slider / Tab Logic
    const testimonials = [
        {
            quote: "“Bhandari Export has been our primary manufacturing partner for 7+ consecutive seasons. Their fabric consistency, automated cutting accuracy, and adherence to OEKO-TEX standards is second to none in South Asia.”",
            author: "Leslie Alexander",
            role: "Sourcing Director, Euro Fashion Group (Germany)",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=700&auto=format&fit=crop"
        },
        {
            quote: "“The zero-liquid discharge and sustainable organic knits delivered for our North American retail stores gave our brand a huge competitive advantage. True mill-direct pricing and exceptional QA.”",
            author: "Marcus Vance",
            role: "Head of Supply Chain, US Apparel Retailers (USA)",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=700&auto=format&fit=crop"
        },
        {
            quote: "“From heavy French Terry 400 GSM hoodies to ultra-fine bamboo-cotton tees, Bhandari's vertical integration in Ludhiana has cut our production lead times by 30%.”",
            author: "Elena Rostova",
            role: "Product Development Lead, Nordic Knits (Sweden)",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=700&auto=format&fit=crop"
        }
    ];

    let currentTestimonialIndex = 0;
    const quoteText = document.getElementById('feedbackQuoteText');
    const authorName = document.getElementById('feedbackAuthorName');
    const authorRole = document.getElementById('feedbackAuthorRole');
    const authorImg = document.getElementById('feedbackAuthorImg');
    const paginationNum = document.getElementById('feedbackPaginationNum');
    const prevBtn = document.getElementById('feedbackPrevBtn');
    const nextBtn = document.getElementById('feedbackNextBtn');

    const updateTestimonial = (index) => {
        if (!quoteText) return;
        const item = testimonials[index];
        quoteText.textContent = item.quote;
        authorName.textContent = item.author;
        authorRole.textContent = item.role;
        authorImg.src = item.image;
        if (paginationNum) {
            paginationNum.textContent = `0${index + 1} / 0${testimonials.length}`;
        }
    };

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
            updateTestimonial(currentTestimonialIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
            updateTestimonial(currentTestimonialIndex);
        });
    }

    // 5. RFQ Form Submission
    const rfqForm = document.getElementById('ravoxRfqForm');
    if (rfqForm) {
        rfqForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you! Your inquiry has been transmitted to Bhandari Export international sales team. We will get back with official FOB/CIF quotation within 24 hours.');
            rfqForm.reset();
        });
    }

    // 6. Mobile Drawer & Accordion Logic
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const mobileClose = document.getElementById('mobileDrawerClose');
    const mobileBackdrop = document.getElementById('mobileNavBackdrop');

    const openDrawer = () => {
        if (mobileDrawer) mobileDrawer.classList.add('open');
        if (mobileBackdrop) mobileBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
        if (mobileDrawer) mobileDrawer.classList.remove('open');
        if (mobileBackdrop) mobileBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (mobileToggle) {
        mobileToggle.addEventListener('click', openDrawer);
    }

    if (mobileClose) {
        mobileClose.addEventListener('click', closeDrawer);
    }

    if (mobileBackdrop) {
        mobileBackdrop.addEventListener('click', closeDrawer);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeDrawer();
        }
    });

    // Mobile Accordion Dropdowns
    const accordionTriggers = document.querySelectorAll('.mobile-menu-toggle-trigger');
    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const parentItem = trigger.closest('.mobile-dropdown-item');
            const collapsePanel = parentItem ? parentItem.querySelector('.mobile-submenu-collapse') : null;

            if (parentItem && collapsePanel) {
                const isOpen = parentItem.classList.contains('active');
                
                // Close all other open accordions
                document.querySelectorAll('.mobile-dropdown-item.active').forEach(item => {
                    if (item !== parentItem) {
                        item.classList.remove('active');
                        const otherPanel = item.querySelector('.mobile-submenu-collapse');
                        if (otherPanel) otherPanel.style.maxHeight = null;
                    }
                });

                if (isOpen) {
                    parentItem.classList.remove('active');
                    collapsePanel.style.maxHeight = null;
                } else {
                    parentItem.classList.add('active');
                    collapsePanel.style.maxHeight = collapsePanel.scrollHeight + 'px';
                }
            }
        });
    });

    // Close drawer when clicking regular links
    const mobileNavLinks = document.querySelectorAll('.mobile-menu-link, .mobile-sublink');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeDrawer();
        });
    });
});
