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
        }        
    };

    it('should render expected header', () => {
        // Act
        const container = shallow(<DataGrid {...props} />);
        const header = shallow(container.instance().buildHeader());

        // Assert
        expect(header.find(HeaderCell).length).toBe(4);
    });

    it('should render expected header', () => {
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
        // Act
        const container = shallow(<DataGrid {...propsNoData} />);
        const body = shallow(container.instance().buildBody());

        // Assert
        expect(body).toEqual(4);
    });

});