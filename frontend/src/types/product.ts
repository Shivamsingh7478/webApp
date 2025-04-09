export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface CreateProductInput {
  name: string;
  description: string;
  category: string;
  price: number;
  rating?: number;
  imageUrl?: string;
}

export interface UpdateProductInput extends Partial<CreateProductInput> {
  id: string;
} 