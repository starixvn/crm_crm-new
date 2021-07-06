namespace CRM.BackgroundJob.UnitTests.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using System.Web;
    using AutoFixture;
    using CRM.BackgroundJob.Criteria.ChatBot;
    using CRM.BackgroundJob.Models.ChatBot;
    using CRM.Core.Extensions.XML;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using Fanex.CRM.BackgroundJob.Constants;
    using Fanex.CRM.BackgroundJob.Criteria.ChatBot;
    using Fanex.CRM.BackgroundJob.Models;
    using Fanex.CRM.BackgroundJob.Models.ChatBot;
    using Fanex.CRM.BackgroundJob.Services;
    using NSubstitute;
    using Xunit;

    public class ChatBotTicketVoidingServiceTests
    {
        private IBaseService baseService;

        [Fact]
        public async Task GetVoidingMessageAsync_WhenCalled_ReturnExpectedMessages()
        {
            // Arrange
            var service = GetService();
            var expected = new ValueTuple<IEnumerable<ChatBotVoidingMessage>, IEnumerable<ChatBotVoidingHistory>>();
            baseService.FetchMultipleAsync<ChatBotVoidingMessage, ChatBotVoidingHistory>(Arg.Any<GetChatBotVoidingMessageCriteria>()).Returns(expected);

            // Act
            var actual = await service.GetVoidingMessageAsync();

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public async Task ImportVoidingMessageHistoryCheckAsync_WhenCalled_ReturnExpectedVoidingHistory()
        {
            // Arrange
            var fixture = new Fixture();
            var expected = fixture.Create<IEnumerable<ChatBotVoidingHistory>>();
            var xml = expected.ToXML("root").ToString();
            var criteria = new GetVoidingMessageHistoryCheckCriteria();
            var service = GetService();
            baseService.GetDataAsync<ChatBotVoidingHistory>(Arg.Do<GetVoidingMessageHistoryCheckCriteria>(x => criteria = x)).Returns(expected);

            // Act
            var actual = await service.ImportVoidingMessageHistoryCheckAsync(expected);

            // Assert
            Assert.Equal(expected, actual);
            Assert.Equal(xml, criteria.Messages);
        }

        [Fact]
        public async Task GetChatBotAbnormalAccountGetUsernameList_WhenCalled_ReturnExpectedUsernameList()
        {
            // Arrange
            var fixture = new Fixture();
            var voidingHis = fixture.Create<IEnumerable<ChatBotVoidingHistory>>();
            var expected = fixture.Create<IEnumerable<ChatBotUserNameList>>(); 
             var xml = voidingHis.ToXML("root").ToString();
            var criteria = new GetChatBotAbnormalAccountGetUsernameListCriteria();
            var service = GetService();
            baseService.GetDataAsync<ChatBotUserNameList>(Arg.Do<GetChatBotAbnormalAccountGetUsernameListCriteria>(x => criteria = x)).Returns(expected);

            // Act
            var actual = await service.GetChatBotAbnormalAccountGetUsernameList(voidingHis);

            // Assert
            Assert.Equal(expected, actual);
            Assert.Equal(xml, criteria.Messages);
        }

        [Fact]
        public async Task ImportVoidingMessageAsync_WhenCalled_ReturnExpectedCommandResult()
        {
            // Arrange
            var fixture = new Fixture();
            var expected = fixture.Create<CommandResult>();
            var voidingMessages = new List<ChatBotVoidingMessage>
            {
                new ChatBotVoidingMessage
                {
                    MessageId = 1,
                    RequestId = 1
                }
            };
            var userNames = new List<ChatBotUserNameList>{
                new ChatBotUserNameList
                {
                    MessageId = 1,
                    RequestId = 1,
                    CustIdList ="CustIdList",
                    UsernameList ="UsernameList"
                }
            };

            const string XmlTemplate = "<r MessageID='{0}' RequestID='{1}' UsernameList='{2}' CustIdList='{3}'/>";
            var userName = userNames.FirstOrDefault();
            var stringBuilder = new StringBuilder(Constants.BeginRootTag.ToLowerInvariant());
            stringBuilder.AppendFormat(XmlTemplate, userName.MessageId, userName.RequestId, userName.UsernameList, userName.CustIdList);
            var xml = stringBuilder.Append(Constants.EndRootTag.ToLowerInvariant()).ToString();
            var criteria = new ImportChatBotVoidingMessageCriteria();
            var service = GetService();
            baseService.ExecuteNonQueryAsync(Arg.Do<ImportChatBotVoidingMessageCriteria>(x => criteria = x)).Returns(expected);

            // Act
            var actual = await service.ImportVoidingMessageAsync(voidingMessages, userNames);

            // Assert
            Assert.Equal(expected, actual);
            Assert.Equal(xml, criteria.Messages);
        }

        [Fact]
        public async Task ImportVoidingMessageAsync_WhenMessageIdAndRequestIdNotEqual_ReturnExpectedXML()
        {
            // Arrange
            var fixture = new Fixture();
            var expected = fixture.Create<CommandResult>();
            var voidingMessages = new List<ChatBotVoidingMessage>
            {
                new ChatBotVoidingMessage
                {
                    MessageId = 2,
                    RequestId = 1
                }
            };
            var userNames = new List<ChatBotUserNameList>{
                new ChatBotUserNameList
                {
                    MessageId = 1,
                    RequestId = 1,
                    CustIdList ="CustIdList",
                    UsernameList ="UsernameList"
                }
            };

            const string XmlTemplate = "<r MessageID='{0}' RequestID='{1}' UsernameList='{2}' CustIdList='{3}'/>";
            var stringBuilder = new StringBuilder(Constants.BeginRootTag.ToLowerInvariant());
            stringBuilder.AppendFormat(XmlTemplate, 2, 1, "", "");
            var xml = stringBuilder.Append(Constants.EndRootTag.ToLowerInvariant()).ToString();
            var criteria = new ImportChatBotVoidingMessageCriteria();
            var service = GetService();
            baseService.ExecuteNonQueryAsync(Arg.Do<ImportChatBotVoidingMessageCriteria>(x => criteria = x)).Returns(expected);

            // Act
            await service.ImportVoidingMessageAsync(voidingMessages, userNames);

            // Assert
            Assert.Equal(xml, criteria.Messages);
        }

        [Fact]
        public async Task GetImportMessageByBatchSize_WhenCalled_ReturnExpectedUsernameList()
        {
            // Arrange
            var fixture = new Fixture();
            var expected = fixture.Create<IEnumerable<ChatBotUserNameList>>();
            var criteria = new GetImportMessageCriteria();
            var service = GetService();
            baseService.GetDataAsync<ChatBotUserNameList>(Arg.Do<GetImportMessageCriteria>(x => criteria = x)).Returns(expected);

            // Act
            var actual = await service.GetImportMessageByBatchSize(10);

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public async Task EditVoidingMessageAsync_WhenCalled_ReturnExpectedCommandResult()
        {
            // Arrange
            var fixture = new Fixture();
            var expected = fixture.Create<CommandResult>();
            var voidingMessages = fixture.Create<IEnumerable<ChatBotVoidingMessage>>();
            var xml = voidingMessages.ToXML("root").ToString();
            var criteria = new EditChatBotVoidingMessageCommand();

            var service = GetService();
            baseService.ExecuteNonQueryAsync(Arg.Do<EditChatBotVoidingMessageCommand>(x => criteria = x)).Returns(expected);

            // Act
            var actual = await service.EditVoidingMessageAsync(voidingMessages);

            // Assert
            Assert.Equal(expected, actual);
            Assert.Equal(xml, criteria.Messages);
        }

        [Fact]
        public async Task GetMessageInfoAsync_WhenCalled_ReturnExpectedMessages()
        {
            // Arrange
            var fixture = new Fixture();
            var message = new List<Message>
            {
                new Message
                {
                    Content_en = "@@1",
                    Content_cs = "@@1",
                    Content_th = "@@1",
                    Content_vn = "@@1"
                }
            };
            var expected = new List<Message>
            {
                new Message
                {
                    Content_en = "1",
                    Content_cs = "1",
                    Content_th = "1",
                    Content_vn = "1"
                }
            };
            var voidingMessages = fixture.Create<IEnumerable<ChatBotVoidingMessage>>();
            var xml = voidingMessages.ToXML("root").ToString();
            var criteria = new GetChatBotMessageInfoCriteria();
            var service = GetService();
            baseService.GetDataAsync<Message>(Arg.Do<GetChatBotMessageInfoCriteria>(x => criteria = x)).Returns(message);

            // Act
            var actual = await service.GetMessageInfoAsync(voidingMessages);

            // Assert
            Assert.Equal(expected.ToString(), actual.ToString());
            Assert.Equal(xml, criteria.Messages);
        }

        [Fact]
        public async Task GetTicketVoidingInfoAsync_WhenCalled_ReturnExpectedTicketInfos()
        {
            // Arrange
            var fixture = new Fixture();
            var expected = new ValueTuple<IEnumerable<ChatBotVoidingTicketInfo>, IEnumerable<ChatBotUserNameList>>();
            var userNameList = fixture.Create<IEnumerable<ChatBotUserNameList>>();
            var xml = userNameList.ToXML("root").ToString();
            var criteria = new GetChatBotTicketVoidingInfoCriteria {
                Messages = xml
            };
            var service = GetService();
            baseService.FetchMultipleAsync<ChatBotVoidingTicketInfo, ChatBotUserNameList>(Arg.Any<GetChatBotTicketVoidingInfoCriteria>()).Returns(expected);

            // Act
            var actual = await service.GetTicketVoidingInfoAsync(userNameList,"Live", true);

            // Assert
            Assert.Equal(expected, actual);
            Assert.Equal(xml, criteria.Messages);
        }

        [Fact]
        public async Task ImportTicketVoidingAsync_WhenCalled_ReturnExpectedCommandResult()
        {
            // Arrange
            const string XmlTemplate = "<r MessageID='{0}' Username='{1}' CustId='{2}' " +
                "Recommend='{3}' Mrecommend='{4}' Srecommend='{5}' IsTest='{6}' " +
                "Content_en='{7}' Content_cs='{8}' Content_th='{9}' Content_vn='{10}' Type='{11}'/>";
            const string messageTemplate = "<r MessageID='{0}' RequestID='{1}' UsernameList='{2}'/>";
            var messageStringBuilder = new StringBuilder(Constants.BeginRootTag.ToLowerInvariant());
            var fixture = new Fixture();
            var userNames = new List<ChatBotUserNameList> { 
                new ChatBotUserNameList
                {
                    MessageId = 1,
                    RequestId = 1,
                    UsernameList = "UsernameList"
                }
            };

            messageStringBuilder.AppendFormat(messageTemplate, 1, 1, "UsernameList");
            messageStringBuilder.Append(Constants.EndRootTag.ToLowerInvariant());

            var messages = new List<Message>
            {
                fixture.Create<Message>()
            };
            var ticketInfos = new List<ChatBotVoidingTicketInfo>
            {
                fixture.Create<ChatBotVoidingTicketInfo>()
            };

            ticketInfos.First().MessageId = messages.First().MessageId;
            var ticketInfo = ticketInfos.FirstOrDefault();
            var message = messages.FirstOrDefault();
            var stringBuilder = new StringBuilder(Constants.BeginRootTag.ToLowerInvariant());
            stringBuilder.AppendFormat(XmlTemplate,
                    ticketInfo.MessageId,
                    ticketInfo.Username,
                    ticketInfo.CustId,
                    ticketInfo.Recommend,
                    ticketInfo.Mrecommend,
                    ticketInfo.Srecommend,
                    ticketInfo.IsTest,
                    HttpUtility.HtmlEncode(message?.Content_en),
                    HttpUtility.HtmlEncode(message?.Content_cs),
                    HttpUtility.HtmlEncode(message?.Content_th),
                    HttpUtility.HtmlEncode(message?.Content_vn),
                    ticketInfo.Type);
            stringBuilder.Append(Constants.EndRootTag.ToLowerInvariant());
            var expected = fixture.Create<CommandResult>();
            var criteria = new ImportChatBotTicketVoidingInfoCommand();
            var service = GetService();
            baseService.ExecuteNonQueryAsync(Arg.Do<ImportChatBotTicketVoidingInfoCommand>(x => criteria = x)).Returns(expected);

            // Act
            var actual = await service.ImportTicketVoidingAsync(messages, ticketInfos, userNames, Constants.DefaultEnvironment);

            // Assert
            Assert.Equal(expected, actual);
            Assert.Equal(stringBuilder.ToString(), criteria.XmlData);
            Assert.Equal(messageStringBuilder.ToString(), criteria.Messages);
            Assert.Equal(Constants.DefaultEnvironment, criteria.Environment);
            Assert.Equal(0, criteria.ErrCode);
            Assert.Null(criteria.ErrMsg);
        }

        [Fact]
        public async Task ImportTicketVoidingAsync_WhenMessageIdNotEqual_ReturnExpectedXml()
        {
            // Arrange
            const string XmlTemplate = "<r MessageID='{0}' Username='{1}' CustId='{2}' " +
                "Recommend='{3}' Mrecommend='{4}' Srecommend='{5}' IsTest='{6}' " +
                "Content_en='{7}' Content_cs='{8}' Content_th='{9}' Content_vn='{10}' Type='{11}'/>";
            var fixture = new Fixture();
            var userNames = new List<ChatBotUserNameList> {
                new ChatBotUserNameList
                {
                    MessageId = 1,
                    RequestId = 1,
                    UsernameList = "UsernameList"
                }
            };

            var messages = new List<Message>
            {
               new Message
               {
                   MessageId = 1,
                   RequestId = 1
               }
            };
            var ticketInfos = new List<ChatBotVoidingTicketInfo>
            {
                new ChatBotVoidingTicketInfo
                {
                    MessageId = 2
                }
            };

            ticketInfos.First().MessageId = messages.First().MessageId;
            var ticketInfo = ticketInfos.FirstOrDefault();
            var stringBuilder = new StringBuilder(Constants.BeginRootTag.ToLowerInvariant());
            stringBuilder.AppendFormat(XmlTemplate,
                    ticketInfo.MessageId,
                    ticketInfo.Username,
                    ticketInfo.CustId,
                    ticketInfo.Recommend,
                    ticketInfo.Mrecommend,
                    ticketInfo.Srecommend,
                    ticketInfo.IsTest,
                    "",
                    "",
                    "",
                    "",
                    ticketInfo.Type);
            stringBuilder.Append(Constants.EndRootTag.ToLowerInvariant());
            var expected = fixture.Create<CommandResult>();
            var criteria = new ImportChatBotTicketVoidingInfoCommand();
            var service = GetService();
            baseService.ExecuteNonQueryAsync(Arg.Do<ImportChatBotTicketVoidingInfoCommand>(x => criteria = x)).Returns(expected);

            // Act
            var actual = await service.ImportTicketVoidingAsync(messages, ticketInfos, userNames, Constants.DefaultEnvironment);

            // Assert
            Assert.Equal(expected, actual);
            Assert.Equal(stringBuilder.ToString(), criteria.XmlData);
            Assert.Equal(Constants.DefaultEnvironment, criteria.Environment);
            Assert.Equal(0, criteria.ErrCode);
            Assert.Null(criteria.ErrMsg);
        }

        #region Helpers

        private ChatBotTicketVoidingService GetService()
        {
            baseService = Substitute.For<IBaseService>();
            return new ChatBotTicketVoidingService(baseService);
        }

        #endregion Helpers
    }
}