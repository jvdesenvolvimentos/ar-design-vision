// AR Viewer page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AR viewer
    initializeARViewer();
    
    // Setup controls
    setupDimensionControls();
    setupFurnitureControls();
    setupMaterialControls();
    
    // Load saved selections
    loadSavedSelections();
    
    // Back button functionality
    const backButton = document.querySelector('.btn-back');
    if (backButton) {
        backButton.addEventListener('click', function() {
            history.back();
        });
    }
    
    // Action buttons
    setupActionButtons();
});

function initializeARViewer() {
    const startArBtn = document.getElementById('startArBtn');
    const exitArBtn = document.getElementById('exitArBtn');
    const arViewerArea = document.getElementById('arViewerArea');
    const arActive = document.getElementById('arActive');
    
    if (startArBtn) {
        startArBtn.addEventListener('click', function() {
            startARMode();
        });
    }
    
    if (exitArBtn) {
        exitArBtn.addEventListener('click', function() {
            exitARMode();
        });
    }
}

function startARMode() {
    const arViewerArea = document.getElementById('arViewerArea');
    const arActive = document.getElementById('arActive');
    
    // Show loading state
    showToast('Iniciando câmera AR...', 'info');
    
    // Simulate AR initialization
    setTimeout(() => {
        arViewerArea.querySelector('.ar-placeholder').style.display = 'none';
        arActive.style.display = 'block';
        
        // Update furniture name in AR view
        const selectedFurniture = document.getElementById('furnitureSelect').value;
        const furnitureOptions = {
            'sofa': 'Sofá',
            'mesa': 'Mesa de Centro',
            'estante': 'Estante',
            'cama': 'Cama',
            'guarda-roupa': 'Guarda-roupa'
        };
        
        document.getElementById('furnitureName').textContent = furnitureOptions[selectedFurniture];
        
        showToast('AR ativado! Posicione o móvel no ambiente', 'success');
        
        // Track AR usage
        trackARUsage();
    }, 2000);
}

function exitARMode() {
    const arViewerArea = document.getElementById('arViewerArea');
    const arActive = document.getElementById('arActive');
    
    arViewerArea.querySelector('.ar-placeholder').style.display = 'block';
    arActive.style.display = 'none';
    
    showToast('AR desativado', 'info');
}

function setupDimensionControls() {
    const widthSlider = document.getElementById('widthSlider');
    const heightSlider = document.getElementById('heightSlider');
    const depthSlider = document.getElementById('depthSlider');
    
    const widthValue = document.getElementById('widthValue');
    const heightValue = document.getElementById('heightValue');
    const depthValue = document.getElementById('depthValue');
    
    if (widthSlider) {
        widthSlider.addEventListener('input', function() {
            widthValue.textContent = this.value;
            updateFurnitureDimensions();
        });
    }
    
    if (heightSlider) {
        heightSlider.addEventListener('input', function() {
            heightValue.textContent = this.value;
            updateFurnitureDimensions();
        });
    }
    
    if (depthSlider) {
        depthSlider.addEventListener('input', function() {
            depthValue.textContent = this.value;
            updateFurnitureDimensions();
        });
    }
}

function setupFurnitureControls() {
    const furnitureSelect = document.getElementById('furnitureSelect');
    
    if (furnitureSelect) {
        furnitureSelect.addEventListener('change', function() {
            const selectedFurniture = this.value;
            updateFurnitureType(selectedFurniture);
            
            // Update AR view if active
            const furnitureName = document.getElementById('furnitureName');
            if (furnitureName) {
                const furnitureOptions = {
                    'sofa': 'Sofá',
                    'mesa': 'Mesa de Centro',
                    'estante': 'Estante',
                    'cama': 'Cama',
                    'guarda-roupa': 'Guarda-roupa'
                };
                furnitureName.textContent = furnitureOptions[selectedFurniture];
            }
        });
    }
}

