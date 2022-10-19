let cardNumber = 0;
let newCards = [];
let counter = 0 ;
let cartasViradas = 0 ;
let virou = false;
let primeiraCarta, segundaCarta, primeiroVerso, segundoVerso, naoVira, id;
let segundos = 0;

start();

function start () {
    while (cardNumber < 4 || cardNumber > 14 || cardNumber % 2 === 1 || isNaN(cardNumber)) {
        cardNumber = Number(prompt("Insira um número par de cartas entre 4 e 14:"));
    }
    id = setInterval(time,1000);
    embaralhaCartas();    
    distribuiCartas();
}

function embaralhaCartas() {
    const cards = [
        'react.jpg" class="react ', 'react.jpg" class="react ', 'css.jpg" class="css ',
         'css.jpg" class="css ', 'html.jpg" class="html ', 'html.jpg" class="html ', 
         'javascript.jpg" class="javascript ', 'javascript.jpg" class="javascript ', 
        'node.jpg" class="node ', 'node.jpg" class="node ', 'sql.jpg" class="sql ', 
        'sql.jpg" class="sql ', 'angular.jpg" class="angular ', 'angular.jpg" class="angular ', 
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
            <img src="img/cardback.jpg" class="face" onclick="viraCarta(this)" />
            <img src="img/${newCards[i]} flip face" />
        </div>    
        `;
    }
}

function time() {
    segundos ++;
    const cronometro = document.querySelector(".time");
    cronometro.innerHTML = segundos;
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
        clearInterval(id);
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
    const finish = prompt("Você ganhou em " + counter + " jogadas e " + segundos + " segundos, deseja reiniciar a partida? (sim ou nao)")
    if(finish === "sim" || finish === "s") {
        restart ();
    } else if (finish === "nao" || finish === "não" || finish === "n") {
        return;
    } else {
        finishGame ();
    }
}

function restart () {
    zeraVariaveis ()
    start();
}

function zeraVariaveis () {
    const apaga = document.querySelector(".card-table");
    apaga.innerHTML = "";
    cardNumber = 0;
    counter = 0;
    newCards = [];
    cartasViradas = 0;
    segundos = 0;
}