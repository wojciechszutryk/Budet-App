import {Grid} from './BudgetPageStyles.js'
import React, {useEffect, useState, useMemo} from 'react';
import {connect} from 'react-redux';
import {
    fetchBudget,
    fetchBudgetCategories,
    addBudget,
    addBudgetCategory,
    removeTransaction
} from "data/actions/budgetActions";
import {fetchAllBudgets, fetchAllCategories, removeBudget, activeBudgetSet} from "data/actions/commonActions";
import {Button, Loading, Modal,} from "components";
import {BudgetCategories} from "../components/BudgetCategories";
import {Charts} from "./components/Charts";
import {Link, Route, Switch} from "react-router-dom";
import AddBudgetForm from "../components/addBudgetForm";
import AddBudgetCategoriesForm from "../components/addBudgetCategoriesForm";
import SetBudget from "../components/SetBudget";
import {toast} from "react-toastify";
import i18next from "i18next";

const BudgetPage = ({budgetState, commonState, activeBudget,
                        fetchBudget, fetchBudgetCategories, fetchAllCategories, fetchAllBudgets,
                        allCategories, allBudgets,
                        addBudget, addBudgetCategory, removeBudget, activeBudgetSet}) => {
    const [newBudgetData, setNewBudgetData] = useState({});

    useEffect(()=>{
        fetchBudget(activeBudget);
        fetchBudgetCategories(activeBudget);
        fetchAllCategories();
        fetchAllBudgets();
    },[fetchBudget, fetchBudgetCategories, fetchAllCategories, fetchAllBudgets, activeBudget]);

    const finishedLoading = useMemo(
        () => !!commonState &&  !!budgetState && !Object.keys(commonState).length && !Object.keys(budgetState).length ,
        [commonState, budgetState]);

    const handleNextAddBudgetForm = (values) => {
        setNewBudgetData(values)
    };

    const setCurrentBudget = id => {
        activeBudgetSet(id);
    };

    const handleSubmitAddBudgetForm = (values) => {
        const newBudgetId = (allBudgets.length+1).toString();
        const name = values['name'];
        const totalAmount = parseInt(values['totalAmount']);
        const categories = values['categories'];
        const budgetData = {name, totalAmount, id:newBudgetId};
        Object.keys(categories).forEach(function eachKey(key) {
            const categoryObject = {};
            categoryObject['categoryId'] = key;
            categoryObject['budget'] = categories[key];
            categoryObject['budgetId'] = newBudgetId;
            addBudgetCategory(categoryObject);
            fetchBudget(activeBudget);
            fetchBudgetCategories(activeBudget);
            fetchAllCategories();
            fetchAllBudgets();
        });
        addBudget(budgetData);
        fetchAllBudgets();
    };

    const handleRemoveBudget = (id) => {
        if (id === activeBudget.toString()) {
            removeBudget(id);
            activeBudgetSet(allBudgets[1].id);
            window.location.reload(true);
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
                    {finishedLoading ?
                        <>
                            <SetBudget
                                allBudgets={allBudgets}
                                setCurrentBudget={setCurrentBudget}
                                handleRemoveBudget={handleRemoveBudget}
                            />
                            <BudgetCategories/>
                            <Link  to='/budget/new'>
                                <Button buttonType='addBudget'>Add new budget</Button>
                            </Link>
                        </>
                        : <Loading/>}
                </section>
                <section>
                    {finishedLoading ? <Charts/> : <Loading/>}
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
