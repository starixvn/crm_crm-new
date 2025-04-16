namespace CRM.Services.Feedback;

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Constants;
using Criteria.Feedback.MultipleLogs;
using CRM.Criteria.Feedback;
using CRM.Criteria.Feedback.DeletedFeedback;
using CRM.Criteria.Feedback.ManageFeedback;
using CRM.Criteria.Report.FeedbackStatistic;
using CRM.Extensions;
using CRM.Models;
using CRM.Models.CommunicationLogs;
using CRM.Models.Customer;
using CRM.Models.Feedback;
using CRM.Models.Feedback.LatestFeedback;
using CRM.Models.Report.DeletedFeedbackStatistic;
using CRM.Models.Report.FeedbackStatistic;
using CRM.Models.Report.FeedbackStatistic.FeedbackRating;
using CRM.Resources;
using Fanex.Data.Repository;
using Interfaces;
using Models.Feedback.DeletedFeedback;

public interface IFeedbackService
{
    Task<CustomerFeedback> GetCustomerFeedbackByIdAsync(int feedbackId);

    Task<IEnumerable<DeletedFeedbackStatistic>> GetDeletedFeedbackStatisticAsync(ICriteria criteria);

    Task<FeedbackStatisticInfo> GetFeedbackStatisticAsync(ICriteria criteria);

    Task<FeedbackRatingReport> GetFeedbackRatingStatisticAsync(ICriteria criteria);

    Task<IEnumerable<FeedbackDeleted>> GetLatestFeedbackAsync(ICriteria criteria);

    Task<IEnumerable<FeedbackDeleted>> GetFeedbackStatisticDetailAsync(GetFeedbackStatisticDetailCriteria criteria);

    Task<CommandResult> EditNoOfInquiryAsync(EditNoOfInquiryCommand command);

    Task<EditNoOfInquiry> GetNoOfInquiryByFeedbackIdAsync(int feedbackId);

    Task<CommandResult> EditCustomerFeedbackAsync(EditCustomerFeedbackCommand command);

    Task<CommandResult> EditCustomerNewManualFeedbackAsync(EditCustomerNewManualFeedbackCommand command);

    Task<IEnumerable<FeedbackDeleted>> GetDeletedFeedbackAsync(GetDeletedFeedbackParam param);

    Task<IEnumerable<FeedbackDeleted>> GetManageFeedbackAsync(ManageFeedbackCriteria criteria);

    Task<CommunicationLog> GetLogByFeedbackIdAsync(int feedbackId);

    Task<int> CheckFeedbackDuplicationAsync(CheckFeedbackDuplicationCriteria criteria);
}

