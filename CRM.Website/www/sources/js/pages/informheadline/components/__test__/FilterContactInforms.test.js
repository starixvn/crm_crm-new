import React from 'react';
import { shallow } from 'enzyme';
import { Form } from 'react-bootstrap';
import ExcelIcon from '@jsroot/components/ExcelIcon';
import { FilterContactInforms } from '../FilterContactInforms';
import MultipleSelect from '@jsroot/components/multiple-select/index';

describe('FilterContactInforms', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        selectedStatuses: "1,2,3",
        contactInformSettings:{
            filterStatuses: [{ settingId: 1, settingValue: 'test'}]
        },
        contactInforms: [{headlineId: 720, groupId: 12, username: 'test'}],
        titleDetail: {title: 'test', titleId: 125}
    };

    describe('handleChangeFilter', () => {
        it('should call setState exactly when handle change filter', () => {
            // Arrange
            const props = {...initProps};

            // Act
            const container = shallow(<FilterContactInforms {...props}/>);
            const mockEvent = { target: { name: 'stateName', value: 720}}
            container.instance().handleChangeFilter(mockEvent);
           
            // Assert
            expect(container.state().stateName).toBe(720);
        });
    });

    describe('handleChangeStatus', () => {
        it('should call setState exactly when handle change status', () => {
            // Arrange
            const props = {...initProps};

            // Act
            const container = shallow(<FilterContactInforms {...props}/>);
            container.instance().handleChangeStatus("123");
           
            // Assert
            expect(container.state().selectedStatusId).toBe("123");
        });
    });

    describe('contactParams', () => {
        it('should return exactly params when use contact params', () => {
            // Arrange
            const props = {...initProps};

            // Act
            const container = shallow(<FilterContactInforms {...props}/>);
            const actual = container.instance().contactParams();
           
            // Assert
            expect(actual).toEqual({statusId: '1,2,3', titleId: 125, username: ''});
        });
    });

    describe('handleSearch', () => {
        it('should call exactly function when handle search', () => {
            // Arrange
            const props = {
                ...initProps,
                setGridParams: jest.fn(),
                setEditedInforms: jest.fn(),
                getContactInforms: jest.fn()
            };

            // Act
            const container = shallow(<FilterContactInforms {...props}/>);
            container.instance().handleSearch();
           
            // Assert
            expect(props.setGridParams).toHaveBeenCalledWith({pageIndex: 1, pageSize: 100});
            expect(props.setEditedInforms).toHaveBeenCalledWith([]);
            expect(props.getContactInforms).toHaveBeenCalledWith({statusId: '1,2,3', titleId: 125, username: ''});
        });
    });

    describe('handleExportExcel', () => {
        it('should call exactly function when handle export excel', () => {
            // Arrange
            const props = {
                ...initProps,
                exportContactInforms: jest.fn()
            };

            // Act
            const container = shallow(<FilterContactInforms {...props}/>);
            container.instance().handleExportExcel();
           
            // Assert
            expect(props.exportContactInforms).toHaveBeenCalledWith({statusId: '1,2,3', titleId: 125, username: ''});
        });
    });

    describe('render', () => {
        it('should render correctly', () => {
            // Arrange
            const props = {...initProps};

            // Act
            const container = shallow(<FilterContactInforms {...props} />);
            
            // Assert
            expect(container.find(ExcelIcon).length).toBe(1);
        });

        it('should render call exactly function', () => {
            // Arrange
            const props = {...initProps};
            const currentItem = 'currentItem';
            const selectedItemsKey = 'selectedItemsKey';

            // Act
            const container = shallow(<FilterContactInforms {...props} />);
            container.instance().handleChangeFilter = jest.fn();
            container.instance().handleChangeStatus = jest.fn();

            container.find(Form.Control).at(0).simulate('change');
            container.find(MultipleSelect).at(0).simulate('change', currentItem, selectedItemsKey);

            // Assert
            expect(container.instance().handleChangeFilter).toHaveBeenCalled();
            expect(container.instance().handleChangeStatus).toHaveBeenCalledWith(selectedItemsKey);
        });
    });
});