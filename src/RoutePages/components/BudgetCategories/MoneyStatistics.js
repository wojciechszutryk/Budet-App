import React from 'react';
import {Money, MoneyLeft, MoneyWrapper} from "./BudgetCategoriesStyles";

const MoneyStatistics = ({moneyLeft, allMoney, isMoneyLeft}) => {
    return (
        <MoneyWrapper>
            <MoneyLeft money={isMoneyLeft}>
                {(parseInt(moneyLeft).toFixed(2)).toString()}
            </MoneyLeft>
            <span style={{color: 'black'}}> / </span>
            <Money>
                {allMoney.toString()}
            </Money>
        </MoneyWrapper>
    );
};

export default MoneyStatistics;
