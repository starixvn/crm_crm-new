import React from 'react';
import LangHelper from '@jsroot/common/langHelper';
import * as commonFuns from '../common.functions';

describe('common functions', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn((key) => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('renderSystemOption', () => {

        it('should render option correctly', () => {
            //Arrange
            const systems = {
                id: 1,
                name: 'system'
            };

            //Act
            const option = commonFuns.renderSystemOption(systems);

            //Assert
            expect(option).toEqual(<option key={1} value={1}>system</option>);
        });
    });

    describe('validateFormik', () => {
        it('validate returns true', () => {
            // Arrange
            const values = {
                languageId: 1
            };

            // Action
            const result = commonFuns.validateFormik(values);

            // Assert
            expect(result).toBeTrue;
        });
    });
});