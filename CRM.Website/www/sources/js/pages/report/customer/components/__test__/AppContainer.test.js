import React from "react";
import { shallow } from "enzyme";
import { AppContainer } from "../AppContainer";
import toJson from 'enzyme-to-json';

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        getAllSettings: jest.fn(),
        allSettings: { currencies: [{ id: 1, value: 'um' }] }
    };

    describe('componentDidMount', () => {
        it('should call props function', () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<AppContainer {...props}/>);

            // Act
            container.instance().componentDidMount();

            // Assert
            expect(props.getAllSettings).toHaveBeenCalled();
        });
    });

    describe('render', () => {
        it('should render null when allSettings is null', () => {
            // Arrange
            const props = {
                ...initProps,
                allSettings: null
            };
            const container = shallow(<AppContainer {...props}/>);
        
            // Assert
            expect(container.type()).toEqual(null);
        });

        it('should render correctly', () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<AppContainer {...props}/>);
        
            // Assert
            expect(toJson(container)).toMatchSnapshot();
        });
    });
});