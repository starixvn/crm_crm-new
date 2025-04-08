namespace CRM.Criteria.Feedback.MultipleLogs;

using System;
using System.Collections.Generic;
using System.Linq;
using CRM.Models.Feedback;
using Extensions.XML;
using Fanex.Data;
using Models;

public class EditMultipleLogsCommand : BaseNonQueryCommand
{
    public string ListFeedbackId { get; set; }

    public int UserId { get; set; }

    public int CountryId { get; set; }

    public bool IsUpdateCountryId { get; set; }

    public int SiteId { get; set; }

    public bool IsUpdateSiteId { get; set; }

    public string Subject { get; set; }

    public bool IsUpdateSubject { get; set; }

    public int LanguageId { get; set; }

    public bool IsUpdateLanguageID { get; set; }

    public int UpdateReviewedMode { get; set; }

    public DateTime FeedbackDate { get; set; }

    public bool IsUpdateFeedbackDate { get; set; }

    public DateTime ResolutionDate { get; set; }

    public bool IsUpdateResolutionDate { get; set; }

    [SpParam(AllowNull = true)]
    public DateTime? FirstResponseTime { get; set; }

    public bool IsUpdateFirstResponseTime { get; set; }

    public string CommunicationId { get; set; }

    public bool IsUpdateCommunicationId { get; set; }

    public string StationId { get; set; }

    public bool IsUpdateStationId { get; set; }

    public int RoleId { get; set; }

    public bool IsUpdateRoleId { get; set; }

    public int ResponseId { get; set; }

    public bool IsUpdateResponseId { get; set; }

    public int StatusId { get; set; }

    public bool IsUpdateStatusId { get; set; }

    public string Description { get; set; }

    public bool IsUpdateDescription { get; set; }

    public string Solution { get; set; }

    public bool IsUpdateSolution { get; set; }

    public int LicenseeType { get; set; }

    public bool IsUpdateLicenseeType { get; set; }

    public bool IsReviewed { get; set; }

    public string Review { get; set; }

    public bool IsUpdateReview { get; set; }

    public string AutoField { get; set; }

    public bool IsUpdateAutoField { get; set; }

    [SpParam(Ignored = true)]
    public IEnumerable<ProductSubProductBettypeSetting> Products { get; set; } = new List<ProductSubProductBettypeSetting>();

    [SpParam(SqlParamName = "product")]
    public string ProductXml => Products.Any() ? Products.ToXML("ROOT").ToString() : string.Empty;

    public bool IsUpdateProduct { get; set; }

    [SpParam(Ignored = true)]
    public IEnumerable<CategorySubCategorySetting> Categories { get; set; } = new List<CategorySubCategorySetting>();

    [SpParam(SqlParamName = "category")]
    public string CategoryXml => Categories.Any() ? Categories.DistinctBy(x => new { x.MainCategoryId, x.SubCategoryId }).ToXML("ROOT").ToString() : string.Empty;

    public bool IsUpdateCategory { get; set; }

    public int ReviewerId { get; set; }

    public bool IsUpdateNoInquiries { get; set; }

    public int NoInquiries { get; set; }

    public bool IsUpdateRating { get; set; }

    public int Rating { get; set; }

    public string IP { get; set; }

    public override string GetSettingKey() => "Acc_CRM_GuestFeedbackUpd_Multiple";

    public override bool IsValid() => true;
}