import React from 'react';
import { shallow } from 'enzyme';
import { Form, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import { EditRedemptionLog } from '../EditRedemptionLog';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import LangHelper from '@jsroot/common/langHelper';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import CreateEditForm from '../CreateEditForm';
import * as commonFunc from '../../common.functions';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';

describe('EditRedemptionLog', () => {
    beforeAll(() => {
        window.currentClientTime = '10/11/2021 10:05:20 AM';
        jest.useFakeTimers();
        Site.blockUI = jest.fn();
        Site.unblockUI = jest.fn();
        LangHelper.getResource = jest.fn(key => key);
        const appContainer = document.createElement('div');
        appContainer.setAttribute('id', 'hasCreateFeedbackPermission');
        appContainer.checked = true;
        document.body.appendChild(appContainer);
    });

    afterAll(() => {
        jest.clearAllMocks();
        const appContainer = document.getElementById('hasCreateFeedbackPermission');
        if (appContainer) {
            document.body.removeChild(appContainer);
        }
    });

    const initProps = {
        allStatus: { statuses: [{ statusId: 1, name: 'KIV' }] },
        logId: 123,
        getLogById: jest.fn(),
        getAllStatus: jest.fn()
    };

    describe('componentDidMount', () => {
        it('should call exactly prop function', async () => {
            // Arrange
            const props = { ...initProps };
            const expectedRedemptionLog = {
                amount: 1,
                claimTime: new Date('10/11/2021 10:05:20 AM'),
                currencyId: 2,
                doneBy: 'sa', id: 1,
                remark: 'test', statusId: 123,
                subject: 'test'
            }
            const response = {
                data: {
                    amount: 1,
                    claimTime: '10/11/2021 10:05:20 AM',
                    currencyId: 2,
                    doneBy: 'sa',
                    id: 1,
                    remark: 'test',
                    statusId: 123,
                    subject: 'test'
                }
            }
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);

            // Act
            const container = shallow(<EditRedemptionLog {...props}/>);
            container.setState({ redemptionLog: null})
            container.instance().componentDidMount();
            await promise;
            jest.runAllTimers();

            // Assert
            expect(container.state().redemptionLog).toEqual(expectedRedemptionLog);
            expect(container.state().allStatus).toEqual(null);
        });
    });

    describe('initFormikData', () => {
        it('should return exactly', () => {
            // Arrange
            const props = { ...initProps };
            const data = { id: 123, amount: 0, claimTime: '2021-10-11T03:05:00.000Z',
                currencyId: 0, doneBy: '', remark: '', statusId: 1, subject: ''};

            // Act
            const container = shallow(<EditRedemptionLog {...props}/>);
            const actual = container.instance().initFormikData(data);

            // Assert
            expect(actual.statusId).toEqual(data.statusId);
        });
    });

    describe('handleSubmit', () => {
        const values = {
            id: 123,
            subject: 'test',
            remark: 'testing',
            claimTime: '',
            amount: 1,
            doneBy: 'sa',
            statusId: 1,
            currencyId: 1
        };

        it('should call exactly functions when submit successful',async () => {
            // Arrange
            const promise = Promise.resolve({ data: { code: 0, isSuccessful: true }});
            DataService.postDataAsync = jest.fn(() => promise);
            const setSubmitting = jest.fn();
            const props = {
                ...initProps,
                editRedemptionLog: jest.fn(() => promise),
                onClose: jest.fn()
            };
            const container = shallow(<EditRedemptionLog {...props} />);

            // Act
            container.instance().handleSubmit(values, { setSubmitting });
            await promise;
            jest.runAllTimers();

            // Assert
            expect(props.onClose).toHaveBeenCalled();
            expect(container.state().editRedemptionResult).toEqual({ code: 0, isSuccessful: true });
        });

        it('should call exactly functions when submit unSuccessful',async () => {
            // Arrange
            const promise = Promise.resolve({ data: { code: 1, isSuccessful: false }});
            DataService.postDataAsync = jest.fn(() => promise);
            const setSubmitting = jest.fn();
            const props = {
                ...initProps,
                editRedemptionLog: jest.fn(() => promise),
                onClose: jest.fn()
            };
            const container = shallow(<EditRedemptionLog {...props} />);

            // Act
            container.instance().handleSubmit(values, { setSubmitting });
            await promise;
            jest.runAllTimers();

            // Assert
            expect(container.state().editRedemptionResult).toEqual({ code: 1, isSuccessful: false });
            expect(setSubmitting).toHaveBeenCalledWith(false);
        });
    });

    describe('isNewEqualOldId', () => {
        it('should return false when call function isNewEqualOldId', () => {
            // Arrange
            const values = {
                currencyId: 0,
                statusId: 0
            };
            const props = {...initProps};

            const container = shallow(<EditRedemptionLog {...props}/>);
            container.setState({
                redemptionLog: { currencyId: 0, statusId: 0 }
            });

            // Act
            container.instance()['formik'] = { values: values };
            const actual = container.instance().isNewEqualOldId();

            // Assert
            expect(actual).toEqual(false);
        });

        it('should return true when call function isNewEqualOldId', () => {
            // Arrange
            const values = {
                currencyId: 1,
                statusId: 1
            };
            const props = {...initProps};

            const container = shallow(<EditRedemptionLog {...props}/>);
            container.setState({
                redemptionLog: { currencyId: 0, statusId: 0 }
            });

            // Act
            container.instance()['formik'] = { values: values };
            const actual = container.instance().isNewEqualOldId();

            // Assert
            expect(actual).toEqual(true);
        });
    });

    describe('isNewEqualOldValue', () => {
        it('should return false when call function isNewEqualOldValue', () => {
            // Arrange
            const values = {
                amount: 0,
                doneBy: '',
                subject: '',
                remark: ''
            };
            const props = {...initProps};

            const container = shallow(<EditRedemptionLog {...props}/>);
            container.setState({
                redemptionLog: {                 
                    amount: 0,
                    doneBy: '',
                    subject: '',
                    remark: ''
                }
            });

            // Act
            container.instance()['formik'] = { values: values };
            const actual = container.instance().isNewEqualOldValue();

            // Assert
            expect(actual).toEqual(false);
        });

        it('should return true when call function isNewEqualOldValue', () => {
            // Arrange
            const values = {
                amount: 0,
                doneBy: '',
                subject: '',
                remark: 'test'
            };
            const props = {...initProps};

            const container = shallow(<EditRedemptionLog {...props}/>);
            container.setState({
                redemptionLog: {                 
                    amount: 0,
                    doneBy: '',
                    subject: '',
                    remark: ''
                }
            });

            // Act
            container.instance()['formik'] = { values: values };
            const actual = container.instance().isNewEqualOldValue();

            // Assert
            expect(actual).toEqual(true);
        });
    });

    describe('onCloseEditPopup', () => {
        it('should setState when call onCloseEditPopup', () => {
            // Arrange
            const props = {...initProps};

            const container = shallow(<EditRedemptionLog {...props} />);

            // Act
            container.instance().isNewEqualOldId = jest.fn(() => true);
            container.instance().isNewEqualOldValue = jest.fn(() => true);

            container.instance().onCloseEditPopup();

            // Assert
            expect(container.state().isShowEditConfirm).toBe(true);
        });

        it('should call props function when call onCloseEditPopup', () => {
            // Arrange
            const props = {
                ...initProps,
                onClose: jest.fn()
            };

            const container = shallow(<EditRedemptionLog {...props} />);

            // Act
            container.instance().isNewEqualOldId = jest.fn(() => false);
            container.instance().isNewEqualOldValue = jest.fn(() => false);

            container.instance().onCloseEditPopup();

            // Assert
            expect(props.onClose).toHaveBeenCalledWith(false);
        });
    });

    describe('closeEditConfirm', () => {
        it('should setState exactly when call closeEditConfirm', () => {
            // Arrange
            const props = {...initProps};

            const container = shallow(<EditRedemptionLog {...props} />);

            // Act
            container.instance().closeEditConfirm();

            // Assert
            expect(container.state().isShowEditConfirm).toBe(false);
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
            const container = shallow(<EditRedemptionLog  {...props}/>);
            container.setState({
                editRedemptionResult: true
            });

            //Act
            const renderEdit = shallow(container.instance().renderForm({...params}));

            //Assert
            expect(renderEdit.find(ResponseMessage).length).toBe(1);
            expect(renderEdit.find(FormikErrorMessage).length).toBe(1);
            expect(renderEdit.find(CreateEditForm).length).toBe(1);
        });
    });

    describe('render', () => {
        it('should render not correctly', () => {
            //Act
            const props = {
                ...initProps,
                settings: null
            };
            const container = shallow(<EditRedemptionLog {...props} />);

            //Assert
            expect(container.find(Form).length).toBe(0);
            expect(container.type()).toEqual(null);
        });

        
        it('component map correct innerRef in formik', () => {
            // Arrange
            const props = { ...initProps };
            const expected = { subject: '' };
            const container = shallow(<EditRedemptionLog {...props}/>).instance();
            container.setState({ redemptionLog: { subject: '' }, allStatus: [{ open: 'Open' }]});
            container.initFormikData = jest.fn(() => expected);
            
            // Act
            const renderEdit = shallow(container.render());
            renderEdit.find(Formik).props().innerRef({});

            // Assert
            expect(container['formik']).toEqual({});
            expect(renderEdit.find(Formik).props().initialValues).toEqual(expected);
        });

        it('should call correct functions when validate', () => {
            // Arrange
            const props = { ...initProps };
            const values = {
                subject: ''
            };
           
            const container = shallow(<EditRedemptionLog {...props}/>).instance();
            container.setState({ redemptionLog: { subject: '' }, allStatus: [{ open: 'Open' }]});
            commonFunc.validateFormik = jest.fn();

            // Act
            const renderEdit = shallow(container.render());
            renderEdit.find(Formik).props().validate(values);

            // Assert
            expect(renderEdit.find(Formik).length).toBe(1);
            expect(commonFunc.validateFormik).toHaveBeenCalledTimes(1);
        });

        it('modal onHide should call exact function', () => {
            // Arrange
            const props = { 
                ...initProps
             };
            const container = shallow(<EditRedemptionLog {...props}/>).instance();
            container.setState({ redemptionLog: { subject: '' }, allStatus: [{ open: 'Open' }]});
            container.onCloseEditPopup = jest.fn();
            
            // Act
            const renderEdit = shallow(container.render());
            renderEdit.find(Modal).simulate('hide');

            // Assert
            expect(container.onCloseEditPopup).toHaveBeenCalled();
        });

        it('should call props function when ConfirmPopup submit', () => {
            // Arrange
            const props = {
                ...initProps,
                onClose: jest.fn()
            };
            
            const container = shallow(<EditRedemptionLog {...props} />);
            container.setState({ redemptionLog: { subject: '' }, allStatus: [{ open: 'Open' }]});
            
            // Act
            container.setState({ isShowEditConfirm: true });
            const renderEdit = shallow(container.instance().render());
            renderEdit.find(ConfirmPopup).simulate('submit');

            // Assert
            expect(props.onClose).toHaveBeenCalledWith(false);
        });
    });
});