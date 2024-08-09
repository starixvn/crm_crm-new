import React from 'react';
import { shallow } from 'enzyme';
import { AutoRefresh } from '../AutoRefresh';
import LangHelper from '@jsroot/common/langHelper';
import  * as functions from '../../common.functions';

describe('AutoRefresh', () => {
    beforeAll(() =>{
        LangHelper.getResource = jest.fn((key) => key);
        functions.isValidGetDataAutoRefresh = jest.fn(() => true);
        document.addEventListener = jest.fn();

        jest.useFakeTimers();
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    
});