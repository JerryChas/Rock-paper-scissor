//*----VARIABLER----*//
const cpuName = 'Herr Dator'
const choices = ['🪨','✂️','🧻']
let okBtnState = '';
let computerChoice = generateRandomChoice();
let playerChoice ='';
let playerWin = 0;
let cpuWin = 0;
let tie = 0;
let round = 0;
let winsNeeded = 3;
let gameOver = 0;


//*-----HÄMTA ELEMENT-----*//
const plrName = document.querySelector('#player-name-input').value;
const gameResultDiv = document.querySelector('.game-result_div');
const playerName = document.querySelector('#player-name');
playerName.textContent = plrName;
const computerName = document.querySelector('#computer-name');
computerName.textContent = cpuName;
const scoreBoard = document.querySelector('.score-board');
const playerChoiceShowbox = document.querySelector('.player-choice-presents_div');
const computerChoiceShowbox = document.querySelector('.computer-choice-presents_div');

const infoText = document.querySelector('.result-info');

const okBtn = document.getElementById('confirm-btn');
const backBtn = document.getElementById('back-btn');

const rockBtn = document.getElementById('choice-btn-rock')
rockBtn.textContent = choices[0]
const scissorBtn = document.getElementById('choice-btn-scissor')
scissorBtn.textContent = choices[1]
const paperBtn = document.getElementById('choice-btn-paper')
paperBtn.textContent = choices[2]

//*----SKAPA ELEMENT----*//


//*------FUNKTIONER------*//
// Tar bort / Lägger till klass
function toggleClass(element, className) {
    console.log ('\n ------toggleClass()------')

    if (element.classList.contains(className)) {
        // Om klassen redan finns, ta bort den för att visa elementet
        element.classList.remove(className);
    } else {
        // Annars lägg till klassen för att dölja elementet
        element.classList.add(className);
    }
}

//Genererar slumpmässigt val
function generateRandomChoice() {
    console.log ('\n ------generateRandomChoice()------')

    const randomIndex = Math.floor(Math.random() * choices.length)
    return choices[randomIndex]
    
}

//Ändrar infotext
function editInfoText(string){
    console.log ('\n ------editInfoText()------')

    infoText.textContent = string
}


//Visar valen
function showSelectedChoice(choiceShowbox, choice, isPlayerChoice) {
    console.log ('\n ------showSelectedChoice()------')
    
    
    //Visar valet på skärmen
    choiceShowbox.textContent = choice;
    
    //visar valen i konsolen
    if(!isPlayerChoice){
        
        console.log(`Spelarens val:  ${choice}`)
    } else {
        console.log(`Datorns val:  ${computerChoice}`)
    }
}

//Bekräfta valet
function confirm(subject, callback) {
    console.log ('\n ------confirm()------')
    
    //Bekräftelsen skriv ut i konsolen
    console.log(`${subject}: CONFIRMED`);
    //anropar den funktion som ska köras vid bekräftelse
    callback();
}

//ready för att bekräfta
function readyToConfirm(okBtnStateValue, infoTextString) {
    console.log ('\n ------readyToConfirm()------')
    
    //Bekräftelseförfrågan i text
    editInfoText(`${infoTextString}`);
    
    //bestämmer OK-knappens läge
    okBtnState = okBtnStateValue
    console.log(`okBtnState = ${okBtnState}`)
    
}
//Nytt spel (nollar scoreboard)
function newGame() {
    console.log ('\n ------newGame()------')

    //nollställer antal rundor
    round = 0;
    //nollställer scoreboard
    playerWin = 0;
    cpuWin = 0; 
    //Uppdaterar poängtavlan
    scoreBoard.textContent = `${playerWin}  -  ${cpuWin}`
    
    //skapar ny runda
    newRound();
}
//Ny runda
function newRound(){
    console.log ('\n ------newRound()------')

    //nollställer OK-knappen
    okBtnState = '';

    //ändrar infotext
    editInfoText(`Gör ditt val`)

    //adderar 1 till antal rundor
    round++;
    
    //generar nytt val för datorn
    computerChoice = generateRandomChoice();
    
    //visar dolt val i datorns ruta. 
    //Skriver ut datorns val i konsolen
    
    showSelectedChoice(playerChoiceShowbox, '❔',false)
    showSelectedChoice(computerChoiceShowbox, '❓', true)
    
}

