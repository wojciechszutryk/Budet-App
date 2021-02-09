import {BUDGET, BUDGET_CATEGORIES} from 'data/constants';
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