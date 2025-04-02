namespace CRM.Services.Customer;

using Constants;
using CRM.Criteria.Customer;
using CRM.Criteria.PicAndHeadline;
using CRM.Models.Customer;
using Enumerables;
using Fanex.NAP.Client.Helpers.Business;
using Interfaces;
using Microsoft.Extensions.Configuration;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Constants = Constants.Constants;

public interface ICustomerService
{
    Task<CustomerInfoDetails> GetCustomerInfoAsync(GetCustomerInfoByUsernameCriteria criteria);

    Task<CommandResult> UpdateCustomerInfoAsync(UpdateCustomerInfoCommand command);

    Task<CommandResult> UpdateCustomerSuggestionAsync(UpdateCustomerSuggestionCriteria criteria);

    Task<IEnumerable<string>> GetCustomerAutoSuggestionAsync(CustomerSuggestionCriteria criteria);

    Task<CustomerInfoDetails> GetCustomerByIdAsync(GetCustomerInfoDetailByIdCriteria criteria);

    Task<IEnumerable<UserInfo>> GetAllCustomerAsync(GetAllCustomersCriteria criteria);

    Task<CustomerPermissionInfo> GetSiteTypeByCustIdAsync(int custId);

    Task<bool> HasHostPermissionOnCustIdAsync(int custId);

    Task<string> ValidateEditPicAsync(ValidateEditPicCriteria criteria);

    Task<IEnumerable<PicValidationInfo>> ValidateEditNewPicAsync(ValidateEditNewPicCriteria criteria);

    Task<CommandResult> EditPicAsync(EditPicCriteria criteria);

    Task<Tuple<IEnumerable<HeadlineCompanyService>, IEnumerable<HeadlineAccountCommunicationInfo>>> GetHeadlineCompanyServiceAsync(GetHeadlineCompanyServiceCriteria criteria);

    Task<IEnumerable<HeadlineStaffsAndAuthority>> GetHeadlineStaffsAndAuthorityAsync(GetHeadlineStaffAndAuthorityCriteria criteria);

    Task<CommandResult> SyncHeadlineStaffsAndAuthorityAsync(SyncHeadlineStaffAndAuthorityCriteria criteria);

    Task<CommandResult> EditHeadlineCompanyServiceAsync(UpdateHeadlineCompanyServiceCommand criteria);

    Task<CommandResult> EditOtherAccCommunicationInfoAsync(UpdateOtherAccCommunicationInfoCommand criteria);

    Task<CommandResult> EditHeadlineStaffsAndAuthorityAsync(UpdateHeadlineStaffAndAuthorityCommand criteria);
}

