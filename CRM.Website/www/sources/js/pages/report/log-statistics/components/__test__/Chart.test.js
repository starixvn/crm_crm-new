import React from 'react';
import { Chart } from '../Chart';
import { shallow } from 'enzyme';

describe('Chart', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    const props = {
        chart: {
            title: "Licensee Daily Customer Complaints/Enquiries From Apr 01, 2021-Jun 30, 2021",
            data: {
                communicationColumns: [{ id: 1000, name: "Phone" }],
                excelFileName: "MBC_Daily_Log_Statistics_Apr_01_2021_Jun_30_2021",
                grandTotalOfCommunicationCount: [0, 0, 0, 0, 0],
                grandTotalOfCommunicationSumByProduct: [1, 2, 3, 4, 5],
                id: 0,
                mainCategories: [{
                    id: 3000,
                    listOfCommunicationCount: [0, 0, 0, 0, 0, 0],
                    listOfCommunicationSumByProduct: [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    name: "General Network/Database Issues",
                    subCategories: [{
                        id: 4000,
                        listOfCommunicationCount: [0, 0, 0, 0, 0, 0],
                        listOfCommunicationSumByProduct: [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        name: "Agency Site Network Issue"
                    }]
                }],
                name: "MBC Daily Log Statistics | Apr 01, 2021 - Jun 30, 2021",
                productColumns: [{id: 46000, name: "Sportsbook"}]
            }
        },
        onClose: jest.fn()
    }

    it('should call render Chart', () => {
        // arrange            
        const container = shallow(<Chart  {...props} />).instance(); 
        container.renderChart = jest.fn();       
        // Act
        container.render();
        // Assert
        expect(container.renderChart).toHaveBeenCalled();
    });

    it('modal onHide should call exact function', () => {
        // Arrange
        const container = shallow(<Chart {...props}/>).instance();
        // Act
        const render = shallow(container.render());
        render.find('Modal').at(0).simulate('hide',false);
        // Assert 
        expect(props.onClose).toHaveBeenCalled();
    });
});