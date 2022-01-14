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
    LivingRoom: {
        lowerSrc: "imagens/maps/DemoLower.png",
        upperSrc: "imagens/maps/LivingRoom.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(4),
                y: utils.withGrid(6),
            }),
        }
    },
    Kitchen: {
        lowerSrc: "imagens/maps/KitchenLower.png",
        upperSrc: "imagens/maps/KitchenUpper.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(4),
                y: utils.withGrid(6),
            }),
        }
    },
}