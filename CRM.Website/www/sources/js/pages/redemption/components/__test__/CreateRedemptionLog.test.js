import React from 'react';
import { shallow } from 'enzyme';
import { Form, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import { CreateRedemptionLog } from '../CreateRedemptionLog';
import Site from '@jsroot/common/site';
import LangHelper from '@jsroot/common/langHelper';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import CreateEditForm from '../CreateEditForm';
import * as commonFunc from '../../common.functions';

describe('CreateRedemptionLog', () => {
    beforeAll(() => {
        window.currentClientTime = '10/11/2021 10:05:20 AM';
        jest.useFakeTimers();
        Site.blockUI = jest.fn();
        Site.unblockUI = jest.fn();
        LangHelper.getResource = jest.fn(key => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        settings: { statuses: [{ statusId: 1, name: 'KIV' }] },
        getSettings: jest.fn()
    };

    describe('componentDidMount', () => {
        it('should call exactly prop function', () => {
            // Arrange
            const props = { ...initProps };

            // Act
            const container = shallow(<CreateRedemptionLog {...props}/>);
            container.instance().componentDidMount();

            // Assert
            expect(props.getSettings).toHaveBeenCalled();
        });
    });

    describe('initFormikData', () => {
        it('should return exactly', () => {
            // Arrange
            const props = { ...initProps };
            const expected = { amount: 0, claimTime: '2021-10-11T03:05:00.000Z',
                currencyId: 0, doneBy: '', remark: '', statusId: 1, subject: ''};

            // Act
            const container = shallow(<CreateRedemptionLog {...props}/>);
            const actual = container.instance().initFormikData();

            // Assert
            expect(actual.statusId).toEqual(expected.statusId);
        });
    });

    describe('handleSubmit', () => {
        it('should call exactly functions when submit successful',async () => {
            // Arrange
            const promise = Promise.resolve({ data: { code: 0, isSuccessful: true }});
            const values = {
                subject: 'test',
                remark: 'testing',
                claimTime: '',
                amount: 1,
                doneBy: 'sa',
                statusId: 1,
                currencyId: 1
            };
            const setSubmitting = jest.fn();
            const props = {
                ...initProps,
                createRedemptionLog: jest.fn(() => promise),
                onClose: jest.fn()
            };
            const container = shallow(<CreateRedemptionLog {...props} />);

            // Act
            container.instance().handleSubmit(values, { setSubmitting });
            await promise;
            jest.runAllTimers();

            // Assert
            expect(props.createRedemptionLog).toHaveBeenCalled();
            expect(props.onClose).toHaveBeenCalled();
            expect(container.state().createRedemptionResult).toEqual({ code: 0, isSuccessful: true });
        });

        it('should call exactly functions when submit unSuccessful',async () => {
            // Arrange
            const promise = Promise.resolve({ data: { code: 1, isSuccessful: false }});
            const values = {
                subject: 'test',
                remark: 'testing',
                claimTime: '',
                amount: 1,
                doneBy: 'sa',
                statusId: 1,
                currencyId: 1
            };
            const setSubmitting = jest.fn();
            const props = {
                ...initProps,
                createRedemptionLog: jest.fn(() => promise),
                onClose: jest.fn()
            };
            const container = shallow(<CreateRedemptionLog {...props} />);

            // Act
            container.instance().handleSubmit(values, { setSubmitting });
            await promise;
            jest.runAllTimers();

            // Assert
            expect(props.createRedemptionLog).toHaveBeenCalled();
            expect(container.state().createRedemptionResult).toEqual({ code: 1, isSuccessful: false });
            expect(setSubmitting).toHaveBeenCalledWith(false);
        });
    });
    
    describe('renderForm', () => {
        const params = {
            values: {},
            errors: {},
            touched: {},
            handleChange: jest.fn(),
            setFieldValue: jest.fn(),
            isSubmitting: jest.fn()
        };

        it('renderForm exactly', () => {
            //Arrange
            const props = { ...initProps };
            const container = shallow(<CreateRedemptionLog  {...props}/>);
            container.setState({
                createRedemptionResult: true
            });

            //Act
            const renderForm = shallow(container.instance().renderForm({...params}));

            //Assert
            expect(renderForm.find(ResponseMessage).length).toBe(1);
            expect(renderForm.find(FormikErrorMessage).length).toBe(1);
            expect(renderForm.find(CreateEditForm).length).toBe(1);
        });
    });

    describe('render', () => {
        it('should render not correctly', () => {
            //Act
            const props = {
                ...initProps,
                settings: null
            };
            const container = shallow(<CreateRedemptionLog {...props} />);

            //Assert
            expect(container.find(Form).length).toBe(0);
            expect(container.type()).toEqual(null);
        });

        
        it('component map correct innerRef in formik', () => {
            // Arrange
            const props = { ...initProps };
            const expected = { subject: '' };
            const container = shallow(<CreateRedemptionLog {...props}/>).instance();
            container.initFormikData = jest.fn(() => expected);
            
            // Act
            const renderCreate = shallow(container.render());
            renderCreate.find(Formik).props().innerRef({});

            // Assert
            expect(container['formik']).toEqual({});
            expect(renderCreate.find(Formik).props().initialValues).toEqual(expected);
        });

        it('should call correct functions when validate', () => {
            // Arrange
            const props = { ...initProps };
            const values = {
                subject: ''
            };
           
            const container = shallow(<CreateRedemptionLog {...props}/>).instance();
            commonFunc.validateFormik = jest.fn();

            // Act
            const renderCreate = shallow(container.render());
            renderCreate.find(Formik).props().validate(values);

            // Assert
            expect(renderCreate.find(Formik).length).toBe(1);
            expect(commonFunc.validateFormik).toHaveBeenCalledTimes(1);
        });

        it('modal onHide should call exact function', () => {
            // Arrange
            const props = { 
                ...initProps,
                onClose: jest.fn()
             };
            const container = shallow(<CreateRedemptionLog {...props}/>).instance();

            // Act
            const renderCreate = shallow(container.render());
            renderCreate.find(Modal).simulate('hide');

            // Assert
            expect(props.onClose).toHaveBeenCalled();
        });
    });
});