import React from 'react';
import { EditInforms } from '../EditInforms';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

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
        it('should call exactly functions when not save', async () => {
            // Arrange
            const promise = Promise.resolve({});
            const props = {
                ...initProps,
                editInforms: jest.fn(() => promise),
                filterData: { values: { currencies: '1,2' }, errors: { title: 'err' } }
            };

            // Act
            const container = shallow(<EditInforms {...props} />).instance();
            container.saveEdit.current = {
                handleValidate: jest.fn()
            };
            container.handleSubmit();
            await promise;

            // Assert
            expect(container.saveEdit.current.handleValidate).toHaveBeenCalled();
        });

        it('should call exactly functions when save', async () => {
            // Arrange
            const promise = Promise.resolve({});
            const props = {
                ...initProps,
                editInforms: jest.fn(() => promise)
            };

            // Act
            const container = shallow(<EditInforms {...props} />);
            container.instance().handleSubmit();
            await promise;

            // Assert
            expect(props.editInforms).toHaveBeenCalledWith({
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
            container.setState({saveResult: {isSuccessful: true}});
            
            // Assert
            expect(toJson(container)).toMatchSnapshot();
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
            expect(toJson(container)).toMatchSnapshot();
            expect(container.type()).toEqual(null);
        });
    });
});