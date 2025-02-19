import React from 'react';
import { DataGrid } from '../DataGrid';
import { HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { shallow } from 'enzyme';

describe('DataGrid', () => {
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
        gridParams: { pageIndex: 1, pageSize: 100},
        headlineDA: {
            logInfo: [{
                action: 'Assign direct account to PIC',
                actionId: 905,
                directAccount: 'MS88UUS0151367',
                editBy: 'starix1',
                logDate: 'Mar 01, 2021 04:30:46 PM',
                logId: 301477,
                logTime: "Mar 01, 2021 \n (04:30:46 PM)",
                newDAInfo:[{
                    groupHeadline: null,
                    isGroupHeadline: false,
                    pics:[{picId: 461,
                        picName: "PIC_Dale1",
                        roleId: 48000,
                        roleName: "PIC"
                    }]
                }],
                oldDAInfo:[{
                    groupHeadline: null,
                    isGroupHeadline: false,
                    pics: null
                }]
            }]
        },
        setGridParams: jest.fn(),
        getHeadlineDAReport: jest.fn()
    };

    describe('buildHeader', () => {
        it('should render expected header', () => {
            // Act
            const container = shallow(<DataGrid {...initProp}/>).instance();
            const header = shallow(container.buildHeader());

            // Assert
            expect(header.find(HeaderCell).length).toBe(7);
        });
    });

    describe('buildBody', () => {
        it('should render no data when data is empty', () => {
            // Arrange
            const props = {...initProp};
            props.headlineDA = {logInfo: []};
            const expectedBody = [<Row key={`body${1}`} className='no-data' ><Cell className='text-center' colSpan={7}>ThereIsNoData</Cell></Row>];
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual(expectedBody);
        });

        it('should render expected rows when has data', () => {
            // Arrange
            const container = shallow(<DataGrid {...initProp} />).instance();
            container.renderRow = jest.fn(() => <div />);

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual([<div />]);
        });
    });


    describe('renderRow ', () => {
        it('should return exactly row when has data', () => {
            // Arrange
            const item = initProp.headlineDA.logInfo[0];
            const container = shallow(<DataGrid {...initProp}/>).instance();
            container.renderDetailsValue = jest.fn(() => '<div>details</div>');
            
            // Act
            const actual = shallow(container.renderRow(item, 1));

            // Assert
            expect(actual.find(Cell).length).toBe(7);
        });
    });

    describe('renderDetailsValue', () => {
        it('should return exactly value when isDetailPicAndGroupHl is true', () => {
            // Arrange
            const item = initProp.headlineDA.logInfo[0];
            const container = shallow(<DataGrid {...initProp}/>).instance();
            container.getDetailValuePicAndGroupHl = jest.fn(() => '<div>details</div>');
            
            // Act
            const actual = container.renderDetailsValue(item);

            // Assert
            expect(actual).toEqual('<div>details</div>');
        });

        it('should return exactly value when isDetailPicAndGroupHl is false', () => {
            // Arrange
            const item = initProp.headlineDA.logInfo[0];
            item.actionId  = 906;
            const container = shallow(<DataGrid {...initProp}/>).instance();
            container.renderDetailsValuePicAndGroupHlBoth = jest.fn(() => '<div>details</div>');
            
            // Act
            const actual = container.renderDetailsValue(item);

            // Assert
            expect(actual).toEqual('<div>details</div>');
        });
    });

    describe('renderDetailsValuePicAndGroupHlBoth ', () => {
        it('should return exactly value when action is UpdateThePicOfAHeadline', () => {
            // Arrange
            const item = initProp.headlineDA.logInfo[0];
            item.actionId  = 906;
            const container = shallow(<DataGrid {...initProp}/>).instance();
            container.getDetailValueGroupHeadlineAndPicBoth = jest.fn(() => '<div>details</div>');
            
            // Act
            const actual = container.renderDetailsValuePicAndGroupHlBoth(item);

            // Assert
            expect(actual).toEqual('<div>details</div>');
        });

        it('should return exactly value when action is UpdateDefaultPicForAGroupHeadline', () => {
            // Arrange
            const item = initProp.headlineDA.logInfo[0];
            item.actionId  = 907;
            const container = shallow(<DataGrid {...initProp}/>).instance();
            container.getDetailValuePicBoth = jest.fn(() => '<div>details</div>');
            
            // Act
            const actual = container.renderDetailsValuePicAndGroupHlBoth(item);

            // Assert
            expect(actual).toEqual('<div>details</div>');
        });

        it('should return exactly value when action is AddCustomerToCreditTermGroup', () => {
            // Arrange
            const item = initProp.headlineDA.logInfo[0];
            item.actionId  = 909;
            const container = shallow(<DataGrid {...initProp}/>).instance();
            container.getDetailValuePicAndGroupHl = jest.fn(() => '<div>details</div>');
            
            // Act
            const actual = container.renderDetailsValuePicAndGroupHlBoth(item);

            // Assert
            expect(actual).toEqual('<div>details</div>');
        });

        it('should return exactly value when action is UpdateCreditTerm', () => {
            // Arrange
            const item = initProp.headlineDA.logInfo[0];
            item.actionId  = 910;
            const container = shallow(<DataGrid {...initProp}/>).instance();
            container.getDetailValueGroupHeadlineAndPicBoth = jest.fn(() => '<div>details</div>');
            
            // Act
            const actual = container.renderDetailsValuePicAndGroupHlBoth(item);

            // Assert
            expect(actual).toEqual('<div>details</div>');
        });

        it('should return exactly value when action is SetCustomerToCreditTermGroup', () => {
            // Arrange
            const item = initProp.headlineDA.logInfo[0];
            item.actionId  = 912;
            const container = shallow(<DataGrid {...initProp}/>).instance();
            container.renderHtmlDetailValue = jest.fn(() => '<div>details</div>');
            
            // Act
            const actual = container.renderDetailsValuePicAndGroupHlBoth(item);

            // Assert
            expect(actual).toEqual('<div>details</div>');
        });
    });

    describe('onPaging', () => {
        it('should call exactly function when onPaging', () => {
            // Arrange
            const container = shallow(<DataGrid {...initProp} />).instance();

            // Act
            container.onPaging(1,200);

            // Assert
            expect(initProp.setGridParams).toHaveBeenCalled();
            expect(initProp.getHeadlineDAReport).toHaveBeenCalled();
        });
    });

    describe('convertBoolToDecision ', () => {
        it('should return exact value when true', () => {
            // Arrange
            const container = shallow(<DataGrid {...initProp} />).instance();

            // Act
            const actual = container.convertBoolToDecision(true);

            // Assert
            expect(actual).toEqual('Yes');
        });

        it('should return exact value when false', () => {
            // Arrange
            const container = shallow(<DataGrid {...initProp} />).instance();

            // Act
            const actual = container.convertBoolToDecision(false);

            // Assert
            expect(actual).toEqual('No');
        });
    });

    describe('getStringValue  ', () => {
        it('should return exact value', () => {
            // Arrange
            const container = shallow(<DataGrid {...initProp} />).instance();

            // Act
            const actual = container.getStringValue('1');

            // Assert
            expect(actual).toEqual('1');
        });
    });

    describe('getStringPics', () => {
        it('should return exact value', () => {
            // Arrange
            const container = shallow(<DataGrid {...initProp} />).instance();

            // Act
            const actual = container.getStringPics([{picName: 'picName', roleName: 'roleName'}]);

            // Assert
            expect(actual).toEqual('picName (roleName)');
        });
    });

    describe('render', () => {
        it('should return null', () => {
            //Act
            const props = { ...initProp };
            props.headlineDA  = undefined;
            const container = shallow(<DataGrid {...props} />);

            //Assert
            expect(container.type()).toEqual(null);
        });
    });
});