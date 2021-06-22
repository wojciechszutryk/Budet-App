import React, {useMemo} from 'react'
import {Form, Field} from 'react-final-form'
import {groupBy} from 'lodash';
import {FormField, FormGroup, FormSelect, Label, Message} from "components/Input/InputStyles";
import {Button} from "components";
import {useTranslation} from "react-i18next";

const TransactionForm = ({categories, budgetCategories, parentCategories, onSubmit = () => {}}) => {
    const {t} = useTranslation();

    const required = value => (value ? undefined : t('Required'));

    const categoriesInBudget = categories.filter(category =>(
            budgetCategories.find(budgetCat => budgetCat.categoryId === category.id)
    ));

    const groupedCategories = groupBy(categoriesInBudget, 'parentCategory');

    const categoriesToSelect = useMemo(() => Object.entries(groupedCategories).map(category => {
        let label;
        const parentObject = parentCategories.find(parentCategory => (category[0] === parentCategory.id));
        if (parentObject) label = parentObject.name;
        else label = t('Other')
        return <optgroup key={category[0]} label={label}>
            {category[1].map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
        </optgroup>
    }),[groupedCategories, parentCategories, t]);

    return(
        <>
            <h1>{t('Add Transaction')}</h1>
            <Form
                onSubmit={onSubmit}
                initialValues={{ categoryId: "0", date: new Date().toJSON().slice(0,10)}}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit}>
                        <Field name="description" validate={required}>
                            {({ input, meta }) => (
                                <FormGroup>
                                    <FormField {...input} type="text" placeholder="Description"/>
                                    <Label>{t('description')}</Label>
                                    {meta.error && meta.touched && <Message>{meta.error}</Message>}
                                </FormGroup>
                            )}
                        </Field>
                        <Field name="amount" validate={required} parse={value => parseFloat(value,10)}>
                            {({ input, meta }) => (
                                <FormGroup>
                                    <FormField {...input} type="number" step={0.01} placeholder="Amount" min={0.01}/>
                                    <Label>{t('amount')}</Label>
                                    {meta.error && meta.touched && <Message>{meta.error}</Message>}
                                </FormGroup>
                            )}
                        </Field>
                        <Field name="categoryId">
                            {({ input, meta }) => (
                                <FormGroup>
                                    <Label>{t('category')}</Label>
                                    <FormSelect {...input}>
                                        {categoriesToSelect}
                                    </FormSelect>
                                </FormGroup>
                            )}
                        </Field>
                        <Field name="date" validate={required}>
                            {({ input, meta }) => (
                                <FormGroup>
                                    <FormField {...input} type="date"/>
                                    <Label>{t('date')}</Label>
                                </FormGroup>
                            )}
                        </Field>
                        <div className="buttons">
                            <Button buttonType="submit" type="submit" disabled={submitting || pristine}>
                                {t('Submit')}
                            </Button>
                            <Button
                                buttonType="reset"
                                type="button"
                                onClick={form.reset}
                            >
                                Reset
                            </Button>
                        </div>
                    </form>
                )}
            />
        </>
    );
};

export default TransactionForm;
