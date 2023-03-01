import React from 'react';
import WithHotKey from '../WithHotKey';
import { shallow } from 'enzyme';

describe('WithHotKey', () => {
    beforeAll(() => {
        const appContainer = document.createElement('div');
        appContainer.setAttribute('id', 'right-row-container');
        document.body.appendChild(appContainer);
    });
    
    afterAll(() => {
        const appContainer = document.getElementById('right-row-container');
        if (appContainer) {
            document.body.removeChild(appContainer);
        }
        jest.clearAllMocks();
    });

    const props = {
        isDocumentHandle: true,
        handleKeyDownFunc: jest.fn()
    };

    describe('componentDidMount', () => {
        it('should add event listener to document if isDocumentHandle is true', () => {
            const addEventListenerMock = jest.spyOn(document, 'addEventListener');
            const removeEventListenerMock = jest.spyOn(document, 'removeEventListener');
            const wrapper = shallow(<WithHotKey {...props} />).instance();
            wrapper.componentDidMount();
            expect(removeEventListenerMock).toHaveBeenCalledWith('keydown', props.handleKeyDownFunc, false);
            expect(addEventListenerMock).toHaveBeenCalledWith('keydown', props.handleKeyDownFunc, false);
        });

        it('should add event listener to rightContainer if isDocumentHandle is false', () => {
            const addEventListenerMock = jest.spyOn(HTMLElement.prototype, 'addEventListener');
            const removeEventListenerMock = jest.spyOn(HTMLElement.prototype, 'removeEventListener');
            props.isDocumentHandle = false;
            const wrapper = shallow(<WithHotKey {...props} />).instance();
            wrapper.componentDidMount();
            const rightContainer = document.getElementById('right-row-container');
            expect(rightContainer).toBeDefined();
            expect(removeEventListenerMock).toHaveBeenCalledWith('keydown', props.handleKeyDownFunc, false);
            expect(addEventListenerMock).toHaveBeenCalledWith('keydown', props.handleKeyDownFunc, false);
        });
    });

    describe('componentWillUnmount', () => {
        it('should remove event listener to document if isDocumentHandle is true', () => {
            const removeEventListenerMock = jest.spyOn(document, 'removeEventListener');
            const wrapper = shallow(<WithHotKey {...props} />).instance();
            wrapper.componentWillUnmount();
            expect(removeEventListenerMock).toHaveBeenCalledWith('keydown', props.handleKeyDownFunc, false);
        });

        it('should remove event listener to rightContainer if isDocumentHandle is false', () => {
            const removeEventListenerMock = jest.spyOn(HTMLElement.prototype, 'removeEventListener');
            props.isDocumentHandle = false;
            const wrapper = shallow(<WithHotKey {...props} />).instance();
            wrapper.componentWillUnmount();
            expect(removeEventListenerMock).toHaveBeenCalledWith('keydown', props.handleKeyDownFunc, false);
        });
    });
});