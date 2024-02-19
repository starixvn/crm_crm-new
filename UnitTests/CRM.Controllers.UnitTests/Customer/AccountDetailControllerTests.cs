namespace CRM.Controllers.UnitTests.Customer
{
    using Criteria.Customer;
    using System.Net;
    using AutoFixture;
    using CRM.Core.Enumerables;
    using System.Threading.Tasks;
    using CRM.Core.Services;
    using CRM.Models.Customer;
    using CRM.Services;
    using CRM.Services.Customer;
    using Fanex.NAP.Client.Helpers.Web;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using NSubstitute;
    using Xunit;

    public class AccountDetailControllerTest : BaseController
    {
        private INapSession napSession;
        private ICustomerService customerService;
        private ISettingService settingService;
        private IBaseService baseService;
        private ICRMLogService logService;
        private IPermissionService permissionService;


        #region Helpers

        private AccountDetailController GetController()
        {
            customerService = Substitute.For<ICustomerService>();
            settingService = Substitute.For<ISettingService>();
            napSession = Substitute.For<INapSession>();
            baseService = Substitute.For<IBaseService>();
            logService = Substitute.For<ICRMLogService>();
            permissionService = Substitute.For<IPermissionService>();
            var controller = new AccountDetailController(napSession, customerService, settingService, baseService, logService, permissionService);
            controller.ControllerContext.HttpContext = new DefaultHttpContext
            {
                Connection =
                {
                    RemoteIpAddress = new IPAddress(1)
                }
            };
            return controller;
        }

        #endregion Helpers
    }
}