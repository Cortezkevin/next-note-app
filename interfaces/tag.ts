export type TagColor = "default" | "error" | "primary" | "secondary" | "info" | "success" | "warning";

export interface ITag {
  _id?: string;
  name: string;
  color?: TagColor;
}