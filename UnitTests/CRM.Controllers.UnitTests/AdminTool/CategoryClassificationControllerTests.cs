namespace CRM.Controllers.UnitTests.AdminTool
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Controllers.AdminTool;
    using CRM.Core.Constants;
    using CRM.Models.AdminTool.CategoryClassification;
    using CRM.Models.AdminTool.CommunicationToolSetting;
    using CRM.Models.Setting;
    using CRM.Services;
    using CRM.Services.AdminTool;
    using Microsoft.AspNetCore.Mvc;
    using NSubstitute;
    using Xunit;

    public class CategoryClassificationControllerTests : Controller
    {
        private ISettingService settingService;
        private ICategoryClassificationService categoryClassificationService;

        [Fact]
        public async Task GetAllSettings_WhenCalled_ReturnExpectedDataAsync()
        {
            //Arrange
            var mainCategories = new List<Setting>
            {
                new Setting {Id = 1, Name = "test"}
            };
            var subCategories = new List<Setting>
            {
                new Setting {Id = 1, Name = "test"}
            };
            var controller = GetController();
            settingService.GetMainCategoryAsync().Returns(mainCategories);
            settingService.GetSubCategoryAsync().Returns(subCategories);

            // Act
            var result = await controller.GetAllSettings();

            //Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var mainCategoriesJson = (IEnumerable<Setting>)jsonResult.Value.GetType().GetProperty("MainCategories").GetValue(jsonResult.Value);
            var subCategoriesJson = (IEnumerable<Setting>)jsonResult.Value.GetType().GetProperty("SubCategories").GetValue(jsonResult.Value);

            Assert.Equal(mainCategories, mainCategoriesJson);
            Assert.Equal(subCategories, subCategoriesJson);
        }

        [Fact]
        public async Task GetCategoryClassification_WhenCalled_ReturnExpectedDataAsync()
        {
            // Arrange
            var fixture = new Fixture();
            var categoryClassification = fixture.Create<IEnumerable<CategoryClassification>>();
            var param = fixture.Create<GetCategoryClassification>();
            var controller = GetController();
            categoryClassificationService.GetCategoryClassificationAsync(param).Returns(categoryClassification);

            // Act
            var result = await controller.GetCategoryClassification(param);

            //Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var groupCategory = jsonResult.Value.GetType().GetProperty("data").GetValue(jsonResult.Value);
            var totalItems = jsonResult.Value.GetType().GetProperty("totalItems").GetValue(jsonResult.Value);
            Assert.Equal(categoryClassification.GroupBy(x => x.MainCategoryID), groupCategory);
            Assert.Equal(param.TotalRows, totalItems);
        }


        #region Helpers
        private CategoryClassificationController GetController()
        {
            categoryClassificationService = Substitute.For<ICategoryClassificationService>();
            settingService = Substitute.For<ISettingService>();
            return new CategoryClassificationController(settingService, categoryClassificationService);
        }
        #endregion Helpers
    }
}
