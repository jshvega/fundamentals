const inputField = document.getElementById("input-field")
const listContainer = document.getElementById("list-container")
const empty = document.getElementById("empty")

// Populating tasksArr from localStorage on every page load. This one-liner works becuase || [] acts as a safeguard for first-time visits when the key has not yet been created and so getItem would return null.
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

function render(){

    listContainer.innerHTML = ''

    tasksArr.forEach((task, index) => {
        if(task.checked){
            listContainer.innerHTML += `
            <li class="li-checked" data-li="li" data-index="${index}">
                <div class="li-radio li-radio-checked" data-radio="radio"></div>
                <p data-item="item">${task.task}</p>
                <button class="li-remove" data-remove="remove"></button>
            </li> `
        } else{
            listContainer.innerHTML += `
            <li class="" data-li="li" data-index="${index}">
                <div class="li-radio" data-radio="radio"></div>
                <p data-item="item">${task.task}</p>
                <button class="li-remove" data-remove="remove"></button>
            </li> `
        }
    })

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