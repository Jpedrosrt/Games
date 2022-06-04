const op1 = document.querySelector('.op1')
const op2 = document.querySelector('.op2')
const player = document.querySelector('.player')
const pc = document.querySelector('.pc')
const player2 = document.querySelector('.player2')
const turn = document.querySelector('.turn')
const boxs = document.querySelectorAll("[data-box]")
const refs = document.querySelectorAll("[data-refre]")
const end = document.querySelector('.endgame')


const wins = [
    [0, 1, 2], [3, 4, 5],
    [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
]

let pos = [0, 1, 2, 3, 4, 5, 6, 7, 8]

let plX = []
let plO = []

let versuPlayer = false;
let xTurn = true;
let optC = false;
let pcTurn = false;

for (const refre of refs) {
    refre.addEventListener("click", (e) => location.reload())
}

const turnInfo = () => {
    const o = document.querySelector('.O')
    const x = document.querySelector('.X')
    if (versuPlayer) {
        if (xTurn) {
            o.style.background = null
            x.style.background = "rgba(0, 0, 0, 0.212)"
            
        } else {
            x.style.background = null
            o.style.background = "rgba(0, 0, 0, 0.212)"
        }
    }
}

const turnM = (x) => (o) => {
    x.append('X')
    x.classList.add('X')
    x.style.color = "#ff96ad"
    x.childNodes[1].attributes.colors.nodeValue = "primary:#121331,secondary:#ff96ad"
    o.append('O')
    o.classList.add('O')
    o.style.color = "#5CE672"
    o.childNodes[1].attributes.colors.nodeValue = "primary:#121331,secondary:#5CE672"
    optC = true
    turnInfo()
}

const gameChoice = (e) => {
    if (e.target.classList[1] == 'btn-2') {
        versuPlayer = true;
        playerChoice(e)
    } else {
        versuPlayer = false;
        op2.classList.remove('escon')
    }
    op1.classList.add('escon')
}

const playerChoice = (e) => {
    op2.parentElement.classList.add('escon')
    if (versuPlayer) {
        player2.classList.remove('escon')
        pc.classList.add('escon')
        turnM(player)(player2)
    } else {
        op2.classList.add('escon')
        if(e.target.innerHTML == 'X') {
            turnM(player)(pc)
        } else {
            turnM(pc)(player)
            bot('X')
        }
        
    }
    turn.classList.remove('escon')
}


const willWin = (e) => (mark)=> {
    if (mark == 'X') {
        pos = pos.filter(x => x != Number(e.id[1]))
        plX.push(Number(e.id[1]))
    }
    else {
        pos = pos.filter(x => x != Number(e.id[1]))
        plO.push(Number(e.id[1]))
    }
    return wins.some(x => {
        return x.every(y => {
            if(plX.includes(y) && mark == 'X') return true
            else if (plO.includes(y) && mark == 'O') return true
            else return false
        })
    })
}

const willDraw = (e) => (mark) => {
    if ( plO.length == 5 || plX.length == 5) return true
    else return false
}

const changeTurn = () => {
    xTurn = !xTurn
    turnInfo() 
}

const addMark = (e) => (mark) => {
    let p = document.createElement("p")
    p.append(mark)
    e.append(p)
    if (mark == 'X') {
        e.style.color = "#ff96ad"
    } else {
        e.style.color = "#5CE672"
    }
}

const rnd = () => {
    if (pos.length > 1) {
        const Gpos = Math.floor(Math.random() * 8) + 0
        console.log(plO.includes(Gpos) || plX.includes(Gpos))
        if (plO.includes(Gpos) || plX.includes(Gpos)) return rnd()
        else return Gpos
    } else {
        return pos[0]
    }
}

const bot = (mark) => {
    const rndPos = boxs[rnd()]
    if ( willWin(rndPos)(mark) ) msgEnd(mark)
    else if (willDraw(rndPos)(mark)) msgEnd('D')
    addMark(rndPos)(mark)
    changeTurn()
    rndPos.removeEventListener('click', coloc);

}

function coloc(e) {
    if (optC) {
        console.log(plO)
        console.log(plX)
        if(versuPlayer) {
            const mark = xTurn ? 'X' : 'O'
            addMark(e.target)(mark)
            changeTurn()
            if ( willWin(e.target)(mark) ) msgEnd(mark)
            else if (willDraw(e.target)(mark)) msgEnd('D')
        }
        else {
            if (player.classList.contains('X')) {
                addMark(e.target)('X')
                if ( willWin(e.target)('X') ) return msgEnd('X')
                else if (willDraw(e.target)('X')) return msgEnd('D')
                bot('O')
            } else {
                addMark(e.target)('O')
                if ( willWin(e.target)('O') ) return msgEnd('O')
                else if (willDraw(e.target)('O')) return msgEnd('D')
                bot('X')
            }

        }
        e.target.removeEventListener('click', coloc);
    }
}

const msgEnd = (mark) => {
    end.classList.remove('escon')
    if (mark == 'X') {
        end.childNodes[1].innerText = "Winner: X"
    } else if (mark == 'O') {
        end.childNodes[1].innerText = "Winner: O"
    } else if (mark == 'D') {
        end.childNodes[1].innerText = "Draw!!"
    }
}

op1.addEventListener("click", gameChoice, { once: true})
op2.addEventListener("click", playerChoice, { once: true})

for (const box of boxs) {
    box.addEventListener('click', coloc)
}

