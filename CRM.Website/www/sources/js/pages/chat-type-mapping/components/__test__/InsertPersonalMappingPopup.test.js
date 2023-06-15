import React from 'react';
import InsertPersonalMappingPopupWrapper, { InsertPersonalMappingPopup } from '../InsertPersonalMappingPopup';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Form, Modal, Button } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import CustomReactSelect from '@jsroot/components/CustomReactSelect';
import Site from '@jsroot/common/site';
import toJson from 'enzyme-to-json';
import DataService from '@jsroot/common/dataService';

beforeEach(() => {
    const appContainer = document.createElement('div');
    appContainer.setAttribute('id', 'right-row-container');
    document.body.appendChild(appContainer);
    Site.blockUI = jest.fn();
    Site.unblockUI = jest.fn();
    Site.resolveClientUrl = jest.fn((url) => url);
    Site.handleAxiosError = jest.fn();
});

afterEach(() => {
    const appContainer = document.getElementById('right-row-container');
    if (appContainer) {
        document.body.removeChild(appContainer);
    }
    jest.clearAllMocks();
});

describe('InsertPersonalMappingPopup', () => {
    LangHelper.getResource = jest.fn(value => value);

    // describe('component with redux', () => {
    //     // Arrange
    //     const mockStore = configureMockStore();
    //     const initialState = {
    //         settings: {
    //             bots: [{ id: 1, name: 'Bot1' }],
    //             recipientTypes: [],
    //             languages: []
    //         },
    //         recipients: [],
    //         groupHeadline: [{subData: null, id: 10695, name: '038arm'}],
    //         gridParams: {},
    //         insertPersonalMappingResult: {},
    //         letstalkName: ''
    //     };
    //     const props = {
    //         settings: {
    //             bots: [{ channelId: 1, id: 1}],
    //             botServices: [{ id: 1, name: 'telegram' }],
    //             recipientTypes: [{ id: 8, name: 'PIC of headline'}],
    //         },
    //         recipients: {
    //             data: [{ id: 1, letstalkIds: '1',  usernames: 'tets' }]
    //         }
    //     };

    //     const store = mockStore(initialState);

    //     // Action
    //     const wrapper = shallow(<InsertPersonalMappingPopupWrapper {...props} store={store} />, { disableLifecycleMethods: true });
    //     wrapper.instance();
    //     wrapper.getBotNameByBotService = jest.fn();

    //     // Assert
    //     it('component renders correctly', () => {
    //         const grid = mount(<InsertPersonalMappingPopupWrapper  {...props} store={store} />, { disableLifecycleMethods: true });
    //         expect(toJson(grid)).toMatchSnapshot();
    //     });

    //     it('component has correct props', () => {
    //         expect(wrapper.props().children.props.settings).toEqual(initialState.settings);
    //         expect(wrapper.props().children.props.recipients).toEqual(initialState.recipients);
    //         expect(wrapper.props().children.props.groupHeadline).toEqual(initialState.groupHeadline);
    //         expect(wrapper.props().children.props.gridParams).toEqual(initialState.gridParams);
    //         expect(wrapper.props().children.props.insertPersonalMappingResult).toEqual(initialState.insertPersonalMappingResult);
    //         expect(wrapper.props().children.props.letstalkName).toEqual(initialState.letstalkName);
    //     });
    // });

    describe('componentDidMount', () => {
        it('should calls setState', async () => {
             // Arrange
            const props = {
                settings: {
                    bots: [{ channelId: 1, id: 1}],
                    botServices: [{ id: 1, name: 'telegram' }],
                    recipientTypes: [{ id: 8, name: 'PIC of headline'}],
                    languages: []
                },
                recipients: {
                    data: [{ id: 1, letstalkIds: '1',  usernames: 'tets' }]
                },
                groupHeadline: [{subData: null, id: 10695, name: '038arm'}]
            };
            const state = {
                form: {
                    botServiceId: 2,
                    chatId: 1,
                    recipient: { value: 'test' },
                    groupHeadlines: '1,2,3'
                }
            };
            // Act
            const popup = shallow(<InsertPersonalMappingPopup {...props} />).instance();
            popup.setState(state);
            popup.getIgnoreNotificationType = jest.fn();

            await popup.componentDidMount();

            //Arrange
            expect(popup.getIgnoreNotificationType).toHaveBeenCalled();
        });
    });

    describe('getBotNameByBotService', () => {
        it('should return exactly', () => {
            // Arrange
            const props = {
                settings: {
                    bots: [{ channelId: 1, id: 1}],
                    botServices: [{ id: 1, name: 'telegram' }],
                    recipientTypes: [{ id: 8, name: 'PIC of headline'}],
                    languages: []
                },
                recipients: {
                    data: [{ id: 1, letstalkIds: '1',  usernames: 'tets' }]
                },
                groupHeadline: [{subData: null, id: 10695, name: '038arm'}]
            };
            const state = {
                form: {
                    botServiceId: 2,
                    chatId: 1,
                    recipient: { value: 'test' },
                    groupHeadlines: '1,2,3'
                }
            };
            // Act
            const popup = shallow(<InsertPersonalMappingPopup {...props} />, { disableLifecycleMethods: true }).instance();
            popup.setState(state);
            const actual = popup.getBotNameByBotService(1);

            // Assert
            expect(actual[0].id).toEqual(props.settings.bots[0].id);
        });
    });

    describe('getIgnoreNotificationType', () => {
        it('getIgnoreNotificationType should call setState exactly', async () => {
            // Arrange
            const props = {
                settings: {
                    bots: [{ channelId: 1, id: 1}],
                    botServices: [{ id: 1, name: 'telegram' }],
                    languages: []
                },
                recipients: {
                    data: [{ id: 1, letstalkIds: '1',  usernames: 'tets' }]
                },
                groupHeadline: [{subData: null, id: 10695, name: '038arm'}]
            };
            const state = {
                form: {
                    botServiceId: 2,
                    chatId: 1,
                    recipient: { value: 'test' },
                    groupHeadlines: '1,2,3'
                }
            };
            const response = {data: [{ notificationTypeId: 1 }]};
            const promise = Promise.resolve(response);
            Site.resolveClientUrl = jest.fn(url => url);
            DataService.getDataAsync = jest.fn(() => promise);
            
            // Act
            const popup = shallow(<InsertPersonalMappingPopup {...props} />, { disableLifecycleMethods: true });
            popup.instance().setState(state);
            popup.instance().getIgnoreNotificationType();
            await promise;

            // Assert
        });
    });

    describe('handleBotServiceChange', () => {
        it('should setState exactly', () => {
            // Arrange
            const props = {
                settings: {
                    bots: [{ channelId: 1, id: 1}],
                    botServices: [{ id: 1, name: 'telegram' }],
                    recipientTypes: [{ id: 8, name: 'PIC of headline'}],
                    languages: []
                },
                recipients: {
                    data: [{ id: 1, letstalkIds: '1',  usernames: 'tets' }]
                },
                groupHeadline: [{subData: null, id: 10695, name: '038arm'}]
            };
            const state = {
                form: {
                    botServiceId: 2,
                    chatId: 1,
                    recipient: { value: 'test' },
                    groupHeadlines: '1,2,3'
                }
            };
            // Act
            const popup = shallow(<InsertPersonalMappingPopup {...props} />, { disableLifecycleMethods: true }).instance();
            popup.setState(state);
            popup.getBotNameByBotService = jest.fn(() => [{ id: 1}]);
            popup.handleChange = jest.fn();
            popup.handleBotServiceChange(1);

            // Assert
            expect(popup.handleChange).toHaveBeenCalledWith('botServiceId', 1);
            expect(popup.handleChange).toHaveBeenCalledWith('displayName', '');
            expect(popup.handleChange).toHaveBeenCalledWith('botId', 1);
        });
    });

    describe('handleBotChange', () => {
        it('should call function props exactly when botServiceId is telegram', () => {
            // Arrange
            const promise = Promise.resolve([]);
            const props = {
                getTelegramDisplayName: jest.fn(() => promise),
                getLetstalkDisplayName: jest.fn(() => promise),
                recipients: {
                    data: [{ id: 1, letstalkIds: '1',  usernames: 'tets' }]
                },
                groupHeadline: [{ id: 1 }],
                recipient: { value: 'test' },
                settings: {
                    bots: [{ channelId: 1, id: 1}],
                    botServices: [{ id: 1, name: 'telegram' }],
                    languages: []
                }
            }
            const state = {
                form: {
                    botServiceId: 2,
                    chatId: 1,
                    recipient: { value: 'test' },
                    groupHeadlines: '1,2,3'
                }
            }

            // Act
            const popup = shallow(<InsertPersonalMappingPopup {...props} />, { disableLifecycleMethods: true });
            popup.instance().setState(state);
            popup.instance().handleChange = jest.fn();
            popup.instance().handleBotChange(1);

            // Assert
            expect(popup.instance().handleChange).toHaveBeenCalledWith('botId', 1);
            expect(props.getTelegramDisplayName).toHaveBeenCalled();
        });

        
        it('should call function props exactly when botServiceId is letstalk', () => {
            // Arrange
            const promise = Promise.resolve([]);
            const props = {
                getTelegramDisplayName: jest.fn(() => promise),
                getLetstalkDisplayName: jest.fn(() => promise),
                recipients: {
                    data: [{ id: 1, letstalkIds: '1',  usernames: 'tets' }]
                },
                groupHeadline: [{ id: 1 }],
                recipient: { value: 'test' },
                settings: {
                    bots: [{ channelId: 1, id: 1}],
                    botServices: [{ id: 1, name: 'telegram' }],
                    languages: []
                }
            }
            const state = {
                form: {
                    botServiceId: 1,
                    chatId: 1,
                    recipient: { value: 'test' },
                    groupHeadlines: '1,2,3'
                }
            }

            // Act
            const popup = shallow(<InsertPersonalMappingPopup {...props} />, { disableLifecycleMethods: true });
            popup.instance().setState(state);
            popup.instance().handleChange = jest.fn();
            popup.instance().handleBotChange(1);

            // Assert
            expect(popup.instance().handleChange).toHaveBeenCalledWith('botId', 1);
            expect(props.getLetstalkDisplayName).toHaveBeenCalled();
        });
    });

    describe('handle change function tests', () => {
        const props = {
            settings: {
                bots: [{ id: 1, name: 'Bot1', channelId: 1 }],
                botServices: [{ id: 1, name: 'telegram' }],
                languages: [],
                recipientTypes: [{ id: 8, name: 'PIC of headline'}]
            },
            recipients: {
                data: [{ id: 1, letstalkIds: '1',  usernames: 'tets' }]
            },
            groupHeadline: [{subData: null, id: 10695, name: '038arm'}],
            gridParams: {},
            insertPersonalMappingResult: { isSuccessful: true },
            letstalkName: '',
            getRecipientByRecipientType: jest.fn(),
            getGroupHeadlineByRecipient: jest.fn(),
            setInsertPersonalMappingResult: jest.fn(),
            insertPersonalMapping: jest.fn(),
            closeInsertPersonalMappingPopup: jest.fn(),
            getGridData: jest.fn()
        };

        it('handleChange runs correctly', () => {
            // Arrange
            const value = 'value';
            const state = {
                form: {
                    recipientName: 'test',
                    groupHeadlineDefault: [{subData: null, id: 10695, name: '038arm'}],
                    groupHeadline: [{subData: null, id: 10695, name: '038arm'}]
                },
                ignoreNotificationTypes: [{subData: null, id: 10695, name: '038arm'}]
            }

            const popup = shallow(<InsertPersonalMappingPopup {...props} />, { disableLifecycleMethods: true });
            popup.instance().setState(state);

            // Action
            popup.instance().handleChange('chatType', value);

            // Assert
            expect(popup.instance().state.form.chatType).toBe(value);
        });

        it('handle functions should call correct functions with correct telegram params when event triggered', async () => {
            const event = {
                target: { value: 'value', checked: true },
                preventDefault: jest.fn()
            };
            const promise = Promise.resolve([]);
            const state = {
                form: {
                    botServiceId: 2,
                    recipientName: 'test',
                    groupHeadlineDefault: [{subData: null, id: 10695, name: '038arm'}],
                    groupHeadline: [{subData: null, id: 10695, name: '038arm'}]
                },
                usernames: ['test'],
                ignoreNotificationTypes: [{subData: null, id: 10695, name: '038arm'}]
            };

            const initProps = { ...props, getLetstalkDisplayName: jest.fn(() => promise) };

            const popup = mount(<InsertPersonalMappingPopup {...initProps} />, { disableLifecycleMethods: true });
            popup.instance().setState(state);
            popup.instance().handleBotChange = jest.fn();
            popup.instance().handleGroupHeadlineChange = jest.fn();
            popup.instance().handleRecipientTypeChange = jest.fn();
            popup.instance().handleRecipientChange = jest.fn();
            popup.instance().handleLetstalkSelect = jest.fn();
            popup.instance().handleChange = jest.fn();
            popup.instance().onCloseInsertPopup = jest.fn();
            popup.instance().handleSubmit = jest.fn();
            popup.instance().handleBotServiceChange = jest.fn();
            popup.instance().isShowGreenCheck = jest.fn();
            popup.instance().handleChangeUsername = jest.fn();
            popup.instance().handleIgnoreNotificationChange = jest.fn();
            popup.instance().getBotNameByBotService = jest.fn(() => [{ id: 1, name: 'Bot1' }]);

            const test = shallow(popup.instance().renderForm());

            test.find(Form.Group).at(0).find(Form.Control).at(0).simulate('change', { target: { value: '1' }});
            expect(popup.instance().handleBotServiceChange).toHaveBeenCalledWith(1);

            test.find(Form.Group).at(1).find(Form.Control).at(0).simulate('change', event);
            expect(popup.instance().handleBotChange).toHaveBeenCalledWith('value');

            test.find(Form.Group).at(4).find(Form.Control).at(0).simulate('change', event);
            expect(popup.instance().handleRecipientTypeChange).toHaveBeenCalledWith(event);

            test.find(Form.Group).at(5).find(CustomReactSelect).at(0).simulate('change');
            expect(popup.instance().handleRecipientChange).toHaveBeenCalled();

            test.find(Form.Group).at(6).find(Form.Check).at(0).simulate('change', event);
            expect(popup.instance().handleChangeUsername).toHaveBeenCalledWith('value');

            test.find(Form.Group).at(8).find(MultipleSelect).at(0).simulate('change');
            expect(popup.instance().handleGroupHeadlineChange).toHaveBeenCalled();

            test.find(Form.Group).at(9).find(Form.Control).at(0).simulate('change', event);
            expect(popup.instance().handleChange).toHaveBeenCalledWith('languageId', 'value');

            test.find(Form.Group).at(10).find(MultipleSelect).at(0).simulate('change');
            expect(popup.instance().handleIgnoreNotificationChange).toHaveBeenCalled();

            test.find(Form.Group).at(11).find(Form.Control).at(0).simulate('change', event);
            expect(popup.instance().handleChange).toHaveBeenCalledWith('remark', 'value');

            test.find(Form.Group).at(12).find(Form.Check).at(0).simulate('change', event);
            expect(popup.instance().handleChange).toHaveBeenCalledWith('isTest', true);
        });

        it('handle functions should call correct functions with correct letstalk params when event triggered', async () => {
            const promise = Promise.resolve([]);
            const state = {
                form: {
                    botServiceId: 1,
                    recipientName: 'test',
                    groupHeadlineDefault: [{subData: null, id: 10695, name: '038arm'}],
                    groupHeadline: [{subData: null, id: 10695, name: '038arm'}]
                },
                letstalkIds: '123',
                ignoreNotificationTypes: [{subData: null, id: 10695, name: '038arm'}]
            };

            const initProps = { ...props, getLetstalkDisplayName: jest.fn(() => promise) };

            const popup = mount(<InsertPersonalMappingPopup {...initProps} />, { disableLifecycleMethods: true });
            popup.instance().setState(state);
            popup.instance().handleBotChange = jest.fn();
            popup.instance().handleGroupHeadlineChange = jest.fn();
            popup.instance().handleRecipientTypeChange = jest.fn();
            popup.instance().handleRecipientChange = jest.fn();
            popup.instance().handleLetstalkSelect = jest.fn();
            popup.instance().handleChange = jest.fn();
            popup.instance().onCloseInsertPopup = jest.fn();
            popup.instance().handleSubmit = jest.fn();
            popup.instance().handleBotServiceChange = jest.fn();
            popup.instance().handleIgnoreNotificationChange = jest.fn();
            popup.instance().getBotNameByBotService = jest.fn(() => [{ id: 1, name: 'Bot1' }]);

            const test = shallow(popup.instance().renderForm());

            test.find(Form.Group).at(6).find(Form.Check).at(0).simulate('change');
            expect(popup.instance().handleLetstalkSelect).toHaveBeenCalledWith();
        });

        it('render correct', () => {
            const state = {
                form: {
                    botServiceId: 1,
                    recipientName: 'test',
                    groupHeadlineDefault: [{subData: null, id: 10695, name: '038arm'}],
                    groupHeadline: [{subData: null, id: 10695, name: '038arm'}]
                },
                dirtyFormConfirmation: { isShow: true },
                ignoreNotificationTypes: [{subData: null, id: 10695, name: '038arm'}]
            };
            const popup = shallow(<InsertPersonalMappingPopup {...props} />, { disableLifecycleMethods: true });
            popup.instance().setState(state);

            expect(popup.find(ConfirmPopup).length).toBe(1);
        });
    });

    describe('getUsernames', () => {
        it('should return exactly when has param', () => {
            // Arrange
            const props = {
                settings: {
                    bots: [{ channelId: 1, id: 1}],
                    botServices: [{ id: 1, name: 'telegram' }],
                    languages: []
                },
                groupHeadline: [{subData: null, id: 10695, name: '038arm'}]
            };
            const option = { usernames: 'test' };
            // Act
            const popup = shallow(<InsertPersonalMappingPopup {...props} />, { disableLifecycleMethods: true }).instance();
            const actual = popup.getUsernames(option);

            // Assert
            expect(actual).toEqual(['test']);
        });

        it('should return exactly when has not param', () => {
            // Arrange
            const props = {
                settings: {
                    bots: [{ channelId: 1, id: 1}],
                    botServices: [{ id: 1, name: 'telegram' }],
                    languages: []
                },
                groupHeadline: [{subData: null, id: 10695, name: '038arm'}]
            };
            const option = { usernames: null };
            // Act
            const popup = shallow(<InsertPersonalMappingPopup {...props} />, { disableLifecycleMethods: true }).instance();
            const actual = popup.getUsernames(option);

            // Assert
            expect(actual).toEqual([]);
        });
    });

    describe('handleChangeUsername', () => {
        it('should return exactly', () => {
            // Arrange
            const promise = Promise.resolve([]);
            const props = {
                settings: {
                    bots: [{ id: 1, name: 'Bot1', channelId: 1 }],
                    botServices: [{ id: 1, name: 'telegram' }],
                    recipientTypes: [],
                    languages: []
                },
                telegramName: 'test',
                letstalkName: 'test',
                getTelegramDisplayName: jest.fn(() => promise),
                recipients: {
                    data: [{ id: 1, letstalkIds: '1',  usernames: 'tets' }],
                    botInfo: [{ username: 'test', chatId: '123' }]
                },
                groupHeadline: [{ id: 1 }],
                recipient: { value: 'test' }
            };
            const state = {
                form: {
                    botId: 1,
                    botServiceId: 2,
                    chatId: 1,
                    recipient: { value: 'test' },
                    groupHeadlines: '1,2,3'
                },
                settings: {
                    usernames: '1,2,3'
                }
            };

            // Act
            const popup = shallow(<InsertPersonalMappingPopup {...props} />, { disableLifecycleMethods: true });
            popup.instance().setState(state);
            popup.instance().handleChange = jest.fn();
            popup.instance().handleChangeUsername('test');

            // Assert
            expect(popup.instance().handleChange).toHaveBeenCalledWith('username', 'test');
            expect(popup.instance().handleChange).toHaveBeenCalledWith('chatId', '123');
            expect(props.getTelegramDisplayName).toHaveBeenCalled();
        });
    });

    describe('functions test', () => {
        const promise = Promise.resolve([]);
        const props = {
            settings: {
                bots: [{ id: 1, name: 'Bot1', channelId: 1 }],
                botServices: [{ id: 1, name: 'telegram' }],
                recipientTypes: [],
                languages: []
            },
            recipients: {
                data: [{ id: 1, letstalkIds: '1',  usernames: 'tets' }]
            },
            groupHeadline: [{subData: null, id: 10695, name: '038arm'}],
            gridParams: {},
            insertPersonalMappingResult: { isSuccessful: true },
            letstalkName: '',
            getLetstalkDisplayName: jest.fn(() => promise),
            getTelegramDisplayName: jest.fn(() => promise),
            getRecipientByRecipientType: jest.fn(),
            getGroupHeadlineByRecipient: jest.fn(),
            setInsertPersonalMappingResult: jest.fn(),
            insertPersonalMapping: jest.fn(() => promise),
            closeInsertPersonalMappingPopup: jest.fn(),
            getGridData: jest.fn()
        };
        const state = {
            form: {
                botServiceId: 1,
                chatId: 1,
                recipient: { value: 'test' },
                groupHeadlines: '1,2,3'
            }
        }
        const popup = shallow(<InsertPersonalMappingPopup {...props} />, { disableLifecycleMethods: true });
        popup.instance().setState(state);

        it('handleBotChange with call correct props with correct params',async () => {
            jest.useFakeTimers();
            popup.instance().handleChange = jest.fn();
            popup.instance().handleBotChange('value');
            expect(popup.instance().handleChange).toHaveBeenCalledWith('botId', 'value');
            expect(props.getLetstalkDisplayName).toHaveBeenCalled();
            await promise;
            jest.runAllTimers();
            expect(popup.instance().handleChange).toHaveBeenCalledWith('displayName', props.letstalkName);
            expect(popup.instance().state.isLoading).toEqual(false);
        });

        it('handleGroupHeadlineChange with call correct props with correct params', () => {
            popup.instance().handleChange = jest.fn();
            popup.instance().handleGroupHeadlineChange('currentItem', 'value');
            expect(popup.instance().handleChange).toHaveBeenCalledWith('groupHeadlines', 'value');
        });

        it('handleRecipientTypeChange with call correct props with correct params', () => {
            const event = {
                target: { value: 'value' },
                nativeEvent: {
                    target: {
                        0: { text: 'value' },
                        1: { text: 'value' },
                        2: { text: 'value' },
                        length: 3,
                        selectedIndex: 2
                    }
                }
            };
            popup.instance().handleChange = jest.fn();
            popup.instance().handleRecipientTypeChange(event);
            expect(popup.instance().handleChange).toHaveBeenCalledWith('recipientType', 'value');
            expect(props.getRecipientByRecipientType).toHaveBeenCalledWith('value');
        });

        it('handleRecipientChange with call correct props with correct params', () => {
            const option = { value: 'value' };
            popup.instance().handleChange = jest.fn();
            popup.instance().handleRecipientChange(option);
            expect(popup.instance().handleChange).toHaveBeenCalledWith('recipient', option);
            expect(popup.instance().handleChange).toHaveBeenCalledWith('letstalkId', '');
            expect(popup.instance().handleChange).toHaveBeenCalledWith('displayName', '');
            expect(props.getGroupHeadlineByRecipient).toHaveBeenCalledWith('value');
        });

        it('handleLetstalkSelect with call correct props with correct params',async () => {
            const event = {
                target: { value: 'value' }
            };
            jest.useFakeTimers();
            popup.instance().handleChange = jest.fn();
            popup.instance().handleLetstalkSelect(event);
            expect(popup.instance().handleChange).toHaveBeenCalledWith('letstalkId', 'value');
            expect(props.getLetstalkDisplayName).toHaveBeenCalled();
            await promise;
            jest.runAllTimers();
            expect(popup.instance().handleChange).toHaveBeenCalledWith('displayName', props.letstalkName);
            expect(popup.instance().state.isLoading).toEqual(false);
        });

        it('renderOptions return expected result', () => {
            const item = {
                id: 1, name: 'test'
            };
            const expected = <option key={`${0}-${item.id}`} value={item.id}>{item.name}</option>;
            const actual = popup.instance().renderOptions(item, 0);
            expect(actual).toEqual(expected);
        });

        it('renderLetstalkIds when state.letstalkIds is null return null', () => {
            const state = { letstalkIds: '' };
            popup.instance().setState(state);
            const actual = popup.instance().renderLetstalkIds();
            expect(actual).toBe(null);
        });

        it('renderLetstalkIds when state.letstalkIds is correct return expected radio input', () => {
            const state = { letstalkIds: '1,2,3,4' };
            popup.instance().setState(state);
            const actual = popup.instance().renderLetstalkIds();
            expect(actual.length).toBe(4);
        });

        it('isValidParams return expected results invalid', () => {
            const state = {
                form: {
                    botId: '',
                    displayName: '',
                    recipientType: '',
                    groupHeadlines: '',
                    recipient: '',
                    letstalkId: '',
                    languageId: ''
                }
            };
            popup.instance().setState(state);
            const actual = popup.instance().isValidParams();
            expect(popup.instance().state.validate.isShow).toBeTrue;
            expect(popup.instance().state.validate.errMsgs.length).toBe(5);
            expect(actual).toBeFalse;
        });

        it('isValidParams return valid validation', () => {
            const state = {
                form: {
                    botId: '1',
                    displayName: 'a',
                    recipientType: '1',
                    groupHeadlines: '1',
                    recipient: '1',
                    letstalkId: '1',
                    languageId: '1'
                }
            };
            popup.instance().setState(state);
            const actual = popup.instance().isValidParams();
            expect(popup.instance().state.validate.isShow).toBeFalse;
            expect(popup.instance().state.validate.errMsgs.length).toBe(0);
            expect(actual).toBeTrue;
        });

        it('getParams return expected results', () => {
            const state = {
                form: {
                    botId: '1',
                    displayName: 'a',
                    recipientType: '1',
                    groupHeadlines: '1',
                    recipient: '1',
                    letstalkId: '1',
                    languageId: '1',
                    botServiceId: 2,
                    chatId: 1,
                    ignoredNotification: 1,
                    username: 'test'
                }
            };
            popup.instance().setState(state);
            const expected = {
                botId: state.form.botId,
                recipientTypeId: state.form.recipientType,
                channelId: state.form.botServiceId,
                conversationId: state.form.chatId,
                username: state.form.username,
                ignoredNotificationTypeList: state.form.ignoredNotification,
                groupHeadlineIds: state.form.groupHeadlines,
                isTest: null,
                recipientIds: state.form.recipient.value,
                languageId: state.form.languageId,
                remark: state.form.remark
            };
            const actual = popup.instance().getParams();
            expect(actual).toEqual(expected);
        });

        it('handleSumit will call expected props when InValid params', () => {
            const event = { preventDefault: jest.fn() };
            popup.instance().isValidParams = jest.fn().mockReturnValue(false);
            popup.instance().handleSubmit(event);
            expect(props.setInsertPersonalMappingResult).toHaveBeenCalledWith(null);
            expect(props.closeInsertPersonalMappingPopup).not.toHaveBeenCalled();
            expect(props.getGridData).not.toHaveBeenCalled();
        });

        it('handleSumit will call expected props when Valid params',async () => {
            const event = { preventDefault: jest.fn() };
            popup.instance().isValidParams = jest.fn().mockReturnValue(true);
            popup.instance().getParams = jest.fn().mockReturnValue('valueParams');
            popup.instance().handleSubmit(event);

            expect(props.setInsertPersonalMappingResult).toHaveBeenCalledWith(null);
            expect(props.insertPersonalMapping).toHaveBeenCalledWith('valueParams');
            await promise;
            jest.runAllTimers();
            expect(props.closeInsertPersonalMappingPopup).toHaveBeenCalled();
            expect(props.getGridData).toHaveBeenCalledWith(props.gridParams);
        });

        it('isDirtyForm return expected true value', () => {
            const initState = {
                botId: '',
                displayName: '',
                recipientType: '',
                groupHeadlines: '',
                recipient: '',
                letstalkId: '',
                languageId: ''
            };

            const state = {
                form: {
                    botId: '1',
                    displayName: 'a',
                    recipientType: '1',
                    groupHeadlines: '1',
                    recipient: '1',
                    letstalkId: '1',
                    languageId: '1'
                }
            };

            popup.instance().initState = initState;
            popup.instance().setState(state);
            const actual = popup.instance().isDirtyForm();
            expect(actual).toBeTrue;
        });

        it('isDirtyForm return expected false value', () => {
            const initState = {
                botId: '',
                displayName: '',
                recipientType: '',
                groupHeadlines: '',
                recipient: '',
                letstalkId: '',
                languageId: ''
            };

            const state = {
                form: {
                    botId: '',
                    displayName: '',
                    recipientType: '',
                    groupHeadlines: '',
                    recipient: '',
                    letstalkId: '',
                    languageId: ''
                }
            };

            popup.instance().initState = initState;
            popup.instance().setState(state);
            const actual = popup.instance().isDirtyForm();
            expect(actual).toBeFalse;
        });

        it('onCloseInsertPopup when is dirty form will call setState', () => {
            const initState = {
                dirtyFormConfirmation: { isShow: false }
            };
            popup.instance().setState(initState);
            popup.instance().isDirtyForm = jest.fn().mockReturnValue(true);
            popup.instance().onCloseInsertPopup();
            expect(popup.instance().state.dirtyFormConfirmation.isShow).toBeTrue;
        });

        it('onCloseInsertPopup when is not dirty form will call correct props', () => {
            const initState = {
                dirtyFormConfirmation: { isShow: false }
            };
            popup.instance().setState(initState);
            popup.instance().isDirtyForm = jest.fn().mockReturnValue(false);
            popup.instance().onCloseInsertPopup();
            expect(popup.instance().state.dirtyFormConfirmation.isShow).toBeFalse;
            expect(props.closeInsertPersonalMappingPopup).toHaveBeenCalled();
        });

        it('closeConfirmDirtyForm will do expected action to change state dirtyFormConfirmation', () => {
            const initState = {
                dirtyFormConfirmation: { isShow: true }
            };
            popup.instance().setState(initState);
            popup.instance().closeConfirmDirtyForm();
            expect(popup.instance().state.dirtyFormConfirmation.isShow).toBeFalse;
        });
    });
});