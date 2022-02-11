import axios from 'axios'
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    // UPDATE_PROFILE_REQUEST,
    // UPDATE_PROFILE_SUCCESS,
    // UPDATE_PROFILE_RESET,
    // UPDATE_PROFILE_FAIL,
    // UPDATE_PASSWORD_REQUEST,
    // UPDATE_PASSWORD_SUCCESS,
    // UPDATE_PASSWORD_RESET,
    // UPDATE_PASSWORD_FAIL,
} from '../../constants/Authentication/UserConstant'

const userInfo = JSON.parse(localStorage.getItem('user-details'))


export const userRagistration = (item) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST })
        const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/account/register/`, item)
        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data,
        })
        localStorage.setItem("user-details", JSON.stringify(data.data));
        return
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response,
        })
        return
    }
}


export const userLogin = (item) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })
        const config = { headers: { "Content-Type": "application/json" } }
        const data = await axios.post(`${process.env.REACT_APP_API_URL}/api/account/login/`, item, config)
        localStorage.setItem("user-details", JSON.stringify(data.data));
        dispatch({ type: LOGIN_SUCCESS, payload: data })
    } catch (error) {
        console.log(error)
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.detail })
    }
}