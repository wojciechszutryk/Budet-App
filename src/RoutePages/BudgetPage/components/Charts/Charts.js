import React, {useMemo} from 'react';
import {CategoriesWheel} from "../CategoriesWheel";
import {connect} from "react-redux";
import {groupBy} from "lodash";

const Charts = ({allCategories, activeCategories, budgetCategories, categories}) => {

    const groupedCategories = useMemo(() => groupBy(budgetCategories,
        budgetCategory => allCategories.find(
            category => budgetCategory.categoryId === category.id).parentCategory.name
    ), [allCategories,budgetCategories]);


    console.log(groupedCategories);
    console.log(activeCategories);
    console.log(allCategories);
    console.log(budgetCategories);
    console.log(categories);

    const chartData = {
        labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
        datasets:[{
            label:'Population',
            data:[
                617594,
                181045,
                153060,
                106519,
                105162,
                95072
            ],
            backgroundColor:[
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)'
            ]
        }]
    }
    return (
        <div>
            <CategoriesWheel chartData={chartData} location="Massachusetts" legendPosition="bottom"/>
        </div>
    );
};

const mapStateToProps = state => ({
    activeCategories: state.budget.activeCategories,
    budgetCategories: state.budget.categories,
    categories: state.common.categories,
    allCategories: state.common.categories
});

export default connect(mapStateToProps)(Charts);
