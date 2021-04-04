import {Grid} from './BudgetPageStyles.js'
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {
    fetchBudget,
    fetchBudgetCategories,
    addBudget,
    addBudgetCategory,
    removeTransaction
} from "data/actions/budgetActions";
import {fetchAllBudgets, fetchAllCategories, removeBudget, activeBudgetSet} from "data/actions/commonActions";
import {Button, Modal, SuspenseErrorBoundary,} from "components";
import {BudgetCategories} from "../components/BudgetCategories";
import {Charts} from "./components/Charts";
import {Link, Route, Switch} from "react-router-dom";
import AddBudgetForm from "../components/addBudgetForm";
import AddBudgetCategoriesForm from "../components/addBudgetCategoriesForm";
import SetBudget from "../components/SetBudget";
import {toast} from "react-toastify";
import i18next from "i18next";
import {useMutation, useQuery, useQueryClient} from "react-query";
import API from "data/fetch";

const BudgetPage = ({activeBudget, addBudget, addBudgetCategory, removeBudget, activeBudgetSet}) => {

    const queryClient = useQueryClient();
    const [newBudgetData, setNewBudgetData] = useState({});
    const {data:allBudgets} = useQuery('allBudgets', API.common.fetchAllBudgetsFromAPI);
    const {data:allCategories} = useQuery('allCategories', API.common.fetchAllCategoriesFromAPI);
    const {data:budgetCategories} = useQuery(['budgetCategories',{id: activeBudget}], () => API.budget.fetchBudgetCategoriesFromAPI({id: activeBudget}));
    const {data:budget} = useQuery(['budget',{id: activeBudget}], () => API.budget.fetchBudgetFromAPI({id: activeBudget}));

    const addBudgetCategoryMutation = useMutation(addBudgetCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries('budgetCategories')
        },
    });
    const addBudgetMutation = useMutation(addBudget, {
        onSuccess: () => {
            queryClient.invalidateQueries('budget')
            queryClient.invalidateQueries('allBudgets')
        },
    });
    const removeBudgetMutation = useMutation(removeBudget, {
        onSuccess: () => {
            queryClient.invalidateQueries('allBudgets');
        },
    })

    const handleNextAddBudgetForm = (values) => {
        setNewBudgetData(values)
    };

    const handleSubmitAddBudgetForm = (values) => {
        const newBudgetId = allBudgets[allBudgets.length-1] ? (allBudgets.length+1).toString() : (allBudgets.length).toString() ;
        const name = values['name'];
        const totalAmount = parseInt(values['totalAmount']);
        const categories = values['categories'];
        const budgetData = {name, totalAmount, id:newBudgetId};
        Object.keys(categories).forEach(function eachKey(key) {
            const categoryObject = {};
            categoryObject['categoryId'] = key;
            categoryObject['budget'] = categories[key];
            categoryObject['budgetId'] = newBudgetId;
            addBudgetCategoryMutation.mutate(categoryObject);
        });
        addBudgetMutation.mutate(budgetData);
        activeBudgetSet(newBudgetId);
    };

    const handleRemoveBudget = (id) => {
        if (id === activeBudget.toString() && allBudgets.length > 0) {
            removeBudgetMutation.mutate(id);
            activeBudgetSet(allBudgets[0].id);
        }
        else {
            toast.info(i18next.t("Set Budget Active before deleting"), {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                button: false,
                progress: undefined,
            });
        }
    };

    return (
        <>
            <Grid>
                <section>
                    <SuspenseErrorBoundary>
                        <SetBudget
                            allBudgets={allBudgets}
                            setCurrentBudget={activeBudgetSet}
                            handleRemoveBudget={handleRemoveBudget}
                            activeBudget={activeBudget}
                        />
                        <BudgetCategories
                            allCategories={allCategories}
                            budgetCategories={budgetCategories}
                        />
                        <Link  to='/budget/new'>
                            <Button buttonType='addBudget'>Add new budget</Button>
                        </Link>
                    </SuspenseErrorBoundary>
                </section>
                <section>
                    <SuspenseErrorBoundary>
                        <Charts
                            budget={budget}
                            allCategories={allCategories}
                            budgetCategories={budgetCategories}
                        />
                    </SuspenseErrorBoundary>
                </section>
            </Grid>

            <Switch>
                <Route path='/budget/new' exact>
                    <Modal>
                        <AddBudgetForm categories={allCategories} onSubmit={handleNextAddBudgetForm}/>
                    </Modal>
                </Route>
                <Route path='/budget/categories' exact>
                    <Modal>
                        <AddBudgetCategoriesForm
                            name={newBudgetData['name']}
                            totalAmount={newBudgetData['totalAmount']}
                            categories={newBudgetData['categories']}
                            onSubmit={handleSubmitAddBudgetForm}
                        />
                    </Modal>
                </Route>
            </Switch>
        </>
    );
};

const ConnectedBudgetPage = connect(state => ({
    budgetState: state.budget.loading,
    budget: state.budget.budget,
    commonState: state.common.loading,
    allCategories: state.common.categories,
    allBudgets: state.common.budgets,
    activeBudget: state.common.activeBudget
}),
{
    fetchBudget,
    fetchBudgetCategories,
    fetchAllCategories,
    fetchAllBudgets,
    activeBudgetSet,
    addBudget,
    removeBudget,
    removeTransaction,
    addBudgetCategory
}
)(BudgetPage);

export default ConnectedBudgetPage;
