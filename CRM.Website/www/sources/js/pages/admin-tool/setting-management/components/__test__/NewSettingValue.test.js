import React from 'react';
import { NewSettingValue } from '../NewSettingValue';
import { shallow } from 'enzyme';
import { Form } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';

describe('NewSettingValue', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        LangHelper.getResource = jest.fn((key) => key);
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    const response = {
        isSuccessful: true
    };
    const promise = Promise.resolve(response);
    const initProps = {
        parents: [{
            childSettings: [],
            displayOrder: 0,
            id: 0,
            isActive: true,
            isChild: false,
            mainCategoryID: 0,
            name: null,
            parentID: 0,
            settingId: 68005,
            settingName: "111111111",
            settingSource: null,
            settingValue: "TestRuby1",
            subCategoryId: 0
        }],
        mainSettings: [{
            settingName: 'settingName',
            childSettings: [{
                settingValue: 'settingValue'
            }]
        }],
        getParentSettings: jest.fn(),
        insertNewSetting: jest.fn(() => promise),
        settingName: '',
        onSuccess: jest.fn()
    };

    describe('componentDidMount', () => {
        it('should call exact function', () => {
            // Arrange
            const container = shallow(<NewSettingValue {...initProps} />).instance();
            //Act
            container.componentDidMount();
            // Assert
            expect(initProps.getParentSettings).toHaveBeenCalled();
        });
    });

    describe('validateFormik', () => {
        it('should return exact errors when exist setting value', () => {
            // Arrange
            const expectErrors = {
                settingName: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('SettingName')),
                //settingValue: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('SettingValue')),
                settingValue: LangHelper.getResource('SettingExistedAlready')
            };
            const values = {
                settingName: '',
                settingValue: '1'
            };
            const container = shallow(<NewSettingValue {...initProps} />).instance();
            container.isCheckSettingValue = jest.fn(() => false);
            //Act
            const actual = container.validateFormik(values);
            // Assert
            expect(actual).toEqual(expectErrors);
        });

        it('should return exact errors when setting value is null', () => {
            // Arrange
            const expectErrors = {
                settingName: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('SettingName')),
                settingValue: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('SettingValue')),
            };
            const values = {
                settingName: '',
                settingValue: ''
            };
            const container = shallow(<NewSettingValue {...initProps} />).instance();
            //Act
            const actual = container.validateFormik(values);
            // Assert
            expect(actual).toEqual(expectErrors);
        });
    });

    describe('isCheckSettingValue ', () => {
        it('should return exact value', () => {
            // Arrange
            const values = {
                settingName: 'settingName',
                settingValue: 'settingValue'
            };
            const container = shallow(<NewSettingValue {...initProps} />).instance();

            //Act
            const actual = container.isCheckSettingValue(values);
            // Assert
            expect(actual).toEqual(false);

        });
    });

    describe('handleSubmit', () => {
        it('should call exactly function if insert is successfully',async () => {
            // Arrange
            const values = {
                settingName: 'settingName',
                settingValue: 'settingName',
                displayOrder: 1,
                parentId: 1
            };
            const props = {...initProps, insertNewSettingResult:{isSuccessful: true}};
            const setSubmitting = jest.fn();
            const container = shallow(<NewSettingValue {...props} />).instance();

            //Act
            container.handleSubmit(values, {setSubmitting});
            await promise;
            jest.runAllTimers();
            // Assert
            expect(setSubmitting).toHaveBeenCalledWith(true);
            expect(props.insertNewSetting).toHaveBeenCalled();
            expect(props.onSuccess).toHaveBeenCalled();
        });
        it('should call exactly function if insert is unsuccessfully',async () => {
            // Arrange
            const values = {
                settingName: 'settingName',
                settingValue: 'settingName',
                displayOrder: 1,
                parentId: 1
            };
            const props = {...initProps, insertNewSettingResult:{isSuccessful: false}};
            const setSubmitting = jest.fn();
            const container = shallow(<NewSettingValue {...props} />).instance();

            //Act
            container.handleSubmit(values, {setSubmitting});
            await promise;
            jest.runAllTimers();
            // Assert
            expect(setSubmitting).toHaveBeenCalledWith(false);
        });
    });

    describe('renderForm', () => {
        it('should call exactly function if form pic type is changed', () => {
            // Arrange
            const values = {
                settingName: 'settingName',
                settingValue: 'settingName',
                displayOrder: 1,
                parentId: 1
            };
            const paramFormik = {
                values: values,
                errors: {},
                touched: {},
                handleChange: jest.fn(),
                handleSubmit: jest.fn(),
                setFieldValue: jest.fn()
            };
            const container = shallow(<NewSettingValue {...initProps} />).instance();

            //Act
            const row = shallow(container.renderForm(paramFormik));
            row.find(Form.Control).at(2).simulate('change',{target: {value: 'test'}});
            // Assert
            expect(paramFormik.setFieldValue).toHaveBeenCalled();
        });

        it('should call exactly function if form display order is changed', () => {
            // Arrange
            const values = {
                settingName: 'settingName',
                settingValue: 'settingName',
                displayOrder: 1,
                parentId: 1
            };
            const paramFormik = {
                values: values,
                errors: {},
                touched: {},
                handleChange: jest.fn(),
                handleSubmit: jest.fn(),
                setFieldValue: jest.fn()
            };
            const container = shallow(<NewSettingValue {...initProps} />).instance();

            //Act
            const row = shallow(container.renderForm(paramFormik));
            row.find(Form.Control).at(3).simulate('change');
            // Assert
            expect(paramFormik.handleChange).toHaveBeenCalled();
        });
    });

    describe('render', () => {
        it('should return null', () => {
            // Arrange
            const props = {...initProps, parents: null};
            const container = shallow(<NewSettingValue {...props} />).instance();

            //Act
            const actual = container.render();
            // Assert
            expect(actual).toEqual(null);
        });
    });
});