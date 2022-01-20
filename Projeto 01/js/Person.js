class Person extends GameObject {
    constructor(config) {
        super(config);
        this.movingProgressRemaining = 0;

        this.isPlayerControlled = config.isPlayerControlled || false;

        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1],
        }
    }

    update(state) {
        if (this.movingProgressRemaining > 0) {
            this.updatePosition();
        } else {
            if (!state.map.isCutscenePlaying && this.isPlayerControlled && state.arrow) {
                this.stcomp(state, {
                    type: "walk",
                    direction: state.arrow
                })
            }
            this.updateSprite(state);
        }   
    }
        

    stcomp(state, comp) {
        this.direction = comp.direction;
        if (comp.type === "walk") {
            if (state.map.isNotEmpty(this.x, this.y, this.direction)) {

                comp.retry && setTimeout(() => {
                    this.stcomp(state, comp)
                }, 10);

                return
            }
            state.map.moveWall(this.x, this.y, this.direction);
            this.movingProgressRemaining = 16;
            this.updateSprite(state);
        }


        if (comp.type === 'stand') {
            setTimeout(() =>  {
                utils.emitEvent("PersonStandComplete", {
                    whoId: this.id
                })
            }, comp.time)
        }


    }

    updatePosition() {
        const [property, change] = this.directionUpdate[this.direction]
        this[property] += change;
        this.movingProgressRemaining -= 1;

        if (this.movingProgressRemaining === 0) {
            utils.emitEvent("PersonWalkingComplete", {
                whoId: this.id
            })
        };
    }

    updateSprite() {
        if (this.movingProgressRemaining > 0)  {
            this.sprite.setAnimation("walk-"+this.direction);
            return
        }
        this.sprite.setAnimation("idle-"+this.direction);
        
    }
}