function setupMaterialControls() {
    const materialSelect = document.getElementById('materialSelect');
    
    if (materialSelect) {
        materialSelect.addEventListener('change', function() {
            const selectedMaterial = this.value;
            updateFurnitureMaterial(selectedMaterial);
        });
    }
}

function setupActionButtons() {
    const actionButtons = document.querySelectorAll('.control-actions .btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            
            switch(buttonText) {
                case 'Aplicar Alterações':
                    applyChanges();
                    break;
                case 'Salvar Configuração':
                    saveConfiguration();
                    break;
                case 'Exportar Medidas':
                    exportMeasurements();
                    break;
            }
        });
    });
    
    // Header action buttons
    const saveBtn = document.querySelector('.header-actions .btn:first-child');
    const shareBtn = document.querySelector('.header-actions .btn:last-child');
    
    if (saveBtn) {
        saveBtn.addEventListener('click', saveProject);
    }
    
    if (shareBtn) {
        shareBtn.addEventListener('click', shareProject);
    }
}

function updateFurnitureDimensions() {
    const dimensions = {
        width: document.getElementById('widthSlider').value,
        height: document.getElementById('heightSlider').value,
        depth: document.getElementById('depthSlider').value
    };
    
    // Save current dimensions
    storage.set('current_dimensions', dimensions);
    
    // Update AR preview (simulated)
    console.log('Updated dimensions:', dimensions);
}

function updateFurnitureType(furnitureType) {
    // Update dimension limits based on furniture type
    const dimensionLimits = {
        'sofa': { width: [120, 300], height: [70, 100], depth: [80, 120] },
        'mesa': { width: [60, 200], height: [40, 80], depth: [60, 120] },
        'estante': { width: [80, 250], height: [150, 250], depth: [25, 50] },
        'cama': { width: [140, 200], height: [40, 60], depth: [190, 210] },
        'guarda-roupa': { width: [120, 300], height: [180, 250], depth: [50, 70] }
    };
    
    const limits = dimensionLimits[furnitureType];
    if (limits) {
        const widthSlider = document.getElementById('widthSlider');
        const heightSlider = document.getElementById('heightSlider');
        const depthSlider = document.getElementById('depthSlider');
        
        if (widthSlider) {
            widthSlider.min = limits.width[0];
            widthSlider.max = limits.width[1];
            widthSlider.value = Math.floor((limits.width[0] + limits.width[1]) / 2);
            document.getElementById('widthValue').textContent = widthSlider.value;
        }
        
        if (heightSlider) {
            heightSlider.min = limits.height[0];
            heightSlider.max = limits.height[1];
            heightSlider.value = Math.floor((limits.height[0] + limits.height[1]) / 2);
            document.getElementById('heightValue').textContent = heightSlider.value;
        }
        
        if (depthSlider) {
            depthSlider.min = limits.depth[0];
            depthSlider.max = limits.depth[1];
            depthSlider.value = Math.floor((limits.depth[0] + limits.depth[1]) / 2);
            document.getElementById('depthValue').textContent = depthSlider.value;
        }
    }
    
    storage.set('current_furniture_type', furnitureType);
}

function updateFurnitureMaterial(material) {
    storage.set('current_material', material);
    console.log('Updated material:', material);
}

function applyChanges() {
    const currentConfig = getCurrentConfiguration();
    
    showToast('Aplicando alterações...', 'info');
    
    // Simulate applying changes
    setTimeout(() => {
        showToast('Alterações aplicadas com sucesso!', 'success');
        storage.set('applied_config', currentConfig);
    }, 1000);
}

function saveConfiguration() {
    const config = getCurrentConfiguration();
    
    let savedConfigs = storage.get('saved_configurations') || [];
    savedConfigs.push({
        ...config,
        id: Date.now(),
        name: `Configuração ${savedConfigs.length + 1}`,
        savedAt: new Date().toISOString()
    });
    
    storage.set('saved_configurations', savedConfigs);
    showToast('Configuração salva!', 'success');
}

