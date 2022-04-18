let todos = localStorage.getItem('todos');

try{
    todos = JSON.parse(todos);
    todos = todos.length? todos : null;
}catch(e){
    todos = null;
}
let list = document.querySelector('.list');
if(!todos){
    todos = [
        {content:'watching video', status: true},
        {content: 'Playing video games', status: true}
    ]
    localStorage.setItem('todos', JSON.stringify(todos))
}

function listingTodos(todos){
    list.innerHTML = '';
    todos.forEach( (todo,index) => {
        let list_item = document.createElement('div');
        list_item.className = 'list-item';
        let list_content = document.createElement('p');
        list_content.className = 'd-inline'
        list_content.textContent = todo.content;
        let deleteBtn = document.createElement('img');
        deleteBtn.src="media/delete.png";
        deleteBtn.className = 'delete'
        list_content.style.textDecoration = todo.status? 'initial' : 'line-through'
        list_item.append(list_content);
        list_item.append(deleteBtn)
        list.append(list_item)
    
        list_content.addEventListener('click', event=> {
            todos[index].status = !todos[index].status;
            localStorage.setItem('todos', JSON.stringify(todos))
            listingTodos(todos)
        })

        deleteBtn.addEventListener('click', event=> {
            todos.splice(index, 1)
            localStorage.setItem('todos', JSON.stringify(todos))
            listingTodos(todos)
        })
    })
}

let actions = document.querySelector('#actions');
Array.from(actions.children).forEach(action => {
    let form = document.querySelector('.form');
    if(action.dataset.action === 'add'){
        action.addEventListener('click' , event=> {
            form.innerHTML = `<form class="form-group">
                <input name="addtodo" class=" my-2 form-control" placeholder="add todos">
            </form>
            `;
            let formGroup = document.querySelector('.form-group');
            formGroup.addEventListener('submit', event=> {
                event.preventDefault();
                let todosContent = todos.map(todo => todo.content.toLowerCase())
                if(!todosContent.includes(formGroup.addtodo.value)){
                    todos.push({content: formGroup.addtodo.value, status: true});
                    localStorage.setItem('todos', JSON.stringify(todos));
                    listingTodos(todos)
                }else{
                    alert(`you can't add one todo two times.`)
                }
            })
        })
    }else if(action.dataset.action ==='search'){
        action.addEventListener('click', event => {
            form.innerHTML = `
                <form class="form-group">
                    <input name="searchtodo" class=" my-2 form-control id="search" placeholder="search todos">
                </form>
            `;
            let searchContent = document.querySelector('.form-group');
            searchContent.addEventListener('keyup', event=>{
                if(searchContent.searchtodo.value){
                    let filtered_todos = todos.filter(todo => 
                        todo.content.toLowerCase().includes(searchContent.searchtodo.value.toLowerCase())
                    );
                    listingTodos(filtered_todos) 
                }else{
                    listingTodos(todos)
                }
            })
        })
    }
})





listingTodos(todos);




