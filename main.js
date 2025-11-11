const inputAddTarefa = document.getElementById('addtask');
const addButton = document.getElementById('addbutton');
const listaDeTarefas = document.getElementById('lista-de-tarefas');
const mensagemListaVazia = document.querySelector('.mensagem-lista-vazia');
const searchInput = document.getElementById('searchtask');

let contador = 0;

addButton.addEventListener ('click', (evento) => {
    evento.preventDefault();

    if (inputAddTarefa.value.trim() === "") {
        alert('Please, enter one task!');
        return;
    }

    const itemDaLista = document.createElement("li");
    itemDaLista.id = 'li'

    const containerItemDaLista = document.createElement("div");
    containerItemDaLista.classList.add("lista-item-container");

    const inputCheckbox = document.createElement("input");
    inputCheckbox.type = "checkbox";
    inputCheckbox.id = "checkbox-" + contador++;

    const nomeTarefa = document.createElement("p");
    nomeTarefa.innerText = inputAddTarefa.value;

    inputCheckbox.addEventListener('click', function() {
        if (inputCheckbox.checked) {
            nomeTarefa.style.textDecoration = 'line-through';
        }
        else {
            nomeTarefa.style.textDecoration = 'none';
        }
    });

    const buttonRemove = document.createElement('button');
    buttonRemove.id = 'removebutton';
    buttonRemove.innerText = 'Remove';
    
    buttonRemove.addEventListener ('click', () => {
        itemDaLista.remove();
        verificarListaVazia();
    });
    
    containerItemDaLista.appendChild(inputCheckbox);
    containerItemDaLista.appendChild(nomeTarefa);
    containerItemDaLista.appendChild(buttonRemove);
    itemDaLista.appendChild(containerItemDaLista);

    const diaDaSemana = new Date().toLocaleDateString('en-us', {
        weekday: 'long'
    });
    const data = new Date().toLocaleDateString('en-us');
    const hora = new Date().toLocaleTimeString('en-us', {
        hour: 'numeric',
        minute: 'numeric'
    })
    const dataCompleta = `${diaDaSemana} (${data}) at (${hora})`;
    const itemData = document.createElement('p');
    itemData.innerText = dataCompleta;
    itemData.classList.add('date');

    itemDaLista.appendChild(itemData);
    listaDeTarefas.appendChild(itemDaLista);

    verificarListaVazia();

    inputAddTarefa.value = "";
});

function verificarListaVazia() {
    const itensDaLista = listaDeTarefas.querySelectorAll('li');
    if (itensDaLista.length === 0) {
        mensagemListaVazia.style.display = 'block';
    }
    else {
        mensagemListaVazia.style.display = 'none'
    }
};

verificarListaVazia();

searchInput.addEventListener('input', (event) => {
    const value = event.target.value;
    const itensDaLista = listaDeTarefas.querySelectorAll('li');

    itensDaLista.forEach((item) => {
        const nomeTarefa = item.querySelector('p');
        const textoTarefa = formatString(nomeTarefa.innerText);

    if (textoTarefa.includes(value)) {
        item.style.display = 'flex';
    } else {
        item.style.display = 'none';
        }
    });
    
});

function formatString(value) {
    return value.toLowerCase().trim();
}