import React from 'react';
import { DataGridEdit } from '../DataGridEdit';
import { HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { shallow } from 'enzyme';

describe('DataGridEdit', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        gridParams: {
            pageIndex: 1,
            pageSize: 100
        },
        InformSettings: {
            statuses: [{ settingId: 1, settingValue: 'Done'}],
            stations: [{ stationId: 1, name: 'Rn'}],
            productStatuses: [ { statusId: 123, name: 'test' } ]
        },
        Informs: [{ headlineId: 1234, groupId: 122}]
    };

    describe('buildHeader', () => {
        it('should render expected header', () => {
            // Act
            const props = {...initProps}
            const container = shallow(<DataGridEdit {...props}/>).instance();
            const header = shallow(container.buildHeader());

            // Assert
            expect(header.find(HeaderCell).length).toBe(7);
        });
    });

    describe('buildBody', () => {
        it('should render no data when gridData is empty', () => {
            // Arrange
            const props = {...initProps, Informs: []};
            const expectedBody = [<Row key={`body${1}`} className="no-data" ><Cell className='text-center' colSpan={7}>ThereIsNoData</Cell></Row>];
            const container = shallow(<DataGridEdit {...props} />).instance();

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual(expectedBody);
        });

        it('should render expected rows when gridData has data', () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<DataGridEdit {...props} />).instance();
            container.renderRow = jest.fn(() => <div />);

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual([<div />]);
        });
    });
});