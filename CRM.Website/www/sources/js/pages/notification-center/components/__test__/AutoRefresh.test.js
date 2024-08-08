import React from 'react';
import { shallow } from 'enzyme';
import { AutoRefresh } from '../AutoRefresh';
import LangHelper from '@jsroot/common/langHelper';
import  * as functions from '../../common.functions';
import { REFRESH_CENTER_TIMES } from '@jsroot/common/constants';

describe('AutoRefresh', () => {
    beforeAll(() =>{
        jest.useFakeTimers();
        LangHelper.getResource = jest.fn((key) => key);
        functions.isValidGetDataAutoRefresh = jest.fn(() => true);
    });
    afterAll(() => {
        jest.clearAllMocks();
    });


});