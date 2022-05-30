import React from 'react';
import Chart from '../Chart';
import { shallow } from 'enzyme';
import { Modal } from 'react-bootstrap';
import toJson from 'enzyme-to-json';

describe('Chart', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });
   const props = {
        chartInfo: {
            feedbackCategories: [{
                id: 3024,
                name: 'Special Notification',
                feedbackSubcategories: [{
                    id: 4352,
                    name: 'Abnormal Account',
                    resolves: [5],
                    total: 5
                }],
                subTotal: {id: 0, name: null, resolves: [5], total: 5}
            }],
            grandTotals: [5],
            usernames: [{id: 10278938, name: 'starixIT'}],
            title: "Feedback Statistics Report from Mar 22, 2022 to Mar 25, 2022",
            totalItems: 1
        }, 
        onClose: jest.fn()
   };

    it('render chart component', () => {
        // Arrange
        const expectedLabels = ['starixIT'];
        const expectedData = [
            { 'starixIT': 5, name: 'Special Notification'}
        ];


        // Act
        const container = shallow(<Chart {...props} />);
        const labels = container.instance().getLabels(props.chartInfo);
        const data = container.instance().getDataChart(props.chartInfo);

        // Assert
        expect(toJson(container)).toMatchSnapshot();
        expect(data).toEqual(expectedData);
        expect(labels).toEqual(expectedLabels);
    });

    it('should close chart popup when click close button', () => {
        // Arrange
        const container = shallow(<Chart {...props} />);

        // Act
        container.find(Modal).props().onHide();

        // Assert
        expect(props.onClose).toHaveBeenCalled();
    });
});