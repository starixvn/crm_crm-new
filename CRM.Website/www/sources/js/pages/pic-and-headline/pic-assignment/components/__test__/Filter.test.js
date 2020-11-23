import FilterWrapper, { Filter } from '../Filter';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import functions from '../../common.functions';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

describe('Filter', () => {
    describe('component with redux', () => {
        // Arrange
        const mockStore = configureMockStore();
        const initialState = {
            settings: {},
            gridParams: {}
        };

        const store = mockStore(initialState);
        
        // Action
        const wrapper = shallow(<FilterWrapper store={store} />);

        // Assert
        it('component render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('component has correct props', () => {
            expect(wrapper.props().children.props.settings).toEqual(
                initialState.settings
            );
            expect(wrapper.props().children.props.gridParams).toEqual(
                initialState.gridParams
            );
        });
    });

    it('has correct default state', () => {
        // Arrange
        const promise = Promise.resolve({})
        const props = {
            settings: {
                picList: []
            },
            gridParams: {},
            getSettings: jest.fn(() => promise)
        };

        // Action
        const filter = shallow(<Filter {...props} />);

        // Assert
        expect(filter.instance().state).toEqual({
            filter: {
                site: '1',
                currency: '1',
                status: '1',
                headlineType: 2,
                groupHeadline: '',
                picName: '',
                directAccount: '',
                position: '1',
                excludeAssignedAcc: false,
                excludeIgnoredAcc: true,
                excludeIsTest: true
            },
            siteOptions: [],
            currencyOptions: [],
            statusOptions: [],
            positionOptions: []
        });
    });

    it('componentDidMount should change state correctly', () => {
        // Arrange
        const promise = Promise.resolve({})
        const props = {
            settings: {
                siteList: [
                    {
                        site: 'site'
                    }
                ],
                currencyList: [
                    {
                        id: 1,
                        name: 'currency'
                    }
                ],
                statusList: [ 'status' ],
                positionList: [
                    {
                        settingId: 1,
                        settingValue: 'position'
                    }
                ]
            },
            gridParams: {},
            getSettings: jest.fn(() => promise)
        };

        const siteIds = [];
        const siteOptions = props.settings.siteList.map(x => {
            siteIds.push(x.site);
            return {
                id: x.site,
                name: x.site,
                checked: true
            };
        });

        const currencyIds = [];
        const currencyOptions = props.settings.currencyList.map(x => {
            currencyIds.push(x.id);
            return {
                id: x.id,
                name: x.name,
                checked: true
            };
        });

        const statusOptions = props.settings.statusList.map(x => {
            return {
                id: x,
                name: x,
                checked: true
            };
        });

        const positionIds = [];
        const positionOptions = props.settings.positionList.map(x => {
            positionIds.push(x.settingId);
            return {
                id: x.settingId,
                name: x.settingValue,
                checked: true
            };
        });

        const prevState = {};
        const filter = shallow(<Filter {...props} />);
        filter.instance().setState(prevState);

        // Action
        filter.instance().componentDidMount();

        // Assert
        promise.then(() => {
            expect(filter.instance().state.siteOptions).toEqual(siteOptions);
            expect(filter.instance().state.currencyOptions).toEqual(currencyOptions);
            expect(filter.instance().state.statusOptions).toEqual(statusOptions);
            expect(filter.instance().state.positionOptions).toEqual(positionOptions);
            expect(filter.instance().state.filter).toEqual({
                ...prevState.filter,
                site: siteIds.toString(),
                currency: currencyIds.toString(),
                status: props.settings.statusList.toString(),
                position: positionIds.toString()
            });
        });
    });

    it('handleFilterChange change state correctly', () => {
        // Arrange
        const promise = Promise.resolve({})
        const props = {
            settings: {},
            gridParams: {},
            getSettings: jest.fn(() => promise)
        };

        const prevState = {
            filter: {}
        };

        const name = 'name';
        const value = 'value';
        const filter = shallow(<Filter {...props} />);
        filter.instance().setState(prevState);

        // Action
        filter.instance().handleFilterChange(name, value);

        // Assert
        expect(filter.instance().state.filter).toEqual({
            ...prevState.filter,
            [name]: value
        });
    });

    it('handleChange change state correctly', () => {
        // Arrange
        const promise = Promise.resolve({})
        const props = {
            settings: {},
            gridParams: {},
            getSettings: jest.fn(() => promise)
        };

        const prevState = {
            filter: {}
        };

        const name = 'name';
        const value = 'value';
        const event = {
            persist: jest.fn(),
            target: {
                name: name,
                value: value
            }
        };

        const filter = shallow(<Filter {...props} />);
        filter.instance().setState(prevState);

        // Action
        filter.instance().handleChange(event);

        // Assert
        expect(event.persist).toHaveBeenCalled();
        expect(filter.instance().state.filter).toEqual({
            ...prevState.filter,
            [event.target.name]: event.target.value
        });
    });

    it('handleCheckBoxChange change state correctly', () => {
        // Arrange
        const promise = Promise.resolve({})
        const props = {
            settings: {},
            gridParams: {},
            getSettings: jest.fn(() => promise)
        };

        const prevState = {
            filter: {}
        };

        const name = 'name';
        const checked = 'checked';
        const event = {
            persist: jest.fn(),
            target: {
                name: name,
                checked: checked
            }
        };

        const filter = shallow(<Filter {...props} />);
        filter.instance().setState(prevState);

        // Action
        filter.instance().handleCheckBoxChange(event);

        // Assert
        expect(event.persist).toHaveBeenCalled();
        expect(filter.instance().state.filter).toEqual({
            ...prevState.filter,
            [event.target.name]: event.target.checked
        });
    });

    it('handleSiteChange call handleFilterChange correctly', () => {
        // Arrange
        const promise = Promise.resolve({})
        const props = {
            settings: {},
            gridParams: {},
            getSettings: jest.fn(() => promise)
        };

        const selectedItemsKey = {};
        const filter = shallow(<Filter {...props} />);
        filter.instance().handleFilterChange = jest.fn();

        // Action
        filter.instance().handleSiteChange(null, selectedItemsKey);

        // Assert
        expect(filter.instance().handleFilterChange).toHaveBeenCalledWith('site', selectedItemsKey);
    });

    it('handleCurrencyChange call handleFilterChange correctly', () => {
        // Arrange
        const promise = Promise.resolve({})
        const props = {
            settings: {},
            gridParams: {},
            getSettings: jest.fn(() => promise)
        };

        const selectedItemsKey = {};
        const filter = shallow(<Filter {...props} />);
        filter.instance().handleFilterChange = jest.fn();

        // Action
        filter.instance().handleCurrencyChange(null, selectedItemsKey);

        // Assert
        expect(filter.instance().handleFilterChange).toHaveBeenCalledWith('currency', selectedItemsKey);
    });

    it('handleStatusChange call handleFilterChange correctly', () => {
        // Arrange
        const promise = Promise.resolve({})
        const props = {
            settings: {},
            gridParams: {},
            getSettings: jest.fn(() => promise)
        };

        const selectedItemsKey = {};
        const filter = shallow(<Filter {...props} />);
        filter.instance().handleFilterChange = jest.fn();

        // Action
        filter.instance().handleStatusChange(null, selectedItemsKey);

        // Assert
        expect(filter.instance().handleFilterChange).toHaveBeenCalledWith('status', selectedItemsKey);
    });

    it('handlePositionChange call handleFilterChange correctly', () => {
        // Arrange
        const promise = Promise.resolve({})
        const props = {
            settings: {},
            gridParams: {},
            getSettings: jest.fn(() => promise)
        };

        const selectedItemsKey = {};
        const filter = shallow(<Filter {...props} />);
        filter.instance().handleFilterChange = jest.fn();

        // Action
        filter.instance().handlePositionChange(null, selectedItemsKey);

        // Assert
        expect(filter.instance().handleFilterChange).toHaveBeenCalledWith('position', selectedItemsKey);
    });

    it('renderHeadlineTypeOption should return expected', () => {
        // Arrange
        const promise = Promise.resolve({})
        const props = {
            settings: {},
            gridParams: {},
            getSettings: jest.fn(() => promise)
        };

        const item = {
            id: 1,
            value: 'value'
        };

        const filter = shallow(<Filter {...props} />);

        // Action
        const result = filter.instance().renderHeadlineTypeOption(item);

        // Assert
        expect(result).toEqual(<option key={item.id} value={item.id}>{item.name}</option>);
    });

    it('getParams should return expected', () => {
        // Arrange
        const promise = Promise.resolve({})
        const props = {
            settings: {},
            gridParams: {
                pageIndex: 1,
                pageSize: 10
            },
            getSettings: jest.fn(() => promise)
        };

        const state = {};
        const filter = shallow(<Filter {...props} />);
        filter.instance().setState(state);

        // Action
        const result = filter.instance().getParams();

        // Assert
        expect(result).toEqual({
            ...filter.instance().state.filter,
            pageIndex: props.gridParams.pageIndex,
            pageSize: props.gridParams.pageSize
        });
    });

    it('handleSubmit should run correctly', () => {
        // Arrange
        const promise = Promise.resolve({})
        const props = {
            settings: {},
            gridParams: {},
            getSettings: jest.fn(() => promise),
            setGridParams: jest.fn(),
            getGridData: jest.fn((params, callback) => callback())
        };

        const params = {};
        const filter = shallow(<Filter {...props} />);
        filter.instance().getParams = jest.fn(() => params);
        functions.handleNewRemoveOptions = jest.fn();

        // Action
        filter.instance().handleSubmit();

        // Assert
        expect(props.setGridParams).toHaveBeenCalledWith(params);
        expect(props.getGridData).toHaveBeenCalledWith(params, expect.any(Function));
    });

    it('handleOpenAssignPicPopup should run correctly', () => {
        // Arrange
        const promise = Promise.resolve({})
        const props = {
            settings: {},
            gridParams: {},
            getSettings: jest.fn(() => promise),
            setAssignPicPopup: jest.fn()
        };

        const filter = shallow(<Filter {...props} />);

        // Action
        filter.instance().handleOpenAssignPicPopup();

        // Assert
        expect(props.setAssignPicPopup).toHaveBeenCalledWith({ show: true });
    });

    describe('render', () => {
        it('should have expected props', () => {
            // Arrange
            const promise = Promise.resolve({})
            const props = {
                settings: {},
                gridParams: {},
                getSettings: jest.fn(() => promise)
            };

            const filter = shallow(<Filter {...props} />);

            // Action
            const form = filter.find(Form);

            // Assert
            expect(form.props().className).toBe('form-filter');
        });
        
        it('should have Form onSubmit', () => {
            // Arrange
            const promise = Promise.resolve({})
            const props = {
                settings: {},
                gridParams: {},
                getSettings: jest.fn(() => promise)
            };

            const filter = shallow(<Filter {...props} />);
            filter.instance().handleSubmit = jest.fn();
            const form = filter.find(Form);

            // Action
            form.simulate('submit');

            // Assert
            expect(filter.instance().handleSubmit).toHaveBeenCalled();
        });
        
        it('should have first Form Row', () => {
            // Arrange
            const promise = Promise.resolve({})
            const props = {
                settings: {},
                gridParams: {},
                getSettings: jest.fn(() => promise)
            };

            const filter = shallow(<Filter {...props} />);

            // Action
            const row = filter.find(Form.Row).at(0);

            // Assert
            expect(row.props().bsPrefix).toBe('form-row');
        });
        
        it('should have first Form Row having first Form Group', () => {
            // Arrange
            const promise = Promise.resolve({})
            const props = {
                settings: {},
                gridParams: {},
                getSettings: jest.fn(() => promise)
            };

            const state = {
                siteOptions: []
            };

            const filter = shallow(<Filter {...props} />);
            filter.instance().setState(state);

            // Action
            const group = filter.find(Form.Group).at(0);

            // Assert
            expect(group.find(Form.Label).html()).toContain('Site');
            expect(group.find('div').props().className).toBe('form-control-wrapper');
            expect(group.find(MultipleSelect).props().dataSource).toEqual(state.siteOptions);
            expect(group.find(MultipleSelect).props().keyField).toBe('id');
            expect(group.find(MultipleSelect).props().valueField).toBe('name');
            expect(group.find(MultipleSelect).props().statusField).toBe('checked');
            expect(group.find(MultipleSelect).props().isSummited).toBeFalse;
            expect(group.find(MultipleSelect).props().isAllTextShown).toBeTrue;
        });
        
        it('should have first Form Row having first Form Group containing MultipleSelect onChange', () => {
            // Arrange
            const promise = Promise.resolve({})
            const props = {
                settings: {},
                gridParams: {},
                getSettings: jest.fn(() => promise)
            };

            const currentItem = 'currentItem';
            const selectedItemsKey = 'selectedItemsKey';
            const filter = shallow(<Filter {...props} />);
            filter.instance().handleSiteChange = jest.fn();
            const select = filter.find(Form.Group).at(0).find(MultipleSelect);

            // Action
            select.simulate('change', currentItem, selectedItemsKey);

            // Assert
            expect(filter.instance().handleSiteChange).toHaveBeenCalledWith(currentItem, selectedItemsKey);
        });
        
        it('should have first Form Row having second Form Group', () => {
            // Arrange
            const promise = Promise.resolve({})
            const props = {
                settings: {},
                gridParams: {},
                getSettings: jest.fn(() => promise)
            };

            const state = {
                currencyOptions: []
            };

            const filter = shallow(<Filter {...props} />);
            filter.instance().setState(state);

            // Action
            const group = filter.find(Form.Group).at(1);

            // Assert
            expect(group.find(Form.Label).html()).toContain('Currency');
            expect(group.find('div').props().className).toBe('form-control-wrapper');
            expect(group.find(MultipleSelect).props().dataSource).toEqual(state.currencyOptions);
            expect(group.find(MultipleSelect).props().keyField).toBe('id');
            expect(group.find(MultipleSelect).props().valueField).toBe('name');
            expect(group.find(MultipleSelect).props().statusField).toBe('checked');
            expect(group.find(MultipleSelect).props().isSummited).toBeFalse;
            expect(group.find(MultipleSelect).props().isAllTextShown).toBeTrue;
        });
        
        it('should have first Form Row having second Form Group containing MultipleSelect onChange', () => {
            // Arrange
            const promise = Promise.resolve({})
            const props = {
                settings: {},
                gridParams: {},
                getSettings: jest.fn(() => promise)
            };

            const currentItem = 'currentItem';
            const selectedItemsKey = 'selectedItemsKey';
            const filter = shallow(<Filter {...props} />);
            filter.instance().handleCurrencyChange = jest.fn();
            const select = filter.find(Form.Group).at(1).find(MultipleSelect);

            // Action
            select.simulate('change', currentItem, selectedItemsKey);

            // Assert
            expect(filter.instance().handleCurrencyChange).toHaveBeenCalledWith(currentItem, selectedItemsKey);
        });
        
        it('should have first Form Row having third Form Group', () => {
            // Arrange
            const promise = Promise.resolve({})
            const props = {
                settings: {},
                gridParams: {},
                getSettings: jest.fn(() => promise)
            };

            const state = {
                currencyOptions: []
            };

            const filter = shallow(<Filter {...props} />);
            filter.instance().setState(state);

            // Action
            const group = filter.find(Form.Group).at(2);

            // Assert
            expect(group.find(Form.Label).html()).toContain('Status');
            expect(group.find('div').props().className).toBe('form-control-wrapper');
            expect(group.find(MultipleSelect).props().dataSource).toEqual(state.currencyOptions);
            expect(group.find(MultipleSelect).props().keyField).toBe('id');
            expect(group.find(MultipleSelect).props().valueField).toBe('name');
            expect(group.find(MultipleSelect).props().statusField).toBe('checked');
            expect(group.find(MultipleSelect).props().isSummited).toBeFalse;
            expect(group.find(MultipleSelect).props().isAllTextShown).toBeTrue;
        });
        
        it('should have first Form Row having third Form Group containing MultipleSelect onChange', () => {
            // Arrange
            const promise = Promise.resolve({})
            const props = {
                settings: {},
                gridParams: {},
                getSettings: jest.fn(() => promise)
            };

            const currentItem = 'currentItem';
            const selectedItemsKey = 'selectedItemsKey';
            const filter = shallow(<Filter {...props} />);
            filter.instance().handleStatusChange = jest.fn();
            const select = filter.find(Form.Group).at(2).find(MultipleSelect);

            // Action
            select.simulate('change', currentItem, selectedItemsKey);

            // Assert
            expect(filter.instance().handleStatusChange).toHaveBeenCalledWith(currentItem, selectedItemsKey);
        });
        
        it('should have first Form Row having forth Form Group', () => {
            // Arrange
            const promise = Promise.resolve({})
            const props = {
                settings: {},
                gridParams: {},
                getSettings: jest.fn(() => promise)
            };

            const state = {
                filter: {
                    headlineType: 'type'
                }
            };

            const filter = shallow(<Filter {...props} />);
            filter.instance().setState(state);

            // Action
            const group = filter.find(Form.Group).at(3);

            // Assert
            expect(group.find(Form.Label).html()).toContain('HeadlineType');
            expect(group.find(Form.Control).props().as).toBe('select');
            expect(group.find(Form.Control).props().size).toBe('sm');
            expect(group.find(Form.Control).props().className).toBe('shadow-none');
            expect(group.find(Form.Control).props().name).toBe('headlineType');
            expect(group.find(Form.Control).props().value).toEqual(state.filter.headlineType);
            expect(group.find('option').at(0).html()).toEqual('<option value="2">All</option>');
        });
        
        it('should have first Form Row having forth Form Group containing Form Control onChange', () => {
            // Arrange
            const promise = Promise.resolve({})
            const props = {
                settings: {},
                gridParams: {},
                getSettings: jest.fn(() => promise)
            };

            const event = {};
            const filter = shallow(<Filter {...props} />);
            filter.instance().handleChange = jest.fn();
            const control = filter.find(Form.Group).at(3).find(Form.Control);

            // Action
            control.simulate('change', event);

            // Assert
            expect(filter.instance().handleChange).toHaveBeenCalledWith(event);
        });
        
        it('should have first Form Row having fifth Form Group', () => {
            // Arrange
            const promise = Promise.resolve({})
            const props = {
                settings: {},
                gridParams: {},
                getSettings: jest.fn(() => promise)
            };

            const state = {
                filter: {
                    groupHeadline: 'headline'
                }
            };

            const filter = shallow(<Filter {...props} />);
            filter.instance().setState(state);

            // Action
            const group = filter.find(Form.Group).at(4);

            // Assert
            expect(group.find(Form.Label).html()).toContain('GroupHeadline');
            expect(group.find(Form.Control).props().as).toBe('input');
            expect(group.find(Form.Control).props().size).toBe('sm');
            expect(group.find(Form.Control).props().className).toBe('shadow-none');
            expect(group.find(Form.Control).props().name).toBe('groupHeadline');
            expect(group.find(Form.Control).props().value).toEqual(state.filter.groupHeadline);
        });
        
        it('should have first Form Row having fifth Form Group containing Form Control onChange', () => {
            // Arrange
            const promise = Promise.resolve({})
            const props = {
                settings: {},
                gridParams: {},
                getSettings: jest.fn(() => promise)
            };

            const event = {};
            const filter = shallow(<Filter {...props} />);
            filter.instance().handleChange = jest.fn();
            const control = filter.find(Form.Group).at(4).find(Form.Control);

            // Action
            control.simulate('change', event);

            // Assert
            expect(filter.instance().handleChange).toHaveBeenCalledWith(event);
        });
        
        it('should have first Form Row having sixth Form Group', () => {
            // Arrange
            const promise = Promise.resolve({})
            const props = {
                settings: {},
                gridParams: {},
                getSettings: jest.fn(() => promise)
            };

            const state = {
                filter: {
                    picName: 'name'
                }
            };

            const filter = shallow(<Filter {...props} />);
            filter.instance().setState(state);

            // Action
            const group = filter.find(Form.Group).at(5);

            // Assert
            expect(group.find(Form.Label).html()).toContain('PIC');
            expect(group.find(Form.Control).props().as).toBe('input');
            expect(group.find(Form.Control).props().size).toBe('sm');
            expect(group.find(Form.Control).props().className).toBe('shadow-none');
            expect(group.find(Form.Control).props().name).toBe('picName');
            expect(group.find(Form.Control).props().value).toEqual(state.filter.picName);
        });
        
        it('should have first Form Row having sixth Form Group containing Form Control onChange', () => {
            // Arrange
            const promise = Promise.resolve({})
            const props = {
                settings: {},
                gridParams: {},
                getSettings: jest.fn(() => promise)
            };

            const event = {};
            const filter = shallow(<Filter {...props} />);
            filter.instance().handleChange = jest.fn();
            const control = filter.find(Form.Group).at(5).find(Form.Control);

            // Action
            control.simulate('change', event);

            // Assert
            expect(filter.instance().handleChange).toHaveBeenCalledWith(event);
        });
        
        it('should have first Form Row having seventh Form Group', () => {
            // Arrange
            const promise = Promise.resolve({})
            const props = {
                settings: {},
                gridParams: {},
                getSettings: jest.fn(() => promise)
            };

            const state = {
                filter: {
                    directAccount: 'name'
                }
            };

            const filter = shallow(<Filter {...props} />);
            filter.instance().setState(state);

            // Action
            const group = filter.find(Form.Group).at(6);

            // Assert
            expect(group.find(Form.Label).html()).toContain('DirectAccount');
            expect(group.find(Form.Control).props().as).toBe('input');
            expect(group.find(Form.Control).props().size).toBe('sm');
            expect(group.find(Form.Control).props().className).toBe('shadow-none');
            expect(group.find(Form.Control).props().name).toBe('directAccount');
            expect(group.find(Form.Control).props().value).toEqual(state.filter.directAccount);
        });
        
        it('should have first Form Row having seventh Form Group containing Form Control onChange', () => {
            // Arrange
            const promise = Promise.resolve({})
            const props = {
                settings: {},
                gridParams: {},
                getSettings: jest.fn(() => promise)
            };

            const event = {};
            const filter = shallow(<Filter {...props} />);
            filter.instance().handleChange = jest.fn();
            const control = filter.find(Form.Group).at(6).find(Form.Control);

            // Action
            control.simulate('change', event);

            // Assert
            expect(filter.instance().handleChange).toHaveBeenCalledWith(event);
        });
        
        it('should have first Form Row having eighth Form Group', () => {
            // Arrange
            const promise = Promise.resolve({})
            const props = {
                settings: {},
                gridParams: {},
                getSettings: jest.fn(() => promise)
            };

            const state = {
                positionOptions: []
            };

            const filter = shallow(<Filter {...props} />);
            filter.instance().setState(state);

            // Action
            const group = filter.find(Form.Group).at(7);

            // Assert
            expect(group.find(Form.Label).html()).toContain('Position');
            expect(group.find('div').props().className).toBe('form-control-wrapper');
            expect(group.find(MultipleSelect).props().dataSource).toEqual(state.positionOptions);
            expect(group.find(MultipleSelect).props().keyField).toBe('id');
            expect(group.find(MultipleSelect).props().valueField).toBe('name');
            expect(group.find(MultipleSelect).props().statusField).toBe('checked');
            expect(group.find(MultipleSelect).props().isSummited).toBeFalse;
            expect(group.find(MultipleSelect).props().isAllTextShown).toBeTrue;
        });
        
        it('should have first Form Row having eighth Form Group containing MultipleSelect onChange', () => {
            // Arrange
            const promise = Promise.resolve({})
            const props = {
                settings: {},
                gridParams: {},
                getSettings: jest.fn(() => promise)
            };

            const currentItem = 'currentItem';
            const selectedItemsKey = 'selectedItemsKey';
            const filter = shallow(<Filter {...props} />);
            filter.instance().handlePositionChange = jest.fn();
            const select = filter.find(Form.Group).at(7).find(MultipleSelect);

            // Action
            select.simulate('change', currentItem, selectedItemsKey);

            // Assert
            expect(filter.instance().handlePositionChange).toHaveBeenCalledWith(currentItem, selectedItemsKey);
        });
        
        it('should have second Form Row', () => {
            // Arrange
            const promise = Promise.resolve({})
            const props = {
                settings: {},
                gridParams: {},
                getSettings: jest.fn(() => promise)
            };

            const state = {
                filter: {
                    excludeAssignedAcc: true,
                    excludeIgnoredAcc: true,
                    excludeIsTest: true
                }
            };

            const filter = shallow(<Filter {...props} />);
            filter.instance().setState(state);

            // Action
            const group = filter.find(Form.Row).at(2);

            // Assert
            expect(group.find('div').at(0).props().className).toBe('filter-checkbox');
            expect(group.find('input').at(0).props().type).toBe('checkbox');
            expect(group.find('input').at(0).props().className).toBe('shadow-none');
            expect(group.find('input').at(0).props().name).toBe('excludeAssignedAcc');
            expect(group.find('input').at(0).props().checked).toEqual(state.filter.excludeAssignedAcc);
            expect(group.find('div').at(1).props().className).toBe('filter-checkbox-text');
            expect(group.find('div').at(1).html()).toContain('OnlyShowUnassignedDirectAccounts');
            expect(group.find('input').at(1).props().type).toBe('checkbox');
            expect(group.find('input').at(1).props().className).toBe('shadow-none');
            expect(group.find('input').at(1).props().name).toBe('excludeIgnoredAcc');
            expect(group.find('input').at(1).props().checked).toEqual(state.filter.excludeIgnoredAcc);
            expect(group.find('div').at(2).props().className).toBe('filter-checkbox-text');
            expect(group.find('div').at(2).html()).toContain('ExcludeIgnoredAccounts');
            expect(group.find('input').at(2).props().type).toBe('checkbox');
            expect(group.find('input').at(2).props().className).toBe('shadow-none');
            expect(group.find('input').at(2).props().name).toBe('excludeIsTest');
            expect(group.find('input').at(2).props().checked).toEqual(state.filter.excludeIsTest);
        });
        
        it('should have second Form Row containing first input onChange', () => {
            // Arrange
            const promise = Promise.resolve({})
            const props = {
                settings: {},
                gridParams: {},
                getSettings: jest.fn(() => promise)
            };

            const event = {};
            const filter = shallow(<Filter {...props} />);
            filter.instance().handleCheckBoxChange = jest.fn();
            const input = filter.find(Form.Row).at(2).find('input').at(0);

            // Action
            input.simulate('change', event);

            // Assert
            expect(filter.instance().handleCheckBoxChange).toHaveBeenCalledWith(event);
        });
        
        it('should have second Form Row containing second input onChange', () => {
            // Arrange
            const promise = Promise.resolve({})
            const props = {
                settings: {},
                gridParams: {},
                getSettings: jest.fn(() => promise)
            };

            const event = {};
            const filter = shallow(<Filter {...props} />);
            filter.instance().handleCheckBoxChange = jest.fn();
            const input = filter.find(Form.Row).at(2).find('input').at(1);

            // Action
            input.simulate('change', event);

            // Assert
            expect(filter.instance().handleCheckBoxChange).toHaveBeenCalledWith(event);
        });
        
        it('should have second Form Row containing third input onChange', () => {
            // Arrange
            const promise = Promise.resolve({})
            const props = {
                settings: {},
                gridParams: {},
                getSettings: jest.fn(() => promise)
            };

            const event = {};
            const filter = shallow(<Filter {...props} />);
            filter.instance().handleCheckBoxChange = jest.fn();
            const input = filter.find(Form.Row).at(2).find('input').at(2);

            // Action
            input.simulate('change', event);

            // Assert
            expect(filter.instance().handleCheckBoxChange).toHaveBeenCalledWith(event);
        });
        
        it('should have third Form Row', () => {
            // Arrange
            const promise = Promise.resolve({})
            const props = {
                settings: {},
                gridParams: {},
                getSettings: jest.fn(() => promise)
            };

            const filter = shallow(<Filter {...props} />);

            // Action
            const row = filter.find(Form.Row).at(3);

            // Assert
            expect(row.find('div').props().className).toBe('button-row');
            expect(row.find(Button).at(0).props().className).toBe('mr-2');
            expect(row.find(Button).at(0).props().variant).toBe('primary');
            expect(row.find(Button).at(0).props().size).toBe('sm');
            expect(row.find(Button).at(0).html()).toContain('Submit');
            expect(row.find(Button).at(1).props().className).toBe('mr-2');
            expect(row.find(Button).at(1).props().variant).toBe('primary');
            expect(row.find(Button).at(1).props().size).toBe('sm');
            expect(row.find(Button).at(1).html()).toContain('AssignPIC');
        });
        
        it('should have third Form Row containing first Button onClick', () => {
            // Arrange
            const promise = Promise.resolve({})
            const props = {
                settings: {},
                gridParams: {},
                getSettings: jest.fn(() => promise)
            };

            const filter = shallow(<Filter {...props} />);
            filter.instance().handleSubmit = jest.fn();
            const button = filter.find(Form.Row).at(3).find(Button).at(0);

            // Action
            button.simulate('click');

            // Assert
            expect(filter.instance().handleSubmit).toHaveBeenCalled();
        });
        
        it('should have third Form Row containing second Button onClick', () => {
            // Arrange
            const promise = Promise.resolve({})
            const props = {
                settings: {},
                gridParams: {},
                getSettings: jest.fn(() => promise)
            };

            const filter = shallow(<Filter {...props} />);
            filter.instance().handleOpenAssignPicPopup = jest.fn();
            const button = filter.find(Form.Row).at(3).find(Button).at(1);

            // Action
            button.simulate('click');

            // Assert
            expect(filter.instance().handleOpenAssignPicPopup).toHaveBeenCalled();
        });
    });
});