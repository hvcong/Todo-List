import html from '../core.js'
import {connect} from '../store.js'

const connector = connect()

function TodoItem({todo, index, editIndex}) {
  
    return html`
        <li class="${ todo.completed && 'completed'} ${editIndex === index && 'editing'} ">
          <div class="view">
            <input
              class="toggle"
              type="checkbox"
              ${ todo.completed && 'checked'}
              onclick = "dispatch('toggle',${index})"
            >
            <label ondblclick = "dispatch('startEdit',${index})" >${ todo.title }</label>
            <button 
              class="destroy"
              onclick = "dispatch('destroy',${index})"
            ></button>
          </div>
          <input 
            class="edit" 
            value="${todo.title}"
            onkeyup = "event.keyCode === 13 && dispatch('endEdit', this.value) || event.keyCode === 27 && dispatch('cancel')"
            onblur = "dispatch('endEdit', this.value)"
            autofocus
            >
        </li>
    `
}

export default connector(TodoItem) 
