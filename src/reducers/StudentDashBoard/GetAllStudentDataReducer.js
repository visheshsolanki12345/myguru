import {
    ALL_DATA_REQUEST,
    ALL_DATA_SUCCESS,
    ALL_DATA_FAIL,
    ALL_CLEAR_ERRORS,
} from '../../constants/StudentDashBoard/GetAllStudentDataConstant'

export const allStudentDataReducer = (state = { allStudentData: [] }, action) => {
    switch (action.type) {
        case ALL_DATA_REQUEST:
            return {
                loading: true,
                ...state,
            }
        case ALL_DATA_SUCCESS:
            return {
                loading: false,
                allStudentData: action.payload,
            }
        case ALL_DATA_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ALL_CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}

