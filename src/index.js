// Global Variables
const url = 'http://localhost:3000/flashCards'
const flashcard = document.querySelector('#flashcard')
const allCards = document.querySelector('#allcards')
const newFlashcard = document.querySelector('#new-flashcard')
const submitBtn = document.querySelector('#submitbtn')
const categories = document.querySelector('#categories')
const startBtn = document.querySelector('#startbtn')




//Add Codes

const javaScript = document.createElement('p')
javaScript.innerText = 'JavaScript'
const html = document.createElement('p')
html.innerText = 'HTML'
const css = document.createElement('p')
css.innerText = 'CSS'
categories.append(javaScript, html, css)


//! Displays ONE flashcard
//* We still need to figure out NEXT data on NEXT button click
//* Hide start button after start button activated
const displayFlashcard = (flashcardObj) => {
    flashcard.innerHTML = ''
    const flashcardQuestion = document.createElement('p')
    const flashcardExample = document.createElement('p')
    const flashcardAnswer = document.createElement('p')
    const nextBtn = document.createElement('button')
    nextBtn.setAttribute('id', 'nextCardBtn')
    nextBtn.addEventListener('click', () => {
        
    })
    nextBtn.innerText = 'NEXT CARD'
    
    flashcardQuestion.innerText = flashcardObj.question
    flashcardExample.innerText = flashcardObj.example
    flashcardAnswer.innerText = flashcardObj.answer
    flashcard.append(flashcardQuestion, flashcardExample, flashcardAnswer,nextBtn)
}

//! Triggers next button and shows next object in database
//* Display different card
const triggerNextBtn = (flashcardObj) => {
    let i = 0;
    if(i < 0) i = flashcardObj.length;
    i++;
    displayFlashcard(flashcardObj);
    }

//! Triggers Start button
const handleStart = () => {
    startBtn.addEventListener('click', (e) => {
        getJSON(url)
        .then((flashcardsData => {
            displayFlashcard(flashcardsData[0])
            triggerNextBtn(flashcardsData)
            // flashcardsData.forEach(flashcard => triggerNextBtn(flashcard))
        })) 
    })
}

//Index Helper

const getJSON = (url) => {
    return fetch(url)
    .then((resp) => {
        if(resp.ok){
            return resp.json()
        } else{
            throw resp.statusText
        }
    })
}

handleStart()



