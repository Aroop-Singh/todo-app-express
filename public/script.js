// Delete button logic
function deleteTodo(index){
    todos.splice(index, 1)
    render()
}


// defining render function 
function render(){
  document.querySelector("#todos").innerHTML = ""
  for (let i=0; i<todos.length; i++){
    const element = CreateTodo(todos[i], i)
    document.querySelector("#todos").appendChild(element)
  }
}


// adding todo text to todo structure
let todos = [];
function addTodo() {
  const inputValue = document.querySelector("input").value.trim()
  const inputBox = document.querySelector("input")

  if (inputValue == ""){
    alert("Please enter a task")
    inputBox.focus()
    return 
  }
  todos.push({title: inputValue, completed: false})

  //This line below auto clear input box 
  inputBox.value = "" 
  inputBox.focus()
    
  render()
}


// Creating structure, strikethrough and Edit/sve for todos
function CreateTodo(todo, index){
  const div = document.createElement("div")
  const h4 = document.createElement("h4")
  const deleteBtn = document.createElement("button")
  const editBtn = document.createElement("button")

  // DELETE button
  deleteBtn.innerHTML = "Delete"
  deleteBtn.setAttribute("onclick", "deleteTodo(" + index + ")")
  deleteBtn.classList.add("btn-delete")

  // EDIT/SAVE toggle logic
  editBtn.innerHTML = "Edit"
  editBtn.classList.add("btn-edit")
  let isEditing = false

  editBtn.addEventListener("click", function () {
    if (!isEditing) {
      // Switch to Edit mode
      const inputEdit = document.createElement("input")
      inputEdit.type = "text"
      inputEdit.value = todo.title
      inputEdit.className = "edit-input"
      div.replaceChild(inputEdit, h4)

      editBtn.innerHTML = "Save"
      editBtn.classList.remove("btn-edit")
      editBtn.classList.add("btn-save")

      isEditing = true
    } else {
      // Save mode
      const newTitle = div.querySelector(".edit-input").value.trim()
      if (newTitle !== "") {
        todos[index].title = newTitle
      }

      editBtn.innerHTML = "Edit"
      editBtn.classList.remove("btn-save")
      editBtn.classList.add("btn-edit")

      isEditing = false
      render()
    }
  })

  // Checkbox
  const checkbox = document.createElement("input")
  checkbox.type = "checkbox"
  checkbox.checked = todo.completed || false
  checkbox.addEventListener("change", function () {
    todos[index].completed = checkbox.checked
    render()
  })

  h4.innerText = todo.title
  if (todo.completed){
    h4.style.color = "#eeeeee"
    h4.style.textDecoration = "line-through"
  }

  // Append elements
  div.append(checkbox)
  div.append(h4)
  div.append(deleteBtn)
  div.append(editBtn)
  div.className = "classTodos"

  return div
}


