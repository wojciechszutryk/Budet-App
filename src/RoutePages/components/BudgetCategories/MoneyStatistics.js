import React from 'react';
import {Money, MoneyLeft, MoneyWrapper} from "./BudgetCategoriesStyles";

const MoneyStatistics = ({moneyLeft, allMoney, isMoneyLeft}) => {
    return (
        <MoneyWrapper>
            <MoneyLeft money={isMoneyLeft}>
                {moneyLeft}
            </MoneyLeft>
            <span style={{color: 'black'}}> / </span>
            <Money>
                {allMoney}
            </Money>
        </MoneyWrapper>
    );
};

export default MoneyStatistics;
