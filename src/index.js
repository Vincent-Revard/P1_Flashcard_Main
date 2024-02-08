// Global Variables
const url = 'http://localhost:3000/flashCards'
const flashcard = document.querySelector('#flashcard')
const allCards = document.querySelector('#allcards')
const newFlashcard = document.querySelector('#new-flashcard')
const nextBtn = document.querySelector('#nextbtn')


//Add Codes

const displayFlashcard = () => {

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
            flashcardsData.forEach((flashcard) => displayFlashcard(flashcard))
        }))
}

