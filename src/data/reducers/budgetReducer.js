import {
    BUDGET_ACTIVE_CATEGORIES_ADD,
    BUDGET_ACTIVE_CATEGORIES_REMOVE,
    BUDGET_ACTIVE_CATEGORIES_CLEAN,
} from 'data/constants'

const startBudget = {
    loading: null,
    budget: {},
    categories: [],
    activeCategories: [],
    otherCategoryId: '60c7bcc8cbd57a2b0cb3a610',
}

const budget = (state= startBudget, action) => {
    const newActiveCategories = [...state.activeCategories];
    switch (action.type) {

        case BUDGET_ACTIVE_CATEGORIES_ADD:
            if (newActiveCategories.includes(action.payload)) return {...state}
            return{
                ...state,
                activeCategories: [
                    ...state.activeCategories,
                    action.payload
                ]
            }

        case BUDGET_ACTIVE_CATEGORIES_REMOVE:
            const index = newActiveCategories.indexOf(action.payload);
            newActiveCategories.splice(index, 1);
            return{
                ...state,
                activeCategories: newActiveCategories
            }

        case BUDGET_ACTIVE_CATEGORIES_CLEAN:
            return{
                ...state,
                activeCategories: []
            }

        default:
            return state;
    }
}

export default budget;
