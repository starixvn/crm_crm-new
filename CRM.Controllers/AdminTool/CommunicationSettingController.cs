namespace CRM.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Models.AdminTool.CommunicationToolSetting;
    using CRM.Services;
    using CRM.Services.Customer;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Client.Helpers.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.DefaultCommunicationSetting, Policy = Policy.Read)]
    public class CommunicationSettingController : BaseController
    {
        private readonly ISettingService settingService;
        private readonly ICommunicationToolSettingService communicationToolService;
        private readonly ICustomerService customerService;

        public CommunicationSettingController(
            ISettingService settingService,
            ICommunicationToolSettingService communicationToolService,
            ICustomerService customerService)
        {
            this.settingService = settingService;
            this.communicationToolService = communicationToolService;
            this.customerService = customerService;
        }

        public async Task<IActionResult> GetAllSettings()
        {
            var settings = new
            {
                CommunicationTools = await settingService.GetCommunicationToolAsync(SettingConstants.Active),
                MainCategories = await settingService.GetMainCategoryAsync(SettingConstants.Active),
                SubCategories = await settingService.GetSubCategoryAsync(active: SettingConstants.Active)
            };

            return Json(settings);
        }

        [HttpPost]
        public async Task<IActionResult> GetCommunicationToolSetting([FromBody] GetGridDataParam param)
        {
            IEnumerable<CommunicationToolSetting> communications = await communicationToolService.GetAllAsync(param);
            return Json(new { totalItems = param.TotalRows, data = communications });
        }

        public async Task<IActionResult> GetById(int id)
        {
            CommunicationToolSetting communications = await communicationToolService.GetByIdAsync(id);
            if (communications == null)
            {
                return NotFound();
            }
            return Json(communications);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.DefaultCommunicationSetting, Policy = Policy.Host)]
        public async Task<IActionResult> Create([FromBody] CreateCommunicationToolSetting model)
        {
            CommandResult commandResult = await communicationToolService.CreateAsync(model);
            return Json(commandResult);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.DefaultCommunicationSetting, Policy = Policy.Host)]
        public async Task<IActionResult> Edit([FromBody] EditCommunicationToolSetting model)
        {
            bool isHavePermissionEdit = await IsHavePermissionHostOnCustomer(model.DefaultCommId);
            if (!isHavePermissionEdit)
            {
                return Json(new CommandResult { Code = 1, Message = "No Permission" });
            }
            CommandResult commandResult = await communicationToolService.EditAsync(model);
            return Json(commandResult);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.DefaultCommunicationSetting, Policy = Policy.Host)]
        public async Task<IActionResult> Delete(int id)
        {
            bool isHavePermissionDelete = await IsHavePermissionHostOnCustomer(id);
            if (!isHavePermissionDelete)
            {
                return Json(new CommandResult { Code = 1, Message = "No Permission" });
            }
            CommandResult commandResult = await communicationToolService.DeleteAsync(id);
            return Json(commandResult);
        }

        private async Task<bool> IsHavePermissionHostOnCustomer(int defaultCommunicationId)
        {
            bool isHost = false;
            CommunicationToolSetting communications = await communicationToolService.GetByIdAsync(defaultCommunicationId);
            if (communications is not null)
            {
                string username = communications.Username;
                var cust = await customerService.GetCustomerInfoAsync(new Criteria.Customer.GetCustomerInfoByUsernameCriteria { SearchInfo = username, IsCheckPermission = false });
                cust ??= await customerService.GetCustomerInfoAsync(new Criteria.Customer.GetCustomerInfoByUsernameCriteria { SearchInfo = username, IsCheckPermission = false, IsGuest = true });

                if (cust is not null)
                {
                    isHost = await customerService.HasHostPermissionOnCustIdAsync(cust.CustId);
                }
            }
            return isHost;
        }
    }
}