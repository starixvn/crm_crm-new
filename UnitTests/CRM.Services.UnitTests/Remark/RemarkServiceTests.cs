namespace CRM.Services.UnitTests.Remark;

using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AutoFixture;
using CRM.Criteria.NewRemark;
using CRM.Criteria.Remark;
using CRM.Models.Remark;
using CRM.Models.RemarkNew;
using CRM.Services.Remark;
using Models;
using NSubstitute;
using Xunit;

public class RemarkServiceTests
{
    private readonly IFixture fixture = new Fixture();
    private IBaseService baseService;

    [Fact]
    public async Task GetRemarkAsync_WhenCalled_ReturnExpectedResult()
    {
        // Arrange
        var remarks = fixture.Create<RemarkInfo>();
        var remarkRaws = new List<RemarkRaw>
        {
            new() { CustId = 1, IsSpecial = true, Remark = "test\ntest"},
            new() { CustId = 2, IsSpecial = false, Remark = "test\ntest"},
        };
        var param = fixture.Create<GetRemarkCriteria>();
        var service = GetService();
        baseService.GetDataAsync<RemarkRaw>(Arg.Do<GetRemarkCriteria>(x => param = x)).Returns(remarkRaws);
        var normalRemarks = new List<string> { "test<br/>test" };
        var specialRemarks = new List<string> { "test<br/>test" };

        // Act
        var actual = await service.GetRemarkAsync(param);

        //Assert
        Assert.Equal(normalRemarks, actual.NormalRemarks);
        Assert.Equal(specialRemarks, actual.SpecialRemarks);
    }

    [Fact]
    public void BuildRemarksXml_WithSpecialTrue_ChangeContent()
    {
        // Arrange
        var xmlContent = new StringBuilder();
        var remarks = new List<string>() { "test" };
        var isSpecial = true;
        var xmlContentExpected = new StringBuilder("<Remark Content=\"test\" IsSpecial=\"1\" />");

        // Act
        RemarkService.BuildRemarksXml(xmlContent, remarks, isSpecial);

        //Assert
        Assert.Equal(xmlContent.ToString(), xmlContentExpected.ToString());
    }

    [Fact]
    public void BuildRemarksXml_WithSpecialFalse_ChangeContent()
    {
        // Arrange
        var xmlContent = new StringBuilder();
        var remarks = new List<string>() { "test" };
        var isSpecial = false;
        var xmlContentExpected = new StringBuilder("<Remark Content=\"test\" IsSpecial=\"0\" />");

        // Act
        RemarkService.BuildRemarksXml(xmlContent, remarks, isSpecial);

        //Assert
        Assert.Equal(xmlContent.ToString(), xmlContentExpected.ToString());
    }

    [Fact]
    public async Task EditRemarkAsync_WhenCall_ReturnExpectedCommand()
    {
        //Arrange
        var commandResult = fixture.Create<CommandResult>();
        var service = GetService();
        var param = fixture.Create<EditRemarkCommand>();
        baseService.ExecuteNonQueryAsync(Arg.Do<EditRemarkCommand>(x => param = x)).Returns(commandResult);

        //Act
        var actual = await service.EditRemarkAsync(param);

        //Assert
        Assert.Equal(commandResult, actual);
    }

    [Fact]
    public async Task GetNewRemarkAsync_WhenCall_ReturnExpectedNewRemark()
    {
        //Arrange
        var newRemarks = fixture.Create<IEnumerable<RemarkNewInfo>>();
        var service = GetService();
        var param = fixture.Create<GetNewRemarkCriteria>();
        baseService.GetDataAsync<RemarkNewInfo>(param).Returns(newRemarks);

        //Act
        var actual = await service.GetNewRemarkAsync(param);

        //Assert
    }

    [Fact]
    public async Task GetRelatedPicByCustIdAsync_WhenCall_ReturnExpectedNewRemark()
    {
        //Arrange
        var relatedPics = fixture.Create<IEnumerable<PicInfo>>();
        var service = GetService();
        var param = fixture.Create<GetRelatedPicsCriteria>();
        baseService.GetDataAsync<PicInfo>(param).Returns(relatedPics);

        //Act
        var actual = await service.GetRelatedPicByCustIdAsync(param);

        //Assert
        Assert.Equal(relatedPics, actual);
    }

    [Fact]
    public async Task GetCustomerNewRemarkHistoryAsync_WhenCall_ReturnExpectedHistory()
    {
        //Arrange
        var history = fixture.Create<IEnumerable<RemarkNewHistory>>();
        var service = GetService();
        var param = fixture.Create<GetCustomerRemarkNewHistoryCriteria>();
        baseService.GetDataAsync<RemarkNewHistory>(param).Returns(history);

        //Act
        var actual = await service.GetCustomerNewRemarkHistoryAsync(param);

        //Assert
        Assert.Equal(history, actual);
    }

    [Fact]
    public async Task CreateNewAsync_WhenCall_ReturnExpectedCommand()
    {
        //Arrange
        var commandResult = fixture.Create<CommandResult>();
        var service = GetService();
        var param = fixture.Create<CreateNewReamarkCommand>();
        baseService.ExecuteNonQueryAsync(Arg.Do<CreateNewReamarkCommand>(x => param = x)).Returns(commandResult);

        //Act
        var actual = await service.CreateNewAsync(param);

        //Assert
        Assert.Equal(commandResult, actual);
    }

    [Fact]
    public async Task EditNewAsync_WhenCall_ReturnExpectedCommand()
    {
        //Arrange
        var commandResult = fixture.Create<CommandResult>();
        var service = GetService();
        var param = fixture.Create<EditNewRemarkCommand>();
        baseService.ExecuteNonQueryAsync(Arg.Do<EditNewRemarkCommand>(x => param = x)).Returns(commandResult);

        //Act
        var actual = await service.EditNewAsync(param);

        //Assert
        Assert.Equal(commandResult, actual);
    }

    [Fact]
    public async Task DeleteNewAsync_WhenCall_ReturnExpectedCommand()
    {
        //Arrange
        var commandResult = fixture.Create<CommandResult>();
        var service = GetService();
        var param = fixture.Create<DeleteNewRemarkCommand>();
        baseService.ExecuteNonQueryAsync(Arg.Do<DeleteNewRemarkCommand>(x => param = x)).Returns(commandResult);

        //Act
        var actual = await service.DeleteNewAsync(param);

        //Assert
        Assert.Equal(commandResult, actual);
    }

    #region Helpers
    private RemarkService GetService()
    {
        baseService = Substitute.For<IBaseService>();

        return new RemarkService(baseService);
    }
    #endregion Helpers
}