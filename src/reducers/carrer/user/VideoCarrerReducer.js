import {
    VIDEO_ALL_REQUEST,
    VIDEO_ALL_SUCCESS,
    VIDEO_ALL_FAIL,
    VIDEO_ALL_CLEAR_ERRORS,
    SINGLE_VIDEO_REQUEST,
    SINGLE_VIDEO_SUCCESS,
    SINGLE_VIDEO_FAIL,
    SINGLE_VIDEO_CLEAR_ERRORS,

} from '../../../constants/carrer/user/VideoCarrerConstant'


export const allVideoReducer = (state = { video : [] }, action) => {
    switch (action.type) {
        case VIDEO_ALL_REQUEST:
            return {
                loading: true,
                ...state,
            }
        case VIDEO_ALL_SUCCESS:
            return {
                loading: false,
                video: action.payload,
                videoPageCount: action.payload.page,
                videoTotalPagesCount: action.payload.pages,
            }
        case VIDEO_ALL_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case VIDEO_ALL_CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}


export const singleVideoReducer = (state = { singleVideo: {} }, action) => {
    switch (action.type) {
        case SINGLE_VIDEO_REQUEST:
            return {
                loading: true,
                ...state,
            }
        case SINGLE_VIDEO_SUCCESS:
            return {
                loading: false,
                singleVideo: action.payload,
            }
        case SINGLE_VIDEO_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case SINGLE_VIDEO_CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}
