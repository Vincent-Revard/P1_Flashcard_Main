// Global Variables
const url = 'http://localhost:3000/'
const javascriptURL = 'http://localhost:3000/JavaScript'
const htmlURL = 'http://localhost:3000/HTML'
const cssURL = 'http://localhost:3000/CSS'
const flashcard = document.querySelector('#flashcard')
const newFlashcard = document.querySelector('#new-flashcard')
const submitBtn = document.querySelector('#submitbtn')
const categories = document.querySelector('#categories')
const sideBar = document.querySelector("#sidebar")
const selectableCategories = ['JavaScript', 'HTML', 'CSS'];



//Add Codes


const selectCategory = () => {

const javaScript = document.createElement('p')
javaScript.innerText = selectableCategories[0]
javaScript.addEventListener('click', () => {
        let currentCategory = selectableCategories[0]
        sideBar.setAttribute('class', document.querySelector("#categories > p:nth-child(1)").innerText)
        i = 0;
        flashcard.innerHTML = ''
        getJSON(`${url}${currentCategory}`)
        .then((flashcardsData => displayFlashcard(flashcardsData[0])))
        .catch(console.log)
}
)

const html = document.createElement('p')
html.innerText = selectableCategories[1]
html.addEventListener('click', () => {
    let currentCategory = selectableCategories[1]
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
css.innerText = selectableCategories[2]
css.addEventListener('click', () => {
    let currentCategory = selectableCategories[2]
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
        slicedFlashCardObj = flashcardObj.slice(1) // uses .slice(1) on the object to pull the first card out on next click
    if (i < slicedFlashCardObj.length){
        displayFlashcard(slicedFlashCardObj[i]); 
        i++
    } else {
        flashcard.innerText = 'Set complete. \n CLICK ON A CATEGORY TO SEE PREVIOUS CARDS AGAIN!'   
        //! Do we want the above or the below to happen? 
        // displayFlashcard(flashcardObj[0])
        // nextCardBtn.innerText = ('CLICK ON A CATEGORY TO SEE PREVIOUS CARDS AGAIN!') //* make conditional to STOP after obj.length
}
})
    .catch(console.log)
flashcard.innerText = 'Set complete. \n CLICK ON A CATEGORY TO SEE PREVIOUS CARDS AGAIN!'   
}




//! Displays ONE flashcard

const displayFlashcard = (flashcardObj) => {
    //! Empties out the webpage
    flashcard.innerHTML = ''
    const startText = document.querySelector('#start-text')
    startText.innerHTML = ''
    flashcard.setAttribute('data-id', flashcardObj.id)
    //! Creating elements to our flashcard
    const flashcardQuestion = document.createElement('h3')
    const flashcardHint = document.createElement('p')
    const flashcardExample = document.createElement('p')
    const flashcardAnswer = document.createElement('p')
    const exampleButton = document.createElement('button')

    //! setting attribute and text of the buttons
    exampleButton.setAttribute('data-id', flashcardObj.id)
    exampleButton.innerText = 'Need a example? Click here!'
    flashcardHint.innerText = 'Need a hint? Click here!'
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

    flashcardHint.addEventListener('click', () => {
        flashcardHint.innerText = flashcardObj.hint
    })

    document.addEventListener('keydown', () => {
        answerButton.innerText = flashcardObj.answer
    })

    //! Cycle through all data with click of next button
    nextBtn.addEventListener('click', triggerNextBtn)

    nextBtn.innerText = 'NEXT CARD'
    
    flashcardQuestion.innerText = flashcardObj.question
    flashcardHint.innerText = flashcardObj.hint
    flashcardExample.innerText = flashcardObj.example
    flashcardAnswer.innerText = flashcardObj.answer
    

    flashcard.append(flashcardQuestion, flashcardHint, exampleButton, answerButton, nextBtn)
    

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
        question: e.target.elements['new-hint'].value,
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