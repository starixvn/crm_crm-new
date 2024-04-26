import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import LangHelper from '@jsroot/common/langHelper';

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        id: 1,
        customerInfo: {
            titleId: 0,
        },
        setActiveTab: jest.fn(),
        setErrors: jest.fn(),
        getAllSettings: jest.fn(),
        getSettingPicCommunicationTools: jest.fn(),
        getCustomerById: jest.fn()           
    };
    describe('componentDidMount', () => {
        it('should call required actions and set state correctly', async () => {
            // Arrange
            const setActiveTabMock = jest.fn();
            const setErrorsMock = jest.fn();
            const getAllSettingsMock = jest.fn().mockResolvedValue();
            const getSettingPicCommunicationToolsMock = jest.fn().mockResolvedValue();
            const getCustomerByIdMock = jest.fn().mockResolvedValue();
        
            const initialProps = {
                setActiveTab: setActiveTabMock,
                setErrors: setErrorsMock,
                getAllSettings: getAllSettingsMock,
                getSettingPicCommunicationTools: getSettingPicCommunicationToolsMock,
                getCustomerById: getCustomerByIdMock,
                id: 'customerId',
                customerInfo: { }
            };
        
            // Action
            const wrapper = shallow(<AppContainer {...initialProps} />);
            await wrapper.instance().componentDidMount();
        
            // Assert
            expect(setActiveTabMock).toHaveBeenCalledWith({
                currentTab: 'HeadlineCommunicationInfo',
                nextTab: null
            });
            expect(setErrorsMock).toHaveBeenCalledWith(null);
            expect(getAllSettingsMock).toHaveBeenCalled();
            expect(getSettingPicCommunicationToolsMock).toHaveBeenCalled();
            expect(getCustomerByIdMock).toHaveBeenCalledWith({ customerId: initialProps.id });
        });
    });

    describe('render', () => {
        it('should do reset store', () => {
            // Arrange
            const container = shallow(<AppContainer {...initProps} />);

            // Action
            container.instance().componentDidMount();

            // Assert
            expect(initProps.setActiveTab).toHaveBeenCalled();
            expect(initProps.setErrors).toHaveBeenCalled();
            expect(initProps.getAllSettings).toHaveBeenCalled();
        });

        it('renders correctly when all required initProps are provided', () => {
            // Arrange
            const props = {
                ...initProps,
                allSettings: {},
                customerInfo:{ isGroupHeadLine: false },
                errors : {},
                activeTab : { currentTab: 'someTab' },
                showConfirmUnSaved: true,
                setActiveTab: jest.fn()
            }

            // Action
            const wrapper = shallow(<AppContainer {...props}/>);
            // Assert
            expect(wrapper).toMatchSnapshot();
        });
        
        it('renders null when any required prop is missing', () => {
            // Action
            const wrapper = shallow(<AppContainer {...initProps}/>);
            // Assert
            expect(wrapper.isEmptyRender()).toBe(true);
        });
        
        it('renders error alert when errors prop is present', () => {
            // Arrange
            const props = {
                ...initProps,
                allSettings: {},
                customerInfo:{ isGroupHeadLine: false },
                errors : {error1: 'Error message'},
                activeTab : { currentTab: 'someTab' },
                showConfirmUnSaved: true
            }

            // Action
            const wrapper = shallow(<AppContainer {...props}/>);

            // Assert
            expect(wrapper.find('Alert').exists()).toBe(true);
        });
    });

    describe('handleCloseConfirm', () => {
        it('should update showConfirmUnSaved and setActiveTab when called', () => {
            // Arrange
            const setShowConfirmUnSavedMock = jest.fn();
            const setActiveTabMock = jest.fn();
            const props = {
                ...initProps,
                setShowConfirmUnSaved: setShowConfirmUnSavedMock,
                setActiveTab: setActiveTabMock,
                activeTab: {
                    currentTab: 'currentTab',
                    nextTab: 'nextTab'
                }
            };
        
            // Action
            const wrapper = shallow(<AppContainer {...props} />);
            wrapper.instance().handleCloseConfirm();
        
            // Assert
            expect(setShowConfirmUnSavedMock).toHaveBeenCalledWith(false);
            expect(setActiveTabMock).toHaveBeenCalledWith({
                currentTab: props.activeTab.currentTab,
                nextTab: null
            });
        });
    });

    describe('handleClosePopup', () => {
        it('should update setActiveTab, setShowConfirmUnSaved, and setErrors when called', () => {
            // Arrange
            const setActiveTabMock = jest.fn();
            const setShowConfirmUnSavedMock = jest.fn();
            const setErrorsMock = jest.fn();
        
            const props = {
                ...initProps,
                setActiveTab: setActiveTabMock,
                setShowConfirmUnSaved: setShowConfirmUnSavedMock,
                setErrors: setErrorsMock,
                activeTab: {
                    currentTab: 'currentTab',
                    nextTab: 'nextTab'
                }
            };
        
            // Action
            const wrapper = shallow(<AppContainer {...props} />);
            wrapper.instance().handleClosePopup();
        
            // Assert
            expect(setActiveTabMock).toHaveBeenCalledWith({
                currentTab: props.activeTab.nextTab,
                nextTab: null
            });
            expect(setShowConfirmUnSavedMock).toHaveBeenCalledWith(false);
            expect(setErrorsMock).toHaveBeenCalledWith(null);
        });
    });

    describe('renderHeadlineAccount', () => {
        it('should render AccountInfo component and tabs with correct classNames', () => {
            // Arrange
            const props = {
                ...initProps,
                activeTab: { currentTab: LangHelper.getResource('HeadlineCommunicationInfo') },
                isShowAccountInfo: true,
                customerInfo:{ isGroupHeadLine: true },
                isShowAccountantPIC: true,
            };
            const state = { updateHeadlineInfoPolicy: 1 };
        
            // Action
            const wrapper = shallow(<AppContainer {...props} />);
            wrapper.setState(state);
        
            const renderedContent = wrapper.instance().renderHeadlineAccount();

            // Assert
            const accountInfo = renderedContent.props.children[0];
            const accountantPIC = renderedContent.props.children[1];
            expect(accountInfo.type.displayName).toBe('Connect(AccountInfo)');
            expect(accountInfo.props.customerId).toBe(1);
            expect(accountantPIC.type.displayName).toBe('Connect(AccountantPIC)');
            expect(accountantPIC.props.customerId).toBe(1);
        });
    });

    describe('handleTabClick', () => {
        it('should update setActiveTab with the nextTab name when called', () => {
            // Arrange
            const setActiveTabMock = jest.fn();
            const props = {
                ...initProps,
                setActiveTab: setActiveTabMock,
                activeTab: {
                    currentTab: 'currentTab',
                    nextTab: 'nextTab'
                }
            };
        
            // Action
            const wrapper = shallow(<AppContainer {...props} />);
            wrapper.instance().handleTabClick('newTabName');
        
            // Assert
            expect(setActiveTabMock).toHaveBeenCalledWith({
                currentTab: props.activeTab.currentTab,
                nextTab: 'newTabName'
            });
        });
    });
});