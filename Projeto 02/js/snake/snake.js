const base = require('../base')

const NORTH = { x: 0, y: -1 }
const SOUTH = { x: 0, y: 1 }
const EAST  = { x: 1, y: 0 }
const WEST  = { x:-1, y: 0 }

const levels = [[],
  [
    { x:15, y: 0}, { x:16, y: 0}, { x:17, y: 0}, { x:18, y: 0},
    { x:19, y: 0},
    { x:19, y: 1}, { x:19, y: 2}, { x:19, y: 3}, { x:19, y: 4},
    { x:19, y: 9}, { x:19, y:10}, { x:19, y:11}, { x:19, y:12},
    { x:19, y:13},
    { x:18, y:13}, { x:17, y:13}, { x:16, y:13}, { x:15, y:13},
    { x: 1, y: 0}, { x: 2, y: 0}, { x: 3, y: 0}, { x: 4, y: 0},
    { x: 0, y: 0},
    { x: 0, y: 1}, { x: 0, y: 2}, { x: 0, y: 3}, { x: 0, y: 4},
    { x: 0, y: 9}, { x: 0, y:10}, { x: 0, y:11}, { x: 0, y:12},
    { x: 0, y:13},
    { x: 1, y:13}, { x: 2, y:13}, { x: 3, y:13}, { x: 4, y:13}
  ],
  [
    { x:11, y: 7}, { x:12, y: 7}, { x:13, y: 7}, { x:14, y: 7},
    { x: 9, y: 7}, { x: 8, y: 7}, { x: 7, y: 7}, { x: 6, y: 7},
    { x:10, y: 7},
    { x:10, y: 6}, { x:10, y: 5}, { x:10, y: 4}, { x:10, y: 3},
    { x:10, y:11}, { x:10, y:10}, { x:10, y: 9}, { x:10, y: 8},
  ],
  [
    { x:19, y: 9}, { x:19, y:10}, { x:19, y:11}, { x:19, y:12},
    { x:19, y:13},
    { x:18, y:13}, { x:17, y:13}, { x:16, y:13}, { x:15, y:13},
    { x: 1, y: 0}, { x: 2, y: 0}, { x: 3, y: 0}, { x: 4, y: 0},
    { x: 0, y: 0},
    { x: 0, y: 1}, { x: 0, y: 2}, { x: 0, y: 3}, { x: 0, y: 4},
    { x: 3, y: 7}, { x: 3, y: 8}, { x: 3, y: 9}, { x: 3, y:10},
    { x: 3, y:11},
    { x: 4, y:11}, { x: 5, y:11}, { x: 6, y:11}, { x: 7, y:11},
    { x:12, y: 2}, { x:13, y: 2}, { x:14, y: 2}, { x:15, y: 2},
    { x:16, y: 2},
    { x:16, y: 3}, { x:16, y: 4}, { x:16, y: 5}, { x:16, y: 6},
  ],
  [
    { x:15, y: 0}, { x:16, y: 0}, { x:17, y: 0}, { x:18, y: 0},
    { x:19, y: 0}, { x:19, y: 1}, { x:19, y: 2}, { x:19, y: 3},
    { x:19, y: 4}, { x:19, y: 5}, { x:19, y: 6}, { x:19, y: 7},
    { x:19, y: 8}, { x:19, y: 9}, { x:19, y:10}, { x:19, y:11},
    { x:19, y:12}, { x:19, y:13}, { x:18, y:13}, { x:17, y:13},
    { x:16, y:13}, { x:15, y:13}, { x:14, y:13}, { x:13, y:13},
    { x:12, y:13}, { x:11, y:13}, { x:10, y:13}, { x: 9, y:13},
    { x: 8, y:13}, { x: 7, y:13}, { x: 6, y:13}, { x: 5, y:13},
    { x: 4, y:13}, { x: 3, y:13}, { x: 2, y:13}, { x: 1, y:13},
    { x: 0, y:13}, { x: 0, y:12}, { x: 0, y:11}, { x: 0, y:10},
    { x: 0, y: 9}, { x: 0, y: 8}, { x: 0, y: 7}, { x: 0, y: 6},
    { x: 0, y: 5}, { x: 0, y: 4}, { x: 0, y: 3}, { x: 0, y: 2},
    { x: 0, y: 1}, { x: 0, y: 0}, { x: 1, y: 0}, { x: 2, y: 0},
    { x: 3, y: 0}, { x: 4, y: 0}, { x: 5, y: 0}, { x: 6, y: 0},
    { x: 7, y: 0}, { x: 8, y: 0}, { x: 9, y: 0}, { x:10, y: 0},
    { x:11, y: 0}, { x:12, y: 0}, { x:13, y: 0}, { x:14, y: 0},       
  ]
]

