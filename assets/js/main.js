const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

//funçao que cria o <li>
function criaLi() {
    const li = document.createElement('li');
    return li;
}

//evento que captura o press do enter
inputTarefa.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value)
    }
});

//limpa o input, para nao precisar sair para criar novas tarefas.
function limpaInput() {
    inputTarefa.value = '';
    inputTarefa.focus();
}

//botao para apagar as tarefas
function criaBotaoApagar(li) {
    li.innerText += ' ';
    const botaoApagar = document.createElement('button')
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar'); //adiciona classe ao botao criado pela funçao
    botaoApagar.setAttribute('title', 'apagar essa tarefa') //adiciona titulo ao botao
    li.appendChild(botaoApagar)
}

//funçao para adicionar as tarefas
function criaTarefa(textoInput) {
    const li = criaLi();
    li.innerText = textoInput;
    tarefas.appendChild(li)
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefas();
}

btnTarefa.addEventListener('click', function () {
    if (!inputTarefa.value) return; //nao deixa que o evento aconteça se o formulário estiver em branco
    criaTarefa(inputTarefa.value)
});

document.addEventListener('click', function (e) {
    const el = e.target

    if (el.classList.contains('apagar')) {
        el.parentElement.remove(); //remove o pai do li
        salvarTarefas();
    }
});


//funçao para armazenar a lista de tarefas
function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim(); //apaga o texto do botao apagar funçao trimm remove os espaços desnecessários
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas); //converte para string
    localStorage.setItem('tarefas', tarefasJSON); //armazenamento só pode ser realizado em string
}

function adicionaTarefasSalvas() {
    if (!localStorage.getItem('tarefas')) return;
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas) || []; //converte de volta para um objJS

    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
}

adicionaTarefasSalvas();