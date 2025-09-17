// Set current year in footer
const currentYearElement = document.getElementById('currentYear');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', (!expanded).toString());
        mobileMenu.classList.toggle('hidden');
    });
}

// FAQ Accordion
const faqButtons = document.querySelectorAll('#faq button');
faqButtons.forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        const icon = button.querySelector('i');

        content.classList.toggle('hidden');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
    });
});

// Contact Form Submission Handler
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const scriptURL = 'https://script.google.com/macros/s/AKfycbwYe6g5vR8bkpk-I9TZ2_ny18LK943kKjBTd0RiSuL-roumoF4U-pj2_x2fGazBxxhB/exec'; // এখানে আপনার ডেপ্লয় করা Web App URL টি পেস্ট করুন

if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();

        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'পাঠানো হচ্ছে...';
        formMessage.textContent = '';

        fetch(scriptURL, { method: 'POST', body: new FormData(contactForm) })
            .then(response => response.json())
            .then(data => {
                if (data.result === 'success') {
                    formMessage.textContent = 'আপনার বার্তা সফলভাবে পাঠানো হয়েছে। ধন্যবাদ!';
                    formMessage.style.color = 'green';
                    contactForm.reset();
                } else {
                    throw new Error('Something went wrong. Server response: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error!', error.message);
                formMessage.textContent = 'একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।';
                formMessage.style.color = 'red';
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.textContent = 'বার্তা পাঠান';
            });
    });
}

