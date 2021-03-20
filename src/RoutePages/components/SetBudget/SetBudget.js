import React from 'react';
import ParentBudget from "./ParentBudget";
import ChildrenBudget from "./ChildrenBudget";
import {SwitchList} from "components";
import {useTranslation} from "react-i18next";

const SetBudget = ({allBudgets, onClick}) => {
    const {t} = useTranslation();
    const categoriesList = {
        id: 'allBudgets',
        Trigger: ({onClick}) => (
            <ParentBudget
                name={t('Set Budget')}
                onClick={() => {
                    onClick(allBudgets);
                }}
                categoriesInside={Object.entries(allBudgets)}
            />
        ),
        children: Object.entries(allBudgets).map(budget => {
            const name = budget[1].name;
            return (<ChildrenBudget
                    onClick={onClick}
                    key={name+budget[1].totalAmount}
                    id={budget[1].id}
                    name={name}
                    budget={budget[1].totalAmount}
                />
            )}),
    };

    return (
        <div>
            <SwitchList
                categories={[].concat(categoriesList)}
            />
        </div>
    );
};

export default SetBudget;
