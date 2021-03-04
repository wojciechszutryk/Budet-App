import React, {useMemo} from 'react';
import {CategoriesWheel} from "../CategoriesWheel";
import {connect} from "react-redux";
import {groupBy} from "lodash";
import {colorChange} from "utilities/functions";

const Charts = ({allCategories, activeCategories, budgetCategories, budget}) => {

    const groupedCategories = useMemo(() => (groupBy(budgetCategories,
        budgetCategory => allCategories.find(
            category => budgetCategory.categoryId === category.id).parentCategory.name
    )), [allCategories,budgetCategories]);

    const colors = [];

    const parentCategories = Object.entries(groupedCategories).map(category => {
        const color = Math.floor(Math.random()*16777215).toString(16);
        if (activeCategories.includes(category[0])) {
            for (let i = 0; i < category[1].length; i++) colors.push(colorChange('#'+(color),-i*(category[1].length)*10));
            return category[1].map(budgetCategory => allCategories.find(cat => budgetCategory.id === cat.id).name);
        }
        colors.push('#'+color);
        return category[0];
    }).flat();
    parentCategories.push("Other");

    colors.push('#'+Math.floor(Math.random()*16777215).toString(16));
    const moneyInParentCategory = Object.entries(groupedCategories).map(category => {
        if (activeCategories.includes(category[0])) return category[1].map(budgetCategory => budgetCategory.budget)
        return category[1].reduce((acc, budgetCategory) => acc + budgetCategory.budget, 0);
    }).flat();
    moneyInParentCategory.push(budget.totalAmount - moneyInParentCategory.reduce((acc, cat) => acc + cat, 0));
    console.log(colors)

    const chartData = {
        labels: parentCategories,
        datasets:[{
            label:'Money',
            data:moneyInParentCategory,
            backgroundColor:colors,
        },]
    }
    return (
        <div>
            <CategoriesWheel chartData={chartData} text="Budget Plan" legendPosition="bottom"/>
        </div>
    );
};

const mapStateToProps = state => ({
    budget: state.budget.budget,
    activeCategories: state.budget.activeCategories,
    budgetCategories: state.budget.categories,
    allCategories: state.common.categories
});

export default connect(mapStateToProps)(Charts);
