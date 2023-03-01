import React from 'react';
import { Alert } from 'react-bootstrap';
import FormikErrorMessage from '../FormikErrorMessage';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('FormikErrorMessage', () => {
    it('has correct snapshots', () => {
        // Action
        const component = shallow(<FormikErrorMessage />);

        // Assert
        expect(toJson(component)).toMatchSnapshot();
    });

    describe('componentDidUpdate', () => {
        it('scrolls to top if submitting and there are errors and invalid fields', () => {
          const props = {
            isSubmitting: true,
            errors: {
              username: 'Username is required',
              password: 'Password is required'
            },
            touched: {
              username: true,
              password: true
            },
            fieldNames: ['username', 'password']
          };
      
          const wrapper = shallow(<FormikErrorMessage {...props} />);
          const instance = wrapper.instance();
      
          const mockModal = { scrollTop: 0 };
          jest.spyOn(document, 'querySelector').mockReturnValue(mockModal);
          jest.spyOn(window, 'scrollTo');
      
          instance.componentDidUpdate();
      
          expect(document.querySelector).toHaveBeenCalledWith('.modal');
          expect(mockModal.scrollTop).toBe(0);
          expect(window.scrollTo).not.toHaveBeenCalled();
      
          document.querySelector.mockReturnValue(null);
          instance.componentDidUpdate();
      
          expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
        });
    });

    describe('render', () => {
        it('returns null with empty errors', () => {
            // Arrange
            const props = {
                errors: {}
            };

            // Action
            const component = shallow(<FormikErrorMessage {...props} />);

            // Assert
            expect(component).toBeNull;
        });
        
        it('returns null with empty touched', () => {
            // Arrange
            const props = {
                errors: { value: true },
                touched: {}
            };

            // Action
            const component = shallow(<FormikErrorMessage {...props} />);

            // Assert
            expect(component).toBeNull;
        });

        describe('returns correct component', () => {
            it('has correct Alert', () => {
                // Arrange
                const props = {
                    errors: { value: true },
                    touched: { value: true }
                };
    
                // Action
                const component = shallow(<FormikErrorMessage {...props} />);

                // Assert
                expect(component.find(Alert).props().variant).toBe('danger');
            });

            it('has correct ul', () => {
                // Arrange
                const props = {
                    errors: { value: true },
                    touched: { value: true }
                };
    
                // Action
                const component = shallow(<FormikErrorMessage {...props} />);

                // Assert
                expect(component.find('ul').props().className).toBe('list-message-error');
            });

            it('has ul with correct children', () => {
                // Arrange
                const props = {
                    errors: {
                        value1: 'error1',
                        value2: 'error2'
                    },
                    touched: {
                        value1: 'touched1',
                        value2: 'touched2'
                    },
                    fieldNames: [ 'value1', 'value2' ]
                };

                const expected = props.fieldNames.map(field => <li key={field}>{props.errors[field]}</li>);
    
                // Action
                const component = shallow(<FormikErrorMessage {...props} />);
                component.instance().validateFormikField = jest.fn(() => true);

                // Assert
                expect(component.find('ul').props().children).toEqual(expected);
            });
        });
    });

    describe('validateFormikField', () => {
        it('runs with touched and error is true', () => {
            // Arrange
            const value = 'value';
            const errors = { [value]: true };
            const touched = { [value]: true };
            const component = shallow(<FormikErrorMessage />);

            // Action
            const result = component.instance().validateFormikField(errors, touched, value);

            // Assert
            expect(result).toBeTrue;
        });

        it('runs with touched is false', () => {
            // Arrange
            const value = 'value';
            const errors = { [value]: true };
            const touched = { [value]: false };
            const component = shallow(<FormikErrorMessage />);

            // Action
            const result = component.instance().validateFormikField(errors, touched, value);

            // Assert
            expect(result).toBeFalse;
        });

        it('runs with errors is false', () => {
            // Arrange
            const value = 'value';
            const errors = { [value]: false };
            const touched = { [value]: true };
            const component = shallow(<FormikErrorMessage />);

            // Action
            const result = component.instance().validateFormikField(errors, touched, value);

            // Assert
            expect(result).toBeFalse;
        });
    });
});