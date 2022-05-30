import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Filter } from '../Filter';
import { shallow } from 'enzyme';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import toJson from 'enzyme-to-json';

describe('Filter', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    it('render filter component', () => {
        // Arrange
        const props = {
            allSettingData: {
                yearRange: [{ value: 2022 }],
                siteTypes: [{ id: 0 }],
                categories: [{ mainCategoryID: 3000, name: "General Network/Database Issues" }]
            }
        };

        // Act
        const container = shallow(<Filter {...props} />);

        // Assert
        expect(toJson(container)).toMatchSnapshot();
    });

    it('componentDidMount should run correctly', () => {
        const props = {           
            allSettingData: {
                yearRange: [{ value: 2022 }],
                siteTypes: [{ id: 0 }],
                categories: [{ mainCategoryID: 3000, name: "General Network/Database Issues" }]
            }
        };
        const expected = {
            categories: "3000",
            categoryOptions: [
                {
                    checked: true,
                    mainCategoryID: 3000,
                    name: "General Network/Database Issues",
                },
            ],
            siteOptions: [
                {
                    id: 0,
                },
            ],
            siteType: 0,
            year: 2022
        }
        const handleSettingOptions = jest.fn();
        document.addEventListener = jest.fn();
        const container = shallow(<Filter {...props} />);
        container.instance().handleSettingOptions = handleSettingOptions;

        // Action
        container.instance().componentDidMount();

        // Assert
        expect(container.instance().state).toEqual(expected);
    });

    it('should call getGridData when click submit button', () => {
        // Arrange
        const props = {
            getGridData: jest.fn(),
            setGridParams: jest.fn(),         
            allSettingData: {
                yearRange: [{ value: 2022 }],
                siteTypes: [{ id: 0 }],
                categories: [{ mainCategoryID: 3000, name: "General Network/Database Issues" }]
            }
        };
        const expected = {
            year: 2022,
            categories:'3000',
            siteType: 0
        }
        const container = shallow(<Filter {...props} />);

        // Act
        container.find(Button).props().onClick({ preventDefault: jest.fn() });

        // Assert
        expect(props.getGridData).toHaveBeenCalledWith(expected);
    });

    it('should call setState with new siteType when selected input siteType', () => {
        // Arrange
        const props = {
            allSettingData: {
                yearRange: [{ value: 2022 }],
                siteTypes: [{ id: 1 }],
                categories: [{ mainCategoryID: 3000, name: "General Network/Database Issues" }]
            }
        };
        const event = {
            target: { value: 0 }
        };

        // Act
        const container = shallow(<Filter {...props} />);
        container.find(Form.Control).at(1).simulate('change', event);

        // Assert
        expect(container.instance().state.siteType).toBe(0);
    });

    it('should call setState with new year when selected input year', () => {
        // Arrange
        const props = {
            allSettingData: {
                yearRange: [{ value: 2021 }],
                siteTypes: [{ id: 1 }],
                categories: [{ mainCategoryID: 3000, name: "General Network/Database Issues" }]
            }
        };
        const event = {
            target: { value: 2020 }
        };

        // Act
        const container = shallow(<Filter {...props} />);
        container.find(Form.Control).at(0).simulate('change', event);

        // Assert
        expect(container.instance().state.year).toBe(2020);
    });   

    it('should handle onChange categories call exact function', () => {
        // Arrange
        const props = {
            allSettingData: {
                yearRange: [{ value: 2021 }],
                siteTypes: [{ id: 1 }],
                categories: [{ mainCategoryID: 3000, name: "General Network/Database Issues" }]
            }
        };
        const container = shallow(<Filter {...props} />);

         // Action
        container.find(MultipleSelect).at(0).simulate('change', 'currentItem', '3004');

         // Assert
         expect(container.instance().state.categories).toEqual('3004');
    });
});