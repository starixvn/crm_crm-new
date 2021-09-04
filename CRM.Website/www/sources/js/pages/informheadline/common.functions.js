import React from 'react';
import { Button } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';

export const renderButtonSave = (errors, handleSubmit) => {
    return (
        Object.keys(errors).length === 0 && (
            <Button variant="primary" size="sm" className="mt-3"
                type="submit"
                onClick={handleSubmit}
            >
                {LangHelper.getResource('Save')}
            </Button>
        )
    );
};

export const renderButtonClose = onClose => {
    return (
        <Button variant="primary" size="sm" onClick={onClose}>
            {LangHelper.getResource('Close')}
        </Button>
    );
};

const htmlDecode = value => {
    const item = value.replace(/&/g, '&amp;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#39;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;');
    return item;
};

export const remarkDecode = value => {
    const dataEdit = value.map(item => {
        if (item.remark) {
            return {...item, remark: htmlDecode(item.remark)};
        }
        return item;
    });
    return dataEdit;
};