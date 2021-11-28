const{ipcRenderer} = require('electron');

// 1.createTodoBtnが押されたら、そのことをMainプロセスに伝える
document.getElementById('createTodoBtn').addEventListener('click', () => {
    ipcRenderer.send('add-todo-windows');
});
// 2.「Todoリストを更新せよ」という命令をMainプロセスから受け取り実行
const deleteTodo = e => {
    ipcRenderer.send('delete-todo', e.target.textContent);
};

ipcRenderer.on('todos', (event, todos) => {
    const todoList = document.getElementById('todoList');
    const todoItems = todos.reduce((html, todo) => {
        html += `<li class="todo-item">${todo}</li>`;
        return html;
    }, '');

    todoList.innerHTML = todoItems;

    todoList.querySelectorAll('.todo-item').forEach(item => {
        item.addEventListener('click', deleteTodo);
    });
});
