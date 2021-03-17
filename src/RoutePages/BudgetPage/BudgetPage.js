import {Grid} from './BudgetPageStyles.js'
import React, {useEffect, useState, useMemo} from 'react';
import {connect} from 'react-redux';
import {fetchBudget, fetchBudgetCategories} from "data/actions/budgetActions";
import {fetchAllCategories} from "data/actions/commonActions";
import {Button, Loading, Modal,} from "components";
import {BudgetCategories} from "../components/BudgetCategories";
import {Charts} from "./components/Charts";
import {Link, Route, Switch} from "react-router-dom";
import AddBudgetForm from "../components/addBudgetForm";
import AddBudgetCategoriesForm from "../components/addBudgetCategoriesForm";

const BudgetPage = ({budgetState, commonState, fetchBudget, fetchBudgetCategories, fetchAllCategories, allCategories}) => {
    const [budgetId, setBudgetId] = useState(1);
    const [newBudgetData, setNewBudgetData] = useState({});

    useEffect(()=>{
        fetchBudget(budgetId);
        fetchBudgetCategories(budgetId);
        fetchAllCategories();
    },[fetchBudget, fetchBudgetCategories, fetchAllCategories, budgetId]);

    const finishedLoading = useMemo(
        () => !!commonState &&  !!budgetState && !Object.keys(commonState).length && !Object.keys(budgetState).length ,
        [commonState, budgetState]);

    const handleNextAddBudgetForm = (values) => {
        setNewBudgetData(values)
        // console.log(values)
    };

    const handleSubmitAddBudgetForm = (values) => {
        setNewBudgetData(values)
        // console.log(values)
    };

    return (
        <>
            <Grid>
                <section>
                    {finishedLoading ?
                        <>
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
}),
    {fetchBudget, fetchBudgetCategories, fetchAllCategories}
)(BudgetPage);

export default ConnectedBudgetPage;
