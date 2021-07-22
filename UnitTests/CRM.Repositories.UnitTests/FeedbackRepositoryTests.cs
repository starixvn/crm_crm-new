namespace CRM.Repositories.UnitTests
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.Models.Feedback;
    using Fanex.Data;
    using Fanex.Data.Repository;
    using NSubstitute;
    using Xunit;

    public class FeedbackRepositoryTests
    {
        private readonly IObjectDb objectDb;

        public FeedbackRepositoryTests()
        {
            DbSettingProviderManager
            .StartTestingSession()
            .Run();

            objectDb = Substitute.For<IObjectDb>();
            ObjectDbFactory.Mock((key, time) => objectDb);
        }

        [Fact]
        public async Task GetDeletedFeedbackAsync_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var repository = new FeedbackRepository();
            var criteria = Substitute.For<ICriteria>();
            var feedbacks = new List<DeletedFeedback>
            {
                new DeletedFeedback{ FeedbackId = 1 }
            };
            var settings = new List<FeedbackSettingRelation>
            {
                new FeedbackSettingRelation { FeedbackId = 1 },
                new FeedbackSettingRelation { FeedbackId = 2 }
            };
            var multi = Substitute.For<IMultiResultReader>();
            multi.Read<DeletedFeedback>().Returns(feedbacks);
            multi.Read<FeedbackSettingRelation>().Returns(settings);
            objectDb.QueryMultipleAsync(criteria).Returns(multi);

            // Act
            var actual = await repository.GetDeletedFeedbackAsync(criteria);

            // Assert
            Assert.Equal(feedbacks, actual);

            Assert.Collection(actual,
                item =>
                {
                    Assert.Single(item.Settings);
                    Assert.Collection(item.Settings,
                        setting =>
                        {
                            Assert.Equal(settings[0], setting);
                        });
                });
        }
    }
}