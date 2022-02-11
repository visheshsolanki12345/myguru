import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { TestReducer } from './reducers/Test/TestReducer'
import { userCarrerReducer, userCarrerPageReducer } from './reducers/carrer/user/CarrerReducer'
import { allArticleReducer, singleArticleReducer } from './reducers/carrer/user/ArticleReducer'
import { allVideoReducer, singleVideoReducer } from './reducers/carrer/user/VideoCarrerReducer'
import { allCounsellorReducer, singleCounsellorReducer } from './reducers/carrer/user/CounsellorReducer'
import { allSlotReducer } from './reducers/carrer/user/SlotBookingReducer'
import { allStudentDataReducer } from './reducers/StudentDashBoard/GetAllStudentDataReducer'
import { userReducer } from './reducers/Authentication/UserReducer'

const reducer = combineReducers({
    test: TestReducer,
    userCarrer : userCarrerReducer,
    userCarrerPage : userCarrerPageReducer,
    allArticle : allArticleReducer,
    singleArticle : singleArticleReducer,
    video : allVideoReducer,
    singleVideo : singleVideoReducer,
    counsellor : allCounsellorReducer,
    singleCounsellor : singleCounsellorReducer,
    allSlot : allSlotReducer,
    allStudentData : allStudentDataReducer,
    user : userReducer,
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





