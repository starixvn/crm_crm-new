namespace CRM.Controllers.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Core.Constants;
    using CRM.Core.Models;
    using CRM.Criteria.ChatTypeMapping;
    using CRM.Criteria.Common;
    using CRM.Models;
    using CRM.Models.ChatTypeMapping;
    using CRM.Models.Common;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.BotServices.Interfaces;
    using CRM.ViewModels.ChatTypeMapping;
    using Fanex.NAP.Client;
    using Microsoft.AspNetCore.Mvc;
    using Newtonsoft.Json;
    using NSubstitute;
    using Xunit;

    public class ChatTypeMappingControllerTests
    {
        private INapSession napSession;
        private ISettingService settingService;
        private ICommonService commonService;
        private IChatTypeMappingService chatTypeMappingService;
        private ILetstalkApiService letstalkService;
        private ITelegramApiService telegramService;
        private IExportExcelService excelService;

        [Fact]
        public async Task GetSettings_WhenCalled_ReturnExpectedJsonResult()
        {
            var fixture = new Fixture();
            var bots = fixture.Create<IEnumerable<BaseBotModel>>();
            var langs = new List<Models.Setting.Setting>();
            var recipientTypes = fixture.Create<IEnumerable<BaseModel>>();
            var botServices = fixture.Create<IEnumerable<BaseModel>>();
            var chatTypes = fixture.Create<IEnumerable<BaseModel>>();
            var mappingStatues = fixture.Create<IEnumerable<BaseModel>>();
            var languages = langs.Select(l => new BaseModel { Id = l.SettingId, Name = l.SettingValue });

            var expected = new
            {
                ChatTypes = chatTypes,
                MappingStatuses = mappingStatues,
                Languages = languages,
                Bots = bots,
                RecipientTypes = recipientTypes,
                BotServices = botServices
            };

            // Arrange
            var controller = GetController();
            commonService.GetConversationBotAsync().Returns(bots);
            settingService.GetSettingAsync(Arg.Any<string>()).Returns(langs);
            commonService.GetRecipientTypeAsync().Returns(recipientTypes);
            commonService.GetChatTypes().Returns(chatTypes);
            commonService.GetMappingStatus().Returns(mappingStatues);
            commonService.GetBotServicesAsync().Returns(botServices);

            // Act
            var actual = await controller.GetSettings();

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(actual);
            Assert.Equal(JsonConvert.SerializeObject(expected), JsonConvert.SerializeObject(jsonResult.Value));
        }

        [Fact]
        public async Task GetChatTypeMapping_WhenCalled_ReturnExpectedJsonResult()
        {
            var fixture = new Fixture();
            var mappingData = fixture.Create<IEnumerable<ChatTypeMappingModel>>();
            var totalRows = fixture.Create<int>();

            var controler = GetController();

            chatTypeMappingService.GetChatTypeMappingAsync(Arg.Any<GetChatTypeMappingCriteria>())
                .Returns(new ValueTuple<IEnumerable<ChatTypeMappingModel>, int>(mappingData, totalRows));

            var actual = await controler.GetChatTypeMapping(fixture.Create<ChatTypeFilterViewModel>());
            // Assert
            var jsonResult = Assert.IsType<JsonResult>(actual);
            var mappings = (IEnumerable<ChatTypeMappingModel>)jsonResult.Value.GetType().GetProperty("data").GetValue(jsonResult.Value);
            var totalItems = (int)jsonResult.Value.GetType().GetProperty("TotalItems").GetValue(jsonResult.Value);
            Assert.Equal(mappings, mappingData);
            Assert.Equal(totalItems, totalRows);
        }

        [Fact]
        public async Task UpdateActiveStatus_WhenCalled_ReturnExpectedJsonCommandResult()
        {
            var expected = new CommandResult { Code = 0 };
            var controller = GetController();

            chatTypeMappingService.EditActiveStatusAsync(Arg.Any<int>(), Arg.Any<bool>(), Arg.Any<int>()).Returns(expected);

            var actual = await controller.UpdateActiveStatus(new ActiveStatusModel { ConversationGroupId = 1, IsActive = true });

            var jsonResult = Assert.IsType<JsonResult>(actual);
            var result = (CommandResult)jsonResult.Value;
            Assert.Equal(expected, result);
        }

        [Fact]
        public async Task DeleteConversation_WhenCalled_ReturnExpectedJsonCommandResult()
        {
            var expected = new CommandResult { Code = 0 };
            var controller = GetController();

            chatTypeMappingService.DeleteConversationGroupAsync(Arg.Any<int>(), Arg.Any<int>()).Returns(expected);

            var actual = await controller.DeleteConversationGroup(1);

            var jsonResult = Assert.IsType<JsonResult>(actual);
            var result = (CommandResult)jsonResult.Value;
            Assert.Equal(expected, result);
        }

        [Fact]
        public async Task InsertPersonalMapping_WhenInvalidLetstalkId_ReturnExpectedCommandResult()
        {
            var fixture = new Fixture();
            var commandResult = fixture.Create<CommandResult>();
            var letstalkProfile = fixture.Create<LetstalkTelegramContact>();
            var telegramProfile = fixture.Create<LetstalkTelegramContact>();
            var criteria = fixture.Create<InsertPersonalMappingCommand>();
            var controller = GetController();
            var invalidLetstalk = fixture.Create<string>();
            letstalkService.GetPersonalDisplayNameAsync(Arg.Any<long>(), Arg.Any<string>()).Returns(letstalkProfile);
            telegramService.GetPersonalDisplayNameAsync(Arg.Any<long>(), Arg.Any<long>()).Returns(telegramProfile);
            chatTypeMappingService.CreatePersonalMappingAsync(Arg.Do<InsertPersonalMappingCommand>(x => criteria = x)).Returns(commandResult);
            var actual = await controller.InsertPersonalMapping(new PersonalMappingViewModel { BotId = 100020, ConversationId = invalidLetstalk, RecipientIds = "1", ChannelId = 1 });

            var jsonResult = Assert.IsType<JsonResult>(actual);
            var commandResultJson = (CommandResult)jsonResult.Value;
            Assert.False(commandResultJson.IsSuccessful);
            Assert.Equal(commandResult.Message, commandResultJson.Message);
        }

        [Fact]
        public async Task InsertPersonalMapping_WhenValidLetstalkId_ReturnExpectedCommandResult()
        {
            var fixture = new Fixture();
            var expected = fixture.Create<CommandResult>();
            var letstalkResult = fixture.Create<LetstalkTelegramContact>();
            var viewModal = fixture.Create<PersonalMappingViewModel>();
            viewModal.RecipientIds = "1";
            viewModal.ChannelId = 1;

            var controller = GetController();

            letstalkService.GetPersonalDisplayNameAsync(Arg.Any<long>(), Arg.Any<string>()).Returns(letstalkResult);
            chatTypeMappingService.CreatePersonalMappingAsync(Arg.Any<InsertPersonalMappingCommand>()).Returns(expected);

            var actual = await controller.InsertPersonalMapping(viewModal);

            var jsonResult = Assert.IsType<JsonResult>(actual);
            var commandResult = (CommandResult)jsonResult.Value;
            Assert.False(commandResult.IsSuccessful);
        }

        [Fact]
        public async Task UpdatePersonalMapping_WhenInvalidLetstalkId_ReturnExpectedCommandResult()
        {
            var fixture = new Fixture();
            var userProfile = new LetstalkTelegramContact { DisplayName = string.Empty };
            var controller = GetController();
            var invalidLetstalk = fixture.Create<string>();
            letstalkService.GetPersonalDisplayNameAsync(Arg.Any<long>(), Arg.Any<string>()).Returns(userProfile);

            var actual = await controller.UpdatePersonalMapping(new PersonalMappingViewModel { BotId = 100020, ConversationId = invalidLetstalk, ChannelId = 1 });

            var jsonResult = Assert.IsType<JsonResult>(actual);
            var commandResult = (CommandResult)jsonResult.Value;
            Assert.False(commandResult.IsSuccessful);
            Assert.Equal(string.Format(ViewResources.LetstalkInvalidMessage, invalidLetstalk), commandResult.Message);
        }

        [Fact]
        public async Task UpdatePersonalMapping_WhenValidLetstalkId_ReturnExpectedCommandResult()
        {
            var fixture = new Fixture();
            var expected = fixture.Create<CommandResult>();
            var letstalkResult = fixture.Create<LetstalkTelegramContact>();
            var viewModal = fixture.Create<PersonalMappingViewModel>();
            viewModal.RecipientIds = "1";
            viewModal.ChannelId = 1;

            var controller = GetController();

            letstalkService.GetPersonalDisplayNameAsync(Arg.Any<long>(), Arg.Any<string>()).Returns(letstalkResult);
            chatTypeMappingService.EditChatTypeMappingAsync(Arg.Any<UpdateChatTypeMappingCommand>()).Returns(expected);

            var actual = await controller.UpdatePersonalMapping(viewModal);

            var jsonResult = Assert.IsType<JsonResult>(actual);
            var commandResult = (CommandResult)jsonResult.Value;
            Assert.Equal(expected, commandResult);
        }

        [Fact]
        public async Task GetRecipientByType_WhenCalled_ReturnExpectedRecipients()
        {
            var fixture = new Fixture();

            var expected = fixture.Create<(IEnumerable<RecipientModel>, IEnumerable<BotInfo>)>();

            var controller = GetController();
            commonService.GetRecipientAsync(Arg.Any<GetRecipientsCriteria>()).Returns(expected);

            var actual = await controller.GetRecipientByType(1);

            var jsonResult = Assert.IsType<JsonResult>(actual);
            var result = jsonResult.Value.GetType().GetProperty("data").GetValue(jsonResult.Value);
            Assert.Equal(expected.Item1, result);
        }

        [Fact]
        public async Task GetGroupHeadlineByRecipient_WhenCalled_ReturnExpectedHeadlineList()
        {
            var fixture = new Fixture();

            var expected = fixture.Create<IEnumerable<GroupHeadlineDirectAccountModel>>();

            var controller = GetController();
            chatTypeMappingService.GetHeadlineByRecipientAsync(Arg.Any<string>()).Returns(expected);

            var actual = await controller.GetGroupHeadlineByRecipient("1,2,3,4,5");

            var jsonResult = Assert.IsType<JsonResult>(actual);
            var result = (IEnumerable<GroupHeadlineDirectAccountModel>)jsonResult.Value;
            Assert.Equal(expected, result);
        }

        [Fact]
        public async Task UpdateGroupMapping_WhenValidLetstalkId_ReturnExpectedCommandResult()
        {
            var fixture = new Fixture();
            var expected = fixture.Create<CommandResult>();
            var viewModal = fixture.Create<PersonalMappingViewModel>();

            var controller = GetController();

            chatTypeMappingService.EditChatTypeMappingAsync(Arg.Any<UpdateChatTypeMappingCommand>()).Returns(expected);

            var actual = await controller.UpdateGroupMapping(viewModal);

            var jsonResult = Assert.IsType<JsonResult>(actual);
            var commandResult = (CommandResult)jsonResult.Value;
            Assert.Equal(expected, commandResult);
        }

        [Fact]
        public async Task VerifyLetstalkInGroup_WhenNoBotId_ReturnNullJsonResult()
        {
            var controller = GetController();
            var actual = await controller.VerifyLetstalkInGroup(new LetstalkVerificationViewModel { BotId = 0 });

            var jsonResult = Assert.IsType<JsonResult>(actual);
            Assert.Null(jsonResult.Value);
        }

        [Fact]
        public async Task VerifyLetstalkInGroup_WhenNoGroupId_ReturnNullJsonResult()
        {
            var controller = GetController();
            var actual = await controller.VerifyLetstalkInGroup(new LetstalkVerificationViewModel { BotId = 10, GroupConversationId = string.Empty });

            var jsonResult = Assert.IsType<JsonResult>(actual);
            Assert.Null(jsonResult.Value);
        }

        [Fact]
        public async Task VerifyLetstalkInGroup_WhenValidBotIdAndGroupId_ReturnExpectedJsonResult()
        {
            var fixture = new Fixture();
            var botFriends = fixture.Create<IList<string>>();
            var letsalkValidationModel = fixture.Create<LetsalkValidationModel>();
            var roomList = fixture.Create<List<string>>();

            LetstalkVerificationViewModel inputData = new LetstalkVerificationViewModel
            {
                BotId = 100020,
                GroupConversationId = roomList.FirstOrDefault(),
                Recipients = new List<RecipientLetstalk>
                {
                    new RecipientLetstalk
                    {
                        RecipientId =1,
                        RecipientName = "TestName",
                        Letstalks = new List<LetstalkAccountInGroup>
                        {
                            new LetstalkAccountInGroup { LetstalkId = botFriends[1]},
                            new LetstalkAccountInGroup { LetstalkId = "test"},
                        }
                    }
                }
            };

            var expected = JsonConvert.DeserializeObject<List<RecipientLetstalk>>(JsonConvert.SerializeObject(inputData.Recipients));
            expected.FirstOrDefault().Letstalks[0].IsGroupMember = false;
            expected.FirstOrDefault().Letstalks[1].IsBotFriend = false;
            var controller = GetController();

            letstalkService.VerifyLetstalkOnGroup(Arg.Any<long>(), Arg.Any<string>(), Arg.Any<List<RecipientLetstalk>>()).Returns(letsalkValidationModel);

            var actual = await controller.VerifyLetstalkInGroup(inputData);

            var jsonResult = Assert.IsType<JsonResult>(actual);
            var result = jsonResult.Value;
            Assert.Equal(JsonConvert.SerializeObject(new { isBotRemoved = true, recipients = expected }), JsonConvert.SerializeObject(result));
        }

        [Fact]
        public async Task GetLetstalkDisplayName_WhenInvalidLetstalkId_ReturnEmptyString()
        {
            var letstalkContact = new LetstalkTelegramContact { DisplayName = string.Empty };
            var controller = GetController();
            letstalkService.GetPersonalDisplayNameAsync(Arg.Any<long>(), Arg.Any<string>()).Returns(letstalkContact);
            var actual = await controller.GetLetstalkDisplayName(1, "abc");
            Assert.Equal(string.Empty, actual);
        }

        [Fact]
        public async Task GetLetstalkDisplayName_WhenValidLetstalkId_ReturnExpectedName()
        {
            var letstalkContact = new LetstalkTelegramContact { DisplayName = "DisplayName" };
            var controller = GetController();
            letstalkService.GetPersonalDisplayNameAsync(Arg.Any<long>(), Arg.Any<string>()).Returns(letstalkContact);
            var actual = await controller.GetLetstalkDisplayName(1, "abc");
            Assert.Equal("DisplayName", actual);
        }

        [Fact]
        public async Task GetTelegramDisplayName_WhenInvalidLetstalkId_ReturnEmptyString()
        {
            var telegramContact = new LetstalkTelegramContact { DisplayName = string.Empty };
            var controller = GetController();
            telegramService.GetPersonalDisplayNameAsync(Arg.Any<long>(), Arg.Any<long>()).Returns(telegramContact);
            var actual = await controller.GetTelegramDisplayName(1, 1);
            Assert.Equal(string.Empty, actual);
        }

        [Fact]
        public async Task GetTelegramDisplayName_WhenValidLetstalkId_ReturnExpectedName()
        {
            var telegramContact = new LetstalkTelegramContact { DisplayName = "DisplayName" };
            var controller = GetController();
            telegramService.GetPersonalDisplayNameAsync(Arg.Any<long>(), Arg.Any<long>()).Returns(telegramContact);
            var actual = await controller.GetTelegramDisplayName(1, 1);
            Assert.Equal("DisplayName", actual);
        }

        [Fact]
        public async Task UpdateRemark_WhenCall_ReturnExpectedCommandResult()
        {
            var fixture = new Fixture();
            var expected = fixture.Create<CommandResult>();
            var viewModal = fixture.Create<PersonalMappingViewModel>();

            var controller = GetController();

            chatTypeMappingService.EditChatTypeMappingRemarkAsync(Arg.Any<UpdateChatTypeMappingRemarkCommand>()).Returns(expected);

            var actual = await controller.UpdateRemark(viewModal);

            var jsonResult = Assert.IsType<JsonResult>(actual);
            var commandResult = (CommandResult)jsonResult.Value;
            Assert.Equal(expected, commandResult);
        }

        [Fact]
        public async Task ExportExcelReport_WhenCalled_ReturnsExpectedFile()
        {
            // Arrange
            var fixture = new Fixture();
            var controller = GetController();
            var criteria = fixture.Create<ChatTypeFilterViewModel>();
            var expected = fixture.Create<byte[]>();
            excelService.ExportChatTypeMapping(Arg.Any<IEnumerable<ChatTypeMappingModel>>()).Returns(expected);

            // Action
            var result = await controller.ExportExcel(criteria) as FileContentResult;

            // Assert
            Assert.Equal(expected, result.FileContents);
            Assert.Equal(MimeType.XLSX, result.ContentType);
            Assert.Equal($"{ViewResources.ChatTypeMapping}.xlsx", result.FileDownloadName);
        }

        #region helper

        private ChatTypeMappingController GetController()
        {
            napSession = Substitute.For<INapSession>();
            settingService = Substitute.For<ISettingService>();
            commonService = Substitute.For<ICommonService>();
            chatTypeMappingService = Substitute.For<IChatTypeMappingService>();
            letstalkService = Substitute.For<ILetstalkApiService>();
            telegramService = Substitute.For<ITelegramApiService>();
            excelService = Substitute.For<IExportExcelService>();
            return new ChatTypeMappingController(
                napSession,
                settingService,
                commonService,
                chatTypeMappingService,
                excelService,
                letstalkService,
                telegramService
                );
        }

        #endregion helper
    }
}