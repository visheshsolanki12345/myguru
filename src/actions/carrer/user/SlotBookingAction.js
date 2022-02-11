import axios from 'axios'
import {
    All_COUNSOLLOR_WISE_SLOT_REQUEST,
    All_COUNSOLLOR_WISE_SLOT_SUCCESS,
    All_COUNSOLLOR_WISE_SLOT_FAIL,
    All_COUNSOLLOR_WISE_SLOT_CLEAR_ERRORS,
    // BOOK_SLOT_REQUEST,
    // BOOK_SLOT_SUCCESS,
    // BOOK_SLOT_FAIL,
    // BOOK_SLOT_CLEAR_ERRORS,
} from '../../../constants/carrer/user/SlotBookingConstant'

const userInfo = JSON.parse(localStorage.getItem('user-details'))


export const getUserWiseSlotFunc = (id) => async (dispatch) => {
    try {
        dispatch({ type: All_COUNSOLLOR_WISE_SLOT_REQUEST })
        const config = { headers: { 'Authorization': `Bearer ${userInfo && userInfo.access}` } }
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/carrer/slot-booking/${id}` , config)
        dispatch({
            type: All_COUNSOLLOR_WISE_SLOT_SUCCESS,
            payload: data,
        })
        return
    } catch (error) {
        dispatch({
            type: All_COUNSOLLOR_WISE_SLOT_FAIL,
            payload: error.response,
        })
        return
    }
}