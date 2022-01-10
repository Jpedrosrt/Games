class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
    }

    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(this.lowerImage,
            utils.withGrid(10.5) - cameraPerson.x,
            utils.withGrid(6) - cameraPerson.y
            )
    }

    drawUpperImage(ctx, cameraPerson) {
        ctx.drawImage(this.upperImage,
        utils.withGrid(10.5) - cameraPerson.x,
        utils.withGrid(6) - cameraPerson.y
        )
    }
}

window.OverworldMaps = {
    DemoRoom: {
        lowerSrc: "imagens/maps/DemoLower.png",
        upperSrc: "imagens/maps/DemoUpper.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(4),
                y: utils.withGrid(6),
            }),
            npc1: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(9),
                src: "imagens/characters/people/npc1.png"
            })
        }
    },
    Kitchen: {
        lowerSrc: "imagens/maps/KitchenLower.png",
        upperSrc: "imagens/maps/KitchenUpper.png",
        gameObjects: {
            hero: new GameObject({
                x: 5,
                y: 6,
            }),
            npc2: new GameObject({
                x: 9,
                y: 6,
                src: "imagens/characters/people/npc2.png"
            }),
            npc3: new GameObject({
                x: 10,
                y: 8,
                src: "imagens/characters/people/npc3.png"
            })
        }
    },
}