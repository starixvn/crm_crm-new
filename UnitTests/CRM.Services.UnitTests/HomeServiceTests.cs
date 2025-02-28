namespace CRM.Services.UnitTests;

using System.Collections.Generic;
using Fanex.NAP.Client.Models;
using Xunit;

public class HomeServiceTests
{
    [Fact]
    public void EditMenuLanguage_WhenCalled_ReturnExpectedResult()
    {
        // Arrange
        var menus = new List<MenuItem>
        {
            new()
            {
                Url = "/test",
                Name = "ChatTypeMapping"
            }
        };

        var expected = new List<MenuItem>
        {
            new()
            {
                Url = "/test",
                Name = "Chat Type Mapping"
            }
        };

        var service = GetService();

        // Act
        var actual = service.EditMenuLanguage(menus);

        // Assert
        Assert.Equal(expected[0].Name, actual[0].Name);
    }

    #region Helpers
    private HomeService GetService()
    {
        return new HomeService();
    }
    #endregion Helpers
}