public class CustomerService(
    IBaseService baseService,
    ISettingService settingService,
    IPermissionService permissionService,
    IConfiguration configuration)
    : ICustomerService
{
    private readonly string Environment = string.IsNullOrEmpty(configuration.GetValue<string>("SiteEnvironment")) ?
        Constants.DefaultEnvironment : configuration.GetValue<string>("SiteEnvironment");

    public async Task<CommandResult> EditPicAsync(EditPicCriteria criteria)
    {
        return await baseService.ExecuteNonQueryAsync(criteria);
    }

    public async Task<CommandResult> EditHeadlineCompanyServiceAsync(UpdateHeadlineCompanyServiceCommand criteria)
    {
        return await baseService.ExecuteNonQueryAsync(criteria);
    }

    public async Task<CommandResult> EditOtherAccCommunicationInfoAsync(UpdateOtherAccCommunicationInfoCommand criteria)
    {
        return await baseService.ExecuteNonQueryAsync(criteria);
    }

    public async Task<CommandResult> EditHeadlineStaffsAndAuthorityAsync(UpdateHeadlineStaffAndAuthorityCommand criteria)
    {
        return await baseService.ExecuteNonQueryAsync(criteria);
    }

    public async Task<CommandResult> SyncHeadlineStaffsAndAuthorityAsync(SyncHeadlineStaffAndAuthorityCriteria criteria)
    {
        return await baseService.ExecuteNonQueryAsync(criteria);
    }

    public async Task<string> ValidateEditPicAsync(ValidateEditPicCriteria criteria)
    {
        return await baseService.GetDataEntityAsync<string>(criteria);
    }

    public async Task<IEnumerable<PicValidationInfo>> ValidateEditNewPicAsync(ValidateEditNewPicCriteria criteria)
    {
        return await baseService.GetDataAsync<PicValidationInfo>(criteria);
    }

    public async Task<CustomerInfoDetails> GetCustomerInfoAsync(GetCustomerInfoByUsernameCriteria criteria)
    {
        var (customers, languageIds) = await baseService.FetchMultipleAsync<CustomerInfoDetails, int>(criteria);
        CustomerInfoDetails customerInfo = null;
        if (customers.Any())
        {
            customerInfo = customers.First();
            customerInfo.RoleName = RoleSettingService.GetRoleName(customerInfo.RoleId);
            customerInfo.Languages = languageIds.ToList();
            customerInfo.LanguageIds = string.Join(",", languageIds);

            var site = await settingService.GetSiteByIdAsync(customerInfo.SiteId);
            customerInfo.SiteSetting = new BaseSetting
            {
                Id = site.Id,
                Name = site.Name
            };

            if (!criteria.IsGuest)
            {
                customerInfo.UplineInfo = await GetUplineInfoAsync(customerInfo.CustId);
            }

            if (customerInfo.IsGroupHeadLine)
            {
                (customerInfo.HeadlineStaffInfoPics,
                    customerInfo.HeadlineStaffInfoLanguages,
                    customerInfo.HeadlineStaffInfoCommunications) = await baseService.FetchMultipleAsync<HeadlineStaffInfoPic,
                    HeadlineStaffInfoLanguage, HeadlineStaffInfoCommunication>(new GetHeadlineStaffInfoCriteria { HeadlineID = customerInfo.CustId });
            }
            else
            {
                customerInfo.OtherAccountCommunicationInfos = await baseService.GetDataAsync<OtherAccountCommunicationInfo>(
                    new GetOtherAccountCommunicationInfoCriteria { CustomerId = customerInfo.CustId });
            }
        }

        return customerInfo;
    }

    protected internal virtual async Task<IEnumerable<CustomerInfoDetails>> GetUplineInfoAsync(int custId)
    {
        var criteria = new GetUplineInfoOfUserCriteria { CustId = custId };
        var uplineInfos = new List<CustomerInfoDetails>();
        var customers = (await baseService.GetDataAsync<CustomerInfoDetails>(criteria)).OrderByDescending(x => x.RoleId);
        foreach (var item in customers)
        {
            if (criteria.CustId == item.CustId || item.RoleId == RoleIdConstants.Headline)
            {
                continue;
            }

            item.RoleName = RoleSettingService.GetRoleName(item.RoleId);
            uplineInfos.Add(item);
        }

        var headline = customers.Where(i => i.RoleId == RoleIdConstants.Headline)
            .Select(i =>
            {
                i.RoleName = RoleSettingService.GetRoleName(i.RoleId);
                return i;
            }).FirstOrDefault() ?? GetUnAssignedCustomerInfo();

        uplineInfos.Insert(0, headline);

        return uplineInfos;
    }

    public async Task<CommandResult> UpdateCustomerInfoAsync(UpdateCustomerInfoCommand command)
        => await baseService.ExecuteNonQueryAsync(command);

    public async Task<CommandResult> UpdateCustomerSuggestionAsync(UpdateCustomerSuggestionCriteria criteria)
        => await baseService.ExecuteNonQueryAsync(criteria);

    public async Task<IEnumerable<string>> GetCustomerAutoSuggestionAsync(CustomerSuggestionCriteria criteria)
        => await baseService.GetDataAsync<string>(criteria);

    private static CustomerInfoDetails GetUnAssignedCustomerInfo()
        => new()
        {
            Username = "Unassigned",
            IsActive = false,
            IsClosed = false,
            IsSuspended = false,
            RoleId = RoleIdConstants.Headline,
            RoleName = RoleSettingService.GetRoleName(RoleIdConstants.Headline)
        };

    public async Task<CustomerInfoDetails> GetCustomerByIdAsync(GetCustomerInfoDetailByIdCriteria criteria)
    {
        var (customer, languages) = await baseService.FetchMultipleAsync<CustomerInfoDetails, CustomerLanguageInfo>(criteria);
        var listLanguages = new List<int>();
        CustomerInfoDetails customerInfo = null;
        if (customer.Any())
        {
            customerInfo = customer.First();

            var site = await settingService.GetSiteByIdAsync(customerInfo.SiteId);
            foreach (var item in languages)
            {
                listLanguages.Add(item.LanguageId);
            }
            customerInfo.Languages = listLanguages;
            customerInfo.LanguageIds = string.Join(",", listLanguages);
            customerInfo.SiteSetting = new BaseSetting
            {
                Id = site.Id,
                Name = site.Name
            };
            customerInfo.IsDirectAccount = await CheckDirectAccount(customerInfo.CustId);
            if (customerInfo.IsGroupHeadLine)
            {
                (customerInfo.HeadlineStaffInfoPics,
                    customerInfo.HeadlineStaffInfoLanguages,
                    customerInfo.HeadlineStaffInfoCommunications) = await baseService.FetchMultipleAsync<HeadlineStaffInfoPic,
                    HeadlineStaffInfoLanguage, HeadlineStaffInfoCommunication>(new GetHeadlineStaffInfoCriteria { HeadlineID = customerInfo.CustId });
            }
            else
            {
                customerInfo.OtherAccountCommunicationInfos = await baseService.GetDataAsync<OtherAccountCommunicationInfo>(
                    new GetOtherAccountCommunicationInfoCriteria { CustomerId = customerInfo.CustId });
            }
        }

        return customerInfo;
    }

    public async Task<IEnumerable<UserInfo>> GetAllCustomerAsync(GetAllCustomersCriteria criteria)
    {
        criteria.Environment = Environment;
        return await baseService.GetDataAsync<UserInfo>(criteria);
    }

    public async Task<Tuple<IEnumerable<HeadlineCompanyService>, IEnumerable<HeadlineAccountCommunicationInfo>>>
        GetHeadlineCompanyServiceAsync(GetHeadlineCompanyServiceCriteria criteria)
    {
        var result = await baseService.FetchMultipleAsync<HeadlineCompanyService, HeadlineAccountCommunicationInfo>(criteria);
        return Tuple.Create(result.Item1, result.Item2);
    }

    public async Task<IEnumerable<HeadlineStaffsAndAuthority>> GetHeadlineStaffsAndAuthorityAsync(GetHeadlineStaffAndAuthorityCriteria criteria)
    {
        var result = await baseService.GetDataAsync<HeadlineStaffsAndAuthority>(criteria);
        return result;
    }

    private async Task<bool> CheckDirectAccount(int customerId)
    {
        var criteria = new CheckDirectAccountCriteria
        {
            CustomerId = customerId
        };

        return await baseService.GetDataEntityAsync<bool>(criteria);
    }

    public async Task<CustomerPermissionInfo> GetSiteTypeByCustIdAsync(int custId)
    {
        var criteria = new GetSiteTypeByCustIdCriteria { CustId = custId };
        var custPermissionInfo = await baseService.GetDataEntityAsync<CustomerPermissionInfo>(criteria);

        if (criteria.ErrCode == 0)
        {
            return custPermissionInfo;
        }
        return null;
    }

    public async Task<bool> HasHostPermissionOnCustIdAsync(int custId)
    {
        var isHostOnCustId = false;

        var isReadCredit = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Credit);
        var isReadLicensee = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Licensee);
        var isHostOnCustomerInfo = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.CustomerInfo, Constant.Policy.Host);

        if (custId < 0)
        {
            return isHostOnCustomerInfo;
        }

        var custPermissionInfo = await GetSiteTypeByCustIdAsync(custId);

        if (custPermissionInfo is not null && isHostOnCustomerInfo)
        {
            if (custPermissionInfo.CustomerType == SiteType.NA)
            {
                isHostOnCustId = isReadCredit || isReadLicensee;
            }

            if (custPermissionInfo.CustomerType == SiteType.Licensee)
            {
                isHostOnCustId = isReadLicensee;
            }

            if (custPermissionInfo.CustomerType == SiteType.Credit)
            {
                var isHostOnCreditSiteLabel = !string.IsNullOrWhiteSpace(custPermissionInfo.SitePermission)
                                              && await permissionService.IsHavingPermissionByPolicyAsync(custPermissionInfo.SitePermission);
                isHostOnCustId = isHostOnCreditSiteLabel;
            }
        }
        return isHostOnCustId;
    }
}