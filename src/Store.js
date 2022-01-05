import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { TestReducer } from './reducers/Test/TestReducer'


const reducer = combineReducers({
    test: TestReducer,

})



let initialState = {
    
  };

const middleware = [thunk]

const Store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default Store;

