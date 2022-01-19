class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;

        this.walls = config.walls || {};

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

    isNotEmpty(atX, atY, dire) {
        const {x, y} = utils.nxtPo(atX, atY, dire);
        return this.walls[`${x},${y}`] || false
    }

    mountObjects() {
        Object.values(this.gameObjects).forEach(o => {

            o.mount(this);
        })
    }

    addWall(x, y) {
        this.walls[`${x},${y}`] = true
    }

    removeWall(x, y) {
        delete this.walls[`${x},${y}`]
    }

    moveWall(antx, anty, dire) {
        this.removeWall(antx, anty);
        const {x,y} = utils.nxtPo(antx, anty, dire);
        this.addWall(x, y);
    }
}

window.OverworldMaps = {
    LivingRoom: {
        lowerSrc: "imagens/maps/LivingRoom.png",
        upperSrc: "imagens/maps/DemoUpper.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(4),
                y: utils.withGrid(6),
            
            }),
            npc1: new GameObject({
                src: "imagens/characters/people/npc1.png",
                x: utils.withGrid(6),
                y: utils.withGrid(9)
            })  
        },
        walls: {
            [utils.asGridCoord(4,4)] : true,
            [utils.asGridCoord(5,4)] : true,
            [utils.asGridCoord(6,4)] : true,
            [utils.asGridCoord(0,3)] : true,
            [utils.asGridCoord(0,4)] : true,
            [utils.asGridCoord(0,5)] : true,
            [utils.asGridCoord(0,6)] : true,
            [utils.asGridCoord(0,7)] : true,
            [utils.asGridCoord(0,8)] : true,
            [utils.asGridCoord(0,9)] : true,
            [utils.asGridCoord(1,10)] : true,
            [utils.asGridCoord(2,11)] : true,
            [utils.asGridCoord(3,10)] : true,
            [utils.asGridCoord(4,10)] : true,
            [utils.asGridCoord(5,10)] : true,
            [utils.asGridCoord(6,10)] : true,
            [utils.asGridCoord(7,10)] : true,
            [utils.asGridCoord(8,11)] : true,
            [utils.asGridCoord(9,10)] : true,
            [utils.asGridCoord(10,9)] : true,
            [utils.asGridCoord(10,8)] : true,
            [utils.asGridCoord(10,7)] : true,
            [utils.asGridCoord(10,6)] : true,
            [utils.asGridCoord(11,5)] : true,
            [utils.asGridCoord(11,4)] : true,
            [utils.asGridCoord(10,3)] : true,
            [utils.asGridCoord(9,3)] : true,
            [utils.asGridCoord(8,3)] : true,
            [utils.asGridCoord(7,3)] : true,
            [utils.asGridCoord(6,3)] : true,
            [utils.asGridCoord(5,3)] : true,
            [utils.asGridCoord(4,3)] : true,
            [utils.asGridCoord(3,3)] : true,
            [utils.asGridCoord(2,2)] : true,
            [utils.asGridCoord(1,2)] : true,
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
        },
        walls: {
            [utils.asGridCoord(1,4)] : true,
            [utils.asGridCoord(2,3)] : true,
            [utils.asGridCoord(3,2)] : true,
            [utils.asGridCoord(4,3)] : true,
            [utils.asGridCoord(5,3)] : true,
            [utils.asGridCoord(6,3)] : true,
            [utils.asGridCoord(7,3)] : true,
            [utils.asGridCoord(8,3)] : true,
            [utils.asGridCoord(9,3)] : true,
            [utils.asGridCoord(10,3)] : true,
            [utils.asGridCoord(11,3)] : true,
            [utils.asGridCoord(12,4)] : true,
            [utils.asGridCoord(12,5)] : true,
            [utils.asGridCoord(12,6)] : true,
            [utils.asGridCoord(12,7)] : true,
            [utils.asGridCoord(11,8)] : true,
            [utils.asGridCoord(10,8)] : true,
            [utils.asGridCoord(9,8)] : true,
            [utils.asGridCoord(8,8)] : true,
            [utils.asGridCoord(7,7)] : true,
            [utils.asGridCoord(6,7)] : true,
            [utils.asGridCoord(5,7)] : true,
            [utils.asGridCoord(4,7)] : true,
            [utils.asGridCoord(3,7)] : true,
            [utils.asGridCoord(2,6)] : true,
            [utils.asGridCoord(2,5)] : true,
        }
    },
}