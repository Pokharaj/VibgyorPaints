import { Product } from './product';

export interface Theme {
  id: number;
  themeName: string;
  imageUrl: string;
  deleted: boolean;
  materials: Product[];
}
