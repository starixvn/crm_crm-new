import React from 'react';
import { shallow } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';
import { AppContainer } from '../AppContainer';
import Filter from '../Filter';
import DataGrid from '../DataGrid';
import Detail from '../Detail';

describe('AppContainer', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn((key) => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('componentDidMount', () => {
        it('should call getAllSettings', () => {
            // Arrange
            const props = {
                getAllSettings: jest.fn(),
                detailPopup: { show: true }
            };

            //Act
            shallow(<AppContainer {...props} />);

            // Assert
            expect(props.getAllSettings).toHaveBeenCalled();
        });
    });

    describe('render', () => {
        it('should return null', () => {
            // Arrange
            const props = {
                detailPopup: { show: true },
                settings: null,
                getAllSettings: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props} />);

            // Assert
            expect(container).toEqual({});
        });

        it('should render detail', () => {
            // Arrange
            const props = {
                detailPopup: { show: true },
                settings: {currencies: [{id: 2,name: "RM"}]},
                getAllSettings: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props} />);

            // Assert
            expect(container).toMatchSnapshot();
            expect(container.find(Detail).length).toBe(1);
            expect(container.find(Filter).length).toBe(1);
        });

        it('should render datagrid', () => {
            // Arrange
            const props = {
                detailPopup: { show: false },
                settings: {currencies: [{id: 2,name: "RM"}]},
                getAllSettings: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props} />);

            // Assert
            expect(container).toMatchSnapshot();
            expect(container.find(DataGrid).length).toBe(1);
            expect(container.find(Filter).length).toBe(1);
        });
    });
});