import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import { Themes } from 'src/app/core/models/themes';
import { UserService } from 'src/app/core/services/user.service';
import { ImagePopUpService } from '../../services/image-pop-up.service';
import { EstimatesService } from '../../services/estimates.service';
import { MatDialog } from '@angular/material';
import { EstimatesDialogComponent } from '../estimates-dialog/estimates-dialog.component';
import { Products } from 'src/app/core/models/products';
import { LoginComponent } from 'src/app/public/components/login/login.component';
import { Store, select } from '@ngrx/store';
import { UserState, getLoggedInUser } from 'src/app/core/state/reducers/user.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent implements OnInit, OnDestroy {

  themeslist: Themes[];
  storageRef: firebase.storage.Reference;
  isLoggedIn = false;
  loading = true;
  subscriptions: Subscription[];

  constructor(private userservice: UserService,
              private imagePopService: ImagePopUpService,
              private estimates: EstimatesService,
              private store: Store<UserState>,
              private dialog: MatDialog
              ) {
    this.storageRef = firebase.storage().ref();
    this.themeslist = [];
    this.subscriptions = [];
    const sub = this.store.pipe(select(getLoggedInUser)).subscribe((user) => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
    this.subscriptions.push(sub);
  }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  loadData(): void {
    const sub = this.userservice.getData('products').subscribe(resp => {
      const products = Object.entries(resp.payload.val());
      const sub1 = this.userservice.getData('themes').subscribe(res => {
        for (const [key, value] of Object.entries(res.payload.val())) {
          const materials = value.material;
          // console.log(materials);
          const theme: Themes = {
            key,
            id: value.id,
            imageURL: value.imageURL,
            name: value.name,
            isDeleted: value.isDeleted,
            price: null,
            material: []
          };
          this.getThemeMaterialsAndPrice(products, theme, materials);
          this.storageRef.child(theme.imageURL).getDownloadURL().then(url => {
            theme.imageURL = url;
            this.themeslist.push(theme);
          }).catch(err => {
            this.themeslist.push(theme);
          });
        }
      });
      this.subscriptions.push(sub1);
    });
    this.subscriptions.push(sub);
  }

  getThemeMaterialsAndPrice(products, theme, materials) {
    const materialsArray: Products[] = [];
    let themePrice = 0;
    products.filter(res => {
      if (materials.includes(res[1].id)) {
        themePrice += +res[1].price;
        materialsArray.push({
          key: res[0],
          id: res[1].id,
          imageURL: res[1].imageURL,
          name: res[1].name,
          price: res[1].price,
          isDeleted: res[1].isDeleted,
          checked: false,
          quantity: 1
        });
      }
    });
    theme.material = materialsArray;
    theme.price = themePrice;
  }

  getMaterialsString(materials: Products[]) {
    let result = '';
    materials.forEach((element) => {
      result += element.name + ', ';
    });
    return result.substring(0, result.length - 3);
  }

  openPopUp(url) {
    this.imagePopService.createNewPopUpImage(url);
  }

  showEstimates(theme: Themes): void {
    this.estimates.selectTheme(theme);
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EstimatesDialogComponent, {
      width: '400px',
      data: { product: false }
    });

    // TODO: Unsubscribe
    const sub = dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // this.loadData();
      }
    });
    this.subscriptions.push(sub);
  }
  login(): void {
    this.dialog.open(LoginComponent, {
      width: '500px',
      height: '500px'
    });
  }
  imageLoadError(product: Products): void {
    product.imageURL = './assets/Images/Placeholder240x210.png';
  }
}
