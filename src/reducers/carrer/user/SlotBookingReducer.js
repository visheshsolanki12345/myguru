import {
    All_COUNSOLLOR_WISE_SLOT_REQUEST,
    All_COUNSOLLOR_WISE_SLOT_SUCCESS,
    All_COUNSOLLOR_WISE_SLOT_FAIL,
    All_COUNSOLLOR_WISE_SLOT_CLEAR_ERRORS,
    BOOK_SLOT_REQUEST,
    BOOK_SLOT_SUCCESS,
    BOOK_SLOT_FAIL,
    BOOK_SLOT_CLEAR_ERRORS,
} from '../../../constants/carrer/user/SlotBookingConstant'


export const allSlotReducer = (state = { allSlot : [] }, action) => {
    switch (action.type) {
        case All_COUNSOLLOR_WISE_SLOT_REQUEST:
            return {
                loading: true,
                ...state,
            }
        case All_COUNSOLLOR_WISE_SLOT_SUCCESS:
            return {
                loading: false,
                allSlot: action.payload,
            }
        case All_COUNSOLLOR_WISE_SLOT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case All_COUNSOLLOR_WISE_SLOT_CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}