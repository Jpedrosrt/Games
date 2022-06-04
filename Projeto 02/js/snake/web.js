const canvas = document.querySelector('.canvas')
const ctx = canvas.getContext('2d')

const N_COL_CANVAS = 20
const N_ROWS_CANVAS = 14

let game = gameState()

let score = document.querySelector('.score')

let level = document.querySelector('.level')

let best = document.querySelector('.bestscore')

let last = document.querySelector('.lastscore_container')

const x = c => Math.round(c * canvas.width / N_COL_CANVAS)
const y = r => Math.round(r * canvas.height / N_ROWS_CANVAS)

const draw = () => {

  ctx.fillStyle = '#808080'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = 'rgb(0,200,50)'
  game.snake.map(p => ctx.fillRect(x(p.x), y(p.y), x(1), y(1)))

  ctx.fillStyle = 'rgb(0, 217, 255)'
  game.wall.map(p => ctx.fillRect(x(p.x), y(p.y), x(1), y(1)))

  ctx.fillStyle = 'rgb(255,50,0)'
  ctx.fillRect(x(game.apple.x), y(game.apple.y), x(1), y(1))

  if (game.Over) {
    ctx.fillStyle = 'rgb(255,0,0, 0.215)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#000'
    ctx.font = '48px Arial';
    ctx.fillText('Game Over !', 235, 260);
  }
}

window.addEventListener('keydown', e => {
    switch (e.key) {
      case 'w': case 'h': case 'ArrowUp':    game = enqueue(game, NORTH); break
      case 'a': case 'j': case 'ArrowLeft':  game = enqueue(game, WEST);  break
      case 's': case 'k': case 'ArrowDown':  game = enqueue(game, SOUTH); break
      case 'd': case 'l': case 'ArrowRight': game = enqueue(game, EAST);  break
    }
  })

const levelDisplay = x => Math.floor(x / 10) > 4 ? 4 : Math.floor(x / 10)


const step = t1 => t2 => {
    if (game.Over) {
        if (t2 - t1 > 2000) {
            best.innerText = `Level: ${levelDisplay(game.bestscore)} | Score: ${game.bestscore}`
            best.classList.remove('escond')
            game.lastscore.map( (x, pos) => {
                last.children[9 - pos].innerText = `Level: ${levelDisplay(x)} | Score: ${x}`
                last.children[9 - pos].classList.remove('escond')
            })
            game.Over = false
            window.requestAnimationFrame(step(t2))
        } else {
            window.requestAnimationFrame(step(t1))
        }
    }
    else if (t2 - t1 > 100) {
        score.innerText = game.score
        level.innerText = game.level
        game = next(game)
        draw()
        window.requestAnimationFrame(step(t2))
    } else {
    window.requestAnimationFrame(step(t1))
    }
}

draw(); window.requestAnimationFrame(step(0))
