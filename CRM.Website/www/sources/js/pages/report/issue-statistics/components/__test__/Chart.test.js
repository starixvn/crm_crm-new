import React from 'react';
import Chart from '../Chart';
import { shallow } from 'enzyme';
import { Modal } from 'react-bootstrap';

describe('Chart', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });
   const props = {
        chartInfo: {
            name: 'test',
            childReports: [{
                childReports: [{
                    shortName: "11:00 - 11:59",
                    numberOfIssues: 3,
                    childReports: [
                        { numberOfIssues: 1}
                    ]}
                ],
                countryInfo: {id: 1, name: 'Antigua & Barbuda'},
                shortName: 'Feb 28, 2022', numberOfIssues: 1
            }],
            total: {shortName: 'grandTotal', childReports: [{countryInfo: {id: 1, name: 'Antigua & Barbuda'}}]
        } 
        },
        onClose: jest.fn()
   };

    it('render chart component', () => {
        // Arrange
        const expectedLabels = ["Antigua & Barbuda"];
        const expectedData = [
            { 'Antigua & Barbuda': 1, name: "Feb 28, 2022 - 11:00 - 11:59"}
        ];


        // Act
        const container = shallow(<Chart {...props} />);
        const labels = container.instance().getLabels(props.chartInfo);
        const data = container.instance().getDataChart(props.chartInfo);

        // Assert
        expect(container).toMatchSnapshot();
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