import axios from "axios";
import {
    Test_REQUEST,
    Test_SUCCESS,
    Test_FAIL,
} from '../../constants/Test/TestConstant'
import { useAlert } from 'react-alert'

const userInfo = JSON.parse(localStorage.getItem('user-details'))
var rows = []
var rows2 = []


export const getTest = (id) => async (dispatch) => {
    try {
        dispatch({ type: Test_REQUEST })
        const config = { headers: { 'Authorization': `Bearer ${userInfo && userInfo.access}` } }
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/test-payment-done/`, id, config)
        // console.log(data)
        data.discreption &&
            data.discreption.forEach((item, index) => {
                rows.push(item.typeOfTest.selectTest);
            });
        data.discreption.forEach((item, index) => {
            rows2.push(item.className.newClass);
        });
        localStorage.setItem("typeOfTest", rows[0])
        localStorage.setItem("Class", rows2[0])
        rows.length = 0
        rows2.length = 0

        dispatch({
            type: Test_SUCCESS,
            payload: data,
        })
    } catch (error) {
        return 
        // dispatch({
        //     type: Test_FAIL,
        //     payload: error.response,
        // })
    }
}

