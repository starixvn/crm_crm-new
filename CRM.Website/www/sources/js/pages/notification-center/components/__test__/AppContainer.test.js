import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import LangHelper from '@jsroot/common/langHelper';
import * as shareScripts from '@jsroot/common/shareScripts';
import  * as functions from '../../common.functions';

describe('AppContainer', () => {
    const promise = Promise.resolve({});
    beforeAll(() =>{
        jest.useFakeTimers();
        LangHelper.getResource = jest.fn((key) => key);
        shareScripts.getPermission = jest.fn(() => promise);
        functions.isEitherExitsFromToId = jest.fn(() => false);
        functions.isFromIdOverToId = jest.fn(() => false);
        functions.isExceedMaxInt = jest.fn(() => false);
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        isLoadGrid: true,
        getGridData: jest.fn(),
        setAutoRefresh: jest.fn(),
        setGridData: jest.fn(),
        filterParams: [],
        gridParams: {
            fromDate: '08/08/2024',
            toDate: '10/08/2024',
        },
        autoRefresh: {
            value: ''
        }
    }

    describe('componentDidMount', () => {
        const props = {
            ...initProps
        };

        it('should call exactly props function', () => {
            //Arrange
            const container = shallow(<AppContainer {...props}/>).instance();
            container.isLoadGrid = true;
            container.isMeetRequired = jest.fn(() => true);

            //Act
            container.componentDidMount();

            // Assert
            expect(props.setAutoRefresh).toHaveBeenCalled();
            expect(props.getGridData).toHaveBeenCalled();
        });
    });

    describe('componentWillUnmount', () => {
        const props = {
            ...initProps
        };

        it('should call exactly props function', () => {
            //Arrange
            const container = shallow(<AppContainer {...props}/>).instance();
            container.isLoadGrid = true;
            container.isMeetRequired = jest.fn(() => true);

            //Act
            container.componentWillUnmount();

            // Assert
            expect(props.setGridData).toHaveBeenCalledWith(null);
        });
    });

    describe('isMeetRequired', () => {
        const props = {
            ...initProps
        };

        it('should return exactly', () => {
            //Arrange
            const container = shallow(<AppContainer {...props}/>).instance();
            container.isLoadGrid = true;
            container.isMeetRequired = jest.fn(() => true);

            //Act
            var actual = container.isMeetRequired({});

            // Assert
            expect(actual).toEqual(true);
        });
    });

    describe('render', () => {
        const props = {
            ...initProps
        };

        it('should return null', () => {
            //Arrange
            var state = { policy: false };
            const container = shallow(<AppContainer {...props}/>).instance();
            container.setState(state);
            container.isLoadGrid = true;
            container.isMeetRequired = jest.fn(() => true);

            //Act
            var actual = container.render();

            // Assert
            expect(actual).toEqual(null);
        });
    });
});