export interface Store {
  city: string;
  storeName: string;
  address: string;
  index: string;
  deleted: boolean;
}

export interface StoreResolved {
  stores: Store[];
  cities: string[];
  error?: any;
}
