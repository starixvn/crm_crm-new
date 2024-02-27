import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Filter } from '../Filter';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Filter', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        const hasReadSitePermission = document.createElement('div');
        hasReadSitePermission.setAttribute('id', 'hasReadSitePermission');
        document.body.appendChild(hasReadSitePermission);
    });

    afterEach(() => {
        const hasReadSitePermission = document.getElementById('hasReadSitePermission');
        if (hasReadSitePermission) {
            document.body.removeChild(hasReadSitePermission);
        }
    });

    it('render filter component', () => {
        // Arrange
        const props = {
            gridParams: { year: NaN }
        };

        // Act
        const container = shallow(<Filter {...props} />);

        // Assert
        expect(toJson(container)).toMatchSnapshot();
    });

    it('should call setGridParams with new year when onChange select year', () => {
        // Arrange
        const param = {
            year: NaN,
            pageIndex: 1,
            pageSize: 12
        };
        const props = {
            setGridParams: jest.fn(),
            gridParams: param
        };
        const event = {
            target: { value: 2019 }
        };
        const container = shallow(<Filter {...props} />);

        // Act
        container.find(Form.Control).first().simulate('change', event);

        // Assert
        expect(props.setGridParams).toHaveBeenCalledWith({ ...param, year: event.target.value });
    });

    // it('should call getGridData when click submit button', () => {
    //     // Arrange
    //     const param = {
    //         year: NaN,
    //         pageIndex: 1,
    //         pageSize: 12
    //     };
    //     const props = {
    //         getGridData: jest.fn(),
    //         setGridParams: jest.fn(),
    //         gridParams: param
    //     };
    //     const container = shallow(<Filter {...props} />);

    //     // Act
    //     container.find(Button).props().onClick({ preventDefault: jest.fn() });

    //     // Assert
    //     expect(props.getGridData).toHaveBeenCalledWith(param);
    // });
});