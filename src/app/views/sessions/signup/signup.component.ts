import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormControl,
  FormBuilder,
  FormGroup
} from "@angular/forms";
import { CustomValidators } from "ngx-custom-validators";
import { matxAnimations } from "app/shared/animations/matx-animations";
import { User, UserApiModel, UserAuth } from "app/shared/models/user.model";
import { StoreService } from "app/shared/services/store.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
  animations: matxAnimations
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  
  constructor(private fb: FormBuilder,
    private storeService:StoreService,
    private router: Router) {}

  ngOnInit() {
    const password = new FormControl("", Validators.required);
    const confirmPassword = new FormControl(
      "",
      CustomValidators.equalTo(password)
    );

    this.signupForm = this.fb.group({
      name: ["", Validators.required],
      lastName: ["", Validators.required],
      username: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: password,
      agreed: [false, Validators.required]
    });
  }

  onSubmit() {
    var DisplayName = this.signupForm.get('name').value + ' ' + this.signupForm.get('lastName').value;
    var Id = Math.random() * 2;

    if (!this.signupForm.invalid) {
      var userCreate:UserApiModel =  new UserApiModel(
        DisplayName,
        'User',
        true,
        this.signupForm.get('email').value,
        'ExternalId',
        this.signupForm.get('name').value,
        this.signupForm.get('lastName').value,
        this.signupForm.get('username').value,
        this.signupForm.get('password').value,
        '',
        Id.toString()
      );
        this.storeService.createUser(userCreate).subscribe(user => {
          if(user!==undefined)
          var userCreateAuth:UserAuth =  new UserAuth(
            user.DisplayName,
            "f4XcgHcHnhs:APA91bHnS157O0lvYobnYC_E-lPeN6XcHbMOBJKz42rNKaQr0DImsRVSupaBK3G6BEd729NFmVIbwf3yZoxIphLx1WKX3xUA-3zu2guaKAraZiWdirwMdlgYYp_-Auq-GQ3MGOHiit39",
            user.Id
          );
          this.storeService.createUserAuth(userCreateAuth).subscribe(userAuth => {
            if(userAuth!==undefined){
              this.router.navigateByUrl("sessions/signin");
            }
          });


        });
       

      console.log(this.signupForm.value);
    }
  }
}
