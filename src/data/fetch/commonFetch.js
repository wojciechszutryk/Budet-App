export const fetchAllCategoriesFromAPI = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/categories/?_expand=parentCategory`);
}

export const fetchAllBudgetsFromAPI = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/budgets`);
}