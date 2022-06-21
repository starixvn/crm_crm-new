import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import toJson from 'enzyme-to-json';

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('componentDidMount', () => {
        it('should call getAllSettings', () => {
            // Arrange
            const props = {
                getAllSettings: jest.fn()
            };

            //Act
            shallow(<AppContainer {...props} />);

            // Assert
            expect(props.getAllSettings).toHaveBeenCalled();
        });
    });


    describe('handleCloseChartDialog', () => {
        it('should call exactly functions when close chart', () => {
            // Arrange
            const props = {
                setChartData: jest.fn(),
                getAllSettings: jest.fn()
            };
            // Act
            const container = shallow(<AppContainer {...props}/>);
            container.instance().handleCloseChartDialog(true);
           
            // Assert
            expect(props.setChartData).toHaveBeenCalledWith({ show: false, data: null });
        });
    });


    describe('render', () => {
        it('should render correctly', () => {
            // Arrange
            const props = {
                getAllSettings: jest.fn(),
                chart: { show: true},
                settings: {mainCategories: {id: 1, name: 'mainCategory'}}
            };

            // Act
            const container = shallow(<AppContainer {...props} />);

            // Assert
            expect(toJson(container)).toMatchSnapshot();
        });
    });
    
});