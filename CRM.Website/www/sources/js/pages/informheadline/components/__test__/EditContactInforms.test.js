import React from 'react';
import { EditContactInforms } from '../EditContactInforms';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Site from '@jsroot/common/site';

describe('EditContactInforms', () => {
    beforeAll(() => {
        Site.blockUI = jest.fn();
        Site.unblockUI = jest.fn();
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    const response = { data: { filterStatuses: [{ settingId: 1, settingValue: 'test'}] } };
    const promise = Promise.resolve(response);

    const initProps = {
        titleId: 720,
        getTitleDetail: jest.fn(),
        contactInformSettings:{
            filterStatuses: [{ settingId: 1, settingValue: 'test'}]
        },
        contactInforms: [{headlineId: 720, groupId: 12, username: 'test'}],
        getContactInforms: jest.fn(),
        setGridParams: jest.fn(),
        editedInforms: [{ headlineId: 1234, groupId: 122, remark: '&test'}],
        getContactInformSettings: jest.fn(() => promise)
    };

    describe('componentDidMount', () => {
        it('should call functions api', async () => {
            // Arrange
            const response = { data: { filterStatuses: [{ settingId: 1, settingValue: 'test'}] } };
            const promise = Promise.resolve(response);
            const props = {...initProps};

            //Act
            const container = shallow(<EditContactInforms {...props} />);
            container.instance().componentDidMount();
            await promise;
            jest.runAllTimers();

            // Assert
            expect(props.getContactInformSettings).toHaveBeenCalled();
            expect(container.state().selectedStatuses).toBe('1');
            expect(props.getTitleDetail).toHaveBeenCalledWith({titleId: 720});
            expect(props.getContactInforms).toHaveBeenCalledWith({
                titleId: 720,
                username: '', statusId: '1'
            });
        });
    });

    describe('setAlert', () => {
        it('should call exactly functions when save', () => {
            // Arrange
            const props = {
                ...initProps,
                resultEditContactInforms: 'Successfully!'
            };
            jest.useFakeTimers();
            // Act
            const container = shallow(<EditContactInforms {...props}/>);
            container.instance().setState({
                contactInformSettings: { filterStatuses: [{ settingId: 1, settingValue: 'test'}] }
            });
            container.instance().setAlert();
           
            // Assert
            expect(container.state().saveResult).toBe('Successfully!');
            expect(setTimeout).toHaveBeenCalledTimes(1);
        });
    });

    describe('handleSubmit', () => {
        it('should call exactly functions when submit', async () => {
            // Arrange
            const promise = Promise.resolve({});
            const props = {
                ...initProps,
                titleDetail: {titleId: 123},
                editContactInforms: jest.fn(() => promise)
            };

            // Act
            const container = shallow(<EditContactInforms {...props}/>);
            container.instance().setState({
                contactInformSettings: { filterStatuses: [{ settingId: 1, settingValue: 'test'}] }
            });
            container.instance().handleSubmit();
            await promise;

            // Assert
            expect(props.editContactInforms).toHaveBeenCalledWith({ titleId: 123, informs: [{ headlineId: 1234, groupId: 122, remark: '&amp;test'}] });
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
            container.instance().setState({
                contactInformSettings: { filterStatuses: [{ settingId: 1, settingValue: 'test'}] }
            });
            container.setState({saveResult: {isSuccessful: true}})
            
            // Assert
            expect(toJson(container)).toMatchSnapshot();
        });

        it('should render null', () => {
            // Arrange
            const props = {
                ...initProps,
                titleDetail: null,
                contactInforms: null
            };

            // Act
            const container = shallow(<EditContactInforms {...props} />);
            container.instance().setState({
                contactInformSettings: { filterStatuses: [{ settingId: 1, settingValue: 'test'}] }
            });
            
            // Assert
            expect(toJson(container)).toMatchSnapshot();
        });
    });

    describe('render', () => {
        it('should render null when some props is null', () => {
            // Arrange
            const props = {
                ...initProps,
                titleDetail: null,
                contactInforms: null
            };

            const container = shallow(<EditContactInforms {...props}/>);
            container.instance().setState({
                contactInformSettings: { filterStatuses: [{ settingId: 1, settingValue: 'test'}] }
            });

            // Assert
            expect(container.type()).toEqual(null);
        });
    });
});