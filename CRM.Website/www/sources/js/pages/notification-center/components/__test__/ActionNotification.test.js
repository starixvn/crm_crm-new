import React from 'react';
import { shallow } from 'enzyme';
import { ActionNotification } from '../ActionNotification';
import CommonNotification from '../CommonNotification';

describe('ActionNotification', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('render', () => {
        const props = {
            actionParam: {},
            navigate: ''
        };

        it('should render exact component', () => {
            // Arrange
            const container = shallow(<ActionNotification {...props}/>).instance();

            //Act
            const actual = container.render();

            // Assert 
            expect(actual).toEqual(
                <CommonNotification
                    actionParam={props.actionParam}
                    isEdit={true}
                    navigate={props.navigate}
                />
            );
        });
    });
}); 