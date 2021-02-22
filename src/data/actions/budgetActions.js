import {BUDGET, BUDGET_ACTIVE_CATEGORIES_ADD, BUDGET_ACTIVE_CATEGORIES_REMOVE, BUDGET_CATEGORIES} from 'data/constants';
import API from 'data/fetch';

export const fetchBudget = id => {
    const promise = API.budget.fetchBudgetFromAPI(id);

   return {
        type: BUDGET,
        promise
    };
};

export const fetchBudgetCategories = id => {
    const promise = API.budget.fetchBudgetCategoriesFromAPI(id);

    return {
        type: BUDGET_CATEGORIES,
        promise
    };
};

export const addActiveCategory = id => {
    return{
        type: BUDGET_ACTIVE_CATEGORIES_ADD,
        payload: id
    }
}

export const removeActiveCategory = id => {
    return{
        type: BUDGET_ACTIVE_CATEGORIES_REMOVE,
        payload: id
    }
}
