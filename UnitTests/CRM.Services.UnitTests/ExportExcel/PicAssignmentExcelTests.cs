namespace CRM.Services.UnitTests.ExportExcel
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using AutoFixture;
    using CRM.Core.Constants;
    using CRM.Core.Enumerables;
    using CRM.Models.PicAndHeadline;
    using NSubstitute;
    using OfficeOpenXml;
    using Xunit;

    public class PicAssignmentExcelTests
    {
        private const byte RowStartHeader = 4;
        private const byte RowStartBody = 5;
        private const byte RowClosed = 6;
        private const byte RowSuspended = 7;
        private const byte RowDisabled = 8;
        private const byte TotalColumns = 10;
        private readonly FakeExcelPackage excelPackage = new FakeExcelPackage();
        private readonly IFixture fixture = new Fixture();

        [Fact]
        public void Public_RenderTitleAndHeader_WhenCalled_CopysTitleFromTemplate()
        {
            // Arrange
            var templateWorksheet = excelPackage.Worksheets.Add("template");
            var worksheet = excelPackage.Worksheets.Add("data");
            var excel = CreateExcel();

            // Action
            excel.Public_RenderTitle(templateWorksheet, worksheet);

            // Assert
            Assert.Equal(templateWorksheet.Cells[1, 1, RowStartHeader - 1, TotalColumns], worksheet.Cells[1, 1, RowStartHeader - 1, TotalColumns]);
        }

        [Fact]
        public void Public_RenderHeader_WhenCalled_CopysHeaderFromTemplate()
        {
            // Arrange
            var templateWorksheet = excelPackage.Worksheets.Add("template");
            var worksheet = excelPackage.Worksheets.Add("data");
            var excel = CreateExcel();

            // Action
            excel.Public_RenderHeader(templateWorksheet, worksheet);

            // Assert
            Assert.Equal(templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader, TotalColumns], worksheet.Cells[RowStartHeader, 1, RowStartHeader, TotalColumns]);
        }

        [Fact]
        public void Public_RenderBody_HavingMergeHeadlineRowAndMergePic_WritesCellsCorrectly()
        {
            // Arrange
            var colMergeIndex = 2;
            var colNormalIndex = 6;
            var assignment = fixture.Create<PICAssignmentInfo>();
            var picCell = fixture.Create<string>();
            var templateWorksheet = excelPackage.Worksheets.Add("template");
            var worksheet = excelPackage.Worksheets.Add("data");
            var excel = CreateExcel(new List<PICAssignmentInfo> { assignment });
            excel.Protected("GetTemplateRowIndex", Arg.Any<string>()).Returns(RowStartBody);
            excel.Protected("GetPicCell", Arg.Any<IEnumerable<PicModel>>()).Returns(picCell);

            // Action
            excel.Public_RenderBody(templateWorksheet, worksheet);

            // Assert
            excel.Received(4).Protected("StyleMergeCell", worksheet, Arg.Any<int>(), Arg.Any<int>(), Arg.Any<int>());
            excel.Received(1).Protected("GetTemplateRowIndex", Arg.Any<string>());
            excel.Received(2).Protected("GetPicCell", Arg.Any<IEnumerable<PicModel>>());
            Assert.Equal(worksheet.Cells[RowStartBody, colMergeIndex++].Value, assignment.HeadlineName);
            Assert.Equal(worksheet.Cells[RowStartBody, colMergeIndex++].Value, assignment.HeadlineType);
            Assert.Equal(worksheet.Cells[RowStartBody, colMergeIndex++].Value, picCell);
            Assert.Equal(worksheet.Cells[RowStartBody, colMergeIndex].Value, picCell);
            Assert.Equal(worksheet.Cells[RowStartBody, colNormalIndex++].Value, assignment.DirectAccount);
            Assert.Equal(worksheet.Cells[RowStartBody, colNormalIndex++].Value, assignment.Status);
            Assert.Equal(worksheet.Cells[RowStartBody, colNormalIndex++].Value, assignment.Site);
            Assert.Equal(worksheet.Cells[RowStartBody, colNormalIndex++].Value, assignment.Currency);
            Assert.Equal(worksheet.Cells[RowStartBody, colNormalIndex].Value, assignment.Position);
        }

        [Fact]
        public void Public_RenderBody_HavingMergePicOnly_WritesCellsCorrectly()
        {
            // Arrange
            var colNormalIndex = 6;
            var assignment1 = fixture.Create<PICAssignmentInfo>();
            var assignment2 = fixture.Create<PICAssignmentInfo>();
            assignment2.HeadlineID = assignment1.HeadlineID;
            var picCell = fixture.Create<string>();
            var templateWorksheet = excelPackage.Worksheets.Add("template");
            var worksheet = excelPackage.Worksheets.Add("data");
            var excel = CreateExcel(new List<PICAssignmentInfo> { assignment1, assignment2 });
            excel.Protected("GetTemplateRowIndex", Arg.Any<string>()).Returns(RowStartBody);
            excel.Protected("GetPicCell", Arg.Any<IEnumerable<PicModel>>()).Returns(picCell);

            // Action
            excel.Public_RenderBody(templateWorksheet, worksheet);

            // Assert
            excel.Received(5).Protected("StyleMergeCell", worksheet, Arg.Any<int>(), Arg.Any<int>(), Arg.Any<int>());
            excel.Received(2).Protected("GetTemplateRowIndex", Arg.Any<string>());
            excel.Received(3).Protected("GetPicCell", Arg.Any<IEnumerable<PicModel>>());
            Assert.Equal(worksheet.Cells[RowStartBody + 1, colNormalIndex - 1].Value, picCell);
            Assert.Equal(worksheet.Cells[RowStartBody + 1, colNormalIndex++].Value, assignment2.DirectAccount);
            Assert.Equal(worksheet.Cells[RowStartBody + 1, colNormalIndex++].Value, assignment2.Status);
            Assert.Equal(worksheet.Cells[RowStartBody + 1, colNormalIndex++].Value, assignment2.Site);
            Assert.Equal(worksheet.Cells[RowStartBody + 1, colNormalIndex++].Value, assignment2.Currency);
            Assert.Equal(worksheet.Cells[RowStartBody + 1, colNormalIndex].Value, assignment2.Position);
        }

        [Fact]
        public void Public_RenderBody_HavingRowWithoutMerge_WritesCellsCorrectly()
        {
            // Arrange
            var colNormalIndex = 6;
            var assignment1 = fixture.Create<PICAssignmentInfo>();
            var assignment2 = fixture.Create<PICAssignmentInfo>();
            assignment2.HeadlineID = assignment1.HeadlineID;
            var assignment3 = fixture.Create<PICAssignmentInfo>();
            assignment3.HeadlineID = assignment1.HeadlineID;
            assignment3.PicForMapping = assignment2.PicForMapping;
            var picCell = fixture.Create<string>();
            var templateWorksheet = excelPackage.Worksheets.Add("template");
            var worksheet = excelPackage.Worksheets.Add("data");
            var excel = CreateExcel(new List<PICAssignmentInfo> { assignment1, assignment2, assignment3 });
            excel.Protected("GetTemplateRowIndex", Arg.Any<string>()).Returns(RowStartBody);
            excel.Protected("GetPicCell", Arg.Any<IEnumerable<PicModel>>()).Returns(picCell);

            // Action
            excel.Public_RenderBody(templateWorksheet, worksheet);

            // Assert
            excel.Received(5).Protected("StyleMergeCell", worksheet, Arg.Any<int>(), Arg.Any<int>(), Arg.Any<int>());
            excel.Received(3).Protected("GetTemplateRowIndex", Arg.Any<string>());
            excel.Received(3).Protected("GetPicCell", Arg.Any<IEnumerable<PicModel>>());
            Assert.Equal(worksheet.Cells[RowStartBody + 2, colNormalIndex++].Value, assignment3.DirectAccount);
            Assert.Equal(worksheet.Cells[RowStartBody + 2, colNormalIndex++].Value, assignment3.Status);
            Assert.Equal(worksheet.Cells[RowStartBody + 2, colNormalIndex++].Value, assignment3.Site);
            Assert.Equal(worksheet.Cells[RowStartBody + 2, colNormalIndex++].Value, assignment3.Currency);
            Assert.Equal(worksheet.Cells[RowStartBody + 2, colNormalIndex].Value, assignment3.Position);
        }

        [Fact]
        public void Public_GetTemplateRowIndex_WhenCalledWithClosed_ReturnsRowClosed()
        {
            // Arrange
            var excel = CreateExcel();

            // Action
            var result = excel.Public_GetTemplateRowIndex(CustomerStatus.Closed.ToString());

            // Assert
            Assert.Equal(RowClosed, result);
        }

        [Fact]
        public void Public_GetTemplateRowIndex_WhenCalledWithSuspended_ReturnsRowSuspended()
        {
            // Arrange
            var excel = CreateExcel();

            // Action
            var result = excel.Public_GetTemplateRowIndex(CustomerStatus.Suspended.ToString());

            // Assert
            Assert.Equal(RowSuspended, result);
        }

        [Fact]
        public void Public_GetTemplateRowIndex_WhenCalledWithDisabled_ReturnsRowDisabled()
        {
            // Arrange
            var excel = CreateExcel();

            // Action
            var result = excel.Public_GetTemplateRowIndex(CustomerStatus.Disabled.ToString());

            // Assert
            Assert.Equal(RowDisabled, result);
        }

        [Fact]
        public void Public_GetTemplateRowIndex_WhenCalledWithNotSpecificStatus_ReturnsRowStartBody()
        {
            // Arrange
            var status = fixture.Create<string>();
            var excel = CreateExcel();

            // Action
            var result = excel.Public_GetTemplateRowIndex(status);

            // Assert
            Assert.Equal(RowStartBody, result);
        }

        [Fact]
        public void Public_StyleMergeCell_WhenCalled_StylesCorrectly()
        {
            // Arrange
            const int startRow = 1;
            const int colIndex = 10;
            const int endRow = 1;
            var worksheet = excelPackage.Worksheets.Add("data");
            var excel = CreateExcel();

            // Action
            excel.Public_StyleMergeCell(worksheet, startRow, colIndex, endRow);

            // Assert
            Assert.True(worksheet.Cells[startRow, colIndex, endRow, colIndex].Merge);
            Assert.Equal(
                OfficeOpenXml.Style.ExcelVerticalAlignment.Center,
                worksheet.Cells[startRow, colIndex, endRow, colIndex].Style.VerticalAlignment
            );
            excel.Received(1).Protected("DrawBorderCell", Arg.Any<ExcelRange>());
        }

        [Fact]
        public void Public_GetPicCell_WhenCalledWithNull_ReturnsNullCharacter()
        {
            // Arrange
            var excel = CreateExcel();

            // Action
            var result = excel.Public_GetPicCell(null);

            // Assert
            Assert.Equal(ExcelCharacter.NullCharacter, result);
        }

        [Fact]
        public void Public_GetPicCell_WhenCalledWithEmptyList_ReturnsNullCharacter()
        {
            // Arrange
            var excel = CreateExcel();

            // Action
            var result = excel.Public_GetPicCell(new List<PicModel>());

            // Assert
            Assert.Equal(ExcelCharacter.NullCharacter, result);
        }

        [Fact]
        public void Public_GetPicCell_WhenCalledWithNotEmptyList_ReturnsExpected()
        {
            // Arrange
            var picList = fixture.Create<IEnumerable<PicModel>>();
            var excel = CreateExcel();
            var buffer = new StringBuilder();
            var last = picList.Last();
            foreach (var pic in picList)
            {
                var endCharacter = last == pic ? string.Empty : ExcelCharacter.NewLineCharacter;
                buffer.Append($"{pic.PicName} ({pic.Role}){endCharacter}");
            }

            // Action
            var result = excel.Public_GetPicCell(picList);

            // Assert
            Assert.Equal(buffer.ToString(), result);
        }

        #region Helpers

        private PicAssignmentExcelTestable CreateExcel(IEnumerable<PICAssignmentInfo> assignments = null)
        {
            var excel = Substitute.For<PicAssignmentExcelTestable>(string.Empty, assignments);
            return excel;
        }

        #endregion Helpers
    }
}