import React from 'react';
import { Form } from 'react-bootstrap';
import { Filter } from '../Filter';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import { shallow } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';
import { toast } from 'react-toastify';
import toJson from 'enzyme-to-json';

jest.mock('react-toastify');

describe('Filter', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn(key => key);
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    it('renders component correctly', () => {
        // Arrange
        const props = {
            setting: {
                roleListWithInActive: [
                    {
                        settingId: 1,
                        settingValue: 'PIC'
                    }
                ]
            },
            getAllSetting: jest.fn(() => Promise.resolve({})),
            isHost: true
        };

        // Act
        const container = shallow(<Filter {...props} />);

        // Assert
        expect(toJson(container)).toMatchSnapshot();
    });

    it('component has correct initialState', () => {
        // Arrange
        const initialState = {
            filter: {
                username: '',
                headlineName: '',
                role: ''
            },
            settingRoles: []
        };

        const props = {
            setting: {
                roleListWithInActive: []
            },
            getAllSetting: jest.fn(() => Promise.resolve({}))
        };

        // Action
        const container = shallow(<Filter {...props} />);

        // Assert
        expect(container.state()).toEqual(initialState);
    });

    it('componentDidMount runs correctly', async () => {
        // Arrange
        const promise = Promise.resolve({});

        const props = {
            setting: {
                roleListWithInActive: [
                    {
                        settingId: 1,
                        settingValue: 'PIC'
                    }
                ]
            },
            getAllSetting: jest.fn(() => promise)
        };
        const filter = {
            username: '',
            headlineName: '',
            role: '1'
        };

        const settingRoles = props.setting.roleListWithInActive.map(r => {
            return { ...r, checked: true };
        });

        // Action
        const container = shallow(<Filter {...props} />);

        // Assert
        expect(props.getAllSetting).toHaveBeenCalled();
        promise.then(() => {
            expect(container.instance().state.filter).toEqual(filter);
            expect(container.instance().state.settingRoles).toEqual(settingRoles);
            expect(container.find(Form.Control).at(0).props().value).toEqual('');
            expect(container.find(Form.Control).at(0).props().value).toEqual('');
            expect(container.find(MultipleSelect).first().props().dataSource).toEqual(settingRoles);
        });
    });

    describe('methods', () => {
        it('getParams return expected', () => {
            // Arrange
            const filter = {
                username: 'a',
                headlineName: 'b',
                role: '1, 2'
            };
            const expected = {
                username: filter.username,
                headlineName: filter.headlineName,
                role: filter.role,
                pageIndex: 1,
                pageSize: 100
            };
            const props = {
                setting: {
                    roleListWithInActive: []
                },
                gridParams: {
                    username: '',
                    headlineName: '',
                    role: '',
                    pageIndex: 1,
                    pageSize: 100
                },
                getAllSetting: jest.fn(() => Promise.resolve({})),
                setCreatePicPopup: jest.fn()
            };
            const container = shallow(<Filter {...props} />);
            container.instance().state.filter = filter;

            // Act
            const result = container.instance().getParams();

            // Assert
            expect(result).toEqual(expected);
        });

        describe('handleOpenCreatePopup should calls setCreatePicPopup', () => {
            // Arrange
            const props = {
                setting: {
                    roleListWithInActive: []
                },
                getAllSetting: jest.fn(() => Promise.resolve({})),
                setCreatePicPopup: jest.fn()
            };
            const container = shallow(<Filter {...props} />);

            // Act
            container.instance().handleOpenCreatePopup();

            // Assert
            expect(props.setCreatePicPopup).toHaveBeenCalledWith({ show: true });
        });

        describe('handleChangeFilter', () => {

            // Arrange
            const props = {
                setting: {
                    roleListWithInActive: []
                },
                getAllSetting: jest.fn(() => Promise.resolve({}))
            };
            const container = shallow(<Filter {...props} />);

            it('should calls setState when called', () => {
                // Arrange
                const expected = {
                    username: 'a',
                    headlineName: '',
                    role: ''
                };

                // Act
                container.instance().handleChangeFilter('username', 'a');

                // Assert
                expect(container.instance().state.filter).toEqual(expected);
            });

            it('should be called when input username change', () => {
                // Arrange
                const event = {
                    target: { value: 'a' }
                };
                container.instance().handleChangeFilter = jest.fn();

                // Act
                container.find(Form.Control).at(0).props().onChange(event);

                // Assert
                expect(container.instance().handleChangeFilter).toHaveBeenCalledWith('username', 'a');
            });

            it('should be called when input headlineName change', () => {
                // Arrange
                const event = {
                    target: { value: 'a' }
                };
                container.instance().handleChangeFilter = jest.fn();

                // Act
                container.find(Form.Control).at(1).props().onChange(event);

                // Assert
                expect(container.instance().handleChangeFilter).toHaveBeenCalledWith('headlineName', 'a');
            });

            it('should be called when input headlineName change', () => {
                // Arrange
                const currentItem = 'currentItem';
                const selectedItemsKey = 'selectedItemsKey';
                container.instance().handleChangeFilter = jest.fn();

                // Act
                container.find(MultipleSelect).first().simulate('change', currentItem, selectedItemsKey);

                // Assert
                expect(container.instance().handleChangeFilter).toHaveBeenCalledWith('role', selectedItemsKey);
            });
        });

        describe('submitHandler runs correctly', () => {
            it('should show error when role empty', () => {
                //Arrange
                const props = {
                    setting: {
                        roleListWithInActive: []
                    },
                    getAllSetting: jest.fn(() => Promise.resolve({})),
                    setGridParams: jest.fn(),
                    getGridData: jest.fn()
                };
                const event = {
                    preventDefault: jest.fn()
                };
                const container = shallow(<Filter {...props} />);
                container.instance().state.filter.role = '';

                // Act
                container.instance().submitHandler(event);

                // Assert
                expect(event.preventDefault).toHaveBeenCalled();
                expect(toast.error).toHaveBeenCalledWith('PleaseChooseRole');
            });
            it('should call expected method when role not empty', () => {
                //Arrange
                const props = {
                    setting: {
                        roleListWithInActive: []
                    },
                    getAllSetting: jest.fn(() => Promise.resolve({})),
                    setGridParams: jest.fn(),
                    getGridData: jest.fn()
                };
                const event = {
                    preventDefault: jest.fn()
                };
                const container = shallow(<Filter {...props} />);
                const params = {
                    username: 'a',
                    headlineName: 'b',
                    role: '1',
                    pageIndex: 1,
                    pageSize: 100
                };
                container.instance().getParams = jest.fn(() => params);
                container.instance().state.filter.role = '1';

                // Act
                container.instance().submitHandler(event);

                // Assert
                expect(event.preventDefault).toHaveBeenCalled();
                expect(container.instance().getParams).toHaveBeenCalled();
                expect(props.setGridParams).toHaveBeenCalledWith(params);
                expect(props.getGridData).toHaveBeenCalledWith(params);
            });
        });
    });
});