// Global Variables
const httpURL = 'http://localhost:3000/'
const flashcard = document.querySelector('#flashcard')
const newFlashcard = document.querySelector('#new-flashcard')
const submitBtn = document.querySelector('#submitbtn')
const categories = document.querySelector('#categories')
const sideBar = document.querySelector("#sidebar")
const buttonHolder = document.querySelector('#button-holder')
const listOfQuestionsInUl = document.querySelector('#list-of-questions')
const startTextH3 = document.querySelector('#start-text')
const selectableCategories = ['JavaScript', 'HTML', 'CSS']

const createCategoryElement = () => {
    categories.innerHTML = ''
    categories.innerText = ('Other Categories:')
    selectableCategories.forEach(categoryText => {
        const newP = document.createElement('p')
        newP.innerText = categoryText
        categories.appendChild(newP)
        newP.addEventListener('click', assignSideBarCategoryClassName)
    })
    i = 0;
}

const assignSideBarCategoryClassName = (e) => {
    const clickedCategory = e.target.innerText
    sideBar.className = clickedCategory
    listOfQuestionsInUl.innerHTML = ''
    listOfQuestionsInUl.style.display = 'none'
    buttonHolder.innerHTML = ''
    toggle()
    getJSON(`${httpURL}${sideBar.className}`)
    .then((flashcardsData) => {
        displayFlashcard(flashcardsData[0])
        flashcardsData.forEach(flashcardData => displayAllQuestions(flashcardData)) 
    })
    .catch(console.log)
}

//! Displays ONE flashcard
const displayFlashcard = (flashcardObj) => {
    //! Empties out the webpage
    flashcard.innerHTML = ''
    startTextH3.innerHTML = ''
    flashcard.setAttribute('data-id', flashcardObj.id)

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

    document.addEventListener('keydown', (e) => {
        if(e.key === 'Enter'){
            answerText.innerText = flashcardObj.answer
        }
    })

    nextBtn.addEventListener('click', triggerNextBtn) // Cycle through all data with click of next button
 
    deleteBtn.addEventListener('click', () => triggerDelAlertConfirm(flashcardObj)) // click event to invoke triggerDeleteBtn) 

    //! Invokes functions to append elements to webpage (flashcard) and add attributes
    addFlashCardAttributes(flashcardArray) //invoking with listed array of elements
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
        let slicedFlashCardObj = flashcardObj.slice(1) // uses .slice(1) on the object to pull the first card out on next click
        if (i < slicedFlashCardObj.length) {
            displayFlashcard(slicedFlashCardObj[i])
            i++
        }
        else {
            flashcard.innerText = '\n Set complete. \n \n CLICK ON A CATEGORY TO SEE PREVIOUS CARDS AGAIN!'
            showConfetti()
            i = 0
        }
    })
        .catch(console.log)
}

const triggerDelAlertConfirm = (flashcard) => {
if(confirm('Are you sure?') === true){
    window.alert(`"${flashcard.question}" has been deleted`) //! THIS WILL NOT WORK - GIVES UNDEFINED FOR FLASHCARD.QUESTION
    // window.alert(`The selected flashcard has been deleted`)
    
    deleteFlashCard(flashcard.id)
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
            
            alert("Select a category before submitting a new flashcard and you must fill out all form inputs")
        } else if (formIncomplete) {
            alert("You must fill out all form inputs")
            
        } else if (categoryIsInvalid) {
            alert("Select a category before submitting a new flashcard!")
            
        } else {
            postJSON(`${httpURL}${sideBar.className}`, addedNewFlashcard)
            .then((createdFlashcard) => {
                displayFlashcard(createdFlashcard)
                window.alert(`You have successfully added the flashcard for the question "${createdFlashcard.question}"`)
                //! optimistically post updated card to all displayed questions 
                const li = document.createElement('li')
                li.className = 'card-list';
                li.setAttribute('data-id', createdFlashcard.id);
                li.textContent = createdFlashcard.question;
                listOfQuestionsInUl.appendChild(li);
            })
            .catch(err => console.log(err))
        }
        e.target.reset()
    }

newFlashcard.addEventListener('submit', addNewFlashcardJavascript)

//Index Helper

const getJSON = (url, category) => {
    return fetch(url, category)
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

const deleteFlashCard = (id) => {
    fetch(`${httpURL}${sideBar.className}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(() => {
        getJSON(`${httpURL}${sideBar.className}`)
        .then((flashcardsData) => {
            displayFlashcard(flashcardsData[0])
            let listItemToRemove = (document.querySelector(`[data-id="${id}"]`))
            listOfQuestionsInUl.removeChild(listItemToRemove)
        })
        .catch(console.log)
    })
}

createCategoryElement()