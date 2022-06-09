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
let turnPl1 = false


let Pos = {"v": [], "h": []}
let NavObj = {
    4 : {
        'pos': [],
        'per': []
    },
    3 : {
        'pos': [],
        'per': []
    },
    2 : {
        'pos': [],
        'per': []
    },
    1 : {
        'pos': [],
        'per': []
    }
}

let aux = 0

const rnd = min => max => Math.floor(Math.random() * (max - min)) + min

const verif = (x, y) => x == y || x == y - 1 || x == y + 1 || x == y - 10 || x == y + 10 || x == y - 9 || x == y + 9 || x == y + 11 || x == y - 11

const peri = e => t => isVertical =>  {
    
    if (isVertical) {

    } else {
        if (t == 'all') {
            console.log(e)
            switch (true) {
                case (e < 10 && e > 1):
                    return [e - 1, e + 9, e + 10, e + 11, e + 1]
                case (e > 10 && e % 10 == 0):
                    return [e - 10, e - 11, e - 1, e + 9, e + 10]
                case (e > 91 && e < 100):
                    return [e - 10, e - 11, e - 1, e + 1, e - 9]
                case (e > 10 && e % 10 == 1):
                    return [e - 10, e + 10, e + 11, e + 1, e - 9]
                case (e == 1):
                    return [e + 10, e + 11, e + 1]
                case (e == 10):
                    return [e - 1, e + 9, e + 10]
                case(e == 91):
                    return [e - 10, e - 9, e + 1]
                case (e == 100):
                    return [e - 10, e - 11, e - 1]
                default:
                    return [e - 10, e - 11, e - 1, e + 9, e + 10, e + 11, e + 1, e - 9]
            }
        } else {
            switch (true) {
                case (e < 10 && e > 1):
                    t = `top-${t}`
                    break  
                case (e > 10 && e % 10 == 0):
                    t = ''
                    break
                case (e > 91 && e < 100):
                    t = `bot-${t}`
                    break
                case (e > 10 && e % 10 == 1):
                    t = ''
                    break
                case (e == 1 || e == 10):
                    t = `top-m`
                    break
                case (e == 91 || e == 100):
                    t = `bot-m`
                    break
                default:
                    break
            }
            switch(t) {
                case 'l':
                    return [e - 10, e - 11, e - 1, e + 9, e + 10]
                case 'r':
                    return [e - 10, e - 9, e + 1, e + 11, e + 10]
                case 'top-l':
                    return [e - 1, e + 9, e + 10]
                case 'top-r':
                    return [e + 1, e + 11, e + 10]
                case 'top-m':
                    return [e + 10]
                case 'bot-l':
                    return [e - 10, e - 11, e - 1]
                case 'bot-r':
                    return [e - 10, e - 9, e + 1]
                case 'bot-m':
                    return [e - 10]  
                default:
                    return [e - 10, e + 10]
            }
        }
    }
} 

const localValid = (v, tam, isVertical) => {
    let auxbool
    if (isVertical) {
        for(let i = 0; i < tam; i++) {
            if(Pos["v"].length == 0) {
                auxbool = auxbool || Pos["h"].some(x => verif(x,v - i*10))
            } else if (Pos["h"].length == 0){
                auxbool = auxbool || Pos["v"].some(x => verif(x,v - i*10))
            } else {
                auxbool = auxbool || Pos["v"].some(x => verif(x,v - i*10)) || Pos["h"].some(x => verif(x,v - i*10))
            }
        }
        return !auxbool
    } else {
        for(let i = 0; i < tam; i++) {
            if(Pos["v"].length == 0) {
                auxbool = auxbool || Pos["h"].some(x => verif(x,v - i))
            } else if (Pos["h"].length == 0){
                auxbool = auxbool || Pos["v"].some(x => verif(x,v - i))
            } else {
                auxbool = auxbool || Pos["v"].some(x => verif(x,v - i)) || Pos["h"].some(x => verif(x,v - i))
            }
        }
        return !auxbool
    }
}

