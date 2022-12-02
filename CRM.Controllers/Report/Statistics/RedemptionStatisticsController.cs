namespace CRM.Controllers.Report.Statistics
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core;
    using CRM.Core.Constants;
    using CRM.Core.Services;
    using CRM.Criteria.Report.RedemptionStatistics;
    using CRM.Models.Report.RedemptionStatistics;
    using CRM.Resources;
    using CRM.Services;
    using Microsoft.AspNetCore.Mvc;

    public class RedemptionStatisticsController : BaseController
    {
        private readonly ICommonService commonService;
        private readonly IBaseService baseService;
        private readonly ISettingService settingService;
        private readonly IExportExcelService excelService;
        private readonly byte SummaryByYear = 2;

        public RedemptionStatisticsController(
            ICommonService commonService,
            IBaseService baseService,
            ISettingService settingService,
            IExportExcelService excelService)
        {
            this.commonService = commonService;
            this.baseService = baseService;
            this.settingService = settingService;
            this.excelService = excelService;
        }

        public async Task<IActionResult> GetAllSettings()
        {
            var statusList = await settingService.GetStatusAsync(ViewTypeConstants.Redemption);
            var statuses = statusList.ToList();
            int deleteIndex = -1;
            for (int i = 0; i < statuses.Count; i++)
            {
                if (statuses[i].Name == "Deleted")
                {
                    deleteIndex = i;
                }
            }

            if (deleteIndex >= 0)
            {
                statuses.RemoveAt(deleteIndex);
            }

            var currencies = await settingService.GetCurrencyRedemptionAsync();
            return Json(new
            {
                statuses,
                currencies
            });
        }

        [HttpPost]
        public async Task<IActionResult> GetRedemptionSummary([FromBody] GetRedemptionStatisticsCriteria criteria)
        {
            var title = string.Format(ViewResources.RedemptionStatistics_Title,
                                        criteria.FromDate.ToShortDateFormat(), criteria.ToDate.ToShortDateFormat());
            criteria.ToDate = commonService.ConvertClientToTimeToServerTime(criteria.ToDate);
            criteria.FromDate = commonService.ConvertClientFromTimeToServerTime(criteria.FromDate);
            var redemptionEntitys = await baseService.GetDataAsync<RedemptionStatisticsEntity>(criteria);
            foreach (var redemptionEntity in redemptionEntitys)
            {
                redemptionEntity.ClaimTime = commonService.ConvertToClientDateTime(redemptionEntity.ClaimTime);
                redemptionEntity.Year = redemptionEntity.ClaimTime.Year;
                if (criteria.ReportBy != SummaryByYear)
                {
                    redemptionEntity.Month = redemptionEntity.ClaimTime.Month;
                }
            }
            var tuple = GetRedemptionAmount(redemptionEntitys.ToList());

            return Json(new { data = tuple.Item1, totals = tuple.Item2, title });
        }

        [HttpPost]
        public async Task<IActionResult> GetRedemptionDetails([FromBody] GetRedemptionStatisticsDetailCriteria criteria)
        {
            criteria.FromDate = commonService.ConvertClientFromTimeToServerTime(criteria.FromDate);
            criteria.ToDate = commonService.ConvertClientToTimeToServerTime(criteria.ToDate);
            var details = await baseService.GetDataAsync<RedemptionStatisticsDetailEntity>(criteria);
            foreach (var detail in details)
            {
                detail.ClaimTime = commonService.ConvertToClientDateTime(detail.ClaimTime);
            }
            return Json(new { details, criteria.TotalRows });
        }

        [HttpPost]
        public async Task<IActionResult> ExportExcel([FromBody] GetRedemptionStatisticsCriteria criteria)
        {
            var title = string.Format(ViewResources.RedemptionStatistics_Title,
                                        criteria.FromDate.ToShortDateFormat(), criteria.ToDate.ToShortDateFormat());
            var fromDateFormat = criteria.FromDate.ToString("yyyyMMdd");
            var toDateFormat = criteria.ToDate.ToString("yyyyMMdd");
            criteria.FromDate = commonService.ConvertClientFromTimeToServerTime(criteria.FromDate);
            criteria.ToDate = commonService.ConvertClientToTimeToServerTime(criteria.ToDate);
            var redemptions = await baseService.GetDataAsync<RedemptionStatisticsEntity>(criteria);
            foreach (var redemption in redemptions)
            {
                redemption.ClaimTime = commonService.ConvertToClientDateTime(redemption.ClaimTime);
                redemption.Year = redemption.ClaimTime.Year;
                if (criteria.ReportBy != SummaryByYear)
                {
                    redemption.Month = redemption.ClaimTime.Month;
                }
            }
            var tuple = GetRedemptionAmount(redemptions.ToList());
            var fileName = string.Format(ViewResources.RedemptionStatistics_ExcelFile, fromDateFormat, toDateFormat);

            var bytes = excelService.ExportRedemptionStatisticsSumary(tuple.Item1, tuple.Item2, title, criteria.ReportBy);
            return File(bytes, MimeType.XLSX, $"{fileName}.xlsx");
        }

        [HttpPost]
        public async Task<IActionResult> ExportExcelDetails([FromBody] GetRedemptionStatisticsDetailCriteria criteria)
        {
            criteria.PageIndex = 1;
            criteria.FromDate = commonService.ConvertClientFromTimeToServerTime(criteria.FromDate);
            criteria.ToDate = commonService.ConvertClientToTimeToServerTime(criteria.ToDate);
            var details = await baseService.GetDataAsync<RedemptionStatisticsDetailEntity>(criteria);
            foreach (var detail in details)
            {
                detail.ClaimTime = commonService.ConvertToClientDateTime(detail.ClaimTime);
            }
            var bytes = excelService.ExportRedemptionStatisticsDetail(details);
            return File(bytes, MimeType.XLSX, $"{ViewResources.Redemption_Statistics_Detail_FileName}.xlsx");
        }

        private Tuple<IList<RedemptionStatisticsEntity>, IDictionary<string, decimal>> GetRedemptionAmount(IList<RedemptionStatisticsEntity> redemptions)
        {
            var redemtionGroupBy = redemptions.GroupBy(r => new { r.Month, r.Year, r.CurrencyId, r.Currency })
                .OrderByDescending(r => r.Key.Year).ThenByDescending(r => r.Key.Month);

            IDictionary<string, decimal> totalHash = new Dictionary<string, decimal>();
            IList<RedemptionStatisticsEntity> entities = new List<RedemptionStatisticsEntity>();
            foreach (var customGroup in redemtionGroupBy)
            {
                RedemptionStatisticsEntity entity = new RedemptionStatisticsEntity
                {
                    Month = customGroup.Key.Month,
                    Year = customGroup.Key.Year,
                    CurrencyId = customGroup.Key.CurrencyId,
                    Currency = customGroup.Key.Currency
                };

                foreach (var item in customGroup)
                {
                    entity.Amount += item.Amount;
                }
                if (!totalHash.ContainsKey(entity.Currency))
                {
                    totalHash.Add(entity.Currency, entity.Amount);
                }
                else
                {
                    totalHash[entity.Currency] += entity.Amount;
                }
                entities.Add(entity);
            }
            return new Tuple<IList<RedemptionStatisticsEntity>, IDictionary<string, decimal>>(entities, totalHash);
        }
    }
}