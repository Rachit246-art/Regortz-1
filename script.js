// Custom Cursor Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    if (cursorDot) {
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
    }

    if (cursorOutline) {
        // Adding a slight delay to the outline for a smooth aesthetic trailing effect
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    }
});

// Interactive hover effect for the cursor
document.querySelectorAll('a, button, .group').forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursorOutline) {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.backgroundColor = 'rgba(170, 221, 0, 0.1)';
        }
    });
    el.addEventListener('mouseleave', () => {
        if (cursorOutline) {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.backgroundColor = 'transparent';
        }
    });
});

// Scroll Reveal Animations using Intersection Observer
// Included #contact-section so the form becomes visible when scrolling!
const revealElements = document.querySelectorAll('#about, #services, #work, #testimonials, .group, #contact-section');
revealElements.forEach(el => el.classList.add('reveal'));

const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// Simple scroll effect for navbar
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (nav) {
        if (window.scrollY > 50) {
            nav.classList.add('shadow-lg');
        } else {
            nav.classList.remove('shadow-lg');
        }
    }
});

// Popup Form Logic
function openPopup(e) {
    if(e) e.preventDefault();
    const popup = document.getElementById('contactPopup');
    const popupContent = document.getElementById('popupContent');
    
    if(popup && popupContent) {
        popup.classList.remove('opacity-0', 'pointer-events-none');
        popupContent.classList.remove('scale-95');
        popupContent.classList.add('scale-100');
    }
}

function closePopup() {
    const popup = document.getElementById('contactPopup');
    const popupContent = document.getElementById('popupContent');
    
    if(popup && popupContent) {
        popup.classList.add('opacity-0', 'pointer-events-none');
        popupContent.classList.remove('scale-100');
        popupContent.classList.add('scale-95');
    }
}

function submitForm(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    if (!btn) return;
    
    const originalText = btn.innerText;
    btn.innerText = 'Sending...';
    
    setTimeout(() => {
        btn.innerText = 'Sent Successfully!';
        btn.classList.add('bg-green-500', 'text-white');
        btn.classList.remove('bg-brand', 'text-black');
        
        setTimeout(() => {
            closePopup();
            e.target.reset();
            btn.innerText = originalText;
            btn.classList.remove('bg-green-500', 'text-white');
            btn.classList.add('bg-brand', 'text-black');
        }, 2000);
    }, 1000);
}

// Auto-trigger popup when reaching the second section (#about)
const triggerSection = document.getElementById('about');
if (triggerSection) {
    const popupObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Slight delay for premium feel
                setTimeout(() => {
                    openPopup(null);
                }, 500);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 }); // Trigger when 30% of the section is visible
    
    popupObserver.observe(triggerSection);
}
