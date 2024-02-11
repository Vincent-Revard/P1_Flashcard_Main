// Global Variables
const url = 'http://localhost:3000/'
const javascriptURL = 'http://localhost:3000/JavaScript'
const htmlURL = 'http://localhost:3000/HTML'
const cssURL = 'http://localhost:3000/CSS'
const flashcard = document.querySelector('#flashcard')
const allCards = document.querySelector('#allcards')
const newFlashcard = document.querySelector('#new-flashcard')
const submitBtn = document.querySelector('#submitbtn')
const categories = document.querySelector('#categories')
const startBtn = document.querySelector('#startbtn')
const sideBar = document.querySelector("#sidebar")
const selectableCategories = ['JavaScript', 'HTML', 'CSS'];



//Add Codes



const selectCategory = () => {

const javaScript = document.createElement('p')
javaScript.innerText = 'JavaScript'
javaScript.addEventListener('click', () => {
        let currentCategory = javaScript.innerText
        sideBar.setAttribute('class', document.querySelector("#categories > p:nth-child(1)").innerText)
        i = 0;
        flashcard.innerHTML = ''
        getJSON(`${url}${currentCategory}`)
        .then((flashcardsData => displayFlashcard(flashcardsData[0])))
        .catch(console.log)
}
)

const html = document.createElement('p')
html.innerText = 'HTML'
html.addEventListener('click', () => {
    let currentCategory = html.innerText
    sideBar.setAttribute('class', document.querySelector("#categories > p:nth-child(2)").innerText)
    i = 0;
    flashcard.innerHTML = ''
    getJSON(`${url}${currentCategory}`)
    .then((flashcardsData => displayFlashcard(flashcardsData[0])
    .catch(console.log)
))
}
)

const css = document.createElement('p')
css.innerText = 'CSS'
css.addEventListener('click', () => {
    let currentCategory = css.innerText
    sideBar.setAttribute('class', document.querySelector("#categories > p:nth-child(3)").innerText)
    i = 0;
    flashcard.innerHTML = ''
    getJSON(`${url}${currentCategory}`)
    .then((flashcardsData => displayFlashcard(flashcardsData[0])
    .catch(console.log)
))
}
)
categories.append(javaScript, html, css)
}


selectCategory()


//! Looping

const triggerNextBtn = () => {
    
    getJSON(`${url}${sideBar.className}`).then((flashcardObj) => { 
        
    if (i < flashcardObj.length){
        displayFlashcard(flashcardObj[i]);
        i++
        
    } else {
        
        nextCardBtn.innerText = ('CLICK START TO PLAY AGAIN!') //* make conditional to STOP after obj.length
    
}   
})
    .catch(console.log)
}




//! Displays ONE flashcard
//* We still need to figure out NEXT data on NEXT button click
//* Hide start button after start button activated
const displayFlashcard = (flashcardObj) => {
    //! Empties out the webpage
    flashcard.innerHTML = ''
    flashcard.setAttribute('data-id', flashcardObj.id)
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
    const selectCurrentFlashcardSet = document.querySelector(`div#flashcard[data-id='${flashcardObj.id}']`)

    exampleButton.addEventListener('click', () => {
        exampleButton.innerText = flashcardObj.example
    })

    document.addEventListener('keydown', () => {
        answerButton.innerText = flashcardObj.answer
    })

    //! Cycle through all data with click of next button
    nextBtn.addEventListener('click', triggerNextBtn)

    nextBtn.innerText = 'NEXT CARD'
    
    flashcardQuestion.innerText = flashcardObj.question
    flashcardExample.innerText = flashcardObj.example
    flashcardAnswer.innerText = flashcardObj.answer
    

    flashcard.append(flashcardQuestion, exampleButton, answerButton, nextBtn)
    

}

//! Triggers next button and shows next object in database



//! Triggers Start button
// const handleStart = () => {
//     startBtn.addEventListener('click', (e) => {
//         i = 0;
//         displayFlashcard(flashcardObj[0])
//         getJSON(url)
//         .then((flashcardsData => {
//             displayFlashcard(flashcardsData[0])
//         })) 
//     })
// }

//* Creating the create new flashcard form


const addNewFlashcardJavascript = (e) => {
    e.preventDefault()
    
    const addedNewFlashcard = {
        question: e.target.elements['new-question'].value,
        answer: e.target.elements['new-answer'].value,
        example: e.target.elements['new-example'].value
    }
    
    postJSON(`${url}${sideBar.className}`, addedNewFlashcard)
        .then((createdFlashCard) => triggerNextBtn())
        .catch(console.error)   
    e.target.reset()
}

newFlashcard.addEventListener('submit', addNewFlashcardJavascript)


//Index Helper

const getJSON = (url) => {
    return fetch(`${url}`)
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

// handleStart()



