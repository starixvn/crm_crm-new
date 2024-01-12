namespace CRM.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.Customer;
    using CRM.Criteria.PicAndHeadline;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.Customer;
    using CRM.ViewModels.Customer;
    using Fanex.Data.Repository;
    using Fanex.Logging.Extensions;
    using Fanex.NAP.Client.Helpers.Web;
    using Microsoft.AspNetCore.Mvc;
    using Newtonsoft.Json;
    using static Fanex.NAP.Core.Business.Constant;

    [CrmMultiplePermission(FunctionKey = FunctionKey.Credit, Policy = Policy.Read)]
    [CrmMultiplePermission(FunctionKey = FunctionKey.Licensee, Policy = Policy.Read)]
    public class AccountDetailController : BaseController
    {
        private readonly INapSession napSession;
        private readonly ICustomerService customerService;
        private readonly ISettingService settingService;
        private readonly IBaseService baseService;
        private readonly ICRMLogService logService;
        private readonly IPermissionService permissionService;

        public AccountDetailController(
            INapSession napSession,
            ICustomerService customerService,
            ISettingService settingService,
            IBaseService baseService,
            ICRMLogService logService,
            IPermissionService permissionService)
        {
            this.napSession = napSession;
            this.customerService = customerService;
            this.settingService = settingService;
            this.baseService = baseService;
            this.logService = logService;
            this.permissionService = permissionService;
        }

        [HttpPost]
        public async Task<IActionResult> GetCustomerById([FromBody] GetCustomerInfoDetailByIdCriteria criteria)
        {
            var customerInfo = await customerService.GetCustomerByIdAsync(criteria);
            customerInfo.CustomerType = await customerService.GetSiteTypeByCustIdAsync(customerInfo.CustId);
            var logMessage = new LogMessage("Get Customer Feedback Info:")
                       .AddMessage(JsonConvert.SerializeObject(customerInfo, Formatting.Indented))
                       .ToString();

            logService.LogInformation(logMessage);
            return Json(customerInfo);
        }

        public async Task<IActionResult> GetAllSettings()
        {
            short licenseeType = await permissionService.GetSitePermissionAsync();

            var allSettings = new CreateCustomerInfoViewModel
            {
                Countries = await settingService.GetCountryAsync(SettingConstants.Active, true),
                Languages = await settingService.GetLanguageAsync(SettingConstants.Active),
                LicenseeTypes = await settingService.GetLicenseeTypeAsync(),
                Sites = await settingService.GetAllSitesWithGroupAsync(licenseeType: licenseeType),
                Titles = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Title, SettingConstants.Active)
            };
            return Json(allSettings);
        }

        [HttpPost]
        [CrmMultiplePermission(FunctionKey = FunctionKey.Credit, Policy = Policy.Host)]
        [CrmMultiplePermission(FunctionKey = FunctionKey.Licensee, Policy = Policy.Host)]
        public async Task<IActionResult> EditCustomerInfoDetail([FromBody] EditCustomerInfoDetailCommand command)
        {
            var result = new CommandResult();
            bool isHostCredit = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Credit, Policy.Host);
            bool isHostLicensee = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Licensee, Policy.Host);
            bool canEdit = await customerService.HasHostPermissionOnCustIdAsync(isHostCredit, isHostLicensee, command.CustomerId);
            if (canEdit)
            {
                command.UserId = napSession.UserId;
                command.IP = ClientIP;
                command.IsUpdateHeadlineInfo = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Updateheadlineinfo, Policy.Host);
                result = await baseService.ExecuteNonQueryAsync(command);
            }
            else
            {
                result.Message = ViewResources.NoPermission;
            }

            return Json(result);
        }

        public async Task<IActionResult> GetRolesByPic( int id)
        {
            var roles = await settingService.GetRolesByPicAsync(id);
            return Json(roles);
        }

        public async Task<IActionResult> GetPicCommunicationTools()
        {
            var communicationTools = await settingService.GetSettingAsync(SettingName.PicCommunicationTool, true);
            return Json(communicationTools);
        }

        [HttpPost]
        [CrmMultiplePermission(FunctionKey = FunctionKey.Credit, Policy = Policy.Host)]
        [CrmMultiplePermission(FunctionKey = FunctionKey.Licensee, Policy = Policy.Host)]
        public async Task<IActionResult> EditPic([FromBody] IList<EditPicCriteria> criterias)
        {
            var commandResultList = new List<CommandResult>();
            foreach (var criteria in criterias)
            {
                criteria.UserId = napSession.UserId;
                criteria.LoginIP = ClientIP;
                var commandResult = await customerService.EditPicAsync(criteria);
                commandResultList.Add(commandResult);
            }
            return Json(commandResultList);
        }

        [HttpPost]
        [CrmMultiplePermission(FunctionKey = FunctionKey.Credit, Policy = Policy.Host)]
        [CrmMultiplePermission(FunctionKey = FunctionKey.Licensee, Policy = Policy.Host)]
        public async Task<IActionResult> ValidateEditPic([FromBody] IList<ValidateEditPicCriteria> criterias)
        {
            var resultlList = new List<string>();
            foreach (var criteria in criterias)
            {
                var result = await customerService.ValidateEditPicAsync(criteria);
                resultlList.Add(result);
            }
            return Json(resultlList);
        }

        public async Task<IActionResult> GetHeadlineCompanyService([FromBody] GetHeadlineCompanyServiceCriteria criteria)
        {
            var result = await customerService.GetHeadlineCompanyServiceAsync(criteria);
            return Json(result);
        }

        public async Task<IActionResult> GetHeadlineStaffsAndAuthority([FromBody] GetHeadlineStaffsAndAuthorityCriteria criteria)
        {
            await customerService.SyncHeadlineStaffsAndAuthorityAsync(new SyncHeadlineStaffsAndAuthorityCriteria()
            {
                UserID = napSession.UserId,
                IP = ClientIP
            });
            var result = await customerService.GetHeadlineStaffsAndAuthorityAsync(criteria);
            return Json(result);
        }

        [HttpPost]
        [CrmMultiplePermission(FunctionKey = FunctionKey.Credit, Policy = Policy.Host)]
        [CrmMultiplePermission(FunctionKey = FunctionKey.Licensee, Policy = Policy.Host)]
        public async Task<IActionResult> EditHeadlineStaffsAndAuthority([FromBody] UpdateHeadlineStaffsAndAuthorityCommand command)
        {
            command.UserID = napSession.UserId;
            command.IP = ClientIP;
            var result = await customerService.EditHeadlineStaffsAndAuthorityAsync(command);
            return Json(result);
        }

        [HttpPost]
        [CrmMultiplePermission(FunctionKey = FunctionKey.Credit, Policy = Policy.Host)]
        [CrmMultiplePermission(FunctionKey = FunctionKey.Licensee, Policy = Policy.Host)]
        public async Task<IActionResult> EditHeadlineCompanyService([FromBody] UpdateHeadlineCompanyServiceCommand command)
        {
            command.UserID = napSession.UserId;
            command.IP = ClientIP;
            var result = await customerService.EditHeadlineCompanyServiceAsync(command);                     
            return Json(result);
        }

        [HttpPost]
        [CrmMultiplePermission(FunctionKey = FunctionKey.Credit, Policy = Policy.Host)]
        [CrmMultiplePermission(FunctionKey = FunctionKey.Licensee, Policy = Policy.Host)]
        public async Task<IActionResult> EditOtherAccCommunicationInfo([FromBody] UpdateOtherAccCommunicationInfoCommand command)
        {
            command.UserID = napSession.UserId;
            command.IP = ClientIP;
            var result = await customerService.EditOtherAccCommunicationInfoAsync(command);
            return Json(result);
        }
    }
}