import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import * as shareScripts from '@jsroot/common/shareScripts';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import LangHelper from '@jsroot/common/langHelper';
import { toast } from 'react-toastify';
import toJson from 'enzyme-to-json';

describe('AppContainer', () => {
    const promise = Promise.resolve({});
    beforeAll(() =>{
        Site.blockUI = jest.fn();
        Site.unblockUI = jest.fn();
        Site.handleAxiosError = jest.fn();
        Site.resolveClientUrl = jest.fn((url) => url);
        LangHelper.getResource = jest.fn((key) => key);
        shareScripts.getPermission = jest.fn(() => promise);
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    it('should have correct snapshots', () => {
        //Act
        const container = shallow(<AppContainer />);
        // Assert
        expect(toJson(container)).toMatchSnapshot();
    });

    describe('componentDidMount', () => {
        it('should call exactly props function', async () => {
            // Arrange
            // Act
            const container = shallow(<AppContainer/>).instance();
            container.handleGetSMAPersonalMessage = jest.fn();

            await container.componentDidMount();
            await promise;

            // Assert
            expect(container.state.policy).toEqual({});
            expect(container.handleGetSMAPersonalMessage).toHaveBeenCalled();
        });
    });

    describe('handleGetSMAPersonalMessage', () => {
        it('should expect return exact data when call', async () => {
            // Arrange
            const data = {data: [{content_ch: '', content_en: ''}], totalItems: 1};
            const response = Promise.resolve({data: data});
            DataService.postDataAsync = jest.fn(() => response);
            // Act
            const container = shallow(<AppContainer/>).instance();
            container.handleGetSMAPersonalMessage = jest.fn();

            await container.handleGetSMAPersonalMessage();
            await promise;

            // Assert
            expect(container.state.gridData).toEqual(data);
        });
    });

    describe('handleSetGridParams', () => {
        it('should call setState', () => {
            // Arrange
            // Act
            const container = shallow(<AppContainer/>).instance();

            container.handleSetGridParams({});

            // Assert
            expect(container.state.gridParams).toEqual({});
        });
    });

    describe('handleOpenCreatePopup', () => {
        it('should call setState', () => {
            // Arrange
            // Act
            const container = shallow(<AppContainer/>).instance();

            container.handleOpenCreatePopup();

            // Assert
            expect(container.state.createMessagePopUp).toEqual({isShow: true});
        });
    });

    describe('handleCloseNewMessage', () => {
        it('should call setState', () => {
            // Arrange
            // Act
            const container = shallow(<AppContainer/>).instance();

            container.handleCloseNewMessage();

            // Assert
            expect(container.state.createMessagePopUp).toEqual({isShow: false});
        });
    });

    describe('setDeletePopup', () => {
        it('should call setState', () => {
            // Arrange
            // Act
            const container = shallow(<AppContainer/>).instance();

            container.setDeletePopup(1);

            // Assert
            expect(container.state.deleteMessagePopUp).toEqual({isShow: true, id: 1});
        });
    });

    describe('handleCloseDeletePopup', () => {
        it('should call setState', () => {
            // Arrange
            // Act
            const container = shallow(<AppContainer/>).instance();

            container.handleCloseDeletePopup(1);

            // Assert
            expect(container.state.deleteMessagePopUp).toEqual({isShow: false, id: null});
        });
    });

    describe('handleDelete', () => {
        it('should call exact function when call api is successfully', async() => {
             // Arrange
             const state = {gridParams: {}};
             const data = {isSuccessful: true};
             const response = Promise.resolve({data: data});
             DataService.postDataAsync = jest.fn(() => response);
             toast.success = jest.fn();
             // Act
             const container = shallow(<AppContainer/>).instance();
             container.setState(state);
             container.handleGetSMAPersonalMessage = jest.fn();
             container.handleCloseDeletePopup = jest.fn();
 
             await container.handleDelete();
             await promise;
 
             // Assert
            expect(toast.success).toHaveBeenCalledWith(LangHelper.getResource('DeleteSMAPersonalMessageSuccessfully'));
            expect(container.handleCloseDeletePopup).toHaveBeenCalled();
        });

        it('should call exact function when call api is unsuccessfully', async() => {
            // Arrange
            const state = {gridParams: {}};
            const data = {isSuccessful: false, message: 'delete fail'};
            const response = Promise.resolve({data: data});
            DataService.postDataAsync = jest.fn(() => response);
            toast.error = jest.fn();
            // Act
            const container = shallow(<AppContainer/>).instance();
            container.setState(state);
            container.handleGetSMAPersonalMessage = jest.fn();
            container.handleCloseDeletePopup = jest.fn();

            await container.handleDelete();
            await promise;

            // Assert
           expect(toast.error).toHaveBeenCalledWith('delete fail');
           expect(container.handleCloseDeletePopup).toHaveBeenCalled();
       });
    });

    describe('handleCloseNewMessage', () => {
        it('should call exact function', async () => {
            // Arrange
            const state = {gridParams: {}};
            // Act
            const container = shallow(<AppContainer/>).instance();
            container.setState(state);

            container.handleCloseNewMessage = jest.fn();
            container.handleGetSMAPersonalMessage = jest.fn();
            await container.handleSuccessNewMessage();

            // Assert
            expect(container.handleCloseNewMessage).toHaveBeenCalled();
            expect(container.handleGetSMAPersonalMessage).toHaveBeenCalledWith({});
        });
    });
});