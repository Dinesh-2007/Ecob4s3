// Authentication system
let isLoginMode = false;
let currentUser = null;

// Google OAuth Configuration
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com'; // Replace with your actual client ID

// Initialize Google OAuth when page loads
function initGoogleAuth() {
    // In a real implementation, you would use the Google Identity Services
    // Example initialization:
    /*
    google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleCallback
    });
    */
    console.log('Google OAuth initialized');
}

// Modal functionality
const modal = document.getElementById('authModal');
const openModalBtn = document.getElementById('openModal');
const heroSignupBtn = document.getElementById('heroSignup');
const closeModalBtn = document.getElementById('closeModal');
const toggleModeBtn = document.getElementById('toggleMode');
const authForm = document.getElementById('authForm');
const googleSignInBtn = document.getElementById('googleSignIn');

// Open modal
function openModal() {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    resetForm();
}

// Toggle between login and signup
function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    updateModalUI();
}

// Update modal UI based on mode
function updateModalUI() {
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const nameGroup = document.getElementById('nameGroup');
    const confirmPasswordGroup = document.getElementById('confirmPasswordGroup');
    const submitBtnText = document.getElementById('submitBtnText');
    const toggleText = document.getElementById('toggleText');
    const toggleMode = document.getElementById('toggleMode');
    const googleBtnText = document.getElementById('googleBtnText');

    if (isLoginMode) {
        modalTitle.textContent = 'Welcome Back';
        modalSubtitle.textContent = 'Sign in to continue your sustainable journey';
        nameGroup.style.display = 'none';
        confirmPasswordGroup.style.display = 'none';
        submitBtnText.textContent = 'Sign In';
        toggleText.textContent = "Don't have an account?";
        toggleMode.textContent = 'Sign Up';
        googleBtnText.textContent = 'Sign in with Google';
    } else {
        modalTitle.textContent = 'Join Eco Finds';
        modalSubtitle.textContent = 'Start your sustainable shopping journey today';
        nameGroup.style.display = 'flex';
        confirmPasswordGroup.style.display = 'flex';
        submitBtnText.textContent = 'Create Account';
        toggleText.textContent = 'Already have an account?';
        toggleMode.textContent = 'Sign In';
        googleBtnText.textContent = 'Continue with Google';
    }

    // Update form validation
    updateFormValidation();
}

// Update form validation based on mode
function updateFormValidation() {
    const fullName = document.getElementById('fullName');
    const confirmPassword = document.getElementById('confirmPassword');

    if (isLoginMode) {
        fullName.required = false;
        confirmPassword.required = false;
    } else {
        fullName.required = true;
        confirmPassword.required = true;
    }
}

// Reset form
function resetForm() {
    authForm.reset();
    hideMessage('success');
    hideMessage('error');
    setLoading(false, 'form');
    setLoading(false, 'google');
}

// Show/hide messages
function showMessage(type, message) {
    const messageEl = document.getElementById(type === 'success' ? 'successMessage' : 'errorMessage');
    messageEl.textContent = message;
    messageEl.style.display = 'block';
    
    // Auto-hide success messages after 3 seconds
    if (type === 'success') {
        setTimeout(() => hideMessage(type), 3000);
    }
}

function hideMessage(type) {
    const messageEl = document.getElementById(type === 'success' ? 'successMessage' : 'errorMessage');
    messageEl.style.display = 'none';
}

// Set loading state
function setLoading(loading, type) {
    if (type === 'google') {
        const btn = document.getElementById('googleSignIn');
        const spinner = document.getElementById('googleSpinner');
        const text = document.getElementById('googleBtnText');
        
        btn.disabled = loading;
        spinner.style.display = loading ? 'block' : 'none';
        text.style.opacity = loading ? '0.7' : '1';
    } else {
        const btn = document.getElementById('submitBtn');
        const spinner = document.getElementById('formSpinner');
        const text = document.getElementById('submitBtnText');
        
        btn.disabled = loading;
        spinner.style.display = loading ? 'block' : 'none';
        text.style.opacity = loading ? '0.7' : '1';
    }
}

