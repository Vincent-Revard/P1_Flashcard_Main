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

const displaySelectedCategory = () => {
    i = 0;
    listOfQuestionsInUl.innerHTML = ''
    listOfQuestionsInUl.style.display = 'none'
    buttonHolder.innerHTML = ''
    toggle()
    getFlashCardsData(`${httpURL}${sideBar.className}`)
}

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
    flashcardQuestion.name = 'cardQuestion'
    flashcardQuestion.innerText = flashcardObj.question

    const exampleButton = document.createElement('button')
    exampleButton.name = 'exampleBtn'
    exampleButton.innerText = 'Need a example? Click here!'

    const hintButton = document.createElement('button')
    hintButton.name = 'hintBtn'
    hintButton.innerText = 'Need a hint? Click here!'

    const answerText = document.createElement('p')
    answerText.name = 'answerText'
    answerText.innerText = 'Press ENTER to reveal answer'

    const nextBtn = document.createElement('button')
    nextBtn.name = 'nextCardBtn'
    nextBtn.innerText = 'NEXT CARD'

    const deleteBtn = document.createElement('button')
    deleteBtn.name = 'deleteBtn'
    deleteBtn.innerText = 'Delete this flashcard?'

    //! Manually created array of all elements created 
    flashcardArray = [flashcardQuestion, answerText, hintButton, exampleButton, nextBtn, deleteBtn]

    //! Flashcard elements helper functions
    const addFlashCardAttributes = (elements) => {
        elements.forEach(element => {
                element.setAttribute('data-id', flashcardObj.id)
                element.setAttribute('class', 'flashcardObject')
                element.setAttribute('id', `${element.name}`)
        })
}  
    //! Mass append elements to page by input array
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
            answerText.innerText = flashcardObj.answer
        }
    })

    nextBtn.addEventListener('click', triggerNextBtn) // Cycle through all data with click of next button
 
    deleteBtn.addEventListener('click', triggerDelAlertConfirm) // click event to invoke triggerDeleteBtn) 

    //! Invokes functions to append elements to webpage (flashcard) and add attributes
    addFlashCardAttributes(flashcardArray)
    massAppendToFlashcard(flashcardArray) //invoking with listed array of elements
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

//! Toggle display full flashcard question list
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
const triggerDelAlertConfirm = () => {
if(confirm('Are you sure?') === true){
    // window.alert(`"${flashcard.question}" has been deleted`) //! THIS WILL NOT WORK - GIVES UNDEFINED FOR FLASHCARD.QUESTION
    window.alert(`The selected flashcard has been deleted`)
    deleteFlashCard(flashcard.getAttribute('data-id'))
} else {
    window.alert('Cancelled Delete: You decided you can actually do this question and won\'t give up and delete it')
}
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

    const categoryIsInvalid = (sideBar.className === '')
    const formIncomplete = [addedNewFlashcard.question, addedNewFlashcard.hint, addedNewFlashcard.answer, addedNewFlashcard.example].some(value => value.trim() === '')

        if (categoryIsInvalid && formIncomplete) {
            debugger
            alert("Select a category before submitting a new flashcard!")
            alert("You must fill out all form inputs")
        } else if (formIncomplete && !categoryIsInvalid) {
            alert("You must fill out all form inputs")
            debugger
        } else if (categoryIsInvalid && !formIncomplete) {
            alert("Select a category before submitting a new flashcard!")
            debugger
        } else {
            postJSON(`${httpURL}${sideBar.className}`, addedNewFlashcard)
            .then((createdFlashcard) => {
                displayFlashcard(createdFlashcard)
                window.alert(`You have successfully added the flashcard for the question "${createdFlashcard.question}"`);
            })
            .catch(err => console.log(err))
        }
        e.target.reset()
    }

newFlashcard.addEventListener('submit', addNewFlashcardJavascript);

//!  SelectableCategory functions
const selectableCat0 = () => {
    sideBar.setAttribute('class', document.querySelector("#categories > p:nth-child(1)").innerText)
    displaySelectedCategory()
}

const selectableCat1 = () => {
    sideBar.setAttribute('class', document.querySelector("#categories > p:nth-child(2)").innerText)
    displaySelectedCategory()
}

const selectableCat2 = () => {
    sideBar.setAttribute('class', document.querySelector("#categories > p:nth-child(3)").innerText)
    displaySelectedCategory()
}

//Index Helper

const getJSON = (theUrlParam, category) => {
    return fetch(theUrlParam, category)
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
    .then(deletedFlashCard => displaySelectedCategory(deletedFlashCard))
}

displayAllSelectableCategories()