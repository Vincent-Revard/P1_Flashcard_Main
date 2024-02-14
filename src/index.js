// Global Variables
const httpURL = 'http://localhost:3000/'
const javascriptURL = 'http://localhost:3000/JavaScript'
const htmlURL = 'http://localhost:3000/HTML'
const cssURL = 'http://localhost:3000/CSS'
const flashcard = document.querySelector('#flashcard')
const newFlashcard = document.querySelector('#new-flashcard')
const submitBtn = document.querySelector('#submitbtn')
const categories = document.querySelector('#categories')
const sideBar = document.querySelector("#sidebar")
const buttonHolder = document.querySelector('#button-holder')
const listOfQuestionsInUl = document.querySelector('#list-of-questions')
const selectableCategories = ['JavaScript', 'HTML', 'CSS']

const displayAllSelectableCategories = () => {

    const javaScript = document.createElement('p')
    javaScript.innerText = selectableCategories[0]
    const html = document.createElement('p')
    html.innerText = selectableCategories[1]
    const css = document.createElement('p')
    css.innerText = selectableCategories[2]

//! Invoking by pressing on categories to start the application
    javaScript.addEventListener('click', selectableCat0)
    html.addEventListener('click', selectableCat1)
    css.addEventListener('click', selectableCat2)

    categories.append(javaScript, html, css)
}


//! build selectableCategory functions
    const selectableCat0 = () => {
        sideBar.setAttribute('class', document.querySelector("#categories > p:nth-child(1)").innerText)
        i = 0;
        listOfQuestionsInUl.innerHTML = ''
        listOfQuestionsInUl.style.display = 'none'
        buttonHolder.innerHTML = ''
        toggle()
        getFlashCardsData(`${httpURL}${sideBar.className}`)
    }

    const selectableCat1 = () => {
        sideBar.setAttribute('class', document.querySelector("#categories > p:nth-child(2)").innerText)
        i = 0;
        listOfQuestionsInUl.innerHTML = ''
        listOfQuestionsInUl.style.display = 'none'
        buttonHolder.innerHTML = ''
        toggle()
        getFlashCardsData(`${httpURL}${sideBar.className}`)
    }

    const selectableCat2 = () => {
        sideBar.setAttribute('class', document.querySelector("#categories > p:nth-child(3)").innerText)
        i = 0;
        listOfQuestionsInUl.innerHTML = ''
        listOfQuestionsInUl.style.display = 'none'
        buttonHolder.innerHTML = ''
        toggle()
        getFlashCardsData(`${httpURL}${sideBar.className}`)
    }


const toggle = () => {
    listOfQuestionsInUl.innerHTML = ' '
    const toggleBtn = document.createElement('button')
    toggleBtn.setAttribute('id', 'display-questions')
    toggleBtn.innerText = 'Display List of Questions'


    toggleBtn.addEventListener('click', () => {
        let target = listOfQuestionsInUl
        if(target.style.display === 'block'){
            target.style.display = 'none';
        }
        else {
            target.style.display = 'block'
        }
    })

    buttonHolder.append(toggleBtn)
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

    getJSON(`${httpURL}${sideBar.className}`).then((flashcardObj) => {
        slicedFlashCardObj = flashcardObj.slice(1) // uses .slice(1) on the object to pull the first card out on next click
        if (i < slicedFlashCardObj.length) {
            displayFlashcard(slicedFlashCardObj[i])
            i++
        } 
        else {
            flashcard.innerText = '\n Set complete. \n \n CLICK ON A CATEGORY TO SEE PREVIOUS CARDS AGAIN!'
            showConfetti()
            flashcard.setAttribute('data-id', 'N/A')
        }
    })
        .catch(console.log)
}

const triggerDeleteBtn = () => deleteFlashCard(flashcard.getAttribute('data-id')) // higher order function to invoke delete json request


//! Displays ONE flashcard

const displayFlashcard = (flashcardObj) => {
    //! Empties out the webpage
    flashcard.innerHTML = ''
    flashcard.setAttribute('data-id', flashcardObj.id)
    const startText = document.querySelector('#start-text')
    startText.innerHTML = ''

    //! Creating elements to our flashcard
    //! setting attribute and text of the buttons
    const flashcardQuestion = document.createElement('h3')
    flashcardQuestion.innerText = flashcardObj.question

    const exampleButton = document.createElement('button')
    exampleButton.setAttribute('id', 'exampleBtn')
    exampleButton.innerText = 'Need a example? Click here!'

    const hintButton = document.createElement('button')
    hintButton.innerText = 'Need a hint? Click here!'
    hintButton.setAttribute('id', 'hintBtn')

    const answerButton = document.createElement('p')
    answerButton.setAttribute('id', 'answerBtn')
    answerButton.innerText = 'Press ENTER to reveal answer'

    const nextBtn = document.createElement('button')
    nextBtn.setAttribute('id', 'nextCardBtn')

    const deleteBtn = document.createElement('button')
    deleteBtn.setAttribute('id', 'deleteBtn')
    deleteBtn.innerText = 'Delete this flashcard?'

    flashcardArray = [flashcardQuestion, answerButton, hintButton, exampleButton, nextBtn, deleteBtn]

    //! Flashcard elements helper functions

    const addFlashCardAttributes = (elements) => {
        elements.forEach(element => {
                element.setAttribute('data-id', flashcardObj.id)
                element.setAttribute('class', 'flashcardBtn')
        })
}  

    const massAppendToFlashcard = (elements) => {
        elements.forEach(element => flashcard.append(element))
}

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

    nextBtn.addEventListener('click', triggerNextBtn) // Cycle through all data with click of next button
    nextBtn.innerText = 'NEXT CARD'
 
    deleteBtn.addEventListener('click', triggerDeleteBtn) // click event to invoke triggerDeleteBtn) 

    //! Appends mass appends elements to webpage (flashcard) and add attributes
    addFlashCardAttributes(flashcardArray)
    massAppendToFlashcard(flashcardArray) //invoking with listed array of elements
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

    postJSON(`${httpURL}${sideBar.className}`, addedNewFlashcard)
        .then((createdFlashCard) => {
            displayFlashcard(createdFlashCard)
        })
    e.target.reset()
}

newFlashcard.addEventListener('submit', addNewFlashcardJavascript)


//Index Helper

const getJSON = (theurl, category) => {
    return fetch(theurl, category)
        .then((resp) => {
            if (resp.ok) {
                return resp.json()
            } else {
                throw resp.statusText
            }
        })
}

//! function will simplify selectCategory functions
const getFlashCardsData = () => {
    getJSON(`${httpURL}${sideBar.className}`)
        .then((flashcardsData) => {
            displayFlashcard(flashcardsData[0])
            flashcardsData.forEach(flashcardData => displayAllQuestions(flashcardData)) 
    })
        .catch(console.log)
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

const deleteFlashCard = (id) => {
    fetch(`${httpURL}${sideBar.className}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(deletedFlashCard => flashcard.innerText = console.log(deletedFlashCard))
}

displayAllSelectableCategories()