// Google Sign-In handler
function handleGoogleSignIn() {
    setLoading(true, 'google');
    hideMessage('error');

    // Simulate Google OAuth process
    // In a real implementation, you would use:
    /*
    google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            // Handle error
            setLoading(false, 'google');
            showMessage('error', 'Google sign-in failed. Please try again.');
        }
    });
    */

    setTimeout(() => {
        try {
            // Simulate successful Google authentication
            const mockGoogleUser = {
                id: 'google_' + Date.now(),
                name: 'John Doe',
                email: 'john.doe@gmail.com',
                picture: 'https://via.placeholder.com/150',
                provider: 'google'
            };

            handleSuccessfulAuth(mockGoogleUser);
        } catch (error) {
            setLoading(false, 'google');
            showMessage('error', 'Google sign-in failed. Please try again.');
            console.error('Google sign-in error:', error);
        }
    }, 2000);
}

// Handle Google OAuth callback (for real implementation)
function handleGoogleCallback(response) {
    try {
        // Decode the JWT token
        const payload = JSON.parse(atob(response.credential.split('.')[1]));
        
        const userData = {
            id: 'google_' + payload.sub,
            name: payload.name,
            email: payload.email,
            picture: payload.picture,
            provider: 'google'
        };

        handleSuccessfulAuth(userData);
    } catch (error) {
        setLoading(false, 'google');
        showMessage('error', 'Google authentication failed. Please try again.');
        console.error('Google callback error:', error);
    }
}

// Traditional form submission handler
function handleFormSubmit(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const fullName = document.getElementById('fullName').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validation
    if (!isLoginMode && password !== confirmPassword) {
        showMessage('error', 'Passwords do not match.');
        return;
    }

    if (password.length < 6) {
        showMessage('error', 'Password must be at least 6 characters long.');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('error', 'Please enter a valid email address.');
        return;
    }

    setLoading(true, 'form');
    hideMessage('error');

    // Simulate API call
    setTimeout(() => {
        try {
            if (isLoginMode) {
                // Simulate login
                const userData = {
                    id: 'user_' + Date.now(),
                    name: fullName || email.split('@')[0],
                    email: email,
                    provider: 'email'
                };
                handleSuccessfulAuth(userData);
            } else {
                // Simulate registration
                const userData = {
                    id: 'user_' + Date.now(),
                    name: fullName,
                    email: email,
                    provider: 'email'
                };
                handleSuccessfulAuth(userData);
            }
        } catch (error) {
            setLoading(false, 'form');
            showMessage('error', 'Authentication failed. Please try again.');
            console.error('Auth error:', error);
        }
    }, 2000);
}

// Handle successful authentication
function handleSuccessfulAuth(userData) {
    currentUser = userData;
    
    // Store user data (in real app, use secure storage)
    sessionStorage.setItem('ecoFindsUser', JSON.stringify(userData));
    
    setLoading(false, 'form');
    setLoading(false, 'google');
    
    const action = isLoginMode ? 'signed in' : 'registered';
    showMessage('success', `Successfully ${action}! Welcome${userData.name ? ', ' + userData.name : ''}!`);
    
    // Update UI to reflect logged-in state
    updateUIForLoggedInUser(userData);
    
    // Close modal after delay
    setTimeout(() => {
        closeModal();
    }, 2000);
}

// Update UI for logged-in user
function updateUIForLoggedInUser(user) {
    // Update header CTA button
    const ctaButton = document.getElementById('openModal');
    ctaButton.innerHTML = `<i class="fas fa-user"></i> ${user.name}`;
    ctaButton.onclick = showUserMenu;
    
    console.log('User logged in:', user);
}

