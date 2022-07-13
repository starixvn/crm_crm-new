namespace CRM.Services.Feedback
{
    using CRM.Core.Constants;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.Feedback;
    using CRM.Criteria.Feedback.DeletedFeedback;
    using CRM.Criteria.Feedback.ManageFeedback;
    using CRM.Criteria.MultipleLogs;
    using CRM.Criteria.Report.FeedbackStatistic;
    using CRM.Models.CommunicationLogs;
    using CRM.Models.Customer;
    using CRM.Models.DeletedFeedback;
    using CRM.Models.Feedback;
    using CRM.Models.LatestFeedback;
    using CRM.Repositories;
    using CRM.Resources;
    using Fanex.Data.Repository;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public interface IFeedbackService
    {
        Task<IEnumerable<DeletedFeedback>> GetLatestFeedbackAsync(ICriteria criteria);

        Task<IEnumerable<DeletedFeedback>> GetFeedbackStatisticAsyncDetail(GetFeedbackStatisticDetailCriteria criteria);

        Task<CommandResult> EditNoOfInquiryAsync(EditNoOfInquiryCommand command);

        Task<EditNoOfInquiry> GetNoOfInquiryByFeedbackIdAsync(int feedbackId);

        Task<CustomerFeedback> GetCustomerFeedbackByIdAsync(int feedbackId);

        Task<CommandResult> EditCustomerFeedbackAsync(EditCustomerFeedbackCommand command);

        Task<IEnumerable<DeletedFeedback>> GetDeletedFeedbackAsync(GetDeletedFeedbackParam param);

        Task<IEnumerable<DeletedFeedback>> GetManageFeedbackAsync(ManageFeedbackCriteria criteria);

        Task<CommunicationLog> GetLogByFeedbackIdAsync(int feedbackId);

        Task<int> CheckFeedbackDuplicationAsync(CheckFeedbackDuplicationCriteria criteria);
    }

    public class FeedbackService : IFeedbackService
    {
        private readonly IBaseService baseService;
        private readonly ISettingService settingService;
        private readonly ICommonService commonService;
        private readonly IFeedbackRepository feedbackRepository;

        public FeedbackService(
            IBaseService baseService,
            ISettingService settingService,
            ICommonService commonService,
            IFeedbackRepository feedbackRepository)
        {
            this.baseService = baseService;
            this.settingService = settingService;
            this.commonService = commonService;
            this.feedbackRepository = feedbackRepository;
        }

        public async Task<CustomerFeedback> GetCustomerFeedbackByIdAsync(int feedbackId)
        {
            var criteria = new GetCustomerFeedbackByIdCriteria
            {
                FeedbackId = feedbackId
            };
            var (feedbackInfos, relatedCustomers, settingItems) = await baseService.FetchMultipleAsync<CustomerFeedback, RelatedCustomer, FeedbackSettingRelation>(criteria);
            CustomerFeedback feedback = null;

            if (feedbackInfos.Any())
            {
                feedback = feedbackInfos.First();
                feedback.FeedbackDate = commonService.ConvertToClientDateTime(feedback.FeedbackDate);
                feedback.ResolutionDate = commonService.ConvertToClientDateTime(feedback.ResolutionDate);
                feedback.SolveDate = commonService.ConvertToClientDateTime(feedback.SolveDate);
                feedback.CreateDate = commonService.ConvertToClientDateTime(feedback.CreateDate);
                feedback.RelatedCustomers = relatedCustomers;
                feedback.Settings = settingItems.ToList();

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

        public async Task<IEnumerable<DeletedFeedback>> GetLatestFeedbackAsync(ICriteria criteria)
        {
            IEnumerable<DeletedFeedback> feedbacks = await feedbackRepository.GetDeletedFeedbackAsync(criteria);
            var statusList = await settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool);
            var statusHash = statusList.ToDictionary(k => k.StatusId, v => v.Name);
            statusHash.Add(1, ViewResources.Symbol_NotApply);

            foreach (var feedback in feedbacks)
            {
                feedback.DurationTime = calculationDuration(feedback.ResolutionDate, feedback.FeedbackDate);
                feedback.FeedbackDate = commonService.ConvertToClientDateTime(feedback.FeedbackDate);
                feedback.ResolutionDate = commonService.ConvertToClientDateTime(feedback.ResolutionDate);
                feedback.SolveDate = commonService.ConvertToClientDateTime(feedback.SolveDate);
                feedback.CreateDate = commonService.ConvertToClientDateTime(feedback.CreateDate);

                feedback.Status = statusHash.ContainsKey(feedback.StatusId) ? statusHash[feedback.StatusId] : string.Empty;
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

        public async Task<CommandResult> EditNoOfInquiryAsync(EditNoOfInquiryCommand command)
        {
            return await baseService.ExecuteNonQueryAsync(command);
        }

        public async Task<CommandResult> EditCustomerFeedbackAsync(EditCustomerFeedbackCommand command)
        {
            return await baseService.ExecuteNonQueryAsync(command);
        }

        public async Task<IEnumerable<DeletedFeedback>> GetDeletedFeedbackAsync(GetDeletedFeedbackParam param)
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
            IEnumerable<DeletedFeedback> feedbacks = await feedbackRepository.GetDeletedFeedbackAsync(criteria);
            var statusList = await settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool);
            var statusHash = statusList.ToDictionary(k => k.StatusId, v => v.Name);
            statusHash.Add(1, ViewResources.Symbol_NotApply);

            foreach (var feedback in feedbacks)
            {
                feedback.DurationTime = calculationDuration(feedback.ResolutionDate, feedback.FeedbackDate);
                feedback.FeedbackDate = commonService.ConvertToClientDateTime(feedback.FeedbackDate);
                feedback.ResolutionDate = commonService.ConvertToClientDateTime(feedback.ResolutionDate);
                feedback.SolveDate = commonService.ConvertToClientDateTime(feedback.SolveDate);
                feedback.CreateDate = commonService.ConvertToClientDateTime(feedback.CreateDate);

                feedback.Status = statusHash.ContainsKey(feedback.StatusId) ? statusHash[feedback.StatusId] : string.Empty;
            }

            return feedbacks;
        }

        private static string calculationDuration(DateTime ResolutionDate, DateTime FeedbackDate)
        {
            var totalDays = ResolutionDate - FeedbackDate;
            return string.Format("{0}:{1}:{2}:{3}",
                                                        totalDays.Days,
                                                        totalDays.Hours,
                                                        totalDays.Minutes,
                                                        totalDays.Seconds);
        }

        public async Task<IEnumerable<DeletedFeedback>> GetFeedbackStatisticAsyncDetail(GetFeedbackStatisticDetailCriteria criteria)
        {
            var status = await settingService.GetStatusAsync(ViewTypeConstants.All);
            var statusHash = status.ToDictionary(k => k.StatusId, v => v.Name);
            statusHash.Add(1, ViewResources.Symbol_NotApply);
            criteria.FromDate = commonService.ConvertClientFromTimeToServerTime(criteria.FromDate);
            criteria.ToDate = commonService.ConvertClientToTimeToServerTime(criteria.ToDate);
            var feedbackStatistic = await feedbackRepository.GetDeletedFeedbackAsync(criteria);

            foreach (var feedback in feedbackStatistic)
            {
                feedback.DurationTime = calculationDuration(feedback.ResolutionDate, feedback.FeedbackDate);
                feedback.Status = statusHash.ContainsKey(feedback.StatusId) ? statusHash[feedback.StatusId] : string.Empty;
                feedback.CreateDate = commonService.ConvertToClientDateTime(feedback.CreateDate);
                feedback.FeedbackDate = commonService.ConvertToClientDateTime(feedback.FeedbackDate);
            }

            return feedbackStatistic;
        }

        public async Task<IEnumerable<DeletedFeedback>> GetManageFeedbackAsync(ManageFeedbackCriteria criteria)
        {
            criteria.FromDate = commonService.ConvertClientFromTimeToServerTime(criteria.FromDate);
            criteria.ToDate = commonService.ConvertClientToTimeToServerTime(criteria.ToDate);
            IEnumerable<DeletedFeedback> feedbacks = await feedbackRepository.GetDeletedFeedbackAsync(criteria);

            foreach (var feedback in feedbacks)
            {
                feedback.DurationTime = calculationDuration(feedback.ResolutionDate, feedback.FeedbackDate);
                feedback.CreateDate = commonService.ConvertToClientDateTime(feedback.CreateDate);
                feedback.FeedbackDate = commonService.ConvertToClientDateTime(feedback.FeedbackDate);
            }
            return feedbacks;
        }

        public async Task<CommunicationLog> GetLogByFeedbackIdAsync(int feedbackId)
        {
            var criteria = new GetLogByFeedbackIdCriteria
            {
                FeedbackId = feedbackId
            };

            var (communicationLogInfos, relatedCustomers, settingItems) = await baseService.FetchMultipleAsync<CommunicationLog, RelatedCustomer, FeedbackSettingRelation>(criteria);
            CommunicationLog communicationLog = null;

            if (communicationLogInfos.Any())
            {
                communicationLog = communicationLogInfos.First();
                communicationLog.FeedbackDate = commonService.ConvertToClientDateTime(communicationLog.FeedbackDate);
                communicationLog.ResolutionDate = commonService.ConvertToClientDateTime(communicationLog.ResolutionDate);
                communicationLog.SolveDate = commonService.ConvertToClientDateTime(communicationLog.SolveDate);
                communicationLog.RelatedCustomers = relatedCustomers;
                communicationLog.Settings = settingItems.ToList();
            }

            return communicationLog;
        }

        public async Task<int> CheckFeedbackDuplicationAsync(CheckFeedbackDuplicationCriteria criteria)
        {
            return await baseService.GetDataEntityAsync<int>(criteria);
        }
    }
}