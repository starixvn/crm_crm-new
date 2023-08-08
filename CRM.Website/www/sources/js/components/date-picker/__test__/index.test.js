import React from 'react';
import Index from '../index';
import { shallow } from 'enzyme';
import DateTimeService from '@jsroot/common/dateTimeService';
import toJson from 'enzyme-to-json';

describe('index', () => {
    it('should have correct snapshots', () => {
        // Action
        const index = shallow(<Index />);

        // Assert
        expect(toJson(index)).toMatchSnapshot();
    });

    describe('componentDidUpdate', () => {
        it('should set exact state', () => {
            // Arrange
            const props = {
                selected: 'selected'
            };

            const prevProps = {
                selected: 'selected1'
            };

            // Action
            const index = shallow(<Index {...props} />);
            index.instance().componentDidUpdate(prevProps);
            // Assert
            expect(index.instance().state.selected).toEqual('selected');
        });
    });

    describe('handleClickDone', () => {
        it('should call exact function', () => {
            // Arrange
            const props = {
                onChange: jest.fn()
            };
            DateTimeService.toLongDateTimeFormat = jest.fn(() => new Date());
            DateTimeService.toClientDateTime = jest.fn(() => new Date());
            // Action
            const index = shallow(<Index {...props} />).instance();
            index.setState = jest.fn();

            index.handleTimeNow();

            // Assert
            expect(index.setState).toHaveBeenCalled();
        });
    });

    describe('handleClickDone', () => {
        it('should call exact function', () => {
            // Arrange
            const props = {
                onChange: jest.fn()
            };
            const state = {
                selected: 'selected'
            };

            // Action
            const index = shallow(<Index {...props} />).instance();
            index.ref = {
                current: {setOpen: jest.fn()}
            };
            index.setState(state);
            index.handleClickDone();

            // Assert
            expect(props.onChange).toHaveBeenCalledWith(state.selected);
            expect(index.ref.current.setOpen).toHaveBeenCalled();
        });
    });
});