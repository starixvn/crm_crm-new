namespace CRM.Letstalk.Services.Tests.Services
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.Core.Services;
    using CRM.Letstalk.Client.Models;
    using CRM.Letstalk.Client.Services.Interfaces;
    using CRM.Letstalk.Services.Criteria;
    using CRM.Letstalk.Services.Models.SendAnnouncement;
    using CRM.Letstalk.Services.Services;
    using Microsoft.Extensions.Configuration;
    using NSubstitute;
    using Xunit;

    public class SendAnnouncementServiceTests
    {
        private readonly SendAnnouncementService service;
        private readonly IBaseService baseService;
        private readonly IConfiguration configuration;
        private readonly ICRMLogService logService;
        private readonly ILetstalkService letstalkService;

        public SendAnnouncementServiceTests()
        {
            var func = Substitute.For<Func<int, ILetstalkService>>();
            letstalkService = Substitute.For<ILetstalkService>();
            func(Arg.Any<int>()).Returns(letstalkService);
            configuration = Substitute.For<IConfiguration>();
            baseService = Substitute.For<IBaseService>();
            logService = Substitute.For<ICRMLogService>();
            service = new SendAnnouncementService(baseService, logService, configuration, func);
        }

        [Fact]
        public async Task GetNotification_WhenNoData_DoNothing()
        {
            baseService.GetDataAsync<AnnouncementNotification>(Arg.Any<GetAnnouncementNotificationToSendCriteria>()).Returns(new List<AnnouncementNotification>());
            await service.ScanThenSendAsnyc();
            await logService.DidNotReceive().ErrorAsync(Arg.Any<Exception>());
            await letstalkService.DidNotReceive().PushMultiRoomAsync(Arg.Any<List<string>>(), Arg.Any<OutgoingMessage>());
            await letstalkService.DidNotReceive().PushPersonalAsync(Arg.Any<List<string>>(), Arg.Any<OutgoingMessage>());
        }
    }
}