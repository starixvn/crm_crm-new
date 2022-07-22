import React from 'react';
import BreadcrumbTime from '../BreadcrumbTime';
import { shallow } from 'enzyme';

beforeAll(() => {
    jest.useFakeTimers();
});

afterAll(() => {
    jest.clearAllMocks();
});

describe('componentWillUnmount', () => {
    it('should clearInterval', () => {
        const container = shallow(<BreadcrumbTime />);

        // Action
        container.instance().componentWillUnmount();

        // Assert
        expect(clearInterval).toHaveBeenCalledWith(expect.any(Number));
    });
});