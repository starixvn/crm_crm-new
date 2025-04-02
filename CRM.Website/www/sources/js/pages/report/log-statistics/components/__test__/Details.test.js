import React from 'react';
import { Detail } from '../Detail';
import { HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { shallow } from 'enzyme';

describe('Detail', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    const props = {
        reportDetails: {
            report: [{
                autoField: "Date Time & Tool: 20210329/10:35AM/Emails \nSystem ID: IF, if",
                bbm: "---",
                categoryID: 3001,
                communicationID: 1001,
                communicationTool: null,
                contact: "Phone1: ---<br/>Phone2: ---<br/>Phone3: ---<br/>Fax: ---<br/>Mobile: ---<br/>PIC1: --- - ---<br/>PIC2: --- - ---<br/>PIC3: --- - ---<br/>PIC4: --- - ---<br/>Skype: ---<br/>Email: ---<br/>MSN: ---<br/>WeChat: ---<br/>WhatsApp: ---<br/>Line: ---<br/>Yahoo: --<br/>QQ: ---<br/>BBM: ---<br/>",
                countryName: "Indonesia",
                createDate: "Mar 29, 2021 10:35:37 AM",
                creatorName: null,
                durationTime: "0:0:1",
                email: "---",
                endTime: "10:36 AM",
                fax: "---",
                faxAreaCode: "",
                faxCountryCode: "",
                faxInfo: { countryCode: '', areaCode: '', faxNumber: '---' },
                feedbackDate: "Mar 29, 2021 10:35:00 AM",
                feedbackID: 221204,
                language: "Mandarin",
                line: "---",
                mobilePhone: "---",
                mobilePhoneAreaCode: "",
                mobilePhoneCountryCode: "",
                mobilePhoneInfo: { countryCode: '', areaCode: '', phoneNumber: '---' },
                msn: "---",
                noInquiries: 0,
                phone: "---",
                phone2: "---",
                phone2AreaCode: "",
                phone2CountryCode: "",
                phone3: "---",
                phone3AreaCode: "",
                phone3CountryCode: "",
                phoneAreaCode: "",
                phoneCountryCode: "",
                phones: [{
                    areaCode: "",
                    countryCode: "",
                    phoneNumber: "---"
                }, {
                    areaCode: "",
                    countryCode: "",
                    phoneNumber: "---"
                }, {
                    areaCode: "",
                    countryCode: "",
                    phoneNumber: "---"
                }],
                piC1: "---",
                piC1Name: "---",
                piC2: "---",
                piC2Name: "---",
                piC3: "---",
                piC3Name: "---",
                piC4: "---",
                piC4Name: "---",
                piCs: [{
                    name: "---",
                    phone: "---"
                }, {
                    name: "---",
                    phone: "---"
                }, {
                    name: "---",
                    phone: "---"
                }, {
                    name: "---",
                    phone: "---"
                }],
                productID: 46004,
                qq: "---",
                remark: "t",
                remarkText: "Date Time & Tool: 20210329/10:35AM/Emails <br>System ID: IF, if<br><br>t",
                resolutionDate: "Mar 29, 2021 10:36:00 AM",
                response: "Neutral",
                role: "Super",
                siteName: "INDO",
                skype: "---",
                solution: "t",
                startTime: "10:35 AM",
                stationID: 2022,
                status: "Closed",
                subCategoryID: 4005,
                subProductID: 8063,
                userName: "IF",
                weChat: "---",
                whatsApp: "---",
                yahoo: "--"
            }],
            communicationColumns: [{
                displayOrder: 1,
                id: 1000,
                isActive: false,
                isChild: false,
                mainCategoryID: 3000,
                name: "Phone",
                parentID: 0,
                settingId: 0,
                settingName: '',
                settingSource: '',
                settingValue: '',
                subCategoryId: 0,
            }],
            communicationTools: [],
            extensions: [{
                displayOrder: 0,
                id: 2022,
                isActive: true,
                isChild: false,
                value: "N/A"
            }],
            mainCategories: [{
                childSettings: [{
                    childSettings: [],
                    displayOrder: 0,
                    id: 0,
                    isActive: true,
                    isChild: false,
                    mainCategoryID: 3000,
                    name: "N/A",
                    parentID: 0,
                    settingId: 0,
                    settingName: '',
                    settingSource: '',
                    settingValue: '',
                    subCategoryId: 4029
                }],
                displayOrder: 1,
                id: 0,
                isActive: true,
                isChild: false,
                mainCategoryID: 3000,
                name: "General Network/Database Issues",
                parentID: 0,
                settingId: 0,
                settingName: '',
                settingSource: '',
                settingValue: '',
                subCategoryId: 0
            }],
            products: [{
                childSettings: '',
                displayOrder: -1,
                grandParentId: 0,
                id: 46004,
                isActive: true,
                isChild: false,
                name: null,
                parentId: 0,
                value: "N/A."
            }],
            subProducts: [{
                childSettings: null,
                displayOrder: -1,
                grandParentId: 0,
                id: 8063,
                isActive: true,
                isChild: false,
                name: null,
                parentId: 0,
                value: "N/A."
            }],
            totalRows: 1701
        },
        gridParamDetails: {
            communicationId: "1005",
            fromDate: "Apr 24, 1987",
            mainCategoryId: "3000,3062,3063,3064,3065",
            pageIndex: 1,
            pageSize: 100,
            productId: "46004,46000,46001,46002,46003,46005,46006,46007,46008",
            siteType: 0,
            toDate: "Jul 23, 1987",
        },
        details: {
            show: true,
            title: "MBC Daily Customer Complaints/Enquiries From Apr 24, 1987-Jul 23, 1987"
        },
        exportExcelDetails: jest.fn(),
        setDetailsDataGrid: jest.fn(),
        getReportDetails: jest.fn(),
        setGridParamDetails: jest.fn(),
        setReportDetails: jest.fn()
    };

    it('should render expected header', () => {
        // Act
        const container = shallow(<Detail  {...props} />).instance();
        const header = shallow(container.buildHeader());

        // Assert
        expect(header.find(HeaderCell).length).toBe(24);
    });

    it('should render expected body no data', () => {
        // arrange
        const propsNext = {
            reportDetails: {
                report: []
            },
            gridParamDetails: {
                communicationId: "1005",
                fromDate: "Apr 24, 1987",
                mainCategoryId: "3062,3063,3064,3065",
                pageIndex: 1,
                pageSize: 100,
                productId: "46004,46000,46001,46002,46003,46005,46006,46007,46008",
                siteType: 0,
                toDate: "Jul 23, 1987",
            },
            details: {
                show: true,
                title: "MBC Daily Customer Complaints/Enquiries From Apr 24, 1987-Jul 23, 1987"
            }
        };
        const expected = [<Row key="body-nodata" className="no-data"><Cell className="text-center" colSpan={15}>ThereIsNoData</Cell></Row>];
        // Act
        const container = shallow(<Detail  {...propsNext} />).instance();
        const body = container.buildBody();

        // Assert
        expect(body).toEqual(expected);
    });

    it('should render expected body has data', () => {
        // arrange

        // Act
        const container = shallow(<Detail  {...props} />).instance();
        container.getActiveSettingsName = jest.fn(() => 'test');
        container.renderRow = jest.fn(() => <div />);

        // Act
        const actual = container.buildBody();

        // Assert
        expect(actual).toEqual([<div />]);
    });

    it('should call handleExportExcel', () => {
        // arrange            
        // Act
        const container = shallow(<Detail  {...props} />).instance();
        // Act
        container.handleExportExcel();
        // Assert
        expect(props.exportExcelDetails).toHaveBeenCalled();
    });

    it('should call handleGoBack', () => {
        // arrange            
        // Act
        const container = shallow(<Detail  {...props} />).instance();
        // Act
        container.handleGoBack();
        // Assert
        expect(props.setDetailsDataGrid).toHaveBeenCalled();
    });

    it('should call onPaging', () => {
        // arrange            
        // Act
        const container = shallow(<Detail  {...props} />).instance();
        // Act
        container.onPaging(1, 200);
        // Assert
        expect(props.getReportDetails).toHaveBeenCalled();
        expect(props.setGridParamDetails).toHaveBeenCalled();
    });

    it('should render expected reportDetails is null', () => {
        // arrange
        const propsNext = {
            reportDetails: null,
            gridParamDetails: {
                communicationId: "1005",
                fromDate: "Apr 24, 1987",
                mainCategoryId: "3062,3063,3064,3065",
                pageIndex: 1,
                pageSize: 100,
                productId: "46004,46000,46001,46002,46003,46005,46006,46007,46008",
                siteType: 0,
                toDate: "Jul 23, 1987",
            },
            details: {
                show: true,
                title: "MBC Daily Customer Complaints/Enquiries From Apr 24, 1987-Jul 23, 1987"
            }
        };
        // Act
        const container = shallow(<Detail  {...propsNext} />).instance();
        const render = container.render();

        // Assert
        expect(render).toEqual(null);
    });

    it('should call handleGoBack when click back', () => {
        // arrange            
        // Act
        const container = shallow(<Detail  {...props} />);
        container.handleGoBack = jest.fn();
        // Act
        container.find('span').at(1).simulate('click');
        // Assert
        expect(props.setDetailsDataGrid).toHaveBeenCalled();
    });

    it('should call getSubCategoryValue', () => {
        // arrange            
        // Act
        const container = shallow(<Detail  {...props} />);
        // Act
        const data = container.instance().getSubCategoryValue(3000, 4029, props.reportDetails.mainCategories);
        // Assert
        expect(data).toEqual('N/A');
    });
});