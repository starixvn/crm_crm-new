import React from 'react';
import { DataGrid } from '../DataGrid';
import { HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { shallow } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';

describe('DataGrid', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    it('should render expected header', () => {
        // Arrange
        const container = shallow(<DataGrid />).instance();

        // Act
        const header = shallow(container.buildHeader());

        // Assert
        expect(header.find(HeaderCell).length).toBe(31);
    });

    it('should render no data when gridData is empty', () => {
        // Arrange
        const props = {
            customerReport: { totalCustomer: 1, customerList: [] },
            gridParams: {
                pageIndex: 1,
                pageSize: 100
            }
        };
        const expectedBody = [<Row key={`body${1}`} className="no-data" >
            <Cell className="text-center no-data" colSpan={31}>{LangHelper.getResource('ThereIsNoData')}</Cell>
        </Row>];
        const container = shallow(<DataGrid {...props} />);

        // Act
        const actual = container.instance().buildBody();

        // Assert
        expect(actual).toEqual(expectedBody);
    });

    it('should render expected rows when gridData has data', () => {
        // Arrange
        const props = {
            customerReport: {
                customerList: [
                    {
                        bBM: "---",
                        checker: null
                    }
                ],
                totalCustomer: 1
            },
            gridParams: {
                pageIndex: 1,
                pageSize: 100
            }
        };

        const container = shallow(<DataGrid {...props} />);
        container.instance().renderRow = jest.fn(() => '<div />');
        // Act
        const actual = container.instance().buildBody();

        // Assert
        expect(actual).toEqual(["<div />"]);
    });

    it('should call exactly functions when handle export excel', () => {
        // Arrange
        const props = {
            gridParams: {
                pageIndex: 1,
                pageSize: 100
            },
            exportExcel: jest.fn()
        };

        // Act
        const container = shallow(<DataGrid {...props} />);
        container.instance().handleExportExcel();

        // Assert
        expect(props.exportExcel).toHaveBeenCalled();
    });

    it('should call exactly functions when on Paging Direct ', () => {
        // Arrange
        const props = {
            setGridParams: jest.fn(),
            getCustomerReport: jest.fn()
        };
        const container = shallow(<DataGrid {...props} />).instance();

        // Act
        container.onPaging(1, 200);

        // Assert
        expect(props.setGridParams).toHaveBeenCalled();
        expect(props.getCustomerReport).toHaveBeenCalled();
    });
});