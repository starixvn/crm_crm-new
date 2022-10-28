namespace CRM.Letstalk.Core.Tests.Services.EventHandler
{
    using System;
    using System.Threading.Tasks;
    using CRM.Letstalk.Client.Configurations;
    using CRM.Letstalk.Client.Services.Interfaces;
    using CRM.Letstalk.Core.Models;
    using CRM.Letstalk.Core.Services.EventHandler;
    using NSubstitute;
    using Xunit;

    public class ReceiveMessageEventHandlerTests
    {
        private readonly ReceiveMessageEventHandler receiveMessageEventHandler;
        private readonly ILetstalkService letstalkService;

        public ReceiveMessageEventHandlerTests()
        {
            var func = Substitute.For<Func<int, ILetstalkService>>();
            letstalkService = Substitute.For<ILetstalkService>();
            func(Arg.Any<int>()).Returns(letstalkService);
            receiveMessageEventHandler = new ReceiveMessageEventHandler(func);
        }
    }
}