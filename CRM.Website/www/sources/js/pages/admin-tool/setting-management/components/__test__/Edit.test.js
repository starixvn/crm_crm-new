import React from 'react';
import { shallow } from 'enzyme';
import { Edit } from '../Edit';
import { HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { Button, Col, Form, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import LangHelper from '@jsroot/common/langHelper';

describe('Edit', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        LangHelper.getResource = jest.fn((key) => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    const promise = Promise.resolve({});

    const initProps = {
        editNewSetting: jest.fn(() => promise),
        onSuccess: jest.fn(),
        sourceMapping: [],
        editPopup: {
            data:{
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
            }
        }
    };

    describe('validateFormik', () => {
        it('should return exact errors', () => {
            // Arrange
            const values = {
                settingValue: '',
                settingName: ''
            };
            const expected = {
                settingValue: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('SettingValue')),
                settingName: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('SettingName'))
            };

            const container = shallow(<Edit {...initProps}/>).instance();

            // Act
            const actual = container.validateFormik(values);
            
            // Assert
            expect(actual).toEqual(expected);
        });
    });

    describe('handleSubmit', () => {
        it('should call exact function if edit is successful', async() => {
            // Arrange
            const setSubmitting = jest.fn();
            const values = {
                settingId: 1,
                settingName: 'settingName',
                settingValue: 'settingValue',
                displayOrder: 0
            };
            const props = {
                ...initProps,
                editNewSettingResult:{ isSuccessful: true}
            };

            const container = shallow(<Edit {...props}/>).instance();

            // Act
            container.handleSubmit(values, {setSubmitting});
            await promise;
            jest.runAllTimers();

            // Assert
            expect(props.editNewSetting).toHaveBeenCalled();
            expect(props.onSuccess).toHaveBeenCalled();
        });

        it('should call exact function if edit is unsuccessful', async() => {
            // Arrange
            const setSubmitting = jest.fn();
            const values = {
                settingId: 1,
                settingName: 'settingName',
                settingValue: 'settingValue',
                displayOrder: 0
            };
            const props = {
                ...initProps,
                editNewSettingResult:{ isSuccessful: false}
            };

            const container = shallow(<Edit {...props}/>).instance();

            // Act
            container.handleSubmit(values, {setSubmitting});
            await promise;
            jest.runAllTimers();

            // Assert
            expect(setSubmitting).toHaveBeenCalledWith(false);
        });
    });

    describe('renderForm', () => {
        it('should render FormikErrorMessage correctly', () => {
            // Arrange
            const params = {
                values:{},
                errors:{},
                touched:{},
                handleChange: jest.fn(),
                handleSubmit: jest.fn(),
                isSubmitting: jest.fn()
            };
            // Act
            const container = shallow(<Edit {...initProps} />);
            const form = shallow(container.instance().renderForm(params));
            
            // Assert
            expect(form.find(FormikErrorMessage).length).toBe(1);
        });
    });

    describe('render', () => {
        it('should return null', () => {
            // Arrange
            const props = {
                editPopup: {data: null},
                sourceMapping: []
            };
            // Act
            const container = shallow(<Edit {...props} />);
            const actual = container.instance().render();
            // Assert
            expect(actual).toEqual(null);
        });
    });
});