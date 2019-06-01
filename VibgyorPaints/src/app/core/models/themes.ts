import { Products } from './products';

export interface Themes {
  key: string;
  id: number;
  imageURL: string;
  name: string;
  price: number;
  isDeleted: boolean;
  material: Products[];
}
