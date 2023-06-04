import {Activity} from "@app/activity";
import {Sex} from "@app/sex";

export interface Results extends Record<string, ResultRecord> {}

export interface ResultRecord {
  value: number,
  description: string
}
