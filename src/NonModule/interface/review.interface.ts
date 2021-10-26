export interface review {
  id: number;
  rating: number;
  note: string;
  idStudent: number;
}

export interface newReview {
  rating: number;
  note: string;
  idStudent: number;
}

export interface editReview {
  id: number;
  rating: number;
  note: string;
}
