namespace CRM.Services.UnitTests.AdminTool
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.AdminTool.CommunicationToolSetting;
    using CRM.Criteria.CommunicationToolSetting;
    using CRM.Models.AdminTool.CommunicationToolSetting;
    using Fanex.NAP.Client;
    using NSubstitute;
    using Xunit;

    public class CommunicationToolSettingServiceTests
    {
        private IBaseService baseService;
        private INapSession napSession;
        private IPermissionService permissionService;

        [Fact]
        public async Task GetAllAsync_WhenCalled_ReturnExpectedCommunication()
        {
            // Arrange
            var fixture = new Fixture();
            var param = fixture.Create<GetGridDataParam>();
            var totalRows = fixture.Create<int>();
            var expected = fixture.Create<IEnumerable<CommunicationToolSetting>>();
            var criteria = new GetCommunicationToolSettingCriteria();
            var service = GetCommunicationService();
            baseService.GetDataAsync<CommunicationToolSetting>(Arg.Do<GetCommunicationToolSettingCriteria>(x => criteria = x)).Returns(expected);
            baseService.When(x => x.GetDataAsync<CommunicationToolSetting>(Arg.Do<GetCommunicationToolSettingCriteria>(y => criteria = y)))
                .Do(x => criteria.TotalRows = totalRows);

            // Act
            var actual = await service.GetAllAsync(param);

            // Assert
            Assert.Equal(expected, actual);

            Assert.Equal(param.Username, criteria.Username);
            Assert.Equal(param.CategoryIds, criteria.CategoryIds);
            Assert.Equal(param.SubCategoryIds, criteria.SubCategoryIds);
            Assert.Equal(param.IsDisableCategorySubCategory, criteria.IsDisableCategorySubCategory);
            Assert.Equal(param.PageIndex, criteria.PageIndex);
            Assert.Equal(param.PageSize, criteria.PageSize);
            Assert.Equal(totalRows, param.TotalRows);
        }

        [Fact]
        public async Task GetByIdAsync_WhenCalled_ReturnExpectedCommunication()
        {
            // Arrange
            var fixture = new Fixture();
            var id = fixture.Create<int>();
            var expected = fixture.Create<CommunicationToolSetting>();
            var service = GetCommunicationService();
            baseService.GetDataEntityAsync<CommunicationToolSetting>(Arg.Any<GetCommunicationToolSettingByIdCriteria>()).Returns(expected);

            //Act
            var actual = await service.GetByIdAsync(id);

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public async Task CreateAsync_WhenCalled_ReturnExpectedCommandResult()
        {
            // Arrange
            var fixture = new Fixture();
            var model = fixture.Create<CreateCommunicationToolSetting>();
            var expected = fixture.Create<CommandResult>();
            var criteria = new CreateCommunicationToolSettingCommand();
            var service = GetCommunicationService();
            baseService.ExecuteNonQueryAsync(Arg.Do<CreateCommunicationToolSettingCommand>(x => criteria = x)).Returns(expected);

            // Act
            var actual = await service.CreateAsync(model);

            // Assert
            Assert.Equal(expected, actual);

            Assert.Equal(model.CategoryIds, criteria.CategoryIds);
            Assert.Equal(model.SubCategoryIds, criteria.SubCategoryIds);
            Assert.Equal(model.CommunicationIds, criteria.CommunicationIds);
            Assert.Equal(model.Customers, criteria.Customers);
        }

        [Fact]
        public async Task EditAsync_WhenCalled_ReturnExpectedCommandResult()
        {
            // Arrange
            var fixture = new Fixture();
            var model = fixture.Create<EditCommunicationToolSetting>();
            var expected = fixture.Create<CommandResult>();
            var criteria = new EditCommunicationToolSettingCommand();
            var service = GetCommunicationService();
            baseService.ExecuteNonQueryAsync(Arg.Do<EditCommunicationToolSettingCommand>(x => criteria = x)).Returns(expected);

            // Act
            var actual = await service.EditAsync(model);

            // Assert
            Assert.Equal(expected, actual);

            Assert.Equal(model.CategoryIds, criteria.CategoryIds);
            Assert.Equal(model.SubCategoryIds, criteria.SubCategoryIds);
            Assert.Equal(model.CommunicationIds, criteria.CommunicationIds);
        }

        [Fact]
        public async Task DeleteAsync_WhenCalled_ReturnExpectedCommandResult()
        {
            // Arrange
            var fixture = new Fixture();
            var id = fixture.Create<int>();
            var expected = fixture.Create<CommandResult>();
            var criteria = new DeleteCommunicationToolSettingCommand();
            var service = GetCommunicationService();
            baseService.ExecuteNonQueryAsync(Arg.Do<DeleteCommunicationToolSettingCommand>(x => criteria = x)).Returns(expected);

            // Act
            var actual = await service.DeleteAsync(id);

            // Assert
            Assert.Equal(expected, actual);

            Assert.Equal(id, criteria.DefaultCommId);
        }

        #region Helpers

        private CommunicationToolSettingService GetCommunicationService()
        {
            baseService = Substitute.For<IBaseService>();
            napSession = Substitute.For<INapSession>();
            permissionService = Substitute.For<IPermissionService>();
            var service = new CommunicationToolSettingService(napSession, baseService, permissionService);

            return service;
        }

        #endregion Helpers
    }
}