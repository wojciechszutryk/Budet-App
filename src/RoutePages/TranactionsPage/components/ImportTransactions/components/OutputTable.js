import React, {useMemo} from "react";
import {
    StyledImportedTransactionsList,
    StyledImportedTransactionsNumber,
    StyledRead
} from "../ImportTransactionsStyles";
import {SubmitButton} from "components/Button/ButtonStyles";
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import {useMutation, useQueryClient} from "react-query";
import {informationNotification} from "utilities/functions";
import API from "../../../../../data/fetch";

const OutputTable = ({data, budgetCategories, allCategories, activeBudget, otherCategoryId, userId}) => {
    const {t} = useTranslation();
    const queryClient = useQueryClient();

    const budgetCategoriesWithNames = budgetCategories.budgetCategories.map(budgetCategory => (
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
                if (!categoryId) categoryId = otherCategoryId;
                else categoryId = categoryId.categoryId;
                const date = transaction[amountIndex+1].substring(0,10).replaceAll('.','-').split('-')
                const year = date.find(val => val.length === 4);
                const day = date.find(val => val.length === 2);
                const month = date.reverse().find(val => val.length === 2);
                const newDate = year + '-' + month + '-' + day;
                return {
                    categoryId: categoryId.toString(),
                    date: newDate,
                    description: transaction[amountIndex-1].toString(),
                    amount: transaction[amountIndex]
                }
            }
        }
        return null;
    }).filter(trans => trans !== null),[budgetCategoriesWithNames, data, otherCategoryId]);

    const rowsNumber = useMemo( () => transactions.length,[transactions.length]);

    const transactionDescriptions =  Object.entries(transactions).map(transaction => {
        return(
            <li key={transaction[1].id + transaction[1].description + transaction[1].amount*Math.random()}>{transaction[1].description}</li>
        )
    });

    const correctTransactionsToShow = rowsNumber > 7 ? transactionDescriptions.slice(0,7) : transactionDescriptions;

    const addTransactionMutation = useMutation(API.budget.addTransition)

    const handleCheckAndSubmit = () => {
        transactions.forEach(transaction => {
            transaction.budgetId = activeBudget.toString();
            transaction.userId = userId;
            addTransactionMutation.mutate({data: transaction}, {onSuccess: () => {
                queryClient.refetchQueries()
            }})
        })
        informationNotification("Succeeded in adding Transactions");
    };

    return (
        <div>
            <StyledRead>
                {t(`Successfully read `)}
                <StyledImportedTransactionsNumber>
                    {rowsNumber}
                </StyledImportedTransactionsNumber>
                {` ${t('transactions')}${rowsNumber > 7 ? ` ${t("(first 7)")}:` : ':'}`}
            </StyledRead>
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

const ConnectedOutputTable = connect(state =>
    ({
        activeBudget: state.common.activeBudget,
        userId: state.common.userId,
        otherCategoryId: state.budget.otherCategoryId,
    }))
(OutputTable);

export default ConnectedOutputTable;