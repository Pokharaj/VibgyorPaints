import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Product } from '../models/product';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(environment.DATA_URL + 'products');
  }

  getProduct(id: number) {
    return this.http.get(environment.DATA_URL + 'product/' + id);
  }

  upload(formData: FormData) {
    return this.http.post(environment.DATA_URL + 'file/upload', formData, {responseType: 'text'});
  }

  download(filename: string) {
    return this.http.get(environment.DATA_URL + 'file/download/' + filename);
  }

  create(product: Product) {
    const body = JSON.stringify(product);
    return this.http.post(environment.DATA_URL + 'product', body, httpOptions);
  }

  update(product: Product) {
    const body = JSON.stringify(product);
    return this.http.put(environment.DATA_URL + 'product/' + product.id, body, httpOptions);
  }
}
