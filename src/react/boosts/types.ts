export interface BoostData {
  title: string;
  goalAmount: number;
  dateEnd: Date;
  why: string;
  what: string;
  about: string;
  items: BoostCostItem[];
}
export interface BoostCostItem {
  item: string;
  cost: number;
}