function exportMeasurements() {
    const config = getCurrentConfiguration();
    
    const measurementData = `
Projeto MobiliAR - Especificações

Móvel: ${config.furniture}
Material: ${config.material}

Dimensões:
- Largura: ${config.dimensions.width} cm
- Altura: ${config.dimensions.height} cm
- Profundidade: ${config.dimensions.depth} cm

Data: ${new Date().toLocaleDateString('pt-BR')}
    `.trim();
    
    // Create and download file
    const blob = new Blob([measurementData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `medidas-mobiliar-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('Medidas exportadas!', 'success');
}

function saveProject() {
    const projectData = {
        ...getCurrentConfiguration(),
        id: Date.now(),
        name: `Projeto ${new Date().toLocaleDateString('pt-BR')}`,
        createdAt: new Date().toISOString()
    };
    
    let savedProjects = storage.get('mobiliar_projects') || [];
    savedProjects.push(projectData);
    storage.set('mobiliar_projects', savedProjects);
    
    showToast('Projeto salvo com sucesso!', 'success');
}

function shareProject() {
    const config = getCurrentConfiguration();
    const shareText = `Confira meu projeto no MobiliAR: ${config.furniture} em ${config.material}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Meu Projeto MobiliAR',
            text: shareText,
            url: window.location.href
        }).then(() => {
            showToast('Projeto compartilhado!', 'success');
        }).catch((error) => {
            console.log('Error sharing:', error);
            fallbackShare(shareText);
        });
    } else {
        fallbackShare(shareText);
    }
}

function fallbackShare(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Link copiado para área de transferência!', 'success');
        });
    }
}

function getCurrentConfiguration() {
    const furnitureSelect = document.getElementById('furnitureSelect');
    const materialSelect = document.getElementById('materialSelect');
    const widthSlider = document.getElementById('widthSlider');
    const heightSlider = document.getElementById('heightSlider');
    const depthSlider = document.getElementById('depthSlider');
    
    return {
        furniture: furnitureSelect ? furnitureSelect.value : 'sofa',
        material: materialSelect ? materialSelect.value : 'madeira',
        dimensions: {
            width: widthSlider ? widthSlider.value : 200,
            height: heightSlider ? heightSlider.value : 80,
            depth: depthSlider ? depthSlider.value : 90
        }
    };
}

function loadSavedSelections() {
    // Load selected product from catalog
    const selectedProduct = storage.get('selected_product');
    if (selectedProduct) {
        showToast(`Carregando ${selectedProduct.name}...`, 'info');
        // Apply product settings to controls
    }
    
    // Load selected environment
    const selectedEnvironment = storage.get('selected_environment');
    if (selectedEnvironment) {
        console.log('Selected environment:', selectedEnvironment);
    }
    
    // Load selected template
    const selectedTemplate = storage.get('selected_template');
    if (selectedTemplate) {
        console.log('Selected template:', selectedTemplate);
    }
    
    // Load selected materials
    const selectedMaterials = storage.get('selected_materials');
    if (selectedMaterials && selectedMaterials.length > 0) {
        const latestMaterial = selectedMaterials[selectedMaterials.length - 1];
        console.log('Latest selected material:', latestMaterial);
    }
}

function trackARUsage() {
    let usage = storage.get('ar_usage') || [];
    usage.push({
        startedAt: new Date().toISOString(),
        furniture: document.getElementById('furnitureSelect').value,
        material: document.getElementById('materialSelect').value
    });
    
    // Keep only last 100 sessions
    if (usage.length > 100) {
        usage = usage.slice(-100);
    }
    
    storage.set('ar_usage', usage);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 's':
                e.preventDefault();
                saveProject();
                break;
            case 'Enter':
                e.preventDefault();
                applyChanges();
                break;
        }
    }
    
    if (e.key === 'Escape') {
        exitARMode();
    }
});
