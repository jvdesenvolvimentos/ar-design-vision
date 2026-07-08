
// Index page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Hero section interactions
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    
    heroButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            
            if (buttonText.includes('Começar')) {
                // Redirect to AR viewer
                window.location.href = 'ar-viewer.html';
            } else if (buttonText.includes('Demo')) {
                // Show demo modal or video
                showDemoModal();
            }
        });
    });
    
    // Feature cards hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // CTA section
    const ctaButton = document.querySelector('.cta .btn-primary');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            window.location.href = 'ar-viewer.html';
        });
    }
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .hero-text, .hero-image');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    // Counter animation for stats (if any)
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 20);
    }
    
    // Initialize counters if they exist
    const counters = document.querySelectorAll('[data-counter]');
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.counter);
        observer.observe(counter);
        counter.addEventListener('intersect', () => {
            animateCounter(counter, target);
        });
    });
});

// Demo modal functionality
function showDemoModal() {
    const modal = document.createElement('div');
    modal.className = 'demo-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Demo do MobiliAR</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="video-placeholder">
                        <i data-lucide="play-circle"></i>
                        <p>Vídeo demonstrativo em breve</p>
                    </div>
                    <p>Veja como é fácil visualizar móveis em sua casa com realidade aumentada!</p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" onclick="window.location.href='ar-viewer.html'">
                        Experimentar Agora
                    </button>
                    <button class="btn btn-outline modal-close">Fechar</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    lucide.createIcons();
    
    // Close modal functionality
    const closeButtons = modal.querySelectorAll('.modal-close');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.remove();
        });
    });
    
    // Close on overlay click
    modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            modal.remove();
        }
    });
}

// Newsletter signup (if applicable)
function setupNewsletterSignup() {
    const newsletterForm = document.querySelector('#newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // Simulate API call
                showToast('Obrigado! Você será notificado sobre novidades.', 'success');
                this.reset();
            }
        });
    }
}

// Initialize newsletter signup
document.addEventListener('DOMContentLoaded', setupNewsletterSignup);
