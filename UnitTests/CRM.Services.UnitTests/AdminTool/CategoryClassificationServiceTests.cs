namespace CRM.Services.UnitTests.AdminTool
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.AdminTool.CategoryClassification;
    using CRM.Models.AdminTool.CategoryClassification;
    using CRM.Services.AdminTool;
    using Fanex.NAP.Client;
    using NSubstitute;
    using Xunit;

    public class CategoryClassificationServiceTests
    {
        private IBaseService baseService;
        private INapSession napSession;

        [Fact]
        public async Task GetCategoryClassificationAsync_WhenCalled_ReturnExpected()
        {
            // Arrange
            var fixture = new Fixture();
            var param = fixture.Create<GetCategoryClassification>();
            var totalRows = fixture.Create<int>();
            var expected = fixture.Create<IEnumerable<CategoryClassification>>();
            var criteria = new GetCategoryClassificationCriteria();
            var service = GetCategoryClassificationService();
            baseService.GetDataAsync<CategoryClassification>(Arg.Do<GetCategoryClassificationCriteria>(x => criteria = x)).Returns(expected);
            baseService.When(x => x.GetDataAsync<CategoryClassification>(Arg.Do<GetCategoryClassificationCriteria>(y => criteria = y)))
                .Do(x => criteria.TotalRows = totalRows);

            // Act
            var actual = await service.GetCategoryClassificationAsync(param);

            // Assert
            Assert.Equal(expected, actual);

            Assert.Equal(param.Categories, criteria.Categories);
            Assert.Equal(param.Remark, criteria.RemarkSearch);
            Assert.Equal(param.PageIndex, criteria.PageIndex);
            Assert.Equal(param.PageSize, criteria.PageSize);
            Assert.Equal(totalRows, param.TotalRows);
        }

        [Fact]
        public async Task GetCategoryClassByIdAsync_WhenCalled_ReturnExpected()
        {
            // Arrange
            var fixture = new Fixture();
            var mainCategoryId = fixture.Create<int>();
            var subCategoryId = fixture.Create<int>();
            var expected = fixture.Create<CategoryClassification>();
            var criteria = new GetCategoryClassificationByIdCriteria();
            var service = GetCategoryClassificationService();
            baseService.GetDataEntityAsync<CategoryClassification>(Arg.Do<GetCategoryClassificationByIdCriteria>(x => criteria = x)).Returns(expected);

            //Act
            var actual = await service.GetCategoryClassByIdAsync(mainCategoryId, subCategoryId);

            // Assert
            Assert.Equal(expected, actual);

            Assert.Equal(mainCategoryId, criteria.MainCategoryID);
            Assert.Equal(subCategoryId, criteria.SubCategoryID);
        }

        [Fact]
        public async Task EditCategoryClassificationAsync_WhenCalled_ReturnExpectedCommandResult()
        {
            // Arrange
            var fixture = new Fixture();
            var model = fixture.Create<EditCategoryClassification>();
            var expected = fixture.Create<CommandResult>();
            var criteria = new EditCategoryClassificationCommand();
            var service = GetCategoryClassificationService();
            baseService.ExecuteNonQueryAsync(Arg.Do<EditCategoryClassificationCommand>(x => criteria = x)).Returns(expected);

            // Act
            var actual = await service.EditCategoryClassificationAsync(model);

            // Assert
            Assert.Equal(expected, actual);

            Assert.Equal(model.MainCategoryID, criteria.MainCategoryID);
            Assert.Equal(model.SubCategoryID, criteria.SubCategoryID);
            Assert.Equal(model.RemarkNewValue, criteria.RemarkNewValue);
            Assert.Equal(model.ActionType, criteria.ActionType);
        }

        #region Helpers

        private CategoryClassificationService GetCategoryClassificationService()
        {
            baseService = Substitute.For<IBaseService>();
            napSession = Substitute.For<INapSession>();
            var service = new CategoryClassificationService(napSession, baseService);

            return service;
        }

        #endregion Helpers
    }
}