const rndNumber = tam => isVertical => {
    if (isVertical) {
        let n = rnd((10 * tam - 9))(101)
        if (Pos[`v`].length == 0 && Pos[`h`].length == 0) {
            return n
        } else {
            if (localValid(n, tam, isVertical)) {
                return n
            } else {
                return rndNumber(tam)(isVertical)
            }
        }
    } else {
        const auxHori = e => {
            let aux1 
            for(let i = 0; i < 10; i++) {
                aux1 = aux1 || (e < tam + (10 * i) && e > i * 10)
            }
            
            return aux1
        }
        let n = rnd((1))(101)
        if (auxHori(n)) {
            return rndNumber(tam)(isVertical)
        } else {
            if (Pos[`h`].length == 0 && Pos[`v`].length == 0) {
                return n
            } else {
                if (localValid(n, tam, isVertical)) {
                    return n
                } else {
                    return rndNumber(tam)(isVertical)
                }
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

function rndPosNav(tam, quant) {
    for (let i = 0; i < quant; i++) {
        let isVertical = false //Math.random() < 0.5;
        let auxList = []
        let auxListp = []
        if (isVertical) { 
            aux = rndNumber(tam)(isVertical)
            for(let b = 0; b < tam; b++) {
                // switch (b) {
                //     case 0:
                //         if (tam == 0) {    
                //             auxListp.push(peri(aux)('all'))
                //             break
                //         } else {
                //             auxListp.push(peri(aux)('l'))
                //             break
                //         }
                //     case tam:
                //         auxListp.push(peri(aux)('r'))
                //         break
                //     default:
                //         auxListp.push(peri(aux)(''))
                //         break
                // }
                Pos[`v`].unshift(aux)
                auxList.push(aux)
                aux -= 10
            }
            //NavObj[tam]['pos'].push(auxList)
            //NavObj[tam]['per'].push(auxListp)
        } else {
            
            aux = rndNumber(tam)(isVertical)
            for(let b = 0; b < tam; b++) {
                switch (b) {
                    case 0:
                        if (tam == 1) {    
                            console.log(aux)
                            auxListp.push(peri(aux)('all')(isVertical))
                            break
                        } else {
                            auxListp.push(peri(aux)('r')(isVertical))
                            break
                        }
                    case tam - 1:
                        auxListp.push(peri(aux)('l')(isVertical))
                        break
                    default:
                        auxListp.push(peri(aux)('')(isVertical))
                        break
                }
                Pos[`h`].unshift(aux)
                auxList.push(aux)
                aux--
            }
            NavObj[tam]['pos'].push(auxList)
            NavObj[tam]['per'].push(auxListp)
        }
        aux = 0
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

function gameBe(e) {
    const coord = document.querySelectorAll('.coord_pl1')
    const lastVerif = va => {
        Object.keys(NavObj).map(key => {
            if(NavObj[key]['pos'].map(lists => {
                    lists.map(x => (x == va) && NavObj[key]['pos'].length == 0) })) {
                        NavObj[key]['per'].map(y => {
                            coord.forEach(z => {
                                if (z == y) {
                                    z.classList.add("emp")
                                }
                            })
                        })
                    } else if ( NavObj[key]['pos'].map(lists => lists.some(x => x == va) )) {
                        NavObj[key]['pos'].map(lists => {
                            lists = lists.filter(x => x != va)
                        })
                    }
        })
    }
    if(vsPc && e.target.classList.contains("coord_pl1")) {
        console.log(NavObj)
        let select = Number(e.target.classList[1])
        if (Pos["h"].includes(select)){
            e.target.classList.add("mark")
            lastVerif(select)
            
        } else if (Pos["v"].includes(select)) {
            e.target.classList.add("mark")

        } else {
            e.target.classList.add("emp")
        }
    }
}

rndPosNav(4, 1)
rndPosNav(3, 2)
rndPosNav(2, 3)
rndPosNav(1, 4)

console.log(Pos)
set_tab(pl1)
set_tab(pl2)

op.addEventListener("click", gameChoice, { once: true})


const coords = document.querySelectorAll('.coord')

coords.forEach( coord => {
        coord.addEventListener("click", gameBe, { once: true})
})
