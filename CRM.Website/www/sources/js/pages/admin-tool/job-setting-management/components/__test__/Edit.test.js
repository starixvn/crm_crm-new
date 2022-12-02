import React from 'react';
import { shallow } from 'enzyme';
import { Edit } from '../Edit';
import LangHelper from '@jsroot/common/langHelper';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import DatePicker from '@jsroot/components/date-picker/index';

describe('Edit', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn((key) => key);
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    const response = { data: {} };
    const promise = Promise.resolve(response);

    const initProps = {
        editPopup:{
            show: true,
            isEditMultiple: false,
            data:{id: 1, settingName: "ConfigUAT", value: "1", serviceName: "AmendmentNotiFB", dataType: "Boolean"}
        },
        onSuccess: jest.fn(),
        editJobSetting: jest.fn(() => promise),
        editJobSettingResult: { isSuccessful: true}
    };

    describe('validateFormik', () => {
        it('should return exact error',() => {
            // Arrange
            const values = {
                dataType: 'String',
                value: '',
                settingName: 'ConfigUAT'
            };
            const expected = {
                settingName: LangHelper.formatString(LangHelper.getResource('FieldRequired'), values.settingName)
            };
            //Act
            const container = shallow(<Edit {...initProps} />).instance();
            const actual = container.validateFormik(values);
            // Assert
            expect(actual).toEqual(expected);
        });
    });

    describe('getParamCheckboxType', () => {
        it.each([
            ['Boolean', true, 1],
            ['DateTime','2022-01-01 09:01', '2022-01-01 09:01:00'],
            ['String', 'test', 'test']
        ])('should return exact value with datatype', (dataType, value ,expected) => {
            // Arrange
            const values = {
                dataType: dataType,
                value: value,
                settingName: 'ConfigUAT'
            };
            
            //Act
            const container = shallow(<Edit {...initProps} />).instance();
            const actual = container.getParamCheckboxType(values);
            // Assert
            expect(actual).toEqual(expected);
        });
    });

    describe('renderByDataType', () => {
        it.each([
            'Boolean',
            'DateTime',
            'Int32',
            'string'
        ])('should call exact value with datatype', (dataType) => {
            // Arrange
            const values = {
                dataType: dataType,
                value: 'value',
                settingName: 'ConfigUAT'
            };

            const setFieldValue = jest.fn();
            const handleChange = jest.fn();
            
            //Act
            const container = shallow(<Edit {...initProps} />).instance();
            container.renderCheckbox = jest.fn(() => <div />);
            container.renderDateTime = jest.fn(() => <div />);
            container.renderNumber = jest.fn(() => <div />);
            container.renderFormControl = jest.fn(() => <div />);

            const actual = container.renderByDataType(values, setFieldValue, handleChange, {}, {});


            // Assert
            expect(actual).toEqual(<div />);
        });
    });

    describe('handleSubmit ', () => {
        it('should call exact function', async () => {
            // Arrange
            const values = {
                id: 1,
                dataType: 'Boolean',
                value: 1,
                settingName: 'ConfigUAT'
            };
            const setSubmitting = jest.fn();

            //Act
            const container = shallow(<Edit {...initProps} />).instance();
            container.confirmEdit = jest.fn();
            container.handleSubmit(values,{setSubmitting});
            await promise;
            jest.runAllTimers();

            // Assert
            expect(container.confirmEdit).toHaveBeenCalled();
        });

        it('should call exact function when edit multiple', async () => {
            // Arrange
            const values = {
                id: '1, 2',
                serviceName: 'test, test1',
                dataType: 'Boolean',
                value: 1,
                settingName: 'ConfigUAT'
            };
            const setSubmitting = jest.fn();
            const expectedParams = {
                Settings: [
                { ID: '1', SETTING: 'ConfigUAT', VALUE: '0', SERVICENAME: 'test' },
                { ID: '2', SETTING: 'ConfigUAT', VALUE: '0', SERVICENAME: 'test1' }
            ]};
            const props = {...initProps, editPopup:{...initProps.editPopup, isEditMultiple: true}};

            //Act
            const container = shallow(<Edit {...props} />).instance();
            container.confirmEdit = jest.fn();
            container.handleSubmit(values,{setSubmitting});
            await promise;
            jest.runAllTimers();

            // Assert
            expect(container.confirmEdit).toHaveBeenCalledWith(expectedParams);
        });
    });

    describe('handleCloseConfirmEditDialog', () => {
        it('should call exact function', () => {
            // Arrange
            const expected = {
                show: false, params: null
            };
            const container = shallow(<Edit {...initProps} />).instance();
            container.formik = {
                setSubmitting: jest.fn()
            };
            //Act
            container.handleCloseConfirmEditDialog();

            // Assert
            expect(container.state.confirmEditDialog).toEqual(expected);
            expect(container.formik.setSubmitting).toHaveBeenCalledWith(false);
        });
    });

    describe('confirmEdit', () => {
        it('should set exact state', () => {
            // Arrange
            const expected = {
                show: true, params: {}
            };
            const container = shallow(<Edit {...initProps} />).instance();
            //Act
            container.confirmEdit({});

            // Assert
            expect(container.state.confirmEditDialog).toEqual(expected);
        });
    });


    describe('handleEdit', () => {
        it('should call exact function', async () => {
            // Arrange
            const state = {
                confirmEditDialog: {
                    params: {
                        Settings: [
                            { ID: '1', SETTING: 'ConfigUAT', VALUE: '0', SERVICENAME: 'test' },
                            { ID: '2', SETTING: 'ConfigUAT', VALUE: '0', SERVICENAME: 'test1' }]
                    }
                }
            };

            //Act
            const container = shallow(<Edit {...initProps} />).instance();
            container.setState(state);
            container.handleCloseConfirmEditDialog = jest.fn();
            container.handleEdit();
            await promise;
            jest.runAllTimers();

            // Assert
            expect(initProps.editJobSetting).toHaveBeenCalled();
            expect(container.handleCloseConfirmEditDialog).toHaveBeenCalled();
        });
    });

    describe('renderForm', () => {
        it('should call exact function when changed checkbox',() => {
            // Arrange
            const values= {
                id: '1, 2',
                serviceName: 'test, test1',
                dataType: 'Boolean',
                value: 1,
                settingName: 'ConfigUAT'
            },
            handleChange = jest.fn(),
            setFieldValue = jest.fn(),
            handleSubmit = jest.fn(),
            isSubmitting = jest.fn();
            const param = {
                values,
                errors: {
                },
                touched: {
                },
                handleChange,
                setFieldValue,
                handleSubmit,
                isSubmitting
            };
            const container = shallow(<Edit {...initProps} />).instance();
            //Act
            const edit = shallow(container.renderForm(param));
            edit.find(Form.Check).simulate('change',{target:{checked:true}});
            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('value', true);
        });

        it('should call exact function when changed date time',() => {
            // Arrange
            const values= {
                id: '1, 2',
                serviceName: 'test, test1',
                dataType: 'DateTime',
                value: '2022-01-01 09:01',
                settingName: 'ConfigUAT'
            },
            handleChange = jest.fn(),
            setFieldValue = jest.fn(),
            handleSubmit = jest.fn(),
            isSubmitting = jest.fn();
            const param = {
                values,
                errors: {
                },
                touched: {
                },
                handleChange,
                setFieldValue,
                handleSubmit,
                isSubmitting
            };
            const container = shallow(<Edit {...initProps} />).instance();

            container.formik = {
                setFieldValue: jest.fn()
            };
            //Act
            const edit = shallow(container.renderForm(param));
            edit.find(DatePicker).simulate('change', new Date('2022-01-01 09:01'));
            // Assert
            expect(container.formik.setFieldValue).toHaveBeenCalledWith('value', new Date('2022-01-01 09:01'));
        });
    });

    describe('render', () => {
        it('should return empty',() => {
            // Arrange
            const props = {...initProps, editPopup: {data:null} };

            //Act
            const container = shallow(<Edit {...props} />);

            // Assert
            expect(container).toEqual({});
        });
    });
});