import React from 'react';
import { DataGrid } from '../DataGrid';
import { HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { shallow } from 'enzyme';
import { toast } from 'react-toastify';
import LangHelper from '@jsroot/common/langHelper';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';

describe('DataGrid', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        LangHelper.getResource = jest.fn(key => key);
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        const appContainer = document.createElement('div');
        appContainer.setAttribute('id', 'app-container');
        document.body.appendChild(appContainer);
    });

    afterEach(() => {
        const appContainer = document.getElementById('app-container');
        if (appContainer) {
            document.body.removeChild(appContainer);
        }
    });


    const initProps = {
        gridData: { 
            data: [{remarkID: 1504, createdDate: "Apr 18, 2022 10:35:19 PM", lastUpdate: "Apr 18, 2022 11:23:30 PM"}],
            totalItems: 9 
        },
        gridParams: { pageIndex: 1, pageSize: 100 },
        isHost: true,
        setShowHistory: jest.fn(),
        setHistoryGridParams: jest.fn(),
        setOpenEditPopup: jest.fn(),
        popupDeleteConfirm: { show: true },
        setGridParams: jest.fn(),
        getNewRemarks: jest.fn(),
        setOpenConfirmDelete: jest.fn(),
        setRemarks: jest.fn()
    };

    describe('buildHeader', () => {
        it('should render expected header', () => {
            // arrange
            const container = shallow(<DataGrid  {...initProps}/>).instance();

            // Act
            const header = shallow(container.buildHeader(true));

            // Assert
            expect(header.find(HeaderCell).length).toBe(16);
        });
    });

    describe('buildBody', () => {
        it('should render no data when gridData is empty', () => {
            // Arrange
            const props = {
                gridData: { data: [] },
                gridParams: { pageIndex: 1, pageSize: 100 },
                popupDeleteConfirm: { show: false }
            };

            const expectedBody = [<Row key='new-remark-body' className='no-data' ><Cell colSpan={15}>ThereIsNoData</Cell></Row>];
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual(expectedBody);
        });

        it('should render expected rows when gridData has data', () => {
            // Arrange
            
            const container = shallow(<DataGrid {...initProps} />).instance();
            container.renderRow = jest.fn(() => <div />);

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual([<div />]);
        });
    });

    describe('onPaging', () => {
        it('should call exactly function', () => {
            // Arrange
            const expectedGridParams = { pageIndex: 1, pageSize: 100 };
            const container = shallow(<DataGrid {...initProps} />).instance();

            // Act
            container.onPaging(expectedGridParams.pageIndex, expectedGridParams.pageSize);

            // Assert
            expect(initProps.setGridParams).toHaveBeenCalledWith(expectedGridParams);
            expect(initProps.getNewRemarks).toHaveBeenCalledWith(expectedGridParams);
        });
    });

    describe('renderRow', () => {
        it.each([
            0,
            6
          ])("when the cell at '%s' click call exact function", (number) => {
            // Arrange
            const container = shallow(<DataGrid  {...initProps}/>).instance();
            container.handleOpenEdit = jest.fn();
            // Act
            const rows = shallow(container.renderRow(initProps.gridData.data[0], 1, true));
            rows.find(Cell).at(number).simulate('click');
            // Assert
            expect(container.handleOpenEdit).toHaveBeenCalled();
        });

        it("click show history call exact function", () => {
            // Arrange
            const container = shallow(<DataGrid  {...initProps}/>).instance();
            container.handleShowHistory = jest.fn();
            // Act
            const rows = shallow(container.renderRow(initProps.gridData.data[0], 1, true));
            rows.find('span').at(0).simulate('click');
            // Assert
            expect(container.handleShowHistory).toHaveBeenCalled();
        });
    });

    describe('renderEditIcon', () => {
        it('click open edit call exact function', () => {
            // Arrange
            const container = shallow(<DataGrid  {...initProps}/>).instance();
            container.handleOpenEdit = jest.fn();
            // Act
            const rows = shallow(container.renderEditIcon (initProps.gridData.data[0]));
            rows.find('span').at(0).simulate('click');
            // Assert
            expect(container.handleOpenEdit).toHaveBeenCalled();
        });

        it("click confirm call exact function", () => {
            // Arrange
            const container = shallow(<DataGrid  {...initProps}/>).instance();
            container.handleShowPopupConfirmDelete = jest.fn();
            // Act
            const rows = shallow(container.renderEditIcon(initProps.gridData.data[0]));
            rows.find('span').at(1).simulate('click');
            // Assert
            expect(container.handleShowPopupConfirmDelete).toHaveBeenCalled();
        });
    });

    describe('handleOpenEdit', () => {
        it('should call exact function', () => {
            // arrange
            const container = shallow(<DataGrid  {...initProps}/>).instance();
            
            // Act
            container.handleOpenEdit(initProps.gridData.data[0]);

            // Assert
            expect(initProps.setOpenEditPopup).toHaveBeenCalled();
        });
    });

    describe('handleShowPopupConfirmDelete', () => {
        it('should call exact function', () => {
            // arrange
            const container = shallow(<DataGrid  {...initProps}/>).instance();
            
            // Act
            container.handleShowPopupConfirmDelete(1);

            // Assert
            expect(initProps.setOpenConfirmDelete).toHaveBeenCalledWith({show: true, id: 1});
        });
    });

    describe('handleShowPopupConfirmDelete', () => {
        it('should call exact function', () => {
            // arrange
            const container = shallow(<DataGrid  {...initProps}/>).instance();
            
            // Act
            container.handleShowPopupConfirmDelete(1);

            // Assert
            expect(initProps.setOpenConfirmDelete).toHaveBeenCalledWith({show: true, id: 1});
        });
    });

    describe('handleCloseDelete', () => {
        it('should call exact function', () => {
            // arrange
            const container = shallow(<DataGrid  {...initProps}/>).instance();
            
            // Act
            container.handleCloseDelete();

            // Assert
            expect(initProps.setOpenConfirmDelete).toHaveBeenCalledWith({show: false , id: null});
        });
    });

    describe('handleShowHistory', () => {
        it('should call exact function', () => {
            // arrange
            const container = shallow(<DataGrid  {...initProps}/>).instance();
            
            // Act
            container.handleShowHistory('userNameFormat',initProps.gridData.data[0]);

            // Assert
            expect(initProps.setShowHistory).toHaveBeenCalledWith({show: true});
            expect(initProps.setHistoryGridParams).toHaveBeenCalled();
        });
    });

    describe('handleDelete', () => {
        it('should calls exact function if successful', async () => {
             // Arrange
            const response = {isSuccessful: true};
            const promise = Promise.resolve(response);
            const props = {...initProps, deleteNewRemark: jest.fn(() => promise)};
            
            const container = shallow(<DataGrid  {...props}/>).instance();
            container.handleCloseDelete = jest.fn();
            toast.success = jest.fn();
            // Act
            container.handleDelete(1);
            await promise;
            jest.runAllTimers();

            // Assert
            expect(toast.success).toHaveBeenCalledWith(LangHelper.getResource('DeleteNewRemarkSuccessfully'));
            expect(initProps.getNewRemarks).toHaveBeenCalledWith(initProps.gridParams);
            expect(container.handleCloseDelete).toHaveBeenCalled();
        }); 

        it('should calls exact function if unsuccessful', async () => {
            // Arrange
           const response = {isSuccessful: false};
           const promise = Promise.resolve(response);
           const props = {...initProps, deleteNewRemark: jest.fn(() => promise)};
            
           const container = shallow(<DataGrid  {...props}/>).instance();
           container.handleCloseDelete = jest.fn();
           toast.error = jest.fn();
           // Act
           container.handleDelete(1);
           await promise;
           jest.runAllTimers();

           // Assert
           expect(toast.error).toHaveBeenCalled();
           expect(container.handleCloseDelete).toHaveBeenCalled();
       }); 
    }); 

    describe('onSort', () => {
        it.each([
            ['createdDate', 'asc'],
            ['createdDate', 'desc'],
            ['username', 'asc'],
            ['username', 'desc']
          ])("should call exact function when sort order is %p and sortBy is %s'", (sortBy, sortOrder) => {
            // arrange
            const container = shallow(<DataGrid  {...initProps}/>).instance();
            container.handleSortDateAsc = jest.fn();
            
            // Act
            container.onSort(sortBy, sortOrder);

            // Assert
            expect(initProps.setRemarks).toHaveBeenCalled();
        });
    });

    describe('handleSortDateAsc', () => {
        it('should return exact value', () => {
            // arrange
            const container = shallow(<DataGrid  {...initProps}/>).instance();
            const first = [
                {
                    createdDate: '2021-01-01'
                }
            ];
            const second = [
                {
                    createdDate: '2021-02-02'
                }
            ];
            // Act
            const actual = container.handleSortDateAsc('createdDate', first, second);

            // Assert
            expect(actual).toEqual(-1);
        });
    });

    describe('handleSortDateDesc ', () => {
        it('should return exact value', () => {
            // arrange
            const container = shallow(<DataGrid  {...initProps}/>).instance();
            const first = [
                {
                    createdDate: '2021-01-01'
                }
            ];
            const second = [
                {
                    createdDate: '2021-02-02'
                }
            ];
            // Act
            const actual = container.handleSortDateDesc('createdDate', first, second);

            // Assert
            expect(actual).toEqual(-1);
        });
    });

    describe('handleSortStringAsc', () => {
        it('should return exact value', () => {
            // arrange
            const container = shallow(<DataGrid  {...initProps}/>).instance();
            const first = [
                {
                    username: 'username'
                }
            ];
            const second = [
                {
                    username: 'test'
                }
            ];
            // Act
            const actual = container.handleSortStringAsc('username', first, second);

            // Assert
            expect(actual).toEqual(-1);
        });
    });

    describe('handleSortStringDesc', () => {
        it('should return exact value', () => {
            // arrange
            const container = shallow(<DataGrid  {...initProps}/>).instance();
            const first = [
                {
                    username: 'username'
                }
            ];
            const second = [
                {
                    username: 'test'
                }
            ];
            // Act
            const actual = container.handleSortStringDesc('username', first, second);

            // Assert
            expect(actual).toEqual(-1);
        });
    });

    describe('renderConfirmMessage', () => {
        it('should render expect component', () => {
            // arrange
            // Act
            const container = shallow(<DataGrid  {...initProps}/>);
            // Assert
            expect(container.find(ConfirmPopup).length).toBe(1);
        });

        it('should render null', () => {
            // arrange
            const props = {...initProps, gridData: null};
            // Act
            const container = shallow(<DataGrid  {...props}/>);
            const actual = container.instance().render();
            // Assert
            expect(actual).toEqual(null);
        });

        it('should call exact function when ConfirmPopup submit', () => {
            // Arrange
            const container = shallow(<DataGrid {...initProps}/>);
            container.instance().handleDelete = jest.fn();

            // Act
            container.find(ConfirmPopup).simulate('submit');

            // Assert
            expect(container.instance().handleDelete).toHaveBeenCalled();
        });
    });
});