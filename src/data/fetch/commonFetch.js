import store from '../store';

export const fetchAllCategoriesFromAPI = async() => {
    const token = store.getState().common.token;
    const id = store.getState().common.userId;
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}/getCategories/?_expand=parentCategory`,{
        headers: {
            'Authorization': 'Bearer '+token,
        }
    });
    return await response.json();
}

export const fetchParentCategoriesFromAPI = async() => {
    const token = store.getState().common.token;
    const id = store.getState().common.userId;
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}/getParentCategories`,{
        headers: {
            'Authorization': 'Bearer '+token,
        }
    });
    return await response.json();
}

export const fetchChildrenCategoriesFromAPI = async() => {
    const token = store.getState().common.token;
    const id = store.getState().common.userId;
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}/getCategories`,{
        headers: {
            'Authorization': 'Bearer '+token,
        }
    });
    return await response.json();
}

export const fetchAllTransactionsFromAPI = async() => {
    const token = store.getState().common.token;
    const id = store.getState().common.userId;
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}/getTransactions`,{
        headers: {
            'Authorization': 'Bearer '+token,
        }
    });
    return await response.json();
}

export const fetchAllBudgetsFromAPI = async() => {
    const token = store.getState().common.token;
    const id = store.getState().common.userId;
    const response = await  fetch(`${process.env.REACT_APP_API_URL}/users/${id}/getBudgets`,{
        headers: {
            'Authorization': 'Bearer '+token,
        }
    });
    return await response.json();
}

export const removeBudget = (id) => {
    const token = store.getState().common.token;
    return fetch(`${process.env.REACT_APP_API_URL}/budgets/${id}`,{
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer '+token,
        }
    });
};

export const addParentCategory = async(data) => {
    const token = store.getState().common.token;
    const response = await fetch(`${process.env.REACT_APP_API_URL}/parentCategories`,{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer '+token,
        }
    })
    return await response.json()
};

export const removeParentCategory = (id) => {
    const token = store.getState().common.token;
    return fetch(`${process.env.REACT_APP_API_URL}/parentCategories/${id}`,{
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer '+token,
        }
    });
};

export const addCategory = async(data) => {
    const token = store.getState().common.token;
    const response = await fetch(`${process.env.REACT_APP_API_URL}/categories`,{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer '+token,
        }
    })
    return await response.json()
};

export const removeCategory = (id) => {
    const token = store.getState().common.token;
    return fetch(`${process.env.REACT_APP_API_URL}/categories/${id}`,{
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer '+token,
        }
    });
};

export const userSignUp = async(data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/signup`,{
        method: 'POST',
        body: data,
        // headers: {"Content-Type": "multipart/form-data"}
    })
    return await response.json()
};

export const userLogin = async(data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/login`,{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        }
    })
    return await response.json()
};

export const userPhotoChange = async({id, data}) => {
    const token = store.getState().common.token;
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}/changePhoto`,{
        method: 'PUT',
        body: data,
        headers: {'Authorization': 'Bearer '+token}
    })
    return await response.json()
};

export const userPhotoGet = async({id}) => {
    // const response = await fetch(`${process.env.REACT_APP_API_URL}/users/image/${id}`,{
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}/getPhoto`,{
        method: 'GET',
    })
    return await response.json();
};

export const userAccountDelete = async({id}) => {
    const token = store.getState().common.token;
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}`,{
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer '+token,
        }
    })
    return await response.json()
};