namespace CRM.Criteria.Tests.Feedback;

using System.Collections.Generic;
using AutoFixture;
using CRM.Criteria.Feedback;
using CRM.Models.Feedback;
using Extensions.XML;
using Xunit;

public class CheckFeedbackDuplicationCriteriaTests
{
    private readonly IFixture fixture = new Fixture();

    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var command = new CheckFeedbackDuplicationCriteria();
        var expected = "Acc_CRM_FeedbackDoubleCheck";

        // Act
        var actual = command.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_ReturnTrue()
    {
        //Arrange
        var criteria = new CheckFeedbackDuplicationCriteria();

        //Act
        var actual = criteria.IsValid();

        //Assert
        Assert.True(actual);
    }

    [Fact]
    public void CategoryXml_CategoriesAreEmpty_ReturnEmpty()
    {
        // Arrange

        // Act
        var command = new CheckFeedbackDuplicationCriteria();

        // Assert
        Assert.Empty(command.CategoryXml);
    }

    [Fact]
    public void CategoryXml_CategoriesHaveData_ReturnAsExpected()
    {
        // Arrange
        var categories = fixture.Create<IEnumerable<CategorySubCategorySetting>>();

        // Act
        var command = new CheckFeedbackDuplicationCriteria
        {
            Categories = categories
        };

        // Assert
        Assert.Equal(categories.ToXML("ROOT").ToString(), command.CategoryXml);
    }
}