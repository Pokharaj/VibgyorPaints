import { Component, OnInit, OnDestroy } from '@angular/core';
import { Theme } from 'src/app/core/models/theme';
import { ImagePopUpService } from '../../services/image-pop-up.service';
import { EstimatesService } from '../../services/estimates.service';
import { MatDialog } from '@angular/material';
import { EstimatesDialogComponent } from '../estimates-dialog/estimates-dialog.component';
import { Product } from 'src/app/core/models/product';
import { LoginComponent } from 'src/app/public/components/login/login.component';
import { Store, select } from '@ngrx/store';
import { UserState, getLoggedInUser } from 'src/app/core/state/reducers/user.reducer';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent implements OnInit, OnDestroy {

  themeslist: Theme[];
  isLoggedIn = false;
  loading = true;
  subscriptions: Subscription[];

  constructor(private themeService: ThemeService,
              private imagePopService: ImagePopUpService,
              private estimates: EstimatesService,
              private store: Store<UserState>,
              private dialog: MatDialog
              ) { }

  ngOnInit() {
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
    this.loadData();
  }

  ngOnDestroy(): void {
    if(this.subscriptions) {
      this.subscriptions.forEach(sub => {
        sub.unsubscribe();
      });
    }
  }

  loadData(): void {
    this.themeslist = [];
    const sub = this.themeService.getThemes().subscribe((themes: Theme[]) => {
      this.themeslist = themes;
    });
    this.subscriptions.push(sub);
  }

  calculatePrice(products: Product[]): number {
    let price = 0;
    products.forEach((product: Product) => {
      price += product.price;
    });
    return price;
  }

  getMaterialsDescription(materials: Product[]) {
    let result = '';
    materials.forEach((element) => {
      result += element.productName + ', ';
    });
    return result.substring(0, result.length - 3);
  }

  openPopUp(url) {
    this.imagePopService.createNewPopUpImage(url);
  }

  showEstimates(theme: Theme): void {
    this.estimates.selectTheme(theme);
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EstimatesDialogComponent, {
      width: '400px',
      data: { product: false }
    });

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

  imageLoadError(product: Product): void {
    product.imageUrl = './assets/Images/Placeholder240x210.png';
  }

  getImageUrl(filename: string): string {
    return this.themeService.getImageUrl(filename);
  }
}
