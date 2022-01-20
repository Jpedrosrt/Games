class Overworld {

    constructor(config) {
        //pega a div do index
        this.element = config.element;
        //pega o canvas
        this.canvas = this.element.querySelector(".game-canvas")
        // diz para o canvas que vai ser um desenho em 2d
        this.ctx = this.canvas.getContext("2d")
        
        this.map = null;
    }

   
    startGameLoop() {
         // função em loop
        const step = () => {
            // limpa o todo o começando do ponto x=0 y= 0canvas antes de desenhar( para evitar a parte borrada *tente tirar e ver vc mesmo)
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);


            const cameraPerson = this.map.gameObjects.hero;

            Object.values(this.map.gameObjects).forEach(object => {
                object.update({
                    arrow: this.directionInput.direction,
                    map: this.map,
                })
            })
            
            this.map.drawLowerImage(this.ctx, cameraPerson);

            Object.values(this.map.gameObjects).sort((a, b) => {
                return a.y - b.y;
            }).forEach(object => {
                object.sprite.draw(this.ctx, cameraPerson);
            })

            this.map.drawUpperImage(this.ctx, cameraPerson)

            requestAnimationFrame(() => {
                step();
            })
        }
        step();
    }

    init() {
        this.map = new OverworldMap(window.OverworldMaps.LivingRoom);

        this.map.mountObjects();

        // chama o DirectinoInput.js
        this.directionInput = new DirectionInput();
        // chama o init do DirectionInput.js
        this.directionInput.init();
        // Inicia o loop
        this.startGameLoop();

        this.map.startCutscene([
            { who: "hero", type: "walk",  direction: "up" },
            { who: "hero", type: "walk",  direction: "right" },
            { who: "npc1", type: "walk",  direction: "up" },
            { who: "npc1", type: "stand",  direction: "left", time: 800 },
        ])

    }
}

