import React from 'react';
import { DataGrid } from '../DataGrid';
import { HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { shallow } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';

describe('DataGrid', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn((key) => key);
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('buildHeader', () => {
        it('should render expected header', () => {
            // Act
            const container = shallow(<DataGrid />).instance();
            const header = shallow(container.buildHeader());

            // Assert
            expect(header.find(HeaderCell).length).toBe(3);
        });
    });

    describe('buildBody', () => {
        it('should render no data when gridData is empty', () => {
            // Arrange
            const props = {
                gridData: { totalItems: 1, data: [] },
                gridParams: { pageIndex: 1, pageSize: 100 }              
            };
            const expectedBody = [<Row className='no-data' ><Cell className='text-center' colSpan={3}>ThereIsNoData</Cell></Row>];
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual(expectedBody);
        });

        it('should render expected rows when gridData has data', () => {
            // Arrange
            const props = {
                gridData: {
                    data: [{claimTime: 'Jan 01, 0001 12:00:00 AM', subject: null, month: 12, year: 2021, currency: 'RM'}],
                    title: 'Redemption Statistics Report from Apr 05, 2021 to Jan Apr 05, 2022',
                    totals: {RM: 5, US$: 15, EURO: 2}
                },
                gridParams: { pageIndex: 1, pageSize: 100 } 
            };
            const container = shallow(<DataGrid {...props} />).instance();
            container.renderRow = jest.fn(() => <div />);
            container.renderRowTotal = jest.fn(() => <div />);

            // Act
            const actual = container.buildBody();
            // Assert
            expect(actual).toEqual([<div />, <div />]);
        });
    });

    describe('handleOpenDetail', () => {
        it('should call function with exactly params when year and month not equal zero', () => {
            // Arrange
            const props = {
                gridParams: { subject:'', fromDate: 'Apr 02, 2020', toDate: 'Jul 31, 2021', statusId: '1,2', reportBy: 'sa', currencyId: '4,5'  },
                exportExcel: jest.fn(),
                setOpenDetails: jest.fn(),
                setGridParamDetails: jest.fn(),
                getRedemptionDetails: jest.fn()
            };

            const expectedParams = {
                subject:'', fromDate: 'Feb 01, 2022', toDate: 'Feb 28, 2022', statusId: '1,2', reportBy: 'sa',currencyId: '4,5', pageIndex: 1, pageSize: 100
            };

            // Act
            const container = shallow(<DataGrid {...props}/>);
            container.instance().handleOpenDetail(0, 2022, 2, 'title');
           
            // Assert
            expect(props.setOpenDetails).toHaveBeenCalledWith({ show: true, title: 'title' });
            expect(props.setGridParamDetails).toHaveBeenCalledWith(expectedParams);
            expect(props.getRedemptionDetails).toHaveBeenCalledWith(expectedParams);
        });

        it('should call function with exactly params when year not equal zero and month is zero ', () => {
            // Arrange
            const props = {
                gridParams: { subject:'', fromDate: 'Apr 02, 2020', toDate: 'Jul 31, 2021', statusId: '1,2', reportBy: 'sa', currencyId: '4,5'  },
                exportExcel: jest.fn(),
                setOpenDetails: jest.fn(),
                setGridParamDetails: jest.fn(),
                getRedemptionDetails: jest.fn()
            };

            const expectedParams = {
                subject:'', fromDate: 'Jan 01, 2022', toDate: 'Dec 31, 2022', statusId: '1,2', reportBy: 'sa',currencyId: '4,5', pageIndex: 1, pageSize: 100
            };

            // Act
            const container = shallow(<DataGrid {...props}/>);
            container.instance().handleOpenDetail(0, 2022, 0, 'title');
           
            // Assert
            expect(props.setOpenDetails).toHaveBeenCalledWith({ show: true, title: 'title' });
            expect(props.setGridParamDetails).toHaveBeenCalledWith(expectedParams);
            expect(props.getRedemptionDetails).toHaveBeenCalledWith(expectedParams);
        });

        it('should call function with exactly params when year equal zero', () => {
            // Arrange
            const props = {
                gridParams: { subject:'', fromDate: 'Apr 02, 2020', toDate: 'Jul 31, 2021', statusId: '1,2', reportBy: 'sa', currencyId: '4,5'  },
                exportExcel: jest.fn(),
                setOpenDetails: jest.fn(),
                setGridParamDetails: jest.fn(),
                getRedemptionDetails: jest.fn()
            };

            const expectedParams = {
                subject:'', fromDate: 'Apr 02, 2020', toDate: 'Jul 31, 2021', statusId: '1,2', reportBy: 'sa',currencyId: '4,5', pageIndex: 1, pageSize: 100
            };

            // Act
            const container = shallow(<DataGrid {...props}/>);
            container.instance().handleOpenDetail(0, 0, 0, 'title');
           
            // Assert
            expect(props.setOpenDetails).toHaveBeenCalledWith({ show: true, title: 'title' });
            expect(props.setGridParamDetails).toHaveBeenCalledWith(expectedParams);
            expect(props.getRedemptionDetails).toHaveBeenCalledWith(expectedParams);
        });
    });
   
    describe('handleExportExcel ', () => {
        it('should call exact function', () => {
            // Arrange
            const props = {
                gridParams: { subject:'', fromDate: 'Apr 02, 2020', toDate: 'Jul 31, 2021', statusId: '1,2', reportBy: 'sa', currencyId: '4,5'  },
                exportExcel: jest.fn()
            };

            // Act
            const container = shallow(<DataGrid {...props}/>);
            container.instance().handleExportExcel();
           
            // Assert
            expect(props.exportExcel).toHaveBeenCalledWith(props.gridParams);
        });
    });

    describe('renderRow', () => {
        it('should return exact cells', () => {
            // Arrange
            const props = {
                gridData: {
                    data: [{claimTime: 'Jan 01, 0001 12:00:00 AM', subject: null, month: 12, year: 2021, currency: 'RM'}],
                    title: 'Redemption Statistics Report from Apr 05, 2021 to Jan Apr 05, 2022',
                    totals: {RM: 5, US$: 15, EURO: 2}
                },
                gridParams: { pageIndex: 1, pageSize: 100, reportBy: 2 }
            };
            const container = shallow(<DataGrid {...props}/>).instance();

            // Act
            const actual = shallow(container.renderRow(props.gridData.data[0], 1));

            // Assert
            expect(actual.find(Cell).length).toBe(3);
        });

        it('onClick cell at first call exact function', () => {
            // Arrange
            const props = {
                gridData: {
                    data: [{claimTime: 'Jan 01, 0001 12:00:00 AM', subject: null, month: 12, year: 2021, currency: 'RM'}],
                    title: 'Redemption Statistics Report from Apr 05, 2021 to Jan Apr 05, 2022',
                    totals: {RM: 5, US$: 15, EURO: 2}
                },
                gridParams: { pageIndex: 1, pageSize: 100, reportBy: 2 }
            };
            const container = shallow(<DataGrid {...props}/>).instance();
            container.handleOpenDetail = jest.fn();
            // Act
            const actual = shallow(container.renderRow(props.gridData.data[0], 1));
            actual.find(Cell).at(0).simulate('click');

            // Assert
            expect(container.handleOpenDetail).toHaveBeenCalledWith(0, 2021, 12, 'RedemptionStatisticsDetailTitleDecember 2021');
        });

        it('onClick cell at second call exact function', () => {
            // Arrange
            const props = {
                gridData: {
                    data: [{claimTime: 'Jan 01, 0001 12:00:00 AM', subject: null, month: 12, year: 2021, currency: 'RM', currencyId: 1}],
                    title: 'Redemption Statistics Report from Apr 05, 2021 to Jan Apr 05, 2022',
                    totals: {RM: 5, US$: 15, EURO: 2}
                },
                gridParams: { pageIndex: 1, pageSize: 100, reportBy: 2 }
            };
            const container = shallow(<DataGrid {...props}/>).instance();
            container.handleOpenDetail = jest.fn();
            // Act
            const actual = shallow(container.renderRow(props.gridData.data[0], 1));
            actual.find(Cell).at(1).simulate('click');

            // Assert
            expect(container.handleOpenDetail).toHaveBeenCalledWith(1, 2021, 12, 'RedemptionStatisticsDetailTitleRM');
        });
    });
});