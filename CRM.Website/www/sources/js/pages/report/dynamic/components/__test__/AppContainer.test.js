import React from "react";
import { shallow } from "enzyme";
import { AppContainer } from "../AppContainer";
import toJson from 'enzyme-to-json';

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('handleCloseViewCommunication', () => {
        it('should call exactly props function', () => {
            // Arrange
            const props = { setViewCommunicationDialog: jest.fn() };

            const container = shallow(<AppContainer {...props}/>);

            // Act
            container.instance().handleCloseViewCommunication();

            // Assert
            expect(props.setViewCommunicationDialog).toHaveBeenCalledWith({show: false});
        });
    });

    describe('handleCloseViewChart', () => {
        it('should call exactly props function', () => {
            // Arrange
            const props = { setViewChartDialog: jest.fn() };

            const container = shallow(<AppContainer {...props}/>);

            // Act
            container.instance().handleCloseViewChart();

            // Assert
            expect(props.setViewChartDialog).toHaveBeenCalledWith({show: false});
        });
    });

    describe('render', () => {
        it('should render correctly', () => {
            // Arrange
            const props = {
                viewCommunicationDialog: { show: true, feedbackId: 1 },
                viewChartDialog: { show: true, chartInfo: [{ id: 1, value: 'test' }] },
                gridParams: { reportType: 1 }
            };

            const container = shallow(<AppContainer {...props}/>);
        
            // Assert
            expect(toJson(container)).toMatchSnapshot();
        });
    });
});