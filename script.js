let cardNumber = 0;
let newCards = [];
let counter = 0 ;
let cartasViradas = 0 ;
let virou = false;
let primeiraCarta, segundaCarta, naoVira;

start();

function start () {
    while (cardNumber < 4 || cardNumber > 14 || cardNumber % 2 === 1 || isNaN(cardNumber)) {
        cardNumber = Number(prompt("Insira um número par de 4 a 14:"));
    }

    embaralhaCartas();    
    distribuiCartas();
    
}

function embaralhaCartas() {
    const cards = [
        'react.jpg" class="react ', 'react.jpg" class="react ', 'css.jpg" class="css ', 'css.jpg" class="css ', 
        'html.jpg" class="html ', 'html.jpg" class="html ', 'javascript.jpg" class="javascript ', 'javascript.jpg" class="javascript ', 
        'node.jpg" class="node ', 'node.jpg" class="node ', 'sql.jpg" class="sql ', 'sql.jpg" class="sql ',
        'angular.jpg" class="angular ', 'angular.jpg" class="angular ', 
    ];
    for(let i = 0; i < cardNumber; i++){
        newCards.push(cards[i]);
        newCards.sort(comparador);
    }
}

function comparador () {
    return Math.random() - 0.5;
}

function distribuiCartas() {
    const sortCards = document.querySelector(".card-table");
    for(let i = 0; i < cardNumber; i++) {
        sortCards.innerHTML += `
        <div class="card">
            <img src="imagens/cardback.jpg" class="face" onclick="viraCarta(this)" />
            <img src="imagens/${newCards[i]} flip face" />
        </div>    
        `;
    }
}


function viraCarta(element) {

    if(naoVira){
        return;
    } else if (element.classList.contains('flip')) {
        return;
    }

    element.classList.toggle('flip');
    const sibling = element.nextElementSibling;
    sibling.classList.toggle('flip');
    counter ++;
   
   if (!virou){
    virou = true;
    primeiraCarta = sibling;
    primeiroVerso = element;
   } else {
    virou = false;
    segundaCarta = sibling;
    segundoVerso = element;
    naoVira = true;
   }

   if(counter % 2 === 0) {
    if(primeiraCarta.classList.value === segundaCarta.classList.value){
        cartasViradas += 2;
        naoVira = false;
    } else {
        setTimeout(desviraCarta, 1000);
        }
    }

    if(cartasViradas === cardNumber) {
        setTimeout(finishGame, 1000);
    }
}

function desviraCarta() {
    primeiraCarta.classList.add('flip');
    primeiroVerso.classList.toggle('flip');
    segundaCarta.classList.add('flip');
    segundoVerso.classList.toggle('flip');
    naoVira = false;
}

function finishGame () {
    const finish = prompt("Você ganhou em " + counter + " jogadas, deseja reiniciar a partida?")
    if(finish === "sim") {
        restart ();
    }
}

function restart () {
    const apaga = document.querySelector(".game");
    apaga.innerHTML = `
    <div class="top">
    MEMORY CARD GAME
    </div>

    <div class="card-table">

    </div> 
    `;
    cardNumber = 0;
    counter = 0;
    newCards = [];
    cartasViradas = 0 ;
    start();
}