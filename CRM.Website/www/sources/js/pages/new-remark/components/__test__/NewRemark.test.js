import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { NewRemark } from '../NewRemark';
import { shallow } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';

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
        validateUsername: jest.fn(),
        getAllSettings: jest.fn(),
        setInputAddUsername: jest.fn(),
        gridParams: {pageIndex: 1, pageSize: 100, username: 'test', isGuest: false},
        allSettings: { 
            extentions: [{id: 2022, value: "N/A", displayOrder: 0, isChild: false, isActive: true}],
            relatedPics: [{letstalkIds: "sss,ssdsddscac", id: 264, name: "malcokm1_ss"}],
            userId: 62585686
        },
        validateResult: { isSuccessful: false},
        customerName: '',
        onSuccess: jest.fn()
    };

    describe('componentDidMount', () => {
        it('should call exactly functions', () => {
            // Arrange
            // Act
            const container = shallow(<NewRemark {...initProps} />);

            // Assert
            expect(initProps.getAllSettings).toHaveBeenCalled();
            expect(initProps.validateUsername).toHaveBeenCalledWith({username: 'test', isGuest: false});
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

    describe('handleValidate', () => {
        it('should call exactly functions', () => {
            // Arrange
            const container = shallow(<NewRemark {...initProps} />);
            container.instance()['formik'] = {
                errors: {username: 'error'}
            };
            // Act
            container.instance().handleValidate({username: 'test1', isGuest: false});
            jest.runAllTimers();
            // Assert
            expect(container.instance().state.isFirstLoad).toEqual(false);
            expect(container.instance()['formik'].errors.username).toEqual('');
            expect(initProps.setInputAddUsername).toHaveBeenCalledWith('test1');
            expect(initProps.validateUsername).toHaveBeenCalledWith({username: 'test1', isGuest: false});
        });
    });

    describe('validateFirstLoadFormik', () => {
        it('should return exactly error', () => {
            // Arrange
            const container = shallow(<NewRemark {...initProps} />);
           
            // Act
            const actual = container.instance().validateFirstLoadFormik('test');
            // Assert
            expect(actual).toEqual({username: 'Username test is not valid'});
            
        });
    });

    describe('validateFormik', () => {
        it('should return exactly error', () => {
            // Arrange
            const values = {
                username: '',
                remarkTitle: '',
                remarkContent : ''
            };
            const expectErrors = {
                username: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Username')),
                remarkTitle: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('RemarkTitle')),
                remarkContent: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('RemarkContent'))
            };
            const container = shallow(<NewRemark {...initProps} />);
           
            // Act
            const actual = container.instance().validateFormik (values);
            // Assert
            expect(actual).toEqual(expectErrors);
        });

        it('should return exactly error when username is changed', () => {
            // Arrange
            const values = {
                username: 'test1',
                remarkTitle: '1',
                remarkContent : '1'
            };
            const expectErrors = {
                username: LangHelper.getResource('UsernameIsChanged')
            };
            const container = shallow(<NewRemark {...initProps} />);
           
            // Act
            const actual = container.instance().validateFormik (values);
            // Assert
            expect(actual).toEqual(expectErrors);
        });
    });

    describe('isValidUsername', () => {
        it('should return exact value', () => {
            // Arrange
            const container = shallow(<NewRemark {...initProps} />);
           
            // Act
            const actual = container.instance().isValidUsername({username: 'test2'});
            // Assert
            expect(actual).toBe(false);
            
        });
    });

    describe('initUserName', () => {
        it('should return exact value', () => {
            // Arrange
            const container = shallow(<NewRemark {...initProps} />);
           
            // Act
            const actual = container.instance().initUserName({isSuccessful: true}, 'test', 'test1');
            // Assert
            expect(actual).toEqual('test1');
        });
    });

    describe('renderForm', () => {
        it('should call exactly functions', () => {
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
            const container = shallow(<NewRemark {...initProps} />).instance();
            container.setState(state);
            container.validateFirstLoadFormik = jest.fn(() => {username: 'test'});
            container.isValidUsername = jest.fn();

            // Act
            container.renderForm(formikProps);
            
            // Assert
            expect(container.validateFirstLoadFormik).toHaveBeenCalledTimes(2);
            expect(container.isValidUsername).toHaveBeenCalled();
        });

        it('should render FormikErrorMessage correctly', () => {
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
                isFirstLoad: true
            };
            const container = shallow(<NewRemark {...initProps} />);
            container.instance().setState(state);
            container.instance().validateFirstLoadFormik = jest.fn().mockReturnValue({username: 'test'});
            container.instance().isValidUsername = jest.fn();

            // Act
            const form = shallow(container.instance().renderForm(formikProps));
            
            // Assert
            expect(form.find(FormikErrorMessage).length).toBe(2);
        });

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
            container.instance().handleValidate = jest.fn();

            // Act
            const form = shallow(container.instance().renderForm(formikProps));
            form.find(Button).at(0).simulate('click');

            // Assert
            expect(container.instance().handleValidate).toHaveBeenCalledWith(formikProps.values);
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