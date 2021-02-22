import React, {useState} from 'react';
import ListItem from "./ListItem";

const SwitchList = ({categories}) => {
    const [activeCategories, setActiveCategories] = useState([]);

    const handleOnClick = (id) => {
        if (activeCategories.includes(id)) {
            const index = activeCategories.indexOf(id);
            const copy = [...activeCategories];
            copy.splice(index, 1);
            setActiveCategories(copy);
        }
        else {
            const copy = [...activeCategories];
            setActiveCategories([...copy, id]);
        }
    }

    const categoriesList = categories.map(category =>
        <ListItem
            key={category.id}
            category={category}
            handleOnClick={() => handleOnClick(category.id)}
            isActive={activeCategories.includes(category.id)}
        />
    );

    return (
        <>
            {categoriesList}
        </>
    );
};

export default SwitchList;
