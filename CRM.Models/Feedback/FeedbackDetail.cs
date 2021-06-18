namespace CRM.Core.Models.Feedback
{
    using CRM.Core.Helpers;
    using System;
    using System.Collections.Generic;

    public class FeedbackDetail
    {
        public FeedbackDetail()
        {
            this.Settings = new List<SettingItems>();
        }

        public int FeedbackId { get; set; }

        public string Username { get; set; }

        public string CreatorName { get; set; }

        public DateTime FeedbackDate { get; set; }

        public string FeedbackDateString
        {
            get
            {
                return DateTimeUtilize.ChangeTimeZoneToClient(FeedbackDate);
            }
        }

        public DateTime ResolutionDate { get; set; }

        public DateTime CreateDate { get; set; }

        public string CreateDateString
        {
            get
            {
                return DateTimeUtilize.ChangeTimeZoneToClient(CreateDate);
            }
        }

        public DateTime SolveDate { get; set; }

        public string SolveDateString
        {
            get
            {
                return DateTimeUtilize.ChangeTimeZoneToClient(SolveDate);
            }
        }

        public int MainCategoryId { get; set; }

        public string MainCategory { get; set; }

        public int SubCategoryId { get; set; }

        public string SubCategory { get; set; }

        public int StatusId { get; set; }

        public string Status { get; set; }

        public bool IsReviewed { get; set; }

        public string ReviewerName { get; set; }

        public bool IsRelated { get; set; }

        public string Subject { get; set; }

        public string RelatedCustomer { get; set; }

        public bool IsChecked { get; set; }

        public List<SettingItems> Settings { get; set; }

        public string DurationTime
        {
            get
            {
                return ResolutionDate != DateTime.MinValue ? GetResolvingTime() : string.Empty;
            }
        }

        private string GetResolvingTime()
        {
            var totalDays = ResolutionDate - FeedbackDate;
            return string.Format(
                "{0}:{1}:{2}:{3}",
                totalDays.Days,
                totalDays.Hours,
                totalDays.Minutes,
                totalDays.Seconds);
        }
    }
}
