import React from 'react';
import LangHelper from '@jsroot/common/langHelper';
import * as commonFunc from '../common.functions';

describe('common functions', () => {
    const mockDate = new Date(123456);
    const spy = jest
        .spyOn(global, 'Date')
        .mockImplementation(() => mockDate);

    beforeAll(() => {
        LangHelper.getResource = jest.fn(key => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
        spy.mockRestore();
    });

    describe('renderOption', () => {
        it('should render option correctly', () => {
            // Arrange
            const notificationType = {
                settingId: 1,
                settingValue: 'Vietnam'
            };

            // Act
            const option = commonFunc.renderOption(notificationType, 'settingId', 'settingValue');

            // Assert
            expect(option).toEqual(<option key={1} value={1}>Vietnam</option>);
        });
    });

    describe('validate', () => {
        it('return expected errors when values are invalid', () => {
            // Arrange
            const values = {};
            const expected = {
                picName: 'NameRequired',
                roleId: 'RoleRequired',
                communication: 'CommunicationRequired'
            };

            // Act
            const errors = commonFunc.validateFormik(values);

            // Assert
            expect(errors).toEqual(expected);
        });

        it('return expected errors when picName is empty', () => {
            // Arrange
            const values = { communication123: { type: 1, value: 'asd' }, roleId: 11, picName: '' };
            const expected = {
                picName: 'NameRequired'
            };

            // Act
            const errors = commonFunc.validateFormik(values);

            // Assert
            expect(errors).toEqual(expected);
        });

        it('return expected errors when roleId is undefined', () => {
            // Arrange
            const values = { communication123: { type: 1, value: 'asd' }, picName: 'asd' };
            const expected = {
                roleId: 'RoleRequired'
            };

            // Act
            const errors = commonFunc.validateFormik(values);

            // Assert
            expect(errors).toEqual(expected);
        });

        it('return expected errors when communication is null', () => {
            // Arrange
            const values = { roleId: 1, picName: 'asd' };
            const expected = {
                communication: 'CommunicationRequired'
            };

            // Act
            const errors = commonFunc.validateFormik(values);

            // Assert
            expect(errors).toEqual(expected);
        });

        it('return expected errors when communication do not have value', () => {
            // Arrange
            const values = { roleId: 1, picName: 'asd', communication123: { type: 1 } };
            const expected = {
                communication123: 'CommunicationMustHaveValue'
            };

            // Act
            const errors = commonFunc.validateFormik(values);

            // Assert
            expect(errors).toEqual(expected);
        });

        it('return expected errors when communication do not have type', () => {
            // Arrange
            const values = { roleId: 1, picName: 'asd', communication123: { value: 'aa' } };
            const expected = {
                communication123: 'CommunicationMustHaveValue'
            };

            // Act
            const errors = commonFunc.validateFormik(values);

            // Assert
            expect(errors).toEqual(expected);
        });
    });

    describe('getTemplateCommunicationTool', () => {
        it('should return expected', () => {
            // Arrange
            const expected = { type: '', value: '', unique: 123456 };

            // Act
            const actual = commonFunc.getTemplateCommunicationTool();

            // Assert
            expect(actual).toEqual(expected);
        });
    });
});