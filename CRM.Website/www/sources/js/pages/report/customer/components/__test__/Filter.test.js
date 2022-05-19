import React from 'react';
import { shallow } from 'enzyme';
import { Filter } from '../Filter';
import MultipleSelect from '@jsroot/components/multiple-select/index';

describe('Filter', () => {
    
    afterAll(() => {
        jest.clearAllMocks();
    });
    
    const initProps = {
        allSettings: {
            languages: [{ languageId: 1, name: 'english' }],
            roles: [{ displayOrder: 1, value: 'guest' }],
            sites: [{ id: 1, name: 'credit', childSites: [{ id: 1, name: '5111' }] }]
        },
        getAllSettings: jest.fn()
    };

    describe('componentDidMount', () => {
        it('should call exactly function', () => {
            // Arrange
            const props = {...initProps};
            const initSettingOptions = jest.fn();

            const container = shallow(<Filter {...props}/>);
            container.instance().initSettingOptions = initSettingOptions;

            // Act
            container.instance().componentDidMount();

            // Assert
            expect(initSettingOptions).toHaveBeenCalled();
        });
    });

    describe('initSettingOptions', () => {
        it('should setState exactly', () => {
            // Arrange
            const props = {...initProps};
            const expectedLanguages = [{ languageId: 1, name: 'english', checked: true }];
            const expectedPositions = [{ positionId: 1, name: 'guest', checked: true }];
            const expectedSites = [
                { siteId: 0, name: 'N/A', checked: true },
                { siteId: 1, name: 'credit', checked: true,subItem: [{ key: 1, value: '5111', checked: true}] }
            ];
            const expectedVips = [
                { id: -1, name: 'All' },
                { id: 1, name: 'Yes' },
                { id: 0, name: 'No' }
            ];

            const container = shallow(<Filter {...props}/>);

            // Act
            container.instance().initSettingOptions();

            // Assert
            expect(container.state().languageOptions).toEqual(expectedLanguages);
            expect(container.state().positionOptions).toEqual(expectedPositions);
            expect(container.state().siteOptions).toEqual(expectedSites);
            expect(container.state().vipOptions).toEqual(expectedVips);
            expect(container.state().languageIds).toEqual('1');
            expect(container.state().positionIds).toEqual('1');
            expect(container.state().siteIds).toEqual('0,1');
        });
    });

    describe('handleChange', () => {
        it('should call setState exactly when handle change with no type', () => {
            // Arrange
            const props = {...initProps};

            // Act
            const container = shallow(<Filter {...props}/>);
            const mockEvent = { target: { name: 'handler', value: 'test' }}
            container.instance().handleChange(mockEvent);
           
            // Assert
            expect(container.state().handler).toBe('test');
        });

        it('should call setState exactly when handle change with have type', () => {
            // Arrange
            const props = {...initProps};
            // Act
            const container = shallow(<Filter {...props}/>);
            const mockEvent = { target: { name: 'responseId', value: 20, type: 'select-one' }}
            container.instance().handleChange(mockEvent);
           
            // Assert
            expect(container.state().responseId).toBe(20);
        });
    });

    describe('handleChangeSite', () => {
        it('should setState when site change', () => {
            // Arrange
            const props = {...initProps};
            const siteId = { id: 123 };

            const container = shallow(<Filter {...props}/>);

            // Act
            container.instance().handleChangeSite(siteId);

            // Assert
            expect(container.state().siteId).toBe(123);
        });
    });

    describe('handleChangeMultipleSelect', () => {
        it('should setState when site change', () => {
            // Arrange
            const props = {...initProps};

            const container = shallow(<Filter {...props}/>);

            // Act
            container.instance().handleChangeMultipleSelect('languageId', null, 1);

            // Assert
            expect(container.state().languageId).toBe(1);
        });
    });

    describe('handleCheckExclude', () => {
        it('should setState when site change', () => {
            // Arrange
            const props = {...initProps};
            const mockEvent = { target: { checked: true } }

            const container = shallow(<Filter {...props}/>);

            // Act
            container.instance().handleCheckExclude(mockEvent);

            // Assert
            expect(container.state().excludeIgnoredAccounts).toBe(true);
        });
    });

    describe('handleSubmit', () => {
        it('should call exactly function', () => {
            // Arrange
            const props = {
                ...initProps,
                gridParams: {
                    pageIndex: 1,
                    pageSize: 100
                },
                setGridParams: jest.fn(),
                getCustomerReport: jest.fn()
            };
            const mockEvent = { preventDefault: jest.fn() };

            const container = shallow(<Filter {...props}/>);
            container.instance().setState({
                positionIds: '1,2,3'
            });

            // Act
            container.instance().handleSubmit(mockEvent);

            // Assert
            expect(mockEvent.preventDefault).toHaveBeenCalled();
            expect(props.setGridParams).toHaveBeenCalled();
            expect(props.getCustomerReport).toHaveBeenCalled();
        });
    });

    describe('handleToggleFilter', () => {
        it('should setState exactly', () => {
            // Arrange
            const props = {...initProps};
            
            const container = shallow(<Filter {...props}/>);
            container.instance().setState({
                isShowFilter: false
            });

            // Act
            container.instance().handleToggleFilter();

            // Assert
            expect(container.state().isShowFilter).toBe(true);
        });
    });

    describe('isErrorPosition', () => {
        it('should return true', () => {
            // Arrange
            const props = {...initProps};
            
            const container = shallow(<Filter {...props}/>);
            container.instance().setState({
                checkValidatePosition: true,
                positionIds: ''
            });

            // Act
            const actual = container.instance().isErrorPosition();

            // Assert
            expect(actual).toBe(true);
        });

        it('should return false', () => {
            // Arrange
            const props = {...initProps};
            
            const container = shallow(<Filter {...props}/>);
            container.instance().setState({
                checkValidatePosition: true,
                positionIds: '123'
            });

            // Act
            const actual = container.instance().isErrorPosition();

            // Assert
            expect(actual).toBe(false);
        });
    });

    describe('render', () => {
        it('should render languageOption MultipleSelect', () => {
            // Arrange
            const props = {...initProps};
            const handleChangeMultipleSelect = jest.fn();

            const container = shallow(<Filter {...props}/>);
            container.instance().handleChangeMultipleSelect = handleChangeMultipleSelect;
            
            const render = shallow(container.instance().render());

            render.find(MultipleSelect).at(0).simulate('change', 'currentItem', 'selectedItemsKey');

            expect(handleChangeMultipleSelect).toHaveBeenCalledWith('languageIds', 'currentItem', 'selectedItemsKey');
        });

        it('should render siteOption MultipleSelect', () => {
            // Arrange
            const props = {...initProps};
            const handleChangeMultipleSelect = jest.fn();

            const container = shallow(<Filter {...props}/>);
            container.instance().handleChangeMultipleSelect = handleChangeMultipleSelect;
            
            const render = shallow(container.instance().render());

            render.find(MultipleSelect).at(1).simulate('change', 'currentItem', 'selectedItemsKey');

            expect(handleChangeMultipleSelect).toHaveBeenCalledWith('siteIds', 'currentItem', 'selectedItemsKey');
        });

        it('should render positionOption MultipleSelect', () => {
            // Arrange
            const props = {...initProps};
            const handleChangeMultipleSelect = jest.fn();

            const container = shallow(<Filter {...props}/>);
            container.instance().handleChangeMultipleSelect = handleChangeMultipleSelect;
            
            const render = shallow(container.instance().render());

            render.find(MultipleSelect).at(2).simulate('change', 'currentItem', 'selectedItemsKey');

            expect(handleChangeMultipleSelect).toHaveBeenCalledWith('positionIds', 'currentItem', 'selectedItemsKey');
        });

        it('should render exactly className of span when showFiler', () => {
            // Arrange
            const props = {...initProps};

            const container = shallow(<Filter {...props}/>);
            container.instance().setState({ isShowFilter: true });

            // Assert
            expect(container.find('span').at(0).props().className).toEqual('fa fa-caret-up icon');
        });

        it('should render exactly className of span when not showFiler', () => {
            // Arrange
            const props = {...initProps};

            const container = shallow(<Filter {...props}/>);
            container.instance().setState({ isShowFilter: false });

            // Assert
            expect(container.find('span').at(0).props().className).toEqual('fa fa-caret-down icon');
        });
    });
});