import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { NewPicManagement } from '../NewPicManagement';
import { shallow } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import ResponseMessage from '@jsroot/components/ResponseMessage';

describe('NewPicManagement', () => {
    const mockDate = new Date(1466424490000);
    const spy = jest
        .spyOn(global, 'Date')
        .mockImplementation(() => mockDate);

    beforeAll(() => {
        jest.useFakeTimers();
        LangHelper.getResource = jest.fn(key => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
        spy.mockRestore();
    });

    it('renders component correctly', () => {
        // Arrange
        const props = {
            setting: {
                languages: []
            }
        };

        // Act
        const container = shallow(<NewPicManagement {...props} />);

        // Assert
        expect(container).toMatchSnapshot();
    });

    it('component has correct initialState', () => {
        // Arrange
        const initialState = {
            communicationTools: [
                { type: '', value: '', unique: new Date().getTime() }
            ],
            showConfirmClose: false
        };

        const props = {
            setting: {
                languages: []
            }
        };

        // Act
        const container = shallow(<NewPicManagement {...props} />);

        // Assert
        expect(container.state()).toEqual(initialState);
    });

    it('component map correct innerRef in formik', () => {
        // Arrange
        const props = {
            setting: {
                languages: []
            }
        };
        const expected = {};
        const container = shallow(<NewPicManagement {...props} />);

        // Act
        container.find(Formik).props().innerRef(expected);

        // Assert
        expect(container.instance()['formik']).toEqual(expected);
    });

    describe('methods', () => {
        describe('handleConfirmCancelPopup', () => {
            describe('runs correctly', () => {
                // Arrange
                const initialValues = {
                    picName: '',
                    roleId: '',
                    languageIds: '',
                    countryId: 0,
                    communication: null,
                    remark: ''
                };
                const props = {
                    setting: {
                        languages: []
                    }
                };
                const container = shallow(<NewPicManagement {...props} />);

                it('should call handleClosePopup if state is equal initialValues', () => {
                    // Arrange
                    container.instance()['formik'] = {
                        values: initialValues
                    };
                    container.instance().handleClosePopup = jest.fn();

                    // Act
                    container.instance().handleConfirmCancelPopup({ preventDefault: jest.fn() });

                    // Assert
                    expect(container.instance().handleClosePopup).toHaveBeenCalled();
                });

                it('should call setState showConfirmClose is true', () => {
                    // Arrange
                    container.instance()['formik'] = {
                        values: {}
                    };

                    // Act
                    container.instance().handleConfirmCancelPopup();

                    // Assert
                    expect(container.instance().state.showConfirmClose).toBeTrue;
                });
            });
        });

        it('handleCloseConfirm should set state showConfirmClose is false', () => {
            // Arrange
            const props = {
                setting: {
                    languages: []
                }
            };
            const container = shallow(<NewPicManagement {...props} />);

            // Act
            container.instance().handleCloseConfirm();

            // Assert
            expect(container.instance().state.showConfirmClose).toBeFalse;
        });

        describe('handleClosePopup runs correctly', () => {
            it('should call setCreatePicResult when have createPicResult', () => {
                // Arrange
                const props = {
                    setting: {
                        languages: []
                    },
                    setCreatePicPopup: jest.fn(),
                    createPicResult: { isSuccessful: 1, message: '' },
                    setCreatePicResult: jest.fn()
                };
                const container = shallow(<NewPicManagement {...props} />);

                // Act
                container.instance().handleClosePopup();

                // Assert
                expect(props.setCreatePicPopup).toHaveBeenCalledWith({ show: false });
                expect(props.setCreatePicResult).toHaveBeenCalledWith(null);
            });

            it('should not call setCreatePicResult when createPicResult is null', () => {
                // Arrange
                const props = {
                    setting: {
                        languages: []
                    },
                    setCreatePicPopup: jest.fn(),
                    setCreatePicResult: jest.fn()
                };
                const container = shallow(<NewPicManagement {...props} />);

                // Act
                container.instance().handleClosePopup();

                // Assert
                expect(props.setCreatePicPopup).toHaveBeenCalledWith({ show: false });
                expect(props.setCreatePicResult).toHaveBeenCalledTimes(0);
            });
        });

        it('handleAddRowCommunication run correctly', () => {
            // Arrange
            const expected = [
                { type: '', value: '', unique: 123456 },
                { type: '', value: '', unique: 1466424490000 }
            ]
            const props = {
                setting: {
                    languages: []
                }
            };
            const container = shallow(<NewPicManagement {...props} />);
            container.instance().state.communicationTools = [expected[0]];

            // Act
            container.instance().handleAddRowCommunication();

            // Assert
            expect(container.instance().state.communicationTools).toEqual(expected);
        });

        it('handleRemoveRowCommunication run correctly', () => {
            // Arrange
            const communicationTools = [
                { type: '', value: '', unique: 123456 },
                { type: '', value: '', unique: 111111 }
            ]
            const props = {
                setting: {
                    languages: []
                }
            };
            const container = shallow(<NewPicManagement {...props} />);
            container.instance().state.communicationTools = communicationTools;

            // Act
            container.instance().handleRemoveRowCommunication(111111);

            // Assert
            expect(container.instance().state.communicationTools).toEqual([communicationTools[0]]);
        });

        it('getTemplateCreate return expected', () => {
            // Arrange
            const props = {
                setting: {
                    languages: []
                }
            };
            const container = shallow(<NewPicManagement {...props} />);

            const values = {
                picName: 'a',
                roleId: 1,
                languageIds: '',
                countryId: 10,
                remark: '',
                communication0: {
                    type: 1,
                    value: 'a'
                },
                communication1: {
                    type: 1,
                    value: 'b'
                },
                communication2: {
                    type: 2,
                    value: '2'
                }
            };

            const expected = {
                picName: 'a',
                role: 1,
                language: '',
                country: 10,
                remark: '',
                picCommunicationTools: [
                    { type: 1, value: 'a, b' },
                    { type: 2, value: '2' }
                ]
            };

            // Act
            const result = container.instance().getTemplateCreate(values);

            // Assert
            expect(result).toEqual(expected);
        });

        describe('handleSubmit run correctly', () => {
            const values = {
                picName: 'a',
                roleId: 1,
                languageIds: '',
                countryId: 10,
                remark: '',
                communication0: {
                    type: 1,
                    value: 'a'
                }
            };

            const templateCreate = {
                picName: 'a',
                role: 1,
                language: '',
                country: 10,
                remark: '',
                picCommunicationTools: [
                    { type: 1, value: 'a' }
                ]
            };

            it('should call exactly functions when create successfully', async () => {
                // Arrange
                const promise = Promise.resolve({});
                const formik = {
                    setSubmitting: jest.fn()
                };
                const props = {
                    setting: {
                        languages: []
                    },
                    createPic: jest.fn(() => promise),
                    getGridData: jest.fn(),
                    setCreatePicResult: jest.fn(),
                    gridParams: {},
                    createPicResult: { isSuccessful: true, message: '' }
                };
                const container = shallow(<NewPicManagement {...props} />);
                container.instance().handleClosePopup = jest.fn();
                container.instance().getTemplateCreate = jest.fn(values => templateCreate);
                // Act
                container.instance().handleSubmit(values, formik);
                await promise;
                jest.runAllTimers();

                // Assert
                expect(formik.setSubmitting).toHaveBeenCalledTimes(1);
                expect(formik.setSubmitting.mock.calls[0][0]).toBeTrue;

                expect(container.instance().handleClosePopup).toHaveBeenCalled();
                expect(props.createPic).toHaveBeenCalledWith(templateCreate);
                expect(props.getGridData).toHaveBeenCalledWith(props.gridParams);
                expect(props.setCreatePicResult).toHaveBeenCalledWith(null);
            });

            it('should call exactly functions when create unsuccessful', async () => {
                // Arrange
                const promise = Promise.resolve({});
                const formik = {
                    setSubmitting: jest.fn()
                };
                const props = {
                    setting: {
                        languages: []
                    },
                    createPic: jest.fn(() => promise),
                    createPicResult: { isSuccessful: false, message: '' }
                };
                const container = shallow(<NewPicManagement {...props} />);
                container.instance().handleClosePopup = jest.fn();
                container.instance().getTemplateCreate = jest.fn(values => templateCreate);

                // Act
                container.instance().handleSubmit(values, formik);
                await promise;
                jest.runAllTimers();

                // Assert
                expect(formik.setSubmitting).toHaveBeenCalledTimes(2);
                expect(formik.setSubmitting.mock.calls[0][0]).toBeTrue;
                expect(formik.setSubmitting.mock.calls[1][0]).toBeFalse;
            });
        });

        describe('renderCommunicationTool', () => {

            const communicationTools = [
                { type: 1, value: 'a', unique: 1 },
                { type: 2, value: 'b', unique: 2 },
            ];

            it('should render expected', () => {
                // Arrange
                const props = {
                    setting: {
                        languages: [],
                        communicationTools: [
                            { settingId: 1, settingValue: 'email' },
                            { settingId: 2, settingValue: 'phone' },
                        ]
                    }
                };
                const container = shallow(<NewPicManagement {...props} />);
                container.instance().state.communicationTools = communicationTools;

                // Act
                const result = shallow(<div>
                    {container.instance().renderCommunicationTool({ values: {}, errors: {}, touched: {} })}
                </div>);

                // Assert
                expect(result.find(Form.Group).length).toEqual(2);
                expect(result.find('option').length).toEqual(6);
            });

            it('should call handleRemoveRowCommunication when click move row', () => {
                // Arrange
                const props = {
                    setting: {
                        languages: [],
                        communicationTools: [
                            { settingId: 1, settingValue: 'email' },
                            { settingId: 2, settingValue: 'phone' },
                        ]
                    }
                };
                const container = shallow(<NewPicManagement {...props} />);
                container.instance().state.communicationTools = communicationTools;
                container.instance().handleRemoveRowCommunication = jest.fn();

                // Act
                const result = shallow(<div>
                    {container.instance().renderCommunicationTool({ values: {}, errors: {}, touched: {} })}
                </div>);
                result.find('.fa-times').first().simulate('click');

                // Assert
                expect(container.instance().handleRemoveRowCommunication).toHaveBeenCalledWith(2);
            });

            it('should call handleAddRowCommunication when click add row', () => {
                // Arrange
                const props = {
                    setting: {
                        languages: [],
                        communicationTools: [
                            { settingId: 1, settingValue: 'email' },
                            { settingId: 2, settingValue: 'phone' },
                        ]
                    }
                };
                const container = shallow(<NewPicManagement {...props} />);
                container.instance().state.communicationTools = communicationTools;
                container.instance().handleAddRowCommunication = jest.fn();

                // Act
                const result = shallow(<div>
                    {container.instance().renderCommunicationTool({ values: {}, errors: {}, touched: {} })}
                </div>);
                result.find('.fa-plus').simulate('click');

                // Assert
                expect(container.instance().handleAddRowCommunication).toHaveBeenCalled();
            });
        });

        describe('renderForm', () => {
            it('should render expected', () => {
                // Arrange
                const props = {
                    setting: {
                        languages: [],
                        communicationTools: [{ settingId: 1, settingValue: 'phone' }],
                        roleList: [{ settingId: 1, settingValue: 'PIC' }],
                        countries: [{ id: 1, name: 'VN' }]
                    }
                };
                const params = {
                    values: {},
                    errors: {},
                    touched: {},
                    handleChange: jest.fn()
                };
                const container = shallow(<NewPicManagement {...props} />);
                container.instance().state.languages = [{ settingId: 1, settingValue: 'a', checked: false }];
                container.instance().renderCommunicationTool = jest.fn();
                // Act
                const result = shallow(container.instance().renderForm(params));

                // Assert
                expect(container.instance().renderCommunicationTool).toHaveBeenCalled();

                expect(result.find('#picName').length).toEqual(1);
                expect(result.find('#roleId').length).toEqual(1);
                expect(result.find('#countryId').length).toEqual(1);
                expect(result.find(MultipleSelect).length).toEqual(1);
                expect(result.find(Button).length).toEqual(2);
            });

            it('should render ResponseMessage when create successfully', () => {
                // Arrange
                const props = {
                    setting: {
                        languages: [],
                        communicationTools: [],
                        roleList: [],
                        countries: []
                    },
                    createPicResult: { isSuccessful: true, message: '' }
                };
                const params = {
                    values: {},
                    errors: {},
                    touched: {},
                    handleChange: jest.fn()
                };
                const container = shallow(<NewPicManagement {...props} />);
                container.instance().state.languages = [{ settingId: 1, settingValue: 'a', checked: false }];

                // Act
                const result = shallow(container.instance().renderForm(params));

                // Assert
                expect(result.find(ResponseMessage).length).toEqual(1);
            });

            it('should call handleChange when MultipleSelect change', () => {
                // Arrange
                const props = {
                    setting: {
                        languages: [],
                        communicationTools: [],
                        roleList: [],
                        countries: []
                    },
                    createPicResult: { isSuccessful: true, message: '' }
                };
                const tempFunc = jest.fn();
                const params = {
                    values: {},
                    errors: {},
                    touched: {},
                    handleChange: jest.fn(key => tempFunc)
                };
                const container = shallow(<NewPicManagement {...props} />);
                container.instance().state.languages = [{ settingId: 1, settingValue: 'a', checked: false }];
                const result = shallow(container.instance().renderForm(params));
                const selectedItemsKey = 'selectedItemsKey';

                // Act
                result.find(MultipleSelect).simulate('change', 'currentItem', selectedItemsKey);;

                // Assert
                expect(tempFunc).toHaveBeenCalledWith((selectedItemsKey));
            });
        });
    });
});