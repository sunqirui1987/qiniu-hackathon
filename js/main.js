document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initModals();
    initShowcaseVideos();
    initAnalytics();
});

function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function initModals() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const ctaBtn = document.getElementById('ctaBtn');
    
    loginBtn.addEventListener('click', function() {
        openModal(loginModal);
        trackEvent('auth_button_click', {
            button_type: 'login',
            position: 'nav_bar'
        });
    });
    
    registerBtn.addEventListener('click', function() {
        openModal(registerModal);
        trackEvent('auth_button_click', {
            button_type: 'register',
            position: 'nav_bar'
        });
    });
    
    ctaBtn.addEventListener('click', function() {
        openModal(registerModal);
        trackEvent('cta_button_click', {
            button_text: '开始创作',
            position: 'hero'
        });
    });
    
    const closeButtons = document.querySelectorAll('.modal-close');
    closeButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const modal = btn.closest('.modal');
            closeModal(modal);
        });
    });
    
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });
}

function openModal(modal) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

function initShowcaseVideos() {
    const showcaseCards = document.querySelectorAll('.showcase-card');
    
    showcaseCards.forEach(function(card) {
        const video = card.querySelector('.showcase-video');
        
        card.addEventListener('mouseenter', function() {
            video.play().catch(function(error) {
                console.log('Video autoplay prevented:', error);
            });
            
            const videoId = card.getAttribute('data-video-id');
            trackEvent('showcase_video_play', {
                video_id: videoId,
                interaction_type: 'hover'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            video.pause();
            video.currentTime = 0;
        });
        
        card.addEventListener('click', function() {
            const videoId = card.getAttribute('data-video-id');
            trackEvent('showcase_card_click', {
                video_id: videoId
            });
        });
    });
}

function initAnalytics() {
    trackPageView();
}

function trackPageView() {
    if (typeof Amplitude !== 'undefined') {
        Amplitude.track('[Amplitude] Page Viewed', {
            page: 'landing_page',
            referrer: document.referrer
        });
    }
}

function trackEvent(eventName, properties) {
    if (typeof Amplitude !== 'undefined') {
        Amplitude.track(eventName, properties);
    }
    
    console.log('Event tracked:', eventName, properties);
}

const heroVideo = document.getElementById('heroVideo');
if (heroVideo) {
    heroVideo.addEventListener('canplay', function() {
        console.log('Hero video ready to play');
    });
    
    heroVideo.addEventListener('error', function() {
        console.error('Hero video failed to load');
    });
}
