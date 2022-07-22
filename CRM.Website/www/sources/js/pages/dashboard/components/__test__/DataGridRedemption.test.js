import React from 'react';
import { HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { shallow } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';
import { DataGridRedemption } from '../DataGridRedemption';

describe('DataGridRedemption', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn(key => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        getRedemptionLogs: jest.fn()
    };

    describe('componentDidMount', () => {
        it('should call exactly props function', () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<DataGridRedemption {...props} />).instance();

            // Act
            container.componentDidMount();

            // Assert
            expect(props.getRedemptionLogs).toHaveBeenCalled();
        });
    });

    describe('componentDidUpdate', () => {
        it('should call exactly props function', () => {
            // Arrange
            const props = {...initProps};
            const prevProps ={id:2};
            const container = shallow(<DataGridRedemption {...props} />).instance();

            // Act
            container.componentDidUpdate(prevProps);

            // Assert
            expect(props.getRedemptionLogs).toHaveBeenCalled();
        });
    });

    describe('buildHeader', () => {
        it('should render expected header', () => {
            // Act
            const props = {...initProps};
            const container = shallow(<DataGridRedemption {...props} />).instance();
            const header = shallow(container.buildHeader());

            // Assert
            expect(header.find(HeaderCell).length).toBe(6);
        });
    });

    describe('buildBody', () => {
        it('should render no data when data is empty', () => {
            // Arrange
            const props = {
                ...initProps,
                redemptions: []
            };
            const expectedBody = [<Row key={`body${1}`} className="no-data" ><Cell className='text-center' colSpan={6}>ThereIsNoData</Cell></Row>];
            const container = shallow(<DataGridRedemption {...props} />).instance();

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual(expectedBody);
        });

        it('should render expected rows when has data', () => {
            // Arrange
            const props = {
                ...initProps,
                redemptions: [{ id: 1, subject: 'test', claimTime: '', currency: 0, amount: 0, doneBy: 'test', status: 'closed'}]
             };
            const container = shallow(<DataGridRedemption {...props} />).instance();
            container.renderRow = jest.fn(() => <div />);

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual([<div />]);
        });
    });

    describe('handleEditRedemptionLog', () => {
        it('should call exactly props function', () => {
            // Arrange
            const props = {
                ...initProps,
                setEditRedemptionDialog: jest.fn()
            };

            const container = shallow(<DataGridRedemption {...props} />).instance();
            
            // Act
            container.handleEditRedemptionLog(1);

            //
            expect(props.setEditRedemptionDialog).toHaveBeenCalledWith({ show: true, redemptionId: 1});
        });
    });

    describe('renderRow', () => {
        it('should call handleEditRedemptionLog when click redemptionId', () => {
            // Arrange
            const props = {...initProps};
            const item = { id: 1, subject: 'test', claimTime: '', currency: 0, amount: 0, doneBy: 'test', status: 'closed'};
            const container = shallow(<DataGridRedemption {...props} />).instance();
            container.handleEditRedemptionLog = jest.fn();

            const row = shallow(container.renderRow(item,0));

            // Act
            row.find(Cell).at(0).find('span').at(0).simulate('click');

            // Assert
            expect(container.handleEditRedemptionLog).toHaveBeenCalled();
        });
    });

    describe('render', () => {
        it('should render not correctly', () => {
            //Act
            const props = {
                ...initProps,
                redemptions: null
            };
            const container = shallow(<DataGridRedemption {...props} />);

            //Assert
            expect(container.type()).toEqual(null);
        });
    });
});