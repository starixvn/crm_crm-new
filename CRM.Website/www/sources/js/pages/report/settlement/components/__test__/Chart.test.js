import React from 'react';
import { Chart } from '../Chart';
import { shallow } from 'enzyme';
import { Modal } from 'react-bootstrap';

describe('Chart', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });
    const childReport = {
        id: 0,
        name: "Oct",
        numberOfIssues: 5,
        childReports: [
            {
                id: 10,
                name: "Italy",
                numberOfIssues: 2
            },
            {
                id: 10,
                name: "Italy",
                numberOfIssues: 1
            },
            {
                id: 0,
                name: "N/a",
                numberOfIssues: 2
            }
        ]
    };
    const chartInfo = {
        name: "Settlement Issues Report For Year 2019",
        numberOfIssues: 10,
        childReports: [
            childReport,
            { ...childReport, name: "Nov" }
        ]
    };

    it('render chart component', () => {
        // Arrange
        const expectedLabels = ["Italy", "N/a"];
        const expectedData = [
            { name: "Oct", "Italy": 3, "N/a": 2 },
            { name: "Nov", "Italy": 3, "N/a": 2 }
        ];
        const props = {
            gridData: {
                chartInfo
            }
        };

        // Act
        const container = shallow(<Chart {...props} />);
        const labels = container.instance().getLabels(chartInfo.childReports);
        const data = container.instance().convertDataChart(chartInfo.childReports);

        // Assert
        expect(container).toMatchSnapshot();
        expect(data).toEqual(expectedData);
        expect(labels).toEqual(expectedLabels);
    });

    it('should close chart popup when click close button', () => {
        // Arrange
        const props = {
            gridData: {
                chartInfo
            },
            setChartPopup: jest.fn()
        };
        const container = shallow(<Chart {...props} />);

        // Act
        container.find(Modal).props().onHide();

        // Assert
        expect(props.setChartPopup).toHaveBeenCalledWith({ show: false });
    });
});