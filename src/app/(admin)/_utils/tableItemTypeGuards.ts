import {
  InquiryTableRow,
  NoticeTableRow,
  ContentTableRow,
  DetailContentTableRow,
  SuggestionsTableRow,
  UserTableRow,
  UserDetailTableRow,
} from "../_type/DetailTable/DetailTableItem";

// TODO: any 타입 수정 필요

export const typeGuards = {
  inquiry: (row: any): row is InquiryTableRow =>
    "member" in row && "email" in row,
  notice: (row: any): row is NoticeTableRow =>
    "writer" in row && "title" in row && "content" in row,
  content: (row: any): row is ContentTableRow =>
    "isReport" in row &&
    "reportCount" in row &&
    "userStatus" in row &&
    "titleContent" in row,
  detailContent: (row: any): row is DetailContentTableRow =>
    "reportUser" in row &&
    "reportType" in row &&
    "reason" in row &&
    "reportDate" in row,
  suggestions: (row: any): row is SuggestionsTableRow =>
    "recommendations" in row && "nickname" in row && "importance" in row,
  user: (row: any): row is UserTableRow =>
    "userStatus" in row && 
    "nickname" in row && 
    "post" in row && 
    "comment" in row && 
    "getRecommendations" in row && 
    "getReportCount" in row && 
    "gender" in row && 
    "joinType" in row && 
    "email" in row && 
    "phone" in row,
  userDetail: (row: any): row is UserDetailTableRow =>
    "reportDate" in row &&
    "reportCount" in row &&
    "type" in row &&
    "titleContent" in row,
};