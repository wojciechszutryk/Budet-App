import React, {useMemo} from "react";
import {StyledImportedTransactionsList, StyledImportedTransactionsNumber} from "../ImportTransactionsStyles";
import {SubmitButton} from "components/Button/ButtonStyles";
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import {addTransition} from "data/actions/budgetActions";

const OutputTable = ({data, addTransition, budgetCategories, allCategories, activeBudget}) => {
    const {t} = useTranslation();

    const budgetCategoriesWithNames = budgetCategories.map(budgetCategory => (
        {...budgetCategory, ...allCategories.find(category => budgetCategory.categoryId === category.id)}
        ));

    const transactions = useMemo(() => data.map(transaction => {
        if(transaction.length >= 4) {
            const amountIndex = transaction.map(field => {
                if (typeof(field) === 'number' && !Number.isNaN(field)) return transaction.indexOf(field)
                return null;
            }).find(type => type !== null);
            if (amountIndex && typeof(transaction[amountIndex-1])==='string'
                && typeof(transaction[amountIndex+1])==='string' && typeof(transaction[amountIndex+2])==='string'){
                let categoryId = budgetCategoriesWithNames.find(category => category.name === transaction[amountIndex+2]);
                if (!categoryId) categoryId = 0;
                else categoryId = categoryId.categoryId;
                return {
                    categoryId: categoryId.toString(),
                    data: transaction[amountIndex+1].substring(0,10),
                    description: transaction[amountIndex-1].toString(),
                    amount: transaction[amountIndex]
                }
            }
        }
        return null;
    }).filter(trans => trans !== null),[budgetCategoriesWithNames, data]);

    const rowsNumber = useMemo( () => transactions.length,[transactions.length]);

    const transactionDescriptions =  Object.entries(transactions).map(transaction => {
        return(
            <li key={transaction[1].id + transaction[1].description + transaction[1].amount*Math.random()}>{transaction[1].description}</li>
        )
    })

    const correctTransactionsToShow = rowsNumber > 7 ? transactionDescriptions.slice(0,7) : transactionDescriptions;

    const handleCheckAndSubmit = () => {
        console.log(transactions);
        transactions.forEach(transaction =>
            addTransition({
                budgetId: activeBudget.toString(),
                data: transaction
            })
        )
    };

    return (
        <div>
            <span>
                {t(`Successfully read `)}
                <StyledImportedTransactionsNumber>
                    {rowsNumber}
                </StyledImportedTransactionsNumber>
                {` ${t('transactions')}${rowsNumber > 7 ? ` ${t("(first 7)")}:` : ':'}`}
            </span>
            <StyledImportedTransactionsList>
                {correctTransactionsToShow}
            </StyledImportedTransactionsList>
            <SubmitButton
                disabled={rowsNumber===0}
                onClick={handleCheckAndSubmit}
            >
                {rowsNumber>0 ? t('add')+' '+rowsNumber+' '+t('transactions') : t('Attach correct file')}
            </SubmitButton>
        </div>
    );
};

const ConnectedOutputTable = connect(state => ({
    activeBudget: state.common.activeBudget,
    budgetCategories: state.budget.categories,
    allCategories: state.common.categories,
}),
    {addTransition})(OutputTable);

export default ConnectedOutputTable;