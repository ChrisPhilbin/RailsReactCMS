import React from "react";
import Routes from "../routes/Index";
import { render } from "react-dom";

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './reducers/Index'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)))

const App = (props) => (

        <div>
            <Provider store={store}>
                <Routes user_id={props.user_id}/>
            </Provider>
        </div>
    )

export default App