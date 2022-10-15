let cardNumber = 0;
let cards = [
    'imagens/angular.jpg" class="angular ', 'imagens/angular.jpg" class="angular ', 'imagens/css.jpg" class="css ', 
    'imagens/css.jpg" class="css ', 'imagens/html.jpg" class="html ', 'imagens/html.jpg" class="html ', 
    'imagens/javascript.jpg" class="javascript ', 'imagens/javascript.jpg" class="javascript ', 'imagens/node.jpg" class="node ', 
    'imagens/node.jpg" class="node ', 'imagens/react.jpg" class="react ', 'imagens/react.jpg" class="react ', 
    'imagens/sql.jpg" class="sql ', 'imagens/sql.jpg" class="sql ' 
];


let newCards = [];
let counter = 0 ;
let virou = false;
let primeiraCarta, segundaCarta, a;

start();

function start () {
    while (cardNumber < 4 || cardNumber > 14 || cardNumber % 2 === 1 || cardNumber === NaN) {
        cardNumber = Number(prompt("Insira um número par de 4 a 14:"));
    }

    embaralhaCartas();    
    distribuiCartas();
    
}

function embaralhaCartas() {
    for(let i = 0; i < cardNumber; i++){
        newCards.push(cards[i]);
        newCards.sort(comparador);
    }
}

function distribuiCartas() {
    const sortCards = document.querySelector(".card-table");
    for(let i = 0; i < cardNumber; i++) {
        sortCards.innerHTML += `
        <div class="card">
            <img src="imagens/cardback.jpg" class="face" onclick="viraCarta(this)" />
            <img src="${newCards[i]} flip face" />
        </div>    
        `;
    }
}

function comparador () {
    return Math.random() - 0.5;
}

function viraCarta(element) {
    
    element.classList.toggle('flip');
    const sibling = element.nextElementSibling;
    sibling.classList.toggle('flip');
    counter ++;
   
   if (!virou){
    virou = true;
    primeiraCarta = sibling;
    primeiroVerso = element;
   } else {
    segundaCarta = sibling;
    segundoVerso = element;
    virou = false;
   }

   if(counter % 2 === 0) {
    if(primeiraCarta === segundaCarta){
        alert("acertou");
    } else {
        setTimeout(desviraCarta, 2000);
        }
    }
}


    function desviraCarta() {
        primeiraCarta.classList.add('flip');
        primeiroVerso.classList.toggle('flip');
        segundaCarta.classList.add('flip');
        segundoVerso.classList.toggle('flip');
    }