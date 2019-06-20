import { Component, OnInit, OnDestroy, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControlName, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { User } from 'src/app/core/models/user';
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
              private userService: UserService,
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
    // firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
    //   .then(res => {
    //     const name = Object.values(res.additionalUserInfo.profile);
    //     const user = {
    //       firstname: name[4],
    //       lastname: name[6],
    //       phone: +res.user.phoneNumber,
    //       location: '',
    //       type: USER.B2C,
    //       isDeleted: false,
    //       active: true,
    //       emailid: res.user.email,
    //     } as User;
    //     if (res.additionalUserInfo.isNewUser) {
    //       this.userservice.createNewUser(res, user);
    //     }
    //     this.afterSteps(name[4], user, res.user.uid);
    //   });
  }

  logIn() {
    this.validation = this.genericValidator.validate(this.form.controls.LogInForm as FormGroup, true);
    if (Object.keys(this.validation).length === 0) {
      this.userService.login(this.form.controls.LogInForm.value.username,
        this.form.controls.LogInForm.value.passwordlog).subscribe((user: User) => {
          if(user) {
            this.postLoginSteps(user);
          } else {
            this.validation.passwordlog = 'Invalid Username or password';
          }
        });
      //     if (err.code.includes('invalid-email')) {
      //       this.validation.username = 'Please enter a valid Email Id';
      //     } else if (err.code.includes('user-not-found')) {
      //       this.validation.username = 'This Email Id is not registered';
      //     } else if (err.code.includes('wrong-password')) {
      //       this.validation.passwordlog = 'Invalid Email Id or Password';
      //     }
    }
  }

  resetPassword() {
    // firebase.auth().sendPasswordResetEmail(this.form.controls.LogInForm.value.username)
    //   .then(() => this.dialogref.close(null))
    //   .catch(() => this.validation.username = 'Please enter a valid Email Id');
  }

  createUserObject(formValues): User {
    const user: User = {
      id: null,
      firstname: formValues.firstname,
      lastname: formValues.lastname,
      email: formValues.emailid,
      location: formValues.location,
      password: formValues.passwordgroup.password,
      phone: formValues.phone,
      role: formValues.type ? { id: null, role: USER.B2B } : { id: null, role: USER.B2C },
      approved: !formValues.type,
      deleted: false
    }
    return user;
  }

  signUp() {
    this.validation = this.genericValidator.validate(this.form.controls.SignUpForm as FormGroup, true);
    if (Object.keys(this.validation).length === 0) {
      const newuser = this.createUserObject(this.form.controls.SignUpForm.value);
      this.userService.create(newuser).subscribe((user: User) => {
        if (user !== undefined && user != null) {
          this.postLoginSteps(user);
        } else {
          this.validation.emailid = "Please enter a valid email";
        }
      });
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

  postLoginSteps(user: User) {
    this.dialogref.close(user.firstname);
    this.store.dispatch(new SetLoggedInUser(user));
    this.userService.setCache(user.id.toString(), user);
    if (user.role.role === USER.ADMIN) {
      this.router.navigate(['/home']);
    }
  }
}
