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
        informSettings: {
            statuses: [{ settingId: 1, settingValue: 'Done'}],
            stations: [{ stationId: 1, name: 'Rn'}],
            productStatuses: [ { statusId: 123, name: 'test' } ]
        },
        informData: [{ headlineId: 1234, groupId: 122}],
        editedInforms: [{ headlineId: 1234, groupId: 122}]
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
            const props = {...initProps, informData: []};
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

    describe('handleChangeDataGrid', () => {
        it('should call setState push exactly when handle change', () => {
            // Arrange
            const props = {
                ...initProps,
                setEditedInforms: jest.fn(),
                editedInforms: [{ groupId: 122, headlineId: 555 }]
            };

            // Act
            const container = shallow(<DataGridEdit {...props}/>);
            const mockEvent = { target: { name: 'statuses', value: 'Done'}}
            container.instance().handleChangeDataGrid(mockEvent, 1234);
           
            // Assert
            expect(props.setEditedInforms).toHaveBeenCalledWith([
                { groupId: 122, headlineId: 555 },
                { groupId: 122, headlineId: 1234, statuses: 'Done' }
            ]);
        });

        it('should call setState replace exits exactly when handle change', () => {
            // Arrange
            const props = {
                ...initProps,
                setEditedInforms: jest.fn()
            };

            // Act
            const container = shallow(<DataGridEdit {...props}/>);
            const mockEvent = { target: { name: 'statuses', value: 'Done'}}
            container.instance().handleChangeDataGrid(mockEvent, 1234);
           
            // Assert
            expect(props.setEditedInforms).toHaveBeenCalledWith([
                { groupId: 122, headlineId: 1234, statuses: 'Done' }
            ]);
        });
    });

    describe('onPaging', () => {
        it('should call exactly functions when handle new informs', () => {
            // Arrange
            const props = {
                ...initProps,
                setGridParams: jest.fn()
            };

            // Act
            const container = shallow(<DataGridEdit {...props}/>);
            container.instance().onPaging(1,200);
           
            // Assert
            expect(props.setGridParams).toHaveBeenCalledWith({pageIndex: 1, pageSize: 200});
        });
    });

    describe('renderRow', () => {
        it('should call exactly function onChange', () => {
            // Act
            const props = {
                ...initProps,
                setEditedInforms: jest.fn()
            };
            const container = shallow(<DataGridEdit {...props}/>).instance();
            const actual = shallow(container.renderRow(props.informData[0],1,props.informSettings.productStatuses,props.informSettings));
            const mockEvent = { target: { name: 'statuses', value: 'Done'}}
            
            actual.find({ name: "informHeadlineStatusId" }).at(0).props().onChange(mockEvent);
            actual.find({ name: "remark" }).at(0).props().onBlur(mockEvent);
            actual.find({ name: "extension" }).at(0).props().onChange(mockEvent);
            actual.find({ name: "productStatus" }).at(0).props().onChange(mockEvent);
            // Assert
            expect(actual.find(Cell).length).toBe(7);
        });
    });
});