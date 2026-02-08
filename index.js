// =========================================================
// 1. DADOS SIMULADOS (MOCK DATABASE)
// =========================================================
// Estes dados simulariam o que viria de um servidor real.



// Dados para a secção "Analytics" (os cartões coloridos)
const analyticsData = [
    {
        title: "Locations",     // Título do cartão
        lessons: "35 Lessons",  // Subtítulo
        percent: 75,            // Porcentagem para o gráfico
        icon: "bx-map-pin",     // Classe do ícone (Boxicons)
        colorClass: "card-1"    // (Opcional) Poderia ser usado para cor específica
    },
    {
        title: "People",
        lessons: "30 Lessons",
        percent: 50,
        icon: "bx-user-voice"
    },
    {
        title: "Airport",
        lessons: "45 Lessons",
        percent: 25,
        icon: "bxs-plane-land"
    },
    {
        title: "Places",
        lessons: "20 Lessons",
        percent: 75,
        icon: "bxs-castle"
    }
];

// Dados para a secção de Planeamento (Planning)
const planningData = [
    {
        title: "Reading - Topic 1",
        time: "8:00 - 10:00",
        icon: "bx-book-alt",
        type: "reading", // Usado para definir cores se necessário
        date: "2026-02-01" // Data para o filtro funcionar
    },
    {
        title: "Writing - Topic 2",
        time: "13:00 - 14:00",
        icon: "bx-edit-alt",
        type: "writing",
        date: "2026-02-01"
    },
    {
        title: "Listening - Topic 1",
        time: "15:00 - 16:00",
        icon: "bx-headphone",
        type: "listening",
        date: "2026-02-02" // Data diferente para testar filtro
    },
    {
        title: "Listening - Topic 2",
        time: "19:00 - 20:00",
        icon: "bx-volume-low",
        type: "listening",
        date: "2026-02-01"
    }
];

// Dados para a secção de Estatísticas (Lado direito)
const statsData = [
    { labelTop: "Courses", labelBottom: "Completed", value: "02" },
    { labelTop: "Total Points", labelBottom: "Gained", value: "250" },
    { labelTop: "Courses", labelBottom: "In Progress", value: "03" },
    { labelTop: "Tasks", labelBottom: "Finished", value: "250" }
];

// =========================================================
// 2. SELEÇÃO DE ELEMENTOS DO DOM
// =========================================================
// Aqui capturamos os elementos do HTML para manipulá-los.

const menuOpen = document.getElementById('menu-open'); // Botão abrir menu
const menuClose = document.getElementById('menu-close'); // Botão fechar menu
const sideBar = document.querySelector('.container .left-section'); // A barra lateral inteira
const sidebarItems = document.querySelectorAll('.container .left-section .sidebar .item'); // Itens do menu

// Elementos onde vamos injetar o conteúdo dinâmico
const analyticsContainer = document.querySelector('.analytics'); // Container dos cartões
const planningContainer = document.querySelector('.planning'); // Container das tarefas
const statsContainer = document.querySelector('.stats'); // Container das estatísticas

// Elementos de input para interação
const searchInput = document.querySelector('.main .separator .search input'); // Campo de busca (Nota: adicionei classe .main se necessário no HTML, ou ajuste o seletor)
// Correção do seletor da busca baseada no teu HTML:
const searchInputField = document.querySelector('main .separator .search input'); 

const dateInput = document.querySelector('main .separator input[type="date"]'); // Campo de data

// =========================================================
// 3. FUNÇÕES DE RENDERIZAÇÃO (VIEW)
// =========================================================

/**
 * Função para desenhar os cartões de Analytics na tela.
 * Recebe um array de dados como argumento.
 */
function renderAnalytics(data) {
    analyticsContainer.innerHTML = ''; // Limpa o conteúdo atual

    // Para cada item nos dados, cria o HTML correspondente
    data.forEach(item => {
        // Cria a estrutura HTML do cartão usando Template Strings (crase ``)
        const html = `
            <div class="item">
                <div class="progress">
                    <div class="info">
                        <h5>${item.title}</h5>
                        <p>${item.lessons}</p>
                    </div>
                    <div class="progress-bar" role="progressbar" aria-valuenow="${item.percent}" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <i class="bx ${item.icon}"></i>
            </div>
        `;
        // Adiciona este HTML ao container
        analyticsContainer.innerHTML += html;
    });
}

