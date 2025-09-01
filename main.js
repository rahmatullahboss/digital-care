// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', (!expanded).toString());
    mobileMenu.classList.toggle('hidden');
});

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
const header = document.querySelector('header');
const footer = document.querySelector('footer');

if (siteName && header && footer) {
    const defaultClass = 'text-teal-600';
    const overlapClass = 'text-white';

    function updateSiteNameColor() {
        const headerHeight = header.offsetHeight;
        const contactRect = contactSection ? contactSection.getBoundingClientRect() : null;
        const footerRect = footer.getBoundingClientRect();

        const inContact = contactRect ? (contactRect.top <= headerHeight && contactRect.bottom >= headerHeight) : false;
        const inFooter = footerRect.top <= headerHeight && footerRect.bottom >= headerHeight;

        if (inContact || inFooter) {
            siteName.classList.remove(defaultClass);
            siteName.classList.add(overlapClass);
        } else {
            siteName.classList.remove(overlapClass);
            siteName.classList.add(defaultClass);
        }
    }

    window.addEventListener('scroll', updateSiteNameColor);
    // Run on load in case user refreshes while on contact section or footer
    updateSiteNameColor();
}

// Dynamic industry text flip on homepage
const industryText = document.getElementById('industry-text');
if (industryText) {
    const words = ['ব্যবসার', 'রেস্টুরেন্টের', 'হাসপাতালের', 'ই-কমার্সের'];
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
});
