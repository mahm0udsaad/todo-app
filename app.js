const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
let arr =[]
let id = 3;
// Apply dark mode style on page load
document.body.classList.add('dark-mode');
const showTodos = () => {
    // Clear the existing taskList
    taskList.innerHTML = '';
  
    const localArr = localStorage.getItem('arr'); // Corrected line
    arr = JSON.parse(localArr) || [];
  
    arr.map((item) => {
      const li = document.createElement('li');
      const input = document.createElement('input');
      const deletBtn = document.createElement('button');
      const time = document.createElement('span');
      input.value = item.text;
      time.innerHTML=`${item.time}`
      deletBtn.innerHTML='&#x2716';
      deletBtn.className = 'delete-btn';
      li.appendChild(time),li.appendChild(input) , li.appendChild(deletBtn)
      taskList.appendChild(li);

      input.addEventListener('input',(e)=>{
          item.text = e.target.value
        })
        deletBtn.addEventListener('click',()=>deleteTask(item.id))
    });
};
window.onload = function(){
    showTodos()
}
const deleteTask=(id)=>{
    arr = arr.filter((item) => item.id !== id )
    const localArr = JSON.stringify(arr)
    localStorage.setItem('arr',localArr)
    showTodos()
}   
const addTask=()=>{
    const now = new Date()
    const taskText = taskInput.value.trim();
    if(taskText !== ''){
        arr.unshift({id:id++,text: taskText ,time:`${now.getHours()}:${now.getMinutes()}`})
        taskInput.value = '';
        const localArr = JSON.stringify(arr)
        localStorage.setItem('arr',localArr)
        showTodos()
    } else{
        alert('input is empty')
    }
}
taskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      // Call addTask() when the Enter key (key code 13) is pressed
      addTask();
    }
  });
// const input = document.createElement('input');
// input.value = item.text;
// deletBtn.className = 'delete-btn'
// deletBtn.innerHTML = 'Delete'

// li.appendChild(input)
// li.appendChild(deletBtn)