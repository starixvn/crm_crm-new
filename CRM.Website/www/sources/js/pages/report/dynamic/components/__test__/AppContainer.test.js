import React from "react";
import { shallow } from "enzyme";
import { AppContainer } from "../AppContainer";
import Filter from "../Filter";
import DataGrid from "../DataGrid";
import Chart from "../Chart";
import FeedbackDetails from "../../../deleted-feedback-statistic/components/FeedbackDetails";

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
                viewChartDialog: { show: true, chartInfo: [{ id: 1, value: 'test' }] }
            };

            const container = shallow(<AppContainer {...props}/>);
        
            // Assert
            expect(container).toMatchSnapshot();
            expect(container.find(Filter).length).toBe(1);
            expect(container.find(DataGrid).length).toBe(1);
            expect(container.find(FeedbackDetails).length).toBe(1);
            expect(container.find(Chart).length).toBe(1);
            expect(container.find(FeedbackDetails).props().feedbackId).toEqual(1);
            expect(container.find(Chart).props().chartInfo).toEqual([{ id: 1, value: 'test' }]);
        });
    });
});