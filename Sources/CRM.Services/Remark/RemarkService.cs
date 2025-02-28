namespace CRM.Services.Remark;

using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using CRM.Criteria.NewRemark;
using CRM.Criteria.Remark;
using CRM.Models.Customer;
using CRM.Models.Remark;
using CRM.Models.RemarkNew;
using Models;

public interface IRemarkService
{
    Task<RemarkInfo> GetRemarkAsync(GetRemarkCriteria criteria);

    Task<CommandResult> EditRemarkAsync(EditRemarkCommand command);

    Task<ValueTuple<IEnumerable<RemarkNewInfo>, IEnumerable<RemarkDateFilter>>> GetNewRemarkAsync(GetNewRemarkCriteria criteria);

    Task<IEnumerable<PicInfo>> GetRelatedPicByCustIdAsync(GetRelatedPicsCriteria criteria);

    Task<IEnumerable<RelatedCustomerPermission>> ValidateUsernameAsyn(CustomerRemarkNewCheckCriteria command);

    Task<IEnumerable<RemarkNewHistory>> GetCustomerNewRemarkHistoryAsync(GetCustomerRemarkNewHistoryCriteria criteria);

    Task<IEnumerable<RemarkNewInfo>> GetLastFiveRemarkAsync(GetLastFiveRemarksCriteria criteria);

    Task<CommandResult> CreateNewAsync(CreateNewReamarkCommand command);

    Task<CommandResult> EditNewAsync(EditNewRemarkCommand command);

    Task<CommandResult> DeleteNewAsync(DeleteNewRemarkCommand command);
}

public class RemarkService(IBaseService baseService) : IRemarkService
{
    public async Task<RemarkInfo> GetRemarkAsync(GetRemarkCriteria criteria)
    {
        var remarks = await baseService.GetDataAsync<RemarkRaw>(criteria);
        var normalRemarks = new List<string>();
        var specialRemarks = new List<string>();

        foreach (var remark in remarks)
        {
            var tempRemark = remark.Remark;
            var newLine = new[] { "\n", "\r", "\n\r", "\r\n" };
            for (var index = 0; index < newLine.Length; index++)
            {
                tempRemark = tempRemark.Replace(newLine[index], "<br/>");
            }
            if (remark.IsSpecial)
            {
                specialRemarks.Add(tempRemark);
            }
            else
            {
                normalRemarks.Add(tempRemark);
            }
        }

        var remarkInfo =  new RemarkInfo { SpecialRemarks = specialRemarks, NormalRemarks = normalRemarks };
        return remarkInfo;
    }

    public async Task<CommandResult> EditRemarkAsync(EditRemarkCommand command)
    {
        var xmlContent = new StringBuilder(1024);
        xmlContent.Append("<Remarks>");
        if (command.SpecialRemarks != null)
        {
            BuildRemarksXml(xmlContent, command.SpecialRemarks, true);
        }

        if (command.NormalRemarks != null)
        {
            BuildRemarksXml(xmlContent, command.NormalRemarks, false);
        }

        xmlContent.Append("</Remarks>");
        command.Remarks = xmlContent.ToString();

        return await baseService.ExecuteNonQueryAsync(command);
    }

    public static void BuildRemarksXml(StringBuilder xmlContent, IEnumerable<string> remarks, bool isSpecial)
    {
        var isSpecialText = isSpecial ? " IsSpecial=\"1\" />" : " IsSpecial=\"0\" />";
        foreach (var remark in remarks)
        {
            if (!string.IsNullOrWhiteSpace(remark))
            {
                xmlContent.Append("<Remark Content=\"").Append(HttpUtility.HtmlEncode(remark)).Append("\"")
                    .Append(isSpecialText);
            }
        }
    }

    public async Task<ValueTuple<IEnumerable<RemarkNewInfo>, IEnumerable<RemarkDateFilter>>> GetNewRemarkAsync(GetNewRemarkCriteria criteria)
    {
        var newRemarks = await baseService.FetchMultipleAsync<RemarkNewInfo, RemarkDateFilter>(criteria);
        return newRemarks;
    }

    public async Task<IEnumerable<PicInfo>> GetRelatedPicByCustIdAsync(GetRelatedPicsCriteria criteria)
    {
        var relatedPics = await baseService.GetDataAsync<PicInfo>(criteria);
        return relatedPics;
    }

    public async Task<IEnumerable<RelatedCustomerPermission>> ValidateUsernameAsyn(CustomerRemarkNewCheckCriteria command)
    {
        return await baseService.GetDataAsync<RelatedCustomerPermission>(command);
    }

    public async Task<IEnumerable<RemarkNewHistory>> GetCustomerNewRemarkHistoryAsync(GetCustomerRemarkNewHistoryCriteria criteria)
    {
        return await baseService.GetDataAsync<RemarkNewHistory>(criteria);
    }

    public async Task<IEnumerable<RemarkNewInfo>> GetLastFiveRemarkAsync(GetLastFiveRemarksCriteria criteria)
    {
        return await baseService.GetDataAsync<RemarkNewInfo>(criteria);
    }

    public async Task<CommandResult> CreateNewAsync(CreateNewReamarkCommand command)
    {
        var commandResult = await baseService.ExecuteNonQueryAsync(command);
        return commandResult;
    }

    public async Task<CommandResult> EditNewAsync(EditNewRemarkCommand command)
    {
        var commandResult = await baseService.ExecuteNonQueryAsync(command);
        return commandResult;
    }

    public async Task<CommandResult> DeleteNewAsync(DeleteNewRemarkCommand command)
    {
        var commandResult = await baseService.ExecuteNonQueryAsync(command);
        return commandResult;
    }
}