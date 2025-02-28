using System.Collections.Generic;
using System.Linq;

namespace CRM.Models.Report.LogStatistics;

public class LogStatisticsViewModel : BaseModel
{
    public IEnumerable<LogStatisticsMainCategory> MainCategories { get; set; } = new List<LogStatisticsMainCategory>();

    public IEnumerable<BaseModel> ProductColumns { get; set; } = new List<BaseModel>();

    public IEnumerable<BaseModel> CommunicationColumns { get; set; } = new List<BaseModel>();

    public IEnumerable<int> GrandTotalOfCommunicationCount
    {
        get
        {
            var sumOfCommunications =
                Enumerable.Repeat(0, ProductColumns.Count() * CommunicationColumns.Count()).ToList();
            foreach (var listOfCommunication in MainCategories.Select(x => x.ListOfCommunicationCount))
            {
                var totalListOfCommunications = listOfCommunication.Count();
                var listOfCommunicationCount = listOfCommunication;
                for (var i = 0; i < totalListOfCommunications; i++)
                {
                    sumOfCommunications[i] += listOfCommunicationCount.ElementAt(i);
                }
            }

            return sumOfCommunications;
        }
    }

    public IEnumerable<int> GrandTotalOfCommunicationSumByProduct
    {
        get
        {
            var sumOfCommunicationsByProduct =
                Enumerable.Repeat(0, ProductColumns.Count()).ToList();
            foreach (var lstOfCommunicationSumByProduct in MainCategories.Select(x => x.ListOfCommunicationSumByProduct))
            {
                var totalListOfCommunicationSumByProduct = lstOfCommunicationSumByProduct.Count();
                var listOfCommunicationSumByProduct = lstOfCommunicationSumByProduct;
                for (var i = 0; i < totalListOfCommunicationSumByProduct; i++)
                {
                    sumOfCommunicationsByProduct[i] += listOfCommunicationSumByProduct.ElementAt(i);
                }
            }

            return sumOfCommunicationsByProduct;
        }
    }

    public string ExcelFileName { get; set; }
}