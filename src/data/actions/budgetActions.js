import {
    BUDGET_ACTIVE_CATEGORIES_ADD,
    BUDGET_ACTIVE_CATEGORIES_CLEAN,
    BUDGET_ACTIVE_CATEGORIES_REMOVE, SET_OTHER_CATEGORY_ID
} from 'data/constants';

export const addActiveCategory = id => {
    return{
        type: BUDGET_ACTIVE_CATEGORIES_ADD,
        payload: id
    }
};

export const removeActiveCategory = id => {
    return{
        type: BUDGET_ACTIVE_CATEGORIES_REMOVE,
        payload: id
    }
};

export const cleanActiveCategories = () => {
    return{
        type: BUDGET_ACTIVE_CATEGORIES_CLEAN,
    }
};

export const setOtherCategoryId = (id) => {
    return{
        type: SET_OTHER_CATEGORY_ID,
        payload: id,
    }
};