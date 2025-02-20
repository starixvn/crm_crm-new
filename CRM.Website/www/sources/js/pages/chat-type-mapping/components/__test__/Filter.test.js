import React from 'react';
import FilterWrapper, { Filter } from '../Filter';
import { shallow } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';
import configureMockStore from 'redux-mock-store';
import { Button, Form } from 'react-bootstrap';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import InsertPersonalMappingPopup from '../InsertPersonalMappingPopup';
import { toast } from 'react-toastify';
import toJson from 'enzyme-to-json';

describe('Filter', () => {
    LangHelper.getResource = jest.fn(value => value);

    const initialState = {
        filter: {
            chatType: '',
            name: '',
            groupHeadline: '',
            recipient: '',
            LetstalkIdOrUsername: '',
            mappingStatuses: '',
            botServiceId: '',
            botIds: '',
            holdBotIds: '',
            active: ''
        },
        settings: {
            chatTypes: [],
            mappingStatuses: [],
            languages: [],
            botServices: [],
            bots: [],
            holdBots: []
        },
        showFilter: false
    };

    describe('component with redux', () => {
        // Arrange
        const mockStore = configureMockStore();
        const initialState = {
            settings: {
                mappingStatuses: [{ id: 1, name: 'Text' }]
            },
            insertPersonalMappingData: {},
            insertPersonalMappingResult: {}
        };

        const store = mockStore(initialState);

        // Action
        const wrapper = shallow(<FilterWrapper store={store} />, { disableLifecycleMethods: true });

        // Assert
        it('component render correctly', () => {
            expect(toJson(wrapper)).toMatchSnapshot();
        });

        it('component has correct props', () => {
            expect(wrapper.props().children.props.settings).toEqual(initialState.settings);
            expect(wrapper.props().children.props.insertPersonalMappingData).toEqual(initialState.insertPersonalMappingData);
            expect(wrapper.props().children.props.insertPersonalMappingResult).toEqual(initialState.insertPersonalMappingResult);
        });
    });

    it('component has correct initialState', () => {
        // Arrange
        const initialState = {
            filter: {
                chatType: '',
                name: '',
                groupHeadline: '',
                recipient: '',
                LetstalkIdOrUsername: '',
                mappingStatuses: '',
                botServiceId: '',
                botIds: '',
                holdBotIds: '',
                active: ''
            },
            settings: {
                chatTypes: [],
                mappingStatuses: [],
                languages: [],
                botServices: [],
                bots: [],
                holdBots: []
            },
            showFilter: false
        };

        const props = {
            gridParams: { pageSize: 100 },
            settings: {
                chatTypes: [],
                mappingStatuses: [{ id: 1, name: 'Text' }],
                languages: [],
                bots: []
            },
            insertPersonalMappingData: {},
            insertPersonalMappingResult: {},
            getSettings: jest.fn(() => Promise.resolve({
                chatTypes: [],
                mappingStatuses: [],
                languages: [],
                bots: [],
                botServices: [{ id: 1, name: 'test' }]
            }))
        };

        const filter = shallow(<Filter {...props} />, { disableLifecycleMethods: true });

        expect(filter.state()).toEqual(initialState);
    });

    it('componentDidMount runs correctly', async () => {
        // Arrange
        const promise = Promise.resolve({});
        const params = {
            value: 'value'
        };

        const props = {
            settings: {
                chatTypes: [],
                mappingStatuses: [{ id: 1, checked: true }],
                languages: [],
                bots: [{ channelId: 1, id: 123, name: 'test' }],
                botServices: [{ id: 1, name: 'test' }]
            },
            insertPersonalMappingData: {},
            insertPersonalMappingResult: {},
            getSettings: jest.fn(() => promise),
            setGridParams: jest.fn()
        };

        const filter = shallow(<Filter {...props} />);
        filter.instance().getParams = jest.fn().mockReturnValue(params);

        expect(props.getSettings).toHaveBeenCalled();
    });

    it('handleFilterChange runs correctly', () => {
        // Arrange
        const value = 'value';
        const props = {
            settings: {
                chatTypes: [],
                mappingStatuses: [],
                languages: [],
                bots: []
            },
            insertPersonalMappingData: {},
            insertPersonalMappingResult: {},
            getSettings: jest.fn(() => Promise.resolve({}))
        };

        const filter = shallow(<Filter {...props} />, { disableLifecycleMethods: true });

        // Action
        filter.instance().onChange('name', value);

        // Assert
        expect(filter.instance().state.filter.name).toBe(value);
    });

    describe('handleToggleFilter', () => {
        let EventBak;
        let windowBak;

        beforeAll(() => {
            EventBak = global.Event;
            windowBak = global.window.dispatchEvent;
            global.Event = jest.fn();
            global.window.dispatchEvent = jest.fn();
        });

        afterAll(() => {
            global.Event = EventBak;
            global.window.dispatchEvent = windowBak;
        });

        const props = {
            insertPersonalMappingData: {
                isShow: true
            },
            setGridParams: jest.fn()
        };

        it('run exactly', () => {
            // Arrange
            const filter = shallow(<Filter {...props}/>, { disableLifecycleMethods: true }).instance();
            filter.setState(initialState);

            // Act
            filter.handleToggleFilter(true);

            // Assert
            expect(filter.state.showFilter).toBeTrue;
            expect(global.window.dispatchEvent).toHaveBeenCalled();
        });
    });

    describe('handleChangeBotService', () => {
        it('should setState when handleChangeBotService execute exactly', () => {
            //Arrange
            const props = {
                insertPersonalMappingData: {
                    show: true
                }
            };
            const state = {
                filter: {
                    botServiceId: 1,
                    botIds: '123',
                    holdBotIds:  '456'
                },
                settings: {
                    bots: [],
                    holdBots: [{ id: 123, value: 'test' , subItem: [{ key: 1 }]}],
                    botServices: [],
                    chatTypes: []
                },
            };

            const filter = shallow(<Filter {...props}/>, { disableLifecycleMethods: true });
            filter.instance().setState(state);
            filter.instance().handleChangeBotService(123);

            expect(filter.state().filter).toEqual({...state.filter, botServiceId: 123, botIds: '1'});
            expect(filter.state().settings).toEqual({...state.settings, bots: [{ id: 123, value: 'test' , subItem: [{ key: 1 }]}]});
        });
    });

    describe('getBotIds', () => {
        it('should return value when getBotIds has value', () => {
            //Arrange
            const props = {
                insertPersonalMappingData: {
                    show: true
                }
            };
            const state = {
                filter: {
                    botServiceId: 1,
                    botIds: '123',
                    holdBotIds: '456'
                },
                settings: {
                    bots: [],
                    holdBots: [{ id: 123, value: 'test' , subItem: [{ key: 1 }]}],
                    botServices: [],
                    chatTypes: []
                },
            };

            const filter = shallow(<Filter {...props}/>, { disableLifecycleMethods: true });
            filter.instance().setState(state);
            const result = filter.instance().getBotIds(123);

            expect(result).toBe('1');
        });

        it('should return value when getBotIds has not value', () => {
            //Arrange
            const props = {
                insertPersonalMappingData: {
                    show: true
                }
            };
            const state = {
                filter: {
                    botServiceId: 1,
                    botIds: '123',
                    holdBotIds: '456'
                },
                settings: {
                    bots: [],
                    holdBots: [{ id: 123, value: 'test' , subItem: [{ key: 1 }]}],
                    botServices: [],
                    chatTypes: []
                },
            };

            const filter = shallow(<Filter {...props}/>, { disableLifecycleMethods: true });
            filter.instance().setState(state);
            const result = filter.instance().getBotIds(null);

            expect(result).toBe('456');
        });
    });

    describe('getBotOptions', () => {
        it('should return value when getBotOptions has value', () => {
            //Arrange
            const props = {
                insertPersonalMappingData: {
                    show: true
                }
            };
            const state = {
                filter: {
                    botServiceId: 1,
                    botIds: '123',
                    holdBotIds: '456'
                },
                settings: {
                    bots: [],
                    holdBots: [{ id: 123, value: 'test' , subItem: [{ key: 1 }]}, { id: 456, value: 'td' , subItem: [{ key: 2 }]}],
                    botServices: [],
                    chatTypes: []
                },
            };

            const filter = shallow(<Filter {...props}/>, { disableLifecycleMethods: true });
            filter.instance().setState(state);
            const result = filter.instance().getBotOptions(123);

            expect(result).toEqual([{ id: 123, value: 'test' , subItem: [{ key: 1 }]}]);
        });

        it('should return value when getBotOptions has not value', () => {
            //Arrange
            const props = {
                insertPersonalMappingData: {
                    show: true
                }
            };
            const state = {
                filter: {
                    botServiceId: 1,
                    botIds: '123',
                    holdBotIds: '456'
                },
                settings: {
                    bots: [],
                    holdBots: [{ id: 123, value: 'test' , subItem: [{ key: 1 }]}],
                    botServices: [],
                    chatTypes: []
                },
            };

            const filter = shallow(<Filter {...props}/>, { disableLifecycleMethods: true });
            filter.instance().setState(state);
            const result = filter.instance().getBotOptions(null);

            expect(result).toBe(state.settings.holdBots);
        });
    });


    describe('getParams', () => {
        it('getParams with valid headline and recipient returns correctly', () => {
            // Arrange
            const state = {
                filter: {
                    chatType: '',
                    name: '',
                    groupHeadline: '',
                    recipient: '',
                    LetstalkIdOrUsername: '',
                    mappingStatuses: '',
                    languageId: '',
                    botIds: '',
                    active: '',
                    botServiceId: 1
                }
            };

            const props = {
                gridParams: {
                    pageIndex: 1,
                    pageSize: 100
                },
                insertPersonalMappingData: {},
                insertPersonalMappingResult: {},
                getSettings: jest.fn(() => Promise.resolve({}))
            };

            const expected = {
                chatType: state.filter.chatType,
                botIds: state.filter.botIds,
                channelId: state.filter.botServiceId,
                name: state.filter.name,
                groupHeadline: state.filter.groupHeadline,
                recipientIds: state.filter.recipient,
                LetstalkIdOrUsername: state.filter.LetstalkIdOrUsername,
                mappingStatuses: state.filter.mappingStatuses,
                isActive: state.filter.active,
                pageIndex: props.gridParams.pageIndex,
                pageSize: props.gridParams.pageSize
            };

            const filter = shallow(<Filter {...props} />, { disableLifecycleMethods: true });
            filter.instance().setState(state);

            const result = filter.instance().getParams();

            expect(result).toEqual(expected);
        });
    });

    describe('isValidParams', () => {
        it('isValidParams with valid mappingStatus returns true', () => {
            // Arrange
            const state = {
                filter: {
                    mappingStatuses: '1,2,3'
                }
            };

            const props = {
                gridParams: {
                    pageIndex: 1,
                    pageSize: 100
                },
                insertPersonalMappingData: {},
                insertPersonalMappingResult: {},
                getSettings: jest.fn(() => Promise.resolve({}))
            };

            const filter = shallow(<Filter {...props} />, { disableLifecycleMethods: true });
            filter.instance().setState(state);

            const result = filter.instance().isValidParams();

            expect(result).toBeTrue;
        });

        it('isValidParams with invalid mappingStatus returns false', () => {
            // Arrange
            const state = {
                filter: {
                    mappingStatuses: ''
                }
            };

            const props = {
                gridParams: {
                    pageIndex: 1,
                    pageSize: 100
                },
                insertPersonalMappingData: {},
                insertPersonalMappingResult: {},
                getSettings: jest.fn(() => Promise.resolve({}))
            };

            const filter = shallow(<Filter {...props} />, { disableLifecycleMethods: true });
            filter.instance().setState(state);

            const result = filter.instance().isValidParams();

            expect(result).toBeFalse;
        });

        it('isValidParams with invalid mappingStatus call toast', () => {
            // Arrange
            const event = {
                preventDefault: jest.fn()
            };
            const props = {
                gridParams: {
                    pageIndex: 1,
                    pageSize: 100
                },
                insertPersonalMappingData: {},
                insertPersonalMappingResult: {},
                getSettings: jest.fn(() => Promise.resolve({}))
            };

            const filter = shallow(<Filter {...props} />, { disableLifecycleMethods: true });
            toast.error = jest.fn();
            filter.instance().isValidParams = jest.fn().mockReturnValue({ isValid: false, errMsg: ['false'] });
            filter.instance().submitHandler = jest.fn();

            filter.find(Form).simulate('submit', event);

            expect(toast.error).toHaveBeenCalled();
        });
    });

    describe('submitHandler', () => {
        it('valid params', () => {
            // Arrange
            const params = {
                value: 'value'
            };

            const event = {
                preventDefault: jest.fn()
            };

            const props = {
                gridParams: {},
                insertPersonalMappingData: {},
                insertPersonalMappingResult: {},
                getSettings: jest.fn(() => Promise.resolve({})),
                setGridParams: jest.fn(),
                getGridData: jest.fn((params) => Promise.resolve([]))
            };

            const filter = shallow(<Filter {...props} />, { disableLifecycleMethods: true });
            filter.instance().isValidParams = jest.fn().mockReturnValue({ isValid: true });
            filter.instance().getParams = jest.fn().mockReturnValue(params);

            // Action
            filter.instance().submitHandler(event);

            // Assert
            expect(event.preventDefault).toHaveBeenCalled();
            expect(props.setGridParams).toHaveBeenCalledWith(params);
            expect(props.getGridData).toHaveBeenCalledWith({ ...params });
        });
    });

    describe('handle form group change', () => {
        it('handle form fields onChage event', () => {
            const event = {
                target: {
                    value: 'value'
                }
            };
            const eventBotService = {
                target: {
                    value: '1'
                }
            };

            // Arrange
            const state = {
                filter: {
                    chatType: '',
                    name: '',
                    groupHeadline: '',
                    recipient: '',
                    LetstalkIdOrUsername: '',
                    mappingStatuses: '1,2,3',
                    botServiceId: '',
                    botIds: '',
                    holdBotIds: '',
                    active: ''
                },
                settings: {
                    chatTypes: [],
                    mappingStatuses: [],
                    languages: [],
                    botServices: [],
                    bots: [],
                    holdBots: [{ id: 1, subItem: [{ key: 1, value: 'test' }] }]
                },
                showFilter: true
            };

            const props = {
                isHost: true,
                gridParams: {},
                insertPersonalMappingData: {},
                insertPersonalMappingResult: {},
                getSettings: jest.fn(() => Promise.resolve({})),
                setGridParams: jest.fn(),
                getGridData: jest.fn((params) => Promise.resolve([]))
            };

            const filter = shallow(<Filter {...props} />, { disableLifecycleMethods: true });
            filter.instance().setState(state);
            filter.instance().onChange = jest.fn();
            filter.instance().handleChangeBotService = jest.fn();
            filter.instance().handleChangeBotName = jest.fn();

            filter.find(Form.Group).at(0).find(Form.Control).simulate('change', eventBotService);
            expect(filter.instance().handleChangeBotService).toHaveBeenCalledWith(eventBotService.target.value);

            filter.find(Form.Group).at(1).find(Form.Control).simulate('change', event);
            expect(filter.instance().onChange).toHaveBeenCalledWith('chatType', event.target.value);

            filter.find(Form.Group).at(2).find(Form.Control).simulate('change', event);
            expect(filter.instance().onChange).toHaveBeenCalledWith('name', event.target.value);

            filter.find(Form.Group).at(3).find(Form.Control).simulate('change', event);
            expect(filter.instance().onChange).toHaveBeenCalledWith('LetstalkIdOrUsername', event.target.value);

            filter.find(Form.Group).at(4).find(Form.Control).simulate('change', event);
            expect(filter.instance().onChange).toHaveBeenCalledWith('groupHeadline', event.target.value);

            filter.find(Form.Group).at(5).find(Form.Control).simulate('change', event);
            expect(filter.instance().onChange).toHaveBeenCalledWith('recipient', event.target.value);

            filter.find(Form.Group).at(6).find(MultipleSelect).simulate('change', 'currentItem', event.target.value);
            expect(filter.instance().handleChangeBotName).toHaveBeenCalledWith('currentItem', event.target.value);

            filter.find(Form.Group).at(7).find(MultipleSelect).simulate('change', 'currentItem', event.target.value);
            expect(filter.instance().onChange).toHaveBeenCalledWith('mappingStatuses', event.target.value);

            filter.find(Form.Group).at(8).find(Form.Control).simulate('change', event);
            expect(filter.instance().onChange).toHaveBeenCalledWith('active', event.target.value);
        });
    });

    describe('Insert personal mapping', () => {
        it('If not have isHost permission will not show Insert Personal Chat Mapping button', () => {
            const props = {
                gridParams: {},
                insertPersonalMappingData: {},
                insertPersonalMappingResult: {},
                getSettings: jest.fn(() => Promise.resolve({}))
            };

            const filter = shallow(<Filter {...props} />, { disableLifecycleMethods: true });
            expect(filter.find(Form.Group).find(Button).length).toBe(1);
            expect(filter.find(Form.Group).find(Button).at(0).html()).not.toContain('InsertPersonalMappingBtn');
        });

        it('If have host permission will show Insert Personal Chat Mapping button and should call props openInsertPersonalMappingPopup when click', () => {
            const props = {
                isHost: true,
                gridParams: {},
                insertPersonalMappingData: {},
                insertPersonalMappingResult: {},
                getSettings: jest.fn(() => Promise.resolve({})),
                openInsertPersonalMappingPopup: jest.fn()
            };

            const filter = shallow(<Filter {...props} />, { disableLifecycleMethods: true });
            expect(filter.find(Form.Group).find(Button).length).toBe(2);
            expect(filter.find(Form.Group).find(Button).at(1).html()).toContain('<button style=\"width:auto\" type=\"button\" class=\"mr-2 btn btn-primary btn-sm\">InsertPersonal</button>');
            filter.find(Button).at(1).simulate('click');
            expect(props.openInsertPersonalMappingPopup).toHaveBeenCalled();
        });
    });

    describe('InsertPersonalMappingPopup', () => {
        const props = {
            isHost: true,
            gridParams: {},
            insertPersonalMappingData: { isShow: true },
            insertPersonalMappingResult: {},
            getSettings: jest.fn(() => Promise.resolve({})),
            openInsertPersonalMappingPopup: jest.fn()
        };

        const filter = shallow(<Filter {...props} />, { disableLifecycleMethods: true });
        expect(filter.find(InsertPersonalMappingPopup).length).toBe(1);
    });
});