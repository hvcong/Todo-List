const KEY = 'TODOS'

export default {
    get() {
        return JSON.parse(localStorage.getItem(KEY)) || []
    },
    set(todo) {
        localStorage.setItem(KEY,JSON.stringify(todo))
    }
}