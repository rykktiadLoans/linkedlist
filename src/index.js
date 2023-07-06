import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';

function Card(item, next, full) {
    this.item = item;
    this.next = next;
    this.full = full;
}

function Main() {

    const [cards, setCards] = useState(() => {
        let arr = [];
        for (let i = 0; i < 8; i++) {
            arr.push(new Card("", null, false));
        };
        return arr;
    });

    const [firstSelected, setFirstSelected] = useState(null);
    const [secondSelected, setSecondSelected] = useState(null);
    const [head, setHead] = useState(null);

    return (
        <div id="main">
            <Display cards={cards} firstSelected={firstSelected} secondSelected={secondSelected} head={head} />
            <Menu cards={cards} firstSelected={firstSelected} secondSelected={secondSelected} head={head} setCards={setCards} setFirstSelected={setFirstSelected} setSecondSelected={setSecondSelected} setHead={setHead} />
            <Simple cards={cards} />
        </div>
    );
}

function Menu({ cards, firstSelected, secondSelected, head, setCards, setFirstSelected, setSecondSelected, setHead }) {
    const [input, setInput] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    function errorHandle(m) {
        debugger;
        let c = cards.slice();
        let node = c[c.indexOf(head)];
        while (node !== null) {
            node.item = "";
            node.full = false;
            let n = node.next;
            node.next = null;
            node = n;

        }
        setFirstSelected(null);
        setSecondSelected(null);
        setCards(c);
        setHead(null);
        setErrorMessage(m);
        setInput("");
        setTimeout(() => { setErrorMessage("") }, 10000)
    }

    function captchalogue() {
        if (input === "") return;
        let index = null;


        for (let i = 0; i < 8; i++) {
            let node = cards[i];
            let cond = cards.reduce((total, current) => {
                let a = current.next === node;
                return total || a;
            }, false);
            if (cond) continue;
            if (node.item === "" && node.next === null && node.full === false) {
                index = i;
                break;
            }
        }

        if (index === null) {
            errorHandle("No spare cards left, ejected");
            return;
        }

        if (head === null) {
            let c = cards.slice();
            c[index].item = input;
            c[index].full = true;
            setCards(c);
            setHead(cards[index]);
            setInput("");
            return;
        }

        let node = head;
        while (node.next !== null) {
            if (node.item === "" && node.next === null && node.full === false) {
                errorHandle("Encountered an empty card in the head sequence. All ejected, inluding exotic matter");
                return;
            }
            node = node.next;
        }
        let c = cards.slice();
        c[index].item = input;
        c[index].full = true;
        node.next = c[index];
        setCards(c);
        setInput("");
    }

    function selectFirst() {
        if (input === "" || head === null) return;
        let node = head;
        while (node !== null) {
            if (node.item === input) {
                if (node.item === "" && node.next === null && node.full === false) {
                    errorHandle("Encountered an empty card in the head sequence. All ejected, inluding exotic matter");
                    return;
                }
                if (node === secondSelected) {
                    errorHandle("Both selected cards are the same, ejected");
                }
                setFirstSelected(node);
                setInput("");
                return;
            }
            node = node.next;
        }
        errorHandle("Card not found, ejected");

    }

    function selectSecond() {
        if (input === "" || head === null) return;
        let node = head;
        while (node !== null) {
            if (node.item === input) {
                if (node.item === "" && node.next === null && node.full === false) {
                    errorHandle("Encountered an empty card in the head sequence. All ejected, inluding exotic matter");
                    return;
                }
                if (node === firstSelected) {
                    errorHandle("Both selected cards are the same, ejected");
                }
                setSecondSelected(node);
                setInput("");
                return;
            }
            node = node.next;
        }
        errorHandle("Card not found, ejected");
    }

    function nullHead() {
        setHead(null);
    }

    function decaptchalogue(node) {
        let c = cards.slice();
        let n = c[c.indexOf(node)];
        n.item = "";
        n.full = false;
        n.next = null;
        setCards(c);
        if (node === firstSelected) {
            setFirstSelected(null);
        }
        else if (node === secondSelected) {
            setSecondSelected(null);
        }
    }

    function nullNext(node) {
        let c = cards.slice();
        let n = c[c.indexOf(node)];
        n.next = null;
        setCards(c);
        if (node === firstSelected) {
            setFirstSelected(null);
        }
        else if (node === secondSelected) {
            setSecondSelected(null);
        }
    }

    function connect() {
        let cond = false;
        let c = cards.slice();
        let n1 = c[c.indexOf(firstSelected)];
        let n2 = c[c.indexOf(secondSelected)];
        let n = n2;
        while(n !== null){
            if (n.item === "" && n.next === null && n.full === false) {
                errorHandle("Encountered an empty card. All ejected, inluding exotic matter");
                return;
            }
            if(n === n1){
                errorHandle("A cycle is created, ejected");
                return;
            }
            n = n.next;
        }
        n1.next = n2;
        setCards(c);
        setFirstSelected(null);
        setSecondSelected(null);
    }

    let actionone = firstSelected === null ? (<div id="actionone">Select first card to unlock</div>) :
        (<div id="actionone">
            <p>Actions on the <span style={{ color: "aqua" }}>first selected</span> card</p>
            <button id="decapone" type="button" onClick={() => { decaptchalogue(firstSelected) }}>DeC</button>
            <button id="nullone" type="button" onClick={() => { nullNext(firstSelected) }}>NC</button>
        </div>);

    let actiontwo = secondSelected === null ? (<div id="actiontwo">Select second card to unlock</div>) :
        (<div id="actiontwo">
            <p>Actions on the <span style={{ color: "orange" }}>second selected</span> card</p>
            <button id="decaptwo" type="button" onClick={() => { decaptchalogue(secondSelected) }}>DeC</button>
            <button id="nulltwo" type="button" onClick={() => { nullNext(secondSelected) }}>NC</button>
        </div>);

    let teamaction = secondSelected === null || firstSelected === null ? (<div id="teamaction">Select both first and second card to unlock</div>) :
        (<div id="actiontwo">
            <p>Actions on both selected cards</p>
            <button id="connect" type="button" onClick={connect}>1{">"}2</button>
        </div>);

    return (
        <div id="menu">
            <p id="error" style={{ color: "red", font: "bold 16px 'Courier New', sans-serif" }}> {errorMessage} </p>
            <div id="selection">
                <p>Select and captchalogue</p>
                <input id="inputselection" type="text" value={input} maxLength="10" placeholder="max 10 characters" onInput={e => setInput(e.target.value)}></input>
                <button id="captchaloguebutton" type="button" onClick={captchalogue}>C</button>
                <button id="selectone" type="button" onClick={selectFirst}>S1</button>
                <button id="selecttwo" type="button" onClick={selectSecond}>S2</button>
                {head === null ? ("") : (<button id="nullhead" type="button" onClick={nullHead}>NH</button>)}
            </div>
            {actionone}{actiontwo}{teamaction}
        </div>
    );
}

