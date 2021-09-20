// reducer là nơi để xử lí những yêu cầu: thêm sửa xóa dữ liệu store
import storage from './util/localStorage.js';

const init = {
    todos: storage.get(),
    filter: 'all',
    filters: {
        all: todo => true,
        active: todo => !todo.completed,
        completed: todo => todo.completed
    },
    editIndex: null
}


const actions = {
    add: function ({todos}, title) {
        if(title) {
            todos.push({title, completed: false})
            storage.set(todos)
        }
    },
    toggle({todos}, index) {
        const todo = todos[index]
        todo.completed = !todo.completed
        storage.set(todos)
    },
    toggleAll({todos}, completed) {
        todos.forEach(todo => {
            todo.completed = completed
        });
    },
    destroy({ todos }, index) {
        todos.splice(index, 1)
        storage.set(todos)
    },
    swithFilter(state, type) {
        state.filter = type
        storage.set(state.todos)
    },
    clearCompleted(state) {
        state.todos = state.todos.filter(state.filters.active)
        storage.set(state.todos)
    },
    startEdit(state, index) {
        state.editIndex = index
    },
    endEdit(state, value) {
        if(state.editIndex !== null) {
            if(value.trim()) {
                state.todos[state.editIndex].title = value
                storage.set(state.todos)
            } else {
                this.destroy(state, state.editIndex)
            }
        state.editIndex = null
        }
    },
    cancel(state) {
        state.editIndex = null
    }
}
export default function reducer(state = init, action, args) {
   
    actions[action] && actions[action](state, ...args)
    return state
}