namespace CRM.BackgroundJob.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using CRM.BackgroundJob.Models.ResultAmendment;
    using CRM.BackgroundJob.Models.VoidingSettledTickets;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using Fanex.CRM.BackgroundJob.Constants;
    using Fanex.CRM.BackgroundJob.Criteria;
    using Fanex.CRM.BackgroundJob.Models;
    using Fanex.CRM.BackgroundJob.Services;
    using Microsoft.Extensions.Options;

    public interface IVoidingSettledTicketsFeedbackService
    {
        Task CreateFeedbackForVoidingSettledTickets(ResultAmendmentSetting voidingSettledTicketSetting, bool isUAT,
            DateTime lastRuntimeEnv, string lastRuntimeNameEnv,
            string jobStatusNameEnv, string environment);
    }
    public class VoidingSettledTicketsFeedbackService : IVoidingSettledTicketsFeedbackService
    {
        private readonly AppJobSettings appSettings;
        private readonly IBaseService baseService;
        private readonly ISettingService settingService;
        private readonly ICRMLogService logService;
        private readonly ICommonFeedback commonFeedback;
        private readonly IVoidingSettledTicketsService voidingSettledTicketsService;
        private readonly IFeedbackTransactionService feedbackTransaction;

        private readonly string descTemplateXml = "VoidingSettledTicketDescriptionTemplate.xml";
        private readonly string solTemplateXml = "VoidingSettledTicketSolutionTemplate.xml";
        private readonly int MatchId9 = 9;
        private readonly int MatchId29 = 29;
        private readonly int MatchId2799 = 2799;
        private readonly int EventType2 = 2;
        private readonly int SportType180 = 180;
        private readonly int SportType186 = 186;
        private readonly int SportType161 = 161;

#pragma warning disable S107 // Methods should not have too many parameters
        public VoidingSettledTicketsFeedbackService(
            IOptionsSnapshot<AppJobSettings> appSettings,
            IBaseService baseService,
            ISettingService settingService,
            ICRMLogService logService,
            ICommonFeedback commonFeedback,
            IVoidingSettledTicketsService voidingSettledTicketsService,
            IFeedbackTransactionService feedbackTransaction
            )
#pragma warning restore S107 // Methods should not have too many parameters
        {
            this.appSettings = appSettings.Value;
            this.baseService = baseService;
            this.settingService = settingService;
            this.logService = logService;
            this.commonFeedback = commonFeedback;
            this.voidingSettledTicketsService = voidingSettledTicketsService;
            this.feedbackTransaction = feedbackTransaction;
        }

        public async Task CreateFeedbackForVoidingSettledTickets(ResultAmendmentSetting voidingSettledTicketSetting, bool isUAT,
            DateTime lastRuntimeEnv, string lastRuntimeNameEnv,
            string jobStatusNameEnv, string environment)
        {
            logService.LogInformation("start service voiding settled!!!");
            await commonFeedback.EditSystemSettingAsyncByEnvFormatDate(jobStatusNameEnv, lastRuntimeNameEnv, JobStatus.Running, Constants.ServiceName_AutoVoidFB);

            var settingNames = new[] { SettingName.Product, SettingName.SubProduct, SettingName.Bettype };
            IEnumerable<SettingItem> settings = await settingService.GetAllSettingAsync();
            IEnumerable<SystemSettingMapping> settingMappings = await settingService.GetSystemSettingMappingAsync(settingNames);

            var messageVoidSettled = await voidingSettledTicketsService.GetMessageVoidSettledAsync();
            var voidingMessageCheck = await voidingSettledTicketsService.GetVoidingMessasgeCheckAsync(messageVoidSettled);
            if (voidingMessageCheck.Any())
            {
                var settledTicket = await voidingSettledTicketsService.VoidingMessageGetSettledTicketAsync(voidingMessageCheck);
                var commandMessage = await voidingSettledTicketsService.ImportMessageVoidSettledAsync(settledTicket);
                if (!commandMessage.IsSuccessful)
                {
                    logService.LogInformation("Import Messages Settled Fail!!!");
                    return;
                }
            }
            var voidingMessages = await voidingSettledTicketsService.GetAutoVoidingMessageAsync(voidingSettledTicketSetting, environment);
            var failVoidingMessages = await voidingSettledTicketsService.GetFailVoidingMessageAsync();
            var voidingMessageDistinct = voidingMessages.Concat(failVoidingMessages).Distinct().ToList();
            var voidingTickets = await voidingSettledTicketsService.GetAutoVoidingTicketAsync(voidingSettledTicketSetting, voidingMessageDistinct, environment);
            if (voidingTickets.Item2.Any())
            {
                await voidingSettledTicketsService.UpdateAutoVoidingMessageAsync(voidingTickets.Item2, environment);
            }
            if (!voidingTickets.Item1.Any())
            {
                await commonFeedback.EditSystemSettingAsyncByEnvFormatDate(jobStatusNameEnv, lastRuntimeNameEnv, JobStatus.Completed, Constants.ServiceName_AutoVoidFB);
                logService.LogInformation("Do not have any data set1, return voiding settled tickets!!!");
                return;
            }
            await voidingSettledTicketsService.ImportVoidingAutoFeedbackInfoAsync(voidingTickets.Item1, environment);
            var feedbackInfos = await voidingSettledTicketsService.GetVoidingAutoFeedbackInfoAsync(voidingSettledTicketSetting.BatchSize);
            var groupFeedbackByMsgId = feedbackInfos.Item1.GroupBy(x => new { x.HeadlineId, x.MessageId }).Select(y => y.ToList());

            foreach (var feedbackInfo in groupFeedbackByMsgId)
            {
                var feedbackInfoFirst = feedbackInfo.FirstOrDefault();
                var eventDetails = feedbackInfos.Item2.Where(x => x.LogVoidingID == feedbackInfoFirst.LogVoidingID);
                var messages = await feedbackTransaction.GetMessageContentInfoAsync(feedbackInfoFirst.MessageId);
                await CreateVoidingSettledTicketsAsync(feedbackInfoFirst, eventDetails, messages, settings, settingMappings, environment);
            }

            await commonFeedback.EditSystemSettingAsyncByEnvFormatDate(jobStatusNameEnv, lastRuntimeNameEnv, JobStatus.Completed, Constants.ServiceName_AutoVoidFB);
            logService.LogInformation("end service voiding settled!!!");
        }

        protected internal virtual async Task CreateVoidingSettledTicketsAsync(
           VoidingAutoFeedbackInfo feedbackInfo,
           IEnumerable<AutoVoidingEventDetails> eventDetails,
           IEnumerable<Message> messages,
           IEnumerable<SettingItem> settings,
           IEnumerable<SystemSettingMapping> settingMappings,
           string environment)
        {
            logService.LogInformation("begin CreateVoidingSettledTicketsAsync!!!");
            var timeSpan = new TimeSpan(appSettings.TimeSpan, 0, 0);
            var feedbackDate = DateTime.Now.Add(timeSpan);
            var status = settings.FirstOrDefault(x => x.SettingName.Equals(SettingName.Status, StringComparison.OrdinalIgnoreCase)
                && x.SettingValue.Equals(DefaultValue.Closed, StringComparison.OrdinalIgnoreCase));
            var response = settings.FirstOrDefault(x => x.SettingName.Equals(SettingName.Response, StringComparison.OrdinalIgnoreCase)
                 && x.SettingValue.Equals(DefaultValue.Neutral, StringComparison.OrdinalIgnoreCase));
            var station = settings.FirstOrDefault(x => x.SettingName.Equals(SettingName.Extension, StringComparison.OrdinalIgnoreCase)
                && x.SettingId == Constants.ExtentionNA);

            var category = GetCategorySubCategoryVoidingSettledTicket(settings, DefaultValue.ResultAmended);
            var sportTypeIds = eventDetails.Select(x => x.Sporttype);
            var productIds = eventDetails.Select(x => x.ProductId).Distinct();
            var criteria = new CreateMutipleFeedbackCommand
            {
                FeedbackDate = feedbackDate.Subtract(timeSpan),
                ResolutionDate = feedbackDate.AddMinutes(1).Subtract(timeSpan),
                CreatorId = appSettings.CreatorId,
                UserId = appSettings.CreatorId,
                IsCheckedDefaultComm = true,
                StationId = station != null ? station.SettingId.ToString() : string.Empty,
                StatusId = status != null ? status.SettingId : 0,
                CategoryXml = category.Item3,
                CategoryIds = category.Item1.ToString(),
                SubCategoryIds = category.Item2.ToString(),
                ResponseId = response != null ? response.SettingId : 0,
                UserRole = Constants.UserRole,
                Subject = DefaultValue.ResultAmended,
                AutoField2 = string.Format(DefaultValue.DateTimeTool, feedbackDate.ToString("yyyyMMdd"), feedbackDate.ToString("hh:mmtt")),
                AutoField = string.Empty,
                AutoField1 = string.Empty,
                AutoField3 = $"{Environment.NewLine}System ID: ",
                CustomerXml = string.Format(DefaultValue.CustomerXml, feedbackInfo.HeadlineId, feedbackInfo.HeadlineName),
                ProductXml = GetVoidingSettledTicketsProductXml(productIds, sportTypeIds, feedbackInfo.Listbettype, settings, settingMappings),
                Solution = GetVoidingSettledTicketSolution(feedbackInfo, messages),
                RelatedCustomerXml = GetRelatedCustomerXml(feedbackInfo),
                MessageId = feedbackInfo.MessageId,
                ListOrigCustIds = feedbackInfo.AffectedId,
                VoidingSettledID = feedbackInfo.LogVoidingID,
                Description = GetVoidingSettledTicketDescription(feedbackInfo, eventDetails)
            };

            logService.LogInformation("begin CheckValidVoidingSettledParamsAndInsertFeedbackAsync!!!");
            await CheckValidVoidingSettledParamsAndInsertFeedbackAsync(feedbackInfo, criteria, environment);
            logService.LogInformation("end CreateVoidingSettledTicketsAsync!!!");
        }

        protected internal virtual async Task CheckValidVoidingSettledParamsAndInsertFeedbackAsync(
            VoidingAutoFeedbackInfo feedbackInfo,
            CreateMutipleFeedbackCommand criteria,
            string environment)
        {
            var checkValidParamBeforeInsert = commonFeedback.CheckFeedbackValidParams(criteria);
            if (!checkValidParamBeforeInsert.Item1)
            {
                var messageInvalid = "Invalid Params: " + checkValidParamBeforeInsert.Item2;
                logService.LogInformation(string.Format("Invalid Params. @Categorystr: {0} @Category: {1} @Product: {2} @StatusID: {3} @SubCategorystr:{4} @ResponseID:{5} @StationID:{6}",
                        criteria.CategoryIds, criteria.CategoryXml, criteria.ProductXml, criteria.StatusId, criteria.SubCategoryIds, criteria.ResponseId, criteria.StationId));
                await voidingSettledTicketsService.UpdateVoidingAutoFeedbackInfoBatchAsync(feedbackInfo.LogVoidingID, CreateFeedbackJobStatus.Fail, messageInvalid, environment);
                return;
            }
            try
            {
                logService.LogInformation("begin insert voiding settled tickets!!!");

                CommandResult commandResult = await baseService.ExecuteNonQueryAsync(criteria);
                if (commandResult.IsSuccessful)
                {
                    logService.LogInformation(string.Format("Create voiding settled tickets feedback successfully, HeadlineId {0} HeadlineName:{1}",
                    feedbackInfo.HeadlineId, feedbackInfo.HeadlineName));
                }
                else
                {
                    logService.LogInformation(string.Format("Create voiding settled tickets feedback fail, HeadlineId {0} HeadlineName:{1}",
                     feedbackInfo.HeadlineId, feedbackInfo.HeadlineName));

                    await voidingSettledTicketsService.UpdateVoidingAutoFeedbackInfoBatchAsync(feedbackInfo.LogVoidingID, CreateFeedbackJobStatus.Fail, commandResult.Message, environment);

                    await logService.ErrorAsync(commandResult, criteria);
                }

                logService.LogInformation("end insert voiding settled tickets!!!");

            }
            catch (Exception ex)
            {
                await voidingSettledTicketsService.UpdateVoidingAutoFeedbackInfoBatchAsync(feedbackInfo.LogVoidingID, CreateFeedbackJobStatus.Fail, ex.Message, environment);
                await logService.ErrorAsync(ex);
            }
        }

        protected internal virtual string GetVoidingSettledTicketsProductXml(
            IEnumerable<int> productIds,
            IEnumerable<short> sportTypeIds,
            string bettypes,
            IEnumerable<SettingItem> settings,
            IEnumerable<SystemSettingMapping> settingMappings)
        {
            var stringBuilder = new StringBuilder(Constants.BeginRootTag);
            var listBetTypes = bettypes.Split(",");
            IList<SettingItem> products = GetVoidingSettledTicketsProduct(settings, settingMappings, productIds);
            var productSettingIds = products.Select(x => x.SettingId);
            IList<SettingItem> subProducts = GetVoidingSettledTicketsSubProduct(productSettingIds, sportTypeIds, settings, settingMappings);
            IList<SystemSettingMapping> bettypesMapping = GetVoidingSettledTicketsBettype(listBetTypes, settingMappings);
            if (products.Any())
            {
                foreach (SettingItem product in products)
                {
                    var productSubXml = GetProductSubXml(product, subProducts, bettypesMapping);
                    stringBuilder.Append(productSubXml);
                }
            }
            else
            {
                stringBuilder.AppendFormat(DefaultValue.ProductXml, Constants.ProductNA, Constants.SubProductNA, Constants.BettypeNA);
            }
            logService.LogInformation("end mapping product, sub-product, bet type voiding settled tickets.");
            return stringBuilder.Append(Constants.EndRootTag).ToString();
        }
        protected internal virtual string GetProductSubXml(
            SettingItem product,
            IList<SettingItem> subProducts,
            IList<SystemSettingMapping> bettypesMapping)
        {
            var stringBuilder = new StringBuilder();
            if (!subProducts.Any())
            {
                stringBuilder.AppendFormat(DefaultValue.ProductXml, product.SettingId, Constants.SubProductNA, Constants.BettypeNA);
            }
            else
            {
                foreach (SettingItem subProduct in subProducts)
                {
                    if (bettypesMapping.Any())
                    {
                        var bettypeXml = GetBettpeXml(product, subProduct, bettypesMapping);
                        stringBuilder.Append(bettypeXml);
                    }
                    else
                    {
                        stringBuilder.AppendFormat(DefaultValue.ProductXml, product.SettingId, subProduct.SettingId, Constants.BettypeNA);
                    }
                }
            }
            return stringBuilder.ToString();
        }

        protected internal virtual string GetBettpeXml(
           SettingItem product,
           SettingItem subProduct,
           IList<SystemSettingMapping> bettypesMapping)
        {
            var stringBuilder = new StringBuilder();
            foreach (SystemSettingMapping bettype in bettypesMapping)
            {
                stringBuilder.AppendFormat(DefaultValue.ProductXml, product.SettingId, subProduct.SettingId, bettype.SettingId);
            }
            return stringBuilder.ToString();
        }

        protected internal virtual IList<SettingItem> GetVoidingSettledTicketsProduct(
            IEnumerable<SettingItem> settings,
            IEnumerable<SystemSettingMapping> settingMappings,
            IEnumerable<int> productIds)
        {
            logService.LogInformation("Begin mapping product with productId");
            var productNames = new List<string>();
            foreach (var productId in productIds)
            {
                var productName = commonFeedback.GetProductName(productId.ToString(), Language.en_US);
                productNames.Add(productName);
            }
            List<SystemSettingMapping> productMappings = settingMappings.Where(p => p.SettingName.Equals(SettingName.Product, StringComparison.OrdinalIgnoreCase)
                && !string.IsNullOrWhiteSpace(p.SettingSource)
                && productNames.Any(productName => p.SettingSource.Equals(productName, StringComparison.OrdinalIgnoreCase))).ToList();

            var products = settings.Where(x => x.SettingName.Equals(SettingName.Product, StringComparison.OrdinalIgnoreCase)
                && productMappings != null
                && productMappings.Any(mapping => x.SettingId == mapping.SettingId)).ToList();

            logService.LogInformation("End mapping amenment product.");

            return products.Any()
                ? products.GroupBy(x => x.SettingId).Select(x => x.First()).ToList()
                : new List<SettingItem> { new SettingItem { SettingId = Constants.ProductNA } };
        }

        protected internal virtual IList<SettingItem> GetVoidingSettledTicketsSubProduct(
            IEnumerable<int> productSettingIds,
            IEnumerable<short> sportTypeIds,
            IEnumerable<SettingItem> settings,
            IEnumerable<SystemSettingMapping> settingMappings)
        {
            logService.LogInformation("Begin mapping subproduct.");
            var sportNames = new List<string>();
            foreach (var sportTypeId in sportTypeIds)
            {
                var sportName = commonFeedback.GetSportName(sportTypeId.ToString(), Language.en_US);
                sportNames.Add(sportName);
            }
            List<SystemSettingMapping> mappings = settingMappings.Where(mapping => mapping.SettingName.Equals(SettingName.SubProduct, StringComparison.OrdinalIgnoreCase)
                && !string.IsNullOrWhiteSpace(mapping.SettingSource)
                && sportNames.Any(sportName => mapping.SettingSource.Equals(sportName, StringComparison.OrdinalIgnoreCase))).ToList();

            List<SettingItem> subProducts = settings.Where(sub => sub.SettingName.Equals(SettingName.SubProduct, StringComparison.OrdinalIgnoreCase)
                && sub.ParentIds.Any(parent => productSettingIds.Any(productName => productName == parent))
                && mappings != null
                && mappings.Any(mapping => mapping.SettingId == sub.SettingId)).ToList();
            logService.LogInformation("End mapping subproduct.");

            return subProducts.Any()
                ? subProducts.GroupBy(x => x.SettingId).Select(x => x.First()).ToList()
                : new List<SettingItem>
                {
                    new SettingItem { SettingId = Constants.SubProductNA, ParentIds = new List<int> { Constants.ProductNA } }
                };
        }

        protected internal virtual List<SystemSettingMapping> GetVoidingSettledTicketsBettype(
            string[] listBetTypes,
            IEnumerable<SystemSettingMapping> settingMappings)
        {
            logService.LogInformation("Begin mapping betType.");
            var betTypeMappings = new List<string>();
            foreach (var betType in listBetTypes)
            {
                var betTypeName = commonFeedback.GetBettypeName(betType, Language.en_US);
                betTypeMappings.Add(betTypeName);
            }
            var bettypes = settingMappings.Where(mapping => mapping.SettingName.Equals(SettingName.Bettype, StringComparison.OrdinalIgnoreCase)
                && !string.IsNullOrWhiteSpace(mapping.SettingSource)
                && betTypeMappings.Any(name => name.Equals(mapping.SettingSource, StringComparison.OrdinalIgnoreCase))).ToList();
            logService.LogInformation("End mapping betType.");
            return bettypes != null && bettypes.Any()
                ? bettypes.GroupBy(x => x.SettingId).Select(x => x.First()).ToList()
                : new List<SystemSettingMapping>
                {
                    new SystemSettingMapping { SettingId = Constants.BettypeNA }
                };
        }

        protected internal virtual Tuple<int, int, string> GetCategorySubCategoryVoidingSettledTicket(IEnumerable<SettingItem> settings, string settingValueName)
        {
            var category = settings.FirstOrDefault(x => x.SettingName.Equals(SettingName.MainCategory, StringComparison.OrdinalIgnoreCase)
                && x.SettingValue.Equals(settingValueName, StringComparison.OrdinalIgnoreCase));
            var subCategoryId = 0;

            if (category != null)
            {
                var subCategory = settings.FirstOrDefault(x => x.SettingName.Equals(SettingName.SubCategory, StringComparison.OrdinalIgnoreCase)
                    && x.SettingId == 4029);
                subCategoryId = subCategory != null ? subCategory.SettingId : 0;
            }

            return new Tuple<int, int, string>(
                category != null ? category.SettingId : 0, subCategoryId,
                string.Format(DefaultValue.CategoryXml,
                    category != null ? category.SettingId : 0,
                    subCategoryId));
        }

        protected internal virtual string GetRelatedCustomerXml(VoidingAutoFeedbackInfo feedbackInfo)
        {
            var stringBuilder = new StringBuilder(Constants.BeginRootTag);

            if (string.IsNullOrEmpty(feedbackInfo.AffectedId))
            {
                return stringBuilder.Append(Constants.EndRootTag).ToString();
            }
            var relateCustIds = feedbackInfo.AffectedId.Split(",");
            var userNames = feedbackInfo.AffectedName.Split(",");
            const string XmlTemplate = DefaultValue.RelatedCustomerXml;
            for (int i = 0; i < relateCustIds.Count(); i++)
            {
                stringBuilder.AppendFormat(XmlTemplate, feedbackInfo.HeadlineId, relateCustIds[i], userNames[i]);
            }
            return stringBuilder.Append(Constants.EndRootTag).ToString();
        }

        protected internal virtual string GetVoidingSettledTicketSolution(VoidingAutoFeedbackInfo feedbackInfo, IEnumerable<Message> messages)
        {
            var ticketSolTemplate = commonFeedback.GetFeedbackTemplates<VoidingSettledTicketSolutionTemplate>(solTemplateXml);
            var stringBuilder = new StringBuilder();
            var content_en = messages?.FirstOrDefault()?.Content_en;
            var content_cs = messages?.FirstOrDefault()?.Content_cs;
            logService.LogInformation(string.Format("GetVoidingSettledTicketSolution, Site: {0} IsVip:{1}", feedbackInfo.Site, feedbackInfo.IsVip));
            if (feedbackInfo.Site == "789y" && feedbackInfo.IsVip)
            {
                stringBuilder.AppendFormat(ticketSolTemplate.SolutionENYN,
                   content_en, feedbackInfo.AffectedName, Constants.Break, Constants.LineBreak
               );
            }
            else
            {
                stringBuilder.AppendFormat(ticketSolTemplate.SolutionENSC,
                    content_en, content_cs, feedbackInfo.AffectedName, Constants.LineBreak, Constants.Break
                );
            }

            return stringBuilder.ToString();
        }

        protected internal virtual string GetVoidingSettledTicketDescription(VoidingAutoFeedbackInfo feedbackInfo,
           IEnumerable<AutoVoidingEventDetails> eventDetails)
        {
            const string messageTemplate = "<span style=\"color: rgb(255, 0, 0);\">Msg ID: {0} {1}</span>";
            const string settledTicketsText = "<span style =\"font-weight:bold;\">Following events have voided settled tickets: </span>";
            const string mainParlayticketsText = "<span style =\"font-weight:bold;\">Following Members have voided settled Main Parlay tickets: </span>";
            var stringBuilder = new StringBuilder(DefaultValue.autoGenerated);
            var stringBuilderMainParlay = new StringBuilder();
            var stringBuilderTicket = new StringBuilder();
            stringBuilder.Append(Constants.Break);
            stringBuilder.AppendFormat(messageTemplate, feedbackInfo.MessageId, Constants.Break);
            var ticketDescTemplate = commonFeedback.GetFeedbackTemplates<VoidingSettledTicketDescriptionTemplate>(descTemplateXml);
            var countAppendTicket = 0;
            var countAppendMainParlay = 0;
            foreach (var eventDetail in eventDetails)
            {
                var isMainParlay = eventDetail.MatchId == MatchId9 || eventDetail.MatchId == MatchId29 || eventDetail.MatchId == MatchId2799;
                if (!isMainParlay)
                {
                    if (countAppendTicket == 0)
                    {
                        stringBuilderTicket.Append(settledTicketsText);
                    }
                    stringBuilderTicket.Append(Constants.Break);
                    stringBuilderTicket.Append(GetVoidingSettledTicketDescriptionByProduct(eventDetail, ticketDescTemplate));
                    countAppendTicket++;
                }
                else
                {
                    if (countAppendMainParlay == 0)
                    {
                        stringBuilderMainParlay.Append(Constants.Break);
                        stringBuilderMainParlay.Append(mainParlayticketsText);
                    }
                    stringBuilderMainParlay.Append(Constants.Break);
                    const string templateMainParlaytickets = "- {0}";
                    stringBuilderMainParlay.AppendFormat(templateMainParlaytickets, eventDetail.MatchCode);
                    countAppendMainParlay++;
                }
            }
            stringBuilder.Append(stringBuilderTicket);
            stringBuilder.Append(stringBuilderMainParlay);

            return stringBuilder.ToString();
        }

        protected internal virtual string GetVoidingSettledTicketDescriptionByProduct(AutoVoidingEventDetails eventDetail,
            VoidingSettledTicketDescriptionTemplate ticketDescTemplate)
        {
            var stringBuilder = new StringBuilder();
            const string line = "-------------------------------------------------------- {0}";
            var sportName = commonFeedback.GetSportName(eventDetail.Sporttype.ToString(), Language.en_US);
            var leagueName = commonFeedback.GetLeagueName(eventDetail.LeagueId.ToString(), Language.en_US);
            var homeName = commonFeedback.GetTeamName(eventDetail.HomeId.ToString(), Language.en_US);
            var awayName = commonFeedback.GetTeamName(eventDetail.AwayId.ToString(), Language.en_US);

            var EventdateGMT4Format = eventDetail.Eventdate.ToString(DefaultValue.FortmatddmmmyyyyDash);
            var timeSpan = new TimeSpan(appSettings.TimeSpan, 0, 0);
            var kO_time = eventDetail.KO_time.Add(timeSpan).ToString(DefaultValue.Formathhmmtt);
            var race_time = eventDetail.Race_time.Add(timeSpan).ToString(DefaultValue.Formathhmmtt);
            var matchCode = commonFeedback.GetMatchCode(eventDetail.MatchCode, Language.en_US);
            var numberGameEnGame = eventDetail.Sporttype == SportType161 ? leagueName : sportName;
            var productName = commonFeedback.GetProductName(eventDetail.ProductId.ToString(), Language.en_US);
            stringBuilder.Append(GetDescriptionSportBook(eventDetail, productName, kO_time, leagueName, homeName, sportName, awayName));
            if (productName == "Virtual Sports" && (eventDetail.Sporttype == SportType180 || eventDetail.Sporttype == SportType186))
            {
                stringBuilder.AppendFormat(line, Constants.Break);
                stringBuilder.AppendFormat(ticketDescTemplate.VirtualSports, EventdateGMT4Format, sportName, homeName, awayName, Constants.Break);
            }

            if (productName == "Virtual Sports" && (eventDetail.Sporttype > SportType180 && eventDetail.Sporttype < SportType186))
            {
                stringBuilder.AppendFormat(line, Constants.Break);
                stringBuilder.AppendFormat(ticketDescTemplate.VirtualSports181185, EventdateGMT4Format, sportName, race_time, Constants.Break);
            }

            if (productName == "Number Game")
            {
                stringBuilder.AppendFormat(line, Constants.Break);
                stringBuilder.AppendFormat(ticketDescTemplate.NumberGames, EventdateGMT4Format, numberGameEnGame, matchCode, Constants.Break);
            }

            return stringBuilder.ToString();
        }

        protected internal virtual string GetDescriptionSportBook(AutoVoidingEventDetails eventDetail, string productName,
          string kO_time, string leagueName, string homeName, string sportName, string awayName)
        {
            var stringBuilder = new StringBuilder();
            const string line = "-------------------------------------------------------- {0}";
            var ticketDescTemplate = commonFeedback.GetFeedbackTemplates<VoidingSettledTicketDescriptionTemplate>(descTemplateXml);
            var EventdateGMT4Format = eventDetail.Eventdate.ToString(DefaultValue.FortmatddmmmyyyyDash);
            if (productName == "Sportsbook" && eventDetail.EventType == EventType2)
            {
                stringBuilder.AppendFormat(line, Constants.Break);
                stringBuilder.AppendFormat(ticketDescTemplate.Outright, eventDetail.Leaguenametc, kO_time, leagueName, homeName, Constants.Break);
            }

            if ((productName == "Sportsbook" && eventDetail.EventType != EventType2) || productName == "Virtual Sports 2")
            {
                stringBuilder.AppendFormat(line, Constants.Break);
                stringBuilder.AppendFormat(ticketDescTemplate.SportsbookVirtualSports2, EventdateGMT4Format, sportName, kO_time, leagueName, homeName, awayName, Constants.Break);
            }

            return stringBuilder.ToString();
        }
    }
}