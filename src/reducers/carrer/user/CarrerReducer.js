import {
    All_CARRER_REQUEST,
    All_CARRER_SUCCESS,
    All_CARRER_FAIL,
    CLEAR_ERRORS,
    CARRER_PAGE_REQUEST,
    CARRER_PAGE_SUCCESS,
    CARRER_PAGE_FAIL,
    CARRER_PAGE_CLEAR_ERRORS,
} from '../../../constants/carrer/user/CarrerConstant'

export const userCarrerReducer = (state = { userCarrer: [] }, action) => {
    switch (action.type) {
        case All_CARRER_REQUEST:
            return {
                loading: true,
                ...state,
            }
        case All_CARRER_SUCCESS:
            return {
                loading: false,
                userCarrer: action.payload,
            }
        case All_CARRER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}


export const userCarrerPageReducer = (state = { userCarrerPage: {} }, action) => {
    switch (action.type) {
        case CARRER_PAGE_REQUEST:
            return {
                loading: true,
                ...state,
            }
        case CARRER_PAGE_SUCCESS:
            return {
                loading: false,
                userCarrerPage: action.payload,
            }
        case CARRER_PAGE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CARRER_PAGE_CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}