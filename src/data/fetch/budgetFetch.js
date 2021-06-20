import store from '../store';

export const fetchBudgetFromAPI = async({id}) => {
    const token = store.getState().common.token;
    const response = await fetch(`${process.env.REACT_APP_API_URL}/budgets/${id}/?_embed=transactions`,{
        headers: {
            'Authorization': 'Bearer '+token,
        }
    });
    return await response.json()
};

export const fetchBudgetTransactionsFromAPI = async({id}) => {
    const token = store.getState().common.token;
    const response = await fetch(`${process.env.REACT_APP_API_URL}/budgets/${id}/transactions`,{
        headers: {
            'Authorization': 'Bearer '+token,
        }
    });
    return await response.json()
};

export const fetchBudgetCategoriesFromAPI = async({id}) => {
    const token = store.getState().common.token;
    const response = await fetch(`${process.env.REACT_APP_API_URL}/budgets/${id}/budgetCategories`,{
        headers: {
            'Authorization': 'Bearer '+token,
        }
    });
    return await response.json()
};

export const addTransition = async({data}) => {
    const token = store.getState().common.token;
    const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions`,{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer '+token,
        }
    });
    return await response.json();
};

export const removeTransition = async(id) => {
    const token = store.getState().common.token;
    const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions/${id}`,{
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer '+token,
        }
    })
    return await response.json()
};

export const addBudget = async(data) => {
    const token = store.getState().common.token;
    const response = await fetch(`${process.env.REACT_APP_API_URL}/budgets`,{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer '+token,
        }
    })
    return await response.json();
};

export const addBudgetCategory = async(data) => {
    const token = store.getState().common.token;
    const response = await fetch(`${process.env.REACT_APP_API_URL}/budgetCategories`,{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer '+token,
        }
    })
    return await response.json()
};

