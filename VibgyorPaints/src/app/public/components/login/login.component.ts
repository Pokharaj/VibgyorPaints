import { Component, OnInit, OnDestroy, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControlName, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { User } from 'src/app/core/models/user';
import * as firebase from 'firebase';
import { UserService } from 'src/app/core/services/user.service';
import { Subscription, Observable, fromEvent, merge } from 'rxjs';
import { GenericValidator } from 'src/app/core/validators/generic-validator';
import { debounceTime } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { UserState } from 'src/app/core/state/reducers/user.reducer';
import { USER } from 'src/app/shared/constants';
import { SetLoggedInUser } from 'src/app/core/state/user.action';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {

  form: FormGroup;
  newuser: User;
  validationSub: Subscription;
  validation: { [key: string]: string} = {};
  @ViewChildren(FormControlName, {read: ElementRef}) formElelments: ElementRef[];
  private validationMsgs: { [key: string]: { [key: string]: string}};
  private genericValidator: GenericValidator;

  constructor(private builder: FormBuilder,
              private dialogref: MatDialogRef<LoginComponent>,
              private userservice: UserService,
              private store: Store<UserState>,
              private router: Router) {

    this.validationMsgs = {
      username: {
        required: 'Please enter your User Name',
      },
      firstname: {
        required: 'Please enter your First Name',
        pattern: 'First Name should not contain numbers'
      },
      lastname: {
        required: 'Please enter your Last Name',
        pattern: 'Last Name should not contain numbers'
      },
      emailid: {
        required: 'Please provide your Email Id'
      },
      phone: {
        required: 'Please enter your phone number',
        pattern: 'Phone number should only contain didgits'
      },
      location: {
        required: 'Please enter your location'
      },
      password: {
        required: 'Please provide your password',
        minlength: 'Password should be atleast 6 characters long'
      },
      passwordlog: {
        required: 'Please provide your password'
      },
      confirmpassword: {
        required: 'Please re-enter your password'
      },
      passwordgroup: {
        noMatch: 'Confirm Password should be equal to Password'
      }
    };
    this.genericValidator = new GenericValidator(this.validationMsgs);
  }

  ngOnInit() {
    this.formbuilder();
  }

  ngOnDestroy() {
    this.validationSub.unsubscribe();
  }

  ngAfterViewInit() {
    const signUpControlblur: Observable<any>[] = this.formElelments.map(( formControl: ElementRef) =>
      fromEvent(formControl.nativeElement, 'blur'));

    this.validationSub = merge(this.form.valueChanges, ...signUpControlblur).pipe(debounceTime(300)).subscribe(() => {
      this.validation = this.genericValidator.validate(this.form, false);
    });
  }

  googleLogin() {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(res => {
        const name = Object.values(res.additionalUserInfo.profile);
        const user = {
          firstname: name[4],
          lastname: name[6],
          phone: +res.user.phoneNumber,
          location: '',
          type: USER.B2C,
          isDeleted: false,
          active: true,
          emailid: res.user.email,
        } as User;
        if (res.additionalUserInfo.isNewUser) {
          this.userservice.createNewUser(res, user);
        }
        this.afterSteps(name[4], user, res.user.uid);
      });
  }

  logIn() {
    this.validation = this.genericValidator.validate(this.form.controls.LogInForm as FormGroup, true);
    if (Object.keys(this.validation).length === 0) {
      firebase.auth().signInWithEmailAndPassword(this.form.controls.LogInForm.value.username,
        this.form.controls.LogInForm.value.passwordlog)
        .then(res => {
          this.userservice.getUserData(res.user.uid).subscribe(resp => {
            if (resp.active) {
              this.afterSteps(resp.firstname, resp, res.user.uid);
            } else {
              this.validation.passwordlog = 'Account activation pending';
            }
          });
        })
        .catch((err) => {
          if (err.code.includes('invalid-email')) {
            this.validation.username = 'Please enter a valid Email Id';
          } else if (err.code.includes('user-not-found')) {
            this.validation.username = 'This Email Id is not registered';
          } else if (err.code.includes('wrong-password')) {
            this.validation.passwordlog = 'Invalid Email Id or Password';
          }
        });
    }
  }

  resetPassword() {
    firebase.auth().sendPasswordResetEmail(this.form.controls.LogInForm.value.username)
      .then(() => this.dialogref.close(null))
      .catch(() => this.validation.username = 'Please enter a valid Email Id');
  }

  signUp() {
    this.validation = this.genericValidator.validate(this.form.controls.SignUpForm as FormGroup, true);
    if (Object.keys(this.validation).length === 0) {
      const newuser = {...this.newuser, ...this.form.controls.SignUpForm.value};
      firebase.auth().createUserWithEmailAndPassword(newuser.emailid, newuser.passwordgroup.password)
        .then(res => {
          this.userservice.createNewUser(res, newuser)
            .then(() => {
              if (this.form.controls.SignUpForm.value.type) {
                this.dialogref.close(null);
             } else {
              this.userservice.getUserData(res.user.uid).subscribe(resp => {
                this.afterSteps(resp.firstname, resp, res.user.uid);
              });
            }
          })
          .catch(err => console.log(err));
        })
        .catch(() => this.validation.emailid = 'Please enter a valid Email Id');
    }
  }

  dismiss() {
    this.dialogref.close(null);
  }

  formbuilder() {
    this.form = this.builder.group({
      LogInForm: this.builder.group({
        username: ['', [Validators.required]],
        passwordlog: ['', [Validators.required]]
      }),
      SignUpForm: this.builder.group({
        firstname: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
        lastname: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
        emailid: ['', [Validators.required]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        location: ['', [Validators.required]],
        passwordgroup: this.builder.group({
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmpassword: ['', [Validators.required]]
        }, {validator: this.matchpassword}),
        type: [false]
      })
    });
  }

  matchpassword(c: FormGroup): { [key: string]: boolean} {
    if (c.controls.confirmpassword.value !== '') {
      return c.controls.password.value === c.controls.confirmpassword.value ? null : { noMatch: true };
    }
    return null;
  }

  afterSteps(firstname: string, user: User, id: string) {
    this.dialogref.close(firstname);
    this.store.dispatch(new SetLoggedInUser(user));
    this.userservice.setCache(id, user);
    if (user.type === USER.admin) {
      this.router.navigate(['/home']);
    }
  }
}
