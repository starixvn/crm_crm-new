import React from 'react';
import { NewInforms } from '../NewInforms';
import { shallow } from 'enzyme';
import FilterEditInforms from '../FilterEditInforms';
import DataGridEdit from '../DataGridEdit';
import ResponseMessage from '@jsroot/components/ResponseMessage';

describe('NewInforms', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        allSettings: {
            currencies: [{id: 1, name: 'test'},{id: 2, name: 'test'},{id: 3, name: 'test'},{id: 4, name: 'test'}],
            sites: [{childSites: [{id: 1, name: '123'},{id: 2, name: '123'},{id: 3, name: '123'},{id: 4, name: '123'}]}]
        },
        getAllSettings: jest.fn(),
        getNewInforms: jest.fn(),
        editedInforms: [{headlineId: 720, groupId: 12, username: 'test', remark: '&t'}],
        newInforms: [{headlineId: 720, groupId: 12, username: 'test'}],
        filterData: {values: {currencies: '1,2'}, errors: {}},
        setFilterData: jest.fn()
    };

    describe('setAlert', () => {
        it('should call exactly functions when setAlert', () => {
            // Arrange
            const props = {
                ...initProps,
                resultInsertInforms: 'Successfully!',
                getInforms: jest.fn(),
                setNewInformDialog: jest.fn()
            };
            jest.useFakeTimers();
            // Act
            const container = shallow(<NewInforms {...props}/>);
            container.instance().setAlert();
            setTimeout(props.getInforms, 3000);
           
            // Assert
            expect(container.state().saveResult).toBe('Successfully!');
            expect(setTimeout).toHaveBeenCalledTimes(2);

            jest.advanceTimersByTime(3000);
            expect(props.getInforms).toHaveBeenCalled();
            expect(props.setNewInformDialog).toHaveBeenCalledWith({show: false});
            expect(container.state().saveResult).toBe(null);
        });
    });

    describe('handleSubmit', () => {
        it('should call exactly functions when not save', () => {
            // Arrange
            const props = {
                ...initProps,
                insertInforms: jest.fn(),
                filterData: { values: {currencies: '1,2'}, errors: { title: 'err' } }
            };

            // Act
            const container = shallow(<NewInforms {...props} />).instance();
            container.saveNew.current = {
                handleValidate: jest.fn()
            };
            container.handleSubmit();

            // Assert
            expect(container.saveNew.current.handleValidate).toHaveBeenCalled();
        });
        
        it('should call exactly functions when save', async () => {
            // Arrange
            const props = {
                ...initProps,
                insertInforms: jest.fn()
            };

            // Act
            const container = shallow(<NewInforms {...props} />);
            container.instance().handleSubmit();
           
            // Assert
            expect(await props.insertInforms).toHaveBeenCalledWith({
                currencies: '1,2',
                informs: [{headlineId: 720, groupId: 12, username: 'test', remark: '&amp;t'}]
            });
        });
    });

    describe('render', () => {
        it('should render correctly', () => {
            // Arrange
            const props = {
                ...initProps
            };

            // Act
            const container = shallow(<NewInforms {...props} />);
            container.setState({saveResult: {isSuccessful: true}})
            
            // Assert
            expect(container).toMatchSnapshot();
            expect(container.find(ResponseMessage).length).toBe(1);
            expect(container.find(FilterEditInforms).length).toBe(1);
            expect(container.find(DataGridEdit).length).toBe(1);
        });

        it('should render null', () => {
            // Arrange
            const props = {
                allSettings: null
            };

            // Act
            const container = shallow(<NewInforms {...props} />);
            
            // Assert
            expect(container).toMatchSnapshot();
            expect(container.type()).toEqual(null);
        });
    });
});