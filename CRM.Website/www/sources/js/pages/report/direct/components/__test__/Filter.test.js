import React from 'react';
import { Button, Form, Span } from 'react-bootstrap';
import { Filter } from '../Filter';
import { shallow } from 'enzyme';

describe('Filter', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    it('render filter component', () => {
        // Arrange
        const props = {
            gridParams: {
                headline: null,
                username: null,
                excludeIgnoredAcc: true,
                pageIndex: 1,
                pageSize: 100
            },
        };

        // Act
        const container = shallow(<Filter {...props} />);

        // Assert
        expect(container).toMatchSnapshot();
    });
    
    it('should call setState with new excludeIgnoredAcc when onChange check box Exclude ignored accounts ', () => {
        // Arrange
        const param = {
            headline: null,
            username: null,
            excludeIgnoredAcc: true,
            showFilter: true,
        };
        const expected = {
            headline: null,
            username: null,
            excludeIgnoredAcc: false,
            showFilter: true,
        };
        const props = {
            setGridParams: jest.fn(),
            gridParams: param
        };
        const event = {
            target: { checked: false }
        };

        // Act
        const container = shallow(<Filter {...props} />);
        container.find(Form.Check).first().simulate('change', event);

        // Assert
        expect(container.instance().state).toEqual(expected);
    });

    it('should call setState with new headline when typed input headline', () => {
        // Arrange
        const param = {
            headline: null,
            username: null,
            excludeIgnoredAcc: true,
            showFilter: true,
        };
        const expected = {
            headline: '0000HK',
            username: null,
            excludeIgnoredAcc: true,
            showFilter: true,
        };
        const props = {
            setGridParams: jest.fn(),
            gridParams: param
        };
        const event = {
            target: { value: '0000HK' }
        };

        // Act
        const container = shallow(<Filter {...props} />);
        container.find(Form.Control).first().simulate('change', event);

        // Assert
        expect(container.instance().state).toEqual(expected);
    });

    it('should call setState with new username when typed input username', () => {
        // Arrange
        const param = {
            headline: null,
            username: null,
            excludeIgnoredAcc: true,
            showFilter: true,
        };
        const expected = {
            headline: null,
            username: '0000HK',
            excludeIgnoredAcc: true,
            showFilter: true,
        };
        const props = {
            setGridParams: jest.fn(),
            gridParams: param
        };
        const event = {
            target: { value: '0000HK' }
        };

        // Act
        const container = shallow(<Filter {...props} />);
        container.find(Form.Control).last().simulate('change', event);

        // Assert
        expect(container.instance().state).toEqual(expected);
    });

    it('should call getGridData when click submit button', () => {
        // Arrange
        const param = {
            headline: null,
            username: null,
            excludeIgnoredAcc: true,
            pageIndex: 1,
            pageSize: 100
        };
        const props = {
            getGridData: jest.fn(),
            setGridParams: jest.fn(),
            gridParams: param
        };
        const container = shallow(<Filter {...props} />);

        // Act
        container.find(Button).props().onClick({ preventDefault: jest.fn() });

        // Assert
        expect(props.getGridData).toHaveBeenCalledWith(param);
    });

    it('should call setState when click zoom out/in filter ', () => {
         // Arrange
         const param = {
            headline: null,
            username: null,
            excludeIgnoredAcc: true,
            showFilter: true,
        };
        const expected = {
            headline: null,
            username: null,
            excludeIgnoredAcc: true,
            showFilter: true,
        };
        const props = {
            setGridParams: jest.fn(),
            gridParams: param
        };

        // Act
        const container = shallow(<Filter {...props} />);
        container.instance().handleToggleFilter(true);

        // Assert
        expect(container.instance().state).toEqual(expected);
    });

    it('click handle Toggle Filter showFilter is true', () => {
        // Arrange
        // Arrange
        const param = {
            headline: null,
            username: null,
            excludeIgnoredAcc: true,
            showFilter: true,
        };
        const props = {
            setGridParams: jest.fn(),
            gridParams: param
        };
        const container = shallow(<Filter {...props} />);
        container.instance().handleToggleFilter = jest.fn();
        // Act
        container.find('span').at(0).simulate('click');
        // Assert
        expect(container.instance().handleToggleFilter).toHaveBeenCalled();
    });

    it('click handle Toggle Filter showFilter is false', () => {
        // Arrange
        const param = {
            headline: null,
            username: null,
            excludeIgnoredAcc: true,
            showFilter: false,
        };
        const props = {
            setGridParams: jest.fn(),
            gridParams: param
        };
        const container = shallow(<Filter {...props} />);
        container.instance().handleToggleFilter = jest.fn();
        container.instance().setState(param);
        // Act
        container.find('span').at(0).simulate('click');
        // Assert
        expect(container.instance().handleToggleFilter).toHaveBeenCalled();
    });
});