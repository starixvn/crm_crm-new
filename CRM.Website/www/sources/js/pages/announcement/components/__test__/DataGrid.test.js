import React from 'react';
import DataGridWrapper, { DataGrid } from '../DataGrid';
import { Table, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import configureMockStore from 'redux-mock-store';
import LangHelper from '@jsroot/common/langHelper';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('DataGrid', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn((key) => key);
        const appContainer = document.createElement('div');
        appContainer.setAttribute('id', 'right-row-container');
        document.body.appendChild(appContainer);
    });

    afterAll(() => {
        const appContainer = document.getElementById('right-row-container');
        if (appContainer) {
            document.body.removeChild(appContainer);
        }
        jest.clearAllMocks();
    });

    describe('component with redux', () => {
        const mockStore = configureMockStore();
        const initialState = {
            gridParamsCommunication: {},
            gridDataCommunication: {}
        };
        const store = mockStore(initialState);
        const wrapper = shallow(<DataGridWrapper store={store} />);

        it('component render correctly', () => {
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });

    it('render null when data is empty', () => {
        // Arrange
        const props = {
            gridData: null,
            isHost: true
        };

        // Action
        const dataGrid = shallow(<DataGrid {...props} />);

        // Assert
        expect(dataGrid).toBeNull;
    });

    describe('default elements', () => {
        it('table props should be mapped correctly', () => {
            // Arrange
            const props = {
                gridData: {
                    totalItems: 1,
                    data: [{announcementId: 1, notificationTemplateName: "Special Announcement s", status: 'completed' }]
                },
                isHost: true,
                gridParams:{
                    pageIndex: 1,
                    pageSize: 100
                }
            };

            // Action
            const dataGrid = shallow(<DataGrid {...props} />);

            // Assert
            expect(dataGrid.find(Table).length).toBe(1);
            expect(dataGrid.find(Table).props().minWidth).toBe(960);
            expect(dataGrid.find(Table).props().autoWidth).toBeTrue;
            expect(dataGrid.find(Table).props().isPaging).toBeTrue;
            expect(dataGrid.find(Table).props().shouldResetScrollPosition).toBeFalse;
        });
    });

    describe('methods', () => {
        describe('onPaging', () => {
            it('should call exactly functions', () => {
                // Arrange
                const props = {
                    gridParams:{
                        pageIndex: 1,
                        pageSize: 100
                    },
                    setGridParams: jest.fn(),
                    getGridData: jest.fn()
                };
                const expectedGridParams = { pageIndex: 1, pageSize: 100 };
                const container = shallow(<DataGrid {...props} />).instance();

                // Act
                container.onPaging(expectedGridParams.pageIndex, expectedGridParams.pageSize);

                // Assert
                expect(props.setGridParams).toHaveBeenCalledWith(expectedGridParams);
                expect(props.getGridData).toHaveBeenCalledWith(expectedGridParams);
            });
        });

        describe('renderHeaderAnnouncement', () => {
            it('should render expected header when isHost = false', () => {
                // Arrange
                const container = shallow(<DataGrid />).instance();

                // Act
                const header = shallow(container.renderHeaderAnnouncement(false));

                // Assert
                expect(header.find(HeaderCell).length).toBe(7);
            });

            it('should render expected header when isHost = true', () => {
                // Arrange
                const container = shallow(<DataGrid />).instance();

                // Act
                const header = shallow(container.renderHeaderAnnouncement(true));

                // Assert
                expect(header.find(HeaderCell).length).toBe(8);
            });
        describe('renderBodyAnnouncement', () => {
            it('should render no data when gridData is empty', () => {
                // Arrange
                const props = {
                    gridData: {
                        totalItems: 0,
                        data: []
                    },
                    isHost: true,
                    gridParams:{
                        pageIndex: 1,
                        pageSize: 100
                    }
                };
                const container = shallow(<DataGrid {...props} />).instance();
    
                // Act
                const actual = container.renderBodyAnnouncement(true);
    
                // Assert
                expect(actual).toEqual([<Row key='body-announcement' className='no-data' ><Cell colSpan={9}>{LangHelper.getResource('ThereIsNoData')}</Cell></Row>]);
            });
    
            it('should render expected rows when gridData has data', () => {
                // Arrange
                const props = {
                    gridData: {
                        totalItems: 1,
                        data: [{announcementId: 1, notificationTemplateName: "Special Announcement s", status: 'completed' }]
                    },
                    isHost: true,
                    gridParams:{
                        pageIndex: 1,
                        pageSize: 100
                    }
                };
                const container = shallow(<DataGrid {...props} />).instance();
                container.renderRow = jest.fn(() => <div />);
    
                // Act
                const actual = container.renderBodyAnnouncement(true);
    
                // Assert
                expect(actual).toEqual([<div />]);
                });
            });
        });

        describe('openContentPopup', () => {
            it('should call exact function', () => {
                // Arrange
                const props = {
                    setContentPopup: jest.fn()
                };
                const container = shallow(<DataGrid {...props} />).instance();
                container.setIsRefresh = jest.fn();
                // Act
                container.openContentPopup(1);
    
                // Assert
                expect(props.setContentPopup).toHaveBeenCalledWith({show: true, announcementId: 1});
                expect(container.setIsRefresh).toHaveBeenCalled();
            });
        });

        describe('handleOpenNotificationList', () => {
            it('should call exact function', () => {
                // Arrange
                const props = {
                    navigate: jest.fn()
                };
                const container = shallow(<DataGrid {...props} />).instance();
    
                // Act
                container.handleOpenNotificationList(1);
    
                // Assert
                expect(props.navigate).toHaveBeenCalled();
            });
        });

        describe('setIsRefresh', () => {
            it('should call exact function', () => {
                // Arrange
                const props = {
                    setIsRefresh: jest.fn()
                };
                const container = shallow(<DataGrid {...props} />).instance();
    
                // Act
                container.setIsRefresh(true);
    
                // Assert
                expect(props.setIsRefresh).toHaveBeenCalledWith(true);
            });
        });

        describe('handleEdit', () => {
            it('should call exact function', () => {
                // Arrange
                const props = {
                    setIsRefresh: jest.fn(),
                    setOpenActionAnnouncementPopup: jest.fn(),
                    redirectActionParams: '',
                    navigate: jest.fn()
                };
                const actionParam = {
                    announcementId: 1,
                    isEdit: true,
                    redirectActionParams: ''
                };
                const container = shallow(<DataGrid {...props} />).instance();
    
                // Act
                container.handleEdit(1);
    
                // Assert
                expect(props.navigate).toHaveBeenCalledWith('/Announcement/EditAnnouncement', {state: actionParam});
            });
        });

        describe('handleDuplicate', () => {
            it('should call exact function', () => {
                // Arrange
                const props = {
                    setIsRefresh: jest.fn(),
                    setOpenActionAnnouncementPopup: jest.fn(),
                    redirectActionParams: '',
                    navigate: jest.fn()
                };
                const actionParam = {
                    announcementId: 1,
                    isEdit: false,
                    redirectActionParams: ''
                };
                const container = shallow(<DataGrid {...props} />).instance();
    
                // Act
                container.handleDuplicate(1);
    
                // Assert
                expect(props.navigate).toHaveBeenCalledWith('/Announcement/CloneAnnouncement', {state: actionParam});
            });
        });

        describe('handleCancel', () => {
            it('should call exact function', () => {
                // Arrange
                const props = {
                    setIsRefresh: jest.fn(),
                    setOpenCancelAnnouncementPopup: jest.fn()
                };
                const container = shallow(<DataGrid {...props} />).instance();
    
                // Act
                container.handleCancel(1);
    
                // Assert
                expect(props.setIsRefresh).toHaveBeenCalledWith(false);
                expect(props.setOpenCancelAnnouncementPopup).toHaveBeenCalledWith({show: true, announcementId: 1});
            });
        });

        describe('renderAction', () => {
            it('should call exact function when click button cancel', () => {
                // Arrange
                const item = {status : 'Planned'};
                const container = shallow(<DataGrid />).instance();
                container.handleCancel = jest.fn();
                // Act
                const render = shallow(container.renderAction(item));
                render.find('.icon-delete').simulate('click');
                // Assert
                expect(container.handleCancel).toHaveBeenCalled();
            });

            it('should call exact function when click button edit', () => {
                // Arrange
                const item = {status : 'Cancelled'};
                const container = shallow(<DataGrid />).instance();
                container.handleEdit = jest.fn();
                // Act
                const render = shallow(container.renderAction(item));
                render.find('.icon-edit').simulate('click');
                // Assert
                expect(container.handleEdit).toHaveBeenCalled();
            });

            it('should call exact function when click button clone', () => {
                // Arrange
                const item = {status : 'Completed'};
                const container = shallow(<DataGrid />).instance();
                container.handleDuplicate = jest.fn();
                // Act
                const render = shallow(container.renderAction(item));
                render.find('.icon-duplicate').simulate('click');
                // Assert
                expect(container.handleDuplicate).toHaveBeenCalled();
            });

            it('should call exact function when click button edit', () => {
                // Arrange
                const item = {status : 'Draft'};
                const container = shallow(<DataGrid />).instance();
                container.handleCancel = jest.fn();
                container.handleEdit = jest.fn();
                // Act
                const render = shallow(container.renderAction(item));
                render.find('.icon-delete').simulate('click');
                // Assert
                expect(container.handleCancel).toHaveBeenCalled();
            });

            it('should call exact function when click button edit', () => {
                // Arrange
                const item = {status : 'Draft'};
                const container = shallow(<DataGrid />).instance();
                container.handleCancel = jest.fn();
                container.handleEdit = jest.fn();
                // Act
                const render = shallow(container.renderAction(item));
                render.find('.icon-edit').simulate('click');
                // Assert
                expect(container.handleEdit).toHaveBeenCalled();
            });
        });
    });
});