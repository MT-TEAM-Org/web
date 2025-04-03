export type ReportType =
  | "BOARD"
  | "NEWS"
  | "INQUIRY"
  | "NOTICE"
  | "IMPROVEMENT"
  | "COMMENT";
export type ReportReason =
  | "HARASSMENT"
  | "SEXUAL_CONTENT"
  | "POLITICAL_CONTENT"
  | "PROMOTIONAL_OR_ILLEGAL_ADS"
  | "ETC";

export interface ReportData {
  reportedPublicId: string;
  reportType: ReportType;
  reportedContentId: number;
  reasons: ReportReason;
}
