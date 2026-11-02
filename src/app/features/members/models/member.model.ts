import { MembersRating } from "./members-rating.model";

export interface Member {
  id: number;   
  name: string;
  averageRating: number;
  ratings: MembersRating[];
}
export type MemberSortField = 'name'
  | 'averageRating';

export type SortDirection = 'asc' | 'desc';

export interface MemberSort {
  field: MemberSortField;
  direction: SortDirection;
}