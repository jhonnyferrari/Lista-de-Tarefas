// Função principal para adicionar uma nova tarefa (ou reutilizar texto ao recuperar)
function addTexto(text = null) {
  // Pega o campo de input do HTML
  const input = document.getElementById('textoInput');

  // Define o texto da tarefa (pode vir do input ou ser passado como argumento ao recuperar)
  const taskText = text || input.value.trim();

  // Se estiver vazio, não adiciona nada
  if (taskText === '') return;

  // Cria o elemento <li> que vai conter a tarefa
  const li = document.createElement('li');

  // Cria o elemento <span> com o texto da tarefa
  const spanText = document.createElement('span');
  spanText.textContent = taskText;

  // Cria a div que vai conter os botões de ação
  const actions = document.createElement('div');
  actions.classList.add('actions');

  // Botão de concluir tarefa
  const completeBtn = document.createElement('button');
  completeBtn.textContent = 'Concluir';
  completeBtn.classList.add('complete-btn');
  completeBtn.onclick = () => completeTask(li, spanText); // Chama função ao clicar

  // Botão de apagar tarefa
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Apagar';
  deleteBtn.onclick = () => {
    li.remove(); // Remove o <li> da tela
    atualizarContador();
  };


  // Adiciona os botões dentro da div de ações
  actions.appendChild(completeBtn);
  actions.appendChild(deleteBtn);

  // Adiciona o texto e os botões ao <li>
  li.appendChild(spanText);
  li.appendChild(actions);

  // Coloca o <li> na lista de tarefas pendentes
  document.getElementById('listaPendente').appendChild(li);

  // Limpa o campo de input, caso não seja uma recuperação
  if (!text) input.value = '';
  atualizarContador();
}

// Função chamada ao concluir uma tarefa
function completeTask(li, spanText) {
  // Pega a hora atual
  const now = new Date();
  const timeString = now.toLocaleTimeString('pt-BR'); // Formata como hora brasileira

  // Adiciona a classe para estilizar como "concluída"
  li.classList.add('completed');

  // Cria o <span> que vai mostrar a hora da conclusão
  const timestamp = document.createElement('span');
  timestamp.classList.add('timestamp');
  timestamp.textContent = `Concluída às ${timeString}`;

  // Cria uma nova div de ações (agora com botão de recuperar)
  const actions = document.createElement('div');
  actions.classList.add('actions');

  // Botão para recuperar a tarefa concluída
  const recoverBtn = document.createElement('button');
  recoverBtn.textContent = 'Recuperar';
  recoverBtn.classList.add('recover-btn');
  recoverBtn.onclick = () => recoverTask(li, spanText.textContent);

  // Botão para apagar tarefa (igual ao anterior)
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Apagar';
  deleteBtn.onclick = () => {
    li.remove();
    atualizarContador();
  };
  // Adiciona os dois botões à div de ações
  actions.appendChild(recoverBtn);
  actions.appendChild(deleteBtn);

  // Limpa o conteúdo anterior do <li> e adiciona os novos elementos
  li.innerHTML = '';
  li.appendChild(spanText);
  li.appendChild(timestamp);
  li.appendChild(actions);

  // Move o <li> para a lista de tarefas concluídas
  document.getElementById('listaCompletados').appendChild(li);
  atualizarContador();
}

// Função para recuperar uma tarefa concluída e voltar pra lista de pendentes
function recoverTask(li, text) {
  li.remove();       // Remove o <li> da lista de tarefas concluídas
  addTexto(text);     // Chama novamente addTask() com o texto original da tarefa
  atualizarContador();

}



function atualizarContador() { //Define uma nova função chamada atualizarContador.
  //   Ela será responsável por contar as tarefas pendentes e concluídas, e atualizar os números mostrados na tela.



  const pendentes = document.querySelectorAll('#listaPendente li').length;// Seleciona todos os <li> (itens da lista) dentro da 
  // <ul id="listaPendente li"> dentro do HTML - OBS: la vai estar com o nome listaPendente, este li tem que coloca no js para ele contar
  // Usa document.querySelectorAll(...) para pegar todos os elementos que representam tarefas pendentes.
  // .length conta quantos itens foram encontrados, e o resultado é armazenado na variável pendentes.
  const concluidas = document.querySelectorAll('#listaCompletados li').length;

  let pushTotal = pendentes + concluidas;


  document.getElementById('contPendentes').textContent = pendentes;//Atualiza o conteúdo da <span id="contPendentes"> no HTML
  // O número de tarefas pendentes (pendentes) é convertido para texto e exibido na tela.

  document.getElementById('contConcluidas').textContent = concluidas;

  document.getElementById('pushClick').textContent = pushTotal;

}

