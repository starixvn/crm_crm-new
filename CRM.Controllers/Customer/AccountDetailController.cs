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
        private readonly IPermissionService permissionService;

        public AccountDetailController(
            INapSession napSession,
            ICustomerService customerService,
            ISettingService settingService,
            IBaseService baseService,
            IPermissionService permissionService)
        {
            this.napSession = napSession;
            this.customerService = customerService;
            this.settingService = settingService;
            this.baseService = baseService;
            this.permissionService = permissionService;
        }

        [HttpPost]
        public async Task<IActionResult> GetCustomerById([FromBody] GetCustomerInfoDetailByIdCriteria criteria)
        {
            var customerInfo = await customerService.GetCustomerByIdAsync(criteria);
            var customerPermissionInfo = await customerService.GetSiteTypeByCustIdAsync(customerInfo.CustId);
            customerInfo.SitePermission = customerPermissionInfo.SitePermission;
            customerInfo.CustomerType = customerPermissionInfo.CustomerType;

            return Json(customerInfo);
        }

        public async Task<IActionResult> GetAllSettings()
        {
            short licenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();

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
        public async Task<IActionResult> EditCustomerInfoDetail([FromBody] EditCustomerInfoDetailCommand command)
        {
            var result = new CommandResult();
            bool canEdit = await customerService.HasHostPermissionOnCustIdAsync(command.CustomerId);
            if (canEdit)
            {
                command.UserId = napSession.UserId;
                command.IP = ClientIP;
                command.IsUpdateHeadlineInfo = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Headlineinfo, Policy.Host);
                result = await baseService.ExecuteNonQueryAsync(command);
            }
            else
            {
                result.Message = ViewResources.NoPermission;
            }

            return Json(result);
        }

        public async Task<IActionResult> GetRolesByPic(int id)
        {
            var roles = await settingService.GetRolesByPicAsync(id);
            return Json(roles);
        }

        public async Task<IActionResult> GetSettingStaffAndAuthority()
        {
            var staffAndAuthority = await settingService.GetSettingAsync(SettingName.StaffAndAuthority, true);
            return Json(staffAndAuthority);
        }

        public async Task<IActionResult> GetSettingPicRole()
        {
            var settings = await settingService.GetSettingAsync(SettingName.PicRole, true);
            return Json(settings);
        }

        public async Task<IActionResult> GetSettingPicCommunicationTools()
        {
            var settings = await settingService.GetSettingAsync(SettingName.PicCommunicationTool, true);
            return Json(settings);
        }

        [HttpPost]
        [CrmMultiplePermission(FunctionKey = FunctionKey.Headlineinfo, Policy = Policy.Host)]
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
        [CrmMultiplePermission(FunctionKey = FunctionKey.Headlineinfo, Policy = Policy.Host)]
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

        [CrmMultiplePermission(FunctionKey = FunctionKey.Headlineinfo, Policy = Policy.Read)]
        public async Task<IActionResult> GetHeadlineCompanyService([FromBody] GetHeadlineCompanyServiceCriteria criteria)
        {
            var result = await customerService.GetHeadlineCompanyServiceAsync(criteria);
            return Json(result);
        }

        [CrmMultiplePermission(FunctionKey = FunctionKey.Headlineinfo, Policy = Policy.Read)]
        public async Task<IActionResult> GetHeadlineStaffsAndAuthority([FromBody] GetHeadlineStaffAndAuthorityCriteria criteria)
        {
            _ = await customerService.SyncHeadlineStaffsAndAuthorityAsync(new SyncHeadlineStaffAndAuthorityCriteria
            {
                UserID = napSession.UserId,
                IP = ClientIP
            });
            var result = await customerService.GetHeadlineStaffsAndAuthorityAsync(criteria);
            return Json(result);
        }

        [HttpPost]
        [CrmMultiplePermission(FunctionKey = FunctionKey.Headlineinfo, Policy = Policy.Host)]
        public async Task<IActionResult> EditHeadlineStaffsAndAuthority([FromBody] UpdateHeadlineStaffAndAuthorityCommand command)
        {
            command.UserID = napSession.UserId;
            command.IP = ClientIP;
            var result = await customerService.EditHeadlineStaffsAndAuthorityAsync(command);
            return Json(result);
        }

        [HttpPost]
        [CrmMultiplePermission(FunctionKey = FunctionKey.Headlineinfo, Policy = Policy.Host)]
        public async Task<IActionResult> EditHeadlineCompanyService([FromBody] UpdateHeadlineCompanyServiceCommand command)
        {
            command.UserID = napSession.UserId;
            command.IP = ClientIP;
            var result = await customerService.EditHeadlineCompanyServiceAsync(command);                     
            return Json(result);
        }

        [HttpPost]
        public async Task<IActionResult> EditOtherAccCommunicationInfo([FromBody] UpdateOtherAccCommunicationInfoCommand command)
        {
            command.UserID = napSession.UserId;
            command.IP = ClientIP;
            var result = await customerService.EditOtherAccCommunicationInfoAsync(command);
            return Json(result);
        }

        [HttpPost]
        public async Task<IActionResult> CheckCustomerExistsOnCRM([FromBody] CheckCustomerExistsOnCrmCriteria criteria)
        {
            var result = await baseService.GetDataEntityAsync<int>(criteria);
            return Json(result);
        }
    }
}