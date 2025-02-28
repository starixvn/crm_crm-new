namespace CRM.Services.UnitTests.Customer;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoFixture;
using CRM.Criteria.Customer;
using CRM.Criteria.PicAndHeadline;
using CRM.Models.Customer;
using CRM.Models.Setting;
using CRM.Services.Customer;
using Interfaces;
using Microsoft.Extensions.Configuration;
using Models;
using NSubstitute;
using Xunit;

public class CustomerServiceTest
{
    private IBaseService baseService;
    private ISettingService settingService;
    private IConfiguration configuration;
    private IPermissionService permissionService;

    [Fact]
    public async Task GetCustomerInfoAsync_WhenCalledWithIsNotGuest_ReturnExpectedCustomerInfo()
    {
        //Arrange
        var fixture = new Fixture();
        fixture.Behaviors.Add(new OmitOnRecursionBehavior());
        var param = new GetCustomerInfoByUsernameCriteria { SearchInfo = "test", IsGuest = false };
        var customerInfos = fixture.Create<IEnumerable<CustomerInfoDetails>>();
        var languages = fixture.Create<List<int>>();
        var site = fixture.Create<SiteSetting>();
        var tuple = (customerInfos, languages);
        var service = GetCustomerService();
        baseService.FetchMultipleAsync<CustomerInfoDetails, int>(Arg.Do<GetCustomerInfoByUsernameCriteria>(x => param = x)).Returns(tuple);
        settingService.GetSiteByIdAsync(Arg.Any<int>()).Returns(site);
        var expected = customerInfos.First();

        //Act
        var actual = await service.GetCustomerInfoAsync(param);

        //Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public async Task GetCustomerInfoAsync_WhenCalledWithIsGuest_ReturnExpectedCustomerInfo()
    {
        //Arrange
        var fixture = new Fixture();
        fixture.Behaviors.Add(new OmitOnRecursionBehavior());
        var param = new GetCustomerInfoByUsernameCriteria { SearchInfo = "test", IsGuest = true };
        var customerInfos = fixture.Create<IEnumerable<CustomerInfoDetails>>();
        var languages = fixture.Create<List<int>>();
        var site = fixture.Create<SiteSetting>();
        var tuple = (customerInfos, languages);
        var service = GetCustomerService();
        baseService.FetchMultipleAsync<CustomerInfoDetails, int>(Arg.Do<GetCustomerInfoByUsernameCriteria>(x => param = x)).Returns(tuple);
        settingService.GetSiteByIdAsync(Arg.Any<int>()).Returns(site);
        var expected = customerInfos.First();

        //Act
        var actual = await service.GetCustomerInfoAsync(param);

        //Assert
        Assert.Equal(expected, actual);
        Assert.Equal(site.Name, actual.SiteSetting.Name);
        Assert.Equal(new List<CustomerInfoDetails>(), actual.UplineInfo);
    }

    [Fact]
    public async Task UpdateCustomerInfoAsync_WhenCall_ReturnExpectedCommand()
    {
        //Arrange
        var fixture = new Fixture();
        var expected = fixture.Create<CommandResult>();
        var service = GetCustomerService();
        var param = fixture.Create<UpdateCustomerInfoCommand>();
        baseService.ExecuteNonQueryAsync(Arg.Do<UpdateCustomerInfoCommand>(x => param = x)).Returns(expected);

        //Act
        var actual = await service.UpdateCustomerInfoAsync(param);

        //Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public async Task GetCustomerAutoSuggestionAsync_WhenCall_ReturnExpectedCommand()
    {
        //Arrange
        var fixture = new Fixture();
        var expected = fixture.Create<IEnumerable<string>>();
        var service = GetCustomerService();
        var param = fixture.Create<CustomerSuggestionCriteria>();
        baseService.GetDataAsync<string>(Arg.Do<CustomerSuggestionCriteria>(x => param = x)).Returns(expected);

        //Act
        var actual = await service.GetCustomerAutoSuggestionAsync(param);

        //Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public async Task GetCustomerByIdAsync_WhenCalled_ReturnExpectedCustomerInfo()
    {
        //Arrange
        var fixture = new Fixture();
        fixture.Behaviors.Add(new OmitOnRecursionBehavior());
        var param = fixture.Create<GetCustomerInfoDetailByIdCriteria>();
        var customerInfoDetail = fixture.Create<IEnumerable<CustomerInfoDetails>>();
        var customerLanguageInfo = fixture.Create<IEnumerable<CustomerLanguageInfo>>();

        var site = fixture.Create<SiteSetting>();
        var tuple = (customerInfoDetail, customerLanguageInfo);
        var service = GetCustomerService();
        baseService.FetchMultipleAsync<CustomerInfoDetails, CustomerLanguageInfo>(Arg.Do<GetCustomerInfoDetailByIdCriteria>(x => param = x)).Returns(tuple);
        settingService.GetSiteByIdAsync(Arg.Any<int>()).Returns(site);
        var expected = customerInfoDetail.First();

        //Act
        var actual = await service.GetCustomerByIdAsync(param);

        //Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public async Task GetAllCustomerAsync_WhenCall_ReturnExpectedData()
    {
        //Arrange
        var fixture = new Fixture();
        var expected = fixture.Create<IEnumerable<UserInfo>>();
        var service = GetCustomerService();
        var param = fixture.Create<GetAllCustomersCriteria>();
        baseService.GetDataAsync<UserInfo>(Arg.Do<GetAllCustomersCriteria>(x => param = x)).Returns(expected);

        //Act
        var actual = await service.GetAllCustomerAsync(param);

        //Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public async Task ValidateEditPicAsync_WhenCall_ReturnExpectedData()
    {
        //Arrange
        var fixture = new Fixture();
        var expected = fixture.Create<string>();
        var service = GetCustomerService();
        var criteria = fixture.Create<ValidateEditPicCriteria>();

        baseService.GetDataEntityAsync<string>(criteria).Returns(expected);

        //Act
        var actual = await service.ValidateEditPicAsync(criteria);

        //Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public async Task ValidateEditNewPicAsync_WhenCall_ReturnExpectedData()
    {
        //Arrange
        var fixture = new Fixture();
        var expected = fixture.Create<IEnumerable<PicValidationInfo>>();
        var service = GetCustomerService();
        var criteria = fixture.Create<ValidateEditNewPicCriteria>();

        baseService.GetDataAsync<PicValidationInfo>(criteria).Returns(expected);

        //Act
        var actual = await service.ValidateEditNewPicAsync(criteria);

        //Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public async Task UpdateCustomerSuggestionAsync_WhenCall_ReturnExpectedData()
    {
        //Arrange
        var fixture = new Fixture();
        var expected = fixture.Create<CommandResult>();
        var service = GetCustomerService();
        var criteria = fixture.Create<UpdateCustomerSuggestionCriteria>();

        baseService.ExecuteNonQueryAsync(criteria).Returns(expected);

        //Act
        var actual = await service.UpdateCustomerSuggestionAsync(criteria);

        //Assert
        Assert.Equal(expected, actual);
    }
        
    [Fact]
    public async Task EditPicAsync_WhenCall_ReturnExpectedData()
    {
        //Arrange
        var fixture = new Fixture();
        var expected = fixture.Create<CommandResult>();
        var service = GetCustomerService();
        var criteria = fixture.Create<EditPicCriteria>();

        baseService.ExecuteNonQueryAsync(criteria).Returns(expected);

        //Act
        var actual = await service.EditPicAsync(criteria);

        //Assert
        Assert.Equal(expected, actual);
    }
        
    [Fact]
    public async Task GetHeadlineCompanyServiceAsync_WhenCall_ReturnExpectedData()
    {
        //Arrange
        var fixture = new Fixture();
        var service = GetCustomerService();
        var criteria = fixture.Create<GetHeadlineCompanyServiceCriteria>();
        var headlineCompanyServices = fixture.Create<IEnumerable<HeadlineCompanyService>>();
        var headlineAccountCommunicationInfos = fixture.Create<IEnumerable<HeadlineAccountCommunicationInfo>>();
        var tuple = (headlineCompanyServices, headlineAccountCommunicationInfos);

        baseService.FetchMultipleAsync<HeadlineCompanyService, HeadlineAccountCommunicationInfo>(criteria).Returns(tuple);

        //Act
        var actual = await service.GetHeadlineCompanyServiceAsync(criteria);

        //Assert
        Assert.Equal(Tuple.Create(headlineCompanyServices, headlineAccountCommunicationInfos), actual);
    }

    [Fact]
    public async Task GetHeadlineStaffsAndAuthorityAsync_WhenCall_ReturnExpectedData()
    {
        //Arrange
        var fixture = new Fixture();
        var service = GetCustomerService();
        var criteria = fixture.Create<GetHeadlineStaffAndAuthorityCriteria>();
        var expected = fixture.Create<IEnumerable<HeadlineStaffsAndAuthority>>();

        baseService.GetDataAsync<HeadlineStaffsAndAuthority>(criteria).Returns(expected);

        //Act
        var actual = await service.GetHeadlineStaffsAndAuthorityAsync(criteria);

        //Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public async Task GetSiteTypeByCustIdAsync_WhenCall_ReturnExpectedData()
    {
        //Arrange
        var fixture = new Fixture();
        var service = GetCustomerService();
        var custId = fixture.Create<int>();
        var expected = fixture.Create<CustomerPermissionInfo>();

        baseService.GetDataEntityAsync<CustomerPermissionInfo>(Arg.Any<GetSiteTypeByCustIdCriteria>()).Returns(expected);

        //Act
        var actual = await service.GetSiteTypeByCustIdAsync(custId);

        //Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public async Task SyncHeadlineStaffsAndAuthorityAsync_WhenCall_ReturnExpectedData()
    {
        //Arrange
        var fixture = new Fixture();
        var service = GetCustomerService();
        var criteria = fixture.Create<SyncHeadlineStaffAndAuthorityCriteria>();
        var expected = fixture.Create<CommandResult>();

        baseService.ExecuteNonQueryAsync(criteria).Returns(expected);

        //Act
        var actual = await service.SyncHeadlineStaffsAndAuthorityAsync(criteria);

        //Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public async Task EditHeadlineCompanyServiceAsync_WhenCall_ReturnExpectedData()
    {
        //Arrange
        var fixture = new Fixture();
        var service = GetCustomerService();
        var criteria = fixture.Create<UpdateHeadlineCompanyServiceCommand>();
        var expected = fixture.Create<CommandResult>();

        baseService.ExecuteNonQueryAsync(criteria).Returns(expected);

        //Act
        var actual = await service.EditHeadlineCompanyServiceAsync(criteria);

        //Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public async Task EditOtherAccCommunicationInfoAsync_WhenCall_ReturnExpectedData()
    {
        //Arrange
        var fixture = new Fixture();
        var service = GetCustomerService();
        var criteria = fixture.Create<UpdateOtherAccCommunicationInfoCommand>();
        var expected = fixture.Create<CommandResult>();

        baseService.ExecuteNonQueryAsync(criteria).Returns(expected);

        //Act
        var actual = await service.EditOtherAccCommunicationInfoAsync(criteria);

        //Assert
        Assert.Equal(expected, actual);
    }
        
    [Fact]
    public async Task EditHeadlineStaffsAndAuthorityAsync_WhenCall_ReturnExpectedData()
    {
        //Arrange
        var fixture = new Fixture();
        var service = GetCustomerService();
        var criteria = fixture.Create<UpdateHeadlineStaffAndAuthorityCommand>();
        var expected = fixture.Create<CommandResult>();

        baseService.ExecuteNonQueryAsync(criteria).Returns(expected);

        //Act
        var actual = await service.EditHeadlineStaffsAndAuthorityAsync(criteria);

        //Assert
        Assert.Equal(expected, actual);
    }
    #region Helpers

    private CustomerService GetCustomerService()
    {
        baseService = Substitute.For<IBaseService>();
        settingService = Substitute.For<ISettingService>();
        permissionService = Substitute.For<IPermissionService>();
        configuration = Substitute.For<IConfiguration>();
        var service = new CustomerService(baseService, settingService, permissionService, configuration);

        return service;
    }

    #endregion Helpers
}