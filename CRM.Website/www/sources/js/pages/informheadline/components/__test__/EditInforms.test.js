import React from 'react';
import { EditInforms } from '../EditInforms';
import { shallow } from 'enzyme';
import FilterEditInforms from '../FilterEditInforms';
import DataGridEdit from '../DataGridEdit';
import ResponseMessage from '@jsroot/components/ResponseMessage';

describe('EditInforms', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        titleId: 720,
        titleDetail: {
            title: 'test', currencies: '1,2,3',
            sites: '1,2', typeAccount: 3,
            positions: '4,5,6', isVip: 2,
            excludeIgnoredAccounts: true
        },
        allSettings: {
            currencies: [{id: 1, name: 'test'},{id: 2, name: 'test'},{id: 3, name: 'test'},{id: 4, name: 'test'}],
            sites: [{childSites: [{id: 1, name: '123'},{id: 2, name: '123'},{id: 3, name: '123'},{id: 4, name: '123'}]}]
        },
        getTitleDetail: jest.fn(),
        getAllSettings: jest.fn(),
        dataEditInforms: [{headlineId: 720, groupId: 12, username: 'test', remark: '&t'}],
        editedInforms: [{headlineId: 720, groupId: 12, username: 'test', remark: '&t'}],
        getEditInforms: jest.fn(),
        filterData: {values: {currencies: '1,2'}, errors: {}},
        setFilterData: jest.fn()
    };

    describe('componentDidMount', () => {
        it('should call functions api', async () => {
            // Arrange
            const props = {...initProps};

            //Act
            const container = shallow(<EditInforms {...props} />);

            // Assert
            expect(await props.getTitleDetail).toHaveBeenCalledWith({titleId: 720});
            expect(await props.getEditInforms).toHaveBeenCalledWith({
                titleId: 720, typeAccount: 3,
                currencies: '1,2,3', levels: '4,5,6',
                sites: '1,2', isVip: 2,
                excludeIgnoredAccounts: true
            });
            expect(props.setFilterData).toHaveBeenCalledWith({
                values: {
                    titleId: 720, typeAccount: 3,
                    currencies: '1,2,3', levels: '4,5,6',
                    sites: '1,2', isVip: 2,
                    excludeIgnoredAccounts: true,
                    changeFilter: false, title: 'test'
                },
                errors: {}
            });
        });
    });

    describe('getIncludeInSetting', () => {
        it('should return exactly when get include in setting', () => {
            // Arrange
            const props = {...initProps};

            // Act
            const container = shallow(<EditInforms {...props} />);
            const actual = container.instance().getIncludeInSetting(props.titleDetail.currencies,props.allSettings.currencies);
           
            // Assert
            expect(actual).toBe('1,2,3');
        });
    });



    describe('setAlert', () => {
        it('should call exactly functions when save', () => {
            // Arrange
            const props = {
                ...initProps,
                resultEditInforms: 'Successfully!'
            };
            jest.useFakeTimers();
            // Act
            const container = shallow(<EditInforms {...props}/>);
            container.instance().setAlert();
           
            // Assert
            expect(container.state().saveResult).toBe('Successfully!');
            expect(setTimeout).toHaveBeenCalledTimes(1);
        });
    });

    describe('handleSubmit', () => {
        it('should call exactly functions when not save', () => {
            // Arrange
            const props = {
                ...initProps,
                editInforms: jest.fn(),
                filterData: { values: { currencies: '1,2' }, errors: { title: 'err' } }
            };

            // Act
            const container = shallow(<EditInforms {...props} />).instance();
            container.saveEdit.current = {
                handleValidate: jest.fn()
            };
            container.handleSubmit();

            // Assert
            expect(container.saveEdit.current.handleValidate).toHaveBeenCalled();
        });

        it('should call exactly functions when save', async () => {
            // Arrange
            const props = {
                ...initProps,
                editInforms: jest.fn()
            };

            // Act
            const container = shallow(<EditInforms {...props} />);
            container.instance().handleSubmit();

            // Assert
            expect(await props.editInforms).toHaveBeenCalledWith({
                currencies: '1,2',
                informs: [{headlineId: 720, groupId: 12, username: 'test', remark: '&amp;t'}]
            });
        });
    });


    describe('render', () => {
        it('should render correctly', () => {
            // Arrange
            const props = {
                ...initProps,
                titleDetail: "test"
            };

            // Act
            const container = shallow(<EditInforms {...props} />);
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
                titleDetail: null,
                allSettings: null,
                dataEditInforms: null
            };

            // Act
            const container = shallow(<EditInforms {...props} />);
            
            // Assert
            expect(container).toMatchSnapshot();
            expect(container.type()).toEqual(null);
        });
    });
});