/**
 * Função para desenhar a lista de Planeamento.
 * Recebe um array de dados como argumento.
 */
function renderPlanning(data) {
    planningContainer.innerHTML = ''; // Limpa a lista atual

    if (data.length === 0) {
        planningContainer.innerHTML = '<p style="padding:20px; color:#888;">No tasks for this date.</p>';
        return;
    }

    data.forEach(item => {
        const html = `
            <div class="item">
                <div class="left">
                    <div class="icon">
                        <i class="bx ${item.icon}"></i>
                    </div>
                    <div class="details">
                        <h5>${item.title}</h5>
                        <p>${item.time}</p>
                    </div>
                </div>
                <i class="bx bx-dots-vertical-rounded"></i>
            </div>
        `;
        planningContainer.innerHTML += html;
    });
}

/**
 * Função para desenhar as Estatísticas da direita.
 */
function renderStats(data) {
    statsContainer.innerHTML = ''; // Limpa stats atuais

    data.forEach(item => {
        const html = `
            <div class="item">
                <div class="top">
                    <p>${item.labelTop}</p>
                    <p>${item.labelBottom}</p>
                </div>
                <div class="bottom">
                    <div class="line"></div>
                    <h3>${item.value}</h3>
                </div>
            </div>
        `;
        statsContainer.innerHTML += html;
    });
}

// =========================================================
// 4. LÓGICA DO MENU (SIDEBAR)
// =========================================================
// Mantendo a tua lógica original, que já estava correta.

menuOpen.addEventListener('click', () => {
    sideBar.style.top = '0'; // Mostra a sidebar no mobile
});

menuClose.addEventListener('click', () => {
    sideBar.style.top = '-60vh'; // Esconde a sidebar no mobile
});

let activeItem = sidebarItems[0]; // Define o primeiro item como ativo inicial

sidebarItems.forEach(element => {
    element.addEventListener('click', () => {
        if (activeItem) {
            activeItem.removeAttribute('id'); // Remove o ID do anterior
        }
        element.setAttribute('id', 'active'); // Adiciona ID 'active' ao clicado
        activeItem = element; // Atualiza a variável de referência
    });
});

// =========================================================
// 5. INTERATIVIDADE E EVENTOS
// =========================================================

// Evento de Pesquisa (Search)
searchInputField.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase(); // Texto digitado em minúsculas
    
    // Filtra o array analyticsData
    const filteredData = analyticsData.filter(item => 
        item.title.toLowerCase().includes(searchTerm)
    );

    // Redesenha a tela apenas com os itens filtrados
    renderAnalytics(filteredData);
});

// Evento de Filtro de Data
dateInput.addEventListener('change', (e) => {
    const selectedDate = e.target.value; // Data selecionada no input
    
    // Filtra o array planningData pela data
    const filteredPlanning = planningData.filter(item => 
        item.date === selectedDate
    );

    // Redesenha a lista de tarefas
    renderPlanning(filteredPlanning);
});

// =========================================================
// 6. INICIALIZAÇÃO
// =========================================================
// Chamamos as funções ao carregar a página para mostrar os dados iniciais.

// Renderiza tudo inicialmente
renderAnalytics(analyticsData);

// Para o planeamento, vamos filtrar pela data que já está no input HTML (2026-02-01)
const initialDate = dateInput.value;
const initialPlanning = planningData.filter(item => item.date === initialDate);
renderPlanning(initialPlanning);

// Renderiza as estatísticas
renderStats(statsData);



// Lógica de abrir/fechar menu (Mobile)
menuOpen.addEventListener('click', () => {
    // Adiciona a classe 'show' definida no CSS (left: 0)
    sideBar.classList.add('show');
});

menuClose.addEventListener('click', () => {
    // Remove a classe 'show' (volta para left: -100%)
    sideBar.classList.remove('show');
});

// Fechar menu ao clicar num item (Melhoria de UX para mobile)
sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
        // Lógica de item ativo
        sidebarItems.forEach(i => i.removeAttribute('id'));
        item.setAttribute('id', 'active');
        
        // Se estiver em tela pequena, fecha o menu ao clicar
        if (window.innerWidth <= 992) {
            sideBar.classList.remove('show');
        }
    });
});

