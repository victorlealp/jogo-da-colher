// Esta função será usada para atualizar as posições dos jogadores ao adicionar novos
export function updatePlayerPositions() {
    const players = document.querySelectorAll('#player-list .player');
    if(players.length > 0){
        const totalPlayers = players.length;
        const angleIncrement = 360 / totalPlayers; // Incremento do ângulo para cada player
    
        if(totalPlayers > 1){
            players.forEach((player, index) => {
                const angle = index * angleIncrement;
                player.style.transform = `rotate(${angle}deg) translate(30vh) rotate(-${angle}deg)`;
            });
        }else{
            players[0].style.transform = 'rotate(-90deg) translate(30vh) rotate(90deg)';
        }
    }
}