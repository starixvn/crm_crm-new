import React from 'react';
import { DataGrid } from '../DataGrid';
import { HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { Button } from 'react-bootstrap';
import { shallow } from 'enzyme';

describe('DataGrid', () => {
    beforeAll(() => {
        window.customerInfoPolicy = 2;
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        redemptionLogs: [ 
            { id: 4752, subject: 'test', claimTime: 'Nov 12, 2021 06:46:00 AM', status: 'KIV' },
            { id: 1234, subject: 'test', claimTime: 'Nov 12, 2021 06:46:00 AM', status: 'KIV' }
        ]
    };

    describe('buildHeader', () => {
        it('should render expected header', () => {
            // Act
            const container = shallow(<DataGrid />).instance();
            const header = shallow(container.buildHeader());

            // Assert
            expect(header.find(HeaderCell).length).toBe(6);
        });

        it('should call handleSort when click', () => {
            // Arrange
            const props = { ...initProps };

            const container = shallow(<DataGrid {...props} />).instance();
            container.handleSort = jest.fn();
            const row = shallow(container.buildHeader());

            // Action
            row.find(HeaderCell).at(0).find('i').at(0).simulate('click');
            row.find(HeaderCell).at(1).find('i').at(0).simulate('click');
            row.find(HeaderCell).at(2).find('i').at(0).simulate('click');
            row.find(HeaderCell).at(3).find('i').at(0).simulate('click');
            row.find(HeaderCell).at(4).find('i').at(0).simulate('click');
            row.find(HeaderCell).at(5).find('i').at(0).simulate('click');

            // Assert
            expect(container.handleSort).toHaveBeenCalled();
        });
    });

    describe('buildBody', () => {
        it('should render no data when data is empty', () => {
            // Arrange
            const props = {
                redemptionLogs: []
             };
            const expectedBody = [<Row key={`body${1}`} className="no-data" ><Cell className='text-center' colSpan={6}>ThereIsNoData</Cell></Row>];
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual(expectedBody);
        });

        it('should render expected rows when has data', () => {
            // Arrange
            const props = { ...initProps };
            const container = shallow(<DataGrid {...props} />).instance();
            container.renderRow = jest.fn(() => <div />);

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual([<div />,<div />]);
        });
    });

    describe('isSortEqual', () => {
        it('should return 0', () => {
            // Arrange
            const props = { ...initProps };
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            const actual = container.isSortEqual('test','test');

            // Assert
            expect(actual).toEqual(0);
        });

        it('should return -1', () => {
            // Arrange
            const props = { ...initProps };
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            const actual = container.isSortEqual('test','test123');

            // Assert
            expect(actual).toEqual(-1);
        });
    });

    describe('handleSort', () => {
        it('should call exactly props function with sortDesc is true', () => {
            // Arrange
            const expected = [
                { id: 1234, subject: 'test', claimTime: 'Nov 12, 2021 06:46:00 AM', status: 'KIV' },
                { id: 4752, subject: 'test', claimTime: 'Nov 12, 2021 06:46:00 AM', status: 'KIV' }
            ];
            const props = { 
                ...initProps,
                setLogsByCustomerId: jest.fn()
            };
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            container.handleSort('id');

            // Assert
            expect(props.setLogsByCustomerId).toHaveBeenCalledWith(expected);
        });

        it('should call exactly props function with sortDesc is false', () => {
            // Arrange
            const expected = [
                { id: 4752, subject: 'test', claimTime: 'Nov 12, 2021 06:46:00 AM', status: 'KIV' },
                { id: 1234, subject: 'test', claimTime: 'Nov 12, 2021 06:46:00 AM', status: 'KIV' }
            ];
            const props = { 
                ...initProps,
                setLogsByCustomerId: jest.fn()
            };
            const container = shallow(<DataGrid {...props} />).instance();
            container.sortDesc = false;

            // Act
            container.handleSort('id');

            // Assert
            expect(props.setLogsByCustomerId).toHaveBeenCalledWith(expected);
        });
    });

    describe('handleEditRedemptionLog', () => {
        it('should call exactly props function', () => {
            // Arrange
            const props = { 
                ...initProps,
                setEditRedemptionDialog: jest.fn()
            };
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            container.handleEditRedemptionLog(1);

            // Assert
            expect(props.setEditRedemptionDialog).toHaveBeenCalledWith({ show: true, logId: 1 });
        });
    });

    describe('handleCreateRedemptionLog', () => {
        it('should call exactly props function', () => {
            // Arrange
            const props = { 
                ...initProps,
                setCreateRedemptionDialog: jest.fn()
            };
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            container.handleCreateRedemptionLog(1);

            // Assert
            expect(props.setCreateRedemptionDialog).toHaveBeenCalledWith({ show: true });
        });
    });

    describe('renderRow', () => {
        it('should call handleEditRedemptionLog when click', () => {
            // Arrange
            const item =  { id: 1234, subject: 'test', claimTime: 'Nov 12, 2021 06:46:00 AM', status: 'KIV', currency: 1, amount: 1, doneBy: 'sa' }
            const props = { ...initProps };

            const container = shallow(<DataGrid {...props} />).instance();
            container.handleEditRedemptionLog = jest.fn();
            const row = shallow(container.renderRow(item, 1));

            // Action
            row.find(Cell).at(0).find('span').at(0).simulate('click');

            // Assert
            expect(container.handleEditRedemptionLog).toHaveBeenCalledWith(1234);
        });
    });

    describe('render', () => {
        it('should render not correctly', () => {
            //Act
            const props = { redemptionLogs: null };
            const container = shallow(<DataGrid {...props} />);

            //Assert
            expect(container.type()).toEqual(null);
        });

        it('should call handleCreateRedemptionLog when click', () => {
            // Arrange
            const props = { ...initProps };

            const container = shallow(<DataGrid {...props} />).instance();
            container.handleCreateRedemptionLog = jest.fn();
            const row = shallow(container.render());

            // Action
            row.find(Button).at(0).simulate('click');

            // Assert
            expect(container.handleCreateRedemptionLog).toHaveBeenCalled();
        });
    });
});