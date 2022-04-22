import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import Filter from '../Filter';
import DataGrid from '../DataGrid';
import NewRemark from '../NewRemark';
import EditRemark from '../EditRemark';
import History from '../History';

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
                showHistory: { show: false }
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
                setInputAddUsername: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props}/>);
            container.instance().handleCloseAddPopup();
           
            // Assert
            expect(props.setOpenCreatePopup).toHaveBeenCalledWith({ show: false });
            expect(props.setCreateResult).toHaveBeenCalledWith(null);
            expect(props.setValidateResult).toHaveBeenCalledWith({isSuccessful: false});
            expect(props.setInputAddUsername).toHaveBeenCalledWith('');
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
                gridParams: {pageIndex: 1, pageSize: 100, username: '', isGuest: false}
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
                gridParams: {pageIndex: 1, pageSize: 100, username: '', isGuest: false}
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
                getNewRemarks: jest.fn()
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
                remarkTitles :  [{id: 0, name: null, settingId: 70000, settingName: "RemarkTitles", settingValue: "Internal Request"}]
            };

            // Act
            const container = shallow(<AppContainer {...props} />);

            // Assert
            expect(container).toMatchSnapshot();
            expect(container.find(History).length).toBe(1);
            expect(container.find(Filter).length).toBe(1);
            expect(container.find(NewRemark).length).toBe(1);
            expect(container.find(EditRemark).length).toBe(1);
        });

        it('should render null', () => {
            // Arrange
            const props = {
                popupAdd: { show: true },
                popupEdit: { show: true },
                showHistory: { show: true },
                getRemarkTitles: jest.fn(),
                remarkTitles :  null
            };

            // Act
            const container = shallow(<AppContainer {...props} />);

            // Assert
            expect(container).toEqual({});
        });
    });
});