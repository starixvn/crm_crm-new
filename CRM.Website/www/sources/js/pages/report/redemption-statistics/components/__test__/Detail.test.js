import React from 'react';
import { Detail } from '../Detail';
import { HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { shallow } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';

describe('Detail', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn((key) => key);
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('buildHeader', () => {
        it('should render expected header', () => {
            // Act
            const container = shallow(<Detail />).instance();
            const header = shallow(container.buildHeader());

            // Assert
            expect(header.find(HeaderCell).length).toBe(7);
        });
    });

    describe('buildBody', () => {
        it('should render no data when gridData is empty', () => {
            // Arrange
            const props = {
                detailPopup: {title: 'test'},
                gridDataDetails: { totalItems: 1, data: [] },
                gridParamDetails: { pageIndex: 1, pageSize: 100 }              
            };
            const expectedBody = [<Row className='no-data' ><Cell className='text-center' colSpan={7}>ThereIsNoData</Cell></Row>];
            const container = shallow(<Detail {...props} />).instance();

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual(expectedBody);
        });

        it('should render expected rows when gridDataDetails has data', () => {
            // Arrange
            const props = {
                detailPopup: {title: 'test'},
                gridDataDetails: [{subject: "testing", claimTime: "Nov 12, 2021 06:35:00 AM", amount: 3, doneBy: "sa", currency: "RM"}],
                gridParamDetails: { pageIndex: 1, pageSize: 100 }
            };
            const container = shallow(<Detail {...props} />).instance();
            container.renderRow = jest.fn(() => <div />);

            // Act
            const actual = container.buildBody();
            // Assert
            expect(actual).toEqual([<div />]);
        });
    });
   
    describe('handleExportExcel ', () => {
        it('should call exact function', () => {
            // Arrange
            const props = {
                detailPopup: {title: 'test'},
                gridParamDetails: { subject:'', fromDate: 'Apr 02, 2020', toDate: 'Jul 31, 2021',
                    statusId: '1,2', reportBy: 'sa', currencyId: '4,5', pageIndex: 1, pageSize: 100 },
                exportExcelDetails: jest.fn()
            };

            // Act
            const container = shallow(<Detail {...props}/>);
            container.instance().handleExportExcel();
           
            // Assert
            expect(props.exportExcelDetails).toHaveBeenCalledWith(props.gridParamDetails);
        });
    });

    describe('handleGoBack', () => {
        it('should call exact function', () => {
            // Arrange
            const props = {
                detailPopup: {title: 'test'},
                gridParamDetails: { subject:'', fromDate: 'Apr 02, 2020', toDate: 'Jul 31, 2021',
                    statusId: '1,2', reportBy: 'sa', currencyId: '4,5', pageIndex: 1, pageSize: 100 },
                setOpenDetails: jest.fn()
            };

            // Act
            const container = shallow(<Detail {...props}/>);
            container.instance().handleGoBack();
           
            // Assert
            expect(props.setOpenDetails).toHaveBeenCalledWith({show: false, title: ''});
        });
    });

    describe('onPaging', () => {
        it('should call exactly function', () => {
            // Arrange
            const props = {
                detailPopup: {title: 'test'},
                gridDataDetails: {
                    data: [{subject: "testing", claimTime: "Nov 12, 2021 06:35:00 AM", amount: 3, doneBy: "sa", currency: "RM"}]
                },
                gridParamDetails: { pageIndex: 1, pageSize: 100 },
                getRedemptionDetails: jest.fn(),
                setGridParamDetails: jest.fn()
            };
            const expectedGridParams = { pageIndex: 1, pageSize: 100 };
            const container = shallow(<Detail {...props} />).instance();

            // Act
            container.onPaging(expectedGridParams.pageIndex, expectedGridParams.pageSize);

            // Assert
            expect(props.getRedemptionDetails).toHaveBeenCalledWith(expectedGridParams);
            expect(props.setGridParamDetails).toHaveBeenCalledWith(expectedGridParams);
        });
    });

    describe('renderRow', () => {
        it('should return exact cells', () => {
            // Arrange
            const props = {
                detailPopup: {title: 'test'},
                gridDataDetails: {
                    data: [{subject: "testing", claimTime: "Nov 12, 2021 06:35:00 AM", amount: 3, doneBy: "sa", currency: "RM"}]
                },
                gridParamDetails: { pageIndex: 1, pageSize: 100 }
            };
            const container = shallow(<Detail {...props}/>).instance();

            // Act
            const actual = shallow(container.renderRow(props.gridDataDetails.data[0], 1));

            // Assert
            expect(actual.find(Cell).length).toBe(7);
        });
    });

    describe('render', () => {
        it('onClick call exact function', () => {
            // Arrange
            const props = {
                detailPopup: {title: 'test'},
                gridDataDetails: {
                    data: [{subject: "testing", claimTime: "Nov 12, 2021 06:35:00 AM", amount: 3, doneBy: "sa", currency: "RM"}]
                },
                gridParamDetails: { pageIndex: 1, pageSize: 100 }
            };
            const container = shallow(<Detail {...props}/>).instance();
            container.handleGoBack = jest.fn();
            // Act
            const actual = shallow(container.render());
            actual.find('span').at(1).simulate('click'); 

            // Assert
            expect(container.handleGoBack).toHaveBeenCalled();
        });
    });
});