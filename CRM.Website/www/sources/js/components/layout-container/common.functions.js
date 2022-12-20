import React from 'react';

export const renderSystemOption = item => {
    return (
        <option key={item.id} value={item.id} >{item.name}</option>
    );
};

const functions = {
    renderSystemOption
};

export default functions;