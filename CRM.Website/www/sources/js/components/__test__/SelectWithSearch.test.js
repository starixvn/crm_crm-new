import React from 'react';
import SelectWithSearch from '../SelectWithSearch';
import LangHelper from '@jsroot/common/langHelper';
import { shallow } from 'enzyme';

describe('SelectWithSearch', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn((key) => key);
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    //Arrange
    const initialState = {
        selectFormStatus: '',
        selectedItem: {
            id: 0,
            name: 'N/A'
        },
        options: [],
        filter: '',
        isHideNA: false,
        isSelectOption: false,
        collapsedAll: true
    };
    const props = {
        name: 'N/A',
        value: 0,
        options: [],
        isHideNA: false,
        OnChangeValue: jest.fn()
    };

    it('should have correct snapshots', () => {
        //Act
        const container = shallow(<SelectWithSearch  {...props} />);
        container.instance().setState(initialState);

        // Assert
        expect(container).toMatchSnapshot();
    });

    it('component has correct initialState', () => {
        // Action
        const container = shallow(<SelectWithSearch {...props} />);

        // Assert
        expect(container.state()).toEqual(initialState);
    });

    describe('methods', () => {
        describe('componentDidMount', () => {
            it('componentDidMount should run correctly', () => {
                const clickHandler = jest.fn();
                document.addEventListener = jest.fn();
                const container = shallow(<SelectWithSearch {...props} />);
                container.instance().clickHandler = clickHandler;

                // Action
                container.instance().componentDidMount();

                // Assert
                expect(document.addEventListener).toHaveBeenCalledWith('click', clickHandler);
            });
        });

        describe('ComponentDidUpdate', () => {
            it('ComponentDidUpdate should run correctly', () => {
                //Arrange
                const expected = {
                    id: 0,
                    name: 'N/A'
                };
                const newProps = {
                    id: 1,
                    name: 'test'
                };
                const container = shallow(<SelectWithSearch {...props} />);
                //Act

                container.instance().componentDidUpdate(newProps);

                //Assert
                expect(container.instance().state.selectedItem).toEqual(expected);
            });
        });

        describe('componentWillUnmount', () => {
            it('componentWillUnmount should run correctly', () => {
                const clickHandler = jest.fn();
                document.removeEventListener = jest.fn();
                const container = shallow(<SelectWithSearch {...props} />);
                container.instance().clickHandler = clickHandler;

                // Action
                container.instance().componentWillUnmount();

                // Assert
                expect(document.removeEventListener).toHaveBeenCalledWith('click', clickHandler);
            });
        });

        describe('toggleSelect', () => {
            it('toggleSelect should open select form', () => {
                //Arrange
                const expected = {
                    selectFormStatus: 'open',
                    selectedItem: {
                        id: 0,
                        name: 'N/A'
                    },
                    options: [],
                    isSelectOption: false,
                    filter: '',
                    isHideNA: false,
                    collapsedAll: true
                };
                const container = shallow(<SelectWithSearch {...props} />);

                //Act
                container.instance().toggleSelect();

                //Assert
                expect(container.state()).toEqual(expected);
            });

            it('toggleSelect should close select form', () => {
                //Arrange
                const state = {
                    selectFormStatus: 'open',
                    selectedItem: {
                        id: 0,
                        name: 'N/A'
                    },
                    options: [],
                    isSelectOption: false,
                    filter: '',
                    isHideNA: false,
                    collapsedAll: true
                };
                const container = shallow(<SelectWithSearch {...props} />);
                container.instance().setState(state);

                //Act
                container.instance().toggleSelect();

                //Assert
                expect(container.instance().state.selectFormStatus).toEqual('');
            });
        });

        describe('selectItem', () => {
            it('should set exactly data', () => {
                //Arrange
                const item = { name: 'test', id: 1 };
                const expected = {
                    selectFormStatus: '',
                    selectedItem: {
                        id: 1,
                        name: 'test'
                    },
                    options: [],
                    filter: '',
                    isHideNA: false,
                    isSelectOption: false,
                    collapsedAll: true
                };
                const container = shallow(<SelectWithSearch {...props} />);

                //Act
                container.instance().selectItem(item);

                //Assert
                expect(container.state()).toEqual(expected);
                expect(props.OnChangeValue).toHaveBeenCalled();
            });
        });

        describe('handleChangeSearchInput', () => {
            it('should set exactly data', () => {
                //Arrange
                const event = { target: { value: 'ch', name: 'filter' } };
                const expected = {
                    selectFormStatus: '',
                    selectedItem: {
                        id: 0,
                        name: 'N/A'
                    },
                    options: [],
                    isSelectOption: false,
                    filter: 'test',
                    isHideNA: false,
                    collapsedAll: true
                };
                const newProps = {
                    name: 'N/A',
                    value: 0,
                    options: [{ name: 'parent', childSites: [{ name: 'child' }] }],
                    isHideNA: false,
                    OnChangeValue: jest.fn()
                };
                const container = shallow(<SelectWithSearch {...newProps} />);

                //Act
                container.instance().handleChangeSearchInput(event);

                //Assert
                expect(container.state().filter).toEqual('ch');
                expect(container.state().options).toEqual(newProps.options);
            });
        });

        describe('clearSearchBox', () => {
            it('should set exactly data', () => {
                //Arrange
                const expected = {
                    selectFormStatus: '',
                    selectedItem: {
                        id: 0,
                        name: 'N/A'
                    },
                    options: [],
                    filter: '',
                    isHideNA: false,
                    isSelectOption: false,
                    collapsedAll: true
                };
                const container = shallow(<SelectWithSearch {...props} />);

                //Act
                container.instance().clearSearchBox();

                //Assert
                expect(container.state()).toEqual(expected);
            });
        });

        describe('refreshViewValue', () => {
            it('should set exactly data', () => {
                //Arrange
                const expected = {
                    selectFormStatus: '',
                    selectedItem: {
                        id: 0,
                        name: 'N/A'
                    },
                    options: [],
                    filter: '',
                    isHideNA: false,
                    isSelectOption: false,
                    collapsedAll: true
                };
                const container = shallow(<SelectWithSearch {...props} />);

                //Act
                container.instance().refreshViewValue();

                //Assert
                expect(container.state()).toEqual(expected);
                expect(props.OnChangeValue).toHaveBeenCalled();
            });
        });

        describe('toggleCollapseExpanse', () => {
            it('should set exactly data', () => {
                //Arrange
                const expected = {
                    selectFormStatus: '',
                    selectedItem: {
                        id: 0,
                        name: 'N/A'
                    },
                    options: [],
                    filter: '',
                    isHideNA: false,
                    isSelectOption: false,
                    collapsedAll: false
                };
                const container = shallow(<SelectWithSearch {...props} />);

                //Act
                container.instance().toggleCollapseExpanse();

                //Assert
                expect(container.state()).toEqual(expected);
                expect(props.OnChangeValue).toHaveBeenCalled();
            });
        });

        describe('clickHandler', () => {
            it('should state selectFormStatus not change when not has wrapperRef', () => {
                //Arrange
                const event = {
                    target: {}
                };
                const expected = {
                    selectFormStatus: '',
                    selectedItem: {
                        id: 0,
                        name: 'N/A'
                    },
                    options: [],
                    filter: '',
                    isHideNA: false,
                    isSelectOption: false,
                    collapsedAll: true
                };
                const container = shallow(<SelectWithSearch {...props} />);
                container.instance().wrapperRef = null;
                container.instance().componentDidMount();

                //Act
                container.instance().clickHandler(event);

                //Assert
                expect(container.state()).toEqual(expected);
            });

            it('should state selectFormStatus change', () => {
                //Arrange
                const mockRef = {
                    event: {},
                    contains: jest.fn().mockReturnValue(false)
                };
                const state = {
                    selectFormStatus: 'open',
                    selectedItem: {
                        id: 0,
                        name: 'N/A'
                    },
                    options: [],
                    filter: '',
                    isHideNA: false,
                    isSelectOption: false,
                    collapsedAll: true
                };
                const container = shallow(<SelectWithSearch {...props} />);
                container.instance().wrapperRef.current = mockRef;
                container.instance().setState(state);

                //Act
                container.instance().clickHandler(mockRef.event);

                //Assert
                expect(container.instance().state.selectFormStatus).toEqual('');
            });
        });

        describe('render', () => {
            it('returns correct first div', () => {
                //Act
                const container = shallow(<SelectWithSearch {...props} />);

                //Assert
                expect(container.find('div').first().props().className).toBe('dropdown selectwithsearchtree ');
            });

            it('returns correct ul tag', () => {
                //Act
                const container = shallow(<SelectWithSearch {...props} />);

                //Assert
                expect(container.find('ul').first().props().className).toBe('dropdown-menu');
            });

            it('first li has onclick', () => {
                //Arrange
                const state = {
                    selectFormStatus: 'open',
                    selectedItem: {
                        id: 0,
                        name: 'N/A'
                    },
                    options: [],
                    filter: '',
                    isHideNA: false,
                    isSelectOption: false,
                    collapsedAll: true
                };
                const container = shallow(<SelectWithSearch {...props} />);
                container.instance().setState(state);
                container.instance().clearSearchBox = jest.fn();

                //Act
                container.find('ul').first().find('li').first().find('div').first().find('span').first().simulate('click');

                //Assert
                expect(container.instance().clearSearchBox).toHaveBeenCalled();
            });

            it('second li has onclick', () => {
                //Arrange
                const state = {
                    selectFormStatus: 'open',
                    selectedItem: {
                        id: 0,
                        name: 'N/A'
                    },
                    options: [],
                    filter: '',
                    isHideNA: false,
                    isSelectOption: false,
                    collapsedAll: true
                };
                const container = shallow(<SelectWithSearch {...props} />);
                container.instance().setState(state);
                container.instance().toggleCollapseExpanse = jest.fn();

                //Act
                container.find('ul').first().find('li').at(1).find('div').first().find('span span').simulate('click');

                //Assert
                expect(container.instance().toggleCollapseExpanse).toHaveBeenCalled();
            });

            it('fourth li has onclick', () => {
                //Arrange
                const state = {
                    selectFormStatus: 'open',
                    selectedItem: {
                        id: 0,
                        name: 'N/A'
                    },
                    options: [{ name: 'parent1', childSites: [{ name: 'child1' }] }],
                    filter: '',
                    isHideNA: false,
                    isSelectOption: false,
                    collapsedAll: true
                };

                //Act
                const container = shallow(<SelectWithSearch {...props} />);
                container.instance().setState(state);

                //Assert
                expect(container.find('ul li').at(3).find('ul').find('li').first().html()).toContain('N/A');
                for (let i = 0; i < state.options.length; i++) {
                    let item = state.options[i];
                    expect(container.find('ul li').at(3).find('ul').find('li').at(i + 1).html()).toContain(item.name);
                    for (let j = 0; j < item.childSites.length; j++) {
                        let child = item.childSites[j];
                        expect(container.find('ul li').at(3).find('ul').find('li').at(i + 1).find('ul').find('li').at(j).html()).toContain(child.name);
                    }
                }
            });

            function simulateClickChild(i, j, value) {
                it(`at index ${i} - ${j}`, () => {
                    //Arrange
                    const state = {
                        selectFormStatus: 'open',
                        selectedItem: {
                            id: 0,
                            name: 'N/A'
                        },
                        options: [{ name: 'parent1', childSites: [{ name: 'child1' }] }],
                        filter: '',
                        isHideNA: false,
                        isSelectOption: false,
                        collapsedAll: true
                    };

                    const container = shallow(<SelectWithSearch {...props} />);
                    container.instance().setState(state);
                    container.instance().selectItem = jest.fn();

                    //Act
                    container.find('ul li').at(3).find('ul').find('li').at(i + 1).find('ul').find('li').at(j).find('a').simulate('click', value);

                    //Assert
                    expect(container.instance().selectItem).toHaveBeenCalledWith(value);
                });
            }

            describe('has child option onclick', () => {
                //Arrange
                const data = {
                    options: [{ name: 'parent1', childSites: [{ name: 'child1' }] }]
                };

                //Act
                for (let i = 0; i < data.options.length; i++) {
                    let item = data.options[i];
                    for (let j = 0; j < item.childSites.length; j++) {
                        let child = item.childSites[j];
                        simulateClickChild(i, j, child);
                    }
                }
            });
        });
    });
});