const createPlayer = (playerName) => ({
    name: playerName,
    prey: null,
    predator: null,
    kills: []
})

export const deadPlayers = []

export const playerList = {
    list: [],
    print: function () { console.log(this.list) },
    add: function (playerName) {
        if (!this.exist(playerName)) {

            const player = createPlayer(playerName)

            this.list.push(player)
            this.initialize();
            return player
        }
        return null
    },
    remove: function (playerName) {

        const deadPlayerIndex = this.list.findIndex(player => player.name === playerName)
        const predatorPlayerIndex = this.list.findIndex(player => player.prey === playerName)


        if (this.exist(playerName)) {
            deadPlayers.push(this.list[deadPlayerIndex])

            console.log(`O jogador ${playerName} deu uma colherada em ${this.list[predatorPlayerIndex].name}`)

            this.list[predatorPlayerIndex].kills.push({
                prey: this.list[deadPlayerIndex],
                description: 'teste'
            })
            this.list.splice(deadPlayerIndex, 1)

            this.initialize();
        }

    },
    exist: function (playerName) {
        return this.list.some(player => player.name === playerName)
    },
    shuffle: function () {
        for (let i = this.list.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.list[i], this.list[j]] = [this.list[j], this.list[i]];
        }
        this.initialize()
    },
    initialize: function () {
        this.list[0].predator = this.list[this.list.length - 1].name

        this.list.forEach((player, index) => {
            if (index == 0 && this.list.length > 1) {
                player.predator = this.list[this.list.length - 1].name
                player.prey = this.list[index + 1].name
            }
            else if (index == (this.list.length - 1) && this.list.length > 1) {
                player.predator = this.list[index - 1].name
                player.prey = this.list[0].name
            } else if (index > 0 && index < (this.list.length - 1) && this.list.length > 1) {
                player.predator = this.list[index - 1].name
                player.prey = this.list[index + 1].name
            } else {
                player.predator = null;
                player.prey = null;
            }
        });
    }
}