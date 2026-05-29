const inputField = document.getElementById("input-field")
const listContainer = document.getElementById("list-container")
const empty = document.getElementById("empty")


function isEmpty(){
    if(listContainer.querySelectorAll('[data-li]').length === 0){
        empty.style.display = 'block'
        listContainer.style.display = 'none'
    } else{
        empty.style.display = 'none'
        listContainer.style.display = 'flex'
    }
}

function addTask(){
    if(inputField.value === ''){
        alert("Please write a task.")
    } else{
        let newItem = `
        <li class="" data-li="li">
            <div class="li-radio" data-radio="radio"></div>
            <p data-item="item">${inputField.value}</p>
            <button class="li-remove" data-remove="remove"></button>
        </li> `
        listContainer.innerHTML += newItem
        inputField.value = ''
    }
    isEmpty()
}


inputField.addEventListener("keydown", function(e){
    if(e.key === 'Enter'){
        addTask()
    }
})

listContainer.addEventListener("click", function(e){
    e.preventDefault()
    const parentLi = e.target.closest('[data-li]')

    if(e.target.dataset.remove){
        parentLi.remove()
        isEmpty()
    }

    if(e.target.dataset.item || e.target.dataset.radio){
        parentLi.querySelector(".li-radio").classList.toggle('li-radio-checked')
        parentLi.classList.toggle('li-checked')
    }
})