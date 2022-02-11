import axios from 'axios'
import {
    ALL_DATA_REQUEST,
    ALL_DATA_SUCCESS,
    ALL_DATA_FAIL,
    ALL_CLEAR_ERRORS,
} from '../../constants/StudentDashBoard/GetAllStudentDataConstant'

const userInfo = JSON.parse(localStorage.getItem('user-details'))


export const getAllStudentData = () => async (dispatch) => {
    try {
        const config = { headers: { 'Authorization': `Bearer ${userInfo && userInfo.access}` } }
        dispatch({ type: ALL_DATA_REQUEST })
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/carrer/student-deshbord/`, config)
        dispatch({
            type: ALL_DATA_SUCCESS,
            payload: data,
        })
        return

    } catch (error) {
        dispatch({
            type: ALL_DATA_FAIL,
            payload: error.response,
        })
        return
    }
}


export const clearErrors = () => async (dispatch) => {
    dispatch({ type: ALL_CLEAR_ERRORS })
}