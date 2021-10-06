import LangHelper from '@jsroot/common/langHelper';

export const validateFormik = values => {
    const errors = {};
    if (values.doneBy === '') {
        errors.doneBy = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('DoneBy'));
    }
    if (values.subject === '') {
        errors.subject = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Subject'));
    }
    if (values.remark === '') {
        errors.remark = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Remark'));
    }

    return errors;
};