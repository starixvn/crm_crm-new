import React from 'react';
import { Alert } from 'react-bootstrap';
import ResponseMessage from '../ResponseMessage';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('ResponseMessage', () => {
    it('has correct snapshots', () => {
        // Action
        const component = shallow(<ResponseMessage />);

        // Assert
        expect(toJson(component)).toMatchSnapshot();
    });

    describe('componentDidMount', () => {
        it('should call exact function', () => {
            const props = {
                message: 'message'
            };

            // Action
            const component = shallow(<ResponseMessage {...props} />).instance();
            component.handleScrollToTop = jest.fn();
            component.componentDidMount();
            // Assert
            expect(component.handleScrollToTop).toHaveBeenCalled();

        });
    });

    describe('componentDidUpdate', () => {
        it('should call exact function', () => {
            const props = {
                message: 'message'
            };

            // Action
            const component = shallow(<ResponseMessage {...props} />).instance();
            component.handleScrollToTop = jest.fn();
            component.componentDidUpdate();
            // Assert
            expect(component.handleScrollToTop).toHaveBeenCalled();

        });
    });

    describe('render', () => {
        it('has regular children', () => {
            const props = {
                message: 'message'
            };

            // Action
            const component = shallow(<ResponseMessage {...props} />);

            // Assert
            expect(component.find(Alert).props().className).toBe('d-flex');
            expect(component.find('div')).toHaveLength(2);
            expect(component.find('div').at(1).html()).toBe(`<div class="ml-2 d-inline">${props.message}</div>`);
        });

        it('has correct children when is successful', () => {
            // Arrange
            const props = {
                isSuccessful: true,
                message: 'message'
            };

            // Action
            const component = shallow(<ResponseMessage {...props} />);

            // Assert
            expect(component.find(Alert).props().variant).toBe('success');
            expect(component.find('i').props().className).toBe('fa fa-check');
        });

        it('has correct children when is not successful', () => {
            // Arrange
            const props = {
                isSuccessful: false,
                message: 'message'
            };

            // Action
            const component = shallow(<ResponseMessage {...props} />);

            // Assert
            expect(component.find(Alert).props().variant).toBe('danger');
            expect(component.find('i').props().className).toBe('fa fa-exclamation-triangle');
        });

        it('has correct children when not having message', () => {
            // Arrange
            const message = 'message';
            const props = {
                isSuccessful: false,
                messages: [message]
            };

            const expected = <Alert variant={'danger'} className='d-flex flex-column'>
                <div className='d-flex' key={0}>
                    <div className='d-inline'><i className='fa fa-exclamation-triangle' /></div>
                    <div className='ml-2 d-inline'>{message}</div>
                </div>
            </Alert>;

            // Action
            const component = shallow(<ResponseMessage {...props} />);

            // Assert
            expect(component.props().variant).toBe('danger');
            expect(component.props().className).toBe('d-flex flex-column');
            expect(component.find('div').at(0).props().className).toBe('d-flex');
            expect(component.find('div').at(1).html()).toBe('<div class="d-inline"><i class="fa fa-exclamation-triangle"></i></div>');
            expect(component.find('div').at(2).html()).toBe(`<div class="ml-2 d-inline">${message}</div>`);
        });
    });
});
