export interface Book {
  id: number;
  title: string;
  meetingDate: string;
  averageRating: number;
  ratings: {
    memberId: number;
    memberRating: number;
    memberName: string;
  }[]
}

export interface BookRatingDialogData {
  score: number;
}

export interface AddBookDialogData {
  title: string;
  meetingDate: string;
}