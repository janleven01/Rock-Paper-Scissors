class rpsGame{
    constructor(){
       
    }
    makeSelection(selection){
        const botSelection = this.randomSelection()
        const botWin = this.isWinner(selection, botSelection)
        const yourWin = this.isWinner(botSelection, selection)
    
        this.addSelectionResult(botSelection, botWin)
        this.addSelectionResult(selection, yourWin)
    
        if (yourWin) this.incrementScore(yourScore) 
        if (botWin) this.incrementScore(botScore)
        
        this.gameWinner(yourScore, botScore)
    }

    randomSelection(){
        const randomIndex = Math.floor(Math.random() * selections.length)
        return selections[randomIndex]
    }

    addSelectionResult (selection, winner){
        const div = document.createElement('div')
        div.innerHTML = selection.emoji
        div.classList.add('result-selection')
        if (winner) div.classList.add('winner')
        finalColumn.after(div)
       
    }

    isWinner(selection, botSelection){
        return selection.defeat === botSelection.type
    }

    incrementScore(score){
        score.innerText = parseInt(score.innerText) + 1
    }

    checkStart(){
        starterText.style.display = "none";
        showAfter.style.display = "grid"
        
    }

    gameWinner(yourScore, botScore){
        const maxScore = 5
        if (yourScore.innerText === `${maxScore}`){
            alert('You are the winner!')
        } else if (botScore.innerText === `${maxScore}`){
            alert('You lose')  
        } else return
        this.resetGame()
    }

    resetGame(){
        const resultSelectionDivs = document.querySelectorAll('.result-selection');
        resultSelectionDivs.forEach(div => {
            while (div.firstChild) {
                div.removeChild(div.firstChild);
            }
        });
        yourScore.innerText = 0;
        botScore.innerText = 0;
        starterText.style.display = "block";
        showAfter.style.display = "none"
    }

}

//DOM Elements

const gameButtons = document.querySelectorAll('[data-selection]')
const gameRPS = new rpsGame()
const finalColumn = document.querySelector('.beforeDiv')
const yourScore = document.getElementById('yourScore')
const botScore = document.getElementById('botScore')
const showAfter = document.querySelector('.display')
const starterText = document.getElementById('starterText')
const selections = [
    {
        type: "rock",
        emoji: "✊",
        defeat: "paper"
    },
    {
        type: "paper",
        emoji: "✋",
        defeat: "scissors"
    },
    {
        type: "scissors",
        emoji: "✌️",
        defeat: "rock"
    }
]

showAfter.style.display = "none"

gameButtons.forEach(button => {
    button.addEventListener('click', () =>{
        gameRPS.checkStart()
        const selectionName = button.dataset.selection
        const selection = selections.find(i => i.type === selectionName)
        gameRPS.makeSelection(selection)
    })
})