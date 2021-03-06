// Dichiarazione variabili

// Livello facile
const easy = document.querySelector('.easy-level');
const easyGrid = 100;

// Livello medio
const medium = document.querySelector('.medium-level');
const mediumGrid = 81;

// Livello difficile
const hard = document.querySelector('.hard-level');
const hardGrid = 49;

// Contenitore dei 'box'
const gridContainer = document.querySelector('.grid-container');

// 'Repeat' Button,messaggio sconfitta,
// score giocatore
const loseMessage = document.querySelector('.lost-message')
const lostGame = document.querySelector('.lost-container');
const repeatGame = document.querySelector('.repeat-button');
const result = document.querySelector('.result');

// Variabili per la scelta del numero di
// 'box' contenuti nel container
let easyDifficulty = false;
let mediumDifficulty = false;
let hardDifficulty = false;
let bombCounter = []
let playerMaxTries = 0;
let playerScore = 0;

// Funzione per controllare se il box
// contiene una bomba
function checkBomb (bombListCheck, value){
    return bombListCheck.includes(value);
}


// Funzione che impone una condizione
// di 'Game Over' al player
function gameOver (text,losingBox){
    loseMessage.innerHTML = text;
    result.innerHTML = 'Hai raggiunto un punteggio di ben ${playerScore} punti!';
    lostGame.classList.add(losingBox);
}


// Funzione per il cambio dimensione della grid
// in base alla difficoltÃ  scelta

function gridDimension (boxContainer){
    if(easyDifficulty){

        boxContainer.classList.add('easy-width');
        boxContainer.classList.remove('medium-width');
        boxContainer.classList.remove('hard-width');
        
    }
    else if(mediumDifficulty){

        boxContainer.classList.remove('easy-width');
        boxContainer.classList.add('medium-width');
        boxContainer.classList.remove('hard-width');
        
    }
    else{ 

        boxContainer.classList.remove('easy-width');
        boxContainer.classList.remove('medium-width');
        boxContainer.classList.add('hard-width');
    }
}

// Funzione creazione box con aggiunta
// di 'if' in caso il player tocchi o meno una bomba
function boxCreator(container, index){
    const createdSquare = document.createElement('div');
    createdSquare.className = 'square';
    createdSquare.innerHTML = index;
    gridContainer.append(createdSquare);
    createdSquare.addEventListener('click', function(){
        this.classList.add('cyan');
        if ( checkBomb(bombCounter, this.value)){
            this.style.backgroundColor = 'red';
            gameOver('Peccato, ritenta!');
        } else{
            playerScore++;
        }
        if (playerScore === playerMaxTries){
            gameOver ('Ottima partita!');
    
        }
    })
}


// Funzione per generare a caso un numero
// di bombe da aggiungere alla griglia
function randomNum(min, max){
    return Math.floot(Math.random() * ((max + 1) - min)) + min
}

function randomNumBomb(minNum, maxNum, array, calc){
    while (array.lenght < 16) {
        let random = calc(minNum, maxNum);

        if (!array.includes(random)){
            array.push(random);
        }
    }
}



// Limito la dimensione della griglia creata
function maxGridDimension(maxDimension){
    for(let i = 1; i <= maxDimension; i++){
        boxCreator(gridContainer, i);
    }
}

// Creazione eventi in base alla 
// difficoltÃ  scelta
easy.addEventListener('click', function(){
    if (!easyDifficulty){
        gridContainer.innerHTML='';
        easyDifficulty = true;
        mediumDifficulty = false;
        hardDifficutly = false;
        gridDimension(gridContainer);
        maxGridDimension(easyGrid)
    }
})
medium.addEventListener('click', function(){
    if (!mediumDifficulty){
        gridContainer.innerHTML='';
        easyDifficulty = false;
        mediumDifficulty = true;
        hardDifficutly = false;
        gridDimension(gridContainer);
        maxGridDimension(mediumGrid)
    }
})
hard.addEventListener('click', function(){
    if (!hardDifficulty){
        gridContainer.innerHTML='';
        easyDifficulty = false;
        mediumDifficulty = false;
        hardDifficutly = true;
        gridDimension(gridContainer);
        maxGridDimension(hardGrid)
    }
})