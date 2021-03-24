export const fetchAllCategoriesFromAPI = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/categories/?_expand=parentCategory`);
}

export const fetchAllTransactionsFromAPI = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/transactions`);
}

export const fetchAllBudgetsFromAPI = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/budgets`);
}

export const removeBudget = (id) => {
    return fetch(`${process.env.REACT_APP_API_URL}/budgets/${id}`,{
        method: 'DELETE',
        headers: {'Content-type': 'application/json'}
    });
};