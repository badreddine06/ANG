import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ProductModule } from '../models/product/product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productId! :string ;
  product! :ProductModule;
  productFormGroup! :FormGroup;
  constructor(private router:ActivatedRoute,
     public prodService:ProductService ,
     private fb:FormBuilder,
     private routernav :Router){



    this.productId = this.router.snapshot.params['id'];
  }
  ngOnInit():void {
   this.prodService.getProduct(this.productId).subscribe({
    next :(product)=>{
   this.product=product;
   this.productFormGroup=this.fb.group({
    name:this.fb.control(this.product.name, [Validators.required, Validators.minLength(4)]),
    price:this.fb.control(this.product.price, [Validators.required,Validators.min(200)]),
    promotion :this.fb.control(this.product.promotion, [Validators.required]),
       });
    },
    error:(err)=>{
      console.log(err);
    }
   });
  }
  handleUpdateProdcut() {
    let p=this.productFormGroup.value;
    p.id=this.product.id;
    this.prodService.updateProduct(p).subscribe({
      next :(prod)=>{
       
        alert("Product updated successfully");
        this.routernav.navigateByUrl("/admin/products")
        
      },
      error: err =>{
        console.log(err);
        
      }
    })
    }
  

}
