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
const allCards = document.querySelector('#all-cards')
const listOfQuestionsInUl = document.querySelector('#list-of-questions')
const selectableCategories = ['JavaScript', 'HTML', 'CSS'];



//Add Codes
const displayAllSelectableCategories = () => {

//! Invoking by pressing on categories to start the application
    const javaScript = document.createElement('p')
    javaScript.innerText = selectableCategories[0]
    javaScript.addEventListener('click', () => {
        let currentCategory = selectableCategories[0]
        sideBar.setAttribute('class', document.querySelector("#categories > p:nth-child(1)").innerText)
        i = 0;
        listOfQuestionsInUl.innerHTML = ''
        listOfQuestionsInUl.innerText = 'List of Questions'
        getJSON(`${url}${currentCategory}`)
        .then((flashcardsData => {
            displayFlashcard(flashcardsData[0])
            flashcardsData.forEach(flashcardData => displayAllQuestions(flashcardData)) 
            }
        ))
        .catch(console.log)
}
)

    const html = document.createElement('p')
    html.innerText = selectableCategories[1]
    html.addEventListener('click', () => {
        let currentCategory = selectableCategories[1]
        sideBar.setAttribute('class', document.querySelector("#categories > p:nth-child(2)").innerText)
        i = 0;
        listOfQuestionsInUl.innerHTML = ''
        listOfQuestionsInUl.innerText = 'List of Questions'
        getJSON(`${url}${currentCategory}`)
        .then((flashcardsData => {
            displayFlashcard(flashcardsData[0])
            flashcardsData.forEach(flashcardData => displayAllQuestions(flashcardData))
            }
        ))
        .catch(console.log)
}
)

    const css = document.createElement('p')
    css.innerText = selectableCategories[2]
    css.addEventListener('click', () => {
        let currentCategory = selectableCategories[2]
        sideBar.setAttribute('class', document.querySelector("#categories > p:nth-child(3)").innerText)
        i = 0;
        listOfQuestionsInUl.innerHTML = ''
        listOfQuestionsInUl.innerText = 'List of Questions'
        getJSON(`${url}${currentCategory}`)
            .then((flashcardsData => {
                displayFlashcard(flashcardsData[0])
                flashcardsData.forEach(flashcardData => displayAllQuestions(flashcardData)) 
                }
            ))
            .catch(console.log)
    }
)

categories.append(javaScript, html, css)
}

//! Displays all questions using forEach() for clicked category
const displayAllQuestions = (flashcardObj) => {
    const li = document.createElement('li')
    li.className = 'card-list'
    li.setAttribute('data-id', flashcardObj.id)
    
    const h5 = document.createElement('h5')
    h5.innerText = flashcardObj.question
    
    listOfQuestionsInUl.append(li)
    li.append(h5)
}

const showConfetti = () => {
    const canvas = document.createElement('canvas')
    canvas.setAttribute('id', 'confetti')
    const confettiButton = document.createElement('button')
    confettiButton.innerText = 'Celebrate your achievement!!'
    confettiButton.setAttribute('id', 'confetti-button')
    confettiButton.setAttribute('class', 'button-53')

    const jsConfetti = new JSConfetti()

    confettiButton.addEventListener('click', () => {
        jsConfetti.addConfetti({
            emojis: ['💯', '⚡️', '💥', '✨', '💫', '✅'],
        }).then(() => jsConfetti.addConfetti())
    })

    flashcard.append(canvas, confettiButton)
}

//! Looping & callback 

const triggerNextBtn = () => {

    getJSON(`${url}${sideBar.className}`).then((flashcardObj) => {
        slicedFlashCardObj = flashcardObj.slice(1) // uses .slice(1) on the object to pull the first card out on next click
        if (i < slicedFlashCardObj.length) {
            displayFlashcard(slicedFlashCardObj[i])
            i++
        } 
        // else if(i >= slicedFlashCardObj.length - 1){
        //     displayFlashcard(slicedFlashCardObj[i])
        //     nextBtn.remove()
        //     const finalBtn = createElement('button')
        //     finalBtn.innerText = 'LAST CARD'
        //     finalBtn.addEventListener('click', showConfetti())
        //     flashcard.append(finalBtn)
        // } 
        else {
            flashcard.innerText = 'Set complete. \n CLICK ON A CATEGORY TO SEE PREVIOUS CARDS AGAIN!'
            showConfetti()
        }
    })
        .catch(console.log)
}




//! Displays ONE flashcard

const displayFlashcard = (flashcardObj) => {
    //! Empties out the webpage
    flashcard.innerHTML = ''
    const startText = document.querySelector('#start-text')
    startText.innerHTML = ''

    //! Creating elements to our flashcard
    const flashcardQuestion = document.createElement('h3')
    const exampleButton = document.createElement('button')

    //! setting attribute and text of the buttons
    exampleButton.setAttribute('data-id', flashcardObj.id)
    exampleButton.setAttribute('id', 'exampleBtn')
    exampleButton.innerText = 'Need a example? Click here!'
    const hintButton = document.createElement('button')
    hintButton.innerText = 'Need a hint? Click here!'
    hintButton.setAttribute('data-id', flashcardObj.id)
    hintButton.setAttribute('id', 'hintBtn')
    const answerButton = document.createElement('p')
    answerButton.setAttribute('data-id', flashcardObj.id)
    answerButton.setAttribute('id', 'answerBtn')
    answerButton.innerText = 'Press ENTER to reveal answer'
    const nextBtn = document.createElement('button')
    nextBtn.setAttribute('id', 'nextCardBtn')

    //! Will be used for delete button in the future. Not for the current project
    // const selectFirstbtnH = document.querySelector(`div#flashcard > .p > button[data-id='${flashcardObj.id}']`)
    // const selectSecondbtnA = document.querySelector(`div#flashcard > .p > button > button[data-id='${flashcardObj.id}']`)
    // const selectCurrentFlashcardSet = document.querySelector(`div#flashcard[data-id='${flashcardObj.id}']`)

    //! EventListeners
    exampleButton.addEventListener('click', () => {
        exampleButton.innerText = flashcardObj.example
    })

    hintButton.addEventListener('click', () => {
        hintButton.innerText = flashcardObj.hint
    })

    document.addEventListener('keydown', () => {
        if(event.key === 'Enter'){
            answerButton.innerText = flashcardObj.answer
        }
    })

    //! Cycle through all data with click of next button
    nextBtn.addEventListener('click', triggerNextBtn)
    nextBtn.innerText = 'NEXT CARD'

    //! Appends information to webpage (flashcard)
    flashcardQuestion.innerText = flashcardObj.question
    flashcard.append(flashcardQuestion, answerButton, hintButton, exampleButton, nextBtn)


}



//! Creating the create new flashcard form
const addNewFlashcardJavascript = (e) => {
    e.preventDefault()

    const addedNewFlashcard = {
        question: e.target.elements['new-question'].value,
        hint: e.target.elements['new-hint'].value,
        answer: e.target.elements['new-answer'].value,
        example: e.target.elements['new-example'].value
    }

    postJSON(`${url}${sideBar.className}`, addedNewFlashcard)
        .then((createdFlashCard) => {
            displayFlashcard(createdFlashCard)
        })
    e.target.reset()
}

newFlashcard.addEventListener('submit', addNewFlashcardJavascript)


//Index Helper

const getJSON = (url) => {
    return fetch(`${url}`)
        .then((resp) => {
            if (resp.ok) {
                return resp.json()
            } else {
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

displayAllSelectableCategories()