namespace CRM.Enum;

using System.ComponentModel;

public enum FeedbackRating
{
    [Description("N/A")]
    NA = 0,

    [Description("Very Poor")]
    VeryPoor = 1,

    [Description("Poor")]
    Poor = 2,

    [Description("Neutral")]
    Neutral = 3,

    [Description("Good")]
    Good = 4,

    [Description("Excellent")]
    Excellent = 5
}