import html from '../core.js'
import {connect} from '../store.js'
import Header from './Header.js'
import Todos from './Todos.js'
import Footer from './Footer.js'

const connector = connect()


function App({todos}) {

    return html`
        ${Header()}
        ${todos.length > 0 && Todos()}
        ${todos.length > 0 && Footer()}
    `
}

export default connector(App) 