//spela rundan
function playRound(){
    console.log ('\n ------playRound()------')

    //Visa spelarens och datorns val
    showSelectedChoice(computerChoiceShowbox, computerChoice, true)
    showSelectedChoice(playerChoiceShowbox, playerChoice, false)
    
    
    //Utser vinnare av rundan
    console.log(`Spelar rundan med (${playerChoice}) mot (${computerChoice})`)
    winsRound(playerChoice, computerChoice);
    
    //Kontrollerar om någon har vunnit hela spelet
    checkFinalWinner()
    
    //ändrar infotext och väntar på bekräftelse
    if (gameOver === 1) {
        readyToConfirm ('newGame', 'OK - Nytt spel' )
    }else {
        readyToConfirm('newRound', 'OK - Spela nästa runda')
    }
    
}

//Vem vinner?
function winsRound(playerChoice, computerChoice) {
    console.log ('\n ------winsRound()------')


    // Alla möjliga vinnande kombinationer
    const winningCombinations = {
        '🪨': '✂️',
        '✂️': '🧻',
        '🧻': '🪨'
    };

     // Om valen är desamma, är det oavgjort
     if (playerChoice === computerChoice) {
         console.log('Oavgjort!');
         //adderar 1 till oavgjort
         tie++;
    } else if (winningCombinations[playerChoice] === computerChoice) {
        // Om spelarens val besegrar datorns val
        console.log("Du vinner!");
        //adderar 1 till vinst
        playerWin++;
    } else {
        // Annars vinner datorn
        console.log("Datorn vinner!");
        //adderar 1 till oavgjort
        cpuWin++;
    }
    //Uppdaterar poängtavlan
    scoreBoard.textContent = `${playerWin}  -  ${cpuWin}`
    
}

//Kolla vem som vunnit spelet
function checkFinalWinner() {
    console.log ('\n ------checkFinalWinner()------')
    
    
    //kollar om någon har vunnit hela spelet
    if(playerWin === winsNeeded) {
        console.log(`${plrName} har VUNNIT!`)
        gameOver = 1
    } else if (cpuWin === winsNeeded) {
        console.log(`${plrName} har FÖRLORAT!`)
        gameOver = 1
    } else {
        gameOver = 0;
    }
    
    //Om någon har vunnit hela spelet
    if(gameOver === 1){
        showFinalResult()
    }
}

function showFinalResult() {
    console.log ('\n ------showFinalResult()------')
    
    
    //visa VINNAREN i rutan
    if(playerWin === winsNeeded) {
    toggleClass(gameResultDiv, 'player-final-winner')
    } else {
        toggleClass(gameResultDiv, 'computer-final-winner')
    }
}


//!----------------------------------------!//
   //*-----------HUVUDPROGRAM-----------*//

//Ny runda startar
newRound();

// knapp för -STEN-
rockBtn.addEventListener('click',function(){ 
    if (okBtnState === '' || okBtnState === 'playRound'){
        playerChoice = choices[0];
        showSelectedChoice(playerChoiceShowbox ,'❔');
        readyToConfirm('playRound', `Tryck OK för att spela`);
    }else if (okBtnState === 'newRound'){
        console.log('choiceBtn = INAKTIV')
    }
       
})
// knapp för -SAX-
scissorBtn.addEventListener('click',function(){ 
    if (okBtnState === '' || okBtnState === 'playRound'){
        playerChoice = choices[1];
        showSelectedChoice(playerChoiceShowbox ,'❔');
        readyToConfirm('playRound',`Tryck OK för att spela`);
    }else if (okBtnState === 'newRound'){
        console.log('choiceBtn = INAKTIV')
    }
})
// knapp för -PÅSE-
paperBtn.addEventListener('click',function(){ 
    if (okBtnState === '' || okBtnState === 'playRound'){
        playerChoice = choices[2];
        showSelectedChoice(playerChoiceShowbox ,'❔');
        readyToConfirm('playRound',`Tryck OK för att spela`);
    }else if (okBtnState === 'newRound'){
        console.log('choiceBtn = INAKTIV')
    }
})

// knapp för -OK-
okBtn.addEventListener('click', function() {
    
    if(okBtnState === 'playRound'){
        // Anropa confirm-funktionen
        confirm(playerChoice, playRound)
    } else if (okBtnState === 'newRound'){
        confirm('newRound', newRound);
    } else if (okBtnState === 'newGame') {
        confirm('newGame', newGame);
    } else {
        console.log('okBtn = INAKTIV')
    }
});
    


// knapp för -Back-
