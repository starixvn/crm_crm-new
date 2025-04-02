namespace CRM.Services.UnitTests.ExportExcel;

using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoFixture;
using Constants;
using CRM.Models.PicAndHeadline;
using CRM.Models.Setting;
using CRM.Resources;
using NSubstitute;
using OfficeOpenXml.Style;
using TestableClasses;
using Xunit;

public class PicAssignmentExcelTests
{
    private const byte RowStartHeader = 4;
    private const byte RowStartBody = 6;
    private const byte colIndexMergePic = 5;
    private const byte BaseColumnIndex = 10;
    private readonly int TotalColumns = BaseColumnIndex;
    private const byte StartComToolsIndex = 11;

    private readonly FakeExcelPackage excelPackage = new();
    private readonly IFixture fixture = new Fixture();

    [Fact]
    public void RenderTitle_WhenCalled_CopysTitleFromTemplate()
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
    public void RenderHeader_WhenCalled_ReturnExactColumnHeader()
    {
        // Arrange
        var templateWorksheet = excelPackage.Worksheets.Add("template");
        var worksheet = excelPackage.Worksheets.Add("data");
        var excel = CreateExcel();

        // Action
        excel.Public_RenderHeader(templateWorksheet, worksheet);

        // Assert
        Assert.Equal(templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, StartComToolsIndex - 1],
            worksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, StartComToolsIndex - 1]);
    }

    [Fact]
    public void RenderHeader_isRenderPicManagementIsTrue_ReturnExactColumnHeader()
    {
        // Arrange
        var templateWorksheet = excelPackage.Worksheets.Add("template");
        var worksheet = excelPackage.Worksheets.Add("data");
        var communicationTools = new List<Setting>
        {
            new()
            {
                SettingValue = "phone"
            }
        };
        var excel = CreateExcel(null, null, communicationTools, true);

        // Action
        excel.Public_RenderHeader(templateWorksheet, worksheet);

        // Assert
        Assert.Equal(templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, StartComToolsIndex - 1],
            worksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, StartComToolsIndex - 1]);
        Assert.Equal(ViewResources.CommunicationTool, worksheet.Cells[RowStartHeader, StartComToolsIndex].Value);
        Assert.True(worksheet.Cells[RowStartHeader, StartComToolsIndex, RowStartHeader, StartComToolsIndex + 1].Merge);
        Assert.Equal(communicationTools[0].SettingValue, worksheet.Cells[RowStartHeader + 1, StartComToolsIndex + 1].Value);
    }

    [Fact]
    public void RenderBody_HavingMergeHeadlineRowAndMergePic_WritesCellsCorrectly()
    {
        // Arrange
        var assignments = new List<PICAssignmentInfo>
        {
            new()
            {
                HeadlineID = 1,
                HeadlineName = "hl1",
                HeadlineType = "1",
                PicForMapping = "pic1",
                PicList = new List<PicModel>
                {
                    new() { PicId = 1, PicName = "test"}
                },
                Status = "Open",
                DirectAccount = "1",
                Site = "1",
                Currency = "1",
                Position = "1"
            },
            new()
            {
                HeadlineID = 2,
                HeadlineName = "hl2",
                HeadlineType = "2",
                PicForMapping = "pic1",
                PicList = new List<PicModel>
                {
                    new() { PicId = 1, PicName = "test"}
                },
                Status = "Open",
                DirectAccount = "1",
                Site = "1",
                Currency = "1",
                Position = "1"
            }
        };
        var rowNum = 1;
        int rowIndex = RowStartBody;
        var picCell = fixture.Create<string>();
        var commIncludeMergeHeadline = fixture.Create<IList<GroupAssignmentCommunication>>();
        var templateWorksheet = excelPackage.Worksheets.Add("template");
        var worksheet = excelPackage.Worksheets.Add("data");
        var MergePicGroupHeadlineIds = new List<int> { 1, 2 };
        var excel = CreateExcel(assignments, null, null, true);
        excel.Protected("GetIdMergePic", Arg.Any<IEnumerable<PICAssignmentInfo>>()).Returns(MergePicGroupHeadlineIds);
        excel.Protected("GetPicCell", Arg.Any<IEnumerable<PicModel>>()).Returns(picCell);
        excel.Protected("GetUniqueCommunicationToolsByPicModel", Arg.Any<List<PicModel>>()).Returns(commIncludeMergeHeadline);

        // Action
        excel.Public_RenderBody(templateWorksheet, worksheet);

        // Assert
        excel.Received().Protected("StyleDefault", worksheet);
        excel.Received(2).Protected("RenderCommunicationToolMergeCommon", templateWorksheet, worksheet, Arg.Any<int>(), Arg.Any<int>(), Arg.Any<List<GroupAssignmentCommunication>>());
        excel.Received().Protected("RenderBodyAssigment", templateWorksheet, worksheet, Arg.Any<List<PICAssignmentInfo>>(), Arg.Any<int>(), Arg.Any<int>());
        excel.Received().Protected("RenderDrawBorderCell", worksheet, Arg.Any<int>());
        excel.Received(9).Protected("StyleMergeCell", worksheet, Arg.Any<int>(), Arg.Any<int>(), Arg.Any<int>());
        excel.Received(2).Protected("RenderStatusRow", templateWorksheet, worksheet, Arg.Any<string>(), Arg.Any<int>(), Arg.Any<int>());
        excel.Received(4).Protected("GetPicCell", Arg.Any<IEnumerable<PicModel>>());
        Assert.Equal(worksheet.Cells[RowStartBody, colIndexMergePic].Value, picCell);
        foreach (var assignment in assignments)
        {
            var colMergeIndex = 1;
            var colNormalIndex = 6;
            Assert.Equal(worksheet.Cells[rowIndex, colMergeIndex++].Value, rowNum++);
            Assert.Equal(worksheet.Cells[rowIndex, colMergeIndex++].Value, assignment.HeadlineName);
            Assert.Equal(worksheet.Cells[rowIndex, colMergeIndex++].Value, assignment.HeadlineType);
            Assert.Equal(worksheet.Cells[rowIndex, colMergeIndex].Value, picCell);

            Assert.Equal(worksheet.Cells[rowIndex, colNormalIndex++].Value, assignment.DirectAccount);
            Assert.Equal(worksheet.Cells[rowIndex, colNormalIndex++].Value, assignment.Status);
            Assert.Equal(worksheet.Cells[rowIndex, colNormalIndex++].Value, assignment.Site);
            Assert.Equal(worksheet.Cells[rowIndex, colNormalIndex++].Value, assignment.Currency);
            Assert.Equal(worksheet.Cells[rowIndex, colNormalIndex].Value, assignment.Position);
            rowIndex++;
        }
    }

    [Fact]
    public void RenderBodyAssigment_HavingMergeHeadlineRowAndMergePic_WritesCellsCorrectly()
    {
        // Arrange
        var assignments = new List<PICAssignmentInfo>
        {
            new()
            {
                HeadlineID = 1,
                HeadlineName = "hl1",
                HeadlineType = "1",
                PicForMapping = "pic1",
                PicList = new List<PicModel>
                {
                    new() { PicId = 1, PicName = "test"}
                },
                Status = "Open",
                DirectAccount = "1",
                Site = "1",
                Currency = "1",
                Position = "1"
            },
            new()
            {
                HeadlineID = 2,
                HeadlineName = "hl2",
                HeadlineType = "2",
                PicForMapping = "pic1",
                PicList = new List<PicModel>
                {
                    new() { PicId = 1, PicName = "test"}
                },
                Status = "Open",
                DirectAccount = "1",
                Site = "1",
                Currency = "1",
                Position = "1"
            }
        };
        var rowNum = 1;
        int rowIndex = RowStartBody;
        var picCell = fixture.Create<string>();
        var comm = fixture.Create<List<GroupAssignmentCommunication>>();
        var templateWorksheet = excelPackage.Worksheets.Add("template");
        var worksheet = excelPackage.Worksheets.Add("data");
        var groupByPic = new List<GroupHeadlineOfPic>
        {
            new()
            {
                GroupHeadlineId = 1,
                GroupHeadline = "hl1",
                HeadlineType = "hltype1",
                DefaultPIC = new List<PicModel>
                {
                    new() { PicId = 1, PicName = "test"}
                },
                Pics = new List<PicOfDirectAccount>
                {
                    new()
                    {
                        Pic = new List<PicModel>
                        {
                            new() { PicId = 1, PicName = "test"}
                        },
                        DirectAccounts = new List<DirectAccountInfo>
                        {
                            new()
                            {
                                Status = "Open",
                                DirectAccount = "1",
                                Site = "1",
                                Currency = "1",
                                Position = "1"
                            }
                        }
                    }
                }
            }
        };
        var excel = CreateExcel(assignments, null, null, true);
        excel.Protected("GroupByMergePic", Arg.Any<IEnumerable<PICAssignmentInfo>>()).Returns(groupByPic);
        excel.Protected("GetPicCell", Arg.Any<IEnumerable<PicModel>>()).Returns(picCell);
        excel.Protected("GetUniqueCommunicationTools", Arg.Any<IEnumerable<PicOfDirectAccount>>()).Returns(comm);

        // Action
        excel.Public_RenderBodyAssigment(templateWorksheet, worksheet, assignments, 1, 6, 1);

        // Assert
        excel.Received().Protected("RenderDrawBorderCell", worksheet, Arg.Any<int>());
        excel.Received(5).Protected("StyleMergeCell", worksheet, Arg.Any<int>(), Arg.Any<int>(), Arg.Any<int>());
        excel.Received(1).Protected("RenderStatusRow", templateWorksheet, worksheet, Arg.Any<string>(), Arg.Any<int>(), Arg.Any<int>());
        excel.Received(2).Protected("GetPicCell", Arg.Any<IEnumerable<PicModel>>());
        foreach (var assignment in groupByPic)
        {
            var colMergeIndex = 1;
            Assert.Equal(worksheet.Cells[rowIndex, colMergeIndex++].Value, rowNum++);
            Assert.Equal(worksheet.Cells[rowIndex, colMergeIndex++].Value, assignment.GroupHeadline);
            Assert.Equal(worksheet.Cells[rowIndex, colMergeIndex++].Value, assignment.HeadlineType);
            Assert.Equal(worksheet.Cells[rowIndex, colMergeIndex++].Value, picCell);
            Assert.Equal(worksheet.Cells[rowIndex, colMergeIndex++].Value, picCell);
            Assert.Equal(worksheet.Cells[rowIndex, colMergeIndex++].Value, assignment.Pics.FirstOrDefault().DirectAccounts.FirstOrDefault().DirectAccount);
            Assert.Equal(worksheet.Cells[rowIndex, colMergeIndex++].Value, assignment.Pics.FirstOrDefault().DirectAccounts.FirstOrDefault().Status);
            Assert.Equal(worksheet.Cells[rowIndex, colMergeIndex++].Value, assignment.Pics.FirstOrDefault().DirectAccounts.FirstOrDefault().Site);
            Assert.Equal(worksheet.Cells[rowIndex, colMergeIndex++].Value, assignment.Pics.FirstOrDefault().DirectAccounts.FirstOrDefault().Currency);
            Assert.Equal(worksheet.Cells[rowIndex, colMergeIndex].Value, assignment.Pics.FirstOrDefault().DirectAccounts.FirstOrDefault().Position);
            rowIndex++;
        }
    }

    [Theory]
    [InlineData("Closed", 7)]
    [InlineData("Suspended", 8)]
    [InlineData("Disabled", 9)]
    public void GetTemplateRowIndex_WhenCalledWithClosed_ReturnsRowClosed(string status, int expect)
    {
        // Arrange
        var excel = CreateExcel();

        // Action
        var result = excel.Public_GetTemplateRowIndex(status);

        // Assert
        Assert.Equal(expect, result);
    }

    [Theory]
    [InlineData(0, false)]
    [InlineData(2, true)]
    public void RenderCommunicationToolMergeCommon_NotRightCondition_ExpectedNotRenderCommunicationTools(int countComm, bool isRenderPicManagement)
    {
        // Arrange
        var templateWorksheet = excelPackage.Worksheets.Add("template");
        var worksheet = excelPackage.Worksheets.Add("data");
        var commIncludeMergeHeadline = new List<GroupAssignmentCommunication>
        {
            new()
            {
                PicName = "test"
            }
        };

        var excel = CreateExcel(null, null, null, isRenderPicManagement);

        // Action
        excel.Public_RenderCommunicationToolMergeCommon(templateWorksheet, worksheet, 1, countComm, commIncludeMergeHeadline);

        // Assert
        excel.DidNotReceive().Protected("RenderCommunicationTools", templateWorksheet, worksheet, 1, Arg.Any<GroupAssignmentCommunication>());
    }

    [Fact]
    public void RenderCommunicationToolMergeCommon_RightCondition_ExpectedRenderCommunicationTools()
    {
        // Arrange
        var templateWorksheet = excelPackage.Worksheets.Add("template");
        var worksheet = excelPackage.Worksheets.Add("data");
        var commIncludeMergeHeadline = new List<GroupAssignmentCommunication>
        {
            new()
            {
                PicName = "test"
            }
        };

        var excel = CreateExcel(null, null, null, true);

        // Action
        excel.Public_RenderCommunicationToolMergeCommon(templateWorksheet, worksheet, 1, 0, commIncludeMergeHeadline);

        // Assert
        excel.Received().Protected("RenderCommunicationTools", templateWorksheet, worksheet, 1, Arg.Any<GroupAssignmentCommunication>());
    }

    [Fact]
    public void GetIdMergePic_WhenCalled_ExpectedReturnIdsMergePic()
    {
        // Arrange
        var assignments = new List<PICAssignmentInfo>
        {
            new()
            {
                HeadlineID = 1,
                HeadlineName = "hl1",
                HeadlineType = "1",
                PicForMapping = "pic1"
            },
            new()
            {
                HeadlineID = 2,
                HeadlineName = "hl2",
                HeadlineType = "2",
                PicForMapping = "pic1"
            }
        };
        var expected = new List<int> { 1, 2 };
        var excel = CreateExcel(assignments);

        // Action
        var actual = excel.Public_GetIdMergePic(assignments);

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void RenderCommunicationTools_isRenderPicManagementAnDataNotNull_ExpectedRenderCommunicationToolsRow()
    {
        // Arrange
        var templateWorksheet = excelPackage.Worksheets.Add("template");
        var worksheet = excelPackage.Worksheets.Add("data");
        var communicationTools = new List<Setting>
        {
            new()
            {
                SettingValue = "phone"
            }
        };
        var comm = new GroupAssignmentCommunication
        {
            PicName = "PicName",
            ListComm = new List<AssignmentCommunication>
            {
                new()
                {
                    CommunicationTool = "phone",
                    CommunicationValue = "CommunicationValue"
                }
            }
        };

        var excel = CreateExcel(null, null, communicationTools, true);

        // Action
        excel.Public_RenderCommunicationTools(templateWorksheet, worksheet, 1, comm);

        // Assert
        Assert.Equal("PicName", worksheet.Cells[1, StartComToolsIndex].Value);
        Assert.Equal("CommunicationValue", worksheet.Cells[1, StartComToolsIndex + 1].Value);
    }

    [Fact]
    public void RenderCommunicationTools_CommunicationToolIsNotEqual_ExpectedRenderCommunicationToolsRowEmpty()
    {
        // Arrange
        var templateWorksheet = excelPackage.Worksheets.Add("template");
        var worksheet = excelPackage.Worksheets.Add("data");
        var communicationTools = new List<Setting>
        {
            new()
            {
                SettingValue = "phone"
            }
        };
        var comm = new GroupAssignmentCommunication
        {
            PicName = "test",
            ListComm = new List<AssignmentCommunication>
            {
                new()
                {
                    CommunicationTool = "letsTalk"
                }
            }
        };

        var excel = CreateExcel(null, null, communicationTools, true);

        // Action
        excel.Public_RenderCommunicationTools(templateWorksheet, worksheet, 1, comm);

        // Assert
        Assert.Equal("", worksheet.Cells[1, StartComToolsIndex + 1].Value);
    }

    [Fact]
    public void GetUniqueCommunicationToolsByPicModel_WhenCalled_ExpectReturnExactData()
    {
        // Arrange
        var picModels = new List<PicModel>
        {
            new()
            {
                PicId = 1
            }
        };
        var groupAssignmentCommunications = new List<GroupAssignmentCommunication>
        {
            new()
            {
                PicId = 1
            }
        };

        var excel = CreateExcel(null, groupAssignmentCommunications, null, true);

        // Action
        var actual = excel.Public_GetUniqueCommunicationToolsByPicModel(picModels);

        // Assert
        Assert.Equal(groupAssignmentCommunications, actual);
    }

    [Fact]
    public void GetUniqueCommunicationToolsByPicModel_ModelsNotEqualGroupAssignment_ExpectReturnNull()
    {
        // Arrange
        var picModels = new List<PicModel>
        {
            new()
            {
                PicId = 2
            }
        };
        var groupAssignmentCommunications = new List<GroupAssignmentCommunication>
        {
            new()
            {
                PicId = 1
            }
        };
        var expect = new List<GroupAssignmentCommunication>();

        var excel = CreateExcel(null, groupAssignmentCommunications, null, true);

        // Action
        var actual = excel.Public_GetUniqueCommunicationToolsByPicModel(picModels);

        // Assert
        Assert.Equal(expect, actual);
    }

    [Fact]
    public void GetUniqueCommunicationTools_headlinePicNull_ExpectReturnNull()
    {
        // Arrange
        var headlinePic = new List<PicOfDirectAccount>();
        var excel = CreateExcel(null, null, null, true);
        var expected = Enumerable.Empty<GroupAssignmentCommunication>();

        // Act
        var actual = excel.Public_GetUniqueCommunicationTools(headlinePic);

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void GetUniqueCommunicationTools_headlinePicNotNull_ExpectReturnExactData()
    {
        // Arrange
        var headlinePic = new List<PicOfDirectAccount>
        {
            new()
            {
                Pic = new List<PicModel>
                {
                    new() { PicName = "test"}
                }
            }
        };

        var groupAssignmentCommunications = new List<GroupAssignmentCommunication>
        {
            new()
            {
                PicName = "test"
            }
        };

        var excel = CreateExcel(null, groupAssignmentCommunications, null, true);

        // Action
        var actual = excel.Public_GetUniqueCommunicationTools(headlinePic);

        // Assert
        Assert.Equal(groupAssignmentCommunications, actual);
    }

    [Fact]
    public void StyleMergeCell_WhenCalled_StylesCorrectly()
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
            ExcelHorizontalAlignment.Center,
            worksheet.Cells[startRow, colIndex, endRow, colIndex].Style.HorizontalAlignment
        );
    }

    [Fact]
    public void GetPicCell_WhenCalledWithNull_ReturnsNullCharacter()
    {
        // Arrange
        var excel = CreateExcel();

        // Action
        var result = excel.Public_GetPicCell(null);

        // Assert
        Assert.Equal(string.Empty, result);
    }

    [Fact]
    public void GetPicCell_WhenCalledWithEmptyList_ReturnsNullCharacter()
    {
        // Arrange
        var excel = CreateExcel();

        // Action
        var result = excel.Public_GetPicCell(new List<PicModel>());

        // Assert
        Assert.Equal(string.Empty, result);
    }

    [Fact]
    public void GetPicCell_WhenCalledWithNotEmptyList_ReturnsExpected()
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

    private PicAssignmentExcelTestable CreateExcel(IEnumerable<PICAssignmentInfo> assignments = null,
        IEnumerable<GroupAssignmentCommunication> groupAssignmentCommunications = null,
        IEnumerable<Setting> communicationTools = null,
        bool isRenderPicManagement = false)
    {
        var excel = Substitute.For<PicAssignmentExcelTestable>(string.Empty, assignments,
            groupAssignmentCommunications,
            communicationTools,
            isRenderPicManagement
        );
        return excel;
    }

    #endregion Helpers
}