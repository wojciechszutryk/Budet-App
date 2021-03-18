import {ALL_BUDGETS, ALL_CATEGORIES} from 'data/constants';
import API from 'data/fetch';

export const fetchAllCategories = () => {
    const promise = API.common.fetchAllCategoriesFromAPI();

    return {
        type: ALL_CATEGORIES,
        promise
    };
};

export const fetchAllBudgets = () => {
    const promise = API.common.fetchAllBudgetsFromAPI();

    return {
        type: ALL_BUDGETS,
        promise
    };
};