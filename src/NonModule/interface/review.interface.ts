export interface review {
  id: number;
  rating: number;
  note: string;
  idStudent: number;
  idClass: number;
}

export interface newReview {
  rating: number;
  note: string;
  idStudent: number;
  idClass: number;
}

export interface editReview {
  id: number;
  rating: number;
  note: string;
}
