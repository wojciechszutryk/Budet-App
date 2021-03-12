import React from 'react';
import {StyledListItem} from "../BudgetTransactionsStyles";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {DeleteButton} from "components/Button/ButtonStyles";
import {connect} from "react-redux";
import {removeTransaction} from "data/actions/budgetActions";

const ListItem = ({amount, category, date, description,id, removeTransaction, budget}) => {
    const handleShowAllTransaction = () => {
        console.log('deleting '+id)
        removeTransaction(id);
    }
    console.log(budget.transactions)
    return (
        <StyledListItem>
            <span>{description}</span>
            <span>{amount}</span>
            <span>{date}</span>
            <span>{category}</span>
            <DeleteButton onClick={handleShowAllTransaction}><FontAwesomeIcon icon={faTrashAlt} /></DeleteButton>
        </StyledListItem>
    );
};

const ConnectedListItem = connect(
    state => ({
        budget: state.budget.budget,
    }),
    {
        removeTransaction
    }
)(ListItem);

export default ConnectedListItem;
