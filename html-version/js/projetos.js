
// Projetos page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const searchInput = document.querySelector('.search-filter input');
    const filterSelects = document.querySelectorAll('.filter-select');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function() {
            const searchTerm = this.value.toLowerCase();
            filterProjects();
        }, 300));
    }
    
    // Filter select functionality
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            filterProjects();
        });
    });
    
    function filterProjects() {
        const searchTerm = searchInput.value.toLowerCase();
        const environmentFilter = document.querySelector('.filter-select:nth-of-type(1)').value;
        const statusFilter = document.querySelector('.filter-select:nth-of-type(2)').value;
        
        projectCards.forEach(card => {
            const projectName = card.querySelector('h3').textContent.toLowerCase();
            const projectEnvironment = card.querySelector('.project-meta span:first-child').textContent.toLowerCase();
            const projectStatus = card.querySelector('.status-badge').textContent.toLowerCase();
            
            let show = true;
            
            // Search filter
            if (searchTerm && !projectName.includes(searchTerm)) {
                show = false;
            }
            
            // Environment filter
            if (environmentFilter && environmentFilter !== 'Filtrar por ambiente' && 
                !projectEnvironment.includes(environmentFilter.toLowerCase())) {
                show = false;
            }
            
            // Status filter
            if (statusFilter && statusFilter !== 'Status' && 
                !projectStatus.includes(statusFilter.toLowerCase())) {
                show = false;
            }
            
            card.style.display = show ? 'block' : 'none';
        });
    }
    
    // Project card interactions
    projectCards.forEach(card => {
        const viewBtn = card.querySelector('.btn:first-child');
        const editBtn = card.querySelector('.btn:nth-child(2)');
        const shareBtn = card.querySelector('.btn:nth-child(3)');
        
        if (viewBtn) {
            viewBtn.addEventListener('click', function() {
                const projectName = card.querySelector('h3').textContent;
                showToast(`Abrindo projeto: ${projectName}`, 'info');
                // Simulate loading and redirect
                setTimeout(() => {
                    window.location.href = 'ar-viewer.html';
                }, 1000);
            });
        }
        
        if (editBtn) {
            editBtn.addEventListener('click', function() {
                const projectName = card.querySelector('h3').textContent;
                showToast(`Editando projeto: ${projectName}`, 'info');
            });
        }
        
        if (shareBtn) {
            shareBtn.addEventListener('click', function() {
                const projectName = card.querySelector('h3').textContent;
                shareProject(projectName);
            });
        }
    });
    
    // New project button
    const newProjectBtn = document.querySelector('.page-header .btn-primary');
    if (newProjectBtn) {
        newProjectBtn.addEventListener('click', function() {
            window.location.href = 'ar-viewer.html';
        });
    }
    
    // Load saved projects from localStorage
    loadSavedProjects();
});

function shareProject(projectName) {
    if (navigator.share) {
        navigator.share({
            title: `Projeto MobiliAR: ${projectName}`,
            text: 'Confira meu projeto de móveis em realidade aumentada!',
            url: window.location.href
        }).then(() => {
            showToast('Projeto compartilhado com sucesso!', 'success');
        }).catch((error) => {
            console.log('Error sharing:', error);
            fallbackShare(projectName);
        });
    } else {
        fallbackShare(projectName);
    }
}

function fallbackShare(projectName) {
    const url = window.location.href;
    const text = `Confira meu projeto de móveis em AR: ${projectName} - ${url}`;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Link copiado para a área de transferência!', 'success');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('Link copiado para a área de transferência!', 'success');
    }
}

function loadSavedProjects() {
    const savedProjects = storage.get('mobiliar_projects') || [];
    
    if (savedProjects.length > 0) {
        // Update project count or add new project cards
        console.log('Loaded projects:', savedProjects);
    }
}

function saveProject(projectData) {
    const savedProjects = storage.get('mobiliar_projects') || [];
    savedProjects.push({
        ...projectData,
        id: Date.now(),
        createdAt: new Date().toISOString()
    });
    storage.set('mobiliar_projects', savedProjects);
}

// Project status management
function updateProjectStatus(projectId, newStatus) {
    const savedProjects = storage.get('mobiliar_projects') || [];
    const projectIndex = savedProjects.findIndex(p => p.id === projectId);
    
    if (projectIndex !== -1) {
        savedProjects[projectIndex].status = newStatus;
        savedProjects[projectIndex].updatedAt = new Date().toISOString();
        storage.set('mobiliar_projects', savedProjects);
        
        // Update UI
        const statusBadge = document.querySelector(`[data-project-id="${projectId}"] .status-badge`);
        if (statusBadge) {
            statusBadge.textContent = newStatus;
            statusBadge.className = `status-badge status-${newStatus.toLowerCase().replace(' ', '-')}`;
        }
    }
}

// Sort projects
function sortProjects(sortBy) {
    const projectsContainer = document.querySelector('.projects-grid');
    const projects = Array.from(projectsContainer.children);
    
    projects.sort((a, b) => {
        switch (sortBy) {
            case 'name':
                return a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent);
            case 'date':
                const dateA = new Date(a.querySelector('.project-meta span:last-child').textContent);
                const dateB = new Date(b.querySelector('.project-meta span:last-child').textContent);
                return dateB - dateA;
            case 'status':
                return a.querySelector('.status-badge').textContent.localeCompare(b.querySelector('.status-badge').textContent);
            default:
                return 0;
        }
    });
    
    projects.forEach(project => {
        projectsContainer.appendChild(project);
    });
}
