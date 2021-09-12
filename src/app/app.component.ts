import { Component } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  adminList = ['boss', 'jib', 'ninja', 'baba'];
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required, this.searchAdminValidator()],
      password: ['',Validators.required],
      confirmPassword: ['',Validators.required],
    },{
      validators:this.chkMatPassword('password','confirmPassword')
    });
  }

  submitForm(){
    this.adminList.push(this.form.get('name')?.value)
    this.form.reset()
    document.getElementById('txt_nameadmin')?.focus()
  }

  userExists(name: string): Observable<boolean> {
    return of(this.adminList.includes(name)).pipe(delay(1000));
  }

  searchAdminValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> =>
      this.userExists(control.value).pipe(
        map((res) => (res ? { userExists: true } : null))
      );
  }

  chkMatPassword(password1: string, password2: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup
      const valid1 = formGroup.get(password1)?.value;
      const valid2 = formGroup.get(password2)?.value;
      if (valid1 === valid2) {
        return null;
      } else {
        return {
          valueDoNotMath: true,
        };
      }
    };
  }

 
}
