import React, { ReactNode } from "react";

export const SuccessIcon = (): ReactNode => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18 13.968 13.968 18 9 18C4.032 18 0 13.968 0 9Z"
      fill="white"
    />
    <path
      d="M4.5 9.67502L6.6375 11.8125L13.05 5.40002"
      stroke="#009AD4"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const InfoIcon = (): ReactNode => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse cx="10" cy="10" rx="9" ry="9" stroke="#303030" strokeWidth="2" />
    <path
      d="M10.9375 5.9375C10.9375 6.45527 10.5178 6.875 10 6.875C9.48223 6.875 9.0625 6.45527 9.0625 5.9375C9.0625 5.41973 9.48223 5 10 5C10.5178 5 10.9375 5.41973 10.9375 5.9375Z"
      fill="#303030"
    />
    <path
      d="M9.0625 9.0625C9.0625 8.54473 9.48223 8.125 10 8.125C10.5178 8.125 10.9375 8.54473 10.9375 9.0625V14.0625C10.9375 14.5803 10.5178 15 10 15C9.48223 15 9.0625 14.5803 9.0625 14.0625V9.0625Z"
      fill="#303030"
    />
  </svg>
);

export const WarningIcon = (): ReactNode => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.225 15.8875L15.8875 4.225M10 1C5.032 1 1 5.032 1 10C1 14.968 5.032 19 10 19C14.968 19 19 14.968 19 10C19 5.032 14.968 1 10 1Z"
      stroke="#D1504B"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const ErrorIcon = (): ReactNode => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.225 15.8875L15.8875 4.225M10 1C5.032 1 1 5.032 1 10C1 14.968 5.032 19 10 19C14.968 19 19 14.968 19 10C19 5.032 14.968 1 10 1Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
