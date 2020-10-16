import DefaultPicWrapper, { DefaultPic } from '../DefaultPic';
import React from 'react';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import functions from '../../common.functions';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';
import Select from '@jsroot/components/CustomReactSelect';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

describe('DefaultPic', () => {
    describe('component with redux', () => {
        // Arrange
        const mockStore = configureMockStore();
        const initialState = {
            settings: {},
            defaultPicPopup: {},
            gridParams: {}
        };

        const store = mockStore(initialState);
        
        // Action
        const wrapper = shallow(<DefaultPicWrapper store={store} />);

        // Assert
        it('component render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('component has correct props', () => {
            expect(wrapper.props().children.props.settings).toEqual(
                initialState.settings
            );
            expect(wrapper.props().children.props.defaultPicPopup).toEqual(
                initialState.defaultPicPopup
            );
            expect(wrapper.props().children.props.gridParams).toEqual(
                initialState.gridParams
            );
        });
    });

    it('has correct default state', () => {
        // Arrange
        const props = {
            settings: {
                picList: []
            },
            defaultPicPopup: {
                headline: {}
            },
            gridParams: {}
        };

        // Action
        const defaultPic = shallow(<DefaultPic {...props} />);

        // Assert
        expect(defaultPic.instance().state).toEqual({
            picOptions: [],
            pics: [],
            oldPics: [],
            isShowConfirmPopup: false,
            isSubmitting: false,
            responseMesssage: {
                show: false
            }
        });
    });

    describe('componentDidMount', () => {
        it('should run regularly', () => {
            // Arrange
            const props = {
                settings: {
                    picList: [
                        {
                            picId: 1,
                            username: 'name',
                            roleName: 'role'
                        }
                    ]
                },
                defaultPicPopup: {
                    headline: {}
                },
                gridParams: {}
            };

            const picOptions = props.settings.picList.map(item => {
                return {
                    value: item.picId,
                    label: `${item.username} (${item.roleName})`
                };
            });

            const defaultPic = shallow(<DefaultPic {...props} />);

            // Action
            defaultPic.instance().componentDidMount();

            // Assert
            expect(defaultPic.instance().state.picOptions).toEqual(picOptions);
        });

        it('should change state when defaultPicPopup having pics', () => {
            // Arrange
            const props = {
                settings: {
                    picList: [
                        {
                            picId: 1,
                            username: 'name',
                            roleName: 'role'
                        }
                    ]
                },
                defaultPicPopup: {
                    headline: {},
                    pics: []
                },
                gridParams: {}
            };

            const defaultPic = shallow(<DefaultPic {...props} />);

            // Action
            defaultPic.instance().componentDidMount();

            // Assert
            expect(defaultPic.instance().state.pics).toEqual(props.defaultPicPopup.pics);
            expect(defaultPic.instance().state.oldPics).toEqual(props.defaultPicPopup.pics);
        });
    });

    it('handlePicChange should change state pics', () => {
        // Arrange
        const props = {
            settings: {
                picList: []
            },
            defaultPicPopup: {
                headline: {}
            },
            gridParams: {}
        };

        const pics = [ 'value' ];
        const defaultPic = shallow(<DefaultPic {...props} />);

        // Action
        defaultPic.instance().handlePicChange(pics);

        // Assert
        expect(defaultPic.instance().state.pics).toEqual(pics);
    });

    describe('handleCancel', () => {
        it('should setDefaultPicPopup when pics not change', () => {
            // Arrange
            const props = {
                settings: {
                    picList: []
                },
                defaultPicPopup: {
                    headline: {}
                },
                gridParams: {},
                setDefaultPicPopup: jest.fn()
            };

            const defaultPic = shallow(<DefaultPic {...props} />);
            defaultPic.instance().isEqualPicArray = jest.fn(() => false);
            defaultPic.instance().toggleConfirmPopup = jest.fn();

            // Action
            defaultPic.instance().handleCancel();

            // Assert
            expect(props.setDefaultPicPopup).toHaveBeenCalledTimes(0);
            expect(defaultPic.instance().toggleConfirmPopup).toHaveBeenCalled();
        });

        it('should setDefaultPicPopup when pics change', () => {
            // Arrange
            const props = {
                settings: {
                    picList: []
                },
                defaultPicPopup: {
                    headline: {}
                },
                gridParams: {},
                setDefaultPicPopup: jest.fn()
            };

            const defaultPic = shallow(<DefaultPic {...props} />);
            defaultPic.instance().isEqualPicArray = jest.fn(() => true);
            defaultPic.instance().toggleConfirmPopup = jest.fn();

            // Action
            defaultPic.instance().handleCancel();

            // Assert
            expect(props.setDefaultPicPopup).toHaveBeenCalledWith({ show: false });
            expect(defaultPic.instance().toggleConfirmPopup).toHaveBeenCalled();
        });
    });

    describe('isEqualPicArray', () => {
        it('should return false when length not equal', () => {
            // Arrange
            const props = {
                settings: {
                    picList: []
                },
                defaultPicPopup: {
                    headline: {}
                },
                gridParams: {}
            };

            const firstArray = [];
            const secondArray = [ 'value' ];
            const defaultPic = shallow(<DefaultPic {...props} />);

            // Action
            const result = defaultPic.instance().isEqualPicArray(firstArray, secondArray);

            // Assert
            expect(result).toBeFalse;
        });
        
        it('should return false when value not equal', () => {
            // Arrange
            const props = {
                settings: {
                    picList: []
                },
                defaultPicPopup: {
                    headline: {}
                },
                gridParams: {}
            };

            const firstArray = [
                { value: 'value1' }
            ];

            const secondArray = [
                { value: 'value2' }
            ];

            const defaultPic = shallow(<DefaultPic {...props} />);

            // Action
            const result = defaultPic.instance().isEqualPicArray(firstArray, secondArray);

            // Assert
            expect(result).toBeFalse;
        });
        
        it('should return true when value equal', () => {
            // Arrange
            const props = {
                settings: {
                    picList: []
                },
                defaultPicPopup: {
                    headline: {}
                },
                gridParams: {}
            };

            const firstArray = [
                { value: 'value' }
            ];

            const secondArray = [
                { value: 'value' }
            ];

            const defaultPic = shallow(<DefaultPic {...props} />);

            // Action
            const result = defaultPic.instance().isEqualPicArray(firstArray, secondArray);

            // Assert
            expect(result).toBeTrue;
        });
    });

    it('toggleConfirmPopup should change isShowConfirmPopup correctly', () => {
        // Arrange
        const props = {
            settings: {
                picList: []
            },
            defaultPicPopup: {
                headline: {}
            },
            gridParams: {}
        };

        const state = {
            isShowConfirmPopup: true
        };

        const defaultPic = shallow(<DefaultPic {...props} />);
        defaultPic.instance().setState(state);

        // Action
        defaultPic.instance().toggleConfirmPopup();

        // Assert
        expect(defaultPic.instance().state.isShowConfirmPopup).toEqual(!state.isShowConfirmPopup);
    });

    it('handleRemoveDefaultPic should run correctly', () => {
        // Arrange
        const props = {
            settings: {
                picList: []
            },
            defaultPicPopup: {
                headline: {}
            },
            gridParams: {}
        };

        const headlineId = 1;
        const defaultPic = shallow(<DefaultPic {...props} />);
        functions.removeDefaultPic = jest.fn((params, callback) => callback());
        defaultPic.instance().callback = jest.fn();

        // Action
        defaultPic.instance().handleRemoveDefaultPic(headlineId);

        // Assert
        expect(defaultPic.instance().state.isSubmitting).toBeTrue;
        expect(functions.removeDefaultPic).toHaveBeenCalledWith({ headlineId }, expect.any(Function));
    });

    describe('callback', () => {
        it('should change state responseMesssage when have data message', () => {
            // Arrange
            const props = {
                settings: {
                    picList: []
                },
                defaultPicPopup: {
                    headline: {}
                },
                gridParams: {}
            };
    
            const data = {
                message: 'message'
            };

            const defaultPic = shallow(<DefaultPic {...props} />);
    
            // Action
            defaultPic.instance().callback(data);
    
            // Assert
            expect(defaultPic.instance().state.responseMesssage).toEqual({
                isSuccessful: data.isSuccessful,
                message: data.message,
                show: true
            });
        });
        
        it('should change state responseMesssage when not have data message', () => {
            // Arrange
            const props = {
                settings: {
                    picList: []
                },
                defaultPicPopup: {
                    headline: {}
                },
                gridParams: {}
            };
    
            const data = {};
            const message = 'message';
            const defaultPic = shallow(<DefaultPic {...props} />);
    
            // Action
            defaultPic.instance().callback(data, message);
    
            // Assert
            expect(defaultPic.instance().state.responseMesssage).toEqual({
                isSuccessful: data.isSuccessful,
                message,
                show: true
            });
        });
        
        it('should call setTimeout when success data', () => {
            // Arrange
            jest.useFakeTimers();
            const props = {
                settings: {
                    picList: []
                },
                defaultPicPopup: {
                    headline: {}
                },
                gridParams: {}
            };
    
            const data = {
                isSuccessful: true
            };

            const defaultPic = shallow(<DefaultPic {...props} />);
            defaultPic.instance().refreshGrid = jest.fn();
    
            // Action
            defaultPic.instance().callback(data);
    
            // Assert
            expect(setTimeout).toHaveBeenCalledWith(defaultPic.instance().refreshGrid, 2000);
        });
        
        it('should call setTimeout when unsuccess data', () => {
            // Arrange
            const props = {
                settings: {
                    picList: []
                },
                defaultPicPopup: {
                    headline: {}
                },
                gridParams: {}
            };
    
            const data = {
                isSuccessful: false
            };

            const defaultPic = shallow(<DefaultPic {...props} />);
    
            // Action
            defaultPic.instance().callback(data);
    
            // Assert
            expect(defaultPic.instance().state.isSubmitting).toBeFalse;
        });
    });

    it('refreshGrid should call setDefaultPicPopup and getGridData', () => {
        // Arrange
        const props = {
            settings: {
                picList: []
            },
            defaultPicPopup: {
                headline: {}
            },
            gridParams: {},
            setDefaultPicPopup: jest.fn(),
            getGridData: jest.fn((params, callback) => callback())
        };

        const defaultPic = shallow(<DefaultPic {...props} />);
        functions.handleNewRemoveOptions= jest.fn()

        // Action
        defaultPic.instance().refreshGrid();

        // Assert
        expect(props.setDefaultPicPopup).toHaveBeenCalledWith({ show: false });
        expect(props.getGridData).toHaveBeenCalledWith(props.gridParams, expect.any(Function));
    });

    describe('handleSubmitSetDefaultPIC', () => {
        it('should change state correctly when empty state pics', () => {
            // Arrange
            const props = {
                settings: {
                    picList: []
                },
                defaultPicPopup: {
                    headline: {}
                },
                gridParams: {}
            };

            const state = {
                pics: []
            };

            const headlineId = 1;
            const defaultPic = shallow(<DefaultPic {...props} />);
            defaultPic.instance().setState(state);

            // Action
            defaultPic.instance().handleSubmitSetDefaultPIC(headlineId);

            // Assert
            expect(defaultPic.instance().state.isSubmitting).toBeFalse;
            expect(defaultPic.instance().state.responseMesssage).toEqual({
                show: true,
                isSuccessful: false,
                message: 'DefaultPICRequired'
            });
        });
        
        it('should change state correctly when not empty state pics', () => {
            // Arrange
            const props = {
                settings: {
                    picList: []
                },
                defaultPicPopup: {
                    headline: {}
                },
                gridParams: {}
            };

            const state = {
                pics: [
                    {
                        value: 'value'
                    }
                ]
            };

            const headlineId = 1;
            const defaultPic = shallow(<DefaultPic {...props} />);
            defaultPic.instance().setState(state);
            defaultPic.instance().callback = jest.fn();
            functions.setDefaultPic= jest.fn((params, callback) => callback());

            const expected = {
                headlineId,
                defaultPicIDs: state.pics.map(item => item.value).toString()
            };

            // Action
            defaultPic.instance().handleSubmitSetDefaultPIC(headlineId);

            // Assert
            expect(defaultPic.instance().state.isSubmitting).toBeTrue;
            expect(functions.setDefaultPic).toHaveBeenCalledWith(expected, expect.any(Function));
        });
    });

    it('closeAll should call setDefaultPicPopup, toggleConfirmPopup', () => {
        // Arrange
        const props = {
            settings: {
                picList: []
            },
            defaultPicPopup: {
                headline: {}
            },
            gridParams: {},
            setDefaultPicPopup: jest.fn()
        };

        const defaultPic = shallow(<DefaultPic {...props} />);
        defaultPic.instance().toggleConfirmPopup = jest.fn();

        // Action
        defaultPic.instance().closeAll();

        // Assert
        expect(props.setDefaultPicPopup).toHaveBeenCalledWith({ show: false });
        expect(defaultPic.instance().toggleConfirmPopup).toHaveBeenCalled();
    });

    describe('render', () => {
        it('should have Modal component', () => {
            // Arrange
            const props = {
                settings: {
                    picList: []
                },
                defaultPicPopup: {
                    headline: {}
                },
                gridParams: {}
            };

            // Action
            const defaultPic = shallow(<DefaultPic {...props} />);

            // Assert
            expect(defaultPic.find(Modal).props().show).toBeTrue;
            expect(defaultPic.find(Modal).props().backdrop).toBe('static');
            expect(defaultPic.find(Modal).props().keyboard).toBeFalse;
            expect(defaultPic.find(Modal).props().size).toBe('lg');
            expect(defaultPic.find(Modal).props().centered).toBeTrue;
            expect(defaultPic.find(Modal).props().dialogAs).toEqual(DraggableModalDialog);
        });

        it('should have Modal component onHide', () => {
            // Arrange
            const props = {
                settings: {
                    picList: []
                },
                defaultPicPopup: {
                    headline: {}
                },
                gridParams: {}
            };

            const defaultPic = shallow(<DefaultPic {...props} />);
            defaultPic.instance().handleCancel = jest.fn();

            // Action
            defaultPic.find(Modal).simulate('hide');

            // Assert
            expect(defaultPic.instance().handleCancel).toHaveBeenCalled();
        });
        
        it('should have Modal Header component', () => {
            // Arrange
            const props = {
                settings: {
                    picList: []
                },
                defaultPicPopup: {
                    headline: {}
                },
                gridParams: {}
            };

            // Action
            const defaultPic = shallow(<DefaultPic {...props} />);

            // Assert
            expect(defaultPic.find(Modal.Header).props().closeButton).toBeTrue;
            expect(defaultPic.find(Modal.Title).props().as).toBe('div');
        });
        
        it('should have Modal Header component when empty pics', () => {
            // Arrange
            const props = {
                settings: {
                    picList: []
                },
                defaultPicPopup: {
                    headline: {},
                    pics: []
                },
                gridParams: {}
            };

            // Action
            const defaultPic = shallow(<DefaultPic {...props} />);

            // Assert
            expect(defaultPic.find(Modal.Title).html()).toContain('SetDefaultPIC');
        });
        
        it('should have Modal Header component when not empty pics', () => {
            // Arrange
            const props = {
                settings: {
                    picList: []
                },
                defaultPicPopup: {
                    headline: {},
                    pics: [ 'value' ]
                },
                gridParams: {}
            };

            // Action
            const defaultPic = shallow(<DefaultPic {...props} />);

            // Assert
            expect(defaultPic.find(Modal.Title).html()).toContain('UpdateDefaultPIC');
        });
        
        it('should have Modal Body component when having ResponseMesssage', () => {
            // Arrange
            const props = {
                settings: {
                    picList: []
                },
                defaultPicPopup: {
                    headline: {}
                },
                gridParams: {}
            };

            const state = {
                responseMesssage: {
                    show: true,
                    isSuccessful: true,
                    message: 'message'
                }
            };

            // Action
            const defaultPic = shallow(<DefaultPic {...props} />);
            defaultPic.instance().setState(state);

            // Assert
            expect(defaultPic.find(Modal.Body).find(ResponseMessage).props().isSuccessful).toEqual(state.responseMesssage.isSuccessful);
            expect(defaultPic.find(Modal.Body).find(ResponseMessage).props().message).toEqual(state.responseMesssage.message);
        });
        
        it('should have Modal Body component when having first Form Group', () => {
            // Arrange
            const props = {
                settings: {
                    picList: []
                },
                defaultPicPopup: {
                    headline: {
                        name: 'name'
                    }
                },
                gridParams: {}
            };

            const defaultPic = shallow(<DefaultPic {...props} />);

            // Action
            const formGroup = defaultPic.find(Form.Group).at(0);

            // Assert
            expect(formGroup.props().as).toEqual(Row);
            expect(formGroup.find(Form.Label).at(0).props().column).toBeTrue;
            expect(formGroup.find(Form.Label).at(0).props().sm).toBe('4');
            expect(formGroup.find(Form.Label).at(0).props().md).toBe('3');
            expect(formGroup.find(Form.Label).at(0).props().className).toBe('required');
            expect(formGroup.find(Form.Label).at(0).html()).toContain('GroupHeadline');
            expect(formGroup.find(Form.Label).at(1).props().column).toBeTrue;
            expect(formGroup.find(Form.Label).at(1).props().sm).toBe('8');
            expect(formGroup.find(Form.Label).at(1).props().md).toBe('9');
            expect(formGroup.find(Form.Label).at(1).html()).toContain(props.defaultPicPopup.headline.name);
        });
        
        it('should have Modal Body component when having second Form Group', () => {
            // Arrange
            const props = {
                settings: {
                    picList: []
                },
                defaultPicPopup: {
                    headline: {}
                },
                gridParams: {}
            };

            const state = {
                picOptions: [],
                pics: []
            };

            const defaultPic = shallow(<DefaultPic {...props} />);
            defaultPic.setState(state);

            // Action
            const formGroup = defaultPic.find(Form.Group).at(1);

            // Assert
            expect(formGroup.props().as).toEqual(Row);
            expect(formGroup.find(Form.Label).at(0).props().column).toBeTrue;
            expect(formGroup.find(Form.Label).at(0).props().sm).toBe('4');
            expect(formGroup.find(Form.Label).at(0).props().md).toBe('3');
            expect(formGroup.find(Form.Label).at(0).props().className).toBe('required');
            expect(formGroup.find(Form.Label).at(0).html()).toContain('DefaultPIC');
            expect(formGroup.find(Col).props().sm).toBe('8');
            expect(formGroup.find(Col).props().md).toBe('9');
            expect(formGroup.find(Select).props().isMulti).toBeTrue;
            expect(formGroup.find(Select).props().options).toEqual(state.picOptions);
            expect(formGroup.find(Select).props().value).toEqual(state.pics);
            expect(formGroup.find(Select).props().placeholder).toEqual('PleaseSelect');
        });
        
        it('should have Modal Body component when having second Form Group having Select onChange', () => {
            // Arrange
            const props = {
                settings: {
                    picList: []
                },
                defaultPicPopup: {
                    headline: {}
                },
                gridParams: {}
            };

            const defaultPic = shallow(<DefaultPic {...props} />);
            defaultPic.instance().handlePicChange = jest.fn();
            const formGroup = defaultPic.find(Form.Group).at(1);

            // Action
            formGroup.find(Select).simulate('change');

            // Assert
            expect(defaultPic.instance().handlePicChange).toHaveBeenCalled();
        });
        
        it('should have Modal Footer component having remove button when not empty defaultPicPopup pics', () => {
            // Arrange
            const props = {
                settings: {
                    picList: []
                },
                defaultPicPopup: {
                    headline: {},
                    pics: [ 'value' ]
                },
                gridParams: {}
            };

            const state = {
                isSubmitting: true
            };

            const defaultPic = shallow(<DefaultPic {...props} />);
            defaultPic.instance().setState(state);

            // Action
            const button = defaultPic.find(Modal.Footer).find(Button).at(0);

            // Assert
            expect(button.props().variant).toBe('primary');
            expect(button.props().size).toBe('sm');
            expect(button.props().disabled).toEqual(state.isSubmitting);
            expect(button.html()).toContain('Remove');
        });
        
        it('should have Modal Footer component having remove button when not empty defaultPicPopup pics', () => {
            // Arrange
            const props = {
                settings: {
                    picList: []
                },
                defaultPicPopup: {
                    headline: {
                        id: 1
                    },
                    pics: [ 'value' ]
                },
                gridParams: {}
            };

            const defaultPic = shallow(<DefaultPic {...props} />);
            defaultPic.instance().handleRemoveDefaultPic = jest.fn();
            const button = defaultPic.find(Modal.Footer).find(Button).at(0);

            // Action
            button.simulate('click');

            // Assert
            expect(defaultPic.instance().handleRemoveDefaultPic).toHaveBeenCalledWith(props.defaultPicPopup.headline.id);
        });
        
        it('should have Modal Footer component having save button', () => {
            // Arrange
            const props = {
                settings: {
                    picList: []
                },
                defaultPicPopup: {
                    headline: {},
                    pics: []
                },
                gridParams: {}
            };

            const state = {
                isSubmitting: true
            };

            const defaultPic = shallow(<DefaultPic {...props} />);
            defaultPic.instance().handleRemoveDefaultPic = jest.fn();
            defaultPic.setState(state);

            // Action
            const button = defaultPic.find(Modal.Footer).find(Button).at(0);

            // Assert
            expect(button.props().variant).toBe('primary');
            expect(button.props().size).toBe('sm');
            expect(button.props().disabled).toEqual(state.isSubmitting);
            expect(button.html()).toContain('Save');
        });
        
        it('should have Modal Footer component having save button onClick', () => {
            // Arrange
            const props = {
                settings: {
                    picList: []
                },
                defaultPicPopup: {
                    headline: {
                        id: 1
                    },
                    pics: []
                },
                gridParams: {}
            };

            const defaultPic = shallow(<DefaultPic {...props} />);
            defaultPic.instance().handleSubmitSetDefaultPIC = jest.fn();
            const button = defaultPic.find(Modal.Footer).find(Button).at(0);

            // Action
            button.simulate('click');

            // Assert
            expect(defaultPic.instance().handleSubmitSetDefaultPIC).toHaveBeenCalledWith(props.defaultPicPopup.headline.id);
        });
        
        it('should have Modal Footer component having cancel button', () => {
            // Arrange
            const props = {
                settings: {
                    picList: []
                },
                defaultPicPopup: {
                    headline: {},
                    pics: []
                },
                gridParams: {}
            };

            const defaultPic = shallow(<DefaultPic {...props} />);

            // Action
            const button = defaultPic.find(Modal.Footer).find(Button).at(1);

            // Assert
            expect(button.props().variant).toBe('primary');
            expect(button.props().size).toBe('sm');
            expect(button.html()).toContain('Cancel');
        });
        
        it('should have Modal Footer component having cancel button onClick', () => {
            // Arrange
            const props = {
                settings: {
                    picList: []
                },
                defaultPicPopup: {
                    headline: {},
                    pics: []
                },
                gridParams: {}
            };

            const defaultPic = shallow(<DefaultPic {...props} />);
            defaultPic.instance().handleCancel = jest.fn();
            const button = defaultPic.find(Modal.Footer).find(Button).at(1);

            // Action
            button.simulate('click');

            // Assert
            expect(defaultPic.instance().handleCancel).toHaveBeenCalled();
        });
        
        it('should have ConfirmPopup', () => {
            // Arrange
            const props = {
                settings: {
                    picList: []
                },
                defaultPicPopup: {
                    headline: {},
                    pics: []
                },
                gridParams: {}
            };

            const state = {
                isShowConfirmPopup: true
            };

            const defaultPic = shallow(<DefaultPic {...props} />);
            defaultPic.instance().setState(state);

            // Action
            const confirmPopup = defaultPic.find(ConfirmPopup);

            // Assert
            expect(confirmPopup.props().size).toBe('lg');
            expect(confirmPopup.props().title).toBe('Confirmation');
            expect(confirmPopup.props().content).toEqual(<div>ThereAreSomeChangesConfirmMessage</div>);
        });
        
        it('should have ConfirmPopup onSubmit', () => {
            // Arrange
            const props = {
                settings: {
                    picList: []
                },
                defaultPicPopup: {
                    headline: {},
                    pics: []
                },
                gridParams: {}
            };

            const state = {
                isShowConfirmPopup: true
            };

            const defaultPic = shallow(<DefaultPic {...props} />);
            defaultPic.instance().closeAll = jest.fn();
            defaultPic.instance().setState(state);
            const confirmPopup = defaultPic.find(ConfirmPopup);

            // Action
            confirmPopup.simulate('submit');

            // Assert
            expect(defaultPic.instance().closeAll).toHaveBeenCalled();
        });
        
        it('should have ConfirmPopup onClose', () => {
            // Arrange
            const props = {
                settings: {
                    picList: []
                },
                defaultPicPopup: {
                    headline: {},
                    pics: []
                },
                gridParams: {}
            };

            const state = {
                isShowConfirmPopup: true
            };

            const defaultPic = shallow(<DefaultPic {...props} />);
            defaultPic.instance().toggleConfirmPopup = jest.fn();
            defaultPic.instance().setState(state);
            const confirmPopup = defaultPic.find(ConfirmPopup);

            // Action
            confirmPopup.simulate('close');

            // Assert
            expect(defaultPic.instance().toggleConfirmPopup).toHaveBeenCalled();
        });
    });
});