public class FeedbackService(
    IDynamicRepository dynamicRepository,
    IBaseService baseService,
    ISettingService settingService,
    ICommonService commonService)
    : IFeedbackService
{
    public async Task<CustomerFeedback> GetCustomerFeedbackByIdAsync(int feedbackId)
    {
        var checkFeedbackIdIsNewCriteria = new CheckFeedbackIDIsNewCriteria { FeedbackId = feedbackId };
        var isCheckFeedbackIdIsNew = await dynamicRepository.GetAsync<bool>(checkFeedbackIdIsNewCriteria);
        var criteriaNewFeedback = new GetCustomerNewManualFeedbackByIdCriteria { FeedbackId = feedbackId };

        var customerFeedbackModel =
            isCheckFeedbackIdIsNew ? await GetCustomerFeedbackDataByIdAsync(criteriaNewFeedback) :
                await GetCustomerOldFeedbackByIdAsync(feedbackId);

        CustomerFeedback feedback = null;

        if (customerFeedbackModel.CustomerFeedback.Any())
        {
            feedback = customerFeedbackModel.CustomerFeedback.First();
            feedback.FeedbackDate = commonService.ConvertToClientDateTime(feedback.FeedbackDate);
            feedback.ResolutionDate = commonService.ConvertToClientDateTime(feedback.ResolutionDate);
            feedback.SolveDate = commonService.ConvertToClientDateTime(feedback.SolveDate);
            feedback.CreateDate = commonService.ConvertToClientDateTime(feedback.CreateDate);
            feedback.FirstResponseTime = feedback.FirstResponseTime.HasValue ? commonService.ConvertToClientDateTime(feedback.FirstResponseTime.Value) : null;
            feedback.RelatedCustomers = customerFeedbackModel.RelatedCustomerPermission.OrderBy(x => x.Username);
            feedback.Settings = customerFeedbackModel.FeedbackSettingRelation.Where(x => !string.IsNullOrEmpty(x.SettingType)).ToList();
            feedback.LatestFeedbackCommunicationTools = customerFeedbackModel.FeedbackCommunicationTool;
            feedback.IsCheckFeedbackIdIsNew = isCheckFeedbackIdIsNew;

            var siteSetting = await settingService.GetSiteByIdAsync(feedback.SiteId);
            feedback.SiteSetting = new BaseSetting
            {
                Id = siteSetting.Id,
                Name = siteSetting.Name
            };
            feedback.HasRelated = feedback.RelatedCustomers.Any();
        }

        return feedback;
    }

    public async Task<CustomerFeedbackModel> GetCustomerFeedbackDataByIdAsync(ICriteria criteria)
    {
        var (customerFeedback, fbCommunicationTools, fbSettingRelations, relatedCustomerPermission) =
            await baseService.FetchMultipleAsync<CustomerFeedback, LatestFeedbackCommunicationTool,
                FeedbackSettingRelation, RelatedCustomerPermission>(criteria);

        var customerFeedbackModel = new CustomerFeedbackModel
        {
            CustomerFeedback = customerFeedback,
            FeedbackCommunicationTool = fbCommunicationTools,
            FeedbackSettingRelation = fbSettingRelations,
            RelatedCustomerPermission = relatedCustomerPermission
        };

        return customerFeedbackModel;
    }

    public async Task<IEnumerable<DeletedFeedbackStatistic>> GetDeletedFeedbackStatisticAsync(ICriteria criteria)
    {
        var (feedbacks, settings) = await baseService.FetchMultipleAsync<DeletedFeedbackStatistic, FeedbackSettingRelation>(criteria);

        foreach (var feedback in feedbacks)
        {
            feedback.Settings = settings.Where(x => x.FeedbackId == feedback.FeedbackId).ToList();
            feedback.RelatedCustomer = string.IsNullOrEmpty(feedback.RelatedCustomer) ? "" : string.Join(",", feedback.RelatedCustomer.Split(",").OrderBy(x => x));
        }

        return feedbacks;
    }

    public async Task<FeedbackStatisticInfo> GetFeedbackStatisticAsync(ICriteria criteria)
    {
        var dataset = await dynamicRepository.FetchDataSetAsync(criteria);

        return dataset.Tables.Count < 2 ? new FeedbackStatisticInfo() : ReadFeedbackStatistic(dataset.Tables[0], dataset.Tables[1]);
    }

    public async Task<FeedbackRatingReport> GetFeedbackRatingStatisticAsync(ICriteria criteria)
    {
        FeedbackRatingReport reportData = null;
        var dataset = await dynamicRepository.FetchDataSetAsync(criteria);
        if (dataset.Tables.Count > 0)
        {
            using var table1 = dataset.Tables[0];
            using var table2 = dataset.Tables.Count > 1 ? dataset.Tables[1] : null;
            reportData = ReadFeedbackRatingStatistic(table1, table2);
        }
        return reportData;
    }

    private static string GetColumnDataValue(DataRow row, DataColumnCollection columns, int columnIndex)
    {
        var columnDataValue = columns[columnIndex].DataType == typeof(DateTime)
            ? ((DateTime)row[columnIndex]).ToShortDateFormat()
            : row[columnIndex].ToString();

        return columnDataValue;
    }

    private static FeedbackRatingReport ReadFeedbackRatingStatistic(DataTable table1, DataTable table2)
    {
        var feedbackRatingRecords = new List<FeedbackRatingRecord>();
        var dynamicTitles = new List<string>();
        for (var i = 0; i < table1.Columns.Count; i++)
        {
            dynamicTitles.Add(table1.Columns[i].ColumnName);
        }

        foreach (DataRow row in table1.Rows)
        {
            if (!row.IsNull(0))
            {
                var feedbackRatingRecord = new FeedbackRatingRecord
                {
                    ColumnData = new BaseModel { Name = GetColumnDataValue(row, table1.Columns, 0) },
                    Excellent = Convert.ToInt32(row[1]),
                    Good = Convert.ToInt32(row[2]),
                    Neutral = Convert.ToInt32(row[3]),
                    Poor = Convert.ToInt32(row[4]),
                    VeryPoor = Convert.ToInt32(row[5]),
                    NARating = Convert.ToInt32(row[6])
                };

                feedbackRatingRecords.Add(feedbackRatingRecord);
            }
        }

        if (table2 != null)
        {
            var index = 0;
            foreach (DataRow row in table2.Rows)
            {
                feedbackRatingRecords[index++].ColumnData.Id = int.Parse(row["Item"].ToString());
            }
        }

        return new FeedbackRatingReport
        {
            ColumnNames = dynamicTitles,
            Records = feedbackRatingRecords
        };
    }

    private static FeedbackStatisticInfo ReadFeedbackStatistic(DataTable table, DataTable table1)
    {
        var userNames = new List<BaseModel>();
        for (var i = 4; i < table.Columns.Count; i++)
        {
            userNames.Add(new BaseModel { Name = table.Columns[i].ColumnName });
        }

        var userNamesCount = userNames.Count;
        var grandTotals = new int[userNamesCount];
        var report = new FeedbackStatisticInfo
        {
            Usernames = userNames,
            FeedbackCategories = [],
            GrandTotals = grandTotals
        };
        var previousCategory = 0;
        FeedbackCategory feedbackCategory = null;
        foreach (DataRow row in table.Rows)
        {
            var categoryId = int.Parse(row["MainCategoryId"].ToString());
            if (categoryId != previousCategory)
            {
                previousCategory = categoryId;
                feedbackCategory = new FeedbackCategory
                {
                    Id = categoryId,
                    Name = row["MainCategory"].ToString(),
                    FeedbackSubcategories = [],
                    SubTotal = InitializeSubTotal(userNamesCount)
                };

                report.FeedbackCategories.Add(feedbackCategory);
            }

            if (feedbackCategory != null)
            {
                var feedbackSubcategory = new FeedbackSubcategory
                {
                    Id = int.Parse(row["SubCategoryId"].ToString()),
                    Name = row["SubCategory"].ToString(),
                    Resolves = [],
                };

                for (var i = 0; i < userNamesCount; i++)
                {
                    var resolve = int.Parse(row[userNames[i].Name].ToString());
                    feedbackSubcategory.Resolves.Add(resolve);
                    feedbackCategory.SubTotal.Resolves[i] += resolve;
                    grandTotals[i] += resolve;
                }

                feedbackCategory.FeedbackSubcategories.Add(feedbackSubcategory);
            }
        }

        ReadUsernameIds(table1, report);
        return report;
    }

    private static void ReadUsernameIds(DataTable table, FeedbackStatisticInfo report)
    {
        var index = 0;
        foreach (DataRow row in table.Rows)
        {
            report.Usernames[index++].Id = int.Parse(row["Item"].ToString());
        }
    }

    private static FeedbackSubcategory InitializeSubTotal(int length)
    {
        var resolves = Enumerable.Repeat(0, length).ToList();
        return new FeedbackSubcategory { Resolves = resolves };
    }

    public async Task<IEnumerable<FeedbackDeleted>> GetLatestFeedbackAsync(ICriteria criteria)
    {
        var (feedbacks, settings) = await baseService.FetchMultipleAsync<FeedbackDeleted, FeedbackSettingRelation>(criteria);

        foreach (var feedback in feedbacks)
        {
            feedback.Settings = settings.Where(x => x.FeedbackId == feedback.FeedbackId).ToList();
        }

        var statusList = await settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool);
        var statusHash = statusList.ToDictionary(k => k.StatusId, v => v.Name);
        statusHash.Add(1, ViewResources.Symbol_NotApply);

        foreach (var feedback in feedbacks)
        {
            feedback.DurationTime = DurationCalculation(feedback.ResolutionDate, feedback.FeedbackDate);
            feedback.FeedbackDate = commonService.ConvertToClientDateTime(feedback.FeedbackDate);
            feedback.ResolutionDate = commonService.ConvertToClientDateTime(feedback.ResolutionDate);
            feedback.SolveDate = commonService.ConvertToClientDateTime(feedback.SolveDate);
            feedback.CreateDate = commonService.ConvertToClientDateTime(feedback.CreateDate);
            feedback.RelatedCustomer = string.Join(",", feedback.RelatedCustomer.Split(",").OrderBy(x => x));
            feedback.Status = statusHash.TryGetValue(feedback.StatusId, out var value) ? value : string.Empty;
        }

        return feedbacks;
    }

    public async Task<EditNoOfInquiry> GetNoOfInquiryByFeedbackIdAsync(int feedbackId)
    {
        var criteria = new GetNoOfInquiryByFeedbackIdCriteria
        {
            FeedbackId = feedbackId
        };
        return await baseService.GetDataEntityAsync<EditNoOfInquiry>(criteria);
    }

    public async Task<CommandResult> EditNoOfInquiryAsync(EditNoOfInquiryCommand command) => await baseService.ExecuteNonQueryAsync(command);

    public async Task<CommandResult> EditCustomerFeedbackAsync(EditCustomerFeedbackCommand command)
    {
        command.FeedbackDate = commonService.ConvertToServerDateTime(command.FeedbackDate);
        command.ResolutionDate = commonService.ConvertToServerDateTime(command.ResolutionDate);
        command.FirstResponseTime = command.FirstResponseTime.HasValue ? commonService.ConvertToServerDateTime(command.FirstResponseTime.Value) : null;
        return await baseService.ExecuteNonQueryAsync(command);
    }

    public async Task<CommandResult> EditCustomerNewManualFeedbackAsync(EditCustomerNewManualFeedbackCommand command)
    {
        command.ResolutionDate = commonService.ConvertToServerDateTime(command.ResolutionDate);
        command.FeedbackDate = commonService.ConvertToServerDateTime(command.FeedbackDate);
        command.FirstResponseTime = command.FirstResponseTime.HasValue ? commonService.ConvertToServerDateTime(command.FirstResponseTime.Value) : null;
        return await baseService.ExecuteNonQueryAsync(command);
    }

    private async Task<IEnumerable<FeedbackDeleted>> GetDeletedFeedbackAsync(ICriteria criteria)
    {
        var results = await baseService.FetchMultipleAsync<FeedbackDeleted, FeedbackSettingRelation>(criteria);
        var feedbacks = results.Item1;
        var settings = results.Item2;

        foreach (var feedback in feedbacks)
        {
            feedback.Settings = settings.Where(x => x.FeedbackId == feedback.FeedbackId).ToList();
        }

        return feedbacks;
    }

    public async Task<IEnumerable<FeedbackDeleted>> GetDeletedFeedbackAsync(GetDeletedFeedbackParam param)
    {
        var criteria = new GetDeletedFeedbackCriteria
        {
            Username = param.Username,
            IsGuest = param.IsGuest,
            FromDate = commonService.ConvertClientFromTimeToServerTime(param.FromDate),
            ToDate = commonService.ConvertClientToTimeToServerTime(param.ToDate),
            MainCategoryId = param.MainCategoryId,
            SubCategoryId = param.SubCategoryId,
            CommunicationId = param.CommunicationId,
            ResponseId = param.ResponseId,
            IsReviewed = param.IsReviewed,
        };
        var feedbacks = await GetDeletedFeedbackAsync(criteria);
        var statusList = await settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool);
        var statusHash = statusList.ToDictionary(k => k.StatusId, v => v.Name);
        statusHash.Add(1, ViewResources.Symbol_NotApply);

        foreach (var feedback in feedbacks)
        {
            var formatResolutionDate = commonService.ConvertToClientDateTime(feedback.ResolutionDate);
            var formatFeedbackDate = commonService.ConvertToClientDateTime(feedback.FeedbackDate);
            feedback.DurationTime = DurationCalculation(formatResolutionDate, formatFeedbackDate);
            feedback.FeedbackDate = commonService.ConvertToClientDateTime(feedback.FeedbackDate);
            feedback.ResolutionDate = commonService.ConvertToClientDateTime(feedback.ResolutionDate);
            feedback.SolveDate = commonService.ConvertToClientDateTime(feedback.SolveDate);
            feedback.CreateDate = commonService.ConvertToClientDateTime(feedback.CreateDate);
            feedback.RelatedCustomer = string.Join(",", feedback.RelatedCustomer.Split(",").OrderBy(x => x));
            feedback.Status = statusHash.TryGetValue(feedback.StatusId, out var value) ? value : string.Empty;
        }

        return feedbacks;
    }

    private static string DurationCalculation(DateTime ResolutionDate, DateTime FeedbackDate)
    {
        var totalDays = ResolutionDate - FeedbackDate;
        return $"{totalDays.Days}:{totalDays.Hours}:{totalDays.Minutes}:{totalDays.Seconds}";
    }

    public async Task<IEnumerable<FeedbackDeleted>> GetFeedbackStatisticDetailAsync(GetFeedbackStatisticDetailCriteria criteria)
    {
        var status = await settingService.GetStatusAsync(ViewTypeConstants.All);
        var statusHash = status.ToDictionary(k => k.StatusId, v => v.Name);
        statusHash.Add(1, ViewResources.Symbol_NotApply);
        criteria.FromDate = commonService.ConvertClientFromTimeToServerTime(criteria.FromDate);
        criteria.ToDate = commonService.ConvertClientToTimeToServerTime(criteria.ToDate);
        var feedbackStatistic = await GetDeletedFeedbackAsync(criteria);

        foreach (var feedback in feedbackStatistic)
        {
            feedback.DurationTime = DurationCalculation(feedback.ResolutionDate, feedback.FeedbackDate);
            feedback.Status = statusHash.TryGetValue(feedback.StatusId, out var value) ? value : string.Empty;
            feedback.CreateDate = commonService.ConvertToClientDateTime(feedback.CreateDate);
            feedback.FeedbackDate = commonService.ConvertToClientDateTime(feedback.FeedbackDate);
            feedback.RelatedCustomer = string.Join(",", feedback.RelatedCustomer.Split(",").OrderBy(x => x));
        }

        return feedbackStatistic;
    }

    public async Task<IEnumerable<FeedbackDeleted>> GetManageFeedbackAsync(ManageFeedbackCriteria criteria)
    {
        criteria.FromDate = commonService.ConvertClientFromTimeToServerTime(criteria.FromDate);
        criteria.ToDate = commonService.ConvertClientToTimeToServerTime(criteria.ToDate);
        var feedbacks = await GetDeletedFeedbackAsync(criteria);

        foreach (var feedback in feedbacks)
        {
            feedback.DurationTime = DurationCalculation(feedback.ResolutionDate, feedback.FeedbackDate);
            feedback.CreateDate = commonService.ConvertToClientDateTime(feedback.CreateDate);
            feedback.FeedbackDate = commonService.ConvertToClientDateTime(feedback.FeedbackDate);
            feedback.SolveDate = commonService.ConvertToClientDateTime(feedback.SolveDate);
            feedback.RelatedCustomer = string.Join(",", feedback.RelatedCustomer.Split(",").OrderBy(x => x));
        }
        return feedbacks;
    }

    public async Task<CommunicationLog> GetLogByFeedbackIdAsync(int feedbackId)
    {
        var criteria = new GetLogByFeedbackIdCriteria
        {
            FeedbackId = feedbackId
        };

        var (communicationLogInfos, relatedCustomers, settingItems) =
            await baseService.FetchMultipleAsync<CommunicationLog, RelatedCustomerPermission, FeedbackSettingRelation>(criteria);
        CommunicationLog communicationLog = null;

        if (communicationLogInfos.Any())
        {
            communicationLog = communicationLogInfos.First();
            communicationLog.FeedbackDate = commonService.ConvertToClientDateTime(communicationLog.FeedbackDate);
            communicationLog.ResolutionDate = commonService.ConvertToClientDateTime(communicationLog.ResolutionDate);
            communicationLog.FirstResponseTime = communicationLog.FirstResponseTime.HasValue ? commonService.ConvertToClientDateTime(communicationLog.FirstResponseTime.Value) : null;
            communicationLog.SolveDate = commonService.ConvertToClientDateTime(communicationLog.SolveDate);
            communicationLog.RelatedCustomers = relatedCustomers.OrderBy(x => x.Username);
            communicationLog.Settings = settingItems.ToList();
        }

        return communicationLog;
    }

    public async Task<int> CheckFeedbackDuplicationAsync(CheckFeedbackDuplicationCriteria criteria)
        => await baseService.GetDataEntityAsync<int>(criteria);

    private async Task<CustomerFeedbackModel> GetCustomerOldFeedbackByIdAsync(int feedbackId)
    {
        var criteriaOldFeedback = new GetCustomerFeedbackByIdCriteria { FeedbackId = feedbackId };
        var (feedbackInfos, relatedCustomers, settingItems) =
            await baseService.FetchMultipleAsync<CustomerFeedback, RelatedCustomerPermission, FeedbackSettingRelation>(criteriaOldFeedback);
        return new CustomerFeedbackModel
        {
            CustomerFeedback = feedbackInfos,
            RelatedCustomerPermission = relatedCustomers,
            FeedbackSettingRelation = settingItems
        };
    }
}