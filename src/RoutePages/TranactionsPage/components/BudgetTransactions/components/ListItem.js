import React from 'react';
import {StyledListItem} from "../BudgetTransactionsStyles";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {DeleteButton} from "components/Button/ButtonStyles";
import {connect} from "react-redux";
import {removeTransaction} from "data/actions/budgetActions";
import {useMutation, useQueryClient} from "react-query";

const ListItem = ({amount, category, date, description,id, removeTransaction}) => {
    const queryClient = useQueryClient();
    const removeTransactionMutation = useMutation(removeTransaction, {
        onSuccess: () => {
            queryClient.invalidateQueries('budget');
        },
    })
    const handleRemoveTransaction = () => {
        removeTransactionMutation.mutate(id);
    }
    return (
        <StyledListItem>
            <span>{description}</span>
            <span>{amount}</span>
            <span>{date}</span>
            <span>{category}</span>
            <DeleteButton onClick={() => handleRemoveTransaction(id)}><FontAwesomeIcon icon={faTrashAlt} /></DeleteButton>
        </StyledListItem>
    );
};

const ConnectedListItem = connect(null, {removeTransaction})(ListItem);

export default ConnectedListItem;
