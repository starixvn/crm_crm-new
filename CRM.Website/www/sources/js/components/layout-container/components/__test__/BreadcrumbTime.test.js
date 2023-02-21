import React from 'react';
import BreadcrumbTime from '../BreadcrumbTime';
import { shallow } from 'enzyme';

beforeAll(() => {
    jest.useFakeTimers();
});

afterAll(() => {
    jest.clearAllMocks();
});

describe('componentDidMount', () => {
    it('should clearInterval', () => {
        jest.useFakeTimers();
        const state = {
            time: new Date()
        };
        const container = shallow(<BreadcrumbTime />);
        container.instance().setState(state);
        // Action
        container.instance().componentDidMount();
        
        jest.advanceTimersByTime(1000);

        // Assert
        expect(container.instance().state).not.toBe(state.time);
    });
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