// Global Variables
const url = 'http://localhost:3000/flashCards'
const flashcard = document.querySelector('#flashcard')
const allCards = document.querySelector('#allcards')
const newFlashcard = document.querySelector('#new-flashcard')
const nextBtn = document.querySelector('#nextbtn')
const categories = document.querySelector('#categories')



//Add Codes

const handleClick = () => {
    console.log("I've been clicked")
}

const displayFlashcard = (flashcardObj) => {
    const flashcardInfo = document.createElement('li')
    flashcardInfo.innerText = flashcardObj.question
    flashcardInfo.addEventListener('click', (e) => handleClick(flashcardObj))
    flashcard.append(flashcardInfo)
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

const getFlashcards = () => {
    getJSON(url)
    .then((flashcardsData => {
        // handleClick(flashcardsData[0])
        flashcardsData.forEach((flashcard) => displayFlashcard(flashcard))
    }))
}

getFlashcards()


