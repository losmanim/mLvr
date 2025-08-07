// Aguarda o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupMobileMenu();
    setupFormValidation();
    setupSmoothScrolling();
    setupImageModal();
    setupScrollAnimations();
    setupBackToTop();
}

// === MENU MOBILE ===
function setupMobileMenu() {
    // Criar botão hamburger se não existir
    const navbar = document.querySelector('.navbar');
    const navList = document.querySelector('.nav-list');
    
    if (!document.querySelector('.hamburger')) {
        const hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        `;
        hamburger.setAttribute('aria-label', 'Menu de navegação');
        hamburger.setAttribute('aria-expanded', 'false');
        
        navbar.appendChild(hamburger);
        
        // Evento de clique no hamburger
        hamburger.addEventListener('click', function() {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            
            hamburger.setAttribute('aria-expanded', !isExpanded);
            hamburger.classList.toggle('active');
            navList.classList.toggle('active');
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = document.querySelectorAll('.nav-item a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navList.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

// === VALIDAÇÃO DO FORMULÁRIO ===
function setupFormValidation() {
    const form = document.querySelector('form.form');
    if (!form) return;
    
    // Adicionar botão de envio se não existir
    if (!form.querySelector('button[type="submit"]')) {
        const submitBtn = document.createElement('button');
        submitBtn.type = 'submit';
        submitBtn.className = 'btn btn-primary mt-3';
        submitBtn.textContent = 'Enviar Mensagem';
        form.appendChild(submitBtn);
    }
    
    const emailInput = document.querySelector('#exampleFormControlInput1');
    const textareaInput = document.querySelector('#exampleFormControlTextarea1');
    
    // Validação em tempo real
    if (emailInput) {
        emailInput.addEventListener('blur', validateEmail);
        emailInput.addEventListener('input', clearError);
    }
    
    if (textareaInput) {
        textareaInput.addEventListener('blur', validateTextarea);
        textareaInput.addEventListener('input', clearError);
    }
    
    // Evento de submit
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isEmailValid = validateEmail();
        const isTextareaValid = validateTextarea();
        
        if (isEmailValid && isTextareaValid) {
            submitForm();
        }
    });
    
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        removeError(emailInput);
        
        if (!email) {
            showError(emailInput, 'Por favor, digite seu email.');
            return false;
        }
        
        if (!emailRegex.test(email)) {
            showError(emailInput, 'Por favor, digite um email válido.');
            return false;
        }
        
        showSuccess(emailInput);
        return true;
    }
    
    function validateTextarea() {
        const message = textareaInput.value.trim();
        
        removeError(textareaInput);
        
        if (!message) {
            showError(textareaInput, 'Por favor, digite sua mensagem.');
            return false;
        }
        
        if (message.length < 10) {
            showError(textareaInput, 'A mensagem deve ter pelo menos 10 caracteres.');
            return false;
        }
        
        showSuccess(textareaInput);
        return true;
    }
    
    function showError(input, message) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        
        let errorDiv = input.parentNode.querySelector('.invalid-feedback');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'invalid-feedback';
            input.parentNode.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
    }
    
    function showSuccess(input) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    }
    
    function removeError(input) {
        input.classList.remove('is-invalid', 'is-valid');
        const errorDiv = input.parentNode.querySelector('.invalid-feedback');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    function clearError(e) {
        const input = e.target;
        if (input.classList.contains('is-invalid')) {
            removeError(input);
        }
    }
    
    function submitForm() {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Simular envio
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Simular sucesso
            showSuccessMessage();
            form.reset();
            removeError(emailInput);
            removeError(textareaInput);
            
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
    
    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'alert alert-success alert-dismissible fade show mt-3';
        successDiv.innerHTML = `
            <strong>Sucesso!</strong> Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        form.parentNode.insertBefore(successDiv, form);
        
        // Remover após 5 segundos
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.remove();
            }
        }, 5000);
    }
}

// === ROLAGEM SUAVE ===
function setupSmoothScrolling() {
    // Adicionar comportamento suave para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// === MODAL DE IMAGENS ===
function setupImageModal() {
    // Criar modal se não existir
    if (!document.querySelector('#imageModal')) {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = 'imageModal';
        modal.tabIndex = -1;
        modal.innerHTML = `
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Imagem</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center">
                        <img src="" alt="" class="img-fluid">
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    // Adicionar evento de clique nas imagens
    document.querySelectorAll('.epita img, .cienc img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            const modal = document.querySelector('#imageModal');
            const modalImg = modal.querySelector('.modal-body img');
            const modalTitle = modal.querySelector('.modal-title');
            
            modalImg.src = this.src;
            modalImg.alt = this.alt;
            modalTitle.textContent = this.alt || 'Imagem';
            
            const bsModal = new bootstrap.Modal(modal);
            bsModal.show();
        });
    });
}

// === ANIMAÇÕES DE SCROLL ===
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Observar seções
    document.querySelectorAll('.epita, .cienc, .constru').forEach(section => {
        observer.observe(section);
    });
}

// === BOTÃO VOLTAR AO TOPO ===
function setupBackToTop() {
    // Criar botão se não existir
    if (!document.querySelector('.back-to-top')) {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '↑';
        backToTopBtn.setAttribute('aria-label', 'Voltar ao topo');
        backToTopBtn.title = 'Voltar ao topo';
        
        document.body.appendChild(backToTopBtn);
        
        // Mostrar/esconder botão baseado no scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        // Evento de clique
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// === UTILITÁRIOS ===
// Função para debounce (otimizar performance)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Adicionar classe para elementos carregados
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});