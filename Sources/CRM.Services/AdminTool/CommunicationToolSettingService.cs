namespace CRM.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.AdminTool.CommunicationToolSetting;
    using CRM.Criteria.CommunicationToolSetting;
    using CRM.Models.AdminTool.CommunicationToolSetting;
    using Fanex.NAP.Client.Helpers.Web;

    public interface ICommunicationToolSettingService
    {
        Task<IEnumerable<CommunicationToolSetting>> GetAllAsync(GetGridDataParam param);

        Task<CommunicationToolSetting> GetByIdAsync(int id);

        Task<CommandResult> CreateAsync(CreateCommunicationToolSetting model);

        Task<CommandResult> EditAsync(EditCommunicationToolSetting model);

        Task<CommandResult> DeleteAsync(int id);
    }

    public class CommunicationToolSettingService : ICommunicationToolSettingService
    {
        private readonly INapSession napSession;
        private readonly IBaseService baseService;
        private readonly IPermissionService permissionService;

        public CommunicationToolSettingService(
            INapSession napSession,
            IBaseService baseService,
            IPermissionService permissionService)
        {
            this.napSession = napSession;
            this.baseService = baseService;
            this.permissionService = permissionService;
        }

        public async Task<IEnumerable<CommunicationToolSetting>> GetAllAsync(GetGridDataParam param)
        {
            var criteria = new GetCommunicationToolSettingCriteria
            {
                LicenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync(),
                SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync(),
                Username = param.Username,
                CategoryIds = param.CategoryIds,
                SubCategoryIds = param.SubCategoryIds,
                IsDisableCategorySubCategory = param.IsDisableCategorySubCategory,
                PageIndex = param.PageIndex,
                PageSize = param.PageSize
            };
            var communication = await baseService.GetDataAsync<CommunicationToolSetting>(criteria);
            param.TotalRows = criteria.TotalRows;
            return communication;
        }

        public async Task<CommunicationToolSetting> GetByIdAsync(int id)
        {
            var criteria = new GetCommunicationToolSettingByIdCriteria
            {
                DefaultCommId = id
            };
            return await baseService.GetDataEntityAsync<CommunicationToolSetting>(criteria);
        }

        public async Task<CommandResult> CreateAsync(CreateCommunicationToolSetting model)
        {
            var command = new CreateCommunicationToolSettingCommand
            {
                UserId = napSession.UserId,
                IP = string.Empty,
                CategoryIds = model.CategoryIds,
                SubCategoryIds = model.SubCategoryIds,
                CommunicationIds = model.CommunicationIds,
                Customers = model.Customers
            };
            return await baseService.ExecuteNonQueryAsync(command);
        }

        public async Task<CommandResult> EditAsync(EditCommunicationToolSetting model)
        {
            var command = new EditCommunicationToolSettingCommand
            {
                UserId = napSession.UserId,
                IP = string.Empty,
                DefaultCommId = model.DefaultCommId,
                CategoryIds = model.CategoryIds,
                SubCategoryIds = model.SubCategoryIds,
                CommunicationIds = model.CommunicationIds
            };
            return await baseService.ExecuteNonQueryAsync(command);
        }

        public async Task<CommandResult> DeleteAsync(int id)
        {
            var command = new DeleteCommunicationToolSettingCommand
            {
                UserId = napSession.UserId,
                IP = string.Empty,
                DefaultCommId = id
            };
            return await baseService.ExecuteNonQueryAsync(command);
        }
    }
}