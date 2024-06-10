import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import toJson from 'enzyme-to-json';

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('componentDidMount', () => {
        it('should call getAllSettings', () => {
            // Arrange
            const props = {
                getRemarkTitles: jest.fn(),
                popupAdd: { show: false },
                popupEdit: { show: false },
                showHistory: { show: false },
                setIsSearchAll: jest.fn()
            };

            //Act
            shallow(<AppContainer {...props} />);

            // Assert
            expect(props.getRemarkTitles).toHaveBeenCalled();
        });
    });

    describe('handleCloseAddPopup ', () => {
        it('should call exactly functions', () => {
            // Arrange
            const props = {
                popupAdd: { show: true },
                popupEdit: { show: false },
                showHistory: { show: false },
                getRemarkTitles: jest.fn(),
                setOpenCreatePopup: jest.fn(),
                setCreateResult: jest.fn(),
                setValidateResult: jest.fn(),
                setIsSearchAll: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props}/>);
            container.instance().handleCloseAddPopup();
           
            // Assert
            expect(props.setOpenCreatePopup).toHaveBeenCalledWith({ show: false });
            expect(props.setCreateResult).toHaveBeenCalledWith(null);
            expect(props.setValidateResult).toHaveBeenCalledWith(null);
        });
    });

    describe('handleCreateSuccess  ', () => {
        it('should call exactly functions', () => {
            // Arrange
            const props = {
                popupAdd: { show: true },
                popupEdit: { show: false },
                showHistory: { show: false },
                getRemarkTitles: jest.fn(),
                getNewRemarks: jest.fn(),
                gridParams: {pageIndex: 1, pageSize: 100, username: '', isGuest: false},
                setIsSearchAll: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props}/>);
            container.instance().handleCloseAddPopup = jest.fn();
            container.instance().handleCreateSuccess();
           
            // Assert
            expect(container.instance().handleCloseAddPopup).toHaveBeenCalled();
            expect(props.getNewRemarks).toHaveBeenCalledWith(props.gridParams);
        });
    });

    describe('handleEditSuccess', () => {
        it('should call exactly functions', () => {
            // Arrange
            const props = {
                popupAdd: { show: false },
                popupEdit: { show: true },
                showHistory: { show: false },
                getRemarkTitles: jest.fn(),
                getNewRemarks: jest.fn(),
                gridParams: {pageIndex: 1, pageSize: 100, username: '', isGuest: false},
                setIsSearchAll: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props}/>);
            container.instance().handleCloseEditPopup = jest.fn();
            container.instance().handleEditSuccess();
           
            // Assert
            expect(container.instance().handleCloseEditPopup).toHaveBeenCalled();
            expect(props.getNewRemarks).toHaveBeenCalledWith(props.gridParams);
        });
    });

    describe('handleCloseEditPopup', () => {
        it('should call exactly functions', () => {
            // Arrange
            const props = {
                popupAdd: { show: false },
                popupEdit: { show: true },
                showHistory: { show: false },
                getRemarkTitles: jest.fn(),
                setOpenEditPopup: jest.fn(),
                setEditResult: jest.fn(),
                getNewRemarks: jest.fn(),
                setIsSearchAll: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props}/>);
            container.instance().handleCloseEditPopup();
           
            // Assert
            expect(props.setOpenEditPopup).toHaveBeenCalledWith({ show: false, data: null, isViewHistory: false });
            expect(props.setEditResult).toHaveBeenCalledWith(null);
        });
    });

    describe('render', () => {
        it('should render correctly', () => {
            // Arrange
            const props = {
                popupAdd: { show: true },
                popupEdit: { show: true },
                showHistory: { show: true },
                getRemarkTitles: jest.fn(),
                remarkTitles :  [{id: 0, name: null, settingId: 70000, settingName: "RemarkTitles", settingValue: "Internal Request"}],
                setIsSearchAll: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props} />);

            // Assert
            expect(toJson(container)).toMatchSnapshot();
        });

        it('should render null', () => {
            // Arrange
            const props = {
                popupAdd: { show: true },
                popupEdit: { show: true },
                showHistory: { show: true },
                getRemarkTitles: jest.fn(),
                remarkTitles :  null,
                setIsSearchAll: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props} />);

            // Assert
            expect(container).toEqual({});
        });
    });
});