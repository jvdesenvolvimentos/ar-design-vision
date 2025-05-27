
// Materiais page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Material card interactions
    const materialCards = document.querySelectorAll('.material-card');
    
    materialCards.forEach(card => {
        const viewBtn = card.querySelector('.btn-primary');
        const favoriteBtn = card.querySelector('.favorite-btn');
        
        if (viewBtn) {
            viewBtn.addEventListener('click', function() {
                const materialName = card.querySelector('h3').textContent;
                viewMaterial(materialName, card);
            });
        }
        
        if (favoriteBtn) {
            favoriteBtn.addEventListener('click', function() {
                const materialName = card.querySelector('h3').textContent;
                toggleMaterialFavorite(materialName, this);
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
    
    // Load material favorites
    loadMaterialFavorites();
    
    // Setup material filtering
    setupMaterialFiltering();
});

function viewMaterial(materialName, card) {
    const materialData = {
        name: materialName,
        category: card.querySelector('.category').textContent,
        color: card.querySelector('.color-indicator').style.backgroundColor,
        priceTag: card.querySelector('.price-tag').textContent,
        image: card.querySelector('img').src
    };
    
    showMaterialDetails(materialData);
}

function showMaterialDetails(materialData) {
    const modal = document.createElement('div');
    modal.className = 'material-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content material-details">
                <div class="modal-header">
                    <h3>${materialData.name}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="material-preview">
                        <div class="material-image-large">
                            <img src="${materialData.image}" alt="${materialData.name}">
                            <div class="color-info">
                                <div class="color-circle" style="background-color: ${materialData.color}"></div>
                                <span>Cor Principal</span>
                            </div>
                        </div>
                        <div class="material-info-detailed">
                            <div class="info-group">
                                <h4>Categoria</h4>
                                <p>${materialData.category}</p>
                            </div>
                            <div class="info-group">
                                <h4>Classificação</h4>
                                <span class="price-tag">${materialData.priceTag}</span>
                            </div>
                            <div class="info-group">
                                <h4>Características</h4>
                                <ul>
                                    ${getMaterialCharacteristics(materialData.category)}
                                </ul>
                            </div>
                            <div class="info-group">
                                <h4>Aplicações</h4>
                                <p>${getMaterialApplications(materialData.category)}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" onclick="selectMaterialForProject('${materialData.name}')">
                        <i data-lucide="plus"></i>
                        Usar no Projeto
                    </button>
                    <button class="btn btn-outline" onclick="addToMaterialLibrary('${materialData.name}')">
                        <i data-lucide="bookmark"></i>
                        Salvar na Biblioteca
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

function getMaterialCharacteristics(category) {
    const characteristics = {
        'Madeira': [
            'Durabilidade natural',
            'Textura única',
            'Fácil manutenção',
            'Resistente a riscos'
        ],
        'Tecido': [
            'Conforto superior',
            'Variedade de texturas',
            'Fácil limpeza',
            'Respirável'
        ],
        'Metal': [
            'Alta resistência',
            'Design moderno',
            'Durabilidade superior',
            'Fácil manutenção'
        ],
        'Couro': [
            'Luxo e elegância',
            'Durabilidade excepcional',
            'Melhora com o tempo',
            'Fácil limpeza'
        ]
    };
    
    return (characteristics[category] || []).map(char => `<li>${char}</li>`).join('');
}

function getMaterialApplications(category) {
    const applications = {
        'Madeira': 'Ideal para móveis estruturais, mesas, estantes e elementos decorativos. Combina com estilos rústicos e modernos.',
        'Tecido': 'Perfeito para estofados, almofadas e elementos de conforto. Excelente para ambientes aconchegantes.',
        'Metal': 'Ótimo para estruturas, pés de móveis e detalhes industriais. Ideal para estilos modernos e industriais.',
        'Couro': 'Exclusivo para estofados premium, poltronas e sofás de alto padrão. Perfeito para ambientes sofisticados.'
    };
    
    return applications[category] || 'Material versátil para diversas aplicações.';
}

function toggleMaterialFavorite(materialName, button) {
    let favoriteMaterials = storage.get('favorite_materials') || [];
    
    if (favoriteMaterials.includes(materialName)) {
        favoriteMaterials = favoriteMaterials.filter(mat => mat !== materialName);
        button.classList.remove('active');
        showToast(`${materialName} removido dos favoritos`, 'info');
    } else {
        favoriteMaterials.push(materialName);
        button.classList.add('active');
        showToast(`${materialName} adicionado aos favoritos`, 'success');
    }
    
    storage.set('favorite_materials', favoriteMaterials);
}

function loadMaterialFavorites() {
    const favoriteMaterials = storage.get('favorite_materials') || [];
    
    favoriteMaterials.forEach(materialName => {
        const materialCard = Array.from(document.querySelectorAll('.material-card')).find(card => 
            card.querySelector('h3').textContent === materialName
        );
        
        if (materialCard) {
            const favoriteBtn = materialCard.querySelector('.favorite-btn');
            if (favoriteBtn) {
                favoriteBtn.classList.add('active');
            }
        }
    });
}

function setupMaterialFiltering() {
    // Add filter controls if needed
    const filterContainer = document.createElement('div');
    filterContainer.className = 'material-filters';
    filterContainer.innerHTML = `
        <div class="filter-buttons">
            <button class="filter-btn active" data-category="all">Todos</button>
            <button class="filter-btn" data-category="Madeira">Madeira</button>
            <button class="filter-btn" data-category="Tecido">Tecido</button>
            <button class="filter-btn" data-category="Metal">Metal</button>
            <button class="filter-btn" data-category="Couro">Couro</button>
        </div>
    `;
    
    const pageHeader = document.querySelector('.page-header');
    pageHeader.after(filterContainer);
    
    // Filter functionality
    const filterButtons = filterContainer.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter materials
            filterMaterialsByCategory(category);
        });
    });
}

