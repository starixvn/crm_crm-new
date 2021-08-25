import React from 'react';
import { EditContactInforms } from '../EditContactInforms';
import { shallow } from 'enzyme';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import FilterContactInforms from '../FilterContactInforms';
import DataGridEdit from '../DataGridEdit';

describe('EditContactInforms', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        titleId: 720,
        getTitleDetail: jest.fn(),
        getContactInformSettings: jest.fn(),
        contactInformSettings:{
            filterStatuses: [{ settingId: 1, settingValue: 'test'}]
        },
        contactInforms: [{headlineId: 720, groupId: 12, username: 'test'}],
        getContactInforms: jest.fn(),
        setGridParams: jest.fn()
    };

    describe('componentDidMount', () => {
        it('should call functions api', async () => {
            // Arrange
            const props = {...initProps};

            //Act
            const container = shallow(<EditContactInforms {...props} />);

            // Assert
            expect(await props.getTitleDetail).toHaveBeenCalledWith({titleId: 720});
            expect(await props.getContactInformSettings).toHaveBeenCalled();
            expect(await props.getContactInforms).toHaveBeenCalledWith({
                titleId: 720,
                username: '', statusId: '1',
                pageIndex: 1, pageSize: 10000
            });
            expect(props.setGridParams).toHaveBeenCalledWith({ pageIndex: 1,pageSize: 100 });
            expect(container.state().totalContactInform).toBe(1);
        });
    });

    describe('handleChangeStatus', () => {
        it('should call setState exactly when handle change status', () => {
            // Act
            const container = shallow(<EditContactInforms />);
            container.instance().handleChangeStatus(123);
           
            // Assert
            expect(container.state().selectedStatusId).toBe(123);
        });
    });

    describe('handleChangeFilter', () => {
        it('should call setState exactly when handle change filter', () => {
            // Act
            const container = shallow(<EditContactInforms />);
            const mockEvent = { target: { name: 'stateName', value: 720}}
            container.instance().handleChangeFilter(mockEvent);
           
            // Assert
            expect(container.state().stateName).toBe(720);
        });
    });

    describe('handleSearch', () => {
        it('should call exactly functions when handle search', async () => {
            // Arrange
            const props = {...initProps};

            // Act
            const container = shallow(<EditContactInforms {...props}/>);
            container.instance().handleSearch();
           
            // Assert
            expect(await props.getContactInforms).toHaveBeenCalledWith({ 
                titleId: 720,
                username: '', statusId: '',
                pageIndex: 1, pageSize: 10000
            });
            expect(props.setGridParams).toHaveBeenCalledWith({ pageIndex: 1, pageSize: 100 });
            expect(container.state().totalContactInform).toBe(1);
        });
    });

    describe('onPaging', () => {
        it('should call exactly functions when onPaging', () => {
            // Arrange
            const props = {...initProps};

            // Act
            const container = shallow(<EditContactInforms {...props}/>);
            container.instance().onPaging(1,100);
           
            // Assert
            expect(props.setGridParams).toHaveBeenCalledWith({ pageIndex: 1, pageSize: 100 });
            expect(props.getContactInforms).toHaveBeenCalledWith({
                titleId: 720,
                username: '', statusId: '',
                pageIndex: 1, pageSize: 100
            });
        });
    });

    describe('setAlert', () => {
        it('should call exactly functions when save', () => {
            // Arrange
            const props = {
                ...initProps,
                resultUpdateContactInforms: 'Successfully!'
            };
            jest.useFakeTimers();
            // Act
            const container = shallow(<EditContactInforms {...props}/>);
            container.instance().setAlert();
           
            // Assert
            expect(container.state().saveResult).toBe('Successfully!');
            expect(setTimeout).toHaveBeenCalledTimes(1);
        });
    });

    describe('handleSubmit', () => {
        it('should call exactly functions when submit', async () => {
            // Arrange
            const props = {
                ...initProps,
                updateContactInforms: jest.fn()
            };

            // Act
            const container = shallow(<EditContactInforms {...props}/>);
            container.instance().handleSubmit();
           
            // Assert
            expect(props.updateContactInforms).toHaveBeenCalledWith({ titleId: 720, informs: [] });
        });

        it('should call exactly functions with state', async () => {
            // Arrange
            const props = {
                ...initProps,
                updateContactInforms: jest.fn()
            };
            const expected = [{headlineId: 720, groupId: 12, username: 'test', remark: '&amp;t'}];

            // Act
            const container = shallow(<EditContactInforms {...props}/>);
            container.setState({informs: [{headlineId: 720, groupId: 12, username: 'test', remark: '&t'}]})
            container.instance().handleSubmit();
           
            // Assert
            expect(props.updateContactInforms).toHaveBeenCalledWith({ titleId: 720, informs: expected });
        });
    });

    describe('htmlDecode', () => {
        it('should call exactly functions when submit with remark', () => {
            // Arrange
            const props = {...initProps};

            // Act
            const container = shallow(<EditContactInforms {...props}/>);
            const remark = container.instance().htmlDecode("&test");
           
            // Assert
            expect(remark).toBe("&amp;test");
        });
    });

    describe('handleChangeDataGrid', () => {
        it('should call setState replace exits exactly when handle change', () => {
            // Arrange
            const props = {
                ...initProps,
                updateContactInforms: jest.fn()
            };

            // Act
            const container = shallow(<EditContactInforms {...props}/>);
            const mockEvent = { target: { name: 'statuses', value: 'Done'}}
            container.instance().handleChangeDataGrid(mockEvent, 720);
           
            // Assert
            expect(container.state().informs).toEqual([
                { groupId: 12, headlineId: 720, statuses: "Done", username: "test" }
            ]);
        });

        it('should call setState replace exits exactly when handle change', () => {
            // Arrange
            const props = { ...initProps };

            // Act
            const container = shallow(<EditContactInforms {...props}/>);
            const mockEvent = { target: { name: 'statuses', value: 'Done'}}
            container.setState({informs: [{ groupId: 12, headlineId: 720, username: "test" }]})
            container.instance().handleChangeDataGrid(mockEvent, 720);
           
            // Assert
            expect(container.state().informs).toEqual([
                { groupId: 12, headlineId: 720, statuses: "Done", username: "test" }
            ]);
        });
    });

    describe('handleExportExcel', () => {
        it('should call exactly functions when handle export excel', () => {
            // Arrange
            const props = {
                ...initProps, 
                exportContactInforms: jest.fn()
            };

            // Act
            const container = shallow(<EditContactInforms {...props}/>);
            container.instance().handleExportExcel();
           
            // Assert
            expect(props.exportContactInforms).toHaveBeenCalledWith({ 
                titleId: 720,
                username: '', statusId: '',
                pageIndex: 1, pageSize: 10000 
            });
        });
    });

    describe('renderForm', () => {
        it('should render correctly', () => {
            // Arrange
            const props = {
                ...initProps,
                titleDetail: "test"
            };

            // Act
            const container = shallow(<EditContactInforms {...props} />);

            // Assert
            expect(container).toMatchSnapshot();
            expect(container.find(FilterContactInforms).length).toBe(1);
            expect(container.find(DataGridEdit).length).toBe(1);
        });
    });

    describe('renderExportExcelText', () => {
        it('should call exactly function', () => {
            // Act
            const props = {...initProps};
            const container = shallow(<EditContactInforms {...props}/>).instance();
            container.handleExportExcel = jest.fn();
            const actual = shallow(container.renderExportExcelText());

            // Assert
            expect(actual.find('span').length).toBe(2);
        });
    });
});