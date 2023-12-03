import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 userFormGroup! : FormGroup;
 errorMessage: any;
 //pour fair un data biding entre formulaire et form group



  constructor(private fb:FormBuilder , 
    private authService:AuthenticationService,
    private router:Router
    ){};




  ngOnInit(): void{
    //on vas creer un forms group qui contient les attributs suivants;
 this.userFormGroup = this.fb.group({
    username: this.fb.control(""),
    password: this.fb.control("")


  });
  }

  handlelogin() {
    let username = this.userFormGroup.value.username;
    let password = this.userFormGroup.value.password;
    this.authService.login(username, password).subscribe({
      next:(appUser) => {
             this.authService.authenticateUser(appUser).subscribe({
              next:(data) =>{
                 this.router.navigateByUrl('/admin');
                }
              });
      },
      error:(err) => {
 this.errorMessage = err;
      }
    });
    }


}
