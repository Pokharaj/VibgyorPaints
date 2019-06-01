import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewThemeFormComponent } from './new-theme-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('NewThemeFormComponent', () => {
  let component: NewThemeFormComponent;
  let fixture: ComponentFixture<NewThemeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewThemeFormComponent ],
      imports: [SharedModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewThemeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
