const path = require('path');
const {app, ipcMain} = require('electron');
const Window = require('./Window');
const DataStore = require('./Datastore');

// ホットリロード有効化
require('electron-reload')(__dirname);

const todosData = new DataStore({name: 'Todos Main'});

app.on('ready', () => {
    let mainWindow = new Window({
        file: path.join('renderer', 'index.html'),
    });

    let addTodoWin;

    ipcMain.on('add-todo-windows', () => {
        if(!addTodoWin){
            addTodoWin = new Window({
                file: path.join('renderer', 'add.html'),
                witdh: 400,
                height: 400,
                parent: mainWindow,
            });

            addTodoWin.on('closed', () => {
                addTodoWin = null;
            })
        }
    });

    ipcMain.on('add-todo', (event, todo) => {
        const updatedTodos = todosData.addTodo(todo).todos;
        mainWindow.send('todos', updatedTodos);
    });

    ipcMain.on('delete-todo', (event, todo) => {
        const updatedTodos = todosData.deleteTodo(todo).todos;
        mainWindow.send('todos', updatedTodos);
    });
});

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit();
    }
});