import React from 'react';
import LangHelper from '@jsroot/common/langHelper';

function ReminderRating({value}) {
    return (
        parseInt(value, 10) === 0 && <div className='reminder-rating'>{LangHelper.getResource('ReminderRating')}</div>
    );
}

export default ReminderRating;
