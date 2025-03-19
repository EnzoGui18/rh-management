// URL base da API (ajuste conforme necessário)
const API_BASE_URL = 'http://127.0.0.1:8000';

// Elementos DOM
const funcionariosTable = document.getElementById('funcionariosTable');
const funcionarioSelect = document.getElementById('funcionarioSelect');
const pontosTable = document.getElementById('pontosTable');
const totalFuncionarios = document.getElementById('totalFuncionarios');
const entradasHoje = document.getElementById('entradasHoje');
const saidasHoje = document.getElementById('saidasHoje');

// Modal elements
const funcionarioModal = document.getElementById('funcionarioModal');
const funcionarioForm = document.getElementById('funcionarioForm');
const modalTitle = document.getElementById('modalTitle');
const funcionarioId = document.getElementById('funcionarioId');
const nome = document.getElementById('nome');
const cargo = document.getElementById('cargo');
const salario = document.getElementById('salario');

// Buttons
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const registrarEntrada = document.getElementById('registrarEntrada');
const registrarSaida = document.getElementById('registrarSaida');

// Toast
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// Função para mostrar toast
function showToast(message, success = true) {
    toastMessage.textContent = message;
    toast.classList.remove('opacity-0', 'translate-y-2', 'bg-green-500', 'bg-red-500');
    toast.classList.add(success ? 'bg-green-500' : 'bg-red-500', 'opacity-100', 'translate-y-0');
    
    setTimeout(() => {
        toast.classList.remove('opacity-100', 'translate-y-0');
        toast.classList.add('opacity-0', 'translate-y-2');
    }, 3000);
}

// Carregar funcionários
async function carregarFuncionarios() {
    try {
        const response = await fetch(`${API_BASE_URL}/funcionarios/`);
        const data = await response.json();
        
        // Limpar tabela
        funcionariosTable.innerHTML = '';
        funcionarioSelect.innerHTML = '<option value="">Selecione um funcionário</option>';
        
        // Preencher tabela e select
        data.forEach(func => {
            funcionariosTable.innerHTML += `
                <tr class="border-b border-gray-200 hover:bg-gray-100">
                    <td class="py-3 px-6 text-left">${func.id}</td>
                    <td class="py-3 px-6 text-left">${func.nome}</td>
                    <td class="py-3 px-6 text-left">${func.cargo}</td>
                    <td class="py-3 px-6 text-left">R$ ${func.salario.toFixed(2)}</td>
                    <td class="py-3 px-6 text-center">
                        <div class="flex item-center justify-center">
                            <button class="view-points transform hover:text-blue-500 hover:scale-110 mr-3" data-id="${func.id}">
                                <i class="fas fa-history"></i>
                            </button>
                            <button class="edit-employee transform hover:text-yellow-500 hover:scale-110 mr-3" data-id="${func.id}">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="delete-employee transform hover:text-red-500 hover:scale-110" data-id="${func.id}">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
            
            funcionarioSelect.innerHTML += `<option value="${func.id}">${func.nome}</option>`;
        });
        
        // Atualizar contadores
        totalFuncionarios.textContent = data.length;
    } catch (error) {
        console.error('Erro ao carregar funcionários:', error);
        showToast('Erro ao carregar funcionários', false);
    }
}

// Função para formatar data e hora considerando o fuso horário
function formatarDataHora(dataString) {
    const data = new Date(dataString);
    
    // Opções para formatar a data e hora no padrão brasileiro
    const opcoes = { 
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'America/Sao_Paulo'  // Fuso horário de São Paulo
    };
    
    return data.toLocaleDateString('pt-BR', opcoes);
}

// Carregar pontos de um funcionário
async function carregarPontos(funcionarioId) {
    try {
        const response = await fetch(`${API_BASE_URL}/ponto/${funcionarioId}`);
        const data = await response.json();
        
        // Limpar tabela
        pontosTable.innerHTML = '';
        
        // Preencher tabela
        data.forEach(ponto => {
            // Usar a função formatarDataHora para exibir o horário correto
            const horarioFormatado = formatarDataHora(ponto.horario);
            
            pontosTable.innerHTML += `
                <tr class="border-b border-gray-200 hover:bg-gray-100">
                    <td class="py-3 px-6 text-left">${horarioFormatado}</td>
                    <td class="py-3 px-6 text-left ${ponto.tipo === 'Entrada' ? 'text-green-600' : 'text-red-600'}">${ponto.tipo}</td>
                </tr>
            `;
        });
        
        // Contar entradas e saídas de hoje
        const hoje = new Date().toISOString().split('T')[0];
        const entradasHojeCount = data.filter(p => 
            p.tipo === 'Entrada' && p.horario.startsWith(hoje)
        ).length;
        
        const saidasHojeCount = data.filter(p => 
            p.tipo === 'Saída' && p.horario.startsWith(hoje)
        ).length;
        
        entradasHoje.textContent = entradasHojeCount;
        saidasHoje.textContent = saidasHojeCount;
    } catch (error) {
        console.error('Erro ao carregar pontos:', error);
        showToast('Erro ao carregar pontos', false);
    }
}

// Adicionar funcionário
async function adicionarFuncionario(dados) {
    try {
        // Imprima os dados para debug
        console.log('Enviando dados:', JSON.stringify(dados));
        
        const response = await fetch(`${API_BASE_URL}/funcionarios/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        
        if (response.ok) {
            const resultado = await response.json();
            console.log('Resposta:', resultado);
            await carregarFuncionarios();
            showToast('Funcionário adicionado com sucesso');
            return true;
        } else {
            // Tente ler a resposta de erro, mesmo se não for JSON
            let errorText;
            try {
                const error = await response.json();
                errorText = error.detail || 'Erro ao adicionar funcionário';
            } catch (e) {
                // Se não conseguir parsear como JSON, use o texto da resposta
                errorText = await response.text();
            }
            throw new Error(errorText);
        }
    } catch (error) {
        console.error('Erro ao adicionar funcionário:', error);
        showToast(error.message || 'Erro ao adicionar funcionário', false);
        return false;
    }
}

// Excluir funcionário
async function excluirFuncionario(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/funcionarios/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            await carregarFuncionarios();
            showToast('Funcionário excluído com sucesso');
        } else {
            const error = await response.json();
            throw new Error(error.detail || 'Erro ao excluir funcionário');
        }
    } catch (error) {
        console.error('Erro ao excluir funcionário:', error);
        showToast(error.message || 'Erro ao excluir funcionário', false);
    }
}

