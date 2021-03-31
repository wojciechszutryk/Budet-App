import React from 'react';
import {Bar} from 'react-chartjs-2';
import {useTranslation} from "react-i18next";

const MoneyBar = ({colors,moneySpentOnCategory,moneyBudgetedOnCategory,BudgetCategories, text, lightTheme}) => {
    const {t} = useTranslation();
    return (
        <div className="chart table-responsive">
            <Bar
                data={{
                    labels: BudgetCategories,
                    datasets:[
                        {
                            label: t("Money spent on category"),
                            backgroundColor: 'rgb(89, 89, 89)',
                            data: moneySpentOnCategory,
                        },
                        {
                            label: t("Available category Founds"),
                            backgroundColor: colors,
                            data: moneyBudgetedOnCategory,
                        },
                    ],
                }}
                options={{
                    maintainAspectRatio: false,
                    title:{
                        display: true,
                        text: text,
                        fontSize: 25,
                        fontColor: (lightTheme ? "#333" : "#ddd")
                    },
                    legend:{
                        display:true,
                        position: 'bottom',
                        labels: {
                            fontColor: (lightTheme ? "#333" : "#ddd"),
                            fontSize: 12
                        }
                    },
                }}
            />
        </div>
    )
}

export default MoneyBar;