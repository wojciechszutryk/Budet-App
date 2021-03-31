import React, {useMemo, useEffect} from 'react';
import {CategoriesWheel} from "../CategoriesWheel";
import {connect} from "react-redux";
import {groupBy} from "lodash";
import {colorChange} from "utilities/functions";
import {cleanActiveCategories} from "data/actions/budgetActions";
import {MoneyBar} from "../MoneyBar";
import {useTranslation} from "react-i18next";

const Charts = ({allCategories, activeCategories, budgetCategories, budget, cleanActiveCategories, lightTheme}) => {
    const {t} = useTranslation();

    useEffect(()=>{
        cleanActiveCategories();
    },[cleanActiveCategories]);

    const groupedCategories = useMemo(() => (groupBy(budgetCategories,
        budgetCategory => allCategories.find(
            category => budgetCategory.categoryId === category.id).parentCategory.name
    )), [allCategories,budgetCategories]);

    const colors = [];

    const BudgetCategories = Object.entries(groupedCategories).map(category => {
        const color = Math.floor(Math.random()*16777215).toString(16);
        if (activeCategories.includes(category[0])) {
            for (let i = 0; i < category[1].length; i++) colors.push(colorChange('#'+(color),-i*(category[1].length)*10));
            return category[1].map(budgetCategory => allCategories.find(cat => budgetCategory.categoryId === cat.id).name);
        }
        colors.push('#'+color);
        return category[0];
    }).flat();
    BudgetCategories.push("Other");

    colors.push('#'+Math.floor(Math.random()*16777215).toString(16));
    const moneyBudgetedOnCategory = Object.entries(groupedCategories).map(category => {
        if (activeCategories.includes(category[0])) return category[1].map(budgetCategory => budgetCategory.budget)
        return category[1].reduce((acc, budgetCategory) => acc + budgetCategory.budget, 0);
    }).flat();
    moneyBudgetedOnCategory.push(budget.totalAmount - moneyBudgetedOnCategory.reduce((acc, cat) => acc + cat, 0));

    const moneySpentOnCategory = Object.entries(groupedCategories).map(category => {
        if (activeCategories.includes(category[0])) {
            return category[1].map(budgetCategory => budget.transactions.filter(transaction => transaction.categoryId === budgetCategory.categoryId))
                .map(trans => trans.reduce((acc,transaction) => acc + transaction.amount, 0));
        }
        return budget.transactions.filter(transaction => category[1].find(budgetCategory => budgetCategory.categoryId === transaction.categoryId)
        ).reduce((acc,transaction) => acc + transaction.amount, 0)
    }).flat();

    const otherExpenses = useMemo(() => budget.transactions.filter(
        transaction => !budgetCategories.find(budgetCategory => budgetCategory.categoryId === transaction.categoryId)
    ).reduce((acc,transaction) => acc + transaction.amount, 0), [budget.transactions, budgetCategories]);
    moneySpentOnCategory.push(otherExpenses);

    const budgetData = {
        labels: BudgetCategories,
        datasets:[{
            label:'Budget money',
            data:moneyBudgetedOnCategory,
            backgroundColor:colors,
        },]
    };
    return (
        <>
            <CategoriesWheel
                chartData={budgetData}
                text={t("Budget Plan")}
                lightTheme={lightTheme}
            />
            <MoneyBar
                colors={colors}
                text={t("Budget Money")}
                moneySpentOnCategory={moneySpentOnCategory}
                moneyBudgetedOnCategory={moneyBudgetedOnCategory}
                BudgetCategories={BudgetCategories}
                lightTheme={lightTheme}
            />
        </>
    );
};

const mapStateToProps = state => ({
    budget: state.budget.budget,
    activeCategories: state.budget.activeCategories,
    budgetCategories: state.budget.categories,
    allCategories: state.common.categories,
    lightTheme: state.common.lightTheme
});

const mapDispatchToProps = {
    cleanActiveCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(Charts);
