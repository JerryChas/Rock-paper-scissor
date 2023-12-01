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

const btnDiv = document.querySelector('.btn_div');
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
    console.log('\n ------toggleClass()------')

    // Ta bort klassen från alla knappar med klassen 'choice-btn-activated'
    const activatedBtns = document.querySelectorAll(`.${className}`);
    activatedBtns.forEach(btn => btn.classList.remove(`${className}`));

    // Annars lägg till klassen på den klickade knappen
    element.classList.add(className);
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
    toggleClass(okBtn, 'upper-btn-activated');

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
         //startar animation
         winOrLooseAnimation('tied-round')
    } else if (winningCombinations[playerChoice] === computerChoice) {
        // Om spelarens val besegrar datorns val
        console.log("Du vinner!");
        //adderar 1 till vinst
        playerWin++;
        //startar animation
        winOrLooseAnimation('player-wins-round')
    } else {
        // Annars vinner datorn
        console.log("Datorn vinner!");
        //adderar 1 till oavgjort
        cpuWin++;
        //startar animation
        winOrLooseAnimation('computer-wins-round')
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

//Väljer vilken animation som ska köras
function winOrLooseAnimation(identifier) {
    console.log('\n ------winOrLooseAnimation()------')  

    const screenAnimation = document.querySelector('.win-or-loose');
    screenAnimation.style.animationName = identifier;
}


//!----------------------------------------!//
   //*-----------HUVUDPROGRAM-----------*//

//Ny runda startar
newRound();


btnDiv.addEventListener('click', function (event) {
    const targetBtn = event.target;
    
    // Kontrollera om klicket var på en knapp
    if (targetBtn.classList.contains('choice-btn')) {
        handleChoiceButtonClick(targetBtn);
    } else if (targetBtn === okBtn) {
        okBtn.classList.remove('upper-btn-activated')
        handleOkButtonClick();
    }
});
function handleChoiceButtonClick(clickedBtn) {
    
    if (okBtnState === '' || okBtnState === 'playRound') {
        const choiceIndex = Array.from(btnDiv.querySelectorAll('.choice-btn')).indexOf(clickedBtn);
        playerChoice = choices[choiceIndex];
        showSelectedChoice(playerChoiceShowbox, playerChoice);
        readyToConfirm('playRound', 'Tryck OK för att spela');
        toggleClass(clickedBtn, 'choice-btn-activated');
    } else if (okBtnState === 'newRound') {
        console.log('choiceBtn = INAKTIV');
    }
    
}

function handleOkButtonClick() {
    //nollställer animationen
    winOrLooseAnimation('');
    
    if (okBtnState === 'playRound') {
        confirm(playerChoice, playRound);
        // Ta bort klassen 'choice-btn-activated' från den aktuella knappen
        const activatedBtn = document.querySelector('.choice-btn-activated');
        if (activatedBtn) {
            activatedBtn.classList.remove('choice-btn-activated');
        }
    } else if (okBtnState === 'newRound') {
        confirm('newRound', newRound);
    } else if (okBtnState === 'newGame') {
        confirm('newGame', newGame);
    } else {
        console.log('okBtn = INAKTIV');
    }
}



// knapp för -Back-
