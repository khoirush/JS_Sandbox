// app : task list
// author : Khoirush Akbar

// define ui vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clrBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task')

// laod all event listeners

loadEventListeners();

function loadEventListeners() {
  //load task event
  loadTaskFromLocalStorage()

  //add task event
  form.addEventListener('submit', addTask)

  //delete task event
  taskList.addEventListener('click', removeTask)

  // clear task event
  clrBtn.addEventListener('click', clearTask)

  // filter task event
  filter.addEventListener('keyup', filterTask)

}

function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task first')
  } else {
    // create li element
    const li = document.createElement('li')
    li.className = 'collection-item'
    li.appendChild(document.createTextNode(taskInput.value))
    const link = document.createElement('a')
    link.className = 'delete-item secondary-content'
    link.setAttribute('href', '#')
    link.innerHTML = '<i class="fa fa-remove"> </i>'
    li.appendChild(link)
    console.log(li)
    //append li to ul
    taskList.appendChild(li)

    // store in Local Storage
    storeTaskInLocalStorage(taskInput.value)

    //clear input
    taskInput.value = ''
    e.preventDefault()
  }

}

function removeTask(e) {
  let task = e.target.parentElement.parentElement.textContent.trim()
  if (e.target.parentElement.classList.contains('delete-item')) {
    e.target.parentElement.parentElement.remove()
  }
  let task_obj = JSON.parse(localStorage.getItem('tasks'))

  //remove object
  if (task_obj != null) {
    idx_task = task_obj.indexOf(String(task))
    console.log(`${task} idx = ${idx_task}`)
    task_obj.splice(idx_task, 1)
    localStorage.setItem('tasks', JSON.stringify(task_obj))
  }

  // console.log('after remove : ', task_obj)
  e.preventDefault()
}

function clearTask(e) {
  // taskList.innerHTML = ''
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild)
  }
  let task_obj = JSON.parse(localStorage.getItem('tasks'))

  //remove object
  if (task_obj != null) {
    task_obj = []
    localStorage.setItem('tasks', JSON.stringify(task_obj))
  }
  e.preventDefault()
}

function filterTask(e) {
  const filter_text = e.target.value.toLowerCase()

  document.querySelectorAll('.collection-item').forEach(task => {
    const item = task.firstChild.textContent
    if (item.toLowerCase().indexOf(filter_text) != -1) {
      task.style.display = 'block'
    } else {
      task.style.display = 'none'
    }
  })
}

function storeTaskInLocalStorage(task_value) {
  let task_obj
  if (localStorage.getItem('tasks') === null) {
    task_obj = []
  } else {
    task_obj = JSON.parse(localStorage.getItem('tasks'))
  }
  task_obj.push(task_value)
  localStorage.setItem('tasks', JSON.stringify(task_obj))
}

function loadTaskFromLocalStorage() {
  // create li element
  let task_obj = JSON.parse(localStorage.getItem('tasks'))
  if (task_obj != null) {
    console.log(task_obj)
    task_obj.forEach(task => {
      const li = document.createElement('li')
      li.className = 'collection-item'
      li.appendChild(document.createTextNode(task))
      const link = document.createElement('a')
      link.className = 'delete-item secondary-content'
      link.setAttribute('href', '#')
      link.innerHTML = '<i class="fa fa-remove"> </i>'
      li.appendChild(link)
      taskList.appendChild(li)
    })


    //append li to ul

  }

}