import axios from 'axios'
import {
    COUNSELLOR_ALL_REQUEST,
    COUNSELLOR_ALL_SUCCESS,
    COUNSELLOR_ALL_FAIL,
    // COUNSELLOR_ALL_CLEAR_ERRORS,
    SINGLE_COUNSELLOR_REQUEST,
    SINGLE_COUNSELLOR_SUCCESS,
    SINGLE_COUNSELLOR_FAIL,
    SINGLE_COUNSELLOR_CLEAR_ERRORS,

} from '../../../constants/carrer/user/CounsellorConstant'

const userInfo = JSON.parse(localStorage.getItem('user-details'))

export const getCounsellorFunc = (currentPage, carrerId) => async (dispatch) => {
    try {
        dispatch({ type: COUNSELLOR_ALL_REQUEST })
        const config = { headers: { 'Authorization': `Bearer ${userInfo && userInfo.access}` } }
        let All = `/api/carrer/counsellor-get/`
        let linkSearch = `/api/carrer/counsellor-get/?keyword=${carrerId}&page=${currentPage}`
        let linkPagination = `/api/carrer/counsellor-get/?page=${currentPage}`
        if (carrerId) {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}` + linkSearch, config)
            dispatch({
                type: COUNSELLOR_ALL_SUCCESS,
                payload: data,
            })
            return
        }
        if (currentPage) {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}`+linkPagination, config)
            dispatch({
                type: COUNSELLOR_ALL_SUCCESS,
                payload: data,
            })
            return
        }
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}` + All, config)
        dispatch({
            type: COUNSELLOR_ALL_SUCCESS,
            payload: data,
        })
        return

    } catch (error) {
        dispatch({
            type: COUNSELLOR_ALL_FAIL,
            payload: error.response,
        })
        return
    }
}


export const getCounsellorSingleFunc = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_COUNSELLOR_REQUEST })
        const config = { headers: { 'Authorization': `Bearer ${userInfo && userInfo.access}` } }
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/carrer/counsellor-get/${id}/`, config)
        dispatch({
            type: SINGLE_COUNSELLOR_SUCCESS,
            payload: data,
        })
        return
    } catch (error) {
        dispatch({
            type: SINGLE_COUNSELLOR_FAIL,
            payload: error.response,
        })
        return
    }
}


export const clearErrors = () => async (dispatch) => {
    dispatch({ type: SINGLE_COUNSELLOR_CLEAR_ERRORS })
}

// export const clearErrors = () => async (dispatch) => {
//     dispatch({ type: SINGLE_ARTICLE_CLEAR_ERRORS })
// }