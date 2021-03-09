import React, {useMemo} from 'react'
import {Form, Field} from 'react-final-form'
import {groupBy} from 'lodash';

const required = value => (value ? undefined : 'Required');

const TransactionForm = ({categories, onSubmit = () => {}}) => {
    const groupedCategories = groupBy(categories, 'parentCategory.name');
    groupedCategories["Other"] = [{id:0, name:"Other"}];

    const categoriesToSelect = useMemo(() => Object.entries(groupedCategories).map(category => (
        <optgroup key={category[0]} label={category[0]}>
            {category[1].map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
        </optgroup>
    )),[groupedCategories]);

    return(
        <>
            <h1>{'Add Transaction'}</h1>
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit}>
                        <Field name="description" validate={required}>
                            {({ input, meta }) => (
                                <div>
                                    <label>Description</label>
                                    <input {...input} type="text" placeholder="Description" />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field>
                        <Field name="amount" validate={required} parse={value => parseFloat(value,10)}>
                            {({ input, meta }) => (
                                <div>
                                    <label>Amount</label>
                                    <input {...input} type="number" step={0.01} placeholder="Amount" />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field>
                        <Field name="category" validate={required}>
                            {({ input, meta }) => (
                                <div>
                                    <label>category</label>
                                    <select {...input}>
                                        {categoriesToSelect}
                                    </select>
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field>
                        <Field name="date" validate={required}>
                            {({ input, meta }) => (
                                <div>
                                    <label>Description</label>
                                    <input {...input} type="date"/>
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field>
                        <div className="buttons">
                            <button type="submit" disabled={submitting}>
                                Submit
                            </button>
                            <button
                                type="button"
                                onClick={form.reset}
                                disabled={submitting || pristine}
                            >
                                Reset
                            </button>
                        </div>
                        <pre>{JSON.stringify(values, 0, 2)}</pre>
                    </form>
                )}
            />
        </>
    );
};

export default TransactionForm;
