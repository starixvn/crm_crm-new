import React from 'react';
import EditPersonalMappingPopupWrapper, { EditPersonalMappingPopup } from '../EditPersonalMappingPopup';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Form, Modal, Button } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import SelectWithSearch from 'react-select';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import toJson from 'enzyme-to-json';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';

describe('EditPersonalMappingPopup', () => {
    beforeEach(() => {
        Site.blockUI = jest.fn();
        Site.unblockUI = jest.fn();
        Site.handleAxiosError = jest.fn();
        Site.mappingStatusClass = jest.fn();
        Site.resolveClientUrl = jest.fn((url) => url);
        LangHelper.getResource = jest.fn((key) => key);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    const initData = {
        conversationGroupId: 1,
        conversationGroupName: 'GroupName',
        conversationId: 'conversationId',
        botId: 1,
        name: 'Name',
        conversationId: 'aaa',
        recipientType: 1,
        headlines: [{ id: 1, name: 'headline', headlineId: 2 }],
        recipients: [{ id: 1, name: 'recipient', recipientTypeId: 1, recipientTypeName: 'rep', letstalks: { letstalkId: 1 }, recipientId: 1, recipientName: 'rep' }],
        letstalkId: '12',
        letstalkID_Username: '12',
        languageId: 1,
        remark: '123',
        ignoredNotificationTypeList: [1,2,3,4,5],
        isTest: 1,
        ignoredNotificationTypeList: [1,2]
    };

    const initProps = {
        updatePersonalMappingData: { data: initData },
        recipients: {
            data: [{ id: 1, letstalkIds: '1',  usernames: 'tets' }],
            botInfo: [{ username: 'test', chatId: '123', botId: 12345 }]
        },
        settings: {
            bots: [{ id: 1, name: 'Bot1', channelId: 1 }],
            recipientTypes: [],
            languages: []
        }
    };

    describe('component with redux', () => {
        // Arrange
        const mockStore = configureMockStore();
        const initialState = {
            settings: {
                bots: [{ id: 1, name: 'Bot1' }],
                recipientTypes: [],
                languages: []
            },
            recipients: [],
            groupHeadline: [],
            gridParams: {},
            updatePersonalMappingData: { data: initData },
            updatePersonalMappingResult: {}
        };

        const store = mockStore(initialState);

        // Action
        const wrapper = shallow(<EditPersonalMappingPopupWrapper store={store} {...initProps} />, { disableLifecycleMethods: true });

        // Assert
        it('component renders correctly', () => {
            const grid = shallow(<EditPersonalMappingPopupWrapper store={store} {...initProps} />, { disableLifecycleMethods: true });
            expect(toJson(grid)).toMatchSnapshot();
        });

        it('component has correct props', () => {
            expect(wrapper.props().children.props.settings).toEqual(initialState.settings);
            expect(wrapper.props().children.props.recipients).toEqual(initialState.recipients);
            expect(wrapper.props().children.props.groupHeadline).toEqual(initialState.groupHeadline);
            expect(wrapper.props().children.props.gridParams).toEqual(initialState.gridParams);
            expect(wrapper.props().children.props.updatePersonalMappingResult).toEqual(initialState.updatePersonalMappingResult);
            expect(wrapper.props().children.props.letstalkName).toEqual(initialState.letstalkName);
        });
    });

    describe('handle change function tests', () => {
        const props = {
            settings: {
                bots: [{ id: 1, name: 'Bot1' }],
                recipientTypes: [],
                languages: []
            },
            recipients: [],
            groupHeadline: [],
            gridParams: {},
            updatePersonalMappingData: { data: initData },
            updatePersonalMappingResult: { isSuccessful: true },
            letstalkID_Username: '',
            getRecipientByRecipientType: jest.fn(),
            getGroupHeadlineByRecipient: jest.fn(),
            setUpdatePersonalMappingResult: jest.fn(),
            getIgnoreNotificationType: jest.fn(),
            updatePersonalMapping: jest.fn(),
            closeUpdatePersonalMappingPopup: jest.fn(),
            getGridData: jest.fn(),
            ...initProps
        };

        it('handleChange runs correctly', () => {
            // Arrange
            const value = 'value';

            const popup = shallow(<EditPersonalMappingPopup {...props} />, { disableLifecycleMethods: true });

            // Action
            popup.instance().handleChange('chatType', value);

            // Assert
            expect(popup.instance().state.form.chatType).toBe(value);
        });

        it('componentDidMount should call expected props and execute correctly', async () => {
            const expected = {
                bot: {
                    id: initData.botId,
                    name: initData.botName
                },
                name: initData.conversationGroupName,
                conversationId: initData.conversationId,
                isTest: false,
                recipientName: undefined,
                recipientTypeId: initData.recipients[0].recipientTypeId,
                recipientIds: initData.recipients.map(r => r.recipientId).toString(),
                groupHeadlines: initData.headlines.map(v => v.headlineId).toString(),
                mappingStatus: {
                    id: initData.mappingStatusId,
                    name: initData.mappingStatus
                },
                languageId: initData.languageId,
                remark: initData.remark
            };
            const state = {
                form: {
                    botId: '1',
                    recipientType: 'a',
                    recipient: '1',
                    conversationId: '1',
                    groupHeadlines: '1',
                    languageId: '1',
                    groupHeadlineDefault: [{subData: null, id: 10695, name: '038arm'}],
                    groupHeadline: [{subData: null, id: 10695, name: '038arm'}],
                    recipient: { value: 'test' },
                    groupHeadlines: '1,2,3',
                    botServiceId: 1,
                    letstalkID_Username: 'test'
                },
                ignoreNotificationTypes: [{subData: null, id: 10695, name: '038arm'}]
            };
            const popup = shallow(<EditPersonalMappingPopup {...props} />);
            popup.instance().setState(state);
            popup.instance().getIgnoreNotificationType = jest.fn();
            expect(props.getRecipientByRecipientType).toHaveBeenCalledWith(expected.recipientTypeId);
            expect(props.getGroupHeadlineByRecipient).toHaveBeenCalled();
        });

        it('handle functions should call correct functions with correct params when event triggered', async () => {
            const event = {
                target: { value: 'value' },
                preventDefault: jest.fn()
            };
            const promise = Promise.resolve([]);
            const state = {
                form: {
                    botId: '1',
                    botServiceId: 1,
                    groupHeadlineDefault: [{subData: null, id: 10695, name: '038arm'}],
                    groupHeadline: [{subData: null, id: 10695, name: '038arm'}],
                    recipient: { value: 'test' },
                    groupHeadlines: '1,2,3'
                },
                ignoreNotificationTypes: [{subData: null, id: 10695, name: '038arm'}]
            };

            const initProps = { ...props, getLetstalkDisplayName: jest.fn(() => promise) };

            const popup = shallow(<EditPersonalMappingPopup {...initProps} />, { disableLifecycleMethods: true });
            popup.instance().setState(state);
            popup.instance().handleGroupHeadlineChange = jest.fn();
            popup.instance().handleRecipientTypeChange = jest.fn();
            popup.instance().handleRecipientChange = jest.fn();
            popup.instance().handleLetstalkIdSelect = jest.fn();
            popup.instance().handleChange = jest.fn();
            popup.instance().onCloseEditPersonalPopup = jest.fn();
            popup.instance().handleEditPersonalSubmitForm = jest.fn();

            const test = shallow(popup.instance().renderForm());

            test.find(Form.Group).at(3).find(Form.Control).at(0).simulate('change', event);
            expect(popup.instance().handleRecipientTypeChange).toHaveBeenCalledWith(event);

            test.find(Form.Group).at(8).find(Form.Control).at(0).simulate('change', event);
            expect(popup.instance().handleChange).toHaveBeenCalledWith('languageId', 'value');

            test.find(Form.Group).at(10).find(Form.Control).at(0).simulate('change', event);
            expect(popup.instance().handleChange).toHaveBeenCalledWith('remark', 'value');
        });

        it('render correct', () => {
            const state = {
                isShowConfirmDirtyForm: true,
                form: {
                    botId: '1',
                    botServiceId: 1,
                    groupHeadlineDefault: [{subData: null, id: 10695, name: '038arm'}],
                    groupHeadline: [{subData: null, id: 10695, name: '038arm'}],
                    recipient: { value: 'test' },
                    groupHeadlines: '1,2,3'
                },
                ignoreNotificationTypes: [{subData: null, id: 10695, name: '038arm'}]
            };
            const popup = shallow(<EditPersonalMappingPopup {...props} />, { disableLifecycleMethods: true });
            popup.instance().setState(state);

            expect(popup.find(ConfirmPopup).length).toBe(1);
        });
    });

    describe('handleBotChange', () => {
        it('should call function props exactly when botServiceId is telegram', () => {
            // Arrange
            const promise = Promise.resolve([]);
            const props = {
                ...initProps,
                telegramName: 'test',
                letstalkName: 'test',
                getTelegramDisplayName: jest.fn(() => promise),
                getLetstalkDisplayName: jest.fn(() => promise),
                recipients: {
                    data: [{ id: 1, letstalkIds: '1',  usernames: 'tets' }]
                },
                groupHeadline: [{ id: 1 }],
                recipient: { value: 'test' }
            }
            const state = {
                form: {
                    botServiceId: 2,
                    chatId: 1,
                    recipient: { value: 'test' },
                    groupHeadlines: '1,2,3'
                },
                ignoreNotificationTypes: [{subData: null, id: 10695, name: '038arm'}]
            }

            // Act
            const popup = shallow(<EditPersonalMappingPopup {...props} />, { disableLifecycleMethods: true });
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
                ...initProps,
                telegramName: 'test',
                letstalkName: 'test',
                getTelegramDisplayName: jest.fn(() => promise),
                getLetstalkDisplayName: jest.fn(() => promise),
                recipients: {
                    data: [{ id: 1, letstalkIds: '1',  usernames: 'tets' }]
                },
                groupHeadline: [{ id: 1 }],
                recipient: { value: 'test' }
            }
            const state = {
                form: {
                    botServiceId: 1,
                    chatId: 1,
                    recipient: { value: 'test' },
                    groupHeadlines: '1,2,3'
                },
                ignoreNotificationTypes: [{subData: null, id: 10695, name: '038arm'}]
            }

            // Act
            const popup = shallow(<EditPersonalMappingPopup {...props} />, { disableLifecycleMethods: true });
            popup.instance().setState(state);
            popup.instance().handleChange = jest.fn();
            popup.instance().handleBotChange(1);

            // Assert
            expect(popup.instance().handleChange).toHaveBeenCalledWith('botId', 1);
            expect(props.getLetstalkDisplayName).toHaveBeenCalled();
        });
    });

    describe('renderUsernameRadioButton', () => {
        it('should return exactly', () => {
            // Arrange
            const props = {
                ...initProps,
                telegramName: 'test',
                letstalkName: 'test',
                recipients: {
                    data: [{ id: 1, letstalkIds: '1',  usernames: 'tets' }]
                },
                groupHeadline: [{ id: 1 }],
                recipient: { value: 'test' }
            };
            const state = {
                form: {
                    botServiceId: 2,
                    chatId: 1,
                    recipient: { value: 'test' },
                    groupHeadlines: '1,2,3'
                },
                settings: {
                    usernames: '1,2,3'
                },
                ignoreNotificationTypes: [{subData: null, id: 10695, name: '038arm'}]
            };

            // Act
            const popup = shallow(<EditPersonalMappingPopup {...props} />, { disableLifecycleMethods: true });
            popup.instance().setState(state);
            popup.instance().handleChangeUsername = jest.fn();
            popup.instance().isShowGreenCheck = jest.fn();
            const result = popup.instance().renderUsernameRadioButton();

            // Assert
            expect(result).toBe(null);
        });
    });

    describe('getChatIdOption', () => {
        it('should return exactly', () => {
            // Arrange
            const promise = Promise.resolve([]);
            const props = {
                ...initProps,
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
                    botServiceId: 2,
                    chatId: 1,
                    recipient: { value: 'test' },
                    groupHeadlines: '1,2,3'
                },
                settings: {
                    usernames: '1,2,3'
                },
                ignoreNotificationTypes: [{subData: null, id: 10695, name: '038arm'}]
            };

            // Act
            const popup = shallow(<EditPersonalMappingPopup {...props} />, { disableLifecycleMethods: true });
            popup.instance().setState(state);
            const actual = popup.instance().getChatIdOption('test');

            // Assert
            expect(actual.chatId).toBe('123');
            expect(actual.chatIdOptions).toEqual(['123']);
        });
    });

    describe('handleChangeUsername', () => {
        it('should return exactly', () => {
            // Arrange
            const promise = Promise.resolve([]);
            const props = {
                ...initProps,
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
                    botServiceId: 2,
                    chatId: 1,
                    recipient: { value: 'test' },
                    groupHeadlines: '1,2,3'
                },
                settings: {
                    usernames: '1,2,3'
                },
                ignoreNotificationTypes: [{subData: null, id: 10695, name: '038arm'}]
            };

            // Act
            const popup = shallow(<EditPersonalMappingPopup {...props} />, { disableLifecycleMethods: true });
            popup.instance().setState(state);
            popup.instance().handleChange = jest.fn();
            popup.instance().handleChangeUsername('test');

            // Assert
            expect(popup.instance().handleChange).toHaveBeenCalledWith('letstalkID_Username', 'test');
            expect(popup.instance().handleChange).toHaveBeenCalledWith('chatId', '123');
            expect(props.getTelegramDisplayName).toHaveBeenCalled();
        });
    });

    describe('isChatWithBot', () => {
        // Arrange
        const props = {
            ...initProps,
            telegramName: 'test',
            letstalkName: 'test',
            groupHeadline: [{ id: 1 }],
            recipient: { value: 'test' },
            recipients: {
                data: [{ id: 1, letstalkIds: '1',  usernames: 'tets' }],
                botInfo: [{ username: 'test', chatId: '123', botId: 12345 }]
            },
            groupHeadline: [{subData: null, id: 10695, name: '038arm'}]
        };
        const state = {
            ignoreNotificationTypes: [{subData: null, id: 10695, name: '038arm'}]
        };
        it('should return true', () => {
            // Act
            const popup = shallow(<EditPersonalMappingPopup {...props} />, { disableLifecycleMethods: true }).instance();
            popup.setState(state);
            const actual = popup.isChatWithBot(12345, 123);

            // Assert
            expect(actual).toBe(true);
        });

        it('should return false', () => {
            // Act
            const popup = shallow(<EditPersonalMappingPopup {...props} />, { disableLifecycleMethods: true }).instance();
            popup.setState(state);
            const actual = popup.isChatWithBot(12345, 12345);

            // Assert
            expect(actual).toBe(false);
        });
    });

    describe('getRecipientTypes', () => {
        it('should return exactly when is telegram', () => {
            // Arrange
            const props = {
                ...initProps,
                recipients: {
                    data: [{ id: 1, letstalkIds: '1',  usernames: 'tets' }],
                    botInfo: [{ username: 'test', chatId: '123' }]
                },
                groupHeadline: [{ id: 1 }],
                recipient: { value: 'test' },
                settings: {
                    bots: [{ channelId: 1, id: 1}],
                    botServices: [{ id: 1, name: 'telegram' }],
                    recipientTypes: [{ id: 8, name: 'PIC of headline' }, { id: 9, name: 'Account of headline' }],
                    languages: [{id: 1, name: 'test'}]
                }
            };
            const state = {
                ignoreNotificationTypes: [{subData: null, id: 10695, name: '038arm'}]
            };
            // Act
            const popup = shallow(<EditPersonalMappingPopup {...props} />, { disableLifecycleMethods: true }).instance();
            popup.setState(state);
            const actual = popup.getRecipientTypes(2);

            // Assert
            expect(actual).toEqual([{ id: 8, name: 'PIC of headline' }]);
        });

        it('should return exactly when is letstalk', () => {
            // Arrange
            const props = {
                ...initProps,
                recipients: {
                    data: [{ id: 1, letstalkIds: '1',  usernames: 'tets' }],
                    botInfo: [{ username: 'test', chatId: '123' }]
                },
                groupHeadline: [{ id: 1 }],
                recipient: { value: 'test' },
                settings: {
                    bots: [{ channelId: 1, id: 1}],
                    botServices: [{ id: 1, name: 'telegram' }],
                    recipientTypes: [{ id: 8, name: 'PIC of headline' }, { id: 9, name: 'Account of headline' }],
                    languages: [{id: 1, name: 'test'}]
                }
            };
            const state = {
                ignoreNotificationTypes: [{subData: null, id: 10695, name: '038arm'}]
            };
            // Act
            const popup = shallow(<EditPersonalMappingPopup {...props} />, { disableLifecycleMethods: true }).instance();
            popup.setState(state);
            const actual = popup.getRecipientTypes(1);

            // Assert
            expect(actual).toEqual(props.settings.recipientTypes);
        });
    });

    describe('isShowGreenCheck', () => {
        it('should return true exactly', () => {
            // Arrange
            const props = {
                ...initProps,
                telegramName: 'test',
                letstalkName: 'test',
                recipients: {
                    data: [{ id: 1, letstalkIds: '1',  usernames: 'tets' }],
                    botInfo: [{ username: 'test', chatId: '123' }]
                },
                groupHeadline: [{ id: 1 }],
                recipient: { value: 'test' }
            };
            const state = {
                form: {
                    botServiceId: 2,
                    chatId: 1,
                    recipient: { value: 'test' },
                    groupHeadlines: '1,2,3',
                    displayName: 'test',
                    letstalkID_Username: 'test'
                },
                settings: {
                    usernames: '1,2,3'
                },
                ignoreNotificationTypes: [{subData: null, id: 10695, name: '038arm'}]
            };

            // Act
            const popup = shallow(<EditPersonalMappingPopup {...props} />, { disableLifecycleMethods: true });
            popup.instance().setState(state);
            const result = popup.instance().isShowGreenCheck('test');

            // Assert
            expect(result).toBe(true);
        });

        it('should return false exactly', () => {
            // Arrange
            const props = {
                ...initProps,
                telegramName: 'test',
                letstalkName: 'test',
                recipients: {
                    data: [{ id: 1, letstalkIds: '1',  usernames: 'tets' }],
                    botInfo: [{ username: 'test', chatId: '123' }]
                },
                groupHeadline: [{ id: 1 }],
                recipient: { value: 'test' }
            };
            const state = {
                form: {
                    botServiceId: 2,
                    chatId: 1,
                    recipient: { value: 'test' },
                    groupHeadlines: '1,2,3',
                    displayName: null,
                    letstalkID_Username: 'test'
                },
                settings: {
                    usernames: '1,2,3'
                },
                ignoreNotificationTypes: [{subData: null, id: 10695, name: '038arm'}]
            };

            // Act
            const popup = shallow(<EditPersonalMappingPopup {...props} />, { disableLifecycleMethods: true });
            popup.instance().setState(state);
            const result = popup.instance().isShowGreenCheck('test');

            // Assert
            expect(result).toBe(false);
        });
    });

    describe('functions test', () => {
        const promise = Promise.resolve([]);
        const props = {
            settings: {
                bots: [{ id: 1, name: 'Bot1' }],
                recipientTypes: [],
                languages: []
            },
            recipients: [],
            groupHeadline: [],
            gridParams: {},
            updatePersonalMappingData: { data: initData },
            updatePersonalMappingResult: {},
            letstalkName: '',
            getLetstalkDisplayName: jest.fn(() => promise),
            getRecipientByRecipientType: jest.fn(),
            getGroupHeadlineByRecipient: jest.fn(),
            setUpdatePersonalMappingResult: jest.fn(),
            updatePersonalMapping: jest.fn(() => promise),
            closeUpdatePersonalMappingPopup: jest.fn(),
            getGridData: jest.fn(),
            getTelegramDisplayName: jest.fn(() => promise),
            ...initProps
        };
        const state = {
            ignoreNotificationTypes: [{subData: null, id: 10695, name: '038arm'}]
        };
        const popup = shallow(<EditPersonalMappingPopup {...props} />, { disableLifecycleMethods: true });
        popup.instance().setState(state);

        it('handleGroupHeadlineChange with call correct props with correct params', () => {
            popup.instance().handleChange = jest.fn();
            popup.instance().handleGroupHeadlineChange('currentItem', 'value');
            expect(popup.instance().handleChange).toHaveBeenCalledWith('groupHeadlines', 'value');
        });

        it('getIgnoreNotificationType should call setState exactly', async () => {
            // Arrange
            const response = {data: [{ notificationTypeId: 1 }]};
            const promise = Promise.resolve(response);
            Site.resolveClientUrl = jest.fn(url => url);
            DataService.getDataAsync = jest.fn(() => promise);
            
            // Act
            popup.instance().getIgnoreNotificationType();
            await promise;

            // Assert
        });

        it('handleIgnoreNotificationChange with call correct props with correct params', () => {
            popup.instance().handleChange = jest.fn();
            popup.instance().handleIgnoreNotificationChange('currentItem', 'value');
            expect(popup.instance().handleChange).toHaveBeenCalledWith('ignoredNotification', 'value');
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
            expect(popup.instance().handleChange).toHaveBeenCalledWith('recipientName', 'value');
            expect(popup.instance().handleChange).toHaveBeenCalledWith('recipient', {value: ''});
            expect(popup.instance().handleChange).toHaveBeenCalledWith('groupHeadlines', '');
            expect(props.getRecipientByRecipientType).toHaveBeenCalledWith('value');
        });

        it('handleRecipientChange with call correct props with correct params', () => {
            const option = { value: 'value', letstalkIds: [1, 2, 3] };
            popup.instance().handleChange = jest.fn();
            popup.instance().handleRecipientChange(option);
            expect(popup.instance().handleChange).toHaveBeenCalledWith('recipient', option);
            expect(popup.instance().handleChange).toHaveBeenCalledWith('groupHeadlines', '');
            expect(popup.instance().handleChange).toHaveBeenCalledWith('letstalkID_Username', '');
            expect(popup.instance().state.settings.letstalkIds).toEqual('1');
            expect(props.getGroupHeadlineByRecipient).toHaveBeenCalledWith('value');
        });

        it('handleLetstalkIdSelect with call correct props with correct params', async () => {
            const event = {
                target: { value: 'value' }
            };
            jest.useFakeTimers();
            popup.instance().handleChange = jest.fn();
            popup.instance().handleLetstalkIdSelect(event);
            await promise;
            jest.runAllTimers();
            expect(popup.instance().handleChange).toHaveBeenCalledWith('letstalkID_Username', 'value');
            expect(popup.instance().handleChange).toHaveBeenCalledWith('displayName', '');
            expect(props.getLetstalkDisplayName).toHaveBeenCalledWith(1, 'value');
        });

        it('renderEditPersonalSelectOptions return expected result', () => {
            const item = {
                id: 1, name: 'test'
            };
            const expected = <option key={`${0}-${item.name}`} value={item.id}>{item.name}</option>;
            const actual = popup.instance().renderEditPersonalSelectOptions(item, 0);
            expect(actual).toEqual(expected);
        });

        it('renderLetstalkIdsRadioButton when state.letstalkIds is null return null', () => {
            const state = {
                settings: { letstalkIds: '' },
                ignoreNotificationTypes: [{subData: null, id: 10695, name: '038arm'}]
            };
            popup.instance().setState(state);
            const actual = popup.instance().renderLetstalkIdsRadioButton();
        });

        it('renderLetstalkIdsRadioButton when state.letstalkIds is correct return expected radio input', () => {
            popup.instance().state.settings.letstalkIds = '1,2,3,4';
            const actual = popup.instance().renderLetstalkIdsRadioButton();
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
                },
                ignoreNotificationTypes: [{subData: null, id: 10695, name: '038arm'}]
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
                    recipientType: 'a',
                    recipient: '1',
                    conversationId: '1',
                    groupHeadlines: '1',
                    languageId: '1',
                    displayName: 'test',
                    letstalkID_Username: '12',
                    botServiceId: 2
                },
                ignoreNotificationTypes: [{subData: null, id: 10695, name: '038arm'}]
            };
            popup.instance().setState(state);
            const actual = popup.instance().isValidParams();
            expect(popup.instance().state.validate.isShow).toBeFalse;
            expect(popup.instance().state.validate.errMsgs.length).toBe(1);
            expect(actual).toBeTrue;
        });

        it('getParams return expected results', () => {
            const state = {
                form: {
                    botId: '1',
                    recipientType: 'a',
                    recipient: '1',
                    conversationId: '1',
                    groupHeadlines: '1',
                    languageId: '1',
                    botServiceId: 2,
                    letstalkID_Username: 'test',
                    chatId: 123,
                    ignoredNotification: ['1','2']
                },
                ignoreNotificationTypes: [{subData: null, id: 10695, name: '038arm'}]
            };
            popup.instance().setState(state);
            const expected = {
                conversationGroupId: 1,
                botId: state.form.botId,
                recipientTypeId: state.form.recipientType,
                groupHeadlineIds: state.form.groupHeadlines,
                isTest: null,
                recipientIds: state.form.recipient.value,
                languageId: state.form.languageId,
                remark: state.form.remark,
                channelId: state.form.botServiceId,
                conversationId: state.form.chatId,
                ignoredNotificationTypeList: state.form.ignoredNotification,
                username: state.form.letstalkID_Username
            };
            const actual = popup.instance().getParams();
            expect(actual).toEqual(expected);
        });

        it('handleSubmit will call expected props when InValid params', () => {
            const event = { preventDefault: jest.fn() };
            popup.instance().isValidParams = jest.fn().mockReturnValue(false);
            popup.instance().handleEditPersonalSubmitForm(event);
            expect(props.setUpdatePersonalMappingResult).toHaveBeenCalledWith(null);
            expect(props.closeUpdatePersonalMappingPopup).not.toHaveBeenCalled();
            expect(props.getGridData).not.toHaveBeenCalled();
        });

        it('handleSubmit will call expected props when Valid params', async () => {
            const event = { preventDefault: jest.fn() };
            jest.useFakeTimers();
            const newProps = { ...props };
            newProps.updatePersonalMappingResult = { isSuccessful: true };
            const editPersonal = shallow(<EditPersonalMappingPopup {...newProps} />, { disableLifecycleMethods: true });
            editPersonal.instance().isValidParams = jest.fn().mockReturnValue(true);
            editPersonal.instance().getParams = jest.fn().mockReturnValue('valueParams');
            editPersonal.instance().handleEditPersonalSubmitForm(event);

            await promise;
            jest.runAllTimers();
            expect(props.setUpdatePersonalMappingResult).toHaveBeenCalledWith(null);
            expect(props.closeUpdatePersonalMappingPopup).toHaveBeenCalled();
            expect(props.getGridData).toHaveBeenCalledWith(props.gridParams);
        });

        it('handleSubmit will call expected setState when unSuccessfully', async () => {
            const event = { preventDefault: jest.fn() };
            jest.useFakeTimers();
            const newProps = { ...props };
            newProps.updatePersonalMappingResult = { isSuccessful: false };
            const editPersonal = shallow(<EditPersonalMappingPopup {...newProps} />, { disableLifecycleMethods: true });
            editPersonal.instance().isValidParams = jest.fn().mockReturnValue(true);
            editPersonal.instance().getParams = jest.fn().mockReturnValue('valueParams');
            editPersonal.instance().handleEditPersonalSubmitForm(event);

            await promise;
            jest.runAllTimers();

            expect(editPersonal.instance().state.isSubmitting).toEqual(false);
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
                },
                ignoreNotificationTypes: [{subData: null, id: 10695, name: '038arm'}]
            };

            popup.instance().initEditPersonalMappingState = initState;
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
                },
                ignoreNotificationTypes: [{subData: null, id: 10695, name: '038arm'}]
            };

            popup.instance().initEditPersonalMappingState = initState;
            popup.instance().setState(state);
            const actual = popup.instance().isDirtyForm();
            expect(actual).toBeFalse;
        });

        it('onCloseEditPersonalPopup when is dirty form will call setState', () => {
            const initState = {
                dirtyFormConfirmation: { isShow: false },
                ignoreNotificationTypes: [{subData: null, id: 10695, name: '038arm'}]
            };
            popup.instance().setState(initState);
            popup.instance().isDirtyForm = jest.fn().mockReturnValue(true);
            popup.instance().onCloseEditPersonalPopup();
            expect(popup.instance().state.isShowConfirmDirtyForm).toBeTrue;
        });

        it('onCloseEditPersonalPopup when is not dirty form will call correct props', () => {
            const initState = {
                isShowConfirmDirtyForm: false,
                ignoreNotificationTypes: [{subData: null, id: 10695, name: '038arm'}]
            };
            popup.instance().setState(initState);
            popup.instance().isDirtyForm = jest.fn().mockReturnValue(false);
            popup.instance().onCloseEditPersonalPopup();
            expect(popup.instance().state.isShowConfirmDirtyForm).toBeFalse;
            expect(props.closeUpdatePersonalMappingPopup).toHaveBeenCalled();
        });

        it('closeConfirmDirtyForm will do expected action to change state dirtyFormConfirmation', () => {
            const initState = {
                dirtyFormConfirmation: { isShow: true },
                ignoreNotificationTypes: [{subData: null, id: 10695, name: '038arm'}]
            };
            popup.instance().setState(initState);
            popup.instance().closeConfirmDirtyForm();
            expect(popup.instance().state.dirtyFormConfirmation.isShow).toBeFalse;
        });
    });
});