function filterMaterialsByCategory(category) {
    const materialCards = document.querySelectorAll('.material-card');
    
    materialCards.forEach(card => {
        const materialCategory = card.querySelector('.category').textContent;
        
        if (category === 'all' || materialCategory === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function selectMaterialForProject(materialName) {
    const selectedMaterials = storage.get('selected_materials') || [];
    selectedMaterials.push({
        name: materialName,
        selectedAt: new Date().toISOString()
    });
    storage.set('selected_materials', selectedMaterials);
    
    showToast(`${materialName} selecionado para o projeto!`, 'success');
    
    // Close modal
    document.querySelector('.material-modal').remove();
    
    // Optionally redirect to AR viewer
    setTimeout(() => {
        if (confirm('Deseja ir para o visualizador AR agora?')) {
            window.location.href = 'ar-viewer.html';
        }
    }, 1000);
}

function addToMaterialLibrary(materialName) {
    let materialLibrary = storage.get('material_library') || [];
    
    if (!materialLibrary.includes(materialName)) {
        materialLibrary.push(materialName);
        storage.set('material_library', materialLibrary);
        showToast(`${materialName} adicionado à biblioteca!`, 'success');
    } else {
        showToast(`${materialName} já está na biblioteca!`, 'info');
    }
    
    // Close modal
    document.querySelector('.material-modal').remove();
}

// Material comparison functionality
function compareMaterials(materials) {
    // Implementation for comparing multiple materials
    console.log('Comparing materials:', materials);
}

// Material recommendations based on selected furniture
function getRecommendedMaterials(furnitureType) {
    const recommendations = {
        'sofa': ['Tecido', 'Couro'],
        'mesa': ['Madeira', 'Metal'],
        'estante': ['Madeira', 'Metal'],
        'cama': ['Madeira', 'Tecido'],
        'guarda-roupa': ['Madeira']
    };
    
    return recommendations[furnitureType] || [];
}
