import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import toJson from 'enzyme-to-json';

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    const props = {
        id: 1,
        customerInfo: {
            titleId: 0,
        },
        setActiveTab: jest.fn(),
        setErrors: jest.fn(),
        getAllSettings: jest.fn(),
        getSettingPicCommunicationTools: jest.fn(),
        getCustomerById: jest.fn()           
    };

    describe('componentDidMount', () => {
        it('should do reset store', () => {
            const container = shallow(<AppContainer {...props} />);

            // Action
            container.instance().componentDidMount();

            // Assert
            expect(props.setActiveTab).toHaveBeenCalled();
            expect(props.setErrors).toHaveBeenCalled();
            expect(props.getAllSettings).toHaveBeenCalled();
        });
    });

    describe('render', () => {
        it('should do reset store', () => {
            const container = shallow(<AppContainer {...props} />);

            // Action
            container.instance().componentDidMount();

            // Assert
            expect(props.setActiveTab).toHaveBeenCalled();
            expect(props.setErrors).toHaveBeenCalled();
            expect(props.getAllSettings).toHaveBeenCalled();
        });
    });
});