function Display({ cards, firstSelected, secondSelected, head }) {
    let array = [];
    for (let i = 0; i < 8; i++) {
        array.push(new Array());
    }
    let pointer = head === null ? null : head.next;
    let proc = [-1, -1, -1, -1, -1, -1, -1, -1]
    if (head !== null) {
        array[0].push(head);
        proc[cards.indexOf(head)] = 0;
    }

    while (pointer != null) {
        proc[cards.indexOf(pointer)] = 0;
        array[0].push(pointer);
        pointer = pointer.next;
    }

    pointer = 0;
    let line = 1;
    while (pointer < 8) {

        if (proc[pointer] !== -1) {
            pointer++;
            continue;
        };

        let node = cards[pointer];
        if (node.full === false) {
            proc[pointer] = 8;
            pointer++;
            continue;
        }
        while (node != null) {
            proc[cards.indexOf(node)] = line;
            array[line].push(node);
            node = node.next;
        }
        line++;
        pointer++;
    }

    let grid = array.map((item, index) => {
        if (item === new Array()) {
            return;
        }
        return item.map((itemLower, indexLower) => {
            let bg;
            if (index === 0 && itemLower !== firstSelected && itemLower !== secondSelected) {
                bg = "/linkedlist.png";
            }
            if (index === 0 && itemLower === firstSelected) {
                bg = "/linkedlistselectedone.png";
            }
            if (index === 0 && itemLower === secondSelected) {
                bg = "/linkedlistselectetwo.png";
            }
            if (index !== 0 && itemLower !== firstSelected && itemLower !== secondSelected) {
                bg = "/linkedlistinactive.png";
            }
            if (index !== 0 && itemLower === firstSelected) {
                bg = "/linkedlistinactiveone.png";
            }
            if (index !== 0 && itemLower === secondSelected) {
                bg = "/linkedlistinactivetwo.png";
            }
            let arrow;
            if (index === 0 || indexLower > 0) {
                arrow = <div className="arrow" style={{backgroundImage: "url(/arrow.png)"}}></div>
            }
            return (<div className="cardcontainer" key={`${index} ${indexLower}`} style={{ gridArea: `${index + 1} / ${indexLower + 1} / span 1 / span 1` }}>{arrow} <div className={`displaycard`} style={{backgroundImage: `url(${bg})`}}>{itemLower.item}</div></div>)
        })
    })

    return (
        <div id="display">{grid}</div>
    );
}

function Simple({ cards }) {
    let array = cards.map(function (x, i) {
        return (<div key={i} className="simplecard" style={{backgroundImage: "url(/linkedlistsimple.png)"}}>{x.item}</div>)
    });
    return (
        <div id="simple">{array}</div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Main />
    </React.StrictMode>
);