// Update Header Style and Scroll to Top
var lastScrollTop = 0; // Variable to store the last position

function headerStyle() {
    const nav = document.querySelector('nav');
    const scrollLink = document.querySelector('.scroll-to-top');
    
    if (nav) {
        var windowpos = window.scrollY || window.pageYOffset;

        // Ensure transition styling is initialized for the slide effect
        nav.style.transition = 'transform 0.4s ease-in-out, background-color 0.4s ease-in-out';

        // Logic for Scroll Up vs Scroll Down
        if (windowpos > lastScrollTop && windowpos > 100) {
            // SCROLLING DOWN: Counterpart to removing slideInDown
            // Pushes the header out of view
            nav.style.transform = 'translateY(-100%)';
            
        } else if (windowpos < lastScrollTop && windowpos > 100) {
            // SCROLLING UP: Counterpart to adding fixed-header animated slideInDown
            // Makes the header fixed and drops it cleanly down
            nav.classList.remove('absolute');
            nav.classList.add('fixed', 'bg-dark-green', 'shadow-md', 'z-[100]');
            nav.style.transform = 'translateY(0)';
        }

        // Handle the "Back to Top" button visibility
        if (windowpos > 100) {
            if (scrollLink) {
                scrollLink.style.transition = 'opacity 0.3s ease';
                scrollLink.style.opacity = '1';
                scrollLink.style.pointerEvents = 'auto'; // Make it clickable again
            }
        } else {
            if (scrollLink) {
                scrollLink.style.transition = 'opacity 0.3s ease';
                scrollLink.style.opacity = '0';
                scrollLink.style.pointerEvents = 'none'; // Disable clicks when hidden
            }
            
            // Remove header classes if we are at the very top
            nav.style.transform = 'translateY(0)';
            nav.classList.remove('fixed', 'bg-dark-green', 'shadow-md', 'z-[100]');
            nav.classList.add('absolute');
        }

        // Update the last scroll position
        lastScrollTop = windowpos;
    }
}

// Add Mobile Menu Setup Function
function setupMobileMenu() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    // 1. Hide the original Apply Now button on mobile
    const navCta = document.querySelector('.nav-cta');
    if (navCta) {
        navCta.classList.add('hidden', 'lg:block');
    }

    // 2. Create Hamburger Button inside nav
    const mobileBtn = document.createElement('button');
    mobileBtn.className = 'lg:hidden text-white text-3xl focus:outline-none ml-auto z-[110] relative';
    mobileBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    nav.appendChild(mobileBtn);

    // 3. Create Mobile Menu Wrapper
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'fixed inset-0 bg-dark-green z-[200] transform translate-x-full transition-transform duration-300 flex flex-col justify-center items-center';
    
    // 4. Create Close Button inside Mobile Menu
    const closeBtn = document.createElement('button');
    closeBtn.className = 'absolute top-6 right-6 text-white text-4xl focus:outline-none';
    closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    mobileMenu.appendChild(closeBtn);

    // 5. Clone UL and styling
    const ul = document.querySelector('nav ul');
    if (ul) {
        const clonedUl = ul.cloneNode(true);
        clonedUl.className = 'flex flex-col gap-8 text-center list-none p-0 m-0';
        clonedUl.querySelectorAll('a').forEach(a => {
            a.className = 'text-white text-2xl font-bold tracking-wide hover:text-gold transition-colors';
        });
        mobileMenu.appendChild(clonedUl);
    }

    // 6. Clone CTA and styling
    if (navCta) {
        const clonedCta = navCta.cloneNode(true);
        clonedCta.classList.remove('hidden', 'lg:block');
        clonedCta.classList.add('mt-12', 'flex', 'justify-center');
        
        const link = clonedCta.querySelector('a');
        if(link) {
            link.className = 'bg-gold text-dark-green py-3 px-8 rounded-full font-bold text-lg hover:bg-white transition-all duration-300 whitespace-nowrap inline-block';
        }

        mobileMenu.appendChild(clonedCta);
    }

    document.body.appendChild(mobileMenu);

    // 7. Toggle Logic
    function closeMenu() {
        mobileMenu.style.transform = 'translateX(100%)';
        document.body.style.overflow = '';
    }

    mobileBtn.addEventListener('click', () => {
        mobileMenu.style.transform = 'translateX(0)';
        document.body.style.overflow = 'hidden'; 
    });

    closeBtn.addEventListener('click', closeMenu);

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', closeMenu);
    });
}

// Trigger logic when scrolling
window.addEventListener('scroll', headerStyle);
// Trigger setup and style checks on load
window.addEventListener('DOMContentLoaded', () => {
    headerStyle();
    setupMobileMenu();
});
window.addEventListener('load', headerStyle);
