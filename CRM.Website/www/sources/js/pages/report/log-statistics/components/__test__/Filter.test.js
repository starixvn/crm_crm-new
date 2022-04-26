import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Filter } from '../Filter';
import { shallow } from 'enzyme';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import { toast } from 'react-toastify';
import DatePicker from '@jsroot/components/date-picker/index';


describe('Filter', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    beforeAll(() => {
        window.currentClientTime = '4/8/2021 10:05:20 AM';
    });

    const props = {
        settings: {
            communicationTools: [],
            mainCategories: [],
            products: []
        }
    };

    const propsNext = {
        settings: {
            communicationTools: [{
                id: 1005,
                name: "N/A",
            }],
            mainCategories: [{
                mainCategoryID: 3000,
                name: "General Network/Database Issues",
            }],
            products: [{
                id: 46004,
                value: "N/A."
            }]
        },
        setDetailsDataGrid: jest.fn(),
        setGridParams: jest.fn(),
        getMainReport: jest.fn()
    };

    it('render filter component', () => {
        // Arrange
        // Act
        const container = shallow(<Filter {...props} />);

        // Assert
        expect(container).toMatchSnapshot();
    });

    it('should call setState with new toDate when changed input toDate', () => {
        // Arrange
        // Act
        const container = shallow(<Filter {...props} />);
        container.instance().handleChangeToDate('Tue Apr 12 2022 20:26:00 GMT+0700 (Indochina Time)');

        // Assert
        expect(container.instance().state.toDate).toEqual('Tue Apr 12 2022 20:26:00 GMT+0700 (Indochina Time)');
    });


    it('should call setState with new FromDate when changed input FromDate', () => {
        // Arrange
        const fromDate = new Date('Tue Apr 12 2019 00:00:00 GMT+0700 (Indochina Time)');
        const toDate = new Date('2019-07-10T17:00:00.000Z');

        // Act
        const container = shallow(<Filter {...props} />);
        container.instance().handleChangeFromDate(fromDate)

        // Assert
        expect(container.instance().state.fromDate).toEqual(fromDate);
        expect(container.instance().state.toDate).toEqual(toDate);

    });

    it('should call setState with handleChangeDropdown when changed handleChangeDropdown', () => {
        // Arrange
        // Act
        const container = shallow(<Filter {...props} />);
        container.instance().handleChangeDropdown("productIds", "46004,46001,46002,46003,46005,46006,46007,46008");
        // Assert
        expect(container.instance().state.productIds).toBe("46004,46001,46002,46003,46005,46006,46007,46008");
    });

    it('should call setState with handleSettingOptions when render handleSettingOptions ', () => {
        // Arrange
        // Act
        const container = shallow(<Filter {...propsNext} />);
        container.instance().handleSettingOptions (propsNext.settings);
        // Assert
        expect(container.instance().state.productOptions).toEqual([{"checked": true, "id": 46004, "value": "N/A."}]);
        expect(container.instance().state.mainCategoryOptions).toEqual([{"checked": true, "id": 3000, "value": "General Network/Database Issues"}]);
        expect(container.instance().state.communicationToolOptions).toEqual([{"checked": true, "id": 1005, "value": "N/A"}]);
        expect(container.instance().state.productIds).toEqual("46004");
        expect(container.instance().state.mainCategoryIds).toEqual("3000");
        expect(container.instance().state.communicationIds).toEqual("1005");
    });

    it('should call handleSubmit when click submit button with state has data', () => {
        // Arrange
        const container = shallow(<Filter {...propsNext} />);
        // Act
        container.instance().handleSubmit();
        // Assert
        expect(propsNext.setDetailsDataGrid).toHaveBeenCalledWith({show: false});
        expect(propsNext.setGridParams).toHaveBeenCalledWith({
               communicationId: "1005",
               fromDate: "Apr 04, 2021",
               mainCategoryId: "3000",
               productId: "46004",
               toDate: "Apr 08, 2021"
              });
        expect(propsNext.getMainReport).toHaveBeenCalledWith({
            communicationId: "1005",
            fromDate: "Apr 04, 2021",
            mainCategoryId: "3000",
            productId: "46004",
            toDate: "Apr 08, 2021"
           });
    });

    it('should call handleSubmit when click submit button with mainCategories is empty', () => {
        // Arrange
        const propsNext = {
            settings: {
                communicationTools: [],
                mainCategories: [],
                products: [{
                    childSettings: null,
                    displayOrder: -1,
                    grandParentId: 0,
                    id: 46004,
                    isActive: true,
                    isChild: false,
                    name: null,
                    parentId: 0,
                    value: "N/A."
                }]
            }
        };
        const container = shallow(<Filter {...propsNext} />);
        toast.error = jest.fn();
        // Act
        container.instance().handleSubmit();

        // Assert
        expect(toast.error).toHaveBeenCalled();
    });

    it('should call handleSubmit when click submit button with products is empty', () => {
        // Arrange
        const container = shallow(<Filter {...props} />);
        toast.error = jest.fn();
        // Act
        container.instance().handleSubmit();

        // Assert
        expect(toast.error).toHaveBeenCalled();
    });

    it('should call handleSubmit when click submit button with communicationTools is empty', () => {
        // Arrange
        const propsNextHandle = {
            settings: {
                communicationTools: [],
                mainCategories: [{
                    mainCategoryID: 3000,
                    name: "General Network/Database Issues",
                }],
                products: [{
                    id: 46004,
                    value: "N/A."
                }]
            }
        };
        const container = shallow(<Filter {...propsNextHandle} />);
        toast.error = jest.fn();
        // Act
        container.instance().handleSubmit();

        // Assert
        expect(toast.error).toHaveBeenCalled();
    });

    it('should handle onChange mainCategoryIds call exact function', () => {
        // Arrange
        const propsNextHandle = {
            settings: {
                communicationTools: [{
                    id: 1005,
                    name: "N/A",
                }],
                mainCategories: [{
                    mainCategoryID: 3000,
                    name: "General Network/Database Issues",
                }],
                products: [{
                    id: 46004,
                    value: "N/A."
                }]
            }
        };
        const container = shallow(<Filter {...propsNextHandle} />);

         // Action
        container.find(MultipleSelect).at(1).simulate('change', 'mainCategoryIds', '3000');

         // Assert
         expect(container.instance().state.mainCategoryIds).toEqual('3000');
    });

    it('should handle onChange communicationIds call exact function', () => {
        // Arrange
        const propsNextHandle = {
            settings: {
                communicationTools: [{
                    id: 1005,
                    name: "N/A",
                }],
                mainCategories: [{
                    mainCategoryID: 3000,
                    name: "General Network/Database Issues",
                }],
                products: [{
                    id: 46004,
                    value: "N/A."
                }]
            }
        };
        const container = shallow(<Filter {...propsNextHandle} />);

         // Action
        container.find(MultipleSelect).at(2).simulate('change', 'communicationIds', '1005');

         // Assert
         expect(container.instance().state.communicationIds).toEqual('1005');
    });

    it('should handle onChange productIds call exact function', () => {
        // Arrange
        const container = shallow(<Filter {...propsNext} />);

         // Action
        container.find(MultipleSelect).at(0).simulate('change', 'productIds', '46004');

         // Assert
         expect(container.instance().state.productIds).toEqual('46004');
    });

    it('should handle onChange fromDate call exact function', () => {
        // Arrange
        const container = shallow(<Filter {...props} />);
        const fromDate = new Date("Apr 04, 2021");
         // Action
        container.find(DatePicker).at(0).simulate('change',fromDate);

         // Assert
         expect(container.instance().state.fromDate).toEqual(fromDate);
    });

    it('should handle onChange toDate call exact function', () => {
        // Arrange
        const container = shallow(<Filter {...props} />);
        const toDate = new Date("Apr 04, 2021");
         // Action
        container.find(DatePicker).at(1).simulate('change',toDate);

         // Assert
         expect(container.instance().state.toDate).toEqual(toDate);
    });
});