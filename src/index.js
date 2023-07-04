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

    function errorHandle(m){
        let c = cards.slice();
        let node = c[c.indexOf(head)];
        while(node !== null){
            node.item = "";
            node.full = false;
            let n = node.next;
            node.next = null;
            node = n;
            
        }
        setFirstSelected(null);
        setFirstSelected(null);
        setCards(c);
        setHead(null);
        setErrorMessage(m);
        setInput("");
        setTimeout(() => {setErrorMessage("")}, 10000)
    }

    function captchalogue() {
        if (input === "") return;
        let index = null;
        for (let i = 0; i < 8; i++) {
            let node = cards[i];
            if (node.item === "" && node.next === null && node.full === false) {
                index = i;
                break;
            }
        }

        if(index === null){
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
            node = node.next;
        }
        let c = cards.slice();
        c[index].item = input;
        c[index].full = true;
        node.next = c[index];
        setCards(c);
        setInput("");
    }

    function selectFirst(){
        if(input === "" || head === null) return;
        let node = head;
        while(node !== null){
            if(node.item === input){
                if(node === secondSelected){
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

    function selectSecond(){
        if(input === "" || head === null) return;
        let node = head;
        while(node !== null){
            if(node.item === input){
                if(node === firstSelected){
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

    return (
        <div id="menu">
            <p id="error" style={{color: "red", font: "bold 16px 'Courier New', sans-serif"}}> {errorMessage} </p>
            <div id="selection">
                <input id="inputselection" type="text" value={input} maxLength="15" placeholder="max 15 characters" onInput={e => setInput(e.target.value)}></input>
                <button id="captchaloguebutton" type="button" onClick={captchalogue}>C</button>
                <button id="selectone" type="button" onClick={selectFirst}>S1</button>
                <button id="selecttwo" type="button" onClick={selectSecond}>S2</button>
            </div>
        </div>
    );
}

function Display({ cards, firstSelected, secondSelected, head }) {
    let array = [];
    for (let i = 0; i < 8; i++) {
        array.push(new Array());
    }
    let pointer = head === null ? null : head.next;
    console.log(head);
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
            pointer++;
            proc[pointer] = 8;
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
            if(index === 0 && itemLower !== firstSelected && itemLower !== secondSelected){
                bg = "normalcard";
            }
            if(index === 0 && itemLower === firstSelected){
                bg = "normalcardone";
            }
            if(index === 0 && itemLower === secondSelected){
                bg = "normalcardtwo";
            }
            if(index !== 0 && itemLower !== firstSelected && itemLower !== secondSelected){
                bg = "inactivecard";
            }
            if(index !== 0 && itemLower === firstSelected){
                bg = "inactivecardone";
            }
            if(index !== 0 && itemLower === secondSelected){
                bg = "inactivecardtwo";
            }
            let arrow = "";
            if(index === 0 || indexLower > 0){
                arrow = <div className="arrow" style={{ gridColumn: `${(indexLower+1) * 2 - 1} / span 1`, gridRow: `${(index + 1)} / span 1` }}></div>
            }
            return (<>{arrow} <div key={`${index} ${indexLower}`} className={`displaycard ${bg}`} style={{ gridColumn: `${(indexLower + 1) * 2} / span 1`, gridRow: `${(index + 1)} / span 1` }}>{itemLower.item}</div></>)
        })
    })

    return (
        <div id="display">{grid}</div>
    );
}

function Simple({ cards }) {
    let array = cards.map(function (x, i) {
        return (<div key={i} className="simplecard">{x.item}</div>)
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