import React from 'react';
import { shallow } from 'enzyme';
import AppContainer  from '../AppContainer';
import Filter from '../Filter';
import DataGrid from '../DataGrid';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import LangHelper from '@jsroot/common/langHelper';

jest.mock('react-toastify');

describe('AppContainer', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.clearAllMocks();
    });
    it('should render correctly', () => {
        //Act
        const container = shallow(<AppContainer />);

        container.instance().render();
        //Assert
        expect(container).toMatchSnapshot();
        expect(container.find(Filter).length).toBe(0);
        expect(container.find(DataGrid).length).toBe(0);
    });
});