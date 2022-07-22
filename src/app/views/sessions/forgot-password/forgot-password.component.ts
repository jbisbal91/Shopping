import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { matxAnimations } from 'app/shared/animations/matx-animations';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: matxAnimations
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm: FormGroup;
 
  constructor() { }

  ngOnInit() {
    this.forgotForm = new FormGroup({
      userEmail: new FormControl('', Validators.required)
    });
  }
  submitEmail() {
  
  }
}