// Show user menu (placeholder function)
function showUserMenu(e) {
    e.preventDefault();
    
    // Create a simple dropdown menu
    const existingMenu = document.querySelector('.user-menu');
    if (existingMenu) {
        existingMenu.remove();
        return;
    }

    const userMenu = document.createElement('div');
    userMenu.className = 'user-menu';
    userMenu.style.cssText = `
        position: absolute;
        top: 100%;
        right: 0;
        background: white;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        min-width: 200px;
        z-index: 1001;
        margin-top: 10px;
    `;

    userMenu.innerHTML = `
        <div style="padding: 1rem; border-bottom: 1px solid #eee;">
            <strong>${currentUser.name}</strong><br>
            <small style="color: #666;">${currentUser.email}</small>
        </div>
        <a href="#profile" style="display: block; padding: 0.75rem 1rem; color: #333; text-decoration: none; transition: background 0.3s;">
            <i class="fas fa-user"></i> Profile
        </a>
        <a href="#orders" style="display: block; padding: 0.75rem 1rem; color: #333; text-decoration: none; transition: background 0.3s;">
            <i class="fas fa-shopping-bag"></i> My Orders
        </a>
        <a href="#settings" style="display: block; padding: 0.75rem 1rem; color: #333; text-decoration: none; transition: background 0.3s;">
            <i class="fas fa-cog"></i> Settings
        </a>
        <hr style="margin: 0; border: none; border-top: 1px solid #eee;">
        <a href="#logout" onclick="handleLogout()" style="display: block; padding: 0.75rem 1rem; color: #dc3545; text-decoration: none; transition: background 0.3s;">
            <i class="fas fa-sign-out-alt"></i> Logout
        </a>
    `;

    // Add hover effects
    userMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.background = '#f8f9fa';
        });
        link.addEventListener('mouseleave', () => {
            link.style.background = 'transparent';
        });
    });

    const ctaButton = document.getElementById('openModal');
    ctaButton.style.position = 'relative';
    ctaButton.appendChild(userMenu);

    // Close menu when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function closeMenu(e) {
            if (!ctaButton.contains(e.target)) {
                userMenu.remove();
                document.removeEventListener('click', closeMenu);
            }
        });
    }, 100);
}

// Handle logout
function handleLogout() {
    currentUser = null;
    sessionStorage.removeItem('ecoFindsUser');
    
    // Reset header button
    const ctaButton = document.getElementById('openModal');
    ctaButton.innerHTML = 'Get Started';
    ctaButton.onclick = () => openModal();
    
    // Remove user menu
    const userMenu = document.querySelector('.user-menu');
    if (userMenu) userMenu.remove();
    
    console.log('User logged out');
}

// Event listeners
openModalBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!currentUser) openModal();
});

heroSignupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!currentUser) openModal();
});

closeModalBtn.addEventListener('click', closeModal);

toggleModeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleAuthMode();
});

googleSignInBtn.addEventListener('click', handleGoogleSignIn);

authForm.addEventListener('submit', handleFormSubmit);

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }
});

// Check for existing user session on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedUser = sessionStorage.getItem('ecoFindsUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUIForLoggedInUser(currentUser);
    }
    
    // Initialize Google Auth
    initGoogleAuth();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Skip if it's the modal trigger or user menu
        if (this.id === 'openModal' || this.id === 'heroSignup' || currentUser) return;
        
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards and category items
document.querySelectorAll('.feature-card, .category-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Counter animation for stats
const animateCounter = (element, target) => {
    const increment = target / 100;
    let current = 0;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString() + 
            (target >= 1000000 ? 'M+' : target >= 1000 ? 'K+' : target < 100 ? '%' : '');
    }, 20);
};

// Stats counter observer
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statItems = entry.target.querySelectorAll('.stat-item h3');
            const targets = [50, 100, 2, 95];
            statItems.forEach((item, index) => {
                animateCounter(item, targets[index] * (index === 2 ? 1000000 : index < 2 ? 1000 : 1));
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Mobile menu toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'white';
            navLinks.style.padding = '1rem';
            navLinks.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        }
    });
}

// Form validation helpers
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

// Add real-time form validation
document.getElementById('email').addEventListener('blur', function() {
    if (this.value && !validateEmail(this.value)) {
        this.style.borderColor = '#dc3545';
        showMessage('error', 'Please enter a valid email address.');
    } else {
        this.style.borderColor = '#e0e0e0';
        hideMessage('error');
    }
});

document.getElementById('password').addEventListener('blur', function() {
    if (this.value && !validatePassword(this.value)) {
        this.style.borderColor = '#dc3545';
        showMessage('error', 'Password must be at least 6 characters long.');
    } else {
        this.style.borderColor = '#e0e0e0';
        hideMessage('error');
    }
});

document.getElementById('confirmPassword').addEventListener('blur', function() {
    const password = document.getElementById('password').value;
    if (this.value && this.value !== password) {
        this.style.borderColor = '#dc3545';
        showMessage('error', 'Passwords do not match.');
    } else {
        this.style.borderColor = '#e0e0e0';
        hideMessage('error');
    }
});