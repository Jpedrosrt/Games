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

let vsPc = false;



function setAttributes(e, attrs) {
    for (let key in attrs) {
        e.setAttribute(key, attrs[key]);
    }
}

function set_tab(x) {
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
                setAttributes(a, {"class": `coord a${i}`})
                x.appendChild(a)
            
        }
    }
}

function gameChoice(e) {
    op.classList.add('escond')
    game.classList.remove('escond')
    e.path[4].classList.add('escond')
    if (e.target.classList[1] == 'btn-1') {
        vsPc = true
        setAttributes(iconPl1, {"src": "https://cdn.lordicon.com/qhgmphtg.json", "trigger": "hover", "delay": "1500", "style": "width:100px;height:100px"});
        setAttributes(iconPl2, {"src": "https://cdn.lordicon.com/dxjqoygy.json", "trigger": "hover", "delay": "1500", "style": "width:100px;height:100px"});
        infopl1.appendChild(iconPl1)
        infopl2.appendChild(iconPl2)
    } else {
        vsPc = false
        setAttributes(iconPl1, {"src": "https://cdn.lordicon.com/dxjqoygy.json", "trigger": "hover", "delay": "1500", "style": "width:100px;height:100px"});
        setAttributes(iconPl2, {"src": "https://cdn.lordicon.com/dxjqoygy.json", "trigger": "hover", "delay": "1500", "style": "width:100px;height:100px"});
        infopl1.appendChild(iconPl1)
        infopl2.appendChild(iconPl2)
    }
}


set_tab(pl1)
set_tab(pl2)

op.addEventListener("click", gameChoice, { once: true})