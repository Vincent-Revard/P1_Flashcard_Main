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



const displayFlashcard = (flashcardObj) => {
    const flashcardQuestion = document.createElement('p')
    const flashcardExample = document.createElement('p')
    const flashcardAnswer = document.createElement('p')
    flashcardQuestion.innerText = flashcardObj.question
    flashcardExample.innerText = flashcardObj.example
    flashcardAnswer.innerText = flashcardObj.answer
    flashcard.append(flashcardQuestion, flashcardExample, flashcardAnswer)
}

const nextBtn = () => {

}

const handleStart = () => {
    startBtn.addEventListener('click', (e) => {
        getJSON(url)
        .then((flashcardsData => {
            displayFlashcard(flashcardsData[0])
            flashcardsData.forEach(flashcard => nextBtn(flashcard))
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