// Order Modal Logic
const orderModal = document.getElementById('order-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const orderButtons = document.querySelectorAll('.order-btn');
const packageNameInput = document.getElementById('package-name');
const orderForm = document.getElementById('order-form');
const orderFormMessage = document.getElementById('order-form-message');

// Open modal when any order button is clicked
orderButtons.forEach(button => {
    button.addEventListener('click', () => {
        const packageName = button.getAttribute('data-package');
        if (packageNameInput) {
            packageNameInput.value = packageName; // Set package name in the hidden input
        }
        if (orderModal) {
            orderModal.classList.remove('hidden');
        }
    });
});

// Close modal
if (closeModalBtn && orderModal) {
    closeModalBtn.addEventListener('click', () => {
        orderModal.classList.add('hidden');
    });

    // Close modal if clicked outside the form
    orderModal.addEventListener('click', (e) => {
        if (e.target === orderModal) {
            orderModal.classList.add('hidden');
        }
    });
}

// Order Form Submission Handler
if (orderForm) {
    orderForm.addEventListener('submit', e => {
        e.preventDefault();

        const submitButton = orderForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'পাঠানো হচ্ছে...';
        orderFormMessage.textContent = '';

        // The same scriptURL can be used
        fetch(scriptURL, { method: 'POST', body: new FormData(orderForm) })
            .then(response => response.json())
            .then(data => {
                if (data.result === 'success') {
                    orderFormMessage.textContent = 'আপনার অর্ডার সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই যোগাযোগ করবো।';
                    orderFormMessage.style.color = 'green';
                    orderForm.reset();
                    setTimeout(() => {
                        orderModal.classList.add('hidden');
                    }, 3000); // Close modal after 3 seconds
                } else {
                    throw new Error('Server response error: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error!', error.message);
                orderFormMessage.textContent = 'একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।';
                orderFormMessage.style.color = 'red';
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.textContent = 'অর্ডার কনফার্ম করুন';
            });
    });
}

// Change site name color when header overlaps the contact section or footer
const siteName = document.getElementById('site-name');
const contactSection = document.getElementById('contact');
const whySection = document.getElementById('why-us');
const header = document.querySelector('header');
const footer = document.querySelector('footer');

if (siteName && header && footer) {
    const defaultClass = 'text-teal-600';
    const overlapClass = 'text-white';

    function updateSiteNameColor() {
        const headerHeight = header.offsetHeight;
        const isOverSection = (section) => {
            if (!section) {
                return false;
            }
            const rect = section.getBoundingClientRect();
            return rect.top <= headerHeight && rect.bottom >= headerHeight;
        };

        const isOverDarkSection = [whySection, contactSection, footer].some(isOverSection);

        if (isOverDarkSection) {
            siteName.classList.remove(defaultClass);
            siteName.classList.add(overlapClass);
        } else {
            siteName.classList.remove(overlapClass);
            siteName.classList.add(defaultClass);
        }
    }

    window.addEventListener('scroll', updateSiteNameColor);
    window.addEventListener('resize', updateSiteNameColor);
    // Run on load in case user refreshes while on contact section or footer
    updateSiteNameColor();
}

// Dynamic industry text flip on homepage
const industryText = document.getElementById('industry-text');
if (industryText) {
    const words = ['ব্যবসার', 'রিসোর্টের', 'হাসপাতালের', 'ই-কমার্সের'];
    let index = 0;
    setInterval(() => {
        industryText.classList.add('flip');
        setTimeout(() => {
            index = (index + 1) % words.length;
            industryText.textContent = words[index];
            industryText.classList.remove('flip');
        }, 600);
    }, 2000);
}

// Scroll Animation Logic
document.addEventListener("DOMContentLoaded", () => {
    const scrollElements = document.querySelectorAll(".animate-on-scroll");

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add("is-visible");
    };

    const hideScrollElement = (element) => {
        element.classList.remove("is-visible");
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
            // Optional: To hide the element again when it goes out of view
            // else {
            //     hideScrollElement(el);
            // }
        });
    };

    window.addEventListener("scroll", () => {
        handleScrollAnimation();
    });

    // Trigger on load
    handleScrollAnimation();

    const heroSection = document.querySelector('.hero-section');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (heroSection && window.gsap) {
        const heroKicker = heroSection.querySelector('.hero-kicker');
        const heroHeading = heroSection.querySelector('.hero-heading');
        const heroSubtitle = heroSection.querySelector('.hero-subtitle');
        const heroButtons = Array.from(heroSection.querySelectorAll('.hero-cta a'));
        const heroStats = Array.from(heroSection.querySelectorAll('.hero-stat'));
        const heroDevice = heroSection.querySelector('.hero-device');
        const heroCards = Array.from(heroSection.querySelectorAll('.floating-card'));
        const heroIcons = Array.from(heroSection.querySelectorAll('.floating-icon'));
        const heroOrbs = Array.from(heroSection.querySelectorAll('.hero-orb'));

        if (heroKicker) {
            gsap.set(heroKicker, { y: 40, opacity: 0 });
        }

        if (heroHeading) {
            gsap.set(heroHeading, { y: 40, opacity: 0 });
        }

        if (heroSubtitle) {
            gsap.set(heroSubtitle, { y: 40, opacity: 0 });
        }

        if (heroButtons.length) {
            gsap.set(heroButtons, { y: 40, opacity: 0 });
        }

        if (heroStats.length) {
            gsap.set(heroStats, { y: 40, opacity: 0 });
        }

        if (heroDevice) {
            gsap.set(heroDevice, { y: 60, opacity: 0, scale: 0.95 });
        }

        const timeline = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
        let timelineOffset = 0;

        if (heroKicker) {
            timeline.to(heroKicker, { y: 0, opacity: 1 }, timelineOffset);
            timelineOffset += 0.1;
        }

        if (heroHeading) {
            timeline.to(heroHeading, { y: 0, opacity: 1 }, timelineOffset);
            timelineOffset += 0.12;
        }

        if (heroSubtitle) {
            timeline.to(heroSubtitle, { y: 0, opacity: 1 }, timelineOffset);
            timelineOffset += 0.15;
        }

        if (heroButtons.length) {
            timeline.to(heroButtons, { y: 0, opacity: 1, stagger: 0.08 }, timelineOffset);
            timelineOffset += 0.18;
        }

        if (heroStats.length) {
            timeline.to(heroStats, { y: 0, opacity: 1, stagger: 0.08 }, timelineOffset);
            timelineOffset += 0.12;
        }

        if (heroDevice) {
            timeline.to(heroDevice, { y: 0, opacity: 1, scale: 1, duration: 1.1 }, 0.15);
        }

        if (!prefersReducedMotion) {
            heroCards.forEach((card, index) => {
                const floatDistance = 16 + index * 6;
                gsap.to(card, {
                    y: `+=${floatDistance}`,
                    x: index % 2 === 0 ? '+=12' : '-=12',
                    duration: 3.6 + index,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut'
                });
            });

            heroIcons.forEach((icon, index) => {
                gsap.to(icon, {
                    y: index % 2 === 0 ? '+=14' : '-=14',
                    x: index % 2 === 0 ? '-=8' : '+=8',
                    rotation: index % 2 === 0 ? 6 : -6,
                    duration: 4.5 + index,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut'
                });
            });

            heroSection.addEventListener('pointermove', (event) => {
                const rect = heroSection.getBoundingClientRect();
                const offsetX = ((event.clientX - rect.left) / rect.width - 0.5) * 24;
                const offsetY = ((event.clientY - rect.top) / rect.height - 0.5) * 24;

                if (heroDevice) {
                    gsap.to(heroDevice, { x: offsetX, y: offsetY, duration: 0.8, ease: 'power2.out' });
                }

                heroCards.forEach((card, index) => {
                    gsap.to(card, {
                        x: offsetX * (0.2 + index * 0.05),
                        y: offsetY * (0.2 + index * 0.04),
                        duration: 0.8,
                        ease: 'power2.out'
                    });
                });

                heroIcons.forEach((icon, index) => {
                    gsap.to(icon, {
                        x: offsetX * (0.16 + index * 0.05),
                        y: offsetY * (0.16 + index * 0.05),
                        duration: 0.9,
                        ease: 'power2.out'
                    });
                });

                heroOrbs.forEach((orb, index) => {
                    gsap.to(orb, {
                        x: offsetX * (-0.3 - index * 0.05),
                        y: offsetY * (-0.3 - index * 0.04),
                        duration: 1.1,
                        ease: 'power2.out'
                    });
                });
            });

            heroSection.addEventListener('mouseleave', () => {
                const parallaxTargets = [heroDevice, ...heroCards, ...heroIcons, ...heroOrbs].filter(Boolean);
                parallaxTargets.forEach((target) => {
                    gsap.to(target, { x: 0, y: 0, duration: 1, ease: 'power3.out' });
                });
            });
        }
    }

    if (!prefersReducedMotion && window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
        const animationPresets = {
            'fade-up': { y: 60, opacity: 0 },
            'fade-down': { y: -60, opacity: 0 },
            'fade-left': { x: -60, opacity: 0 },
            'fade-right': { x: 60, opacity: 0 },
            'scale-in': { scale: 0.9, opacity: 0 },
            'rotate-in': { rotationX: -15, opacity: 0 }
        };

        gsap.utils.toArray('[data-animate]').forEach((element) => {
            const type = element.getAttribute('data-animate') || 'fade-up';
            const preset = animationPresets[type] || animationPresets['fade-up'];
            const delay = parseFloat(element.getAttribute('data-delay')) || 0;
            const duration = parseFloat(element.getAttribute('data-duration')) || 1;
            const once = element.getAttribute('data-once');

            gsap.from(element, {
                ...preset,
                duration,
                delay,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    toggleActions: once === 'false' ? 'play none none reverse' : 'play none none none'
                }
            });
        });
    }

    if (!prefersReducedMotion && window.gsap) {
        const parallaxSections = document.querySelectorAll('[data-parallax-container]');

        parallaxSections.forEach((section) => {
            const targets = section.querySelectorAll('[data-parallax-depth]');
            if (!targets.length) {
                return;
            }

            section.addEventListener('pointermove', (event) => {
                const rect = section.getBoundingClientRect();
                const offsetX = ((event.clientX - rect.left) / rect.width - 0.5) * 24;
                const offsetY = ((event.clientY - rect.top) / rect.height - 0.5) * 24;

                targets.forEach((target) => {
                    const depth = parseFloat(target.getAttribute('data-parallax-depth')) || 0.12;
                    gsap.to(target, {
                        x: offsetX * depth,
                        y: offsetY * depth,
                        duration: 0.8,
                        ease: 'power2.out'
                    });
                });
            });

            section.addEventListener('mouseleave', () => {
                targets.forEach((target) => {
                    gsap.to(target, { x: 0, y: 0, duration: 1, ease: 'power3.out' });
                });
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.floating-contact-buttons')) {
        return;
    }

    const styleElement = document.createElement('style');
    styleElement.id = 'floating-contact-buttons-style';
    styleElement.textContent = `
        .floating-contact-buttons {
            position: fixed;
            right: 1.25rem;
            bottom: 1.25rem;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            z-index: 10000;
        }

        .floating-contact-buttons a {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            border-radius: 9999px;
            padding: 0.55rem 1rem;
            font-weight: 600;
            color: #ffffff;
            text-decoration: none;
            box-shadow: 0 12px 28px rgba(15, 23, 42, 0.18);
            font-size: 0.85rem;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .floating-contact-buttons a:focus-visible {
            outline: 2px solid rgba(45, 212, 191, 0.6);
            outline-offset: 3px;
        }

        .floating-contact-buttons a:hover {
            transform: translateY(-2px);
            box-shadow: 0 18px 32px rgba(15, 23, 42, 0.22);
        }

        .floating-contact-buttons .floating-call {
            background: linear-gradient(135deg, #0f766e, #14b8a6);
        }

        .floating-contact-buttons .floating-message {
            background: linear-gradient(135deg, #2563eb, #3b82f6);
        }

        .floating-contact-buttons i {
            font-size: 1rem;
        }

        @media (max-width: 480px) {
            .floating-contact-buttons {
                right: 0.85rem;
                bottom: 0.85rem;
                gap: 0.5rem;
            }

            .floating-contact-buttons a {
                padding: 0.45rem 0.85rem;
                font-size: 0.78rem;
                box-shadow: 0 10px 22px rgba(15, 23, 42, 0.18);
            }

            .floating-contact-buttons i {
                font-size: 0.9rem;
            }
        }

        @media (min-width: 768px) {
            .floating-contact-buttons a {
                padding: 0.7rem 1.25rem;
                font-size: 1rem;
            }

            .floating-contact-buttons i {
                font-size: 1.1rem;
            }
        }
    `;

    document.head.appendChild(styleElement);

    const floatingWrapper = document.createElement('div');
    floatingWrapper.className = 'floating-contact-buttons';

    floatingWrapper.innerHTML = `
        <a href="tel:01639590392" class="floating-call" aria-label="Call Now">
            <i class="fa-solid fa-phone"></i>
            <span>Call Now</span>
        </a>
        <a href="https://www.m.me/profile.php?id=61579772421831" class="floating-message" aria-label="Message Us" target="_blank" rel="noopener">
            <i class="fa-brands fa-facebook-messenger"></i>
            <span>Message Us</span>
        </a>
    `;

    document.body.appendChild(floatingWrapper);
});
