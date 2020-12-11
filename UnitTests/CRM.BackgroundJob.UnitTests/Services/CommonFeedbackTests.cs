namespace CRM.BackgroundJob.UnitTests.Services
{
    using System;
    using System.Collections.Generic;
    using AutoFixture;
    using CRM.BackgroundJob.Constants;
    using CRM.BackgroundJob.Services;
    using Fanex.CRM.BackgroundJob.Constants;
    using Fanex.CRM.BackgroundJob.Criteria;
    using Fanex.CRM.BackgroundJob.Models;
    using Fanex.RemotingRef;
    using Microsoft.AspNetCore.Hosting;
    using NSubstitute;
    using Xunit;

    public class CommonFeedbackTests
    {
        private IHostingEnvironment hostingEnvironment;
        private IRemotingRefService remotingRefService;

        private readonly IFixture fixture = new Fixture();

        #region CheckFeedbackValidParams

        [Fact]
        public void CheckFeedbackValidParams__ValidParamsCriteria_ExpectedReturnTrue()
        {
            // Arrange
            var criteria = new CreateMutipleFeedbackCommand
            {
                CategoryIds = "1",
                CategoryXml = "1",
                ProductXml = "1",
                SubCategoryIds = "1",
                ResponseId = 1,
                StationId = "1",
                StatusId = 1,
            };
            var expect = new ValueTuple<bool, string>(true, "");
            var service = GetService();

            // Act
            var result = service.CheckFeedbackValidParams(criteria);

            // Assert
            Assert.Equal(expect, result);
        }

        [Fact]
        public void CheckFeedbackValidParams__InValidParamsResponseIdCriteria_ExpectedReturnFalseAndMessage()
        {
            // Arrange
            var criteria = new CreateMutipleFeedbackCommand
            {
                CategoryIds = "1",
                CategoryXml = "1",
                ProductXml = "1",
                SubCategoryIds = "1",
                ResponseId = short.Parse("0"),
                StationId = "1",
                StatusId = 1
            };
            var expect = new ValueTuple<bool, string>(false, "ResponseId is null.");
            var service = GetService();

            // Act
            var result = service.CheckFeedbackValidParams(criteria);

            // Assert
            Assert.Equal(expect, result);
        }

        [Fact]
        public void CheckFeedbackValidParams__InValidParamsStatusIdCriteria_ExpectedReturnFalseAndMessage()
        {
            // Arrange
            var criteria = new CreateMutipleFeedbackCommand
            {
                CategoryIds = "1",
                CategoryXml = "1",
                ProductXml = "1",
                SubCategoryIds = "1",
                ResponseId = 1,
                StationId = "1",
                StatusId = short.Parse("0")
            };
            var expect = new ValueTuple<bool, string>(false, "StatusId is null.");
            var service = GetService();

            // Act
            var result = service.CheckFeedbackValidParams(criteria);

            // Assert
            Assert.Equal(expect, result);
        }

        [Fact]
        public void CheckFeedbackValidParams__InValidParamsCategoryIdsCriteria_ExpectedReturnFalseAndMessage()
        {
            // Arrange
            var criteria = new CreateMutipleFeedbackCommand
            {
                CategoryIds = "",
                CategoryXml = "1",
                ProductXml = "1",
                SubCategoryIds = "1",
                ResponseId = 1,
                StationId = "1",
                StatusId = 1
            };
            var expect = new ValueTuple<bool, string>(false, "CategoryIds is null.");
            var service = GetService();

            // Act
            var result = service.CheckFeedbackValidParams(criteria);

            // Assert
            Assert.Equal(expect, result);
        }

        [Fact]
        public void CheckFeedbackValidParams__InValidParamsCategoryXmlCriteria_ExpectedReturnFalseAndMessage()
        {
            // Arrange
            var criteria = new CreateMutipleFeedbackCommand
            {
                CategoryIds = "1",
                CategoryXml = "",
                ProductXml = "1",
                SubCategoryIds = "1",
                ResponseId = 1,
                StationId = "1",
                StatusId = 1
            };
            var expect = new ValueTuple<bool, string>(false, "CategoryXml is null.");
            var service = GetService();

            // Act
            var result = service.CheckFeedbackValidParams(criteria);

            // Assert
            Assert.Equal(expect, result);
        }

        [Fact]
        public void CheckFeedbackValidParams__InValidParamsProductXmlCriteria_ExpectedReturnFalseAndMessage()
        {
            // Arrange
            var criteria = new CreateMutipleFeedbackCommand
            {
                CategoryIds = "1",
                CategoryXml = "1",
                ProductXml = "",
                SubCategoryIds = "1",
                ResponseId = 1,
                StationId = "1",
                StatusId = 1
            };
            var expect = new ValueTuple<bool, string>(false, "Products is null.");
            var service = GetService();

            // Act
            var result = service.CheckFeedbackValidParams(criteria);

            // Assert
            Assert.Equal(expect, result);
        }

        [Fact]
        public void CheckFeedbackValidParams__InValidParamsSubCategoryIdsCriteria_ExpectedReturnFalseAndMessage()
        {
            // Arrange
            var criteria = new CreateMutipleFeedbackCommand
            {
                CategoryIds = "1",
                CategoryXml = "1",
                ProductXml = "1",
                SubCategoryIds = "",
                ResponseId = 1,
                StationId = "1",
                StatusId = 1
            };
            var expect = new ValueTuple<bool, string>(false, "SubCategoryIds is null.");
            var service = GetService();

            // Act
            var result = service.CheckFeedbackValidParams(criteria);

            // Assert
            Assert.Equal(expect, result);
        }

        [Fact]
        public void CheckFeedbackValidParams__InValidParamsStationIdCriteria_ExpectedReturnFalseAndMessage()
        {
            // Arrange
            var criteria = new CreateMutipleFeedbackCommand
            {
                CategoryIds = "1",
                CategoryXml = "1",
                ProductXml = "1",
                SubCategoryIds = "1",
                ResponseId = 1,
                StationId = "",
                StatusId = 1
            };
            var expect = new ValueTuple<bool, string>(false, "StationId is null.");
            var service = GetService();

            // Act
            var result = service.CheckFeedbackValidParams(criteria);

            // Assert
            Assert.Equal(expect, result);
        }

        #endregion CheckFeedbackValidParams

        #region GetCategorySubCategoryCWL

        [Fact]
        public void GetCategorySubCategoryCWL_NotExistMainCategory_ReturnDefaultMainCategoryXML()
        {
            // Arrange
            var settings = new List<SettingItem>
                {
                    new SettingItem { SettingName = "MainCategory", SettingValue = "Special" }
                };
            var service = GetService();

            // Act
            var actual = service.GetCategorySubCategoryCWL(settings, DefaultValue.MANotification);

            // Assert
            Assert.Equal(0, actual.Item1);
            Assert.Equal(0, actual.Item2);
            Assert.Equal("<ROOT><Category MainCategoryID='0' SubCategoryID='0' /></ROOT>", actual.Item3);
        }

        [Fact]
        public void GetCategorySubCategoryCWL_ExistMainCategoryAndNotExistSubCategory_ReturnExpectedTuple()
        {
            // Arrange
            var settings = new List<SettingItem>
                {
                    new SettingItem { SettingId = 1, SettingName = "MainCategory", SettingValue = DefaultValue.Special_Notification },
                    new SettingItem { SettingName = "SubCategory", SettingValue = "Company" }
                };

            var service = GetService();

            // Act
            var actual = service.GetCategorySubCategoryCWL(settings, DefaultValue.MANotification);

            // Assert
            Assert.Equal(1, actual.Item1);
            Assert.Equal(0, actual.Item2);
            Assert.Equal("<ROOT><Category MainCategoryID='1' SubCategoryID='0' /></ROOT>", actual.Item3);
        }

        [Fact]
        public void GetCategorySubCategoryCWL_ExistMainCategoryAndExistSubCategory_ReturnExpectedTuple()
        {
            // Arrange
            var settings = new List<SettingItem>
                {
                    new SettingItem { SettingId = 1, SettingName = "MainCategory", SettingValue = DefaultValue.Special_Notification },
                    new SettingItem { SettingId = 2, SettingName = "SubCategory", SettingValue = DefaultValue.MANotification , ParentIds = new List<int>{ 1 }}
                };
            var service = GetService();

            // Act
            var actual = service.GetCategorySubCategoryCWL(settings, DefaultValue.MANotification);

            // Assert
            Assert.Equal(1, actual.Item1);
            Assert.Equal(2, actual.Item2);
            Assert.Equal("<ROOT><Category MainCategoryID='1' SubCategoryID='2' /></ROOT>", actual.Item3);
        }

        #endregion GetCategorySubCategoryCWL

        #region Get Remoting Ref

        [Fact]
        public void GetProductName_ENLanguage_ReturnExpectedProductName()
        {
            // Arrange
            var expect = "Soccer";
            var service = GetService();
            remotingRefService.GetResourceDataByRefIdAndResourceId("Product", Arg.Any<string>(), Arg.Any<string>(), string.Empty).Returns("Soccer");

            // Act
            var actual = service.GetProductName("2", Language.en_US);

            // Assert
            Assert.Equal(expect, actual);
        }

            #endregion Get Remoting Ref

            #region Helpers

            private CommonFeedback GetService()
        {
            hostingEnvironment = Substitute.For<IHostingEnvironment>();
            remotingRefService = Substitute.For<IRemotingRefService>();

            return new CommonFeedback(
                hostingEnvironment,
                remotingRefService
                );
        }

        #endregion Helpers
    }
}
