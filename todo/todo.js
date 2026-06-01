const inputField = document.getElementById("input-field")
const listContainer = document.getElementById("list-container")
const empty = document.getElementById("empty")

// The || [] acts as a safeguard for first-time visits when the key has not yet been created and so getItem would return null.
let tasksArr = JSON.parse(localStorage.getItem("tasks")) || []


function isEmpty(){
    if(listContainer.querySelectorAll('[data-li]').length === 0){
        empty.style.display = 'block'
        listContainer.style.display = 'none'
    } else{
        empty.style.display = 'none'
        listContainer.style.display = 'flex'
    }
}

function render() {
    const fragment = document.createDocumentFragment()

    tasksArr.forEach((task, index) => {
        const li = document.createElement('li')
        li.dataset.li = 'li'
        li.dataset.index = index
        li.classList.toggle('li-checked', task.checked)

        const radio = document.createElement('div')
        radio.className = 'li-radio'
        radio.dataset.radio = 'radio'
        radio.classList.toggle('li-radio-checked', task.checked)

        const p = document.createElement('p')
        p.dataset.item = 'item'
        p.textContent = task.task

        const button = document.createElement('button')
        button.className = 'li-remove'
        button.dataset.remove = 'remove'

        li.append(radio, p, button)
        fragment.appendChild(li)
    })

    listContainer.replaceChildren(fragment)
}

function save(){
    localStorage.setItem("tasks", JSON.stringify(tasksArr))
}

function addTask(){
    if(inputField.value === ''){
        alert("Please write a task.")
        return
    }

    tasksArr.push({checked: false, task: inputField.value})

    save()
    render()
    isEmpty()
    inputField.value = ''
}


render()
isEmpty()


listContainer.addEventListener("click", function(e){
    e.preventDefault()
    const parentLi = e.target.closest('[data-li]')

    // Remove
    if(e.target.dataset.remove){
        tasksArr.splice(parentLi.dataset.index, 1)
        save()
        render()
        isEmpty()
    }

    // Check/Toggle
    if(e.target.dataset.item || e.target.dataset.radio){
        tasksArr[parentLi.dataset.index].checked = !tasksArr[parentLi.dataset.index].checked
        save()
        render()
    }
})

inputField.addEventListener("keydown", function(e){
    if(e.key === 'Enter'){
        addTask()
    }
})