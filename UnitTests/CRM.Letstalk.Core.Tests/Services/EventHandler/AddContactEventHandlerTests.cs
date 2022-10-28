namespace CRM.Letstalk.Core.Tests.Services.EventHandler
{
    using System;
    using System.Threading.Tasks;
    using CRM.Letstalk.Client.Configurations;
    using CRM.Letstalk.Client.Services.Interfaces;
    using CRM.Letstalk.Core.Constants;
    using CRM.Letstalk.Core.Models;
    using CRM.Letstalk.Core.Services.EventHandler;
    using NSubstitute;
    using Xunit;

    public class AddContactEventHandlerTests
    {
        private readonly AddContactEventHandler addContactEventHandler;
        private readonly ILetstalkService letstalkService;

        public AddContactEventHandlerTests()
        {
            var func = Substitute.For<Func<int, ILetstalkService>>();
            letstalkService = Substitute.For<ILetstalkService>();
            func(Arg.Any<int>()).Returns(letstalkService);
            addContactEventHandler = new AddContactEventHandler(func);
        }
    }
}