import React from 'react'
import ReactDOM from 'react-dom'
import App from './app.jsx'
import { Provider } from 'react-redux'
import store from './store'
import './app.scss'

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app-container')
)