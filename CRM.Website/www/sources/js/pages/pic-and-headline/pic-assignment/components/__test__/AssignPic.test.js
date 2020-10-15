import React from 'react';
import AssignPicWrapper, { AssignPic } from '../AssignPic';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import LangHelper from '@jsroot/common/langHelper';
import functions from '../../common.functions';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import { Button, Col, Form, Modal, Row, Alert } from 'react-bootstrap';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import ConfirmAssignedDirectAccount from '../ConfirmAssignedDirectAccount';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';
import Select from '@jsroot/components/CustomReactSelect';

describe('AssignPic', () => {
    LangHelper.formatString = jest.fn(value => value);
    LangHelper.getResource = jest.fn(value => value);

    describe('component with redux', () => {
        // Arrange
        const mockStore = configureMockStore();
        const initialState = {
            settings: {},
            assignPicResult: {},
            validateAssignPicResult: {},
            gridParams: {},
            assignPicFilter: {},
            confirmAssignedDirectAccountPopup: {},
            assignPicPopup: {}
        };

        const store = mockStore(initialState);
        
        // Action
        const wrapper = shallow(<AssignPicWrapper store={store} />);

        // Assert
        it('component render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('component has correct props', () => {
            expect(wrapper.props().children.props.settings).toEqual(
                initialState.settings
            );
            expect(wrapper.props().children.props.assignPicResult).toEqual(
                initialState.assignPicResult
            );
            expect(wrapper.props().children.props.validateAssignPicResult).toEqual(
                initialState.validateAssignPicResult
            );
            expect(wrapper.props().children.props.gridParams).toEqual(
                initialState.gridParams
            );
            expect(wrapper.props().children.props.assignPicFilter).toEqual(
                initialState.assignPicFilter
            );
            expect(wrapper.props().children.props.confirmAssignedDirectAccountPopup).toEqual(
                initialState.confirmAssignedDirectAccountPopup
            );
            expect(wrapper.props().children.props.assignPicPopup).toEqual(
                initialState.assignPicPopup
            );
        });
    });

    it('has correct initial state', () => {
        // Arrange
        const props = {
            settings: {
                headlineList: [],
                picList: []
            },
            assignPicResult: {},
            validateAssignPicResult: {},
            gridParams: {},
            assignPicFilter: {
                directAccount: []
            },
            confirmAssignedDirectAccountPopup: {},
            assignPicPopup: {},
            setAssignPicResult: jest.fn()
        };

        // Action
        const assignPic = shallow(<AssignPic {...props} />);

        // Assert
        expect(assignPic.instance().state).toEqual({
            maxUsername: 10000,
            headlineOptions: [],
            picOptions: [],
            isShowConfirmPopup: false,
            oldAssignPicFilter: {
                headline: null,
                pics: [],
                directAccount: []
            },
            validate: {
                show: false,
                errMsg: []
            }
        });
    });

    describe('componentDidMount', () => {
        it('runs regularly', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [ { id: 1, name: 'headline1' } ],
                    picList: [ { id: 1, name: 'pic1' } ]
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn()
            };

            const headlineOptions = props.settings.headlineList.map(item => {
                return {
                    value: item.id,
                    label: item.name
                };
            });
    
            const picOptions = props.settings.picList.map(item => {
                return {
                    value: item.picId,
                    label: `${item.username} (${item.roleName})`
                };
            });

            const assignPic = shallow(<AssignPic {...props} />);
            
            // Action
            assignPic.instance().componentDidMount();

            // Assert
            expect(assignPic.instance().state.headlineOptions).toEqual(headlineOptions);
            expect(assignPic.instance().state.picOptions).toEqual(picOptions);
            expect(props.setAssignPicResult).toHaveBeenCalledWith({ show: false });
        });
        
        it('runs when has data headlineId', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [ { id: 1, name: 'headline1' } ],
                    picList: [ { id: 1, name: 'pic1' } ]
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                data: {
                    headlineId: 1,
                    accountNames: [ 'name' ]
                },
                setAssignPicResult: jest.fn(),
                setAssignPicFilter: jest.fn()
            };

            const headlineOptions = props.settings.headlineList.map(item => {
                return {
                    value: item.id,
                    label: item.name
                };
            });
    
            const picOptions = props.settings.picList.map(item => {
                return {
                    value: item.picId,
                    label: `${item.username} (${item.roleName})`
                };
            });

            const { headlineId, accountNames } = props.data;
            const headline = headlineOptions.filter(item => item.value === headlineId)[0];
            const assignPicFilter = {
                headline,
                pics: [],
                directAccount: accountNames.map(item => {
                    return {
                        username: item,
                        isValid: true
                    }
                }),
                isSelectedAll: false
            };

            const assignPic = shallow(<AssignPic {...props} />);
            
            // Action
            assignPic.instance().componentDidMount();

            // Assert
            expect(props.setAssignPicFilter).toHaveBeenCalledWith(assignPicFilter);
            expect(assignPic.instance().state.oldAssignPicFilter).toEqual(assignPicFilter);
        });
    });

    describe('handleHeadlineChange', () => {
        it('runs correctly', () => {
            // Arrange
            const value = 'value';
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn(),
                setAssignPicFilter: jest.fn()
            };

            const assignPic = shallow(<AssignPic {...props} />);
            
            // Action
            assignPic.instance().handleHeadlineChange(value);

            // Assert
            expect(props.setAssignPicFilter).toHaveBeenCalledWith({
                ...props.assignPicFilter,
                headline: value
            });
        });
    });

    describe('handlePicChange', () => {
        it('runs correctly', () => {
            // Arrange
            const value = 'value';
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn(),
                setAssignPicFilter: jest.fn()
            };

            const assignPic = shallow(<AssignPic {...props} />);
            
            // Action
            assignPic.instance().handlePicChange(value);

            // Assert
            expect(props.setAssignPicFilter).toHaveBeenCalledWith({
                ...props.assignPicFilter,
                pics: value
            });
        });
    });

    describe('renderRelatedCustomerItem', () => {
        it('returns correct component', () => {
            // Arrange
            const item = {
                username: 'username',
                isValid: true
            };

            const index = 1;
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn()
            };

            const assignPic = shallow(<AssignPic {...props} />);
            assignPic.instance().getRelatedCustomerItemClassName = jest.fn(value => value.toString());
            
            // Action
            const result = shallow(assignPic.instance().renderRelatedCustomerItem(item, index));

            // Assert
            expect(result.find('div').at(0).props().className).toEqual(item.isValid.toString());
            expect(result.find('span').at(0).html()).toEqual(`<span>${item.username}</span>`);
            expect(result.find('span').at(1).props().className).toBe('fa fa-close');
        });

        it('has second span onClick', () => {
            // Arrange
            const item = {
                username: 'username',
                isValid: true
            };

            const index = 1;
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn()
            };

            const assignPic = shallow(<AssignPic {...props} />);
            assignPic.instance().handleRemoveDirectAccount = jest.fn();
            const result = shallow(assignPic.instance().renderRelatedCustomerItem(item, index));
            
            // Action
            result.find('span').at(1).simulate('click');

            // Assert
            expect(assignPic.instance().handleRemoveDirectAccount).toHaveBeenCalledWith(index);
        });
    });

    describe('getRelatedCustomerItemClassName', () => {
        it('returns className having invalid', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn()
            };

            const assignPic = shallow(<AssignPic {...props} />);
            
            // Action
            const className = assignPic.instance().getRelatedCustomerItemClassName(false);

            // Assert
            expect(className).toContain('invalid');
        });
        
        it('returns className having selected', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: [],
                    isSelectedAll: true
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn()
            };

            const assignPic = shallow(<AssignPic {...props} />);
            
            // Action
            const className = assignPic.instance().getRelatedCustomerItemClassName();

            // Assert
            expect(className).toContain('selected');
        });
        
        it('returns className not having invalid and selected', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: [],
                    isSelectedAll: false
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn()
            };

            const assignPic = shallow(<AssignPic {...props} />);
            
            // Action
            const className = assignPic.instance().getRelatedCustomerItemClassName(true);

            // Assert
            expect(className).toBe('related-customer-item');
        });
    });

    describe('handleRemoveDirectAccount', () => {
        it('runs correctly', () => {
            // Arrange
            const index = 1;
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: [ 'value0', 'value1' ]
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn(),
                setAssignPicFilter: jest.fn()
            };
    
            const directAccount = [ 'value0' ];
            const assignPic = shallow(<AssignPic {...props} />);
    
            // Action
            assignPic.instance().handleRemoveDirectAccount(index);
    
            // Assert
            expect(props.setAssignPicFilter).toHaveBeenCalledWith({
                ...props.assignPicFilter,
                directAccount
            });
        });
    });

    describe('handleKeyDownRelatedCustomerInput', () => {
        it('event code not equal 8', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn(),
                setAssignPicFilter: jest.fn()
            };

            const event = {
                keyCode: 'not equal 8'
            };

            const assignPic = shallow(<AssignPic {...props} />);

            // Action
            assignPic.instance().handleKeyDownRelatedCustomerInput(event);

            // Assert
            expect(props.setAssignPicFilter).toHaveBeenCalledWith({
                ...props.assignPicFilter,
                isSelectedAll: false
            });
        });

        it('not handle ctrl', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn()
            };

            const event = {
                ctrlKey: false,
                keyCode: 8
            };

            const assignPic = shallow(<AssignPic {...props} />);
            assignPic.instance().switchKeyCode = jest.fn();

            // Action
            assignPic.instance().handleKeyDownRelatedCustomerInput(event);

            // Assert
            expect(assignPic.instance().switchKeyCode).toHaveBeenCalledWith(event);
        });

        it('handle ctrl with keyCode not 65', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn()
            };

            const event = {
                ctrlKey: true,
                keyCode: 8
            };

            const assignPic = shallow(<AssignPic {...props} />);
            assignPic.instance().switchKeyCode = jest.fn();

            // Action
            assignPic.instance().handleKeyDownRelatedCustomerInput(event);

            // Assert
            expect(assignPic.instance().switchKeyCode).toHaveBeenCalledWith(event);
        });

        it('handle ctrl + A with not empty inputRef', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn(),
                setAssignPicFilter: jest.fn()
            };

            const event = {
                ctrlKey: true,
                keyCode: 65
            };

            const assignPic = shallow(<AssignPic {...props} />);
            assignPic.instance().inputRef = { value: 'not empty value' };
            assignPic.instance().switchKeyCode = jest.fn();

            // Action
            assignPic.instance().handleKeyDownRelatedCustomerInput(event);

            // Assert
            expect(assignPic.instance().switchKeyCode).toHaveBeenCalledWith(event);
        });

        it('handle ctrl + A with empty inputRef', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn(),
                setAssignPicFilter: jest.fn()
            };

            const event = {
                ctrlKey: true,
                keyCode: 65
            };

            const assignPic = shallow(<AssignPic {...props} />);
            assignPic.instance().inputRef = { value: '' };
            assignPic.instance().switchKeyCode = jest.fn();

            // Action
            assignPic.instance().handleKeyDownRelatedCustomerInput(event);

            // Assert
            expect(props.setAssignPicFilter).toHaveBeenCalledWith({
                ...props.assignPicFilter,
                isSelectedAll: true
            });
        });
    });

    describe('switchKeyCode', () => {
        it('keyCode equal 8', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn()
            };

            const event = {
                keyCode: 8
            };

            const assignPic = shallow(<AssignPic {...props} />);
            assignPic.instance().handleBackSpaceKeyCode = jest.fn();

            // Action
            assignPic.instance().switchKeyCode(event);

            // Assert
            expect(assignPic.instance().handleBackSpaceKeyCode).toHaveBeenCalled();
        });
        
        function switchKeyCodeSeparate(keyCode) {
            it('keyCode be 32, 188 or 13', () => {
                // Arrange
                const props = {
                    settings: {
                        headlineList: [],
                        picList: []
                    },
                    assignPicResult: {},
                    validateAssignPicResult: {},
                    gridParams: {},
                    assignPicFilter: {
                        directAccount: []
                    },
                    confirmAssignedDirectAccountPopup: {},
                    assignPicPopup: {},
                    setAssignPicResult: jest.fn()
                };
    
                const event = {
                    keyCode,
                    preventDefault: jest.fn()
                };
    
                const assignPic = shallow(<AssignPic {...props} />);
                assignPic.instance().handleAddCustomerKeyCode = jest.fn();
    
                // Action
                assignPic.instance().switchKeyCode(event);
    
                // Assert
                expect(event.preventDefault).toHaveBeenCalled();
                expect(assignPic.instance().handleAddCustomerKeyCode).toHaveBeenCalled();
            });
        }

        switchKeyCodeSeparate(13);
        switchKeyCodeSeparate(32);
        switchKeyCodeSeparate(188);
    });

    describe('handleBackSpaceKeyCode', () => {
        it('empty inputRef and selected all', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: [],
                    isSelectedAll: true
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn(),
                setAssignPicFilter: jest.fn()
            };

            const assignPic = shallow(<AssignPic {...props} />);
            assignPic.instance().inputRef = { value: '' };

            // Action
            assignPic.instance().handleBackSpaceKeyCode();

            // Assert
            expect(props.setAssignPicFilter).toHaveBeenCalledWith({
                ...props.assignPicFilter,
                directAccount: [],
                isSelectedAll: false
            });
        });

        it('empty inputRef and not selected all', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: [ 'value1' ],
                    isSelectedAll: false
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn(),
                setAssignPicFilter: jest.fn()
            };

            const assignPic = shallow(<AssignPic {...props} />);
            assignPic.instance().inputRef = { value: '' };

            // Action
            assignPic.instance().handleBackSpaceKeyCode();

            // Assert
            expect(props.setAssignPicFilter).toHaveBeenCalledWith({
                ...props.assignPicFilter,
                directAccount: []
            });
        });
    });

    describe('handleAddCustomerKeyCode', () => {
        it('should set inputRef empty', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn(),
                setAssignPicFilter: jest.fn()
            };

            const assignPic = shallow(<AssignPic {...props} />);
            assignPic.instance().inputRef = { value: 'not empty' };

            // Action
            assignPic.instance().handleAddCustomerKeyCode();

            // Assert
            expect(assignPic.instance().inputRef.value).toBeEmpty;
        });

        it('filter direct acccount less than max and valid inputRef', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: [],
                    isSelectedAll: false
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn(),
                setAssignPicFilter: jest.fn()
            };

            const expectedDirectAcount = [ {username: 'name1', isValid: true} ];
            const state = { maxUsername: 10 };
            const assignPic = shallow(<AssignPic {...props} />);
            assignPic.instance().setState(state);
            assignPic.instance().inputRef = { value: 'name1' };

            // Action
            assignPic.instance().handleAddCustomerKeyCode();

            // Assert
            expect(props.setAssignPicFilter).toHaveBeenCalledWith({
                ...props.assignPicFilter,
                directAccount: expectedDirectAcount
            });
        });

        it('filter direct acccount not less than max', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: [],
                    isSelectedAll: false
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn()
            };

            const state = { maxUsername: 0 };
            const assignPic = shallow(<AssignPic {...props} />);
            assignPic.instance().setState(state);
            assignPic.instance().setOverMaxUnernameWhenAssignPic = jest.fn();
            assignPic.instance().inputRef = { value: '' };

            // Action
            assignPic.instance().handleAddCustomerKeyCode();

            // Assert
            expect(assignPic.instance().setOverMaxUnernameWhenAssignPic).toHaveBeenCalled();
        });
    });

    describe('handleKeyUpRelatedCustomerInput', () => {
        function testHandleKeyUpRelatedCustomerInputWithValidKeyCode(keyCode,) {
            it('test with valid key code', () => {
                // Arrange
                const props = {
                    settings: {
                        headlineList: [],
                        picList: []
                    },
                    assignPicResult: {},
                    validateAssignPicResult: {},
                    gridParams: {},
                    assignPicFilter: {
                        directAccount: [],
                        isSelectedAll: false
                    },
                    confirmAssignedDirectAccountPopup: {},
                    assignPicPopup: {},
                    setAssignPicResult: jest.fn()
                };

                const event = { keyCode };
                const assignPic = shallow(<AssignPic {...props} />);
                assignPic.instance().inputRef = { value: 'not empty' };

                // Action
                assignPic.instance().handleKeyUpRelatedCustomerInput(event)

                // Assert
                expect(assignPic.instance().inputRef.value).toBeEmpty;
            });
        }

        testHandleKeyUpRelatedCustomerInputWithValidKeyCode(13);
        testHandleKeyUpRelatedCustomerInputWithValidKeyCode(32);
        testHandleKeyUpRelatedCustomerInputWithValidKeyCode(188);

        it('test with invalid key code', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: [],
                    isSelectedAll: false
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn()
            };

            const event = { keyCode: 1 };
            const defaultValue = { value: 'not empty' };
            const assignPic = shallow(<AssignPic {...props} />);
            assignPic.instance().inputRef = defaultValue;

            // Action
            assignPic.instance().handleKeyUpRelatedCustomerInput(event)

            // Assert
            expect(assignPic.instance().inputRef).toEqual(defaultValue);
        });
    });

    describe('handlePasteRelatedCustomerInput', () => {
        it('should set inputRef value empty', () => {
            // Arrange
            jest.useFakeTimers();
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn(),
                setAssignPicFilter: jest.fn()
            };

            const expectedValue = 'value';
            const event = {
                clipboardData: {
                    getData: jest.fn(() => expectedValue)
                }
            };

            const assignPic = shallow(<AssignPic {...props} />);
            assignPic.instance().inputRef = { value: 'not empty' };

            // Action
            assignPic.instance().handlePasteRelatedCustomerInput(event);
            jest.runAllTimers();

            // Assert
            expect(assignPic.instance().inputRef).toBeEmpty;
        });
        
        it('sum of old and new direct account not greater than max', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn(),
                setAssignPicFilter: jest.fn()
            };

            const expectedValue = 'value';
            const state = { maxUsername: 1 };
            const event = {
                clipboardData: {
                    getData: jest.fn(() => expectedValue)
                }
            };

            const assignPic = shallow(<AssignPic {...props} />);
            assignPic.instance().setState(state);
            assignPic.instance().inputRef = { value: 'not empty' };

            // Action
            assignPic.instance().handlePasteRelatedCustomerInput(event);

            // Assert
            expect(props.setAssignPicFilter).toHaveBeenCalledWith({
                ...props.assignPicFilter,
                directAccount: [ { username: expectedValue, isValid: true } ]
            });
        });
        
        it('sum of old and new direct account greater than max', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn(),
                setAssignPicFilter: jest.fn()
            };

            const expectedValue = 'value';
            const state = { maxUsername: 0 };
            const event = {
                clipboardData: {
                    getData: jest.fn(() => expectedValue)
                }
            };

            const assignPic = shallow(<AssignPic {...props} />);
            assignPic.instance().setState(state);
            assignPic.instance().inputRef = { value: '' };
            assignPic.instance().setOverMaxUnernameWhenAssignPic = jest.fn();

            // Action
            assignPic.instance().handlePasteRelatedCustomerInput(event);

            // Assert
            expect(assignPic.instance().setOverMaxUnernameWhenAssignPic).toHaveBeenCalled();
        });
    });

    describe('handleIsValidItem', () => {
        it('should return expected value', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn()
            };

            const username = 'username';
            const isValid = true;
            const assignPic = shallow(<AssignPic {...props} />);

            // Action
            const result = assignPic.instance().handleIsValidItem(username, isValid);

            // Assert
            expect(result).toEqual({ username, isValid });
        });
    });

    describe('setOverMaxUnernameWhenAssignPic', () => {
        it('runs correctly', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn()
            };

            const assignPic = shallow(<AssignPic {...props} />);

            // Action
            assignPic.instance().setOverMaxUnernameWhenAssignPic();

            // Assert
            expect(props.setAssignPicResult).toHaveBeenCalledWith({
                show: true,
                isSuccessful: false,
                message: 'OverMaxUnernameWhenAssignPic'
            });
        });
    });

    describe('handleBlurRelatedCustomerInput', () => {
        it('should set inputRef empty', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn(),
                setAssignPicFilter: jest.fn()
            };

            const assignPic = shallow(<AssignPic {...props} />);
            assignPic.instance().inputRef = { value: 'not empty' };

            // Action
            assignPic.instance().handleBlurRelatedCustomerInput();

            // Assert
            expect(assignPic.instance().inputRef).toBeEmpty;
        });

        it('direct account length less than max and inputRef value not empty', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn(),
                setAssignPicFilter: jest.fn()
            };

            const expectedValue = 'not empty';
            const state = { maxUsername: 1 };
            const assignPic = shallow(<AssignPic {...props} />);
            assignPic.instance().setState(state);
            assignPic.instance().inputRef = { value: expectedValue };

            // Action
            assignPic.instance().handleBlurRelatedCustomerInput();

            // Assert
            expect(props.setAssignPicFilter).toHaveBeenCalledWith({
                ...props.assignPicFilter,
                isSelectedAll: false,
                directAccount: [ { isValid: true, username: expectedValue } ]
            });
        });

        it('direct account length less than max and inputRef value empty', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn(),
                setAssignPicFilter: jest.fn()
            };

            const state = { maxUsername: 1 };
            const assignPic = shallow(<AssignPic {...props} />);
            assignPic.instance().setState(state);
            assignPic.instance().inputRef = { value: '' };

            // Action
            assignPic.instance().handleBlurRelatedCustomerInput();

            // Assert
            expect(props.setAssignPicFilter).toHaveBeenCalledWith({
                ...props.assignPicFilter,
                isSelectedAll: false
            });
        });

        it('direct account length not less than max', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn(),
                setAssignPicFilter: jest.fn()
            };

            const state = { maxUsername: 0 };
            const assignPic = shallow(<AssignPic {...props} />);
            assignPic.instance().setState(state);
            assignPic.instance().inputRef = { value: '' };
            assignPic.instance().setOverMaxUnernameWhenAssignPic = jest.fn();

            // Action
            assignPic.instance().handleBlurRelatedCustomerInput();

            // Assert
            expect(assignPic.instance().setOverMaxUnernameWhenAssignPic).toHaveBeenCalled();
            expect(props.setAssignPicFilter).toHaveBeenCalledWith({
                ...props.assignPicFilter,
                isSelectedAll: false
            });
        });
    });

    describe('validateForm', () => {
        it('not have headline', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: [ 'value' ],
                    headline: null,
                    pics: [ 'value' ]
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn()
            };

            const assignPic = shallow(<AssignPic {...props} />);

            // Action
            const result = assignPic.instance().validateForm();

            // Assert
            expect(assignPic.instance().state.validate).toEqual({
                show: true,
                errMsg: [ 'GroupHeadlineRequired' ]
            });
            expect(result).toBeFalse;
        });
        
        it('not have pic', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: [ 'value' ],
                    headline: {},
                    pics: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn()
            };

            const assignPic = shallow(<AssignPic {...props} />);

            // Action
            const result = assignPic.instance().validateForm();

            // Assert
            expect(assignPic.instance().state.validate).toEqual({
                show: true,
                errMsg: [ 'PICRequired' ]
            });
            expect(result).toBeFalse;
        });
        
        it('not have direct account', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: [],
                    headline: {},
                    pics: [ 'value' ]
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn()
            };

            const assignPic = shallow(<AssignPic {...props} />);

            // Action
            const result = assignPic.instance().validateForm();

            // Assert
            expect(assignPic.instance().state.validate).toEqual({
                show: true,
                errMsg: [ 'DirectAccountRequired' ]
            });
            expect(result).toBeFalse;
        });
        
        it('returns true', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: [ 'value' ],
                    headline: {},
                    pics: [ 'value' ]
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn()
            };

            const assignPic = shallow(<AssignPic {...props} />);

            // Action
            const result = assignPic.instance().validateForm();

            // Assert
            expect(result).toBeTrue;
        });
    });

    describe('handleSubmit', () => {
        it('should set refresh validate', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: [ { username: 'name' } ],
                    pics: [ { value: 'value' } ]
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn(),
                setAssignPicPopup: jest.fn()
            };

            const assignPic = shallow(<AssignPic {...props} />);

            // Action
            assignPic.instance().handleSubmit();

            // Assert
            expect(props.setAssignPicPopup).toHaveBeenCalledWith({
                ...props.assignPicPopup,
                isSubmitting: true
            });
            expect(props.setAssignPicResult).toHaveBeenCalledWith({ show: false });
        });
        
        it('validateForm returns true', () => {
            // Arrange
            const response = { data: {} };
            const promise = Promise.resolve(response);
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: [ { username: 'name' } ],
                    pics: [ { value: 'value' } ],
                    headline: {
                        value: ''
                    }
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn(),
                setAssignPicPopup: jest.fn(),
                validateAssignPic: jest.fn(() => promise)
            };

            const assignPic = shallow(<AssignPic {...props} />);
            assignPic.instance().validateForm = jest.fn(() => true);
            assignPic.instance().handleAssignPic = jest.fn();

            // Action
            assignPic.instance().handleSubmit();

            // Assert
            expect(props.validateAssignPic).toHaveBeenCalledWith({
                headlineId: '',
                picIds: 'value',
                directAccountIds: 'name'
            });
            promise.then(() => {
                expect(assignPic.instance().handleAssignPic).toHaveBeenCalled();
            });
        });
        
        it('validateForm returns false', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: [],
                    pics: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn(),
                setAssignPicPopup: jest.fn()
            };

            const assignPic = shallow(<AssignPic {...props} />);

            // Action
            assignPic.instance().handleSubmit();

            // Assert
            expect(props.setAssignPicPopup).toHaveBeenCalledWith({
                ...props.assignPicPopup,
                isSubmitting: false
            });
        });
    });

    describe('handleAssignPic', () => {
        it('validate assign pic successfully and assignedDirectAccounts empty', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {
                    isSuccessful: true,
                    assignedDirectAccounts: []
                },
                gridParams: {},
                assignPicFilter: {
                    directAccount: [ { username: 'name' } ],
                    pics: [ { value: 'value' } ],
                    headline: { value: 'value' }
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn(),
                setAssignPicPopup: jest.fn()
            };

            const assignPic = shallow(<AssignPic {...props} />);
            assignPic.instance().callbackAssignPic = jest.fn();
            functions.assignPic = jest.fn();

            // Action
            assignPic.instance().handleAssignPic();

            // Assert
            expect(functions.assignPic).toHaveBeenCalledWith({
                headlineId: 'value',
                picIds: 'value',
                isKeepAssign: true,
                directAccountIds: 'name'
            }, assignPic.instance().callbackAssignPic);
        });
        
        it('validate assign pic successfully and assignedDirectAccounts not empty', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {
                    isSuccessful: true,
                    assignedDirectAccounts: [ 'value' ]
                },
                gridParams: {},
                assignPicFilter: {
                    directAccount: [],
                    pics: [],
                    headline: { value: 'value' }
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn(),
                setAssignPicPopup: jest.fn(),
                setConfirmAssignedDirectAccountPopup: jest.fn()
            };

            const assignPic = shallow(<AssignPic {...props} />);

            // Action
            assignPic.instance().handleAssignPic();

            // Assert
            expect(props.setConfirmAssignedDirectAccountPopup).toHaveBeenCalledWith({
                show: true,
                data: props.validateAssignPicResult.assignedDirectAccounts
            });
        });
        
        it('validate assign pic unsuccessfully and assignedDirectAccounts empty', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {
                    isSuccessful: false,
                    assignedDirectAccounts: [],
                    errorAccounts: 'errorAccounts'
                },
                gridParams: {},
                assignPicFilter: {
                    directAccount: [],
                    pics: [],
                    headline: { value: 'value' }
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn(),
                setAssignPicPopup: jest.fn(),
                setConfirmAssignedDirectAccountPopup: jest.fn()
            };

            const assignPic = shallow(<AssignPic {...props} />);
            assignPic.instance().handleNotSuccessfulAndEmptyAssignDirectAccounts = jest.fn();

            // Action
            assignPic.instance().handleAssignPic();

            // Assert
            expect(assignPic.instance().handleNotSuccessfulAndEmptyAssignDirectAccounts)
                .toHaveBeenCalledWith(props.validateAssignPicResult.errorAccounts);
        });
    });

    describe('handleNotSuccessfulAndEmptyAssignDirectAccounts', () => {
        it('has invalid username', () => {
            // Arrange
            const value = 'value';
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: [ { username: value } ]
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn(),
                setAssignPicPopup: jest.fn(),
                setAssignPicFilter: jest.fn()
            };

            const errorAccounts = {
                invalidUsername: value
            };
    
            const assignPic = shallow(<AssignPic {...props} />);

            // Action
            assignPic.instance().handleNotSuccessfulAndEmptyAssignDirectAccounts(errorAccounts);

            // Assert
            expect(props.setAssignPicFilter).toHaveBeenCalledWith({
                ...props.assignPicFilter,
                directAccount: [ { username: value, isValid: false } ]
            });
        });

        it('has invalid not direct account', () => {
            // Arrange
            const value = 'value';
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: [ { username: value } ]
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn(),
                setAssignPicPopup: jest.fn(),
                setAssignPicFilter: jest.fn()
            };

            const errorAccounts = {
                notDirectAccount: value
            };
    
            const assignPic = shallow(<AssignPic {...props} />);

            // Action
            assignPic.instance().handleNotSuccessfulAndEmptyAssignDirectAccounts(errorAccounts);

            // Assert
            expect(props.setAssignPicFilter).toHaveBeenCalledWith({
                ...props.assignPicFilter,
                directAccount: [ { username: value, isValid: false } ]
            });
        });

        it('has invalid no belong headline account', () => {
            // Arrange
            const value = 'value';
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: [ { username: value } ]
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn(),
                setAssignPicPopup: jest.fn(),
                setAssignPicFilter: jest.fn()
            };

            const errorAccounts = {
                noBelongHeadlineAccount: value
            };
    
            const assignPic = shallow(<AssignPic {...props} />);

            // Action
            assignPic.instance().handleNotSuccessfulAndEmptyAssignDirectAccounts(errorAccounts);

            // Assert
            expect(props.setAssignPicFilter).toHaveBeenCalledWith({
                ...props.assignPicFilter,
                directAccount: [ { username: value, isValid: false } ]
            });
        });

        it('has not invalid account', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn(),
                setAssignPicPopup: jest.fn(),
                setAssignPicFilter: jest.fn()
            };

            const errorAccounts = {};
            const assignPic = shallow(<AssignPic {...props} />);

            // Action
            assignPic.instance().handleNotSuccessfulAndEmptyAssignDirectAccounts(errorAccounts);

            // Assert
            expect(props.setAssignPicFilter).toHaveBeenCalledTimes(0);
            expect(props.setAssignPicPopup).toHaveBeenCalledWith({
                ...props.assignPicPopup,
                isSubmitting: false
            });
            expect(props.setAssignPicResult).toHaveBeenCalledWith({
                show: true,
                isSuccessful: false,
                messages: []
            });
        });
    });

    describe('callbackAssignPic', () => {
        it('should call set assign pic result when success', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn()
            };
    
            const data = {
                isSuccessful: true
            };
    
            const assignPic = shallow(<AssignPic {...props} />);
    
            // Action
            assignPic.instance().callbackAssignPic(data);
    
            // Assert
            expect(props.setAssignPicResult).toHaveBeenCalledWith({
                isSuccessful: true,
                message: 'AssignPICSuccessfully',
                show: true
            });
        });

        it('should call set assign pic result when unsuccess', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn(),
                setAssignPicPopup: jest.fn()
            };
    
            const data = {
                isSuccessful: false,
                message: 'message'
            };
    
            const assignPic = shallow(<AssignPic {...props} />);
    
            // Action
            assignPic.instance().callbackAssignPic(data);
    
            // Assert
            expect(props.setAssignPicResult).toHaveBeenCalledWith({
                isSuccessful: false,
                message: data.message,
                show: true
            });
        });

        it('should call refreshGrid when success', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn()
            };
    
            const data = {
                isSuccessful: true
            };
    
            const assignPic = shallow(<AssignPic {...props} />);
            assignPic.instance().refreshGrid = jest.fn();
    
            // Action
            assignPic.instance().callbackAssignPic(data);
    
            // Assert
            expect(setTimeout).toHaveBeenCalledWith(assignPic.instance().refreshGrid, 2000);
        });

        it('should call setAssignPicPopup when unsuccess', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn(),
                setAssignPicPopup: jest.fn()
            };
    
            const data = {
                isSuccessful: false,
                message: 'message'
            };
    
            const assignPic = shallow(<AssignPic {...props} />);
    
            // Action
            assignPic.instance().callbackAssignPic(data);
    
            // Assert
            expect(props.setAssignPicPopup).toHaveBeenCalledWith({
                ...props.assignPicPopup,
                isSubmitting: false
            });
        });
    });

    describe('refreshGrid', () => {
        it('runs correctly', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn(),
                setAssignPicPopup: jest.fn(),
                setAssignPicFilter: jest.fn(),
                getGridData: jest.fn((params, callback) => callback())
            };
    
            const assignPic = shallow(<AssignPic {...props} />);
            functions.handleNewRemoveOptions = jest.fn();
    
            // Action
            assignPic.instance().refreshGrid();
    
            // Assert
            expect(props.setAssignPicPopup).toHaveBeenCalledWith({ show: false });
            expect(props.setAssignPicFilter).toHaveBeenCalledWith({
                headline: null,
                pics: [],
                directAccount: [],
                isSelectedAll: false
            });
            expect(props.getGridData).toHaveBeenCalledWith(props.gridParams, expect.any(Function));
        });
    });

    describe('handleCancel', () => {
        it('should call onClose when isFilterNotChange true', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn()
            };
    
            const assignPic = shallow(<AssignPic {...props} />);
            assignPic.instance().onClose = jest.fn();
            assignPic.instance().isFilterNotChange = jest.fn(() => true);
    
            // Action
            assignPic.instance().handleCancel();

            // Assert
            expect(assignPic.instance().onClose).toHaveBeenCalled();
        });
        
        it('should return new isShowConfirmPopup state when isFilterNotChange false', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn()
            };
    
            const assignPic = shallow(<AssignPic {...props} />);
            assignPic.instance().isFilterNotChange = jest.fn(() => false);
    
            // Action
            assignPic.instance().handleCancel();

            // Assert
            expect(assignPic.instance().state.isShowConfirmPopup).toBeTrue;
        });
    });

    describe('isFilterNotChange', () => {
        it('returns false when direct account not change', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn()
            };

            const state = {
                oldAssignPicFilter: {
                    directAccount: [ 'value' ]
                }
            };

            const assignPic = shallow(<AssignPic {...props} />);
            assignPic.instance().setState(state);

            // Action
            const result = assignPic.instance().isFilterNotChange();

            // Assert
            expect(result).toBeFalse;
        });

        it('returns false when headline not change', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: [],
                    headline: {}
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn()
            };

            const state = {
                oldAssignPicFilter: {
                    directAccount: [],
                    headline: null
                }
            };

            const assignPic = shallow(<AssignPic {...props} />);
            assignPic.instance().setState(state);

            // Action
            const result = assignPic.instance().isFilterNotChange();

            // Assert
            expect(result).toBeFalse;
        });

        it('returns false when pics not empty', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: [],
                    headline: {},
                    pics: [ 'value' ]
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn()
            };

            const state = {
                oldAssignPicFilter: {
                    directAccount: [],
                    headline: {}
                }
            };

            const assignPic = shallow(<AssignPic {...props} />);
            assignPic.instance().setState(state);

            // Action
            const result = assignPic.instance().isFilterNotChange();

            // Assert
            expect(result).toBeFalse;
        });

        it('returns true', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: [],
                    headline: {},
                    pics: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn()
            };

            const state = {
                oldAssignPicFilter: {
                    directAccount: [],
                    headline: {}
                }
            };

            const assignPic = shallow(<AssignPic {...props} />);
            assignPic.instance().setState(state);

            // Action
            const result = assignPic.instance().isFilterNotChange();

            // Assert
            expect(result).toBeTrue;
        });
    });

    describe('isEqualDirectAccountArray', () => {
        it('has different length', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn()
            };

            const firstArray = [];
            const secondArrray = [ 'value' ];
            const assignPic = shallow(<AssignPic {...props} />);

            // Action
            const result = assignPic.instance().isEqualDirectAccountArray(firstArray, secondArrray);

            // Assert
            expect(result).toBeFalse;
        });
        
        it('has same length but different value', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn()
            };

            const firstArray = [ {username: 'value1'} ];
            const secondArrray = [ {username: 'value2'} ];
            const assignPic = shallow(<AssignPic {...props} />);

            // Action
            const result = assignPic.instance().isEqualDirectAccountArray(firstArray, secondArrray);

            // Assert
            expect(result).toBeFalse;
        });
        
        it('has same length and value', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn()
            };

            const firstArray = [ {username: 'value'} ];
            const secondArrray = [ {username: 'value'} ];
            const assignPic = shallow(<AssignPic {...props} />);

            // Action
            const result = assignPic.instance().isEqualDirectAccountArray(firstArray, secondArrray);

            // Assert
            expect(result).toBeTrue;
        });
    });

    describe('onClose', () => {
        it('runs correctly', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn(),
                setAssignPicPopup: jest.fn(),
                setAssignPicFilter: jest.fn()
            };

            const assignPic = shallow(<AssignPic {...props} />);

            // Action
            assignPic.instance().onClose();

            // Assert
            expect(props.setAssignPicPopup).toHaveBeenCalledWith({ show: false });
            expect(props.setAssignPicFilter).toHaveBeenCalledWith({
                headline: null,
                pics: [],
                directAccount: [],
                isSelectedAll: false
            });
        });
    });

    describe('closeAll', () => {
        it('runs correctly', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn()
            };

            const assignPic = shallow(<AssignPic {...props} />);
            assignPic.instance().closeConfirmPopup = jest.fn();
            assignPic.instance().onClose = jest.fn();

            // Action
            assignPic.instance().closeAll();

            // Assert
            expect(assignPic.instance().closeConfirmPopup).toHaveBeenCalled();
            expect(assignPic.instance().onClose).toHaveBeenCalled();
        });
    });

    describe('closeConfirmPopup', () => {
        it('should state isShowConfirmPopup be false', () => {
            // Arrange
            const props = {
                settings: {
                    headlineList: [],
                    picList: []
                },
                assignPicResult: {},
                validateAssignPicResult: {},
                gridParams: {},
                assignPicFilter: {
                    directAccount: []
                },
                confirmAssignedDirectAccountPopup: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn()
            };

            const assignPic = shallow(<AssignPic {...props} />);

            // Action
            assignPic.instance().closeConfirmPopup();

            // Assert
            expect(assignPic.instance().state.isShowConfirmPopup).toBeFalse;
        });
    });

    describe('render', () => {
        describe('has regular components', () => {
            it('has Modal', () => {
                // Arrange
                const props = {
                    settings: {
                        headlineList: [],
                        picList: []
                    },
                    assignPicResult: {},
                    validateAssignPicResult: {},
                    gridParams: {},
                    assignPicFilter: {
                        directAccount: []
                    },
                    confirmAssignedDirectAccountPopup: {},
                    assignPicPopup: {},
                    setAssignPicResult: jest.fn()
                };

                // Action
                const assignPic = shallow(<AssignPic {...props} />);

                // Assert
                expect(assignPic.find(Modal).props().show).toBeTrue;
                expect(assignPic.find(Modal).props().backdrop).toBe('static');
                expect(assignPic.find(Modal).props().keyboard).toBeFalse;
                expect(assignPic.find(Modal).props().size).toBe('lg');
                expect(assignPic.find(Modal).props().centered).toBeTrue;
                expect(assignPic.find(Modal).props().dialogAs).toEqual(DraggableModalDialog);
            });

            it('has Modal onHide', () => {
                // Arrange
                const props = {
                    settings: {
                        headlineList: [],
                        picList: []
                    },
                    assignPicResult: {},
                    validateAssignPicResult: {},
                    gridParams: {},
                    assignPicFilter: {
                        directAccount: []
                    },
                    confirmAssignedDirectAccountPopup: {},
                    assignPicPopup: {},
                    setAssignPicResult: jest.fn()
                };

                const assignPic = shallow(<AssignPic {...props} />);
                assignPic.instance().handleCancel = jest.fn();

                // Action
                assignPic.find(Modal).simulate('hide');

                // Assert
                expect(assignPic.instance().handleCancel).toHaveBeenCalled();
            });
            
            it('has Modal Header', () => {
                // Arrange
                const props = {
                    settings: {
                        headlineList: [],
                        picList: []
                    },
                    assignPicResult: {},
                    validateAssignPicResult: {},
                    gridParams: {},
                    assignPicFilter: {
                        directAccount: []
                    },
                    confirmAssignedDirectAccountPopup: {},
                    assignPicPopup: {},
                    setAssignPicResult: jest.fn()
                };

                // Action
                const assignPic = shallow(<AssignPic {...props} />);

                // Assert
                expect(assignPic.find(Modal.Header).props().closeButton).toBeTrue;
            });
            
            it('has Modal Title', () => {
                // Arrange
                const props = {
                    settings: {
                        headlineList: [],
                        picList: []
                    },
                    assignPicResult: {},
                    validateAssignPicResult: {},
                    gridParams: {},
                    assignPicFilter: {
                        directAccount: []
                    },
                    confirmAssignedDirectAccountPopup: {},
                    assignPicPopup: {},
                    setAssignPicResult: jest.fn()
                };

                // Action
                const assignPic = shallow(<AssignPic {...props} />);

                // Assert
                expect(assignPic.find(Modal.Title).props().as).toBe('div');
                expect(assignPic.find(Modal.Title).html()).toContain('AssignPIC');
            });
            
            it('has Form, Modal Body', () => {
                // Arrange
                const props = {
                    settings: {
                        headlineList: [],
                        picList: []
                    },
                    assignPicResult: {},
                    validateAssignPicResult: {},
                    gridParams: {},
                    assignPicFilter: {
                        directAccount: []
                    },
                    confirmAssignedDirectAccountPopup: {},
                    assignPicPopup: {},
                    setAssignPicResult: jest.fn()
                };

                // Action
                const assignPic = shallow(<AssignPic {...props} />);

                // Assert
                expect(assignPic.find(Form).length).toBe(1);
                expect(assignPic.find(Modal.Body).length).toBe(1);
            });
            
            it('Modal Body has validate component', () => {
                // Arrange
                const props = {
                    settings: {
                        headlineList: [],
                        picList: []
                    },
                    assignPicResult: {},
                    validateAssignPicResult: {},
                    gridParams: {},
                    assignPicFilter: {
                        directAccount: []
                    },
                    confirmAssignedDirectAccountPopup: {},
                    assignPicPopup: {},
                    setAssignPicResult: jest.fn()
                };

                const state = {
                    validate: {
                        show: true,
                        errMsg: [ 'message1' ]
                    }
                };

                // Action
                const assignPic = shallow(<AssignPic {...props} />);
                assignPic.instance().setState(state);

                // Assert
                expect(assignPic.find(Modal.Body).find(Alert).props().variant).toBe('danger');
                expect(assignPic.find(Modal.Body).find('ul').props().className).toBe('list-message-error');
                for(let index = 0; index < state.validate.errMsg.length; index++) {
                    expect(assignPic.find(Modal.Body).find('li').html()).toEqual(`<li>${state.validate.errMsg[index]}</li>`);
                }
            });
            
            it('Modal Body has ResponseMessage', () => {
                // Arrange
                const props = {
                    settings: {
                        headlineList: [],
                        picList: []
                    },
                    assignPicResult: {
                        show: true,
                        isSuccessful: true,
                        message: 'message',
                        messages: []
                    },
                    validateAssignPicResult: {},
                    gridParams: {},
                    assignPicFilter: {
                        directAccount: []
                    },
                    confirmAssignedDirectAccountPopup: {},
                    assignPicPopup: {},
                    setAssignPicResult: jest.fn()
                };

                // Action
                const assignPic = shallow(<AssignPic {...props} />);

                // Assert
                expect(assignPic.find(Modal.Body).find(ResponseMessage).props().isSuccessful).toEqual(props.assignPicResult.isSuccessful);
                expect(assignPic.find(Modal.Body).find(ResponseMessage).props().message).toEqual(props.assignPicResult.message);
                expect(assignPic.find(Modal.Body).find(ResponseMessage).props().messages).toEqual(props.assignPicResult.messages);
            });

            describe('Modal Body has regular components', () => {
                it('Modal Body has first Form Group', () => {
                    // Arrange
                    const props = {
                        settings: {
                            headlineList: [],
                            picList: []
                        },
                        assignPicResult: {},
                        validateAssignPicResult: {},
                        gridParams: {},
                        assignPicFilter: {
                            directAccount: [],
                            headline: {}
                        },
                        confirmAssignedDirectAccountPopup: {},
                        assignPicPopup: {},
                        setAssignPicResult: jest.fn()
                    };

                    const state = {
                        headlineOptions: []
                    };
    
                    // Action
                    const assignPic = shallow(<AssignPic {...props} />);
                    assignPic.instance().setState(state);
    
                    // Assert
                    expect(assignPic.find(Modal.Body).find(Form.Group).at(0).props().as).toEqual(Row);
                    expect(assignPic.find(Form.Group).at(0).find(Form.Label).props().sm).toBe('4');
                    expect(assignPic.find(Form.Group).at(0).find(Form.Label).props().md).toBe('3');
                    expect(assignPic.find(Form.Group).at(0).find(Form.Label).props().className).toBe('required');
                    expect(assignPic.find(Form.Group).at(0).find(Form.Label).html()).toContain('GroupHeadline');
                    expect(assignPic.find(Form.Group).at(0).find(Col).props().sm).toBe('8');
                    expect(assignPic.find(Form.Group).at(0).find(Col).props().md).toBe('9');
                    expect(assignPic.find(Form.Group).at(0).find(Select).props().isClearable).toBeTrue;
                    expect(assignPic.find(Form.Group).at(0).find(Select).props().options).toEqual(state.headlineOptions);
                    expect(assignPic.find(Form.Group).at(0).find(Select).props().value).toEqual(props.assignPicFilter.headline);
                    expect(assignPic.find(Form.Group).at(0).find(Select).props().placeholder).toBe('PleaseSelect');
                });

                it('Modal Body has first Form Group has Select onChange', () => {
                    // Arrange
                    const props = {
                        settings: {
                            headlineList: [],
                            picList: []
                        },
                        assignPicResult: {},
                        validateAssignPicResult: {},
                        gridParams: {},
                        assignPicFilter: {
                            directAccount: [],
                            headline: {}
                        },
                        confirmAssignedDirectAccountPopup: {},
                        assignPicPopup: {},
                        setAssignPicResult: jest.fn()
                    };

                    const value = 'value';
                    const assignPic = shallow(<AssignPic {...props} />);
                    assignPic.instance().handleHeadlineChange = jest.fn();

                    // Action
                    assignPic.find(Form.Group).at(0).find(Select).simulate('change', value);
    
                    // Assert
                    expect(assignPic.instance().handleHeadlineChange).toHaveBeenCalledWith(value);
                });
                
                it('Modal Body has second Form Group', () => {
                    // Arrange
                    const props = {
                        settings: {
                            headlineList: [],
                            picList: []
                        },
                        assignPicResult: {},
                        validateAssignPicResult: {},
                        gridParams: {},
                        assignPicFilter: {
                            directAccount: [],
                            pics: []
                        },
                        confirmAssignedDirectAccountPopup: {},
                        assignPicPopup: {},
                        setAssignPicResult: jest.fn()
                    };

                    const state = {
                        picOptions: []
                    };
    
                    // Action
                    const assignPic = shallow(<AssignPic {...props} />);
                    assignPic.instance().setState(state);
    
                    // Assert
                    expect(assignPic.find(Modal.Body).find(Form.Group).at(1).props().as).toEqual(Row);
                    expect(assignPic.find(Form.Group).at(1).find(Form.Label).props().sm).toBe('4');
                    expect(assignPic.find(Form.Group).at(1).find(Form.Label).props().md).toBe('3');
                    expect(assignPic.find(Form.Group).at(1).find(Form.Label).props().className).toBe('required');
                    expect(assignPic.find(Form.Group).at(1).find(Form.Label).html()).toContain('PIC');
                    expect(assignPic.find(Form.Group).at(1).find(Col).props().sm).toBe('8');
                    expect(assignPic.find(Form.Group).at(1).find(Col).props().md).toBe('9');
                    expect(assignPic.find(Form.Group).at(1).find(Select).props().isMulti).toBeTrue;
                    expect(assignPic.find(Form.Group).at(1).find(Select).props().isClearable).toBeTrue;
                    expect(assignPic.find(Form.Group).at(1).find(Select).props().options).toEqual(state.picOptions);
                    expect(assignPic.find(Form.Group).at(1).find(Select).props().value).toEqual(props.assignPicFilter.pics);
                    expect(assignPic.find(Form.Group).at(1).find(Select).props().placeholder).toBe('PleaseSelect');
                });

                it('Modal Body has second Form Group has Select onChange', () => {
                    // Arrange
                    const props = {
                        settings: {
                            headlineList: [],
                            picList: []
                        },
                        assignPicResult: {},
                        validateAssignPicResult: {},
                        gridParams: {},
                        assignPicFilter: {
                            directAccount: [],
                            headline: {}
                        },
                        confirmAssignedDirectAccountPopup: {},
                        assignPicPopup: {},
                        setAssignPicResult: jest.fn()
                    };

                    const value = 'value';
                    const assignPic = shallow(<AssignPic {...props} />);
                    assignPic.instance().handlePicChange = jest.fn();

                    // Action
                    assignPic.find(Form.Group).at(1).find(Select).simulate('change', value);
    
                    // Assert
                    expect(assignPic.instance().handlePicChange).toHaveBeenCalledWith(value);
                });
                
                it('Modal Body has third Form Group', () => {
                    // Arrange
                    const props = {
                        settings: {
                            headlineList: [],
                            picList: []
                        },
                        assignPicResult: {},
                        validateAssignPicResult: {},
                        gridParams: {},
                        assignPicFilter: {
                            directAccount: [],
                            pics: []
                        },
                        confirmAssignedDirectAccountPopup: {},
                        assignPicPopup: {},
                        setAssignPicResult: jest.fn()
                    };

                    const state = {
                        picOptions: [],
                        maxUsername: 10
                    };
    
                    // Action
                    const assignPic = shallow(<AssignPic {...props} />);
                    assignPic.instance().setState(state);
    
                    // Assert
                    expect(assignPic.find(Modal.Body).find(Form.Group).at(2).props().as).toEqual(Row);
                    expect(assignPic.find(Form.Group).at(2).find(Form.Label).props().sm).toBe('4');
                    expect(assignPic.find(Form.Group).at(2).find(Form.Label).props().md).toBe('3');
                    expect(assignPic.find(Form.Group).at(2).find(Form.Label).props().className).toBe('required');
                    expect(assignPic.find(Form.Group).at(2).find(Form.Label).html()).toContain('DirectAccount');
                    expect(assignPic.find(Form.Group).at(2).find(Col).props().sm).toBe('8');
                    expect(assignPic.find(Form.Group).at(2).find(Col).props().md).toBe('9');
                    expect(assignPic.find(Form.Group).at(2).find(Col).find('div').first().props().className).toBe('col-xs-12 related-customer-container');
                    expect(assignPic.find(Form.Group).at(2).find(Col).find('div').last().props().className).toBe('col-xs-12');
                    expect(assignPic.find(Form.Group).at(2).find(Col).find('div').last().html()).toContain('Maximum usernames:');
                    expect(assignPic.find(Form.Group).at(2).find(Col).find('div').last().html()).toContain(state.maxUsername - props.assignPicFilter.directAccount.length);
                    expect(assignPic.find(Form.Group).at(2).find('input').props().type).toBe('text');
                });

                it('Modal Body has third Form Group has first div onClick', () => {
                    // Arrange
                    const props = {
                        settings: {
                            headlineList: [],
                            picList: []
                        },
                        assignPicResult: {},
                        validateAssignPicResult: {},
                        gridParams: {},
                        assignPicFilter: {
                            directAccount: [],
                            headline: {}
                        },
                        confirmAssignedDirectAccountPopup: {},
                        assignPicPopup: {},
                        setAssignPicResult: jest.fn()
                    };

                    const event = {};
                    const assignPic = shallow(<AssignPic {...props} />);
                    assignPic.instance().inputRef = { focus: jest.fn() };

                    // Action
                    assignPic.find(Form.Group).at(2).find(Col).find('div').first().simulate('click');

                    // Assert
                    expect(assignPic.instance().inputRef.focus).toHaveBeenCalled();
                });

                it('Modal Body has third Form Group has input onKeyDown', () => {
                    // Arrange
                    const props = {
                        settings: {
                            headlineList: [],
                            picList: []
                        },
                        assignPicResult: {},
                        validateAssignPicResult: {},
                        gridParams: {},
                        assignPicFilter: {
                            directAccount: [],
                            headline: {}
                        },
                        confirmAssignedDirectAccountPopup: {},
                        assignPicPopup: {},
                        setAssignPicResult: jest.fn()
                    };

                    const event = {};
                    const assignPic = shallow(<AssignPic {...props} />);
                    assignPic.instance().handleKeyDownRelatedCustomerInput = jest.fn();

                    // Action
                    assignPic.find(Form.Group).at(2).find(Col).find('input').simulate('keyDown', event);

                    // Assert
                    expect(assignPic.instance().handleKeyDownRelatedCustomerInput).toHaveBeenCalledWith(event);
                });

                it('Modal Body has third Form Group has input onKeyUp', () => {
                    // Arrange
                    const props = {
                        settings: {
                            headlineList: [],
                            picList: []
                        },
                        assignPicResult: {},
                        validateAssignPicResult: {},
                        gridParams: {},
                        assignPicFilter: {
                            directAccount: [],
                            headline: {}
                        },
                        confirmAssignedDirectAccountPopup: {},
                        assignPicPopup: {},
                        setAssignPicResult: jest.fn()
                    };

                    const event = {};
                    const assignPic = shallow(<AssignPic {...props} />);
                    assignPic.instance().handleKeyUpRelatedCustomerInput = jest.fn();

                    // Action
                    assignPic.find(Form.Group).at(2).find(Col).find('input').simulate('keyUp', event);

                    // Assert
                    expect(assignPic.instance().handleKeyUpRelatedCustomerInput).toHaveBeenCalledWith(event);
                });

                it('Modal Body has third Form Group has input onPaste', () => {
                    // Arrange
                    const props = {
                        settings: {
                            headlineList: [],
                            picList: []
                        },
                        assignPicResult: {},
                        validateAssignPicResult: {},
                        gridParams: {},
                        assignPicFilter: {
                            directAccount: [],
                            headline: {}
                        },
                        confirmAssignedDirectAccountPopup: {},
                        assignPicPopup: {},
                        setAssignPicResult: jest.fn()
                    };

                    const event = {};
                    const assignPic = shallow(<AssignPic {...props} />);
                    assignPic.instance().handlePasteRelatedCustomerInput = jest.fn();

                    // Action
                    assignPic.find(Form.Group).at(2).find(Col).find('input').simulate('paste', event);

                    // Assert
                    expect(assignPic.instance().handlePasteRelatedCustomerInput).toHaveBeenCalledWith(event);
                });

                it('Modal Body has third Form Group has input onBlur', () => {
                    // Arrange
                    const props = {
                        settings: {
                            headlineList: [],
                            picList: []
                        },
                        assignPicResult: {},
                        validateAssignPicResult: {},
                        gridParams: {},
                        assignPicFilter: {
                            directAccount: [],
                            headline: {}
                        },
                        confirmAssignedDirectAccountPopup: {},
                        assignPicPopup: {},
                        setAssignPicResult: jest.fn()
                    };

                    const event = {};
                    const assignPic = shallow(<AssignPic {...props} />);
                    assignPic.instance().handleBlurRelatedCustomerInput = jest.fn();

                    // Action
                    assignPic.find(Form.Group).at(2).find(Col).find('input').simulate('blur', event);

                    // Assert
                    expect(assignPic.instance().handleBlurRelatedCustomerInput).toHaveBeenCalled();
                });
            });
            
            describe('Modal Footer', () => {
                it('has regular components', () => {
                    // Arrange
                    const props = {
                        settings: {
                            headlineList: [],
                            picList: []
                        },
                        assignPicResult: {},
                        validateAssignPicResult: {},
                        gridParams: {},
                        assignPicFilter: {
                            directAccount: [],
                            headline: {}
                        },
                        confirmAssignedDirectAccountPopup: {},
                        assignPicPopup: {
                            isSubmitting: true
                        },
                        setAssignPicResult: jest.fn()
                    };

                    // Action
                    const assignPic = shallow(<AssignPic {...props} />);

                    // Assert
                    expect(assignPic.find(Modal.Footer).find(Button).first().props().variant).toBe('primary');
                    expect(assignPic.find(Modal.Footer).find(Button).first().props().size).toBe('sm');
                    expect(assignPic.find(Modal.Footer).find(Button).first().props().disabled).toBe(props.assignPicPopup.isSubmitting);
                    expect(assignPic.find(Modal.Footer).find(Button).first().html()).toContain('Save');
                    expect(assignPic.find(Modal.Footer).find(Button).last().props().variant).toBe('primary');
                    expect(assignPic.find(Modal.Footer).find(Button).last().props().size).toBe('sm');
                    expect(assignPic.find(Modal.Footer).find(Button).last().html()).toContain('Cancel');
                });

                it('has first Button onClick', () => {
                    // Arrange
                    const props = {
                        settings: {
                            headlineList: [],
                            picList: []
                        },
                        assignPicResult: {},
                        validateAssignPicResult: {},
                        gridParams: {},
                        assignPicFilter: {
                            directAccount: [],
                            headline: {}
                        },
                        confirmAssignedDirectAccountPopup: {},
                        assignPicPopup: {
                            isSubmitting: true
                        },
                        setAssignPicResult: jest.fn()
                    };

                    const assignPic = shallow(<AssignPic {...props} />);
                    assignPic.instance().handleSubmit = jest.fn();

                    // Action
                    assignPic.find(Modal.Footer).find(Button).first().simulate('click');

                    // Assert
                    expect(assignPic.instance().handleSubmit).toHaveBeenCalled();
                });

                it('has second Button onClick', () => {
                    // Arrange
                    const props = {
                        settings: {
                            headlineList: [],
                            picList: []
                        },
                        assignPicResult: {},
                        validateAssignPicResult: {},
                        gridParams: {},
                        assignPicFilter: {
                            directAccount: [],
                            headline: {}
                        },
                        confirmAssignedDirectAccountPopup: {},
                        assignPicPopup: {},
                        setAssignPicResult: jest.fn()
                    };

                    const assignPic = shallow(<AssignPic {...props} />);
                    assignPic.instance().handleCancel = jest.fn();

                    // Action
                    assignPic.find(Modal.Footer).find(Button).last().simulate('click');

                    // Assert
                    expect(assignPic.instance().handleCancel).toHaveBeenCalled();
                });
            });

            it('has ConfirmAssignedDirectAccount', () => {
                // Arrange
                const props = {
                    settings: {
                        headlineList: [],
                        picList: []
                    },
                    assignPicResult: {},
                    validateAssignPicResult: {},
                    gridParams: {},
                    assignPicFilter: {
                        directAccount: []
                    },
                    confirmAssignedDirectAccountPopup: {
                        show: true,
                        data: 'something'
                    },
                    assignPicPopup: {},
                    setAssignPicResult: jest.fn()
                };

                // Action
                const assignPic = shallow(<AssignPic {...props} />);

                // Assert
                expect(assignPic.find(ConfirmAssignedDirectAccount).props().data).toEqual(props.confirmAssignedDirectAccountPopup.data);
            });

            it('has ConfirmAssignedDirectAccount closeAssignPicPopup', () => {
                // Arrange
                const props = {
                    settings: {
                        headlineList: [],
                        picList: []
                    },
                    assignPicResult: {},
                    validateAssignPicResult: {},
                    gridParams: {},
                    assignPicFilter: {
                        directAccount: []
                    },
                    confirmAssignedDirectAccountPopup: {
                        show: true,
                        data: 'something'
                    },
                    assignPicPopup: {},
                    setAssignPicResult: jest.fn()
                };

                const assignPic = shallow(<AssignPic {...props} />);
                assignPic.instance().onClose = jest.fn();

                // Action
                assignPic.find(ConfirmAssignedDirectAccount).props().closeAssignPicPopup();

                // Assert
                expect(assignPic.instance().onClose).toHaveBeenCalled();
            });

            it('has ConfirmPopup', () => {
                // Arrange
                const props = {
                    settings: {
                        headlineList: [],
                        picList: []
                    },
                    assignPicResult: {},
                    validateAssignPicResult: {},
                    gridParams: {},
                    assignPicFilter: {
                        directAccount: []
                    },
                    confirmAssignedDirectAccountPopup: {},
                    assignPicPopup: {},
                    setAssignPicResult: jest.fn()
                };

                const state = { isShowConfirmPopup: true };
                const assignPic = shallow(<AssignPic {...props} />);
                assignPic.instance().setState(state);

                // Assert
                expect(assignPic.find(ConfirmPopup).props().size).toBe('lg');
                expect(assignPic.find(ConfirmPopup).props().title).toBe('Confirmation');
                expect(assignPic.find(ConfirmPopup).props().content)
                    .toEqual(<div>{LangHelper.getResource('ThereAreSomeChangesConfirmMessage')}</div>);
            });

            it('has ConfirmPopup onSubmit', () => {
                // Arrange
                const props = {
                    settings: {
                        headlineList: [],
                        picList: []
                    },
                    assignPicResult: {},
                    validateAssignPicResult: {},
                    gridParams: {},
                    assignPicFilter: {
                        directAccount: []
                    },
                    confirmAssignedDirectAccountPopup: {},
                    assignPicPopup: {},
                    setAssignPicResult: jest.fn()
                };

                const state = { isShowConfirmPopup: true };
                const assignPic = shallow(<AssignPic {...props} />);
                assignPic.instance().setState(state);
                assignPic.instance().closeAll = jest.fn();

                // Action
                assignPic.find(ConfirmPopup).simulate('submit');

                // Assert
                expect(assignPic.instance().closeAll).toHaveBeenCalled();
            });

            it('has ConfirmPopup onClose', () => {
                // Arrange
                const props = {
                    settings: {
                        headlineList: [],
                        picList: []
                    },
                    assignPicResult: {},
                    validateAssignPicResult: {},
                    gridParams: {},
                    assignPicFilter: {
                        directAccount: []
                    },
                    confirmAssignedDirectAccountPopup: {},
                    assignPicPopup: {},
                    setAssignPicResult: jest.fn()
                };

                const state = { isShowConfirmPopup: true };
                const assignPic = shallow(<AssignPic {...props} />);
                assignPic.instance().setState(state);
                assignPic.instance().closeConfirmPopup = jest.fn();

                // Action
                assignPic.find(ConfirmPopup).simulate('close');

                // Assert
                expect(assignPic.instance().closeConfirmPopup).toHaveBeenCalled();
            });
        });
    });
});