import React from 'react';
import { EditFeedbackSubject } from '../EditFeedbackSubject';
import { shallow, mount } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';
import { Form, Modal } from 'react-bootstrap';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import { Formik } from 'formik';

describe('EditFeedbackSubject', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        LangHelper.getResource = jest.fn((key) => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('should render correctly', () => {
        // Act
        const container = shallow(<EditFeedbackSubject />);

        // Assert 
        expect(container).toMatchSnapshot();
    });

    it('renders Modal, Formik components', () => {
        // Arrange
        const props = {
            editFeedbackSubjectResult: {}
        };
        
        // Act
        const container = shallow(<EditFeedbackSubject {...props} />);

        // Assert
        expect(container.find(Modal).length).toBe(1);
        expect(container.find(Formik).length).toBe(1);
    });

    it('components render correctly message', () => {
        // Arrange
        const props = {
            editFeedbackSubjectResult: {
                isSuccessful: false,
                message: 'EditFeedbackSubjectTemplateSuccessfully'
            }
        };
        const container = mount(<EditFeedbackSubject {...props} />);

        // Act
        const responseMessage = container.find(ResponseMessage);

        // Assert
        expect(responseMessage.props().isSuccessful).toBe(props.editFeedbackSubjectResult.isSuccessful);
        expect(responseMessage.props().message).toBe(props.editFeedbackSubjectResult.message);
    });
    
    describe('methods', () => {
        
        describe('validate',  () => {
            it('should render exactly errors messsage ', () => {
                // Arrange
                const values = {
                    subject: ''
                };
                const expected = {
                    subject: 'FeedbackSubjectContentRequired'
                };
                const container = shallow(<EditFeedbackSubject />).instance();

                // Act
                const errors = container.validateFormik(values);
     
                // Assert
                expect(errors).toEqual(expected);
            });
        });
        describe('handleSubmit', () => {
            it('should call exactly functions when edit successful', async () => {
                // Arrange
                const promise = Promise.resolve({});
                const values = {
                    templateId: 1,
                    subject: 'feedback' 
                };
                const props = {
                    editFeedbackSubjectResult: { isSuccessful: true, message:'' },
                    onSuccess: jest.fn(),
                    editFeedbackSubject: jest.fn(() => promise)
                };
                const formikBag = {
                    setSubmitting: jest.fn()
                };
                const container = shallow(<EditFeedbackSubject {...props} />).instance();

                // Act
                container.handleSubmit(values, formikBag);
                await promise;
                jest.runAllTimers();

                // Assert
                expect(formikBag.setSubmitting.mock.calls.length).toBe(1);
                expect(formikBag.setSubmitting.mock.calls[0][0]).toBe(true);

                expect(props.editFeedbackSubject).toHaveBeenCalledWith({ templateId: 1, subject: 'feedback' });
                expect(props.onSuccess).toHaveBeenCalled();
                
            });

            it('should call exactly functions when edit unsuccessful', async () => {
                // Arrange
                const promise = Promise.resolve({});
                const values = {
                    templateId: 1,
                    subject: 'feedback'  
                };
                const formikBag = {
                    setSubmitting: jest.fn()
                };
                const props = {
                    editFeedbackSubjectResult: { isSuccessful: false, message:'' },
                    onSuccess: jest.fn(),
                    editFeedbackSubject: jest.fn(() => promise)
                };
                const container = shallow(<EditFeedbackSubject {...props} />).instance();

                // Act
                container.handleSubmit(values, formikBag);
                await promise;
                jest.runAllTimers();

                // Assert
                expect(formikBag.setSubmitting.mock.calls.length).toBe(2);
                expect(formikBag.setSubmitting.mock.calls[0][0]).toBe(true);
                expect(formikBag.setSubmitting.mock.calls[1][0]).toBe(false);
            });
        });
        
        describe('renderForm', () => {
            it('should show response message', () => {
                // Arrange
                const props = {
                    createFeedbackSubjectResult: {
                        isSuccessful: false,
                        message: 'unsuccessful'
                    }
                };
                const formikProps = {
                    values: {},
                    errors: {},
                    touched: {}
                };
                const container = shallow(<EditFeedbackSubject {...props} />).instance();
        
                // Act
                const form = shallow(container.renderForm(formikProps));
        
                // Assert 
                expect(form).toMatchSnapshot();
            });

            describe('isInvalid', () =>  {
                it('isInvalid Feedback Subject correctly', () => {
                    // Arrange
                    const param = {
                        values: {},
                        errors: {
                            subject: 'feedback'
                        },
                        touched: {
                            subject: true
                        },
                        handleChange: jest.fn(),
                        handleSubmit: jest.fn(),
                        isSubmitting: jest.fn()
                    };
                    const container = shallow(<EditFeedbackSubject />).instance();

                    // Act
                    const form = shallow(container.renderForm(param));

                    // Assert
                    expect(form.find(Form.Control).at(0).props().isInvalid).toEqual(param.errors.subject);
                });
            });
        });

        describe('handleConfirmCancelPopup', () => {
            const initialValues = {
                subject: 'feedback',
                templateId: 1,
            };

            const props = {
                onClose: jest.fn(),
                feedback: {
                    subject: 'feedback',
                    templateId: 1
                }
            };
            const container = shallow(<EditFeedbackSubject {...props} />).instance();
            
            it('should call handleClosePopup if value popup not change', () => {
                // Arrange
                container['formik'] = {
                    values: initialValues
                };
                
                // Act
                container.handleConfirmCancelPopup({ preventDefault: jest.fn() });

                // Assert
                expect(props.onClose).toHaveBeenCalled();
            });

            it('should call setState showConfirmClose is true', () => {
                // Arrange
                container['formik'] = {
                    values: {}
                };

                // Act
                container.handleConfirmCancelPopup();

                // Assert
                expect(container.state.showConfirmClose).toBeTrue;
            });

            it('handleCloseConfirm should set state showConfirmClose is false', () => {
                // Act
                container.handleCloseConfirm();
    
                // Assert
                expect(container.state.showConfirmClose).toBeFalse;
            });
        });
    });
});