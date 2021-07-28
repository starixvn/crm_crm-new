import React from 'react';
import { shallow } from 'enzyme';
import { RelatedCustomerGrid } from '../RelatedCustomerGrid';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';

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

    describe('renderRow', () => {
        it('should return as expected when customer is assigned to group', () => {
            // Arrange
            const customer = { headlineId: 1, headline: 'sa', username: 'sa' };
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
});