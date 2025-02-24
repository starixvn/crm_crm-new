import React from 'react';
import { shallow } from 'enzyme';
import { RelatedCustomerGrid } from '../RelatedCustomerGrid';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import toJson from 'enzyme-to-json';

describe('RelatedCustomerGrid', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn(key => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('onPaging', () => {
        it('should update state correct', () => {
            // Arrange
            const container = shallow(<RelatedCustomerGrid />).instance();

            // Act
            container.onPaging(2, 20);

            // Assert
            expect(container.state.pageIndex).toEqual(2);
            expect(container.state.pageSize).toEqual(20);
        });
    });

    describe('buildGridHeader', () => {
        it('should return as expected', () => {
            // Arrange
            const container = shallow(<RelatedCustomerGrid />).instance();

            // Act
            const actual = container.buildGridHeader();

            // Assert
            expect(actual).toEqual(<HeaderRow>
                <HeaderCell colWidth={50}>GroupHeadline</HeaderCell>
                <HeaderCell colWidth={50}>Username</HeaderCell>
                <HeaderCell colWidth={100}>RelatedCustomer</HeaderCell>
            </HeaderRow>);
        });
    });

    describe('buildGridBody', () => {
        it('should render no data when relatedCustomerResults is empty', () => {
            // Arrange
            const container = shallow(<RelatedCustomerGrid />).instance();

            // Act
            const actual = container.buildGridBody();

            // Assert
            expect(actual).toEqual([<Row key={`body${1}`} className="no-data"><Cell colSpan="3">ThereIsNoData</Cell></Row>]);
        });

        it('should render expected rows when relatedCustomerResults has data', () => {
            // Arrange
            const props = {
                relatedCustomerResults: [
                    { custId: 1, username: 'test', relatedCustomers: [] },
                    { custId: 2, username: 'test1', relatedCustomers: [] },
                    { custId: 3, username: 'test2', relatedCustomers: [] },
                    { custId: 4, username: 'test3', relatedCustomers: [] }
                ]
            };
            const container = shallow(<RelatedCustomerGrid {...props} />).instance();
            container.setState({ pageIndex: 2, pageSize: 2 });
            container.renderRow = jest.fn(() => <div />);

            // Act
            const actual = container.buildGridBody();

            // Assert
            expect(actual).toEqual([<div />, <div />]);
            expect(container.renderRow).toHaveBeenCalledTimes(2);
            expect(container.renderRow.mock.calls[0]).toEqual([{ custId: 3, username: 'test2', relatedCustomers: [] }]);
            expect(container.renderRow).toHaveBeenLastCalledWith({ custId: 4, username: 'test3', relatedCustomers: [] });
        });
    });

    describe('handleOpenViewRelatedCustomerDialog', () => {
        it('should call correct function', () => {
            // Arrange
            const relatedCustomers = ['sa', 'test'];
            const props = {
                setViewRelatedCustomerDialog: jest.fn()
            };
            const container = shallow(<RelatedCustomerGrid {...props} />).instance();

            // Act
            container.handleOpenViewRelatedCustomerDialog(relatedCustomers);

            // Assert
            expect(props.setViewRelatedCustomerDialog).toHaveBeenCalledWith({ show: true, relatedCustomers });
        });
    });

    describe('renderRelatedCustomerColumn', () => {
        it('should return as expected when relatedCustomers length is less than MaximumDisplayRelatedCustomer', () => {
            // Arrange
            const customer = {
                headlineId: 1, headline: 'sa', custId: 1, username: 'sa',
                relatedCustomers: [{ custId: 2, username: 'test' }, { custId: 3, username: 'test1' }]
            };
            const container = shallow(<RelatedCustomerGrid />).instance();

            // Act
            const actual = container.renderRelatedCustomerColumn(customer);

            // Assert
            expect(toJson(shallow(actual).html())).toMatchSnapshot();
        });

        it('should return as expected when relatedCustomers length is greater than MaximumDisplayRelatedCustomer', () => {
            // Arrange
            const relatedCustomers = [], totalItems = 21;
            for (let i = 0; i < totalItems; i++) {
                relatedCustomers.push({ custId: i + 1, username: `test${i + 1}` });
            }
            const customer = {
                headlineId: 1, headline: 'sa', custId: 1, username: 'sa',
                relatedCustomers
            };
            const container = shallow(<RelatedCustomerGrid />).instance();

            // Act
            const actual = container.renderRelatedCustomerColumn(customer);

            // Assert
            expect(shallow(actual).html()).toMatchSnapshot();
        });
    });

    describe('renderRow', () => {
        it('should return as expected when customer is assigned to group', () => {
            // Arrange
            const customer = { headlineId: 1, headline: 'sa', custId: 1, username: 'sa' };
            const container = shallow(<RelatedCustomerGrid />).instance();
            container.renderRelatedCustomerColumn = jest.fn(() => 'sa1, sa2');

            // Act
            const actual = container.renderRow(customer);

            // Assert
            expect(actual).toEqual(<Row key={1}>
                <Cell>sa</Cell>
                <Cell>sa</Cell>
                <Cell>sa1, sa2</Cell>
            </Row>);
        });

        it('should return as expected when customer is not assign to group', () => {
            // Arrange
            const customer = { headlineId: 0, headline: '', username: 'sa' };
            const container = shallow(<RelatedCustomerGrid />).instance();
            container.renderRelatedCustomerColumn = jest.fn();

            // Act
            const actual = container.renderRow(customer);

            // Assert
            expect(actual).toEqual(<Row key={0}>
                <Cell>Not assign group</Cell>
                <Cell>sa</Cell>
                <Cell />
            </Row>);
        });
    });

    describe('render', () => {
        it('render correctly table title', () => {
            // Act
            const container = shallow(<RelatedCustomerGrid />);

            // Assert
            expect(container.find('div').html()).toEqual('<div class="table-title-v2">List of related customers</div>');
        });

        it('Table props should be mapped correctly', () => {
            // Arrange
            const pagingOption = {
                PageIndex: 1,
                PageSize: 10,
                TotalItem: 4,
                PageList: [10, 20, 50]
            };
            const props = {
                relatedCustomerResults: [
                    { custId: 1, username: 'test', relatedCustomers: [] },
                    { custId: 2, username: 'test1', relatedCustomers: [] },
                    { custId: 3, username: 'test2', relatedCustomers: [] },
                    { custId: 4, username: 'test3', relatedCustomers: [] }
                ]
            };

            // Act
            const container = shallow(<RelatedCustomerGrid {...props} />);

            // Assert
            const table = container.find(Table);

            expect(table.length).toBe(1);
            expect(table.props().width).toBe(772);
            expect(table.props().maxWidth).toBe(772);
            expect(table.props().maxHeight).toBe(300);
            expect(table.props().autoWidth).toBeFalse;
            expect(table.props().isPaging).toBeTrue;
            expect(table.props().pageOption).toEqual(pagingOption);
            expect(table.props().containerPadding).toBe(0);
            expect(table.props().adjustedHeight).toBe(10);
        });
    });
});