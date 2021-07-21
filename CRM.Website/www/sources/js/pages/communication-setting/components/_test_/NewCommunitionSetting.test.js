import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import NewCommunitionSettingWrapper, { NewCommunitionSetting } from '../NewCommunitionSetting';
import configureMockStore from 'redux-mock-store';
import { shallow, mount } from 'enzyme';
import MultipleSelect from '../../../../components/multiple-select/index';
import Tooltip from 'react-bootstrap/Tooltip';
import { Formik } from 'formik';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import LangHelper from '@jsroot/common/langHelper';

const mockStore = configureMockStore();

describe('NewCommunitionSetting', () => {
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
            createCommunicationResult: {},
            settings: {}
        };
        const store = mockStore(initialState);

        //Act
        const wrapper = shallow(<NewCommunitionSettingWrapper store={store} />);

        //Assert
        it('component render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('component has correct props', () => {
            expect(wrapper.props().children.props.createCommunicationResult).toEqual(initialState.createCommunicationResult);
            expect(wrapper.props().children.props.settings).toEqual(initialState.settings);
        });
    });

    it('renders Modal, Formik components', () => {
        //Arrange
        const props = {
            createCommunicationResult: {},
            settings: {}
        };

        //Act
        const container = shallow(<NewCommunitionSetting  {...props} />);

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
            }
        };

        //Act
        const container = mount(<NewCommunitionSetting {...props} />);

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
            createCommunicationResult: {
                show: true,
                isSuccessful: false,
                message: '' || 'InsertCommunicationSettingSuccessfully'
            }
        };
        const container = mount(<NewCommunitionSetting {...props} />);

        // Action
        const responseMessage = container.find(ResponseMessage);

        // Assert
        expect(responseMessage.props().isSuccessful).toBe(props.createCommunicationResult.isSuccessful);
        expect(responseMessage.props().message).toBe(props.createCommunicationResult.message);
    });

    it('should close popup when click close button', () => {
        // Arrange
        const props = {
            onClose: jest.fn(),
            settings: {
                mainCategories: [],
                communicationTools: [],
                subCategories: []
            }
        };

        const container = mount(<NewCommunitionSetting {...props} />);

        // Act
        container.find(Button).at(3).props().onClick();

        // Assert
        expect(props.onClose).toHaveBeenCalled();
    });

    describe('render form', () => {
        // Arrange
        const props = {
            settings: {
                mainCategories: [],
                subCategories: []
            }
        };
        const tempFunc = jest.fn();
        const mEvent = { clipboardData: { getData: jest.fn().mockReturnValueOnce('asd') } };
        const param = {
            values: { customerNameInput: 'asd' },
            errors: {
                mainCategoryTypesNew: 'main',
                subCategoryTypesNew: 'sub',
                comunicationToolTypesNew: 'tool',
                customerNameInput: 'asd'
            },
            touched: {
                mainCategoryTypesNew: true,
                subCategoryTypesNew: true,
                comunicationToolTypesNew: true,
                customerNameInput: true
            },
            handleChange: jest.fn(key => tempFunc),
            setFieldValue: jest.fn()
        };
        const state = {
            mainCategoryOptionsNew: [],
            subCategoryOptionsNew: [],
            communicationToolOptionsNew: [],
            selectedSubCategoryIdsNew: []
        };
        const container = shallow(<NewCommunitionSetting {...props} />).instance();
        container.mainCategoriesChangeNew = jest.fn();
        container.handleVerify = jest.fn();
        container.pasteCustomerHandler = jest.fn();
        container.setState(state);
        const form = shallow(container.renderFormNewCommunication(param));
        const selectedItemsKey = '1';

        it('should call correct function verify', () => {
            // Act
            form.find(Button).at(0).simulate('click');

            // Assert
            expect(container.handleVerify).toHaveBeenCalled();
        });

        it('should call correct function pasteCustomerHandler', () => {
            // Act
            form.find(Form.Control).simulate('paste', mEvent);

            // Assert
            expect(container.pasteCustomerHandler).toHaveBeenCalled();
        });

        it('should call correct functions when change comunicationToolTypesNew', () => {
            // Act
            form.find(MultipleSelect).at(2).simulate('change', 'currentItem', selectedItemsKey);

            // Assert
            expect(tempFunc).toHaveBeenCalledWith(selectedItemsKey);
        });

        it('should call correct functions when change mainCategoryTypesNew', () => {
            // Act
            form.find(MultipleSelect).at(0).simulate('change', 'currentItem', selectedItemsKey);

            // Assert
            expect(container.mainCategoriesChangeNew).toHaveBeenCalledWith('currentItem', selectedItemsKey, param.setFieldValue);
        });

        it('should call correct functions when change subCategoryTypesNew', () => {
            // Act
            form.find(MultipleSelect).at(1).simulate('change', 'currentItem', selectedItemsKey);

            // Assert
            expect(container.state.selectedSubCategoryIdsNew).toEqual('1');
        });

        it('should setFieldValue when click save and continue', () => {
            // Act
            form.find(Button).at(1).simulate('click');

            // Assert
            expect(param.setFieldValue).toHaveBeenCalled();
        });

        it('isInvalid mainCategoryTypesNew correctly', () => {
            // Assert
            expect(form.find(MultipleSelect).at(0).props().isInvalid).toEqual(param.errors.mainCategoryTypesNew);
        });

        it('isInvalid subCategoryTypesNew correctly', () => {
            // Assert
            expect(form.find(MultipleSelect).at(1).props().isInvalid).toEqual(param.errors.subCategoryTypesNew);
        });

        it('isInvalid customerNameInput correctly', () => {
            // Assert
            expect(form.find(Form.Control).props().isInvalid).toEqual(param.errors.customerNameInput);
        });

        it('isInvalid comunicationToolTypesNew correctly', () => {
            // Assert
            expect(form.find(MultipleSelect).at(2).props().isInvalid).toEqual(param.errors.comunicationToolTypesNew);
        });
    });

    describe('methods', () => {
        describe('isValidCustomer', () => {
            it('return true', async () => {
                // Arrange
                const props = {
                    createCommunicationResult: {},
                    settings: {}
                };

                const container = shallow(<NewCommunitionSetting {...props} />).instance();

                // Act
                const actual = container.isValidCustomer('asd');

                // Assert
                expect(actual).toEqual(true);
            });

            it('return false', async () => {
                // Arrange
                const props = {
                    createCommunicationResult: {},
                    settings: {}
                };

                const container = shallow(<NewCommunitionSetting {...props} />).instance();

                // Act
                const actual = container.isValidCustomer('asdsasdasadadsdsdaaaaaaaaaaaaadassadsdasddsasdasasadssadsdaassdasadsdasdadsads');

                // Assert
                expect(actual).toEqual(false);
            });
        });

        describe('handleVerify', () => {
            it('should calls setState when click', async () => {
                // Arrange
                const response = [{
                    id: 1,
                    name: 'ASD'
                }];
                const promise = Promise.resolve(response);
                const props = {
                    createCommunicationResult: {},
                    settings: {},
                    verifyUsername: jest.fn(() => promise)
                };
                const setFieldValue = jest.fn();
                const event = {
                    preventDefault: jest.fn()
                };
                const expected = [{ 'id': 1, 'name': 'ASD' }];
                const container = shallow(<NewCommunitionSetting {...props} />).instance();
                container.isValidCustomer = jest.fn(() => { return true; });
                // Act
                container.handleVerify(event, setFieldValue, 'asd');
                await promise;

                // Assert
                expect(event.preventDefault).toHaveBeenCalled();
                expect(container.isValidCustomer).toHaveBeenCalledWith('asd');
                expect(props.verifyUsername).toHaveBeenCalledWith({ Username: 'asd' });
                expect(container.state.listOfCustomer).toEqual(expected);
                expect(container.state.listOfCustomerValid).toEqual(expected);
                expect(setFieldValue).toHaveBeenCalled();
            });

            it('should calls setState with data null when click', async () => {
                // Arrange
                const response = [{
                    id: 1,
                    name: 'ASD'
                }];
                const promise = Promise.resolve(response);
                const props = {
                    createCommunicationResult: {},
                    settings: {},
                    verifyUsername: jest.fn(() => promise)
                };
                const setFieldValue = jest.fn();
                const event = {
                    preventDefault: jest.fn()
                };
                const expected = [{ 'id': 1, 'name': 'ASD' }];
                const container = shallow(<NewCommunitionSetting {...props} />).instance();
                container.isValidCustomer = jest.fn(() => { return false; });
                // Act
                container.handleVerify(event, setFieldValue, 'asd');
                await promise;

                // Assert
                expect(event.preventDefault).toHaveBeenCalled();
                expect(setFieldValue).toHaveBeenCalled();
            });

            it('should calls setState and remove duplicate when click ', async () => {
                // Arrange
                const response = [
                    { id: 1, name: 'ASD' },
                    { id: 1, name: 'ASD' }
                ];
                const promise = Promise.resolve(response);
                const props = {
                    createCommunicationResult: {},
                    settings: {},
                    verifyUsername: jest.fn(() => promise)
                };
                const event = {
                    preventDefault: jest.fn()
                };
                const setFieldValue = jest.fn();
                const expected = [{ 'id': 1, 'name': 'ASD' }];
                const container = shallow(<NewCommunitionSetting {...props} />).instance();

                // Act
                container.handleVerify(event, setFieldValue, 'asd,asd');
                await promise;

                // Assert
                expect(event.preventDefault).toHaveBeenCalled();
                expect(container.state.listOfCustomer).toEqual(expected);
                expect(container.state.listOfCustomerValid).toEqual(expected);
                expect(setFieldValue).toHaveBeenCalled();
            });
        });

        describe('pasteCustomerHandler', () => {
            it('should handle paste event', () => {
                // // Arrange
                const props = {
                    settings: {}
                };
                const setFieldValue = jest.fn();
                const event = { clipboardData: { getData: jest.fn().mockReturnValueOnce('asd') } };

                // Act
                const container = shallow(<NewCommunitionSetting {...props} />).instance();
                container.isValidCustomer = jest.fn().mockReturnValue(true);
                container.pasteCustomerHandler(event, 'asd', setFieldValue);

                // Assert
                expect(event.clipboardData.getData).toBeCalledWith('text');
                // Assert
            });
        });

        describe('mainCategoriesChangeNew', () => {
            it('should calls setFieldValue when change catagory', () => {
                // // Arrange
                const props = {
                    settings: {
                        mainCategories: [],
                        subCategories: []
                    }
                };
                const setFieldValue = jest.fn();

                // Act
                const container = shallow(<NewCommunitionSetting {...props} />);
                container.instance().mainCategoriesChangeNew([], '1', setFieldValue);

                // Assert
                expect(setFieldValue).toHaveBeenCalled();
            });

            it('should receive non duplicate subCategoryOptionsNew', () => {
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
                        ]
                    }
                };
                const setFieldValue = jest.fn();
                const state = {
                    selectedSubCategoryIdsNew: [],
                    subCategoryOptionsNew: []
                };
                const promise = Promise.resolve({});
                const expectedSubCategoryOptions = [
                    { checked: false, name: 'a', subCategoryId: 2 }
                ];

                // Act
                const container = shallow(<NewCommunitionSetting {...props} />);
                container.instance().setState(state);
                container.instance().mainCategoriesChangeNew('name', '1,2', setFieldValue);

                // Assert
                promise.then(() => {
                    expect(container.instance().state.selectedSubCategoryIdsNew).toEqual(state.selectedSubCategoryIdsNew);
                    expect(container.instance().state.subCategoryOptionsNew).toEqual(expectedSubCategoryOptions);
                });
            });

            it('should receive subCategoryOptionsNew with no check element', () => {
                // Arrange
                const props = {
                    settings: {
                        mainCategories: [{ mainCategoryID: 1 }],
                        subCategories: [{ mainCategoryID: 1, name: 'a', subCategoryId: 2 }]
                    }
                };
                const setFieldValue = jest.fn();
                const state = {
                    selectedSubCategoryIdsNew: []
                };
                const promise = Promise.resolve({});
                const expectedSubCategoryOptions = [
                    { checked: false, name: 'a', subCategoryId: 2 }
                ];

                // Act
                const container = shallow(<NewCommunitionSetting {...props} />);
                container.instance().setState(state);
                container.instance().mainCategoriesChangeNew('name', '1', setFieldValue);

                // Assert
                promise.then(() => {
                    expect(container.instance().state.selectedSubCategoryIdsNew).toEqual(state.selectedSubCategoryIdsNew);
                    expect(container.instance().state.subCategoryOptionsNew).toEqual(expectedSubCategoryOptions);
                });
            });

            it('should receive subCategoryOptionsNew with checked element', () => {
                // Arrange
                const props = {
                    settings: {
                        mainCategories: [{ mainCategoryID: 1 }],
                        subCategories: [
                            { mainCategoryID: 1, name: 'a', subCategoryId: 2 },
                            { mainCategoryID: 1, name: 'b', subCategoryId: 3 },
                            { mainCategoryID: 1, name: 'c', subCategoryId: 4 }
                        ]
                    }
                };
                const state = {
                    selectedSubCategoryIdsNew: '2,3'
                };
                const setFieldValue = jest.fn();
                const promise = Promise.resolve({});
                const expectedSubCategoryOptions = [
                    { checked: true, name: 'a', subCategoryId: 2 },
                    { checked: true, name: 'b', subCategoryId: 3 },
                    { checked: false, name: 'c', subCategoryId: 4 }
                ];
                // Act
                const container = shallow(<NewCommunitionSetting {...props} />);
                container.instance().setState(state);
                container.instance().mainCategoriesChangeNew('name', '1', setFieldValue);

                // Assert
                promise.then(() => {
                    expect(container.instance().state.selectedSubCategoryIdsNew).toEqual(state.selectedSubCategoryIdsNew);
                    expect(container.instance().state.subCategoryOptionsNew).toEqual(expectedSubCategoryOptions);
                });
            });

            it('should receive empty subCategoryOptionsNew when no catagory choose', () => {
                // Arrange
                const props = {
                    settings: {
                        mainCategories: [{ mainCategoryID: 1 }],
                        subCategories: [
                            { mainCategoryID: 1, name: 'a', subCategoryId: 2 },
                            { mainCategoryID: 1, name: 'b', subCategoryId: 3 },
                            { mainCategoryID: 1, name: 'c', subCategoryId: 4 }
                        ]
                    }
                };
                const state = {
                    selectedSubCategoryIdsNew: []
                };
                const setFieldValue = jest.fn();
                const promise = Promise.resolve({});

                // Act
                const container = shallow(<NewCommunitionSetting {...props} />);
                container.instance().setState(state);
                container.instance().mainCategoriesChangeNew('name', '', setFieldValue);

                // Assert
                promise.then(() => {
                    expect(container.instance().state.selectedSubCategoryIdsNew).toEqual(state.selectedSubCategoryIdsNew);
                    expect(container.instance().state.subCategoryOptionsNew).toEqual([]);
                });
            });
        });

        describe('handleResetSubCatagory', () => {
            it('should call setState', () => {
                // Arrange
                const props = {
                    settings: {}
                };
                const state = {
                    mainCategoryOptionsNew: [{ mainCategoryID: 1, name: 'test' }],
                    subCategoryOptionsNew: [],
                    communicationToolOptionsNew: [{ id: 1 }],
                    selectedSubCategoryIdsNew: []
                };

                // Act
                const container = shallow(<NewCommunitionSetting {...props} />).instance();
                container.setState(state);
                container.handleResetSubCatagory();

                // Assert
                expect(container.state.selectedSubCategoryIdsNew).toEqual('');
                expect(container.state.mainCategoryOptionsNew).toEqual([{ mainCategoryID: 1, name: 'test', checked: false }]);
                expect(container.state.subCategoryOptionsNew).toEqual([]);
                expect(container.state.communicationToolOptionsNew).toEqual([{ id: 1, checked: false }]);
            });
        });

        describe('renderTooltipCustomers', () => {
            it('should run correctly', () => {
                // Arrange
                const props = {
                    settings: {}
                };

                // Act
                const container = shallow(<NewCommunitionSetting {...props} />).instance();
                const actual = container.renderTooltipCustomers(props);

                // Assert
                expect(actual).toEqual(<Tooltip id='tooltip-customers' {...props}>
                    {LangHelper.getResource('MultipleCustomersTooltip')}
                </Tooltip>);
            });
        });

        describe('deleteCustomer', () => {
            it('should call setState', () => {
                // Arrange
                const props = {
                    settings: {}
                };
                const state = {
                    listOfCustomer: [{ custId: '1' }, { custId: '2' }, { custId: '3' }],
                    listOfCustomerValid: [{ custId: '1' }, { custId: '2' }, { custId: '3' }]
                };

                // Act
                const container = shallow(<NewCommunitionSetting {...props} />).instance();
                container.setState(state);
                container.deleteCustomer('1');

                // Assert
                expect(container.state.listOfCustomer).toEqual([{ custId: '2' }, { custId: '3' }]);
                expect(container.state.listOfCustomerValid).toEqual([{ custId: '2' }, { custId: '3' }]);
            });
        });

        describe('validateNewCommunication', () => {
            it('return null', () => {
                // Arrange
                const props = {
                    settings: {}
                };
                const state = { listOfCustomerValid: 'asd' };
                const values = {
                    mainCategoryTypesNew: '1',
                    subCategoryTypesNew: '1',
                    comunicationToolTypesNew: '1',
                    isSaveAndContinue: true,
                    customerNameInput: 'asd',
                    isVerifiedCustomers: true
                };

                // Act
                const container = shallow(<NewCommunitionSetting {...props} />).instance();
                container.setState(state);

                // Assert
                expect(container.validateNewCommunication(values)).toEqual({});
            });

            it('return errors', () => {
                // Arrange
                const props = {
                    settings: {}
                };
                const state = { listOfCustomerValid: '' };
                const values = {
                    mainCategoryTypesNew: '',
                    subCategoryTypesNew: '',
                    comunicationToolTypesNew: '',
                    customerNameInput: 'asd',
                    isVerifiedCustomers: false
                };
                const expected = {
                    "isVerifiedCustomers": LangHelper.getResource('VerifyListOfUsernameBeforeInsertSetting'),
                    "customerNameInput": LangHelper.getResource('ListofcustomersRequired'),
                    "mainCategoryTypesNew": LangHelper.getResource('CategoryRequired'),
                    "subCategoryTypesNew": LangHelper.getResource('SubCategoryRequired'),
                    "comunicationToolTypesNew": LangHelper.getResource('CommunicationToolRequired')
                };

                // Act
                const container = shallow(<NewCommunitionSetting {...props} />).instance();
                container.setState(state);
                // Assert
                expect(container.validateNewCommunication(values)).toEqual(expected);
            });
        });

        describe('handleSubmit', () => {
            it('should call exactly functions when click save and continue create successful', async () => {
                // Arrange
                const promise = Promise.resolve({});
                const values = {
                    mainCategoryTypesNew: '1',
                    subCategoryTypesNew: '1',
                    comunicationToolTypesNew: '1',
                    isSaveAndContinue: true,
                    customerNameInput: 'asd'
                };
                const state = { listOfCustomerValid: 'asd' };
                const formikBag = {
                    setSubmitting: jest.fn(),
                    resetForm: jest.fn()
                };
                const props = {
                    settings: {
                        mainCategories: [],
                        communicationTools: [],
                        subCategories: []
                    },
                    setCreateCommunicationResult: jest.fn(),
                    createCommunication: jest.fn(() => promise),
                    createCommunicationResult: { isSuccessful: true, message: '' }
                };

                // Act
                const container = shallow(<NewCommunitionSetting {...props} />).instance();
                container.setState(state);
                container.handleSubmit(values, formikBag);
                container.handleResetSubCatagory = jest.fn();
                await promise;
                jest.runAllTimers();

                // Assert
                expect(props.createCommunication).toHaveBeenCalledWith({
                    CategoryIds: '1',
                    SubCategoryIds: '1',
                    CommunicationIds: '1',
                    Customers: 'asd'
                });
                expect(values.customerNameInput).toEqual('');
                expect(container.state.listOfCustomerValid).toEqual('');
                expect(container.state.listOfCustomer).toEqual('');
                expect(container.state.isSuccessful).toEqual(true);
                expect(container.handleResetSubCatagory).toHaveBeenCalled();
                expect(formikBag.resetForm).toHaveBeenCalled();
                expect(props.setCreateCommunicationResult).toHaveBeenCalled();
            });

            it('should call exactly functions when create successful', async () => {
                // Arrange
                const promise = Promise.resolve({});
                const values = {
                    mainCategoryTypesNew: '1',
                    subCategoryTypesNew: '1',
                    comunicationToolTypesNew: '1',
                    isSaveAndContinue: false
                };
                const state = { listOfCustomerValid: 'asd', subCategoryOptionsNew: [1] };
                const formikBag = {
                    setSubmitting: jest.fn(),
                    resetForm: jest.fn()
                };
                const props = {
                    settings: {
                        mainCategories: [1],
                        communicationTools: [1],
                        subCategories: [1]
                    },
                    createCommunication: jest.fn(() => promise),
                    onSuccess: jest.fn(),
                    createCommunicationResult: { isSuccessful: true, message: '' }
                };
                const container = shallow(<NewCommunitionSetting {...props} />).instance();
                container.setState(state);

                // Act
                container.handleSubmit(values, formikBag);
                await promise;
                jest.runAllTimers();

                // Assert
                expect(formikBag.setSubmitting.mock.calls.length).toBe(1);
                expect(formikBag.setSubmitting.mock.calls[0][0]).toBe(true);
                expect(props.createCommunication).toHaveBeenCalledWith({
                    CategoryIds: '0',
                    SubCategoryIds: '0',
                    CommunicationIds: '1',
                    Customers: 'asd'
                });
                expect(props.onSuccess).toHaveBeenCalled();
            });

            it('should call exactly functions when create unsuccessful', async () => {
                const promise = Promise.resolve({});
                const values = {
                    mainCategoryTypesNew: '1',
                    subCategoryTypesNew: '1',
                    comunicationToolTypesNew: '1',
                    isSaveAndContinue: false
                };
                const state = { listOfCustomerValid: 'asd', subCategoryOptionsNew: [1] };
                const formikBag = {
                    setSubmitting: jest.fn(),
                    resetForm: jest.fn()
                };
                const props = {
                    settings: {
                        mainCategories: [1],
                        communicationTools: [1],
                        subCategories: [1]
                    },
                    createCommunication: jest.fn(() => promise),
                    createCommunicationResult: { isSuccessful: false, message: '' }
                };
                const container = shallow(<NewCommunitionSetting {...props} />).instance();
                container.setState(state);

                // Act
                container.handleSubmit(values, formikBag);
                await promise;
                jest.runAllTimers();

                // Assert
                expect(formikBag.setSubmitting).toHaveBeenCalledTimes(2);
                expect(formikBag.setSubmitting.mock.calls[0][0]).toBeTrue;
                expect(formikBag.setSubmitting.mock.calls[1][0]).toBeFalse;
            });
        });
    });
});