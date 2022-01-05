import {
    Test_REQUEST,
    Test_SUCCESS,
    Test_FAIL,
} from '../../constants/Test/TestConstant'


export const TestReducer = (state = { test: [] }, action) => {
    switch (action.type) {
        case Test_REQUEST:
            return {
                loading: true,
                test: []
            }
        case Test_SUCCESS:
            return {
                loading: false,
                test: action.payload,
            }
        case Test_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}