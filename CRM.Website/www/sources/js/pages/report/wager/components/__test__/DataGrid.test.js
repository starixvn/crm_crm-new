import React from 'react';
import { DataGrid } from '../DataGrid';
import { HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { shallow } from 'enzyme';

describe('DataGrid', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    const props = {
        gridData: {
            grandTotal: {
                month: "test",
                total: 65,
                wagers: [{id: 0, name: "test", amount: 10}, {Id: 0, name: "test", amount: 10}]
            },
            reportTitle: "test",
            wagerByMonths: [{month: "test", wagers: [{Id: 0, name: "test", amount: 1}, {Id: 0, name: "test", amount: 1}]}]
        },
        exportExcel: jest.fn()   
    };

    it('should render expected header', () => {
        // Act
        const container = shallow(<DataGrid {...props} />);
        const header = shallow(container.instance().buildHeader());

        // Assert
        expect(header.find(HeaderCell).length).toBe(4);
    });

    it('should render body expected nodata', () => {
        // Arrange
        const propsNoData = {
            gridData: {
                grandTotal: {
                    month: "test",
                    total: 65,
                    wagers: [{id: 0, name: "test", amount: 10}, {Id: 0, name: "test", amount: 10}]
                },
                reportTitle: "test",
                wagerByMonths: []
            }        
        };
        const expectedBody = [<Row key='body-NoData' className="no-data" >
                                    <Cell className='text-center' colSpan={4}>{'ThereIsNoData'}</Cell>
                              </Row>];
        // Act
        const container = shallow(<DataGrid {...propsNoData} />).instance();
        const body = container.buildBody();

        // Assert
        expect(body).toEqual(expectedBody);
    });

    it('should render expected null', () => {
        // Arrange
        const propsNullData = {
            gridData: {
                grandTotal: {
                    month: "test",
                    total: 65,
                    wagers: [{id: 0, name: "test", amount: 10}, {Id: 0, name: "test", amount: 10}]
                },
                reportTitle: "test",
                wagerByMonths: null
            }        
        };
       
        // Act
        const container = shallow(<DataGrid {...propsNullData} />).instance();
        const body = container.render();

        // Assert
        expect(body).toEqual(null);
    });

    it('should work exactly function handleExportExcel ', () => {
        // Act
        const container = shallow(<DataGrid {...props} />).instance();
        container.handleExportExcel();

        // Assert
        expect(props.exportExcel).toHaveBeenCalled();
    });

    it('should work exactly when click call function handleExportExcel ', () => {
        // Act
        const container = shallow(<DataGrid {...props} />);
        container.instance().handleExportExcel = jest.fn();
        const iconExport = shallow(container.instance().renderCustomButtonReport());
        iconExport.find('span').at(0).simulate('click');
        // Assert
        expect(container.instance().handleExportExcel).toHaveBeenCalled();
    });
});