export interface TEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  notes?: string;
  archived: boolean;
  category: "Work" | "Personal" | "Other";
}