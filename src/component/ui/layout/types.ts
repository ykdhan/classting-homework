import React from "react";

export type LayerType = {
  type: string;
  on: boolean;
  correct?: boolean;
}

export type LayoutProps = {
  center?: boolean;
  layer?: LayerType;
  className?: string;
  children?: React.ReactNode;
}