import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ProductsThemesService {

  storageRef: firebase.storage.Reference;

  constructor(private db: AngularFireDatabase) {
    this.storageRef = firebase.storage().ref();
  }

  addChanges(product, id, img) {
    if (typeof(img) !== 'string') {
      this.storageRef.child(product.imageURL).put(img, {contentType: 'image/jpg'}).catch(err => console.log(err));
    }
    return this.db.object('products/' + id).update(product);
  }

  addThemeChanges(product, id, img) {
    if (typeof(img) !== 'string') {
      this.storageRef.child(product.imageURL).put(img, {contentType: 'image/jpg'}).catch(err => console.log(err));
    }
    return this.db.object('themes/' + id).update(product);
  }

  getImage(imageURL: string) {
    return this.storageRef.child(imageURL).getDownloadURL();
  }
}
