import React from 'react';
import ParentBudget from "./ParentBudget";
import ChildrenBudget from "./ChildrenBudget";
import {SwitchList} from "components";
import {useTranslation} from "react-i18next";

const SetBudget = ({allBudgets, setCurrentBudget, handleRemoveBudget, activeBudget}) => {
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
            const isActive = activeBudget.toString() === budget[1].id;
            return (<ChildrenBudget
                    key={name+budget[1].totalAmount}
                    setCurrentBudget={setCurrentBudget}
                    disabled={isActive}
                    id={budget[1].id}
                    name={name}
                    handleRemoveBudget={handleRemoveBudget}
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
