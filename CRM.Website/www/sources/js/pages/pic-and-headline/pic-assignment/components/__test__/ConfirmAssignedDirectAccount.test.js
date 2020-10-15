import React from 'react';
import ConfirmAssignedDirectAccountWrapper, { ConfirmAssignedDirectAccount } from '../ConfirmAssignedDirectAccount';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import LangHelper from '@jsroot/common/langHelper';
import functions from '../../common.functions';
import { Button, Modal } from 'react-bootstrap';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';

describe('ConfirmAssignedDirectAccount', () => {
    LangHelper.getResource = jest.fn(value => value);

    describe('component with redux', () => {
        // Arrange
        const mockStore = configureMockStore();
        const initialState = {
            confirmAssignedDirectAccountPopup: {},
            gridParams: {},
            assignPicFilter: {},
            assignPicPopup: {}
        };

        const store = mockStore(initialState);
        
        // Action
        const wrapper = shallow(<ConfirmAssignedDirectAccountWrapper store={store} />);

        // Assert
        it('component render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('component has correct props', () => {
            expect(wrapper.props().children.props.confirmAssignedDirectAccountPopup).toEqual(
                initialState.confirmAssignedDirectAccountPopup
            );
            expect(wrapper.props().children.props.gridParams).toEqual(
                initialState.gridParams
            );
            expect(wrapper.props().children.props.assignPicFilter).toEqual(
                initialState.assignPicFilter
            );
            expect(wrapper.props().children.props.assignPicPopup).toEqual(
                initialState.assignPicPopup
            );
        });
    });

    it('has correct initial state', () => {
        // Arrange
        const props = {
            confirmAssignedDirectAccountPopup: {
                data: []
            },
            gridParams: {},
            assignPicFilter: {},
            assignPicPopup: {}
        };

        // Action
        const confirmAssignedDirectAccount = shallow(<ConfirmAssignedDirectAccount {...props} />);

        // Assert
        expect(confirmAssignedDirectAccount.instance().state).toEqual({
            isSubmitting: false,
            directAccountPopup: {
                show: false
            }
        });
    });

    it('buildHeader returns correct header', () => {
        // Arrange
        const props = {
            confirmAssignedDirectAccountPopup: {
                data: []
            },
            gridParams: {},
            assignPicFilter: {},
            assignPicPopup: {}
        };

        const expected = <HeaderRow>
            <HeaderCell colWidth={30}>{LangHelper.getResource('PIC')}</HeaderCell>
            <HeaderCell colWidth={70}>{LangHelper.getResource('DirectAccount')}</HeaderCell>
        </HeaderRow>;

        const confirmAssignedDirectAccount = shallow(<ConfirmAssignedDirectAccount {...props} />);

        // Action
        const result = confirmAssignedDirectAccount.instance().buildHeader();

        // Assert
        expect(result).toEqual(expected);
    });

    it('buildBody returns correct body', () => {
        // Arrange
        const item = {
            picName: 'name',
            role: 'role',
            directAccount: 'direct account'
        };

        const props = {
            confirmAssignedDirectAccountPopup: {
                data: [
                    item
                ]
            },
            gridParams: {},
            assignPicFilter: {},
            assignPicPopup: {}
        };

        const expected = [<Row key={0}>
            <Cell>{`${item.picName} (${item.role})`}</Cell>
            <Cell>{item.directAccount}</Cell>
        </Row>];

        const confirmAssignedDirectAccount = shallow(<ConfirmAssignedDirectAccount {...props} />);
        confirmAssignedDirectAccount.instance().renderDirectAccount = jest.fn(value => value);

        // Action
        const result = confirmAssignedDirectAccount.instance().buildBody();

        // Assert
        expect(result).toEqual(expected);
    });

    describe('renderDirectAccount', () => {
        it('direct account length greater than 20', () => {
            // Arrange
            const props = {
                confirmAssignedDirectAccountPopup: {
                    data: []
                },
                gridParams: {},
                assignPicFilter: {},
                assignPicPopup: {}
            };

            const data = 'value1,value2,value3,value4,value5,value6,value7,value8,value9,value10,value11,value12,value13,value14,value15,value16,value17,value18,value19,value20,value21';
            const confirmAssignedDirectAccount = shallow(<ConfirmAssignedDirectAccount {...props} />);
            
            // Action
            const result = shallow(confirmAssignedDirectAccount.instance().renderDirectAccount(data));

            // Assert
            expect(result.props().className).toBe('link-color cursor-pointer');
            expect(result.html()).toContain('21 custommers');
        });
        
        it('should has component onClick when direct account length greater than 20', () => {
            // Arrange
            const props = {
                confirmAssignedDirectAccountPopup: {
                    data: []
                },
                gridParams: {},
                assignPicFilter: {},
                assignPicPopup: {}
            };

            const data = 'value1,value2,value3,value4,value5,value6,value7,value8,value9,value10,value11,value12,value13,value14,value15,value16,value17,value18,value19,value20,value21';
            const directAccount = data.split(',');
            const confirmAssignedDirectAccount = shallow(<ConfirmAssignedDirectAccount {...props} />);
            confirmAssignedDirectAccount.instance().openDirectAccountPopup = jest.fn();
            const result = shallow(confirmAssignedDirectAccount.instance().renderDirectAccount(data));
            
            // Action
            result.simulate('click');

            // Assert
            expect(confirmAssignedDirectAccount.instance().openDirectAccountPopup).toHaveBeenCalledWith(directAccount);
        });

        it('direct account length not greater than 20', () => {
            // Arrange
            const props = {
                confirmAssignedDirectAccountPopup: {
                    data: []
                },
                gridParams: {},
                assignPicFilter: {},
                assignPicPopup: {}
            };

            const data = 'value1,value2,value3,value4,value5,value6,value7,value8,value9,value10,value11,value12,value13,value14,value15,value16,value17,value18,value19,value20';
            const confirmAssignedDirectAccount = shallow(<ConfirmAssignedDirectAccount {...props} />);
            
            // Action
            const result = confirmAssignedDirectAccount.instance().renderDirectAccount(data);

            // Assert
            expect(result).toBe(data);
        });
    });

    it('openDirectAccountPopup change state correctly', () => {
        // Arrange
        const props = {
            confirmAssignedDirectAccountPopup: {
                data: []
            },
            gridParams: {},
            assignPicFilter: {},
            assignPicPopup: {}
        };

        const directAccount = [ 'value' ];
        const confirmAssignedDirectAccount = shallow(<ConfirmAssignedDirectAccount {...props} />);

        // Action
        confirmAssignedDirectAccount.instance().openDirectAccountPopup(directAccount);

        // Assert
        expect(confirmAssignedDirectAccount.instance().state.directAccountPopup).toEqual({
            show: true,
            data: directAccount
        });
    });

    it('closeDirectAccountPopup change state correctly', () => {
        // Arrange
        const props = {
            confirmAssignedDirectAccountPopup: {
                data: []
            },
            gridParams: {},
            assignPicFilter: {},
            assignPicPopup: {}
        };

        const confirmAssignedDirectAccount = shallow(<ConfirmAssignedDirectAccount {...props} />);

        // Action
        confirmAssignedDirectAccount.instance().closeDirectAccountPopup();

        // Assert
        expect(confirmAssignedDirectAccount.instance().state.directAccountPopup).toEqual({
            show: false
        });
    });

    it('onClose runs correctly', () => {
        // Arrange
        const props = {
            confirmAssignedDirectAccountPopup: {
                data: []
            },
            gridParams: {},
            assignPicFilter: {},
            assignPicPopup: {},
            setConfirmAssignedDirectAccountPopup: jest.fn(),
            setAssignPicPopup: jest.fn()
        };

        const confirmAssignedDirectAccount = shallow(<ConfirmAssignedDirectAccount {...props} />);

        // Action
        confirmAssignedDirectAccount.instance().onClose();

        // Assert
        expect(props.setConfirmAssignedDirectAccountPopup).toHaveBeenCalledWith({ show: false });
        expect(props.setAssignPicPopup).toHaveBeenCalledWith({
            ...props.assignPicPopup,
            isSubmitting: false
        });
    });

    it('assignPic runs correctly', () => {
        // Arrange
        const props = {
            confirmAssignedDirectAccountPopup: {
                data: []
            },
            gridParams: {},
            assignPicFilter: {
                headline: {
                    value: 'headline'
                },
                pics: [
                    { value: 'pic value' }
                ],
                directAccount: [
                    { username: 'direct account name' }
                ]
            },
            assignPicPopup: {},
            setConfirmAssignedDirectAccountPopup: jest.fn()
        };

        const isKeepAssign = 'isKeepAssign';
        const confirmAssignedDirectAccount = shallow(<ConfirmAssignedDirectAccount {...props} />);
        confirmAssignedDirectAccount.instance().callbackAssignPic = jest.fn();
        functions.assignPic = jest.fn();

        // Action
        confirmAssignedDirectAccount.instance().assignPic(isKeepAssign);

        // Assert
        expect(props.setConfirmAssignedDirectAccountPopup).toHaveBeenCalledWith({ show: false });
        expect(functions.assignPic).toHaveBeenCalledWith({
            headlineId: props.assignPicFilter.headline.value,
            picIds: props.assignPicFilter.pics.map(item => item.value).toString(),
            isKeepAssign,
            directAccountIds: props.assignPicFilter.directAccount.map(item => item.username).toString()
        }, confirmAssignedDirectAccount.instance().callbackAssignPic);
    });

    describe('callbackAssignPic', () => {
        it('runs regularly when success', () => {
            // Arrange
            const props = {
                confirmAssignedDirectAccountPopup: {
                    data: []
                },
                gridParams: {},
                assignPicFilter: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn()
            };

            const data = {
                isSuccessful: true
            };

            const confirmAssignedDirectAccount = shallow(<ConfirmAssignedDirectAccount {...props} />);

            // Action
            confirmAssignedDirectAccount.instance().callbackAssignPic(data);

            // Assert
            expect(props.setAssignPicResult).toHaveBeenCalledWith({
                show: true,
                isSuccessful: data.isSuccessful,
                message: 'AssignPICSuccessfully'
            });
        });
        
        it('runs regularly when unsuccess', () => {
            // Arrange
            const props = {
                confirmAssignedDirectAccountPopup: {
                    data: []
                },
                gridParams: {},
                assignPicFilter: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn(),
                setAssignPicPopup: jest.fn()
            };

            const data = {
                isSuccessful: false,
                message: 'message'
            };

            const confirmAssignedDirectAccount = shallow(<ConfirmAssignedDirectAccount {...props} />);

            // Action
            confirmAssignedDirectAccount.instance().callbackAssignPic(data);

            // Assert
            expect(props.setAssignPicResult).toHaveBeenCalledWith({
                show: true,
                isSuccessful: data.isSuccessful,
                message: data.message
            });
        });
        
        it('calls refreshGrid when success', () => {
            // Arrange
            jest.useFakeTimers();
            const props = {
                confirmAssignedDirectAccountPopup: {
                    data: []
                },
                gridParams: {},
                assignPicFilter: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn()
            };

            const data = {
                isSuccessful: true
            };

            const confirmAssignedDirectAccount = shallow(<ConfirmAssignedDirectAccount {...props} />);
            confirmAssignedDirectAccount.instance().refreshGrid = jest.fn();

            // Action
            confirmAssignedDirectAccount.instance().callbackAssignPic(data);

            // Assert
            expect(setTimeout).toHaveBeenCalledWith(confirmAssignedDirectAccount.instance().refreshGrid, 2000);
        });
        
        it('calls refreshGrid when unsuccess', () => {
            // Arrange
            jest.useFakeTimers();
            const props = {
                confirmAssignedDirectAccountPopup: {
                    data: []
                },
                gridParams: {},
                assignPicFilter: {},
                assignPicPopup: {},
                setAssignPicResult: jest.fn(),
                setAssignPicPopup: jest.fn()
            };

            const data = {
                isSuccessful: false,
                message: 'message'
            };

            const confirmAssignedDirectAccount = shallow(<ConfirmAssignedDirectAccount {...props} />);

            // Action
            confirmAssignedDirectAccount.instance().callbackAssignPic(data);

            // Assert
            expect(props.setAssignPicPopup).toHaveBeenCalledWith({
                ...props.assignPicPopup,
                isSubmitting: false
            });
        });
    });

    it('refreshGrid runs correctly', () => {
        // Arrange
        const props = {
            confirmAssignedDirectAccountPopup: {
                data: []
            },
            gridParams: {},
            assignPicFilter: {},
            assignPicPopup: {},
            setAssignPicPopup: jest.fn(),
            getGridData: jest.fn((params, callback) => callback()),
            setAssignPicFilter: jest.fn()
        };

        const confirmAssignedDirectAccount = shallow(<ConfirmAssignedDirectAccount {...props} />);
        functions.handleNewRemoveOptions = jest.fn();

        // Action
        confirmAssignedDirectAccount.instance().refreshGrid();

        // Assert
        expect(props.setAssignPicPopup).toHaveBeenCalledWith({ show: false });
        expect(props.getGridData).toHaveBeenCalledWith(props.gridParams, expect.any(Function));
        expect(props.setAssignPicFilter).toHaveBeenCalledWith({
            headline: null,
            pics: [],
            directAccount: [],
            isSelectedAll: false
        });
    });

    describe('render', () => {
        it('has Modal', () => {
            // Arrange
            const props = {
                confirmAssignedDirectAccountPopup: {
                    data: []
                },
                gridParams: {},
                assignPicFilter: {},
                assignPicPopup: {}
            };

            // Action
            const confirmAssignedDirectAccount = shallow(<ConfirmAssignedDirectAccount {...props} />);

            // Assert
            expect(confirmAssignedDirectAccount.find(Modal).props().show).toBeTrue;
            expect(confirmAssignedDirectAccount.find(Modal).props().backdrop).toBe('static');
            expect(confirmAssignedDirectAccount.find(Modal).props().keyboard).toBeFalse;
            expect(confirmAssignedDirectAccount.find(Modal).props().size).toBe('lg');
            expect(confirmAssignedDirectAccount.find(Modal).props().centered).toBeTrue;
            expect(confirmAssignedDirectAccount.find(Modal).props().dialogAs).toEqual(DraggableModalDialog);
        });
        
        it('has Modal onHide', () => {
            // Arrange
            const props = {
                confirmAssignedDirectAccountPopup: {
                    data: []
                },
                gridParams: {},
                assignPicFilter: {},
                assignPicPopup: {}
            };

            const confirmAssignedDirectAccount = shallow(<ConfirmAssignedDirectAccount {...props} />);
            confirmAssignedDirectAccount.instance().onClose = jest.fn();
            
            // Action
            confirmAssignedDirectAccount.find(Modal).simulate('hide');

            // Assert
            expect(confirmAssignedDirectAccount.instance().onClose).toHaveBeenCalled();
        });
        
        it('has Modal Header', () => {
            // Arrange
            const props = {
                confirmAssignedDirectAccountPopup: {
                    data: []
                },
                gridParams: {},
                assignPicFilter: {},
                assignPicPopup: {}
            };

            // Action
            const confirmAssignedDirectAccount = shallow(<ConfirmAssignedDirectAccount {...props} />);

            // Assert
            expect(confirmAssignedDirectAccount.find(Modal.Header).props().closeButton).toBeTrue;
            expect(confirmAssignedDirectAccount.find(Modal.Title).props().as).toBe('div');
            expect(confirmAssignedDirectAccount.find(Modal.Title).html()).toContain('ListOfAssignedDirectAccounts');
        });
        
        it('has Modal Body', () => {
            // Arrange
            const props = {
                confirmAssignedDirectAccountPopup: {
                    data: []
                },
                gridParams: {},
                assignPicFilter: {},
                assignPicPopup: {}
            };

            // Action
            const confirmAssignedDirectAccount = shallow(<ConfirmAssignedDirectAccount {...props} />);

            // Assert
            expect(confirmAssignedDirectAccount.find(Modal.Body).find(Table).props().maxWidth).toBe(772);
            expect(confirmAssignedDirectAccount.find(Modal.Body).find(Table).props().containerPadding).toBe(0);
        });
        
        it('has Modal Footer having first Button', () => {
            // Arrange
            const props = {
                confirmAssignedDirectAccountPopup: {
                    data: []
                },
                gridParams: {},
                assignPicFilter: {},
                assignPicPopup: {}
            };

            const state = { isSubmitting: true };

            // Action
            const confirmAssignedDirectAccount = shallow(<ConfirmAssignedDirectAccount {...props} />);
            confirmAssignedDirectAccount.instance().setState(state);

            // Assert
            expect(confirmAssignedDirectAccount.find(Modal.Footer).find(Button).at(0).props().variant).toBe('primary');
            expect(confirmAssignedDirectAccount.find(Modal.Footer).find(Button).at(0).props().size).toBe('sm');
            expect(confirmAssignedDirectAccount.find(Modal.Footer).find(Button).at(0).props().disabled).toEqual(state.isSubmitting);
            expect(confirmAssignedDirectAccount.find(Modal.Footer).find(Button).at(0).html()).toContain('RemoveAndAssign');
        });
        
        it('has Modal Footer having first Button onclick', () => {
            // Arrange
            const props = {
                confirmAssignedDirectAccountPopup: {
                    data: []
                },
                gridParams: {},
                assignPicFilter: {},
                assignPicPopup: {}
            };

            const state = { isSubmitting: true };

            const confirmAssignedDirectAccount = shallow(<ConfirmAssignedDirectAccount {...props} />);
            confirmAssignedDirectAccount.instance().setState(state);
            confirmAssignedDirectAccount.instance().assignPic = jest.fn();

            // Action
            confirmAssignedDirectAccount.find(Modal.Footer).find(Button).at(0).simulate('click');

            // Assert
            expect(confirmAssignedDirectAccount.instance().assignPic).toHaveBeenCalledWith(false);
        });
        
        it('has Modal Footer having second Button', () => {
            // Arrange
            const props = {
                confirmAssignedDirectAccountPopup: {
                    data: []
                },
                gridParams: {},
                assignPicFilter: {},
                assignPicPopup: {}
            };

            const state = { isSubmitting: true };

            // Action
            const confirmAssignedDirectAccount = shallow(<ConfirmAssignedDirectAccount {...props} />);
            confirmAssignedDirectAccount.instance().setState(state);

            // Assert
            expect(confirmAssignedDirectAccount.find(Modal.Footer).find(Button).at(1).props().variant).toBe('primary');
            expect(confirmAssignedDirectAccount.find(Modal.Footer).find(Button).at(1).props().size).toBe('sm');
            expect(confirmAssignedDirectAccount.find(Modal.Footer).find(Button).at(1).props().disabled).toEqual(state.isSubmitting);
            expect(confirmAssignedDirectAccount.find(Modal.Footer).find(Button).at(1).html()).toContain('KeepAssign');
        });
        
        it('has Modal Footer having second Button onclick', () => {
            // Arrange
            const props = {
                confirmAssignedDirectAccountPopup: {
                    data: []
                },
                gridParams: {},
                assignPicFilter: {},
                assignPicPopup: {}
            };

            const state = { isSubmitting: true };

            const confirmAssignedDirectAccount = shallow(<ConfirmAssignedDirectAccount {...props} />);
            confirmAssignedDirectAccount.instance().setState(state);
            confirmAssignedDirectAccount.instance().assignPic = jest.fn();

            // Action
            confirmAssignedDirectAccount.find(Modal.Footer).find(Button).at(1).simulate('click');

            // Assert
            expect(confirmAssignedDirectAccount.instance().assignPic).toHaveBeenCalledWith(true);
        });
        
        it('has Modal Footer having third Button', () => {
            // Arrange
            const props = {
                confirmAssignedDirectAccountPopup: {
                    data: []
                },
                gridParams: {},
                assignPicFilter: {},
                assignPicPopup: {}
            };

            // Action
            const confirmAssignedDirectAccount = shallow(<ConfirmAssignedDirectAccount {...props} />);

            // Assert
            expect(confirmAssignedDirectAccount.find(Modal.Footer).find(Button).at(2).props().variant).toBe('primary');
            expect(confirmAssignedDirectAccount.find(Modal.Footer).find(Button).at(2).props().size).toBe('sm');
            expect(confirmAssignedDirectAccount.find(Modal.Footer).find(Button).at(2).html()).toContain('Cancel');
        });
        
        it('has Modal Footer having third Button onclick', () => {
            // Arrange
            const props = {
                confirmAssignedDirectAccountPopup: {
                    data: []
                },
                gridParams: {},
                assignPicFilter: {},
                assignPicPopup: {}
            };

            const confirmAssignedDirectAccount = shallow(<ConfirmAssignedDirectAccount {...props} />);
            confirmAssignedDirectAccount.instance().onClose = jest.fn();

            // Action
            confirmAssignedDirectAccount.find(Modal.Footer).find(Button).at(2).simulate('click');

            // Assert
            expect(confirmAssignedDirectAccount.instance().onClose).toHaveBeenCalled();
        });
    });
});