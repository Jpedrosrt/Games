class DirectionInput {
    constructor() {

        // Armazena os valores do map ('up', 'down' ...)
        this.heldDirections = [];

        // mapa das teclas com base nos codigos de cada tleca(w = 'KeyW', ↑ = 'ArrowUp' ...)
        this.map = {
            "ArrowUp": "up",
            "KeyW": "up",
            "ArrowDown": "down",
            "KeyS": "down",
            "ArrowLeft": "left",
            "KeyA": "left",
            "ArrowRight": "right",
            "KeyD": "right",

        }
    }


    // Pega o o valor da primeira tecla digitada e armazena em direction
    get direction() {
        return this.heldDirections[0];
    }

    init() {
        // Pega a o codigo da tecla e armazena na primeira posição do array heldDirection (*se ele for digitado e ele já n estiver na lista)
        document.addEventListener("keydown", e => {
            const dir = this.map[e.code];
            if (dir && this.heldDirections.indexOf(dir) === -1) {
                this.heldDirections.unshift(dir);
            }
        });
        // Apaga a tecla se ela for solta( para o boneco não andar para sempre)
        document.addEventListener("keyup", e => {
            const dir = this.map[e.code];
            const index = this.heldDirections.indexOf(dir);
            if (index > -1) {
                this.heldDirections.splice(index, 1);
            }
        })
    }
    
}