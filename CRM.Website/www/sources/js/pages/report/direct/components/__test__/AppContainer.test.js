import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import Filter from '../Filter';
import DataGrid from '../DataGrid';
import toJson from 'enzyme-to-json';

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    it('should render correctly when gridData null', () => {
        // Arrange
        const props = {
            gridData: null
        };

        // Act
        const container = shallow(<AppContainer {...props} />);

        // Assert
        expect(toJson(container)).toMatchSnapshot();
    });

    it('should render correctly when gridData undefined', () => {
        // Arrange
        const props = {
            gridData: undefined
        };

        // Act
        const container = shallow(<AppContainer {...props} />);

        // Assert
        expect(toJson(container)).toMatchSnapshot();
    });

    it('should render correctly when gridData has data', () => {
        // Arrange
        const props = {
            gridData: {
                customerList: [
                    {
                        bBM: "---",
                        checker: null,
                        countryName: null,
                        currency: "HK$",
                        email: "---",
                        FirstName: "---",
                        headline: null,
                        introducedBy: null,
                        language_name: "English",
                        lastName: "---",
                        line: "---",
                        mSN: "---",
                        mobilePhone: "-----",
                        pIC1: "-------",
                        pIC2: "-------",
                        pIC3: "-------",
                        pIC4: "-------",
                        phone: "-----",
                        phone2: "-----",
                        phone3: "-----",
                        position: "Member",
                        qQ: "---",
                        site: "BEST-ODDS",
                        skype: "---",
                        status: "Closed",
                        username: "0000HK",
                        isVIP: true,
                        weChat: "---",
                        whatsApp: "---",
                        yahoo: null
                    }
                ],
                totalCustomer: 1
            }
        };

        // Act
        const container = shallow(<AppContainer {...props} />);

        // Assert
        expect(container).toMatchSnapshot();
        expect(container.find(Filter).length).toBe(1);
        expect(container.find(DataGrid).length).toBe(1);
    });
});