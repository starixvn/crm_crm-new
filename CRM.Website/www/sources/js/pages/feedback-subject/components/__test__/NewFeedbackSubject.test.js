import React from 'react';
import { Formik } from 'formik';
import { NewFeedbackSubject } from '../NewFeedbackSubject';
import { shallow, mount } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';
import { Form, Modal } from 'react-bootstrap';
import ResponseMessage from '@jsroot/components/ResponseMessage';

describe('NewFeedbackSubject', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        LangHelper.getResource = jest.fn((key) => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('should render correctly', () => {
        // Act
        const container = shallow(<NewFeedbackSubject />);

        // Assert
        expect(container).toMatchSnapshot();
    });

    it('renders Modal, Formik components', () => {
        // Arrange
        const props = {
            createCommunicationResult: {},
        };

        // Act 
        const container = shallow(<NewFeedbackSubject {...props} />);

        // Assert
        expect(container.find(Modal)).toHaveLength(1);
        expect(container.find(Formik)).toHaveLength(1);
    })

    it('component render correctly message', () => {
        // Arrange
        const props = {
            createFeedbackSubjectResult: {
                isSuccessful: false,
                message: 'InsertFeedbackSubjectTemplateSuccessfully'
            }
        };
        const container = mount(<NewFeedbackSubject {...props} />);

        // Act
        const responseMessage = container.find(ResponseMessage);

        // Assert
        expect(responseMessage.props().isSuccessful).toBe(props.createFeedbackSubjectResult.isSuccessful);
        expect(responseMessage.props().message).toBe(props.createFeedbackSubjectResult.message);
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
                const container = shallow(<NewFeedbackSubject />).instance();

                // Act
                const errors = container.validateFormik(values);
     
                // Assert
                expect(errors).toEqual(expected);
            });
        });

        describe('handleSubmit', () => {
            it('should call exactly functions when create successful', async () => {
                // Arrange
                const promise = Promise.resolve({});
                const values = {
                    subject: 'feedback'
                };
                const formikBag = {
                    setSubmitting: jest.fn()
                };
                const props = {
                    createFeedbackSubject: jest.fn(() => promise),
                    createFeedbackSubjectResult: { isSuccessful: true, message: ''},
                    onSuccess: jest.fn()
                };
                const container = shallow(<NewFeedbackSubject {...props} />).instance();

                // Act
                container.handleSubmit(values, formikBag);
                await promise;
                jest.runAllTimers();

                // Assert
                expect(formikBag.setSubmitting.mock.calls.length).toBe(1);
                expect(formikBag.setSubmitting.mock.calls[0][0]).toBe(true);

                expect(props.createFeedbackSubject).toHaveBeenCalledWith({
                    subject: 'feedback'
                });
                expect(props.onSuccess).toHaveBeenCalled();
            });

            it('should call exactly functions when create unsuccessful', async () => {
                // Arrange
                const promise = Promise.resolve({});
                const values = {
                    subject: 'feedback'
                };
                const formikBag = {
                    setSubmitting: jest.fn()
                };
                const props = {
                    createFeedbackSubject: jest.fn(() => promise),
                    createFeedbackSubjectResult: { isSuccessful: false, message: ''},
                    onSuccess: jest.fn()
                }
                const container = shallow(<NewFeedbackSubject {...props} />).instance();

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

        describe('RenderForm', () => {
            describe('isInvalid', () => {
                it('isInvalid Feedback Subject correctly', () => {
                    // Arrange
                    const param = {
                     values: {},
                     errors: {
                        subject: 'test'
                     },
                     touched: {
                        subject: true
                     },
                     handleChange: jest.fn(),
                     handleSubmit: jest.fn(),
                     isSubmitting: jest.fn()
                    };
                    const container = shallow(<NewFeedbackSubject />).instance();
     
                    // Act
                    const form = shallow(container.renderForm(param));
     
                    // Assert 
                    expect(form.find(Form.Control).at(0).props().isInvalid).toEqual(param.errors.subject);
                });
            });

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
                const container = shallow(<NewFeedbackSubject {...props} />).instance();
        
                // Act
                const form = shallow(container.renderForm(formikProps));
        
                // Assert 
                expect(form).toMatchSnapshot();
            });
        });

        describe('handleConfirmCancelPopup', () => {
            // Arrang
            const initialValues = {
                subject: ''
            };
            const props = {
                onClose: jest.fn()
            };

            const container = shallow(<NewFeedbackSubject {...props} />).instance();

            it('should call onClose if state is equal initialValues', () => {
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
        })
    });
});