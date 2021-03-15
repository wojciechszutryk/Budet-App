import {Grid} from './BudgetPageStyles.js'
import React, {useEffect, useState, useMemo} from 'react';
import {connect} from 'react-redux';
import {fetchBudget, fetchBudgetCategories} from "data/actions/budgetActions";
import {fetchAllCategories} from "data/actions/commonActions";
import {Loading,} from "components";
import {BudgetCategories} from "../components/BudgetCategories";
import {Charts} from "./components/Charts";

const BudgetPage = ({budgetState, commonState, fetchBudget, fetchBudgetCategories, fetchAllCategories}) => {
    const [budgetId, startBudgetId] = useState(1);
    useEffect(()=>{
        fetchBudget(budgetId);
        fetchBudgetCategories(budgetId);
        fetchAllCategories();
    },[fetchBudget, fetchBudgetCategories, fetchAllCategories, budgetId]);

    const finishedLoading = useMemo(
        () => !!commonState &&  !!budgetState && !Object.keys(commonState).length && !Object.keys(budgetState).length ,
        [commonState, budgetState]);

    return (
        <>
            <Grid>
                <section>
                    {finishedLoading ? <BudgetCategories/> : <Loading/>}
                </section>
                <section>
                    {finishedLoading ? <Charts/> : <Loading/>}
                </section>
            </Grid>
        </>
    );
};

const ConnectedBudgetPage = connect(state => ({
    budgetState: state.budget.loading,
    commonState: state.common.loading,
}),
    {fetchBudget, fetchBudgetCategories, fetchAllCategories}
)(BudgetPage);

export default ConnectedBudgetPage;
