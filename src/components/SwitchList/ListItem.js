import React from 'react';

const ListItem = ({category, handleOnClick, isActive}) =>  (
    <div>
        <category.Trigger onClick={handleOnClick}/>
        {isActive && category.children}
    </div>
);

export default ListItem;
