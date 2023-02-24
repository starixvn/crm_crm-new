import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import { toast } from 'react-toastify';
import LangHelper from '@jsroot/common/langHelper';
import toJson from 'enzyme-to-json';
import * as shareScripts from '@jsroot/common/shareScripts';

describe('AppContainer', () => {
    beforeAll(() =>{
        jest.useFakeTimers();
        LangHelper.getResource = jest.fn((key) => key);
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('componentDidMount', () => {
        it('should call exact props get data', () => {
            // Arrange
            const promise = Promise.resolve(2);
            shareScripts.getPermission = jest.fn(() => promise);
            //Act
            shallow(<AppContainer />);

            // Assert
            expect(shareScripts.getPermission).toHaveBeenCalled();
            expect(document.title).toEqual(LangHelper.getResource('Announcement'));
        });
    });

    describe('componentWillUnmount', () => {
        it('should call exact props get data', () => {
            // Arrange
            const props = {
                setGridData: jest.fn(),
                resetState: jest.fn()
            };
            //Act
            const appContainer = shallow(<AppContainer {...props}/>).instance();
            appContainer.componentWillUnmount();
            // Assert
            expect(props.setGridData).toHaveBeenCalled();
            expect(props.resetState).toHaveBeenCalled();
        });
    });

    describe('handleCloseNewAnnouncement', () => {
        it('should call exact function', () => {
            // Arrange
            const props = {
                setOpenNewAnnouncementPopup: jest.fn(),
                setIsRefresh: jest.fn(),
                setCreateAnnouncement: jest.fn()
            };
            const appContainer = shallow(<AppContainer {...props} />).instance();

            //Act
            appContainer.handleCloseNewAnnouncement();

            // Assert
            expect(props.setOpenNewAnnouncementPopup).toHaveBeenCalledWith({ show: false });
            expect(props.setIsRefresh).toHaveBeenCalledWith(true);
            expect(props.setCreateAnnouncement).toHaveBeenCalledWith(null);
        });
    });

    describe('handleCreateSuccessAnnouncement', () => {
        it('should call exact function', () => {
            // Arrange
            const props = {
                setOpenNewAnnouncementPopup: jest.fn(),
                getGridData: jest.fn(),
                gridParams: {}
            };
            const appContainer = shallow(<AppContainer {...props} />).instance();
            appContainer.handleCloseNewAnnouncement = jest.fn();
            //Act
            appContainer.handleCreateSuccessAnnouncement();

            // Assert
            expect(props.getGridData).toHaveBeenCalledWith({});
            expect(appContainer.handleCloseNewAnnouncement).toHaveBeenCalled();
        });
    });

    describe('handleCloseActionAnnouncement', () => {
        it('should call exact function', () => {
            // Arrange
            const props = {
                setOpenActionAnnouncementPopup: jest.fn(),
                setIsRefresh: jest.fn(),
                setEditAnnouncement: jest.fn(),
                setCreateAnnouncement: jest.fn()
            };
            const appContainer = shallow(<AppContainer {...props} />).instance();

            //Act
            appContainer.handleCloseActionAnnouncement();

            // Assert
            expect(props.setOpenActionAnnouncementPopup).toHaveBeenCalledWith({ show: false });
            expect(props.setIsRefresh).toHaveBeenCalledWith(true);
            expect(props.setCreateAnnouncement).toHaveBeenCalledWith(null);
            expect(props.setEditAnnouncement).toHaveBeenCalledWith(null);
        });
    });

    describe('handleActionSuccessAnnouncement', () => {
        it('should call exact function', () => {
            // Arrange
            const props = {
                setOpenNewAnnouncementPopup: jest.fn(),
                getGridData: jest.fn(),
                gridParams: {}
            };
            const appContainer = shallow(<AppContainer {...props} />).instance();
            appContainer.handleCloseActionAnnouncement = jest.fn();
            //Act
            appContainer.handleActionSuccessAnnouncement();

            // Assert
            expect(props.getGridData).toHaveBeenCalledWith({});
            expect(appContainer.handleCloseActionAnnouncement).toHaveBeenCalled();
        });
    });

    describe('handleCloseViewDetail', () => {
        it('should call exact function', () => {
            // Arrange
            const props = {
                setViewDetailPopup: jest.fn(),
                setIsRefresh: jest.fn()
            };
            const appContainer = shallow(<AppContainer {...props} />).instance();
            //Act
            appContainer.handleCloseViewDetail();

            // Assert
            expect(props.setViewDetailPopup).toHaveBeenCalledWith({ show: false });
            expect(props.setIsRefresh).toHaveBeenCalledWith(true);
        });
    });

    describe('handleCloseContent', () => {
        it('should call exact function', () => {
            // Arrange
            const props = {
                setContentPopup: jest.fn(),
                setIsRefresh: jest.fn()
            };
            const appContainer = shallow(<AppContainer {...props} />).instance();
            //Act
            appContainer.handleCloseContent();

            // Assert
            expect(props.setContentPopup).toHaveBeenCalledWith({ show: false });
            expect(props.setIsRefresh).toHaveBeenCalledWith(true);
        });
    });

    describe('handleCancel', () => {
        it('should call exact function when function return successful', async () => {
            // Arrange
            const promise = Promise.resolve({isSuccessful: true});
            const props = {
                setContentPopup: jest.fn(),
                setIsRefresh: jest.fn(),
                cancelAnnouncementId: jest.fn(() => promise),
                getGridData: jest.fn(),
                gridParams: {}
            };
            toast.success = jest.fn();
            const appContainer = shallow(<AppContainer {...props} />).instance();
            appContainer.handleCloseCancelPopup = jest.fn();
            //Act
            await appContainer.handleCancel(1);
            await promise;
            jest.runAllTimers();

            // Assert
            expect(toast.success).toHaveBeenCalledWith(LangHelper.getResource('CancelAnnouncementSuccessfully'));
            expect(props.getGridData).toHaveBeenCalledWith({});
        });

        it('should call exact function when function return is not successful', async () => {
            // Arrange
            const promise = Promise.resolve({isSuccessful: false, message:'error'});
            const props = {
                setContentPopup: jest.fn(),
                setIsRefresh: jest.fn(),
                cancelAnnouncementId: jest.fn(() => promise),
                getGridData: jest.fn(),
                gridParams: {}
            };
            toast.error = jest.fn();
            const appContainer = shallow(<AppContainer {...props} />).instance();
            appContainer.handleCloseCancelPopup = jest.fn();
            //Act
            await appContainer.handleCancel(1);
            await promise;
            jest.runAllTimers();

            // Assert
            expect(toast.error).toHaveBeenCalledWith('error');
        });
    });

    describe('handleCloseCancelPopup', () => {
        it('should call exact function', () => {
            // Arrange
            const props = {
                setOpenCancelAnnouncementPopup: jest.fn(),
                setIsRefresh: jest.fn()
            };
            const appContainer = shallow(<AppContainer {...props} />).instance();
            //Act
            appContainer.handleCloseCancelPopup();

            // Assert
            expect(props.setOpenCancelAnnouncementPopup).toHaveBeenCalledWith({show: false, announcementId: ''});
            expect(props.setIsRefresh).toHaveBeenCalledWith(true);
        });
    });


    describe('render', () => {
        it('should render correctly', () => {
            // Arrange
            const state = {
                policy: 2
            };
            const props = {
                newAnnouncementPopup: {show: false},
                contentPopup: {show: false},
                actionAnnouncementPopup: {show: false},
                cancelAnnouncementPopup: {show: false}
            };
            // Act
            const container = shallow(<AppContainer {...props} />);
            container.instance().setState(state);

            // Assert
            expect(toJson(container)).toMatchSnapshot();
        });

        it('should render null', () => {
            // Arrange
            const state = {
                policy: null
            };
            // Act
            const container = shallow(<AppContainer />);
            container.instance().setState(state);
            const actual = container.instance().render();
            // Assert
            expect(actual).toEqual(null);
        });
    });
});
