import React from 'react';
import { shallow } from 'enzyme';
import { Filter } from '../Filter';

describe('Filter', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('getParams ', () => {
        it('should return exact param', () => {
            // Arrange
            const container = shallow(<Filter />);

            //Act
            const actual = container.instance().getParams(20);
            // Assert
            expect(actual).toEqual({top: 20});
        });
    });

    describe('renderOptions ', () => {
        it('return expected result', () => {
            // Arrange
            const item = {
                id: 1, name: 'test'
            };
            const expected = <option key="0" value={item}>{item}</option>;

            //Act
            const container = shallow(<Filter />);
            const actual = container.instance().renderOptions(item, "0");

            // Assert
            expect(actual).toEqual(expected);
        });
    });

    describe('handleTopChange', () => {
        it('should call exact function', () => {
            // Arrange
            const props = {
                setGridParams: jest.fn(),
                getLatestFeedback: jest.fn()
            };
            const event = { target: {value: 1} };

            const container = shallow(<Filter {...props} />);
            container.instance().getParams = jest.fn().mockReturnValue({top: 1});

            //Act
            const actual = container.instance().handleTopChange(event);
            // Assert
            expect(props.setGridParams).toHaveBeenCalledWith({top: 1});
            expect(props.getLatestFeedback).toHaveBeenCalledWith({top: 1});
        });
    });
});

