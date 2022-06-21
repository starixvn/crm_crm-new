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

describe('EditPersonalMappingPopup', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn((key) => key);
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initData = {
        conversationGroupId: 1,
        botId: 1,
        name: 'Name',
        conversationId: 'aaa',
        recipientType: 1,
        headlines: [{ id: 1, name: 'headline' }],
        recipients: [{ id: 1, name: 'recipient' }],
        letstalkId: '12',
        languageId: 1,
        remark: '123'
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
        const wrapper = shallow(<EditPersonalMappingPopupWrapper store={store} />);

        // Assert
        it('component renders correctly', () => {
            const grid = shallow(<EditPersonalMappingPopupWrapper store={store} />);
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
            letstalkName: '',
            getRecipientByRecipientType: jest.fn(),
            getGroupHeadlineByRecipient: jest.fn(),
            setUpdatePersonalMappingResult: jest.fn(),
            updatePersonalMapping: jest.fn(),
            closeUpdatePersonalMappingPopup: jest.fn(),
            getGridData: jest.fn()
        };

        it('handleChange runs correctly', () => {
            // Arrange
            const value = 'value';

            const popup = shallow(<EditPersonalMappingPopup {...props} />);

            // Action
            popup.instance().handleChange('chatType', value);

            // Assert
            expect(popup.instance().state.form.chatType).toBe(value);
        });

        it('handle functions should call correct functions with correct params when event triggered', async () => {
            const event = {
                target: { value: 'value' },
                preventDefault: jest.fn()
            };
            const promise = Promise.resolve([]);

            const initProps = { ...props, getLetstalkDisplayName: jest.fn(() => promise) };

            const popup = shallow(<EditPersonalMappingPopup {...initProps} />);
            popup.instance().handleGroupHeadlineChange = jest.fn();
            popup.instance().handleRecipientTypeChange = jest.fn();
            popup.instance().handleRecipientChange = jest.fn();
            popup.instance().handleLetstalkIdSelect = jest.fn();
            popup.instance().handleChange = jest.fn();
            popup.instance().onCloseEditPersonalPopup = jest.fn();
            popup.instance().handleEditPersonalSubmitForm = jest.fn();

            const test = shallow(popup.instance().renderForm());

            test.find(Form.Group).at(0).find(Form.Control).at(0).simulate('change', event);
            expect(popup.instance().handleChange).toHaveBeenCalledWith('botId', 'value');

            test.find(Form.Group).at(3).find(Form.Control).at(0).simulate('change', event);
            expect(popup.instance().handleRecipientTypeChange).toHaveBeenCalledWith(event);

            // expect(test.find(Form.Group).at(4).find(SelectWithSearch).length).toBe(1);
            expect(popup.find(Form.Group).at(6).find(MultipleSelect).length).toBe(1);

            test.find(Form.Group).at(7).find(Form.Control).at(0).simulate('change', event);
            expect(popup.instance().handleChange).toHaveBeenCalledWith('languageId', 'value');

            test.find(Form.Group).at(8).find(Form.Control).at(0).simulate('change', event);
            expect(popup.instance().handleChange).toHaveBeenCalledWith('remark', 'value');
        });

        it('render correct', () => {
            const state = {
                isShowConfirmDirtyForm: true
            };
            const popup = shallow(<EditPersonalMappingPopup {...props} />);
            popup.instance().setState(state);

            expect(popup.find(ConfirmPopup).length).toBe(1);
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
            getGridData: jest.fn()
        };
        const popup = shallow(<EditPersonalMappingPopup {...props} />);

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
            expect(popup.instance().handleChange).toHaveBeenCalledWith('recipient', { value: '' });
            expect(popup.instance().handleChange).toHaveBeenCalledWith('groupHeadlines', '');
            expect(popup.instance().handleChange).toHaveBeenCalledWith('conversationId', '');
            expect(popup.instance().handleChange).toHaveBeenCalledWith('name', '');
            expect(props.getRecipientByRecipientType).toHaveBeenCalledWith('value');
        });

        it('handleRecipientChange with call correct props with correct params', () => {
            const option = { value: 'value', letstalkIds: [1, 2, 3] };
            popup.instance().handleChange = jest.fn();
            popup.instance().handleRecipientChange(option);
            expect(popup.instance().handleChange).toHaveBeenCalledWith('recipient', option);
            expect(popup.instance().handleChange).toHaveBeenCalledWith('groupHeadlines', '');
            expect(popup.instance().handleChange).toHaveBeenCalledWith('conversationId', '');
            expect(popup.instance().handleChange).toHaveBeenCalledWith('name', '');
            expect(popup.instance().state.settings.letstalkIds).toEqual('');
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
            expect(popup.instance().handleChange).toHaveBeenCalledWith('conversationId', 'value');
            expect(props.getLetstalkDisplayName).toHaveBeenCalledWith(1, 'value');
            expect(popup.instance().handleChange).toHaveBeenCalledWith('name', props.letstalkName);
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
                settings: { letstalkIds: '' }
            };
            popup.instance().setState(state);
            const actual = popup.instance().renderLetstalkIdsRadioButton();
            expect(actual).toBe(null);
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
                }
            };
            popup.instance().setState(state);
            const actual = popup.instance().isValidParams();
            expect(popup.instance().state.validate.isShow).toBeTrue;
            expect(popup.instance().state.validate.errMsgs.length).toBe(6);
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
                    recipientType: 'a',
                    recipient: '1',
                    conversationId: '1',
                    groupHeadlines: '1',
                    languageId: '1'
                }
            };
            popup.instance().setState(state);
            const expected = {
                conversationGroupId: 1,
                botId: state.form.botId,
                recipientTypeId: state.form.recipientType,
                letstalkId: state.form.conversationId,
                groupHeadlineIds: state.form.groupHeadlines,
                isTest: null,
                recipientIds: state.form.recipient.value,
                languageId: state.form.languageId,
                remark: state.form.remark
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
            const editPersonal = shallow(<EditPersonalMappingPopup {...newProps} />);
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
            const editPersonal = shallow(<EditPersonalMappingPopup {...newProps} />);
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
                }
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
                }
            };

            popup.instance().initEditPersonalMappingState = initState;
            popup.instance().setState(state);
            const actual = popup.instance().isDirtyForm();
            expect(actual).toBeFalse;
        });

        it('onCloseEditPersonalPopup when is dirty form will call setState', () => {
            const initState = {
                dirtyFormConfirmation: { isShow: false }
            };
            popup.instance().setState(initState);
            popup.instance().isDirtyForm = jest.fn().mockReturnValue(true);
            popup.instance().onCloseEditPersonalPopup();
            expect(popup.instance().state.isShowConfirmDirtyForm).toBeTrue;
        });

        it('onCloseEditPersonalPopup when is not dirty form will call correct props', () => {
            const initState = {
                isShowConfirmDirtyForm: false
            };
            popup.instance().setState(initState);
            popup.instance().isDirtyForm = jest.fn().mockReturnValue(false);
            popup.instance().onCloseEditPersonalPopup();
            expect(popup.instance().state.isShowConfirmDirtyForm).toBeFalse;
            expect(props.closeUpdatePersonalMappingPopup).toHaveBeenCalled();
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