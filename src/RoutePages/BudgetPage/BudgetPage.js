import {Grid} from './BudgetPageStyles.js'
import React, {useEffect, useState, useMemo} from 'react';
import {connect} from 'react-redux';
import {fetchBudget, fetchBudgetCategories, addBudget, addBudgetCategory} from "data/actions/budgetActions";
import {fetchAllBudgets, fetchAllCategories} from "data/actions/commonActions";
import {Button, Loading, Modal,} from "components";
import {BudgetCategories} from "../components/BudgetCategories";
import {Charts} from "./components/Charts";
import {Link, Route, Switch} from "react-router-dom";
import AddBudgetForm from "../components/addBudgetForm";
import AddBudgetCategoriesForm from "../components/addBudgetCategoriesForm";
import SetBudget from "../components/SetBudget";

const BudgetPage = ({budgetState, commonState, fetchBudget, fetchBudgetCategories, fetchAllCategories, fetchAllBudgets, allCategories, allBudgets, addBudget, addBudgetCategory}) => {
    const [budgetId, setBudgetId] = useState(3);
    const [newBudgetData, setNewBudgetData] = useState({});

    useEffect(()=>{
        fetchBudget(budgetId);
        fetchBudgetCategories(budgetId);
        fetchAllCategories();
        fetchAllBudgets();
    },[fetchBudget, fetchBudgetCategories, fetchAllCategories, budgetId, fetchAllBudgets]);

    const finishedLoading = useMemo(
        () => !!commonState &&  !!budgetState && !Object.keys(commonState).length && !Object.keys(budgetState).length ,
        [commonState, budgetState]);

    const handleNextAddBudgetForm = (values) => {
        setNewBudgetData(values)
    };

    const setCurrentBudget = id => {
        setBudgetId(id);
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
            console.log(categoryObject);
            addBudgetCategory(categoryObject);
            fetchBudget(budgetId);
            fetchBudgetCategories(budgetId);
            fetchAllCategories();
            fetchAllBudgets();
        });
        addBudget(budgetData);
    }

        // console.log(values)

    return (
        <>
            <Grid>
                <section>
                    {finishedLoading ?
                        <>
                            <SetBudget allBudgets={allBudgets} onClick={setCurrentBudget}/>
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
    commonState: state.common.loading,
    allCategories: state.common.categories,
    allBudgets: state.common.budgets,
}),
{
    fetchBudget,
    fetchBudgetCategories,
    fetchAllCategories,
    fetchAllBudgets,
    addBudget,
    addBudgetCategory
}
)(BudgetPage);

export default ConnectedBudgetPage;
