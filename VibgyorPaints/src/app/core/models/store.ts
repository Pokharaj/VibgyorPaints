export interface City {
  id: number;
  name: string;
}

export interface Store {
  id: number;
  city: City;
  storeName: string;
  address: string;
  deleted: boolean;
}
