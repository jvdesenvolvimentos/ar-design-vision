
// Catalogo page functionality
document.addEventListener('DOMContentLoaded', function() {
    // View toggle functionality
    const viewButtons = document.querySelectorAll('.view-btn');
    const productsGrid = document.getElementById('productsGrid');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const viewType = this.dataset.view;
            
            // Update active button
            viewButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update grid layout
            if (viewType === 'list') {
                productsGrid.className = 'products-list';
                updateProductCardsForList();
            } else {
                productsGrid.className = 'products-grid';
                updateProductCardsForGrid();
            }
        });
    });
    
    // Filter functionality
    setupFilters();
    
    // Search functionality
    const searchInput = document.querySelector('.search-controls .search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function() {
            filterProducts();
        }, 300));
    }
    
    // Sort functionality
    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortProducts(this.value);
        });
    }
    
    // Product interactions
    setupProductInteractions();
    
    // Favorite functionality
    setupFavorites();
});

function setupFilters() {
    const checkboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]');
    const priceInputs = document.querySelectorAll('.filter-group input[type="text"]');
    const materialSelect = document.querySelector('.filter-group select');
    const applyFiltersBtn = document.querySelector('.filters-section .btn-primary');
    
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            filterProducts();
            showToast('Filtros aplicados!', 'success');
        });
    }
    
    // Auto-filter on checkbox change
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            filterProducts();
        });
    });
}

function filterProducts() {
    const searchTerm = document.querySelector('.search-controls .search-bar input').value.toLowerCase();
    const selectedCategories = Array.from(document.querySelectorAll('.checkbox-group input:checked')).map(cb => cb.nextSibling.textContent.split('(')[0].trim().toLowerCase());
    const minPrice = document.querySelector('.filter-group input[placeholder="Mínimo"]').value;
    const maxPrice = document.querySelector('.filter-group input[placeholder="Máximo"]').value;
    const selectedMaterial = document.querySelector('.filter-group select').value;
    
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        const productCategory = card.querySelector('.category-badge').textContent.toLowerCase();
        const productPrice = parseFloat(card.querySelector('.price').textContent.replace('R$ ', '').replace('.', '').replace(',', '.'));
        const productMaterial = card.querySelector('.material').textContent.toLowerCase();
        
        let show = true;
        
        // Search filter
        if (searchTerm && !productName.includes(searchTerm)) {
            show = false;
        }
        
        // Category filter
        if (selectedCategories.length > 0 && !selectedCategories.includes(productCategory)) {
            show = false;
        }
        
        // Price filter
        if (minPrice && productPrice < parseFloat(minPrice)) {
            show = false;
        }
        if (maxPrice && productPrice > parseFloat(maxPrice)) {
            show = false;
        }
        
        // Material filter
        if (selectedMaterial && selectedMaterial !== 'Selecionar material' && 
            !productMaterial.includes(selectedMaterial.toLowerCase())) {
            show = false;
        }
        
        card.style.display = show ? 'block' : 'none';
    });
}

function sortProducts(sortBy) {
    const productsContainer = document.getElementById('productsGrid');
    const products = Array.from(productsContainer.children);
    
    products.sort((a, b) => {
        switch (sortBy) {
            case 'Menor preço':
                const priceA = parseFloat(a.querySelector('.price').textContent.replace('R$ ', '').replace('.', '').replace(',', '.'));
                const priceB = parseFloat(b.querySelector('.price').textContent.replace('R$ ', '').replace('.', '').replace(',', '.'));
                return priceA - priceB;
            case 'Maior preço':
                const priceA2 = parseFloat(a.querySelector('.price').textContent.replace('R$ ', '').replace('.', '').replace(',', '.'));
                const priceB2 = parseFloat(b.querySelector('.price').textContent.replace('R$ ', '').replace('.', '').replace(',', '.'));
                return priceB2 - priceA2;
            case 'Nome A-Z':
                return a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent);
            default:
                return 0;
        }
    });
    
    products.forEach(product => {
        productsContainer.appendChild(product);
    });
}

function setupProductInteractions() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const arButton = card.querySelector('.btn-primary');
        const cartButton = card.querySelector('.btn-outline');
        
        if (arButton) {
            arButton.addEventListener('click', function() {
                const productName = card.querySelector('h3').textContent;
                
                // Save product selection for AR viewer
                const productData = {
                    name: productName,
                    price: card.querySelector('.price').textContent,
                    material: card.querySelector('.material').textContent,
                    dimensions: card.querySelector('.dimensions').textContent
                };
                
                storage.set('selected_product', productData);
                showToast(`Abrindo ${productName} no visualizador AR...`, 'info');
                
                setTimeout(() => {
                    window.location.href = 'ar-viewer.html';
                }, 1000);
            });
        }
        
        if (cartButton && !cartButton.disabled) {
            cartButton.addEventListener('click', function() {
                const productName = card.querySelector('h3').textContent;
                addToCart(productName);
            });
        }
    });
}

function setupFavorites() {
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    const favorites = storage.get('favorites') || [];
    
    // Set initial favorite states
    favoriteButtons.forEach((button, index) => {
        const productName = button.closest('.product-card').querySelector('h3').textContent;
        if (favorites.includes(productName)) {
            button.classList.add('active');
        }
        
        button.addEventListener('click', function() {
            toggleFavorite(productName, this);
        });
    });
}

function toggleFavorite(productName, button) {
    let favorites = storage.get('favorites') || [];
    
    if (favorites.includes(productName)) {
        favorites = favorites.filter(fav => fav !== productName);
        button.classList.remove('active');
        showToast(`${productName} removido dos favoritos`, 'info');
    } else {
        favorites.push(productName);
        button.classList.add('active');
        showToast(`${productName} adicionado aos favoritos`, 'success');
    }
    
    storage.set('favorites', favorites);
}

function addToCart(productName) {
    let cart = storage.get('cart') || [];
    cart.push({
        name: productName,
        addedAt: new Date().toISOString()
    });
    storage.set('cart', cart);
    showToast(`${productName} adicionado ao carrinho!`, 'success');
}

function updateProductCardsForList() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.style.display = 'flex';
        card.style.flexDirection = 'row';
    });
}

function updateProductCardsForGrid() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.style.display = 'block';
        card.style.flexDirection = 'column';
    });
}

// Pagination functionality
document.addEventListener('DOMContentLoaded', function() {
    const paginationButtons = document.querySelectorAll('.pagination .btn');
    
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent === 'Anterior' || this.textContent === 'Próximo') {
                // Handle prev/next logic
                showToast('Carregando próxima página...', 'info');
            } else {
                // Handle page number
                paginationButtons.forEach(btn => btn.classList.remove('btn-primary'));
                paginationButtons.forEach(btn => btn.classList.add('btn-outline'));
                this.classList.remove('btn-outline');
                this.classList.add('btn-primary');
            }
        });
    });
});
