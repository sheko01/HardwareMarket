export interface IReview {
  rating: number;
  comment: string;
  reviewerName: string;
  date: string;
}

export interface IProduct {
  id: number;
  title: string;
  price: number;
  categoryId?: number;
  category: string;
  description: string;
  thumbnail: string;
  images: string[];
  rating: number;
  stock: number;
  reviews: IReview[];
  showFullDesc?: boolean;
}
