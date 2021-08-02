import React from 'react';
import { shallow } from 'enzyme';
import { CreateForm } from '../CreateForm';
import Site from '@jsroot/common/site';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';
import * as shareScripts from '@jsroot/common/shareScripts';
import * as commonFuncs from '../../../../common.functions';

describe('CreateForm - validateFormik', () => {
    beforeAll(() => {
        LangHelper.formatString = jest.fn(() => 'error message');
        LangHelper.getResource = jest.fn(key => key);
        commonFuncs.validateMainCategorySubCategory = jest.fn();
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    const defaultProps = {
        verifyCustomerResults: [{ custId: 1 }],
        settings: {
            extensions: [{ id: 1 }],
            languages: [{ languageId: 1 }],
            countries: [{ id: 1, name: 'eng' }],
            statuses: [{ statusId: 1 }],
            responses: [{ id: 1 }],
            mainCategories: [],
            subCategories: []
        }
    };
    const defaultValues = {
        startTime: '7/28/2021 2:26 PM',
        endTime: '7/28/2021 2:27 PM',
        isUseDefaultCommunicationTool: true,
        communicationToolIds: '',
        isUseDefaultLanguage: true,
        languageId: 1,
        mainCategoryIds: '',
        subCategoryIds: '',
        subject: 'subject',
        remark: 'remark',
        solution: 'solution'
    };

    it('should return correct errors when do not have valid customer', () => {
        // Arrange
        const props = {
            ...defaultProps,
            verifyCustomerResults: [{ custId: 0 }]
        };
        const container = shallow(<CreateForm {...props} />).instance();

        // Act
        const actual = container.validateFormik(defaultValues);

        // Assert
        expect(commonFuncs.validateMainCategorySubCategory).toHaveBeenCalledWith({ customerNameInput: 'ListofcustomersRequired' }, '', '', [], []);
        expect(actual).toEqual({ customerNameInput: 'ListofcustomersRequired' });
        expect(LangHelper.getResource).toHaveBeenCalledWith('ListofcustomersRequired');
    });

    it('should return correct errors when startTime is greater than endTime', () => {
        // Arrange
        const values = {
            ...defaultValues,
            startTime: '7/28/2021 2:26 PM',
            endTime: '7/28/2021 2:25 PM'
        };
        const container = shallow(<CreateForm {...defaultProps} />).instance();

        // Act
        const actual = container.validateFormik(values);

        // Assert
        expect(commonFuncs.validateMainCategorySubCategory).toHaveBeenCalledWith({ startTime: 'error message' }, '', '', [], []);
        expect(actual).toEqual({ startTime: 'error message' });
        expect(LangHelper.formatString).toHaveBeenCalledWith('FieldLessThanOrEqualTo', 'StartTime', 'EndTime');
    });

    it('should return correct errors when isUseDefaultCommunicationTool = false and communicationToolIds is invalid', () => {
        // Arrange
        const values = {
            ...defaultValues,
            isUseDefaultCommunicationTool: false,
            communicationToolIds: ''
        };
        const container = shallow(<CreateForm {...defaultProps} />).instance();

        // Act
        const actual = container.validateFormik(values);

        // Assert
        expect(commonFuncs.validateMainCategorySubCategory).toHaveBeenCalledWith({ communicationToolIds: 'error message' }, '', '', [], []);
        expect(actual).toEqual({ communicationToolIds: 'error message' });
        expect(LangHelper.formatString).toHaveBeenCalledWith('FieldRequired', 'CommunicationTool');
    });

    it('should return correct errors when isUseDefaultLanguage = false and languageId is invalid', () => {
        // Arrange
        const values = {
            ...defaultValues,
            isUseDefaultLanguage: false,
            languageId: 0
        };
        const container = shallow(<CreateForm {...defaultProps} />).instance();

        // Act
        const actual = container.validateFormik(values);

        // Assert
        expect(commonFuncs.validateMainCategorySubCategory).toHaveBeenCalledWith({ languageId: 'error message' }, '', '', [], []);
        expect(actual).toEqual({ languageId: 'error message' });
        expect(LangHelper.formatString).toHaveBeenCalledWith('FieldRequired', 'Language');
    });

    it('should return correct errors when subject is invalid', () => {
        // Arrange
        const values = {
            ...defaultValues,
            subject: ''
        };
        const container = shallow(<CreateForm {...defaultProps} />).instance();

        // Act
        const actual = container.validateFormik(values);

        // Assert
        expect(commonFuncs.validateMainCategorySubCategory).toHaveBeenCalledWith({ subject: 'error message' }, '', '', [], []);
        expect(actual).toEqual({ subject: 'error message' });
        expect(LangHelper.formatString).toHaveBeenCalledWith('FieldRequired', 'Subject');
    });

    it('should return correct errors when remark is invalid', () => {
        // Arrange
        const values = {
            ...defaultValues,
            remark: ''
        };
        const container = shallow(<CreateForm {...defaultProps} />).instance();

        // Act
        const actual = container.validateFormik(values);

        // Assert
        expect(commonFuncs.validateMainCategorySubCategory).toHaveBeenCalledWith({ remark: 'error message' }, '', '', [], []);
        expect(actual).toEqual({ remark: 'error message' });
        expect(LangHelper.formatString).toHaveBeenCalledWith('FieldRequired', 'Remark');
    });

    it('should return correct errors when solution is invalid', () => {
        // Arrange
        const values = {
            ...defaultValues,
            solution: ''
        };
        const container = shallow(<CreateForm {...defaultProps} />).instance();

        // Act
        const actual = container.validateFormik(values);

        // Assert
        expect(commonFuncs.validateMainCategorySubCategory).toHaveBeenCalledWith({ solution: 'error message' }, '', '', [], []);
        expect(actual).toEqual({ solution: 'error message' });
        expect(LangHelper.formatString).toHaveBeenCalledWith('FieldRequired', 'Solution');
    });
});