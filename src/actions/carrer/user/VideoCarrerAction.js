

import axios from 'axios'
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

const userInfo = JSON.parse(localStorage.getItem('user-details'))


export const getVideoFunc = (currentPage, carrerId) => async (dispatch) => {
    try {
        dispatch({ type: VIDEO_ALL_REQUEST })
        const config = { headers: { 'Authorization': `Bearer ${userInfo && userInfo.access}` } }
        let All = `/api/video/video/`
        let linkSearch = `/api/video/video/?keyword=${carrerId}&page=${currentPage}`
        let linkPagination = `/api/video/video/?page=${currentPage}`
        if (carrerId) {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}` + linkSearch, config)
            dispatch({
                type: VIDEO_ALL_SUCCESS,
                payload: data,
            })
            return
        }
        if (currentPage) {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}` + linkPagination, config)
            dispatch({
                type: VIDEO_ALL_SUCCESS,
                payload: data,
            })
            return
        }
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}` + All, config)
        dispatch({
            type: VIDEO_ALL_SUCCESS,
            payload: data,
        })
        return
    } catch (error) {
        dispatch({
            type: VIDEO_ALL_FAIL,
            payload: error.response,
        })
        return
    }
}



export const getVideoSingleFunc = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_VIDEO_REQUEST })
        const config = { headers: { 'Authorization': `Bearer ${userInfo && userInfo.access}` } }
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/video/video/${id}/`, config)
        dispatch({
            type: SINGLE_VIDEO_SUCCESS,
            payload: data,
        })
        return
    } catch (error) {
        dispatch({
            type: SINGLE_VIDEO_FAIL,
            payload: error.response,
        })
        return
    }
}


// export const clearErrors = () => async (dispatch) => {
//     dispatch({ type: SINGLE_VIDEO_CLEAR_ERRORS })
// }

// export const clearErrors = () => async (dispatch) => {
//     dispatch({ type: SINGLE_ARTICLE_CLEAR_ERRORS })
// }