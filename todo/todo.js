const inputField = document.getElementById("input-field")
const listContainer = document.getElementById("list-container")
const empty = document.getElementById("empty")


let tasksArr = []


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
                <p data-item="item">${tasksArr[index].task}</p>
                <button class="li-remove" data-remove="remove"></button>
            </li> `
        } else{
            listContainer.innerHTML += `
            <li class="" data-li="li" data-index="${index}">
                <div class="li-radio" data-radio="radio"></div>
                <p data-item="item">${tasksArr[index].task}</p>
                <button class="li-remove" data-remove="remove"></button>
            </li> `
        }
    })

}

function addTask(){
    if(inputField.value === ''){
        alert("Please write a task.")
    } else{
        tasksArr.push({checked: false, task: inputField.value})
    }
    render()
    isEmpty()
    inputField.value = ''
}


inputField.addEventListener("keydown", function(e){
    if(e.key === 'Enter'){
        addTask()
    }
})

listContainer.addEventListener("click", function(e){
    e.preventDefault()
    const parentLi = e.target.closest('[data-li]')

    // Remove
    if(e.target.dataset.remove){
        tasksArr.splice(parentLi.dataset.index, 1)
        render()
        isEmpty()
    }

    // Check/Toggle
    if(e.target.dataset.item || e.target.dataset.radio){
        tasksArr[parentLi.dataset.index].checked = !tasksArr[parentLi.dataset.index].checked
        render()
    }
})