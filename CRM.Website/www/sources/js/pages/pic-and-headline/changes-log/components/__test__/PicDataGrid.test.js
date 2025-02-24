import React from 'react';
import { PicDataGrid } from '../PicDataGrid';
import { HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { shallow } from 'enzyme';
import { LogActions } from '@jsroot/common/constants';

describe('PicDataGrid', () => {
    beforeAll(() => {
        const appContainer = document.createElement('div');
        appContainer.setAttribute('id', 'right-row-container');
        document.body.appendChild(appContainer);
    });

    afterAll(() => {
        const appContainer = document.getElementById('right-row-container');
        if (appContainer) {
            document.body.removeChild(appContainer);
        }
        jest.clearAllMocks();
    });

    const initProp = {
        gridParamsPic: { pageIndex: 1, pageSize: 100},
        picReport: {
            picInfo: [{
                action: 'Insert new PIC',
                actionId: 901,
                editBy: 'crmRuby',
                logDate: 'Mar 01, 2022 09:36:04 AM',
                logId: 305547,
                logTime: 'Mar 01, 2022\n(09:36:04 AM)',
                newPicInfo:{
                    communicationTools: [{
                        id: 49000,
                        name: 'Letstalk',
                        value: 'test'
                        }
                    ],
                    country:{
                        id: 4,
                        name: 'Albania' 
                    },
                    directAccounts: [],
                    headlines: [{ id: 1, name: 'test' }],
                    isActive: false,
                    languages: [{id: 12001,name: 'Mandarin'}],
                    name: 'PIC_ruby',
                    picTypes: [{id: 51000, name: 'Headline PIC'}],
                    remark: 't',
                    role: {id: 48000, name: 'PIC'}
                },
                newLogInfo:{
                    communicationTools: [{
                        id: 49000,
                        name: 'Letstalk',
                        value: 'test'
                        }
                    ],
                    country:{
                        id: 4,
                        name: 'Albania' 
                    },
                    conversationGroup: {name: ''},
                    directAccounts: [],
                    headlines: [{ id: 1, name: 'test' }],
                    isActive: false,
                    languages: [{id: 12001,name: 'Mandarin'}],
                    name: 'PIC_ruby',
                    picTypes: [{id: 51000, name: 'Headline PIC'}],
                    remark: 't',
                    role: {id: 48000, name: 'PIC'},
                    recipients: [{ id: 1, name: 'test' }]
                },
                oldLogInfo:{
                    communicationTools: [],
                    country: null,
                    conversationGroup: {name: ''},
                    directAccounts: [{ id: 1, name: 'test' }],
                    headlines: [{ id: 1, name: 'test' }],
                    isActive: false,
                    languages: [{ id: 1, name: 'test' }],
                    name: null,
                    picTypes: [],
                    remark: null,
                    role: null,
                    recipients: [{ id: 1, name: 'test' }]
                },
                oldPicInfo:{
                    communicationTools: [],
                    country: null,
                    directAccounts: [],
                    headlines: [],
                    isActive: false,
                    languages: [],
                    name: null,
                    picTypes: [],
                    remark: null,
                    role: null
                },
                pic: 'PIC_ruby',
                picTypeName: 'Headline PIC',
                recipientType: [{ id: 1, name: 'test' }],
                recipients: [{ id: 1, name: 'test' }]
            }]
        },
        setGridParamsPic: jest.fn(),
        getPicReport: jest.fn()
    };

    describe('buildHeader', () => {
        it('should render expected header', () => {
            // Act
            const container = shallow(<PicDataGrid {...initProp}/>).instance();
            const header = shallow(container.buildHeader());

            // Assert
            expect(header.find(HeaderCell).length).toBe(8);
        });
    });

    describe('buildBody', () => {
        it('should render no data when data is empty', () => {
            // Arrange
            const props = {...initProp};
            props.picReport = {picInfo: []};
            const expectedBody = [<Row key={`body${1}`} className='no-data' ><Cell className='text-center' colSpan={8}>ThereIsNoData</Cell></Row>];
            const container = shallow(<PicDataGrid {...props} />).instance();

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual(expectedBody);
        });

        it('should render expected rows when has data', () => {
            // Arrange
            const container = shallow(<PicDataGrid {...initProp} />).instance();
            container.renderRow = jest.fn(() => <div />);

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual([<div />]);
        });
    });

    describe('renderRow', () => {
        it('should return exactly row when has data', () => {
            // Arrange
            const item = initProp.picReport.picInfo[0];
            const container = shallow(<PicDataGrid {...initProp}/>).instance();
            container.renderDetailsValuePic = jest.fn(() => '<div>details</div>');
            
            // Act
            const actual = shallow(container.renderRow(item, 1));

            // Assert
            expect(actual.find(Cell).length).toBe(8);
        });
    });

    describe('renderDetailsValuePic', () => {
        const cases = [[LogActions.InsertNewPic], [LogActions.UpdatePic], [LogActions.UpdatePicStatus], [LogActions.InsertChatTypeMapping],
        [LogActions.UpdateChatTypeMapping], [LogActions.UpdateChatTypeMappingRemark],[LogActions.UpdateChatTypeMappingStatus],  [LogActions.DeleteConversationGroup]];
        test.each(cases)(
            "should return exactly value when log action is %s",
            (actionId) => {
                // Arrange
                const item = initProp.picReport.picInfo[0];
                item.actionId = actionId;
                const container = shallow(<PicDataGrid {...initProp}/>).instance();
                container.getDetailValueInsertNewPic = jest.fn(() => '<div>details</div>');
                container.getDetailValueUpdatePic = jest.fn(() => '<div>details</div>');
                container.getDetailChatTypeMappingInsert = jest.fn(() => '<div>details</div>');
                container.getDetailValueUpdatePicStatus = jest.fn(() => '<div>details</div>');
                container.getDetailChatTypeMappingUpdate = jest.fn(() => '<div>details</div>');
                container.getDetailChaTypeMappingRemark = jest.fn(() => '<div>details</div>');
                container.getDetailChaTypeMappingAction = jest.fn(() => '<div>details</div>');

                // Act
                const actual = container.renderDetailsValuePic(item);

                // Assert
                expect(actual).toEqual('<div>details</div>');
        });
    });

    describe('onPaging', () => {
        it('should call exactly function when onPaging', () => {
            // Arrange
            const container = shallow(<PicDataGrid {...initProp} />).instance();

            // Act
            container.onPaging(1,200);

            // Assert
            expect(initProp.setGridParamsPic).toHaveBeenCalled();
            expect(initProp.getPicReport).toHaveBeenCalled();
        });
    });

    describe('convertBoolToDecision', () => {
        it('should return exact value when true', () => {
            // Arrange
            const container = shallow(<PicDataGrid {...initProp} />).instance();

            // Act
            const actual = container.convertBoolToDecision(true);

            // Assert
            expect(actual).toEqual('Yes');
        });

        it('should return exact value when false', () => {
            // Arrange
            const container = shallow(<PicDataGrid {...initProp} />).instance();

            // Act
            const actual = container.convertBoolToDecision(false);

            // Assert
            expect(actual).toEqual('No');
        });

        it('should return exact value when null', () => {
            // Arrange
            const container = shallow(<PicDataGrid {...initProp} />).instance();

            // Act
            const actual = container.convertBoolToDecision(null);

            // Assert
            expect(actual).toEqual('-');
        });
    });

    describe('getStringCommunicationTools', () => {
        it('should return exact value when has data', () => {
            // Arrange
            const container = shallow(<PicDataGrid {...initProp} />).instance();

            // Act
            const actual = container.getStringCommunicationTools([{name: 'name', value: 'value'}]);

            // Assert
            expect(actual).toEqual('name: value');
        });

        it('should return exact value when empty array', () => {
            // Arrange
            const container = shallow(<PicDataGrid {...initProp} />).instance();

            // Act
            const actual = container.getStringCommunicationTools([]);

            // Assert
            expect(actual).toEqual('-');
        });
    });

    describe('render', () => {
        it('should return null', () => {
            //Act
            const props = { ...initProp };
            props.picReport   = undefined;
            const container = shallow(<PicDataGrid {...props} />);

            //Assert
            expect(container.type()).toEqual(null);
        });
    });
});