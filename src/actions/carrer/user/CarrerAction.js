import axios from "axios";
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

const userInfo = JSON.parse(localStorage.getItem('user-details'))

export const getCarrerFunc = () => async (dispatch) => {
    try {
        dispatch({ type: All_CARRER_REQUEST })
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/carrer/get-carrer-list/`)
        dispatch({
            type: All_CARRER_SUCCESS,
            payload: data,
        })
        return
    } catch (error) {
        dispatch({
            type: All_CARRER_FAIL,
            payload: error.response,
        })
        return 
    }
}

export const getCarrerPageFunc = (id) => async (dispatch) => {
    try {
        const config = { headers: { 'Authorization': `Bearer ${userInfo && userInfo.access}` } }
        dispatch({ type: CARRER_PAGE_REQUEST })
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/carrer/get-carrer-page/${id}/`, config)
        dispatch({
            type: CARRER_PAGE_SUCCESS,
            payload: data,
        })
        return
    } catch (error) {
        dispatch({
            type: CARRER_PAGE_FAIL,
            payload: error.response,
        })
        return 
    }
}


export const clearPageErrors = () => async (dispatch) => {
    dispatch({ type: CARRER_PAGE_CLEAR_ERRORS })
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}
