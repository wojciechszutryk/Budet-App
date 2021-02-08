import {LOADING_STATES, BUDGET_GET, BUDGET_GET_REQUEST, BUDGET_GET_SUCCESS ,BUDGET_GET_FAILURE} from 'data/constants';

export const fetchBudget = (id) => async(dispatch) => {
    dispatch({
        type: BUDGET_GET_REQUEST
    });

    try {
        const response = await fetchBudget(id);
        const data = response.json();

        dispatch({
            type: BUDGET_GET_SUCCESS,
            payload: data,
        })
    }
    catch (err) {
        dispatch({
            type: BUDGET_GET_FAILURE
        })
    }
}

const fetchBudgetedCategories = () => {

}