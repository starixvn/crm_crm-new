import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import EditCommunitionSettingWrapper, { EditCommunitionSetting } from '../EditCommunitionSetting';
import configureMockStore from 'redux-mock-store';
import { shallow, mount } from 'enzyme';
import { Formik } from 'formik';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import LangHelper from '@jsroot/common/langHelper';

const mockStore = configureMockStore();
describe('EditCommunitionSetting', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        LangHelper.getResource = jest.fn((key) => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('component with redux', () => {
        //Arrange
        const initialState = {
            settings: {},
            editCommunicationResult: {},
            selectCommunication: {}
        };
        const store = mockStore(initialState);

        //Act
        const wrapper = shallow(<EditCommunitionSettingWrapper store={store} />);

        //Assert
        it('component render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('component has correct props', () => {
            expect(wrapper.props().children.props.settings).toEqual(initialState.settings);
            expect(wrapper.props().children.props.editCommunicationResult).toEqual(initialState.editCommunicationResult);
            expect(wrapper.props().children.props.selectCommunication).toEqual(initialState.selectCommunication);
        });
    });

    it('renders Modal, Formik components', () => {
        //Arrange
        const props = {
            settings: {
                mainCategories: [],
                communicationTools: [],
                subCategories: []
            },
            editCommunicationResult: [],
            selectCommunication: []
        };

        //Act
        const container = shallow(<EditCommunitionSetting  {...props} />);

        //Assert
        expect(container.find(Modal)).toHaveLength(1);
        expect(container.find(Formik)).toHaveLength(1);
    });

    it('renders MultipleSelect components', () => {
        // Arrange
        const props = {
            settings: {
                mainCategories: [],
                communicationTools: [],
                subCategories: []
            },
            editCommunicationResult: [],
            selectCommunication: []
        };

        //Act
        const container = mount(<EditCommunitionSetting {...props} />);

        //Assert
        expect(container.find(MultipleSelect)).toHaveLength(3);
    });

    it('component render correctly message', () => {
        // Arrange
        const props = {
            settings: {
                mainCategories: [],
                communicationTools: [],
                subCategories: []
            },
            selectCommunication: {
                category: '',
                commTool: '',
                subCategory: '',
                username: ''
            },
            editCommunicationResult: {
                show: true,
                isSuccessful: false,
                message: '' || 'UpdateCommunicationSettingSuccessfully'
            }
        };
        const container = mount(<EditCommunitionSetting {...props} />);

        // Action
        const responseMessage = container.find(ResponseMessage);

        // Assert
        expect(responseMessage.props().isSuccessful).toBe(props.editCommunicationResult.isSuccessful);
        expect(responseMessage.props().message).toBe(props.editCommunicationResult.message);
    });

    describe('render form', () => {
        // Arrange
        const props = {
            settings: {
                mainCategories: [],
                communicationTools: [],
                subCategories: []
            },
            selectCommunication: {
                category: '',
                commTool: '',
                subCategory: '',
                username: ''
            }
        };
        const tempFunc = jest.fn();
        const param = {
            values: { customerNameInput: 'asd' },
            errors: {
                mainCategoryTypesEdit: 'main',
                subCategoryTypesEdit: 'sub',
                comunicationToolTypesEdit: 'tool'
            },
            touched: {
                mainCategoryTypesEdit: true,
                subCategoryTypesEdit: true,
                comunicationToolTypesEdit: true
            },
            handleChange: jest.fn(key => tempFunc),
            setFieldValue: jest.fn()
        };
        const state = {
            mainCategoryOptionsEdit: [],
            subCategoryOptionsEdit: [],
            communicationToolOptionsEdit: [],
            selectedSubCategoryIdsEdit: []
        };
        const container = shallow(<EditCommunitionSetting {...props} />).instance();
        container.mainCategoriesChangeEdit = jest.fn();
        container.setState(state);
        const form = shallow(container.renderFormEditCommunication(param));
        const selectedItemsKey = '1';

        it('should call correct functions when change comunicationToolTypesEdit', () => {
            // Act
            form.find(MultipleSelect).at(2).simulate('change', 'currentItem', selectedItemsKey);

            // Assert
            expect(tempFunc).toHaveBeenCalledWith(selectedItemsKey);
        });

        it('should call correct functions when change mainCategoryTypesEdit', () => {
            // Act
            form.find(MultipleSelect).at(0).simulate('change', 'currentItem', selectedItemsKey);

            // Assert
            expect(container.mainCategoriesChangeEdit).toHaveBeenCalledWith('currentItem', selectedItemsKey, param.setFieldValue);
        });

        it('should call correct functions when change subCategoryTypesEdit', () => {
            // Act
            form.find(MultipleSelect).at(1).simulate('change', 'currentItem', selectedItemsKey);

            // Assert
            expect(container.state.selectedSubCategoryIdsEdit).toEqual('1');
        });

        it('isInvalid mainCategoryTypesEdit correctly', () => {
            // Assert
            expect(form.find(MultipleSelect).at(0).props().isInvalid).toEqual(param.errors.mainCategoryTypesEdit);
        });

        it('isInvalid subCategoryTypesEdit correctly', () => {
            // Assert
            expect(form.find(MultipleSelect).at(1).props().isInvalid).toEqual(param.errors.subCategoryTypesEdit);
        });

        it('isInvalid comunicationToolTypesEdit correctly', () => {
            // Assert
            expect(form.find(MultipleSelect).at(2).props().isInvalid).toEqual(param.errors.comunicationToolTypesEdit);
        });
    });

    it('should close popup when click close button', () => {
        // Arrange
        const props = {
            onClose: jest.fn(),
            settings: {
                mainCategories: [],
                communicationTools: [],
                subCategories: []
            },
            editCommunicationResult: [],
            selectCommunication: []
        };

        const container = mount(<EditCommunitionSetting {...props} />);

        // Act
        container.find(Button).at(1).props().onClick();

        // Assert
        expect(props.onClose).toHaveBeenCalled();
    });

    describe('methods', () => {
        describe('componentDidMount', () => {
            it('method run correctly', () => {
                // Arrange
                const props = {
                    settings: {
                        mainCategories: [{ mainCategoryID: '1', name: 'a' }],
                        communicationTools: [{ id: '2', name: 'a' }],
                        subCategories: [{ subCategoryId: '3', mainCategoryID: '1', name: 'b' }]
                    },
                    editCommunicationResult: [],
                    selectCommunication: { category: '1', commTool: '2', subCategory: '3', username: 'asd' }
                };
                const expected = {
                    mainCategoryOptionsEdit: [{ mainCategoryID: '1', name: 'a', checked: true }],
                    subCategoryOptionsEdit: [{ subCategoryId: '3', name: 'b', checked: true }],
                    communicationToolOptionsEdit: [{ id: '2', name: 'a', checked: true }],
                    selectedSubCategoryIdsEdit: '3'
                };

                // Act
                const container = mount(<EditCommunitionSetting {...props} />).instance();
                container.isCheckCatagories = jest.fn().mockReturnValue(true);

                // Assert
                expect(container.state.mainCategoryOptionsEdit).toEqual(expected.mainCategoryOptionsEdit);
                expect(container.state.subCategoryOptionsEdit).toEqual(expected.subCategoryOptionsEdit);
                expect(container.state.communicationToolOptionsEdit).toEqual(expected.communicationToolOptionsEdit);
                expect(container.state.selectedSubCategoryIdsEdit).toEqual(expected.selectedSubCategoryIdsEdit);
            });

            it('setState subcatagories base on catagories', () => {
                // Arrange
                const props = {
                    settings: {
                        mainCategories: [
                            { mainCategoryID: '1', name: 'a' }
                        ],
                        communicationTools: [
                            { id: '2', name: 'a' },
                            { id: '3', name: 'b' }
                        ],
                        subCategories: [
                            { subCategoryId: '3', mainCategoryID: '1', name: 'b' },
                            { subCategoryId: '4', mainCategoryID: '1', name: 'c' },
                            { subCategoryId: '5', mainCategoryID: '2', name: 'd' }
                        ]
                    },
                    editCommunicationResult: [],
                    selectCommunication: {
                        category: '0', commTool: '2', subCategory: '0', username: 'asd'
                    }
                };
                const expected = {
                    mainCategoryOptionsEdit: [{
                        mainCategoryID: '1', name: 'a', checked: true
                    }],
                    subCategoryOptionsEdit: [
                        { subCategoryId: '3', name: 'b', checked: true },
                        { subCategoryId: '4', name: 'c', checked: true }],
                    communicationToolOptionsEdit: [
                        { id: '2', name: 'a', checked: true },
                        { id: '3', name: 'b', checked: false }
                    ],
                    selectedSubCategoryIdsEdit: '3,4'
                };

                // Act
                const container = mount(<EditCommunitionSetting {...props} />).instance();
                container.isCheckCatagories = jest.fn().mockReturnValue(true);

                // Assert
                expect(container.state.mainCategoryOptionsEdit).toEqual(expected.mainCategoryOptionsEdit);
                expect(container.state.subCategoryOptionsEdit).toEqual(expected.subCategoryOptionsEdit);
                expect(container.state.communicationToolOptionsEdit).toEqual(expected.communicationToolOptionsEdit);
                expect(container.state.selectedSubCategoryIdsEdit).toEqual(expected.selectedSubCategoryIdsEdit);
            });
        });
        describe('isCheckCatagories', () => {
            const props = {
                settings: {
                    mainCategories: [],
                    communicationTools: [],
                    subCategories: []
                },
                selectCommunication: []
            };
            const testCases = [
                {
                    selectedData: '1',
                    index: 1,
                    expected: true
                },
                {
                    selectedData: '0',
                    index: 1,
                    expected: true
                },
                {
                    selectedData: '2',
                    index: 1,
                    expected: false
                }
            ];
            testCases.forEach(test => {
                it(`'return ${test.expected} with selectedData: ${test.selectedData}'`
                    , () => {
                        //Act
                        const container = shallow(<EditCommunitionSetting  {...props} />).instance();
                        const actual = container.isCheckCatagories(test.selectedData, test.index);

                        //Assert
                        expect(actual).toEqual(test.expected);
                    });
            });
        });

        describe('mainCategoriesChangeEdit', () => {
            it('should calls setFieldValue when change catagory', () => {
                // // Arrange
                const props = {
                    settings: {
                        mainCategories: [],
                        communicationTools: [],
                        subCategories: []
                    },
                    selectCommunication: []
                };
                const state = {
                    selectedSubCategoryIdsEdit: []
                };
                const setFieldValue = jest.fn();

                // Act
                const container = shallow(<EditCommunitionSetting {...props} />);
                container.instance().setState(state);
                container.instance().mainCategoriesChangeEdit([], '1', setFieldValue);

                // Assert
                expect(setFieldValue).toHaveBeenCalled();
            });

            it('should receive non duplicate subCategoryOptionsEdit', () => {
                // Arrange
                const props = {
                    settings: {
                        mainCategories: [
                            { mainCategoryID: 1 },
                            { mainCategoryID: 2 }
                        ],
                        subCategories: [
                            { mainCategoryID: 1, name: 'a', subCategoryId: 2 },
                            { mainCategoryID: 2, name: 'a', subCategoryId: 2 }
                        ],
                        communicationTools: []
                    },
                    selectCommunication: { category: [], subCategory: [] }
                };
                const setFieldValue = jest.fn();
                const state = {
                    selectedSubCategoryIdsEdit: []
                };
                const promise = Promise.resolve({});
                const expectedSubCategoryOptions = [
                    { checked: false, name: 'a', subCategoryId: 2 }
                ];

                // Act
                const container = shallow(<EditCommunitionSetting {...props} />);
                container.instance().setState(state);
                container.instance().mainCategoriesChangeEdit('name', '1,2', setFieldValue);

                // Assert
                promise.then(() => {
                    expect(container.instance().state.selectedSubCategoryIdsEdit).toEqual([]);
                    expect(container.instance().state.subCategoryOptionsEdit).toEqual(expectedSubCategoryOptions);
                });
            });

            it('should receive subCategoryOptionsEdit with no check element', () => {
                // Arrange
                const props = {
                    settings: {
                        mainCategories: [{ mainCategoryID: 1 }],
                        subCategories: [{ mainCategoryID: 1, name: 'a', subCategoryId: 2 }],
                        communicationTools: []
                    },
                    selectCommunication: { category: [], subCategory: [] }
                };
                const setFieldValue = jest.fn();
                const state = {
                    selectedSubCategoryIdsEdit: []
                };
                const promise = Promise.resolve({});
                const expectedSubCategoryOptions = [
                    { checked: false, name: 'a', subCategoryId: 2 }
                ];

                // Act
                const container = shallow(<EditCommunitionSetting {...props} />);
                container.instance().setState(state);
                container.instance().mainCategoriesChangeEdit('name', '1', setFieldValue);

                // Assert
                promise.then(() => {
                    expect(container.instance().state.selectedSubCategoryIdsEdit).toEqual([]);
                    expect(container.instance().state.subCategoryOptionsEdit).toEqual(expectedSubCategoryOptions);
                });
            });

            it('should receive subCategoryOptionsEdit with checked element', () => {
                // Arrange
                const props = {
                    settings: {
                        mainCategories: [{ mainCategoryID: 1 }],
                        subCategories: [
                            { mainCategoryID: 1, name: 'a', subCategoryId: 2 },
                            { mainCategoryID: 1, name: 'b', subCategoryId: 3 },
                            { mainCategoryID: 1, name: 'c', subCategoryId: 4 }
                        ],
                        communicationTools: []
                    },
                    selectCommunication: { category: [], subCategory: [] }
                };
                const state = {
                    selectedSubCategoryIdsEdit: '2,3'
                };
                const setFieldValue = jest.fn();
                const promise = Promise.resolve({});
                const expectedSubCategoryOptions = [
                    { checked: true, name: 'a', subCategoryId: 2 },
                    { checked: true, name: 'b', subCategoryId: 3 },
                    { checked: false, name: 'c', subCategoryId: 4 }
                ];
                // Act
                const container = shallow(<EditCommunitionSetting {...props} />);
                container.instance().setState(state);
                container.instance().mainCategoriesChangeEdit('name', '1', setFieldValue);

                // Assert
                promise.then(() => {
                    expect(container.instance().state.selectedSubCategoryIdsEdit).toEqual(state.selectedSubCategoryIdsEdit);
                    expect(container.instance().state.subCategoryOptionsEdit).toEqual(expectedSubCategoryOptions);
                });
            });

            it('should receive empty subCategoryOptionsEdit when no catagory choose', () => {
                // Arrange
                const props = {
                    settings: {
                        mainCategories: [{ mainCategoryID: 1 }],
                        subCategories: [
                            { mainCategoryID: 1, name: 'a', subCategoryId: 2 },
                            { mainCategoryID: 1, name: 'b', subCategoryId: 3 },
                            { mainCategoryID: 1, name: 'c', subCategoryId: 4 }
                        ],
                        communicationTools: []
                    },
                    selectCommunication: { category: [], subCategory: [] }
                };
                const state = {
                    selectedSubCategoryIdsEdit: []
                };
                const setFieldValue = jest.fn();
                const promise = Promise.resolve({});
                const expectedSubCategoryOptions = [];

                // Act
                const container = shallow(<EditCommunitionSetting {...props} />);
                container.instance().setState(state);
                container.instance().mainCategoriesChangeEdit('name', '', setFieldValue);

                // Assert
                promise.then(() => {
                    expect(container.instance().state.selectedSubCategoryIdsEdit).toEqual(state.selectedSubCategoryIdsEdit);
                    expect(container.instance().state.subCategoryOptionsEdit).toEqual(expectedSubCategoryOptions);
                });
            });
        });

        describe('validateEditCommunication', () => {
            it('return null', () => {
                // Arrange
                const props = {
                    settings: {
                        mainCategories: [],
                        communicationTools: [],
                        subCategories: []
                    },
                    selectCommunication: {}
                };
                const values = {
                    mainCategoryTypesEdit: '1',
                    subCategoryTypesEdit: '1',
                    comunicationToolTypesEdit: '1'
                };

                // Act
                const container = shallow(<EditCommunitionSetting {...props} />).instance();

                // Assert
                expect(container.validateEditCommunication(values)).toEqual({});
            });

            it('return errors', () => {
                // Arrange
                const props = {
                    settings: {
                        mainCategories: [],
                        communicationTools: [],
                        subCategories: []
                    },
                    selectCommunication: {}
                };
                const values = {
                    mainCategoryTypesEdit: '',
                    subCategoryTypesEdit: '',
                    comunicationToolTypesEdit: ''
                };
                const expected = {
                    "mainCategoryTypesEdit": LangHelper.getResource('CategoryRequired'),
                    "subCategoryTypesEdit": LangHelper.getResource('SubCategoryRequied'),
                    "comunicationToolTypesEdit": LangHelper.getResource('CommunicationToolRequired')
                };

                // Act
                const container = shallow(<EditCommunitionSetting {...props} />).instance();

                // Assert
                expect(container.validateEditCommunication(values)).toEqual(expected);
            });
        });

        describe('handleSubmit', () => {
            it('should call exactly functions when edit successful', async () => {
                // Arrange
                const promise = Promise.resolve({});
                const values = {
                    mainCategoryTypesEdit: '1',
                    subCategoryTypesEdit: '1',
                    comunicationToolTypesEdit: '1',
                    defaultCommId: '1'
                };
                const formikBag = {
                    setSubmitting: jest.fn()
                };
                const props = {
                    settings: {
                        mainCategories: [{ mainCategoryID: 1 }],
                        communicationTools: [],
                        subCategories: []
                    },
                    selectCommunication: { category: '0' },
                    editCommunication: jest.fn(() => promise),
                    onSuccess: jest.fn(),
                    editCommunicationResult: { isSuccessful: true, message: '' }
                };
                const state = { subCategoryOptionsEdit: ['1'] };
                const container = shallow(<EditCommunitionSetting {...props} />).instance();
                container.setState(state);

                // Act
                container.handleSubmit(values, formikBag);
                await promise;
                jest.runAllTimers();

                // Assert
                expect(formikBag.setSubmitting.mock.calls.length).toBe(1);
                expect(formikBag.setSubmitting.mock.calls[0][0]).toBe(true);

                expect(props.editCommunication).toHaveBeenCalledWith({
                    CategoryIds: '0',
                    CommunicationIds: '1',
                    DefaultCommId: '1',
                    SubCategoryIds: '0'
                });
                expect(props.onSuccess).toHaveBeenCalled();
            });

            it('should call exactly functions when edit unsuccessful', async () => {
                // Arrange
                const promise = Promise.resolve({});
                const values = {
                    mainCategoryTypesEdit: '1',
                    subCategoryTypesEdit: '1',
                    comunicationToolTypesEdit: '1',
                    defaultCommId: '1'
                };
                const formikBag = {
                    setSubmitting: jest.fn()
                };
                const props = {
                    settings: {
                        mainCategories: [],
                        communicationTools: [],
                        subCategories: []
                    },
                    selectCommunication: {},
                    editCommunication: jest.fn(() => promise),
                    onSuccess: jest.fn(),
                    editCommunicationResult: { isSuccessful: false, message: '' }
                };
                const container = shallow(<EditCommunitionSetting {...props} />).instance();

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
    });
});