// Obter funcionário por ID
async function obterFuncionario(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/funcionarios/${id}`);
        return await response.json();
    } catch (error) {
        console.error('Erro ao obter funcionário:', error);
        showToast('Erro ao obter dados do funcionário', false);
        return null;
    }
}

// Registrar ponto
async function registrarPonto(dados) {
    try {
        const response = await fetch(`${API_BASE_URL}/ponto/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        
        if (response.ok) {
            await carregarPontos(dados.funcionario_id);
            showToast(`Ponto de ${dados.tipo} registrado com sucesso`);
        } else {
            const error = await response.json();
            throw new Error(error.detail || 'Erro ao registrar ponto');
        }
    } catch (error) {
        console.error('Erro ao registrar ponto:', error);
        showToast(error.message || 'Erro ao registrar ponto', false);
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    carregarFuncionarios();
    
    // Abrir modal para adicionar funcionário
    openModalBtn.addEventListener('click', () => {
        modalTitle.textContent = 'Adicionar Funcionário';
        funcionarioId.value = '';
        funcionarioForm.reset();
        funcionarioModal.classList.remove('hidden');
    });
    
    // Fechar modal
    closeModalBtn.addEventListener('click', () => {
        funcionarioModal.classList.add('hidden');
    });
    
    // Enviar formulário
    funcionarioForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const salarioValue = parseFloat(salario.value);
        
        if (isNaN(salarioValue)) {
            showToast('Salário deve ser um número válido', false);
            return;
        }
        
        const dados = {
            nome: nome.value.trim(),
            cargo: cargo.value.trim(),
            salario: salarioValue
        };
        
        console.log('Dados a serem enviados:', dados);
        
        // Verificar se há campos vazios
        if (!dados.nome || !dados.cargo) {
            showToast('Preencha todos os campos', false);
            return;
        }
        
        const sucesso = await adicionarFuncionario(dados);
        
        if (sucesso) {
            funcionarioModal.classList.add('hidden');
        }
    });
    
    // Visualizar pontos
    funcionariosTable.addEventListener('click', async (e) => {
        if (e.target.closest('.view-points')) {
            const id = e.target.closest('.view-points').dataset.id;
            funcionarioSelect.value = id;
            await carregarPontos(id);
        }
        
        if (e.target.closest('.edit-employee')) {
            const id = e.target.closest('.edit-employee').dataset.id;
            const funcionario = await obterFuncionario(id);
            
            if (funcionario) {
                modalTitle.textContent = 'Editar Funcionário';
                funcionarioId.value = funcionario.id;
                nome.value = funcionario.nome;
                cargo.value = funcionario.cargo;
                salario.value = funcionario.salario;
                funcionarioModal.classList.remove('hidden');
            }
        }
        
        if (e.target.closest('.delete-employee')) {
            const id = e.target.closest('.delete-employee').dataset.id;
            if (confirm('Tem certeza que deseja excluir este funcionário?')) {
                await excluirFuncionario(id);
            }
        }
    });
    
    // Registrar entrada/saída
    registrarEntrada.addEventListener('click', async () => {
        const funcionarioId = funcionarioSelect.value;
        
        if (!funcionarioId) {
            showToast('Selecione um funcionário', false);
            return;
        }
        
        await registrarPonto({
            funcionario_id: parseInt(funcionarioId),
            tipo: 'Entrada'
        });
    });
    
    registrarSaida.addEventListener('click', async () => {
        const funcionarioId = funcionarioSelect.value;
        
        if (!funcionarioId) {
            showToast('Selecione um funcionário', false);
            return;
        }
        
        await registrarPonto({
            funcionario_id: parseInt(funcionarioId),
            tipo: 'Saída'
        });
    });
    
    // Carregar pontos ao selecionar funcionário
    funcionarioSelect.addEventListener('change', async () => {
        const id = funcionarioSelect.value;
        if (id) {
            await carregarPontos(id);
        } else {
            pontosTable.innerHTML = '';
        }
    });
});