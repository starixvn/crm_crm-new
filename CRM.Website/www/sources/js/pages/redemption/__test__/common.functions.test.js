import LangHelper from '@jsroot/common/langHelper';
import * as commonFunction from '../common.functions';

describe('commonFunctions', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn((key) => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('validateFormik', () => {
        it('return expected errors when values are invalid', () => {
            // Arrange
            const values = {
                doneBy: '',
                subject: '',
                remark: ''
            };
            const expected = {
                doneBy: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('DoneBy')),
                subject: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Subject')),
                remark: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Remark'))
            };

            // Act
            const errors = commonFunction.validateFormik(values);

            // Assert
            expect(errors).toEqual(expected);
        });
    });
});