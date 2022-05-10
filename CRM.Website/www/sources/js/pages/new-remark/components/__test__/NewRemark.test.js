import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { NewRemark } from '../NewRemark';
import { shallow } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';

describe('NewRemark', () => {

    beforeAll(() => {
        jest.useFakeTimers();
        LangHelper.getResource = jest.fn(key => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
        spy.mockRestore();
    });

    const initProps = {
        inputAddUsername : '',
        getAllSettings: jest.fn(),
        gridParams: {pageIndex: 1, pageSize: 100, username: 'test', isGuest: false},
        allSettings: { 
            extentions: [{id: 2022, value: "N/A", displayOrder: 0, isChild: false, isActive: true}],
            relatedPics: [{letstalkIds: "sss,ssdsddscac", id: 264, name: "malcokm1_ss"}],
            userId: 62585686
        },
        validateResult: [{custId : 1, isCredit: false}],
        customerName: '',
        onSuccess: jest.fn()
    };

    describe('componentDidMount', () => {
        it('should call exactly functions', () => {
            // Arrange
            // Act
            shallow(<NewRemark {...initProps} />);

            // Assert
            expect(initProps.getAllSettings).toHaveBeenCalled();
        });
    });

    describe('handleSubmit', () => {
        it('should call exactly functions when successful',async () => {
            // Arrange
            const setSubmitting = jest.fn();
            const response = {isSuccessful: true};
            const promise = Promise.resolve(response);
            const props = {...initProps, createResult: response, createNewRemarks: jest.fn(() => promise)};
            const values = {
                username: 'test',
                remarkContent: 'remarkContent',
                remarkTitle: 0,
                relatedPics: '1,2',
                extStation: '1',
                handledBy: '1',
                approvedBy: '1',
                acknowledgedBy: '1',
                requestedBy: 'requestedBy'
            };
            // Act
            const container = shallow(<NewRemark {...props} />);
            container.instance().handleSubmit(values, {setSubmitting});
            await promise;
            jest.runAllTimers();

            // Assert
            expect(initProps.onSuccess).toHaveBeenCalled();
            expect(setSubmitting).toHaveBeenCalledWith(true);
        });

        it('should call exactly functions when when unsuccessful',async () => {
            // Arrange
            const setSubmitting = jest.fn();
            const response = {isSuccessful: false};
            const promise = Promise.resolve(response);
            const props = {...initProps, createResult: response, createNewRemarks: jest.fn(() => promise)};
            const values = {
                username: 'test',
                remarkContent: 'remarkContent',
                remarkTitle: 0,
                relatedPics: '1,2',
                extStation: '1',
                handledBy: '1',
                approvedBy: '1',
                acknowledgedBy: '1',
                requestedBy: 'requestedBy'
            };
            // Act
            const container = shallow(<NewRemark {...props} />);
            container.instance().handleSubmit(values, {setSubmitting});
            await promise;
            jest.runAllTimers();

            // Assert
            expect(setSubmitting).toHaveBeenCalledWith(false);
        });
    });

    describe('handleValidateCustomer', () => {
        it('should call exactly functions', () => {
            // Arrange
            const response = {data: {}};
            const promise = Promise.resolve(response);
            initProps.validateUsername = jest.fn(() => promise);
            const container = shallow(<NewRemark {...initProps} />);
            container.instance()['formik'] = {
                errors: {username: 'error'}
            };
            const setFieldValue = jest.fn();
            // Act
            container.instance().handleValidateCustomer('test1', false, setFieldValue);
            jest.runAllTimers();
            // Assert
            expect(container.instance().state.isValidCustomer).toEqual(false);
            expect(initProps.validateUsername).toHaveBeenCalledWith({username: 'test1', isGuest: false});
        });
    });

    describe('validateFormik ', () => {
        it('should return exact errors', () => {
            // Arrange
            const values = {
                username: 'test',
                remarkTitle: '',
                remarkContent : ''
            };

            const state = {
                isValidCustomer: false
            };
            const expectedError = {
                username: LangHelper.getResource('UsernameIsNotValid'),
                remarkTitle: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('RemarkTitle')),
                remarkContent: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('RemarkContent'))
            };

            const container = shallow(<NewRemark {...initProps} />);
            container.instance().setState(state);
            // Act
            const actual = container.instance().validateFormik(values);
            // Assert
            expect(actual).toEqual(expectedError);
            
        });

        it('should return exact errors when not click validate', () => {
            // Arrange
            const values = {
                username: 'test',
                remarkTitle: '',
                remarkContent : ''
            };

            const state = {
                isValidCustomer: false
            };
            const expectedError = {
                remarkContent: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('RemarkContent')),
                remarkTitle: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('RemarkTitle')),
                username: LangHelper.getResource('UsernameIsChanged')
            };

            const props = {...initProps, validateResult: null, customerName: ''};

            const container = shallow(<NewRemark {...props} />);
            container.instance().setState(state);
            // Act
            const actual = container.instance().validateFormik(values);
            // Assert
            expect(actual).toEqual(expectedError);
            
        });
    });

    describe('renderForm', () => {
        it('change event call exactly function', () => {
            // Arrange
            const formikProps = {
                values: {},
                errors: {},
                touched: {},
                handleChange: jest.fn(),
                handleSubmit: jest.fn(),
                setFieldValue: jest.fn()
            };
            const state = {
                isFirstLoad: false
            };
            const container = shallow(<NewRemark {...initProps} />);
            container.instance().setState(state);
            container.instance().isValidUsername = jest.fn();

            // Act
            const form = shallow(container.instance().renderForm(formikProps));
            form.find(Form.Check).simulate('change', {target: {checked: true}});

            // Assert
            expect(formikProps.setFieldValue).toHaveBeenCalledWith('isGuest', true);
        });

        it('click event call exactly function', () => {
            // Arrange
            const formikProps = {
                values: {
                    username: 'test', isGuest: false
                },
                errors: {},
                touched: {},
                handleChange: jest.fn(),
                handleSubmit: jest.fn(),
                setFieldValue: jest.fn(),
                validateForm:  jest.fn()
            };
            const container = shallow(<NewRemark {...initProps} />);
            container.instance().handleValidateCustomer = jest.fn();

            // Act
            const form = shallow(container.instance().renderForm(formikProps));
            form.find(Button).at(0).simulate('click');

            // Assert
            expect(container.instance().handleValidateCustomer).toHaveBeenCalledWith(
                formikProps.values.username, formikProps.values.isGuest, formikProps.setFieldValue, formikProps.validateForm
            );
        });
    });

    describe('render', () => {
        it('component map correct innerRef in formik', () => {
            // Arrange
            const expected = {};
            // Act
            const container = shallow(<NewRemark {...initProps} />);

            // Assert
            container.find(Formik).props().innerRef(expected);
            expect(container.instance()['formik']).toEqual(expected);
        });

        it('return empty', () => {
            // Arrange
            const props = {
                ...initProps, gridParams : {...initProps.gridParams, username : 'test'}, validateResult: null
            };
            // Act
            const container = shallow(<NewRemark {...props} />);

            // Assert
            expect(container).toEqual({});
        });
    });
});