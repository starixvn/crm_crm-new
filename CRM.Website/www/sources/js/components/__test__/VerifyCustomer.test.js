import VerifyCustomer from '../VerifyCustomer'
import React from 'react'
import { shallow } from 'enzyme'

describe('render', () => {
    const props = {
        listOfCustomers:[{isSiteActive :false, isLicensee: true, custId: 1, val: 'test'}, {isSiteActive :true, isLicensee: true, custId: 0, val: 'test'}],
        isCommunicationLog: true,
        onClick: jest.fn()
    }
    it('has correct snapshots ', () => {
        // Action
        const component = shallow(<VerifyCustomer {...props} />);

        // Assert
        expect(component).toMatchSnapshot();
    });

    it('should work exactly when click time ', () => {
        // Action
        const container = shallow(<VerifyCustomer {...props} />);
        container.find('div div div').at(0).simulate('click');
        // Assert

    });

    it('renderClassNameCustomer', () => {
        const item = {isSiteActive :true, isLicensee: true, custId: 1, val: 'test'};
        // Action
        const container = shallow(<VerifyCustomer {...props} />);
        const className = container.instance().renderClassNameCustomer(item);
        // Assert
        expect(className).toEqual('customer');
    });

    it('renderClassNameCustomer', () => {
        const item = {isSiteActive :true, isLicensee: true, custId: -1, val: 'test'};
        // Action
        const container = shallow(<VerifyCustomer {...props} />);
        const className = container.instance().renderClassNameCustomer(item);
        // Assert
        expect(className).toEqual('guest');
    });
})

describe('sizeColumn', () => {
    it('isCommunicationLog is true ', () => {
        const props = {
            isCommunicationLog: true
        }
        // Action
        const container = shallow(<VerifyCustomer {...props} />);
        const size = container.instance().sizeColumn(props.isCommunicationLog,null);

        // Assert
        expect(size).toEqual(10);
    });
    
    it('isCommunicationLog is false and isSmallWidth true', () => {
        const props = {
            isCommunicationLog: false,
            isSmallWidth: true
        }
        // Action
        const container = shallow(<VerifyCustomer {...props} />);
        const size = container.instance().sizeColumn(props.isCommunicationLog, props.isSmallWidth);
        // Assert
        expect(size).toEqual(7);
    });

    it('isCommunicationLog is false and isSmallWidth false', () => {
        const props = {
            isCommunicationLog: false,
            isSmallWidth: false
        }
        // Action
        const container = shallow(<VerifyCustomer {...props} />);
        const size = container.instance().sizeColumn(props.isCommunicationLog, props.isSmallWidth);
        // Assert
        expect(size).toEqual(9);
    });
})
