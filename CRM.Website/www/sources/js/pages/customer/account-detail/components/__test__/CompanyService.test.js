import React from 'react';
import { shallow } from 'enzyme';
import { CompanyService } from '../CompanyService';

describe('CompanyService', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        companyService: [{
            communicationID: 1,
            communicationName: "test",
            communicationValue: "test",
            companyServiceID: 1,
            companyServiceName: "test",
            headlineID: 1,
            isError: false,
            isOffered: true,
            isSuggest: false
        }],
        chatTypeMapping: [],
        headlineCompanyService: {
            item1: [{
                communicationID: 1,
                communicationName: "test",
                communicationValue: "test",
                companyServiceID: 1,
                companyServiceName: "test",
                headlineID: 1,
                isError: false,
                isOffered: true,
                isSuggest: false
            }],
            item2: []
        },
        settingCommunicationTool: [],
        getHeadlineCompanyService: jest.fn()
    }

    describe('componentDidMount', () => {
        it('should fetch data and update state', async () => {
            // Arrange
            const mockHeadlineCompanyService = jest.fn(() => Promise.resolve('mockCompanyServiceData'));
        
            // Action
            const wrapper = shallow(<CompanyService {...initProps}/>);
            const instance = wrapper.instance();
            instance.getHeadlineCompanyService = mockHeadlineCompanyService.mockResolvedValue('mockCompanyServiceData');
            await instance.componentDidMount();
        
            // Assert
            expect(initProps.getHeadlineCompanyService).toHaveBeenCalled();
        });
    });

    describe('getHeadlineCompanyService', () => {
        it('should fetch data and update state', async () => {
            // Arrange                   
            // Action
            const wrapper = shallow(<CompanyService {...initProps} />);
            const instance = wrapper.instance();
            await instance.getHeadlineCompanyService();
        
            // Assert
            expect(wrapper.state('companyService')).toEqual([
                { 
                    communicationID: 1,
                    communicationName: "test",
                    communicationValue: "test",
                    companyServiceID: 1,
                    companyServiceName: "test",
                    headlineID: 1,
                    isError: false,
                    isOffered: true,
                    isSuggest: false
                }
            ]);
            expect(wrapper.state('chatTypeMapping')).toEqual([]);
        });
    });

    describe('componentDidUpdate', () => {
        it('should handle tab change and call handleComfirmChangeTab', () => {
            // Arrange                   
            const mockState = {
                companyService: [
                { headlineID: '1', companyServiceID: '1', companyServiceName: 'Service 1', isOffered: true },
                { headlineID: '1', companyServiceID: '2', companyServiceName: 'Service 2', isOffered: false }
                ]
            };
        
            // Action
            const wrapper = shallow(<CompanyService {...initProps} />);
            const instance = wrapper.instance();
            instance.state = mockState;
            wrapper.setProps({ activeTab: { tabId: 'newTabId' } });
        
            // Assert
        });
      
        it('should not do anything if activeTab is null', () => {
            // Arrange                   
            const mockHandleComfirmChangeTab = jest.fn();
            const mockState = {
                companyService: [
                { headlineID: '1', companyServiceID: '1', companyServiceName: 'Service 1', isOffered: true },
                { headlineID: '1', companyServiceID: '2', companyServiceName: 'Service 2', isOffered: false }
                ]
            };
        
            // Action
            const wrapper = shallow(<CompanyService {...initProps} />);
            const instance = wrapper.instance();
            instance.state = mockState;
            wrapper.setProps({ activeTab: null });
        
            // Assert
            expect(mockHandleComfirmChangeTab).not.toHaveBeenCalled();
        });
    });
});