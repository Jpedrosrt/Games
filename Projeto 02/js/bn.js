const base = require('../base')
const op = document.querySelector('.ops')
const game = document.querySelector('.game')
const pl1 = document.querySelector('.pl1')
const pl2 = document.querySelector('.pl2')
const infopl1 = document.querySelector('.pl1_info')
const infopl2 = document.querySelector('.pl2_info')

const iconPl1 = document.createElement("lord-icon")
const iconPl2 = document.createElement("lord-icon")
const letr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'] 

let vsPc = false
let Pos = {"v": [], "h": []}
let aux = 0

const rnd = min => max => Math.floor(Math.random() * (max - min)) + min

const localValid = (v, tam, isVertical) => {
    let auxbool
    const verif = (x, y) => x == y || x == y - 1 || x == y + 1 || x == y - 10 || x == y + 10 || x == y - 9 || x == y - 11
    
    if (isVertical) {
        for(let i = 0; i < tam; i++) {
            for(let j = 0; j < tam; j++) {
                console.log(`1 - ${Pos[`v`][j]} and ${(v - i * 10)} - ${Pos[`v`][j] == (v - i * 10)}`)
                console.log(`2 - ${Pos[`v`][j]} and ${(v - i * 10) - 1} - ${Pos[`v`][j] == (v - i * 10) - 1}`)
                console.log(`3 - ${Pos[`v`][j]} and ${(v - i * 10) + 1} - ${Pos[`v`][j] == (v - i * 10) + 1}`)
                console.log(`4 - ${Pos[`v`][j]} and ${(v - i * 10) - 10} - ${Pos[`v`][j] == (v - i * 10) - 10}`)
                console.log(`5 - ${Pos[`v`][j]} and ${(v - i * 10) - 9} - ${Pos[`v`][j] == (v - i * 10) - 9}`)
                console.log(`6 - ${Pos[`v`][j]} and ${(v - i * 10) - 11} - ${Pos[`v`][j] == (v - i * 10) - 11}`)
            }
            console.log(Pos["v"].some(x => verif(x, v - i*10)))
            auxbool = auxbool || Pos["v"].some(x => verif(x,v - i*10))
        }
        console.log(!auxbool)
        return !auxbool
    }
}

const rndNumber = x => isVertical => {
    let n = rnd((10 * x - 9))(101)
    if (isVertical) {
        if (Pos[`v`].length == 0) {
            return n
        } else {
            console.log(`Valor aleatorio ${n}`)
            console.log(`lista ${Pos[`v`]}`)
            if (localValid(n, x, isVertical)) {
                return n
            } else {
                return rndNumber(x)(isVertical)
            }
        }
    }
}

function setAttributes(e, attrs) {
    for (let key in attrs) {
        e.setAttribute(key, attrs[key]);
    }
}

function set_tab(x) {
    let e = 1
    for (let i = 0; i < 121; i++) {
        const a = document.createElement("div")
        switch (true) {
            case i == 0:
                setAttributes(a, {"class": "coord_info"})
                x.appendChild(a)
                break;
            case (i > 0 && i < 11):
                a.innerText = letr[i - 1]
                setAttributes(a, {"class": "coord_info"})
                x.appendChild(a)
                break;
            case (Number.isInteger(i / 11)):
                a.innerText = i / 11
                setAttributes(a, {"class": "coord_info"})
                x.appendChild(a)
                break;
            default:
                setAttributes(a, {"class": `coord ${e} coord_${x.classList[0]}`})
                x.appendChild(a)
                e += 1
            
        }
    }
}

function rndPosNav(e, tam, quant) {
    let isVertical = true //Math.random() < 0.5;

    if (isVertical) { //FICA LIGADO PORRA
        for (let i = 0; i < quant; i++) {
            aux = rndNumber(tam)(isVertical)
            for(let b = 0; b < tam; b++) {
                Pos[`v`].unshift(aux)
                aux -= 10
            }
            aux = 0
        }
    }
}

function gameChoice(e) {
    const coords = document.querySelectorAll(`.coord_pl1`)
    op.classList.add('escond')
    game.classList.remove('escond')
    e.path[4].classList.add('escond')
    if (e.target.classList.value == 'btn-1') {
        vsPc = true
        setAttributes(iconPl1, {"src": "https://cdn.lordicon.com/qhgmphtg.json", "trigger": "hover", "delay": "1500", "style": "width:100px;height:100px"});
        setAttributes(iconPl2, {"src": "https://cdn.lordicon.com/dxjqoygy.json", "trigger": "hover", "delay": "1500", "style": "width:100px;height:100px"});
        infopl1.appendChild(iconPl2)
        infopl2.appendChild(iconPl1)
        console.log(Pos)
        Object.keys(Pos).map(key => {
            Pos[key].map(n => {
                coords.forEach(coords => {
                    if(coords.classList.contains(n))
                        coords.classList.add('navs')      
                })
            })
        })
    } else {
        vsPc = false
        setAttributes(iconPl1, {"src": "https://cdn.lordicon.com/dxjqoygy.json", "trigger": "hover", "delay": "1500", "style": "width:100px;height:100px"});
        setAttributes(iconPl2, {"src": "https://cdn.lordicon.com/dxjqoygy.json", "trigger": "hover", "delay": "1500", "style": "width:100px;height:100px"});
        infopl1.appendChild(iconPl1)
        infopl2.appendChild(iconPl2)
    }
}

rndPosNav(pl2, 3, 2)

set_tab(pl1)
set_tab(pl2)


op.addEventListener("click", gameChoice, { once: true})