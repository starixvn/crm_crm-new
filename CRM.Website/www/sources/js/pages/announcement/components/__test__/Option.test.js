import React from 'react';
import { shallow } from 'enzyme';
import Option from '../Option';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import DatePicker from '@jsroot/components/date-picker/index';
import LangHelper from '@jsroot/common/langHelper';

describe('ContentTab', () => {
    beforeAll(() =>{
        LangHelper.getResource = jest.fn((key) => key);
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('render', () => {
        const props = {
            values:{} , handleChange: jest.fn(), errors: {}, touched: {}, stateValue: {headlineGroups: [], siteOptions: [], currencyOptions: []},
            handleDateChange: jest.fn(), handleOptionChange: jest.fn(), settings: {headlineTypeList: []}
        };

        it('should render exact component', () => {
            // Arrange
            const options = shallow(<Option {...props}/>).instance();
            options.renderOption = jest.fn(() => <div />);
            options.renderSendTime = jest.fn(() => <div />);

            //Act
            const actual = options.render();

            // Assert 
            expect(actual).toEqual(<React.Fragment><div /><div /></React.Fragment>);
        });

        it('should call exact props when click change group headline', () => {
            // Arrange
            const options = shallow(<Option {...props}/>).instance();

            //Act
            const option = shallow(options.renderOption(props.values, props.handleChange));
            option.find(MultipleSelect).at(0).simulate('change');

            // Assert 
            expect(props.handleOptionChange).toHaveBeenCalled();
        });

        it('should call exact props when click change currency', () => {
            // Arrange
            const options = shallow(<Option {...props}/>).instance();

            //Act
            const option = shallow(options.renderOption(props.values, props.handleChange));
            option.find(MultipleSelect).at(1).simulate('change');

            // Assert 
            expect(props.handleOptionChange).toHaveBeenCalled();
        });

        it('should call exact props when click change currency', () => {
            // Arrange
            const options = shallow(<Option {...props}/>).instance();

            //Act
            const option = shallow(options.renderSendTime(props.values, props.handleChange, {}, {}));
            option.find(DatePicker).simulate('change');

            // Assert 
            expect(props.handleDateChange).toHaveBeenCalled();
        });
    });
}); 