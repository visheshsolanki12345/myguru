import axios from 'axios'
import {
    ARTICLE_ALL_REQUEST,
    ARTICLE_ALL_SUCCESS,
    ARTICLE_ALL_FAIL,
    ARTICLE_ALL_CLEAR_ERRORS,
    SINGLE_ARTICLE_REQUEST,
    SINGLE_ARTICLE_SUCCESS,
    SINGLE_ARTICLE_FAIL,
    // SINGLE_ARTICLE_CLEAR_ERRORS,

} from '../../../constants/carrer/user/ArticleConstant'


const userInfo = JSON.parse(localStorage.getItem('user-details'))


export const getArticleFunc = (currentPage, carrerId) => async (dispatch) => {
    try {
        const config = { headers: { 'Authorization': `Bearer ${userInfo && userInfo.access}` } }
        dispatch({ type: ARTICLE_ALL_REQUEST })
        let All = `/api/carrer/get-article/`
        let linkSearch = `/api/carrer/get-article/?keyword=${carrerId}&page=${currentPage}`
        let linkPagination = `/api/carrer/get-article/?page=${currentPage}`
        if (carrerId) {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}` + linkSearch, config)
            dispatch({
                type: ARTICLE_ALL_SUCCESS,
                payload: data,
            })
            return
        }
        if (currentPage) {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}` + linkPagination, config)
            dispatch({
                type: ARTICLE_ALL_SUCCESS,
                payload: data,
            })
            return
        }
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}` + All, config)
        dispatch({
            type: ARTICLE_ALL_SUCCESS,
            payload: data,
        })
        return

    } catch (error) {
        dispatch({
            type: ARTICLE_ALL_FAIL,
            payload: error.response,
        })
        return
    }
}


export const getArticleSingleFunc = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_ARTICLE_REQUEST })
        const config = { headers: { 'Authorization': `Bearer ${userInfo && userInfo.access}` } }
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/carrer/get-article/${id}/`, config)
        dispatch({
            type: SINGLE_ARTICLE_SUCCESS,
            payload: data,
        })
        return
    } catch (error) {
        dispatch({
            type: SINGLE_ARTICLE_FAIL,
            payload: error.response,
        })
        return
    }
}


// var information = {
//     action: "https://securegw-stage.paytm.in/order/process",
//     params: resp
// }


export const clearErrors = () => async (dispatch) => {
    dispatch({ type: ARTICLE_ALL_CLEAR_ERRORS })
}

// export const clearErrors = () => async (dispatch) => {
//     dispatch({ type: SINGLE_ARTICLE_CLEAR_ERRORS })
// }