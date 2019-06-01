import { Component, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';
import { ImagePopUpService } from '../../services/image-pop-up.service';

@Component({
  selector: 'app-image-pop-up',
  templateUrl: './image-pop-up.component.html',
  styleUrls: ['./image-pop-up.component.scss']
})
export class ImagePopUpComponent implements OnInit {

  imageUrl;

  constructor(
    private imagePopUpService: ImagePopUpService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.imagePopUpService.popUpImageURL$.subscribe(res => {
      this.imageUrl = res;
      this.openImage();
    });
  }

  closeImage() {
    this.renderer.setStyle(
      this.el.nativeElement.querySelector('.modal'), 'display', 'none');
  }

  openImage() {
    this.renderer.setStyle(
      this.el.nativeElement.querySelector('.modal'), 'display', 'block');
  }
}
