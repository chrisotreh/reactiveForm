import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { resolve } from 'url';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'reactiveForm';

  signUpForm: FormGroup;
  projectStatus = ["Stable", "Critical","Finished"];

  ngOnInit() {
    this.signUpForm = new FormGroup({
      "projectName": new FormControl(null, Validators.required,this.forbiddenName),
      "email": new FormControl(null, [Validators.email, Validators.required],this.forbiddenEmails),
      "projectStatus": new FormControl("Stable"), 
    }); 
  }

  onSubmit() {
    console.log(this.signUpForm);

  }
 
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promis = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "test@test.com") {
          resolve({ 'emailIsForbidden': true });
        } else {
          resolve(null);
        }
      }, 1000)
    });

    return promis;
  }

  forbiddenName(control: FormControl): Promise<any> | Observable<any> {
    const promis = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "Test") {
          resolve({ 'projectNameIsForbidden': true });
        } else {
          resolve(null);
        }
      }, 1000)
    });

    return promis;
  }
}
