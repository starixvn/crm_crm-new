import React from 'react';
import LangHelper from '@jsroot/common/langHelper';
import Filter from '../Filter';
import { shallow } from 'enzyme';

describe('Filter', () => {
    beforeAll(() =>{
        jest.useFakeTimers();
        LangHelper.getResource = jest.fn((key) => key);
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('render', () => {
        it('should calls handleOpenCreatePopup when click', () => {
            // Arrange
            const props = {
                isHost: true,
                handleOpenCreatePopup: jest.fn()
            };

            // Action
            const container = shallow(<Filter {...props} />);
            container.find('Button').at(0).simulate('click');

            // Assert
            expect(props.handleOpenCreatePopup).toHaveBeenCalled();
        });
    });
});