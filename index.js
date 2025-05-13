var arrayTarefa = []; // Array que armazena as tarefas em memória

// Função para salvar as tarefas no localStorage do navegador
function salvarNoLocalStorage() {
  localStorage.setItem('tarefas', JSON.stringify(arrayTarefa)); // Converte o array para string JSON e salva
}

// Função para carregar as tarefas salvas do localStorage ao iniciar a página
function carregarDoLocalStorage() {
  const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || []; // Recupera e converte para array, ou vazio se não existir
  arrayTarefa = tarefasSalvas; // Atualiza a variável global com os dados salvos
  tarefasSalvas.forEach(tarefa => addTexto(tarefa.tarefa)); // Adiciona cada tarefa de volta na tela
}

// Função principal para adicionar uma nova tarefa ou exibir uma existente (caso receba texto)
function addTexto(text = null) {
  const input = document.getElementById('textoInput'); // Pega o campo de input
  const taskText = text || input.value.trim(); // Usa o texto do argumento ou o valor digitado

  if (taskText === '') return; // Se estiver vazio, não faz nada

  const listaTarefa = {
    tarefa: taskText // Cria objeto da tarefa
  };
  arrayTarefa.push(listaTarefa); // Adiciona no array de tarefas
  salvarNoLocalStorage(); // Salva no localStorage

  const li = document.createElement('li'); // Cria item de lista
  const spanText = document.createElement('span'); // Cria o texto da tarefa
  spanText.textContent = taskText; // Define o conteúdo de texto

  const actions = document.createElement('div'); // Cria container para botões
  actions.classList.add('actions'); // Adiciona classe CSS

  const completeBtn = document.createElement('button'); // Botão de concluir
  completeBtn.textContent = 'Concluir';
  completeBtn.classList.add('complete-btn');
  completeBtn.onclick = () => completeTask(li, spanText); // Ao clicar, chama função de concluir

  const deleteBtn = document.createElement('button'); // Botão de apagar
  deleteBtn.textContent = 'Apagar';
  deleteBtn.onclick = () => {
    li.remove(); // Remove visualmente da lista
    arrayTarefa = arrayTarefa.filter(t => t.tarefa !== taskText); // Remove do array
    salvarNoLocalStorage(); // Atualiza localStorage
    atualizarContador(); // Atualiza o contador
  };

  actions.appendChild(completeBtn); // Adiciona botão de concluir
  actions.appendChild(deleteBtn);   // Adiciona botão de apagar

  li.appendChild(spanText); // Adiciona texto à tarefa
  li.appendChild(actions);  // Adiciona botões à tarefa

  document.getElementById('listaPendente').appendChild(li); // Adiciona o item na lista de pendentes

  if (!text) input.value = ''; // Limpa o input se foi digitado manualmente
  atualizarContador(); // Atualiza os contadores
}

// Função chamada ao concluir uma tarefa
function completeTask(li, spanText) {
  const now = new Date(); // Pega hora atual
  const timeString = now.toLocaleTimeString('pt-BR'); // Formata como hora BR

  li.classList.add('completed'); // Adiciona estilo de concluído

  const timestamp = document.createElement('span'); // Cria o horário
  timestamp.classList.add('timestamp');
  timestamp.textContent = `Concluída às ${timeString}`; // Mostra horário

  const actions = document.createElement('div'); // Container de botões
  actions.classList.add('actions');

  const recoverBtn = document.createElement('button'); // Botão de recuperar
  recoverBtn.textContent = 'Recuperar';
  recoverBtn.classList.add('recover-btn');
  recoverBtn.onclick = () => recoverTask(li, spanText.textContent); // Ao clicar, chama função de recuperação

  const deleteBtn = document.createElement('button'); // Botão de apagar
  deleteBtn.textContent = 'Apagar';
  deleteBtn.onclick = () => {
    li.remove(); // Remove da tela
    arrayTarefa = arrayTarefa.filter(t => t.tarefa !== spanText.textContent); // Remove do array
    salvarNoLocalStorage(); // Atualiza localStorage
    atualizarContador(); // Atualiza contador
  };

  actions.appendChild(recoverBtn); // Adiciona botão de recuperar
  actions.appendChild(deleteBtn);  // Adiciona botão de apagar

  li.innerHTML = ''; // Limpa conteúdo atual do item
  li.appendChild(spanText);   // Adiciona texto
  li.appendChild(timestamp);  // Adiciona horário
  li.appendChild(actions);    // Adiciona os botões

  document.getElementById('listaCompletados').appendChild(li); // Move para lista de concluídas
  atualizarContador(); // Atualiza os contadores
}

// Função para recuperar tarefa concluída de volta para lista pendente
function recoverTask(li, text) {
  li.remove(); // Remove da lista concluída
  addTexto(text); // Reinsere como pendente
  atualizarContador(); // Atualiza contadores
}

// Atualiza os números exibidos na tela
function atualizarContador() {
  const pendentes = document.querySelectorAll('#listaPendente li').length; // Conta pendentes
  const concluidas = document.querySelectorAll('#listaCompletados li').length; // Conta concluídas

  let pushTotal = pendentes + concluidas; // Soma total

  document.getElementById('contPendentes').textContent = pendentes; // Mostra pendentes
  document.getElementById('contConcluidas').textContent = concluidas; // Mostra concluídas
  document.getElementById('pushClick').textContent = pushTotal; // Mostra total
}

// Quando a página carregar, executa a função para recuperar as tarefas salvas
window.onload = () => {
  carregarDoLocalStorage(); // Carrega tarefas do localStorage
};


function deletarTudo() {
  // Limpa o armazenamento local
  localStorage.removeItem('tarefas');

  // Limpa o array em memória
  arrayTarefa = [];

  // Remove os itens da lista visual
  document.getElementById('listaPendente').innerHTML = '';
  document.getElementById('listaCompletados').innerHTML = '';

  // Atualiza os contadores para zero
  atualizarContador();
}

