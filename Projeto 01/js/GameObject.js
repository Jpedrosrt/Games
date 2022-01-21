class GameObject {
    constructor(config) {

        // id para identificar o objeto
        this.id = null;

        this.isMounted = false;

        // Recebe as coordenadas de cada gameobject(hero, npc1, npc2) em cada mapa
        this.x = config.x || 0;
        this.y = config.y || 0;

        // Variavel relacionado a direção do personagem (por padrão ele olha para baixo)
        this.direction = config.direction || "down";

        // Configuração dos Sprites
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "imagens/characters/people/hero.png",

        });

        //
        this.behaviorLoop = config.behaviorLoop || [];
        this.behaviorLoopIndex = 0;

    }

    mount(map) {
        this.isMounted = true;
        map.addWall(this.x, this.y);

        setTimeout(() =>{
            this.doBehaviorEvent(map);
        }, 10)
    }

    update() {

    }

    async doBehaviorEvent(map) {

        // Não vai fazer nada se tiver alguma cena ou não tiver nenhum evento para fazer
        if (map.isCutscenePlaying || this.behaviorLoop.length === 0) {
            return;
        }

        // Configuração do evento
        let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
        eventConfig.who = this.id;

        // Chamando OverworldEvent.js
        const eventHandler = new OverworldEvent({ map, event: eventConfig });
        await eventHandler.init();

        // Chamando o proximo evento
        this.behaviorLoopIndex += 1;
        if (this.behaviorLoopIndex === this.behaviorLoop.length) {
            this.behaviorLoopIndex = 0;
        }

        // Começa o loop de novo 
        this.doBehaviorEvent(map);

    }
}