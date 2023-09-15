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

    const filterParams = {
        announcementId: 1,
        fromDate: '2023-01-01',
        toDate: '2023-12-31',
        title: 'test',
        title: 'Sample Title',
        status: 'Active',
        pageIndex: 1,
        pageSize: 10
    };

    describe('componentDidMount', () => {
        it('should call exact props get data when have filterParams', () => {
            // Arrange
            const props = {
                isLoadGrid: true,
                filterParams: filterParams,
                setGridParams: jest.fn(),
                getGridData: jest.fn(),
                setRedirectActionParams: jest.fn()
            };
            const promise = Promise.resolve(2);
            shareScripts.getPermission = jest.fn(() => promise);
            shareScripts.getFilterParams = jest.fn();
            //Act
            shallow(<AppContainer {...props}/>);

            // Assert
            expect(shareScripts.getPermission).toHaveBeenCalled();
            expect(props.setGridParams).toHaveBeenCalled();
            expect(props.getGridData).toHaveBeenCalled();
            expect(props.setRedirectActionParams).toHaveBeenCalled();
            expect(document.title).toEqual(LangHelper.getResource('Announcement'));
        });

        
        it('should call exact props get data when not have filterParams', () => {
            // Arrange
            const props = {
                isLoadGrid: true,
                filterParams: null,
                gridParams: filterParams,
                setGridParams: jest.fn(),
                getGridData: jest.fn(),
                setRedirectActionParams: jest.fn()
            };
            const promise = Promise.resolve(2);
            shareScripts.getPermission = jest.fn(() => promise);
            shareScripts.getFilterParams = jest.fn();
            //Act
            shallow(<AppContainer {...props}/>);

            // Assert
            expect(shareScripts.getPermission).toHaveBeenCalled();
            expect(props.getGridData).toHaveBeenCalled();
            expect(document.title).toEqual(LangHelper.getResource('Announcement'));
        });
    });

    describe('getFilterParams', () => {
        it('should return filter params when isAction is false', () => {
            // Arrange
            const isAction = false;
        
            const appContainer = shallow(<AppContainer />, { disableLifecycleMethods: true });
        
            // Act
            const result = appContainer.instance().getFilterParams(filterParams, isAction);
        
            // Assert
            expect(result).toEqual({
                announcementId: 1,
                fromDate: null,
                toDate: null,
                title: 'Sample Title',
                status: 'Active',
                pageIndex: 1,
                pageSize: 10
            });
        });

        it('should return filter params when isAction is true', () => {
            const cloneFilterParams = {
                ...filterParams,
                announcementId: null
            };
            const isAction = true;
        
            const appContainer = shallow(<AppContainer />, { disableLifecycleMethods: true });
        
            // Call the getFilterParams function
            const result = appContainer.instance().getFilterParams(cloneFilterParams, isAction);
        
            // Assert the result matches the expected output
            expect(result).toEqual({
                announcementId: null,
                fromDate: '2023-01-01',
                toDate: '2023-12-31',
                title: 'Sample Title',
                status: 'Active',
                pageIndex: 1,
                pageSize: 10,
            });
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
            const appContainer = shallow(<AppContainer {...props}/>, { disableLifecycleMethods: true }).instance();
            appContainer.componentWillUnmount();
            // Assert
            expect(props.setGridData).toHaveBeenCalled();
            expect(props.resetState).toHaveBeenCalled();
        });
    });

    describe('handleCloseContent', () => {
        it('should call exact function', () => {
            // Arrange
            const props = {
                setContentPopup: jest.fn(),
                setIsRefresh: jest.fn()
            };
            const appContainer = shallow(<AppContainer {...props} />, { disableLifecycleMethods: true }).instance();
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
            const appContainer = shallow(<AppContainer {...props} />, { disableLifecycleMethods: true }).instance();
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
            const appContainer = shallow(<AppContainer {...props} />, { disableLifecycleMethods: true }).instance();
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
            const appContainer = shallow(<AppContainer {...props} />, { disableLifecycleMethods: true }).instance();
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
            const container = shallow(<AppContainer {...props} />, { disableLifecycleMethods: true });
            container.instance().setState(state);

            // Assert
            expect(toJson(container)).toMatchSnapshot();
        });

        it('should render null', () => {
            // Arrange
            const state = {
                policy: null
            };
            const props = {
                newAnnouncementPopup: {show: false},
                contentPopup: {show: false},
                actionAnnouncementPopup: {show: false},
                cancelAnnouncementPopup: {show: false}
            };
            // Act
            const container = shallow(<AppContainer {...props}/>, { disableLifecycleMethods: true });
            container.instance().setState(state);
            const actual = container.instance().render();
            // Assert
            expect(actual).toEqual(null);
        });
    });
});