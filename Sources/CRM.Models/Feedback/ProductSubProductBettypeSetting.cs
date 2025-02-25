namespace CRM.Models.Feedback
{
    using System;
    using CRM.Core.Extensions.XML;

    [Serializable]
    [XMLName("Product")]
    public class ProductSubProductBettypeSetting
    {
        [XMLName("ProductID")]
        public int ProductId { get; set; }

        [XMLName("SubProductID")]
        public int SubProductId { get; set; }

        [XMLName("BetTypeID")]
        public int BettypeId { get; set; }
    }
}