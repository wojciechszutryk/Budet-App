import {ALL_CATEGORIES} from 'data/constants';
import API from 'data/fetch';

export const fetchAllCategories = () => {
    const promise = API.common.fetchAllCategoriesFromAPI();

    return {
        type: ALL_CATEGORIES,
        promise
    };
};