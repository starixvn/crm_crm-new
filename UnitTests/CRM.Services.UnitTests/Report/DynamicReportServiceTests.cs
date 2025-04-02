namespace CRM.Services.UnitTests.Report;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoFixture;
using CRM.Criteria.Report.DynamicReport;
using CRM.Models.Common;
using CRM.Models.Report.DynamicReport;
using CRM.Services.Report;
using Interfaces;
using NSubstitute;
using Xunit;

public class DynamicReportServiceTests
{
    private readonly IFixture fixture = new Fixture();
    private IBaseService baseService;
    private ICommonService commonService;

    [Fact]
    public async Task GetDynamicReportDataAsync_WhenCalled_ReturnExpectedResult()
    {
        //Arrange
        var param = fixture.Create<GetDynamicReportCriteria>();
        var dynamicReportInfos = new List<DynamicReportInfo>()
        {
            new()
            {
                FeedbackId = 1,
                FeedbackDate = new DateTime(2022,02,03),
                ChildReports = []
            }
        };
        var settingItems = fixture.Create<IEnumerable<SettingItem>>();

        var tuple = (dynamicReportInfos, settingItems);
        var service = GetService();
        baseService.FetchMultipleAsync<DynamicReportInfo, SettingItem>(Arg.Do<GetDynamicReportCriteria>(x => param = x)).Returns(tuple);

        //Act
        var actual = await service.GetDynamicReportDataAsync(param);

        //Assert
        Assert.Equal(tuple, actual);
    }


    [Fact]
    public async Task GetDynamicReportData_WhenCalledWithReportTypeIsOne_ReturnExpectedResult()
    {
        //Arrange
        var param = fixture.Create<GetDynamicReportCriteria>();
        param.ReportType = 1;
        var dynamicReportInfos = new List<DynamicReportInfo>()
        {
            new()
            {
                FeedbackId = 1,
                ReportTypeId = 1,
                FeedbackDate = new DateTime(2022,02,03),
                ChildReports = []
            }
        };
        var settingItems = fixture.Create<IEnumerable<SettingItem>>();

        var tuple = (dynamicReportInfos, settingItems);
        var service = GetService();
        baseService.FetchMultipleAsync<DynamicReportInfo, SettingItem>(Arg.Do<GetDynamicReportCriteria>(x => param = x)).Returns(tuple);

        //Act
        var actual = await service.GetDynamicReportData(param);

        //Assert
        Assert.Equal(dynamicReportInfos[0].ReportTypeId, actual.ReportTypeId);
    }

    [Fact]
    public async Task GetDynamicReportData_WhenCalledWithReportTypeIsTwo_ReturnExpectedResult()
    {
        //Arrange
        var param = fixture.Create<GetDynamicReportCriteria>();
        param.ReportType = 2;
        var dynamicReportInfos = new List<DynamicReportInfo>()
        {
            new()
            {
                FeedbackId = 1,
                ReportTypeId = 2
            }
        };
        var settingItems = fixture.Create<IEnumerable<SettingItem>>();

        var tuple = (dynamicReportInfos, settingItems);
        var service = GetService();
        baseService.FetchMultipleAsync<DynamicReportInfo, SettingItem>(Arg.Do<GetDynamicReportCriteria>(x => param = x)).Returns(tuple);

        //Act
        var actual = await service.GetDynamicReportData(param);

        //Assert
        Assert.Equal(dynamicReportInfos[0].ReportTypeId, actual.ReportTypeId);
    }

    [Fact]
    public async Task GetDynamicReportData_WhenCalledWithReportTypeIsThree_ReturnExpectedResult()
    {
        //Arrange
        var param = fixture.Create<GetDynamicReportCriteria>();
        param.ReportType = 3;
        var dynamicReportInfos = new List<DynamicReportInfo>()
        {
            new()
            {
                FeedbackId = 1,
                ReportTypeId = 3
            }
        };
        var settingItems = fixture.Create<IEnumerable<SettingItem>>();

        var tuple = (dynamicReportInfos, settingItems);
        var service = GetService();
        baseService.FetchMultipleAsync<DynamicReportInfo, SettingItem>(Arg.Do<GetDynamicReportCriteria>(x => param = x)).Returns(tuple);

        //Act
        var actual = await service.GetDynamicReportData(param);

        //Assert
        Assert.Equal(dynamicReportInfos[0].ReportTypeId, actual.ReportTypeId);
    }

    [Fact]
    public async Task GetDynamicReportData_WhenCalledWithReportTypeIsFour_ReturnExpectedResult()
    {
        //Arrange
        var param = fixture.Create<GetDynamicReportCriteria>();
        param.ReportType = 4;
        var dynamicReportInfos = new List<DynamicReportInfo>()
        {
            new()
            {
                FeedbackId = 1,
                ReportTypeId = 4
            }
        };
        var settingItems = fixture.Create<IEnumerable<SettingItem>>();

        var tuple = (dynamicReportInfos, settingItems);
        var service = GetService();
        baseService.FetchMultipleAsync<DynamicReportInfo, SettingItem>(Arg.Do<GetDynamicReportCriteria>(x => param = x)).Returns(tuple);

        //Act
        var actual = await service.GetDynamicReportData(param);

        //Assert
        Assert.Equal(dynamicReportInfos[0].ReportTypeId, actual.ReportTypeId);
    }

    #region Helpers

    private DynamicReportService GetService()
    {
        baseService = Substitute.For<IBaseService>();
        commonService = Substitute.For<ICommonService>();

        return new DynamicReportService(baseService, commonService);
    }
    #endregion
}