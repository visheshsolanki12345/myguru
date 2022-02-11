
import {
    ARTICLE_ALL_REQUEST,
    ARTICLE_ALL_SUCCESS,
    ARTICLE_ALL_FAIL,
    ARTICLE_ALL_CLEAR_ERRORS,
    SINGLE_ARTICLE_REQUEST,
    SINGLE_ARTICLE_SUCCESS,
    SINGLE_ARTICLE_FAIL,
    SINGLE_ARTICLE_CLEAR_ERRORS

} from '../../../constants/carrer/user/ArticleConstant'


export const allArticleReducer = (state = { allArticle: [] }, action) => {
    switch (action.type) {
        case ARTICLE_ALL_REQUEST:
            return {
                loading: true,
                ...state,
            }
        case ARTICLE_ALL_SUCCESS:
            return {
                loading: false,
                ariclePageCount: action.payload.page,
                aricleTotalPagesCount: action.payload.pages,
                allArticle: action.payload,
            }
        case ARTICLE_ALL_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ARTICLE_ALL_CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}


export const singleArticleReducer = (state = { singleArticle: {} }, action) => {
    switch (action.type) {
        case SINGLE_ARTICLE_REQUEST:
            return {
                loading: true,
                ...state,
            }
        case SINGLE_ARTICLE_SUCCESS:
            return {
                loading: false,
                singleArticle: action.payload,
            }
        case SINGLE_ARTICLE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case SINGLE_ARTICLE_CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}
