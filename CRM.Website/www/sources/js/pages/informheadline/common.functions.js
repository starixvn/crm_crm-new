import React from 'react';
import { Button } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';

export const renderButtonSave = (errors, isClosed, hasHostPermission, handleSubmit) => {
    const isShow = !isClosed && hasHostPermission;
    return (
        Object.keys(errors).length === 0 && (
            <Button variant="primary" size="sm" className="mt-3"
                type="submit"
                style={{display: isShow ? 'block' : 'none'}}
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

const htmlEncode = value => {
    const item = value.replace(/&/g, '&amp;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#39;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;');
    return item;
};

export const remarkEncode = value => {
    const dataEdit = value.map(item => {
        if (item.remark) {
            return {...item, remark: htmlEncode(item.remark)};
        }
        return item;
    });
    return dataEdit;
};