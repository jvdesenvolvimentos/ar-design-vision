// Ambientes page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Environment card interactions
    const environmentCards = document.querySelectorAll('.environment-card');
    
    environmentCards.forEach(card => {
        const exploreBtn = card.querySelector('.btn-primary');
        const addBtn = card.querySelector('.btn-outline');
        
        if (exploreBtn) {
            exploreBtn.addEventListener('click', function() {
                const environmentName = card.querySelector('h3').textContent;
                exploreEnvironment(environmentName);
            });
        }
        
        if (addBtn) {
            addBtn.addEventListener('click', function() {
                const environmentName = card.querySelector('h3').textContent;
                addToFavorites(environmentName);
            });
        }
        
        // Card hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Load environment data
    loadEnvironmentData();
});

function exploreEnvironment(environmentName) {
    // Save selected environment for later use
    const environmentData = {
        name: environmentName,
        selectedAt: new Date().toISOString()
    };
    
    storage.set('selected_environment', environmentData);
    showToast(`Abrindo templates para ${environmentName}...`, 'info');
    
    // Simulate loading templates
    setTimeout(() => {
        showEnvironmentTemplates(environmentName);
    }, 1000);
}

function showEnvironmentTemplates(environmentName) {
    const modal = document.createElement('div');
    modal.className = 'environment-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content environment-templates">
                <div class="modal-header">
                    <h3>Templates para ${environmentName}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="templates-grid">
                        ${generateTemplateCards(environmentName)}
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" onclick="startCustomDesign('${environmentName}')">
                        Criar Design Personalizado
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
    
    // Template selection
    const templateCards = modal.querySelectorAll('.template-card');
    templateCards.forEach(templateCard => {
        templateCard.addEventListener('click', function() {
            const templateName = this.querySelector('h4').textContent;
            selectTemplate(environmentName, templateName);
            modal.remove();
        });
    });
}

function generateTemplateCards(environmentName) {
    const templates = getTemplatesForEnvironment(environmentName);
    
    return templates.map(template => `
        <div class="template-card">
            <div class="template-image">
                <img src="${template.image}" alt="${template.name}">
                <div class="template-overlay">
                    <button class="btn btn-primary btn-small">
                        <i data-lucide="eye"></i>
                        Usar Template
                    </button>
                </div>
            </div>
            <div class="template-info">
                <h4>${template.name}</h4>
                <p>${template.description}</p>
                <div class="template-meta">
                    <span><i data-lucide="sofa"></i> ${template.items} itens</span>
                    <span><i data-lucide="star"></i> ${template.rating}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function getTemplatesForEnvironment(environmentName) {
    const templates = {
        'Sala de Estar': [
            {
                name: 'Moderno Minimalista',
                description: 'Design clean com móveis funcionais',
                image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
                items: 5,
                rating: 4.8
            },
            {
                name: 'Aconchegante Familiar',
                description: 'Ambiente caloroso para reunir a família',
                image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85',
                items: 7,
                rating: 4.6
            },
            {
                name: 'Elegante Contemporâneo',
                description: 'Sofisticação em cada detalhe',
                image: 'https://images.unsplash.com/photo-1497366216548-37526070297c',
                items: 6,
                rating: 4.9
            }
        ],
        'Quarto': [
            {
                name: 'Relaxante Zen',
                description: 'Ambiente tranquilo para descanso',
                image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85',
                items: 4,
                rating: 4.7
            },
            {
                name: 'Romântico Clássico',
                description: 'Charme e elegância atemporal',
                image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
                items: 6,
                rating: 4.5
            }
        ],
        'Escritório': [
            {
                name: 'Produtivo Moderno',
                description: 'Foco total na produtividade',
                image: 'https://images.unsplash.com/photo-1497366216548-37526070297c',
                items: 8,
                rating: 4.8
            },
            {
                name: 'Criativo Inspirador',
                description: 'Ambiente que estimula a criatividade',
                image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
                items: 10,
                rating: 4.6
            }
        ],
        'Cozinha': [
            {
                name: 'Chef Gourmet',
                description: 'Tudo que um chef precisa',
                image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136',
                items: 12,
                rating: 4.9
            }
        ]
    };
    
    return templates[environmentName] || [];
}

function selectTemplate(environmentName, templateName) {
    const templateData = {
        environment: environmentName,
        template: templateName,
        selectedAt: new Date().toISOString()
    };
    
    storage.set('selected_template', templateData);
    showToast(`Template "${templateName}" selecionado para ${environmentName}!`, 'success');
    
    // Redirect to AR viewer with template
    setTimeout(() => {
        window.location.href = 'ar-viewer.html';
    }, 1500);
}

function startCustomDesign(environmentName) {
    const customData = {
        environment: environmentName,
        isCustom: true,
        startedAt: new Date().toISOString()
    };
    
    storage.set('custom_design', customData);
    showToast(`Iniciando design personalizado para ${environmentName}...`, 'info');
    
    setTimeout(() => {
        window.location.href = 'ar-viewer.html';
    }, 1000);
}

function addToFavorites(environmentName) {
    let favoriteEnvironments = storage.get('favorite_environments') || [];
    
    if (!favoriteEnvironments.includes(environmentName)) {
        favoriteEnvironments.push(environmentName);
        storage.set('favorite_environments', favoriteEnvironments);
        showToast(`${environmentName} adicionado aos favoritos!`, 'success');
    } else {
        showToast(`${environmentName} já está nos favoritos!`, 'info');
    }
}

function loadEnvironmentData() {
    // Load user's favorite environments
    const favoriteEnvironments = storage.get('favorite_environments') || [];
    const recentEnvironments = storage.get('recent_environments') || [];
    
    // Update UI to show favorites
    favoriteEnvironments.forEach(envName => {
        const envCard = Array.from(document.querySelectorAll('.environment-card')).find(card => 
            card.querySelector('h3').textContent === envName
        );
        
        if (envCard) {
            envCard.classList.add('favorite');
            const addBtn = envCard.querySelector('.btn-outline');
            if (addBtn) {
                addBtn.innerHTML = '<i data-lucide="heart-handshake"></i>';
                addBtn.classList.add('favorited');
            }
        }
    });
}

// Environment recommendations
function getEnvironmentRecommendations() {
    const userPreferences = storage.get('user_preferences') || {};
    const viewHistory = storage.get('environment_history') || [];
    
    // Simple recommendation logic based on history
    const recommendations = [];
    
    if (viewHistory.includes('Sala de Estar')) {
        recommendations.push('Quarto');
    }
    
    if (viewHistory.includes('Escritório')) {
        recommendations.push('Sala de Estar');
    }
    
    return recommendations;
}

// Track environment views
function trackEnvironmentView(environmentName) {
    let history = storage.get('environment_history') || [];
    history.push({
        environment: environmentName,
        viewedAt: new Date().toISOString()
    });
    
    // Keep only last 50 views
    if (history.length > 50) {
        history = history.slice(-50);
    }
    
    storage.set('environment_history', history);
}
