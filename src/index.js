// Global Variables
const url = 'http://localhost:3000/flashCards'
const flashcard = document.querySelector('#flashcard')
const allCards = document.querySelector('#allcards')
const newFlashcard = document.querySelector('#new-flashcard')
const submitBtn = document.querySelector('#submitbtn')
const categories = document.querySelector('#categories')
const startBtn = document.querySelector('#startbtn')

// Category Variables
const javaScript = document.createElement('p')
const html = document.createElement('p')
const css = document.createElement('p')
javaScript.innerText = 'JavaScript'
html.innerText = 'HTML'
css.innerText = 'CSS'
categories.append(javaScript, html, css)

//! Looping
let i = 0;
const triggerNextBtn = (flashcardObj) => {
    if (i < flashcardObj.length){
        displayFlashcard(flashcardObj[i]);
        i++
    }
}
//* make conditional to STOP after obj.length

//Add Codes

//! Displays ONE flashcard
//* We still need to figure out NEXT data on NEXT button click
//* Hide start button after start button activated
const displayFlashcard = (flashcardObj) => {
    //! Empties out the webpage
    flashcard.innerHTML = ''
    //! Creating elements to our flashcard
    const flashcardQuestion = document.createElement('p')
    const flashcardExample = document.createElement('p')
    const flashcardAnswer = document.createElement('p')
    const exampleButton = document.createElement('button')

    //! setting attribute and text of the buttons
    exampleButton.setAttribute('data-id', flashcardObj.id)
    exampleButton.innerText = 'hint?'
    const answerButton = document.createElement('p')
    answerButton.setAttribute('data-id', flashcardObj.id)
    answerButton.innerText = 'Press any key to reveal answer'
    const nextBtn = document.createElement('button')
    nextBtn.setAttribute('id', 'nextCardBtn')

    const selectFirstbtnH = document.querySelector(`div#flashcard > .p > button[data-id='${flashcardObj.id}']`)
    const selectSecondbtnA = document.querySelector(`div#flashcard > .p > button > button[data-id='${flashcardObj.id}']`)

    exampleButton.addEventListener('click', () => {
        exampleButton.innerText = flashcardObj.example
    })

    document.addEventListener('keydown', () => {
        answerButton.innerText = flashcardObj.answer
    })

    //! Cycle through all data with click of next button
    nextBtn.addEventListener('click', () => {
        getJSON(url)
        .then((flashcardsData => {
            triggerNextBtn(flashcardsData)
        }))
    })
    nextBtn.innerText = 'NEXT CARD'
    
    flashcardQuestion.innerText = flashcardObj.question
    flashcardExample.innerText = flashcardObj.example
    flashcardAnswer.innerText = flashcardObj.answer
    flashcard.append(flashcardQuestion, exampleButton, answerButton, nextBtn)
}

//! Triggers next button and shows next object in database


//! Triggers Start button
const handleStart = () => {
    startBtn.addEventListener('click', (e) => {
        i = 0;
        getJSON(url)
        .then((flashcardsData => {
            displayFlashcard(flashcardsData[0])
        })) 
    })
}

//* Creating the create new flashcard form


const addNewFlashcardJavascript = (e) => {
    e.preventDefault()
    
    const addedNewFlashcard = {
        question: e.target.elements['new-question'].value,
        answer: e.target.elements['new-answer'].value,
        example: e.target.elements['new-example'].value
    }
    
    postJSON(url, addedNewFlashcard)
        .then((createdFlashCard) => handleStart())
        .catch(console.error)   
    e.target.reset()
}

newFlashcard.addEventListener('submit', addNewFlashcardJavascript)


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

const postJSON = (url, data) => {
    const configObj = {
        method: 'POST',
        headers: {
                'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }
    return fetch(url, configObj)
        .then((resp) => {
            if (resp.ok) {
                return resp.json()
            } else {
                throw resp.statusText
            }
        })
}

handleStart()



