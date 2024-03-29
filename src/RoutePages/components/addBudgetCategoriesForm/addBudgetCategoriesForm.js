import React, {useState, useMemo} from 'react'
import {FormField, FormGroup, Label} from "components/Input/InputStyles";
import {Button} from "components";
import {useTranslation} from "react-i18next";
import {BudgetAmount, BudgetName, OtherMoney} from "./addBudgetCategoriesFormStyles";
import {setCurrency} from "utilities/functions";
import {Link, useHistory } from "react-router-dom";

const AddBudgetCategoriesForm = ({name, totalAmount, categories=[], onSubmit}) => {
    const [budgetCategoriesFounds, setBudgetCategoriesFounds] = useState({});
    const [budgetOvervaluedError, setBudgetOvervaluedError] = useState(true);
    const [otherCategoriesFounds, setOtherCategoriesFounds] = useState(totalAmount);
    const [redirect, setRedirect] = useState(false);
    const {t} = useTranslation();
    let history = useHistory();

    useMemo(() =>{
        if (!name || !totalAmount) setRedirect(true);
    },[name, totalAmount]);

    useMemo(() => {
        let totalCurrentCategoriesFounds = 0;
        Object.entries(budgetCategoriesFounds).forEach(category => {
            totalCurrentCategoriesFounds += category[1];
        });
        totalCurrentCategoriesFounds > totalAmount ? setBudgetOvervaluedError(true) : setBudgetOvervaluedError(false);
        Object.entries(budgetCategoriesFounds).forEach(category => {
            if (!category[1] || category[1] === 0) setBudgetOvervaluedError(true);
        });
        const inputs = document.querySelectorAll('input');
        for (let i = 0; i < inputs.length; i++) {
            if(inputs[i].value === ""){
                setBudgetOvervaluedError(true);
            }
        }
        setOtherCategoriesFounds(totalAmount-totalCurrentCategoriesFounds);
        if (!categories || categories.length === 0) setBudgetOvervaluedError(false);
    },[budgetCategoriesFounds, categories, totalAmount])

    const handleError = () => {
        history.push('/budget');
        window.location.reload();
    }

    const resetForm = () => {
        document.getElementById("budgetCategoriesForm").reset();
        setOtherCategoriesFounds(totalAmount);
    };

    const handleFoundsChange = (id, e) => {
        const categoryFounds = {}
        categoryFounds[id]=parseInt(e.target.value);
        setBudgetCategoriesFounds({...budgetCategoriesFounds, ...categoryFounds});
    };

    const handleSubmit = () => {
        onSubmit({
            name,
            totalAmount,
            categories: budgetCategoriesFounds,
        });
    };

    const categoriesFoundsList = categories.map(category => {
        return(
            <FormGroup key={category.value}>
                <FormField type="number" onChange={(e) => handleFoundsChange(category.value, e)}/>
                <Label>{category.label}</Label>
            </FormGroup>
        )
    });

    return(
        redirect ? handleError() :
        <>
            <BudgetName>{name}</BudgetName>
            <span> {t('Founds')}</span>
            <div>
                <span>{t('Budget Amount')}: </span>
                <BudgetAmount>{setCurrency(totalAmount)}</BudgetAmount>
            </div>

            <form id="budgetCategoriesForm">
                <div>
                    {categoriesFoundsList}
                </div>
                <OtherMoney>
                    <span>{t('Other')} </span>:
                    {otherCategoriesFounds > 0 ?
                        <BudgetAmount>{setCurrency(otherCategoriesFounds)}</BudgetAmount>
                        : <BudgetName>{setCurrency(otherCategoriesFounds)}</BudgetName>}
                </OtherMoney>
                <div>
                    <Link to='/budget'>
                        <Button
                            buttonType='submit'
                            type='submit'
                            disabled={budgetOvervaluedError}
                            onClick={handleSubmit}
                        >
                            {t('Submit')}
                        </Button>
                    </Link>
                    <Button
                        buttonType="reset"
                        type="button"
                        onClick={resetForm}
                    >
                        Reset
                    </Button>
                </div>
            </form>
        </>
    );
};

export default AddBudgetCategoriesForm;