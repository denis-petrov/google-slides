import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import * as React from "react"
import {Provider} from "react-redux"
import {store} from "./store/store"


/*ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    document.getElementById('root')
)*/

const application = (
    <Provider store={store/*configureStore()*/}>
        <App/>
    </Provider>
)

ReactDOM.render(application, document.getElementById('root'))


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
