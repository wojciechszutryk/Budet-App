import {LOADING_STATES, BUDGET_GET, BUDGET_REQUEST, BUDGET_SUCCESS ,BUDGET_FAILURE, BUDGET_CATEGORIES_GET, BUDGET_CATEGORIES_REQUEST, BUDGET_CATEGORIES_SUCCESS, BUDGET_CATEGORIES_FAILURE} from 'data/constants';
import API from 'data/fetch';

export const fetchBudget = (id) => async(dispatch) => {
    dispatch({
        type: BUDGET_REQUEST
    });

    try {
        const response = await API.budget.fetchBudget(id);
        const data = await response.json();

        dispatch({
            type: BUDGET_SUCCESS,
            payload: data,
        })
    }
    catch (err) {
        dispatch({
            type: BUDGET_FAILURE
        })
    }
}

export const fetchCategories = (id) => async dispatch => {
    dispatch({
        type: BUDGET_CATEGORIES_REQUEST,
    });

    try {
        const response = await API.budget.fetchCategories(id);
        const data = await response.json();

        dispatch({
            type: BUDGET_CATEGORIES_SUCCESS,
            payload: data,
        })
    }
    catch (err) {
        dispatch({
            type: BUDGET_CATEGORIES_FAILURE
        })
    }
}