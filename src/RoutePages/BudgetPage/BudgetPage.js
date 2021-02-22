import {Grid} from './BudgetPageStyles'
import React, {useEffect, useMemo} from 'react';
import {connect} from 'react-redux';
import {fetchBudget, fetchBudgetCategories} from "data/actions/budgetActions";
import {fetchAllCategories} from "data/actions/commonActions";
import {Loading} from "components";
import {BudgetCategories} from "./components/BudgetCategories";

import {BudgetTransactions} from "./components/BudgetTransactions";

const BudgetPage = ({budgetState, commonState, fetchBudget, fetchBudgetCategories, fetchAllCategories}) => {
    useEffect(()=>{
        fetchBudget(1);
        fetchBudgetCategories(1);
        fetchAllCategories();
    },[fetchBudget, fetchBudgetCategories, fetchAllCategories]);

    const finishedLoading = useMemo(
        () => !!commonState &&  !!budgetState && !Object.keys(commonState).length && !Object.keys(budgetState).length ,
        [commonState, budgetState]);

    return (
        <Grid>
            <section>
                {finishedLoading ? <BudgetCategories/> : <Loading/>}
            </section>
            <section>
                {finishedLoading ? <BudgetTransactions/> : <Loading/>}
            </section>
        </Grid>
    );
};

const ConnectedBudgetPage = connect(state => ({
    budget: state.budget.budget,
    budgetState: state.budget.loading,
    commonState: state.common.loading,
}),
    {fetchBudget, fetchBudgetCategories, fetchAllCategories}
)(BudgetPage);

export default ConnectedBudgetPage;
