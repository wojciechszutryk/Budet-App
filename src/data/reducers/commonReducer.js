import {LOADING_STATES,  ALL_CATEGORIES_REQUEST, ALL_CATEGORIES_SUCCESS, ALL_CATEGORIES_FAILURE} from 'data/constants'

const startCommon = {
    loading: null,
    categories: [],
}

const common = (state= startCommon, action) => {
    const newLoading = {...state.loading};
    switch (action.type) {
        case ALL_CATEGORIES_REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    [action.type]: LOADING_STATES.LOADING,
                }
            }

        case ALL_CATEGORIES_SUCCESS:
            delete newLoading.ALL_CATEGORIES_REQUEST;
            return{
                ...state,
                categories: action.payload,
                loading: newLoading,
            }

        case ALL_CATEGORIES_FAILURE:
            delete newLoading.ALL_CATEGORIES_REQUEST;
            return{
                ...state,
                categories: [],
                loading: newLoading,
            }

        default:
            return state;
    }
}

export default common;
