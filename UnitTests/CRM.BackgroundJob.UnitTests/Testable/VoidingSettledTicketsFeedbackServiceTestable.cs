
namespace CRM.BackgroundJob.UnitTests.Testable
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.BackgroundJob.Models.VoidingSettledTickets;
    using CRM.BackgroundJob.Services;
    using CRM.Core.Services;
    using Fanex.CRM.BackgroundJob.Criteria;
    using Fanex.CRM.BackgroundJob.Models;
    using Fanex.CRM.BackgroundJob.Services;
    using Microsoft.Extensions.Options;

    public class VoidingSettledTicketsFeedbackServiceTestable : VoidingSettledTicketsFeedbackService
    {
        public VoidingSettledTicketsFeedbackServiceTestable(
            IOptionsSnapshot<AppJobSettings> appSettings,
            IBaseService baseService,
            ISettingService settingService,
            ICRMLogService logService,
            ICommonFeedback commonFeedback,
            IVoidingSettledTicketsService voidingSettledTicketsService,
            IFeedbackTransactionService feedbackTransaction)
        : base(appSettings,
                baseService,
                settingService,
                logService,
                commonFeedback,
                voidingSettledTicketsService,
                feedbackTransaction
              )
        {
        }

        public async Task Public_CreateVoidingSettledTicketsAsync(
           VoidingAutoFeedbackInfo feedbackInfo,
           IEnumerable<AutoVoidingEventDetails> eventDetails,
           IEnumerable<Message> messages,
           IEnumerable<SettingItem> settings,
           IEnumerable<SystemSettingMapping> settingMappings,
           string environment
            )
        {
            await base.CreateVoidingSettledTicketsAsync(feedbackInfo, eventDetails, messages, settings, settingMappings, environment);
        }

        public async Task Public_CheckValidVoidingSettledParamsAndInsertFeedbackAsync(
            VoidingAutoFeedbackInfo feedbackInfo,
            CreateMutipleFeedbackCommand criteria,
            string environment)
        {
            await base.CheckValidVoidingSettledParamsAndInsertFeedbackAsync(feedbackInfo, criteria, environment);
        }
        public string Public_GetVoidingSettledTicketsProductXml(
            string productId,
            short sportTypeId,
            string bettypes,
            IEnumerable<SettingItem> settings,
            IEnumerable<SystemSettingMapping> settingMappings)
        {
            return base.GetVoidingSettledTicketsProductXml(productId, sportTypeId, bettypes, settings, settingMappings);
        }

        public SettingItem Public_GetVoidingSettledTicketsProduct(
            IEnumerable<SettingItem> settings,
            IEnumerable<SystemSettingMapping> settingMappings,
            string productId)
        {
            return base.GetVoidingSettledTicketsProduct(settings, settingMappings, productId);
        }

        public IList<SettingItem> Public_GetVoidingSettledTicketsSubProduct(
            int productId,
            short sportTypeId,
            IEnumerable<SettingItem> settings,
            IEnumerable<SystemSettingMapping> settingMappings)
        {
            return base.GetVoidingSettledTicketsSubProduct(productId, sportTypeId, settings, settingMappings);
        }

        public IList<SystemSettingMapping> Public_GetVoidingSettledTicketsBettype(
            string[] listBetTypes,
            IEnumerable<SystemSettingMapping> settingMappings)
        {
            return base.GetVoidingSettledTicketsBettype(listBetTypes, settingMappings);
        }

        public Tuple<int, int, string> Public_GetCategorySubCategoryVoidingSettledTicket(IEnumerable<SettingItem> settings, string settingValueName)
        {
            return base.GetCategorySubCategoryVoidingSettledTicket(settings, settingValueName);
        }

        public string Public_GetRelatedCustomerXml(VoidingAutoFeedbackInfo feedbackInfo)
        {
            return base.GetRelatedCustomerXml(feedbackInfo);
        }

        public string Public_GetVoidingSettledTicketSolution(VoidingAutoFeedbackInfo feedbackInfo, IEnumerable<Message> messages)
        {
            return base.GetVoidingSettledTicketSolution(feedbackInfo, messages);
        }

        public string Public_GetVoidingSettledTicketDescription(VoidingAutoFeedbackInfo feedbackInfo,
           IEnumerable<AutoVoidingEventDetails> eventDetails)
        {
            return base.GetVoidingSettledTicketDescription(feedbackInfo, eventDetails);
        }

        public string Public_GetVoidingSettledTicketDescriptionByProduct(AutoVoidingEventDetails eventDetail,
          string[] products, VoidingSettledTicketDescriptionTemplate ticketDescTemplate)
        {
            return base.GetVoidingSettledTicketDescriptionByProduct(eventDetail, products, ticketDescTemplate);
        }

        public string Public_GetDescriptionSportBook(AutoVoidingEventDetails eventDetail, string productName,
          string kO_time, string leagueName, string homeName, string sportName, string awayName)
        {
            return base.GetDescriptionSportBook(eventDetail, productName, kO_time, leagueName, homeName, sportName, awayName);
        }
    }
}
