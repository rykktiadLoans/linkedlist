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
    const [guide, setGuide] = useState(false);

    let guideelement = (
        <div id="guidebg">
            <div id="guide">
                <button id="closeguide" type="button" onClick={() => { setGuide(false); }}>X</button>
                <h3>What is this?</h3>
                <p>This is a simulator of my own Linked List modus, which, unbelievably, operates on the logic of the linked list data structure. Specifically, the one written in C with manual pointer control. The reason it is like that is because Linked List without all the pointer nonsense is, on the outside, essentially no different from the array, which is boring.

                </p>
                <h3>What are linked lists?</h3>
                <p>Linked list comprises of nodes and, at least in my case, of a Head. Nodes are objects that have 2 properties: value that the node contains and the pointer that allows access to the next node. Head is essentially a main and the only valid pointer that allows access to the list.

                </p>
                <img src="https://media.geeksforgeeks.org/wp-content/uploads/20220816144425/LLdrawio.png"></img>
                <p>Here is a visual (<a href="https://www.geeksforgeeks.org/data-structures/linked-list/singly-linked-list/">https://www.geeksforgeeks.org/data-structures/linked-list/singly-linked-list/</a>) that shows how it works. Head points to a node with value A, which points to a node with value B and so on. Null thing you see in the end means the end of a chain.</p>
                <p>Now, for example, you want to access the third item of the list. Then, with Head you access A, which is the first one, then you use a pointer to access B, which is a second one, and then you go to the third node, which is C.</p>
                <p>The modus works in the same way, except the values you store are items, there is a limit of cards that can be used, and the ways you can work with the linked list are pretty constrained.</p>
                <p>The next important thing to note is that it is important to plan your steps ahead in order to maintain three things:</p>

                <ol style={{ listStyleType: "lower-alpha" }}>
                    <li>Head should always point at the earliest item in the chain</li>
                    <li>All the nodes should be connected in a single linear chain with no cycles</li>
                    <li>There are no un-nulled pointers (I'll call them empty cards from now on. I'll also explain them later)</li>
                </ol>
                <p>That is important because the only way to access a node is only accessible if Head points at it or if Head points at a chain that contains the node. The program has some tools to bypass it, but they are primarily for repairing the linked list if you thought your steps ahead of time. Unsafe operations may result in the permanent loss of access to specific cards and items within them (in-universe, in reality you can just reload the page).

                </p>

                <h3>How does the program work?</h3>
                <p>The stripe at the bottom shows all 8 cards that are available to you and what they store. The menu at the right is the only interactive part of the app that allows you to do operations. We'll talk about it later.</p>
                <p>The big dark gray area in the center is the display where all the cards are shown. Every row is a separate list. The top row is the main chain that is accessed by Head. You may notice that it is the only row that begins with a red arrow. Arrows visualize pointers, by the way. They also show when a card points to another card. Cards in the top row are blue, because they are the only active ones (can be accessed from head). All the others are gray. Card selected in the first slot has a blue outline, the one in the second has an orange outline. Sometimes, you can make multiple cards point to the same card. In that case, the display may render the same card multiple times. These cards are called duplicates, which have red color, but in reality they are the exact same cards, just accessed from a different card. The originals are always the ones at the top.</p>
                <p>Ok, now onto the operation menu. It is important to note that, under some conditions, there may be an error. In that case, all the cards *that can be accessed from Head* are ejected and all the selected are emptied.</p>
                <p>I'll also write some procedures at the end on how to easily operate that thing.</p>
                <p>Before we go on further, I need to explain what empty cards are. When a card is decaptchalogued, its contents are emptied, pointer is nullified and the card's space can be used for further uses. However, the card before it or Head can still point to it. That means that the card is still pointing at something, but that something just isn't there, and when the program goes to it it (shouldn't) does not know how to respond and crashes. This is not an engine render, but rather an emulation of the way linked lists in C work. And when an empty card appears, the display will show you a card without text in it. They are largely undesirable and will lead to the program throwing out an error. If that happens, when the empty card is ejected, the item ejected is called exotic matter, which corresponds to a random captcha code. When captchalogued again, the code on the back of the card is usually unreadable. That may be beneficial sometimes, but usually not.

                </p>
                <p>The main tool you can use to manipulate the list are selected cards, they give you access to the selected card as long as it is selected, no matter where it is.</p>
                <p>Okay, now actually onto the menu. It is divided into 6 sections, including the error message thing, where messages in read will appear when errors are happening, and a button that opens this guide. Besides that here are the section:</p>

                <ul>
                    <li>
                        Select and captchalogue. Contains an input that needs to be filled in order for the operations in this section to function.
                        <ol>
                            <li>C: Captchalogue. Takes the value from the input and appends the card with the value to the end of the active chain. Takes up one card (don't forget, you can only use 8 cards). If there is an empty card in the active chain or all 8 cards are already used up, it crashes.</li>
                            <li>S1: Select first. Takes the value from the input, looks for the card with the corresponding value in the main chain, and puts it as the first selected card. Crashes if encounters an empty card in the main chain, fails to find the card, or if both the selected cards are the same one.</li>
                            <li>S2: Select second. Same as the above, but for the second one.</li>
                            <li>NH: Null head. Points the head to null. Unlocked only when Head isn't already pointing to null</li>
                        </ol>
                    </li>
                    <li>
                        Actions on the first/second selected card. The operations are the same for both, but for their respective cards. Require the card to be selected in the appropriate slot to unlock.
                        <ol>
                            <li>DeC: Decaptchalogue. Empties the card, nulls the next,  and ejects the item of the selected card. Deselects the card.</li>
                            <li>NN: Null next. Changes the card's pointer so that it points to null.</li>
                            <li>SH: Set head. Sets the card as the new head. The easiest way to create duplicates.</li>
                        </ol>
                    </li>
                    <li>
                        Select both. The operation that requires both cards to be selected. There's only one
                        <ol>
                            <li>1{">"}2: 1 to 2. Changes the pointer of the first selected card so it points to the second selected card. Deselects both cards. Before connecting, the program makes sure that the connection will not result in a cycle by checking whether you can access the first selected card by using the second's chain. If it does find it, it crashes since the connection results in a cycle. If it encounters an empty card, it also crashes.</li>
                        </ol>
                    </li>
                </ul>

                <h3>How do I do anything actually useful?</h3>
                <p>Pretty easy actually, you just have to follow the procedure. If you want to captchalogue an item, just make sure there are no empty cards in the active list. To decaptchalogue the card, the solution depends on the position of the card.</p>
                <ul>
                    <li>The card is the first one. In that case, select the second card in one slot, the first one in the other, decaptchalogue the first one and set the second one as the head</li>
                    <li>The card is in the middle. Select the target card in the *first* slot and the card card after it in the second one. Decap the card in the first slot, and select the card that was before it in the first slot. Connect the two.</li>
                    <li>The card is the last one. Select the card and decaptchalogue it. Select the card before it and null its pointer.</li>
                </ul>
            </div>
        </div>);

    return (
        <div id="main">
            <Display cards={cards} firstSelected={firstSelected} secondSelected={secondSelected} head={head} />
            <Menu cards={cards} firstSelected={firstSelected} secondSelected={secondSelected} head={head} setCards={setCards} setFirstSelected={setFirstSelected} setSecondSelected={setSecondSelected} setHead={setHead} guide={guide} setGuide={setGuide} />
            <Simple cards={cards} />
            {guide ? guideelement : ""}
        </div>
    );
}

function Menu({ cards, firstSelected, secondSelected, head, setCards, setFirstSelected, setSecondSelected, setHead, guide, setGuide }) {
    const [input, setInput] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    function errorHandle(m) {
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
            if (node.next.item === "" && node.next.next === null && node.next.full === false) {
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

        for (let i = 0; i < 8; i++) {
            let j = c[i];
            if (n === j) {
                continue;
            }
            if (j.next === n) {
                j.next = new Card("", null, false);
            }
        }

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
        while (n !== null) {
            if (n.item === "" && n.next === null && n.full === false) {
                errorHandle("Encountered an empty card. All ejected, inluding exotic matter");
                return;
            }
            if (n === n1) {
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
            <button id="nullone" type="button" onClick={() => { nullNext(firstSelected) }}>NN</button>
            <button id="setone" type="button" onClick={() => { setHead(firstSelected); setFirstSelected(null); }}>SH</button>
        </div>);

    let actiontwo = secondSelected === null ? (<div id="actiontwo">Select second card to unlock</div>) :
        (<div id="actiontwo">
            <p>Actions on the <span style={{ color: "orange" }}>second selected</span> card</p>
            <button id="decaptwo" type="button" onClick={() => { decaptchalogue(secondSelected) }}>DeC</button>
            <button id="nulltwo" type="button" onClick={() => { nullNext(secondSelected) }}>NN</button>
            <button id="setone" type="button" onClick={() => { setHead(secondSelected); setSecondSelected(null); }}>SH</button>
        </div>);

    let teamaction = secondSelected === null || firstSelected === null ? (<div id="teamaction">Select both <span style={{ color: "aqua" }}>first</span> and <span style={{ color: "orange" }}>second</span> cards to unlock</div>) :
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
            <button style={{ width: "100%", height: "20px" }} id="guidebutton" type="button" onClick={() => (setGuide(true))}>Press to open a guide</button>

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
            let duplicate = () => {
                if (index === 0) {
                    return false;
                }
                for (let i = 0; i < index; i++) {
                    if (array[i].reduce((total, current) => {
                        return total || current === itemLower;
                    }, false)) {
                        return true;
                    }
                }
                return false;
            }
            if (index === 0 && itemLower !== firstSelected && itemLower !== secondSelected) {
                bg = "./linkedlist/linkedlist.png";
            }
            else if (duplicate()) {
                bg = "./linkedlist/duplicate.png";
            }
            else if (index === 0 && itemLower === firstSelected) {
                bg = "./linkedlist/linkedlistselectedone.png";
            }
            else if (index === 0 && itemLower === secondSelected) {
                bg = "./linkedlist/linkedlistselectetwo.png";
            }
            else if (index !== 0 && itemLower !== firstSelected && itemLower !== secondSelected) {
                bg = "./linkedlist/linkedlistinactive.png";
            }
            else if (index !== 0 && itemLower === firstSelected) {
                bg = "./linkedlist/linkedlistinactiveone.png";
            }
            else if (index !== 0 && itemLower === secondSelected) {
                bg = "./linkedlist/linkedlistinactivetwo.png";
            }
            let arrow;
            if (index === 0 || indexLower > 0) {
                arrow = <div className="arrow" style={{ backgroundImage: "url(./linkedlist/arrow.png)" }}></div>
            }
            return (<div className="cardcontainer" key={`${index} ${indexLower}`} style={{ gridArea: `${index + 1} / ${indexLower + 1} / span 1 / span 1` }}>{arrow} <div className={`displaycard`} style={{ backgroundImage: `url(${bg})` }}>{itemLower.item}</div></div>)
        })
    })

    return (
        <div id="display">{grid}</div>
    );
}

function Simple({ cards }) {
    let array = cards.map(function (x, i) {
        return (<div key={i} className="simplecard" style={{ backgroundImage: "url(./linkedlist/linkedlistsimple.png)" }}>{x.item}</div>)
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