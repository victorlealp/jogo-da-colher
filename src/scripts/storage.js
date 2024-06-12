import { playerList } from "./player.js";
import { addToList } from "./scripts.js";

// Função para salvar a lista de jogadores no localStorage
export function savePlayerList() {
    localStorage.setItem('playerList', JSON.stringify(playerList.list));
}

// Função para carregar a lista de jogadores do localStorage
export function loadPlayerList() {
    const savedList = localStorage.getItem('playerList');
    try{
        if (savedList.length > 0) {
            playerList.list = JSON.parse(savedList);
            playerList.list.forEach(player => addToList(player));
        }
    }catch(e){
        console.log('Nenhum jogador cadastrado!');
    }
}