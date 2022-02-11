import {
    COUNSELLOR_ALL_REQUEST,
    COUNSELLOR_ALL_SUCCESS,
    COUNSELLOR_ALL_FAIL,
    COUNSELLOR_ALL_CLEAR_ERRORS,
    SINGLE_COUNSELLOR_REQUEST,
    SINGLE_COUNSELLOR_SUCCESS,
    SINGLE_COUNSELLOR_FAIL,
    SINGLE_COUNSELLOR_CLEAR_ERRORS,

} from '../../../constants/carrer/user/CounsellorConstant'



export const allCounsellorReducer = (state = { counsellor: [] }, action) => {
    switch (action.type) {
        case COUNSELLOR_ALL_REQUEST:
            return {
                loading: true,
                ...state,
            }
        case COUNSELLOR_ALL_SUCCESS:
            return {
                loading: false,
                counsellorPageCount: action.payload.page,
                counsellorTotalPagesCount: action.payload.pages,
                counsellor: action.payload,
            }
        case COUNSELLOR_ALL_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case COUNSELLOR_ALL_CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}


export const singleCounsellorReducer = (state = { singleCounsellor: {} }, action) => {
    switch (action.type) {
        case SINGLE_COUNSELLOR_REQUEST:
            return {
                loading: true,
                ...state,
            }
        case SINGLE_COUNSELLOR_SUCCESS:
            return {
                loading: false,
                singleCounsellor: action.payload,
            }
        case SINGLE_COUNSELLOR_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case SINGLE_COUNSELLOR_CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}
