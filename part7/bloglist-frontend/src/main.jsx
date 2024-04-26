import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer  from  './reducers/notification'
import { Provider } from 'react-redux'


const store = configureStore({
    reducer: {
        notificationReducer
    }
})

console.log(store.getState())
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider  store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>
)