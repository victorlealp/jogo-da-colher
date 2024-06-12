import { playerList } from "./player.js";
import { updatePlayerPositions } from "./position.js";
import { savePlayerList, loadPlayerList } from "./storage.js";

let currentPlayerName = '';

async function loadModal() {
    const response = await fetch('./src/pages/player/player.html');
    const modalContent = await response.text();
    document.getElementById('playerModal').innerHTML = modalContent;
}

function addNewPlayer(playerName) {
    const player = playerList.add(playerName);
    addToList(player);
}

export function addToList(player) {
    if (player) {
        const listItem = document.createElement('li');
        const circleDiv = document.createElement('div');

        circleDiv.classList.add('player'); // Adiciona a classe 'player' ao div do círculo
        circleDiv.onclick = () => showPlayerDetails(player);

        const span = document.createElement('span');
        span.textContent = player.name;

        circleDiv.appendChild(span);
        listItem.appendChild(circleDiv);

        document.getElementById('player-list').appendChild(listItem);

        updatePlayerPositions();
    }
}

function saveList(){
    savePlayerList();
}

function removeFromList(playerName){
    if (playerName) {
        // Remove o jogador da lista de players
        playerList.remove(playerName);

        // Encontra todos os elementos da lista correspondentes ao jogador removido
        const list = document.getElementById('player-list');
        const listItems = list.querySelectorAll(`li > div.player > span`);
        
        // Percorre todos os elementos da lista e remove o jogador correto
        listItems.forEach(item => {
            if (item.textContent === playerName) {
                item.parentElement.parentElement.remove();
            }
        });

        playerList.initialize()
        updatePlayerPositions();
    }
}

function printList(){
    playerList.print()
}

function shuffleList(){

    // Embaralha a lista de jogadores
    playerList.shuffle()

    // Encontra todos os elementos da lista correspondentes ao jogador removido
    const list = document.getElementById('player-list');
    list.innerHTML = '';

    playerList.list.forEach(player => addToList(player));
}

async function showPlayerDetails(player) {
    currentPlayerName = player.name;

    if (player) {

        await loadModal()

        let getPlayerKills = () => {
            if(player.kills.length > 0){
                let str = '';

                player.kills.forEach((kill, index) => str += `${index > 0 ? ', ' : ''}` + kill.prey.name);

                return str;
            }else{
                return 'Ninguém';
            }
        }

        document.getElementById('playerName').textContent = player.name;
        document.getElementById('playerPrey').textContent = player.prey ? player.prey : 'Nenhum';
        document.getElementById('playerPredator').textContent = player.predator ? player.predator : 'Nenhum';
        document.getElementById('playerKills').textContent = getPlayerKills()

        const modal = document.getElementById('playerModal');
        modal.style.display = 'block';
    }
}

function closeModal() {
    const modal = document.getElementById('playerModal');
    modal.style.display = 'none';
}

function removeCurrentPlayer() {
    removeFromList(currentPlayerName);
    closeModal();
}

// Atribua a função ao objeto window para garantir que esteja no escopo global
window.addNewPlayer = addNewPlayer;
window.removeFromList = removeFromList;
window.printList = printList;
window.shuffleList = shuffleList;
window.removeCurrentPlayer = removeCurrentPlayer;
window.closeModal = closeModal;
window.saveList = saveList;

window.onload = function() {
    loadPlayerList();
    updatePlayerPositions();
};