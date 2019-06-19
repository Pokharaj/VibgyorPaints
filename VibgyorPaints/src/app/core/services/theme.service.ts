import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Theme } from '../models/theme';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  
  constructor(private http: HttpClient) {}

  getThemes() {
    return this.http.get(environment.DATA_URL + 'themes');
  }

  upload(formData: FormData) {
    return this.http.post(environment.DATA_URL + 'theme/file/upload', formData, {responseType: 'text'});
  }

  getImageUrl(filename: string) {
    return environment.DATA_URL + 'theme/file/download/' + filename;
  }

  getTheme(id: number) {
    return this.http.get(environment.DATA_URL + 'theme/' + id);
  }

  create(theme: Theme) {
    const body = JSON.stringify(theme);
    return this.http.post(environment.DATA_URL + 'theme', body, httpOptions);
  }

  update(theme: Theme) {
    const body = JSON.stringify(theme);
    return this.http.put(environment.DATA_URL + 'theme/' + theme.id, body, httpOptions);
  }
}