const pointEq = p1 => p2 => p1.x == p2.x && p1.y == p2.y

const willCrash = game => game.snake.some(pointEq(nextHead(game))) || game.wall.some(p => pointEq(p)(nextHead(game)))

const willEat   = game => pointEq(nextHead(game))(game.apple)

const willNextLevel = state => (willEat(state) && (state.score + 1) % 10 == 0) && Math.floor((state.score + 1) / 10) < 4

const validMove = move => game => game.moves[0].x + move.x != 0 || game.moves[0].y + move.y != 0

const enqueue = (game, move) => validMove(move)(game)
  ? merge(game)({ moves: game.moves.concat([move]) })
  : game

const nextMoves = game => game.moves.length > 1 
  ? dropFirst(game.moves)
  : willNextLevel(game)
    ? [NORTH]
    : game.moves

const nextHead  = game => game.snake.length == 0
  ? { x: 5, y: 5 }
  : {
    x: mod(N_COL_CANVAS)(game.snake[0].x + game.moves[0].x),
    y: mod(N_ROWS_CANVAS)(game.snake[0].y + game.moves[0].y)
  }

const nextSnake = game => willCrash(game) || willNextLevel(game)
  ? []
  : (willEat(game)
    ? [nextHead(game)].concat(game.snake)
    : [nextHead(game)].concat(dropLast(game.snake)))
  
const nextApple = game => willEat(game) ? rndPos(game) : game.apple

const rndPos = game => {
  if(willNextLevel(game)) { 
    const pos = { x: rnd(0)(N_COL_CANVAS - 1), y: rnd(0)(N_ROWS_CANVAS - 1) }
    if( levels[game.level + 1].find(p => pointEq(p)(pos))) return rndPos(game)
    else return pos
  } else {
    const pos = { x: rnd(0)(N_COL_CANVAS - 1), y: rnd(0)(N_ROWS_CANVAS - 1) }
    if( game.wall.find(p => pointEq(p)(pos))) return rndPos(game)
    else return pos
  }
}

const scoreCount = game => willCrash(game)
  ? 0
  : willEat(game)
    ? game.score + 1
    : game.score

const nextLevel = game => willCrash(game)
  ? []
  : game.level >= 4
    ? levels[4]
    : levels[game.level]

const levelCount = game => willCrash(game)
  ? 0
  : game.level >= 4
    ? 4
    : Math.floor(game.score / 10)

const updateBest = game => willCrash(game) 
  ? game.score > game.bestscore 
    ? game.score
    : game.bestscore
  : game.bestscore

const upLast = game => willCrash(game)
  ? game.lastscore.length == 10
    ? dropFirst(game.lastscore).concat(game.score)
    : game.lastscore.concat(game.score)
  : game.lastscore

const gameState = () => ({
    snake: [],
    apple: {x: 16, y: 5},
    wall: [],
    moves: [EAST],
    score: 0,
    level: 0,
    bestscore: 0,
    lastscore: [],
    Over: false
})

const next = spec({
  moves: nextMoves,
  snake: nextSnake,
  apple: nextApple,
  wall: nextLevel,
  score: scoreCount,
  level: levelCount,
  bestscore: updateBest,
  lastscore: upLast,
  Over: willCrash
})

module.exports = { EAST, NORTH, SOUTH, WEST, gameState, enqueue, next, }