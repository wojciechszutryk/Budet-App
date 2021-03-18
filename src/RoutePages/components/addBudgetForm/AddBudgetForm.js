import React, {useState, useMemo} from 'react'
import {FormField, FormGroup, Label, Message} from "components/Input/InputStyles";
import {Button} from "components";
import {useTranslation} from "react-i18next";
import Select from 'react-select'
import {Link} from "react-router-dom";

const AddBudgetForm = ({categories, onSubmit}) => {
    const {t} = useTranslation();
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [budgetFounds, setBudgetFounds] = useState(0);
    const [budgetName, setBudgetName] = useState('');
    const [FoundsError, setFoundsError] = useState(true);
    const [NameError, setNameError] = useState(true);

    const handleNameChange = (event) => {
        if (event.target.value) setNameError(false)
        setBudgetName(event.target.value);
    }
    const handleFoundsChange = (event) => {
        if (event.target.value) setFoundsError(false)
        setBudgetFounds(event.target.value);
    }

    const resetForm = () => {
        document.getElementById("budgetForm").reset();
        setBudgetFounds(0);
        setBudgetName('');
        setSelectedCategories([]);
    }

    const handleSubmit = () => {
        if (budgetName==='') setNameError(true);
        if (budgetFounds<=0) setFoundsError(true);
        if (!NameError && !FoundsError){
            onSubmit({
                name: budgetName,
                categories: selectedCategories,
                totalAmount: budgetFounds
            })
        }
    }

    const categoriesToSelect = useMemo(() => Object.entries(categories).map(category => (
        {value: category[1].id, label:category[1].name}
    )),[categories]);

    return(
        <>
            <h1>{t('Add Budget')}</h1>
            <form id="budgetForm">
                <FormGroup>
                    <FormField
                        type="text"
                        placeholder="Name"
                        onChange={handleNameChange}
                    />
                    <Label>{t('name')}</Label>
                    {NameError ? <Message>{t('Required')}</Message> : null}
                </FormGroup>

                <FormGroup>
                    <FormField
                        type="number"
                        step={0.01}
                        placeholder="Amount"
                        min={0.01}
                        onChange={handleFoundsChange}
                    />
                    <Label>{t('amount')}</Label>
                    {FoundsError ? <Message>{t('Required')}</Message> : null}
                </FormGroup>

                <FormGroup>
                    <Select
                        onChange={setSelectedCategories}
                        placeholder={t('category')}
                        closeMenuOnSelect={false}
                        isMulti
                        options={categoriesToSelect}
                    />
                </FormGroup>

                <FormGroup>
                    <Link  to='/budget/categories'>
                        <Button
                            disabled={NameError || FoundsError}
                            buttonType='submit'
                            type='submit'
                            onClick={handleSubmit}
                        >{t('Next')}</Button>
                    </Link>
                    <Button
                        buttonType="reset"
                        type="button"
                        onClick={resetForm}
                    >
                        Reset
                    </Button>
                </FormGroup>
            </form>
        </>
    );
};

export default AddBudgetForm;
