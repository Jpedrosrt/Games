const utils = {
    withGrid(n) {
        return n * 16;
    },
    asGridCoord(x, y) {
        return `${x * 16},${y * 16}`
    },
    nxtPo(inX, inY, dire) {
        let x = inX;
        let y = inY;
        const size = 16;
        if (dire === 'left') {
            x -= size;
        } else if (dire === 'right') {
            x += size;
        } else if (dire === 'up') {
            y -= size;
        } else if (dire === 'down') {
            y += size;
        }

        return {x,y}
    }
}