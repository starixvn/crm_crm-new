namespace CRM.Controllers.UnitTests.Feedback
{
    using AutoFixture;
    using CRM.Controllers.Feedback;
    using CRM.Core.Constants;
    using CRM.Core.Services;
    using CRM.Models;
    using CRM.Models.Feedback.AddGuessFeedback;
    using CRM.Models.Setting;
    using CRM.Services;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using NSubstitute;
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Xunit;
    using static Fanex.NAP.Core.Business.Constant;

    public class AddGuestFeedbackControllerTests
    {
        private INapSession napSession;
        private INapSettings napSettings;
        private IUserService userService;
        private ISettingService settingService;
        private IBaseService baseService;
        private readonly Fixture fixture = new Fixture();

        [Fact]
        public void Index_WhenCalled_ReturnExpectedViewResult()
        {
            // Arrange
            var controller = GetController();
            userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy.Host).Returns(true);

            // Act
            var result = controller.Index();

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            var viewModel = Assert.IsType<bool>(viewResult.Model);
            Assert.True(viewModel);
        }

        [Fact]
        public async Task AllSetting_WhenCalled_ReturnExpectedSettings()
        {
            try
            {
                // Arrange
                var controller = GetController();
                var settings = new AllSettingToAddFeedback
                {
                    Extensions = new List<SettingRelation>(),
                    Countries = new List<Country>(),
                    Provinces = new List<Province>(),
                    CommunicationTools = new List<Setting>(),
                    Languages = new List<Language>(),
                    MainCategories = new List<Setting>(),
                    SubCategories = new List<Setting>(),
                    Products = new List<Product>(),
                    SubProducts = new List<Product>(),
                    Bettypes = new List<Product>(),
                    Sites = new List<SiteSetting>(),
                    Responses = new List<SettingRelation>(),
                    Status = new List<FeedbackStatus>(),
                    Titles = new List<SettingRelation>(),
                    Roles = new List<SettingRelation>(),
                    LicenseeType = new List<BaseModel>(),
                };
                userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy.Host).Returns(true);

                // Act
                var result = await controller.AllSetting() as JsonResult;
                var Extensions = (IEnumerable<SettingRelation>)result.Value.GetType().GetProperty("Extensions").GetValue(result.Value);
                var Countries = (IEnumerable<Country>)result.Value.GetType().GetProperty("Countries").GetValue(result.Value);
                var Provinces = (IEnumerable<Province>)result.Value.GetType().GetProperty("Provinces").GetValue(result.Value);
                var CommunicationTools = (IEnumerable<Setting>)result.Value.GetType().GetProperty("CommunicationTools").GetValue(result.Value);
                var Languages = (IEnumerable<Language>)result.Value.GetType().GetProperty("Languages").GetValue(result.Value);
                var MainCategories = (IEnumerable<Setting>)result.Value.GetType().GetProperty("MainCategories").GetValue(result.Value);
                var SubCategories = (IEnumerable<Setting>)result.Value.GetType().GetProperty("SubCategories").GetValue(result.Value);
                var Products = (IEnumerable<Product>)result.Value.GetType().GetProperty("Products").GetValue(result.Value);
                var SubProducts = (IEnumerable<Product>)result.Value.GetType().GetProperty("SubProducts").GetValue(result.Value);
                var Bettypes = (IEnumerable<Product>)result.Value.GetType().GetProperty("Bettypes").GetValue(result.Value);
                var Sites = (IEnumerable<SiteSetting>)result.Value.GetType().GetProperty("Sites").GetValue(result.Value);
                var Responses = (IEnumerable<SettingRelation>)result.Value.GetType().GetProperty("Responses").GetValue(result.Value);
                var Status = (IEnumerable<FeedbackStatus>)result.Value.GetType().GetProperty("Status").GetValue(result.Value);
                var Titles = (IEnumerable<SettingRelation>)result.Value.GetType().GetProperty("Titles").GetValue(result.Value);
                var LicenseeType = (IEnumerable<BaseModel>)result.Value.GetType().GetProperty("LicenseeType").GetValue(result.Value);

                // Assert
                Assert.Equal(settings.Extensions, Extensions);
                Assert.Equal(settings.Extensions, Extensions);
                Assert.Equal(settings.Countries, Countries);
                Assert.Equal(settings.Provinces, Provinces);
                Assert.Equal(settings.CommunicationTools, CommunicationTools);
                Assert.Equal(settings.Languages, Languages);
                Assert.Equal(settings.MainCategories, MainCategories);
                Assert.Equal(settings.SubCategories, SubCategories);
                Assert.Equal(settings.Products, Products);
                Assert.Equal(settings.SubProducts, SubProducts);
                Assert.Equal(settings.Bettypes, Bettypes);
                Assert.Equal(settings.Sites, Sites);
                Assert.Equal(settings.Responses, Responses);
                Assert.Equal(settings.Status, Status);
                Assert.Equal(settings.Titles, Titles);
                Assert.Equal(settings.LicenseeType, LicenseeType);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        #region Helpers

        private AddGuestFeedbackController GetController()
        {
            napSession = Substitute.For<INapSession>();
            napSettings = Substitute.For<INapSettings>();
            userService = Substitute.For<IUserService>();
            settingService = Substitute.For<ISettingService>();
            baseService = Substitute.For<IBaseService>();

            return new AddGuestFeedbackController(napSession, napSettings, userService, settingService, baseService);
        }

        #endregion Helpers
    }
}
