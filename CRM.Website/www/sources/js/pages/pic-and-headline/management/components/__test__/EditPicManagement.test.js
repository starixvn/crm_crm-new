import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { EditPicManagement } from '../EditPicManagement';
import { shallow } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import ResponseMessage from '@jsroot/components/ResponseMessage';

describe('EditPicManagement', () => {
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
            },
            selectedPic: {
                languages: [],
                communicationTools: []
            }
        };

        // Act
        const container = shallow(<EditPicManagement {...props} />);

        // Assert
        expect(container).toMatchSnapshot();
    });

    it('component has correct initialState', () => {
        // Arrange
        const props = {
            setting: {
                languages: [
                    { settingId: 1, settingValue: 'en' },
                    { settingId: 2, settingValue: 'vn' }
                ]
            },
            selectedPic: {
                languages: [
                    { settingId: 2, settingValue: 'vn' },
                    { settingId: 3, settingValue: 'hk' }
                ],
                communicationTools: [{ settingId: 1, value: 'aa' }]
            }
        };
        const communicationTools = props.selectedPic.communicationTools.map((item, index) => ({ type: item.settingId, value: item.value, unique: index }));
        const languages = [
            { settingId: 1, settingValue: 'en' },
            { settingId: 2, settingValue: 'vn', checked: true },
            { settingId: 3, settingValue: 'hk', checked: true }
        ];
        const initialState = {
            communicationTools,
            languages,
            showConfirmClose: false,
            confirmSave: {
                show: false,
                message: ''
            }
        };

        // Act
        const container = shallow(<EditPicManagement {...props} />);

        // Assert
        expect(container.state()).toEqual(initialState);
    });

    it('component map correct innerRef in formik', () => {
        // Arrange
        const props = {
            setting: {
                languages: []
            },
            selectedPic: {
                languages: [],
                communicationTools: []
            }
        };
        const expected = {};
        const container = shallow(<EditPicManagement {...props} />);

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
                    picId: 1,
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
                    },
                    selectedPic: {
                        languages: [],
                        communicationTools: []
                    }
                };
                const container = shallow(<EditPicManagement {...props} />);
                container.instance().getInitValue = jest.fn(() => initialValues);

                it('should call handleClosePopup if value popup not change', () => {
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

                it('should call setState showConfirmClose is true when value popup change', () => {
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
                },
                selectedPic: {
                    languages: [],
                    communicationTools: []
                }
            };
            const container = shallow(<EditPicManagement {...props} />);

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
                    selectedPic: {
                        languages: [],
                        communicationTools: []
                    },
                    setEditPicPopup: jest.fn(),
                    editPicResult: { isSuccessful: 1, message: '' },
                    setEditPicResult: jest.fn()
                };
                const container = shallow(<EditPicManagement {...props} />);

                // Act
                container.instance().handleClosePopup();

                // Assert
                expect(props.setEditPicPopup).toHaveBeenCalledWith({ show: false });
                expect(props.setEditPicResult).toHaveBeenCalledWith(null);
            });

            it('should not call setCreatePicResult when createPicResult is null', () => {
                // Arrange
                const props = {
                    setting: {
                        languages: []
                    },
                    selectedPic: {
                        languages: [],
                        communicationTools: []
                    },
                    setEditPicPopup: jest.fn(),
                    setEditPicResult: jest.fn()
                };
                const container = shallow(<EditPicManagement {...props} />);

                // Act
                container.instance().handleClosePopup();

                // Assert
                expect(props.setEditPicPopup).toHaveBeenCalledWith({ show: false });
                expect(props.setEditPicResult).toHaveBeenCalledTimes(0);
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
                },
                selectedPic: {
                    languages: [],
                    communicationTools: []
                }
            };
            const container = shallow(<EditPicManagement {...props} />);
            container.instance().state.communicationTools = [expected[0]];
            const valueCommunication = { type: expected[1].type, value: expected[1].value }
            container.instance()['formik'] = {
                values: {
                    ['communication-123456']: {}
                }
            };

            // Act
            container.instance().handleAddRowCommunication();

            // Assert\
            expect(container.instance().state.communicationTools).toEqual(expected);
            expect(container.instance().formik.values['communication-1466424490000']).toEqual(valueCommunication);
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
                },
                selectedPic: {
                    languages: [],
                    communicationTools: []
                }
            };
            const container = shallow(<EditPicManagement {...props} />);
            container.instance().state.communicationTools = communicationTools;
            container.instance()['formik'] = {
                values: {
                    ['communication-123456']: {},
                    ['communication-111111']: {},
                }
            };


            // Act
            container.instance().handleRemoveRowCommunication(111111);

            // Assert
            expect(container.instance().state.communicationTools).toEqual([communicationTools[0]]);
            expect(typeof container.instance().formik.values['communication-111111']).toEqual('undefined');
        });

        it('getTemplateEdit return expected', () => {
            // Arrange
            const props = {
                setting: {
                    languages: []
                },
                selectedPic: {
                    languages: [],
                    communicationTools: []
                }
            };
            const container = shallow(<EditPicManagement {...props} />);

            const values = {
                picId: 1,
                picName: 'a',
                roleId: 1,
                languageIds: '',
                countryId: 10,
                remark: '',
                ['communication-0']: {
                    type: 1,
                    value: 'a'
                },
                ['communication-1']: {
                    type: 1,
                    value: 'b'
                },
                ['communication-2']: {
                    type: 2,
                    value: '2'
                }
            };

            const expected = {
                picId: 1,
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
            const result = container.instance().getTemplateEdit(values);

            // Assert
            expect(result).toEqual(expected);
        });

        describe('handleSubmit run correctly', () => {
            const values = {
                picId: 1,
                picName: 'a',
                roleId: 1,
                languageIds: '',
                countryId: 10,
                remark: '',
                ['communication-0']: {
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
                    selectedPic: {
                        languages: [],
                        communicationTools: []
                    },
                    editPic: jest.fn(() => promise),
                    getGridData: jest.fn(),
                    setEditPicResult: jest.fn(),
                    gridParams: {},
                    editPicResult: { isSuccessful: true, message: '' }
                };
                const container = shallow(<EditPicManagement {...props} />);
                container.instance().handleClosePopup = jest.fn();
                container.instance().getTemplateEdit = jest.fn(values => templateCreate);
                // Act
                container.instance().handleSubmit(values, formik);
                await promise;
                jest.runAllTimers();

                // Assert
                expect(formik.setSubmitting).toHaveBeenCalledTimes(1);
                expect(formik.setSubmitting.mock.calls[0][0]).toBeTrue;

                expect(container.instance().handleClosePopup).toHaveBeenCalled();
                expect(props.editPic).toHaveBeenCalledWith(templateCreate);
                expect(props.getGridData).toHaveBeenCalledWith(props.gridParams);
                expect(props.setEditPicResult).toHaveBeenCalledWith(null);
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
                    selectedPic: {
                        languages: [],
                        communicationTools: []
                    },
                    editPic: jest.fn(() => promise),
                    editPicResult: { isSuccessful: false, message: '' }
                };
                const container = shallow(<EditPicManagement {...props} />);
                container.instance().handleClosePopup = jest.fn();
                container.instance().getTemplateEdit = jest.fn(values => templateCreate);

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

            const values = {
                'communication-1': { type: 1 },
                'communication-2': { type: 2 }
            }

            it('should render expected', () => {
                // Arrange
                const props = {
                    setting: {
                        languages: [],
                        communicationTools: [
                            { settingId: 1, settingValue: 'email' },
                            { settingId: 2, settingValue: 'phone' },
                        ]
                    },
                    selectedPic: {
                        languages: [],
                        communicationTools: []
                    }
                };
                const container = shallow(<EditPicManagement {...props} />);
                container.instance().state.communicationTools = communicationTools;

                // Act
                const result = shallow(<div>
                    {container.instance().renderCommunicationTool({ values, errors: {}, touched: {} })}
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
                    },
                    selectedPic: {
                        languages: [],
                        communicationTools: []
                    }
                };
                const container = shallow(<EditPicManagement {...props} />);
                container.instance().state.communicationTools = communicationTools;
                container.instance().handleRemoveRowCommunication = jest.fn();

                // Act
                const result = shallow(<div>
                    {container.instance().renderCommunicationTool({ values, errors: {}, touched: {} })}
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
                    },
                    selectedPic: {
                        languages: [],
                        communicationTools: []
                    }
                };
                const container = shallow(<EditPicManagement {...props} />);
                container.instance().state.communicationTools = communicationTools;
                container.instance().handleAddRowCommunication = jest.fn();

                // Act
                const result = shallow(<div>
                    {container.instance().renderCommunicationTool({ values, errors: {}, touched: {} })}
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
                    },
                    selectedPic: {
                        languages: [],
                        communicationTools: []
                    }
                };
                const params = {
                    values: {},
                    errors: {},
                    touched: {},
                    handleChange: jest.fn()
                };
                const container = shallow(<EditPicManagement {...props} />);
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
                    selectedPic: {
                        languages: [],
                        communicationTools: []
                    },
                    editPicResult: { isSuccessful: true, message: '' }
                };
                const params = {
                    values: {},
                    errors: {},
                    touched: {},
                    handleChange: jest.fn()
                };
                const container = shallow(<EditPicManagement {...props} />);
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
                    selectedPic: {
                        languages: [],
                        communicationTools: []
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
                const container = shallow(<EditPicManagement {...props} />);
                container.instance().state.languages = [{ settingId: 1, settingValue: 'a', checked: false }];
                const result = shallow(container.instance().renderForm(params));
                const selectedItemsKey = 'selectedItemsKey';

                // Act
                result.find(MultipleSelect).simulate('change', 'currentItem', selectedItemsKey);;

                // Assert
                expect(tempFunc).toHaveBeenCalledWith((selectedItemsKey));
            });
        });

        describe('handleConfirmSavePopup', () => {
            const templateCreate = {
                picId: 1,
                picName: 'a',
                role: 1,
                language: '',
                picCommunicationTools: [
                    { type: 1, value: 'a' }
                ]
            };

            const values = {};

            it('should call expected method when validateEditPicResult have value', async () => {
                // Arrange
                const promise = Promise.resolve({});
                const props = {
                    setting: {
                        languages: []
                    },
                    selectedPic: {
                        languages: [],
                        communicationTools: []
                    },
                    validateEditPic: jest.fn(() => promise),
                    validateEditPicResult: 'data',
                    setValidateEditPicResult: jest.fn()
                };
                const container = shallow(<EditPicManagement {...props} />);
                container.instance()['formik'] = {
                    values
                };

                container.instance().getTemplateEdit = jest.fn(values => templateCreate);
                const expectedParams = {
                    picId: templateCreate.picId,
                    picCommunicationTools: templateCreate.picCommunicationTools
                }

                // Act
                container.instance().handleConfirmSavePopup();
                await promise;
                jest.runAllTimers();

                // Assert
                expect(container.instance().getTemplateEdit).toHaveBeenCalledWith(values);
                expect(props.validateEditPic).toHaveBeenCalledWith(expectedParams);
                expect(container.instance().state.confirmSave.show).toBeTrue;
                expect(container.instance().state.confirmSave.message).toEqual(props.validateEditPicResult);
                expect(props.setValidateEditPicResult).toHaveBeenCalledWith(null);
            });

            it('should call handleSubmit formik when validateEditPicResult is null', async () => {
                // Arrange
                const promise = Promise.resolve({});
                const props = {
                    setting: {
                        languages: []
                    },
                    selectedPic: {
                        languages: [],
                        communicationTools: []
                    },
                    validateEditPic: jest.fn(() => promise),
                    validateEditPicResult: null,
                };
                const container = shallow(<EditPicManagement {...props} />);
                const formik = {
                    values,
                    handleSubmit: jest.fn()
                };
                container.instance()['formik'] = formik

                container.instance().getTemplateEdit = jest.fn(values => templateCreate);
                const expectedParams = {
                    picId: templateCreate.picId,
                    picCommunicationTools: templateCreate.picCommunicationTools
                }

                // Act
                container.instance().handleConfirmSavePopup();
                await promise;
                jest.runAllTimers();

                // Assert
                expect(container.instance().getTemplateEdit).toHaveBeenCalledWith(values);
                expect(props.validateEditPic).toHaveBeenCalledWith(expectedParams);
                expect(formik.handleSubmit).toHaveBeenCalled();
            });
        });

        describe('handleSubmitEditConfirm', () => {
            it('should call handleCloseEditConfirm and submit formik', () => {
                // Arrange
                const formik = {
                    handleSubmit: jest.fn()
                };
                const props = {
                    setting: {
                        languages: []
                    },
                    selectedPic: {
                        languages: [],
                        communicationTools: []
                    }
                };
                const container = shallow(<EditPicManagement {...props} />);
                container.instance()['formik'] = formik;
                container.instance().handleCloseEditConfirm = jest.fn();

                // Act
                container.instance().handleSubmitEditConfirm();

                // Assert
                expect(container.instance().handleCloseEditConfirm).toHaveBeenCalled();
                expect(formik.handleSubmit).toHaveBeenCalled();
            });
        });

        it('handleCloseEditConfirm should set state confirmSave with show is false and message is empty', () => {
            // Arrange
            const props = {
                setting: {
                    languages: []
                },
                selectedPic: {
                    languages: [],
                    communicationTools: []
                }
            };
            const container = shallow(<EditPicManagement {...props} />);

            // Act
            container.instance().handleCloseEditConfirm();

            // Assert
            expect(container.instance().state.confirmSave.show).toBeFalse;
            expect(container.instance().state.confirmSave.message).toEqual('');
        });
    });
});
