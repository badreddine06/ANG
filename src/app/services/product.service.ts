import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";


import {ProductModule} from "../models/product/product.model";
import {Pageproduct} from "../models/product/product.model";
import { UUID } from 'angular2-uuid';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products! : Array <ProductModule>;
  constructor() {
    this.products=[

      {id:UUID.UUID() , name:"computer" , price:6500,promotion:true},
      {id:UUID.UUID()  , name:"table" , price:521 ,promotion:true},
      {id:UUID.UUID()  , name:"phone" , price:7500,promotion:false },
    ];
    for (let i=0; i<10 ; i++) {
      this.products.push({id:UUID.UUID()  , name:"phone" , price:7500,promotion:false });
      this.products.push({id:UUID.UUID()  , name:"table" , price:521 ,promotion:true});
      this.products.push({id:UUID.UUID() , name:"computer" , price:6500,promotion:true});
         
       }
    }
  

  //angular base sur programtion reactive donc on utilise Observable
  public GetAllProducts() :Observable<ProductModule[]>{
    return of(this.products);
  }
  public GetAllPages(page :number, size:number) :Observable<Pageproduct>{
    //si page 0 donc 0 si page 1 donc 5*1=5 si page 2 donc 5*2=10
    let index=page*size;
    //division entier pour ne pas avoir une vergule 
   let totalPages = ~~(this.products.length/size);
   //mais si ona 6 on va faire 5 plus une page pour l'elemeent 6éme 
   if(this.products.length %size != 0){
    totalPages++;
   } 
   let pageProduct=this.products.slice(index, index + size);
   return of({page:page ,size:size,totalPages:totalPages,products:pageProduct});
  }
  public DeleteProduct(id : string):Observable<boolean>{
    this.products=this.products.filter(p=> p.id!=id);
    return of(true);

  }
   public SetPromotion(id :string):Observable<boolean>{
    let product=this.products.find(p=>p.id==id);
    if(product!=undefined){
       product.promotion=!product.promotion;
      return of(true);
    }else return throwError(()=>new Error("!!!!!!!!!!!!"));
  
   }
               //methode de recherge retourn tous 
   //Observable<ProductModule[] on donne la product.model.ts export interface ProductModule 
   //public SearchProsuct(keyword:string):Observable<ProductModule[]>{
    //return une liste des produit dans le name contient le mots keyword 
    //let products= this.products.filter(p=> p.name.includes(keyword));
    //return of (products);
   //}
   public SearchProsuct(keyword:string ,page :number, size:number):Observable<Pageproduct>{
    let result= this.products.filter(p=> p.name.includes(keyword));
   let index=page*size;
   
  let totalPages = ~~(result.length/size);
  
  if(this.products.length %size != 0){
   totalPages++;
  } 
  let pageProduct=result.slice(index, index + size);
  return of({page:page ,size:size,totalPages:totalPages,products:pageProduct});

   }
   getErrorMessage(fieldName: string, error: ValidationErrors) {
    if (error['required']) {
        return fieldName + " is required";
    } else if (error['minlength']) {
        return fieldName + " sould have at least " + error['minlength']['requiredLength'] + " characters";
    }else if (error['min']) {
      return fieldName + " sould have at least " + error['min']['min'] ;
  } else {
        return "ok";
    }
}
   public addNewProduct(product:ProductModule) : Observable<ProductModule>{
    product.id=UUID.UUID();
    this.products.push(product);
    return of(product);
   }
   public getProduct(id:string) :Observable<ProductModule>{
  
    let product =this.products.find(p=> p.id==id);
    if(product==undefined){
      return throwError(()=>new Error("Product not found"))
    }

    return of(product);
   }

   public updateProduct(product:ProductModule) : Observable<ProductModule>{
    this.products=this.products.map(p=>(p.id==product.id)?product:p);
    return of(product); 
  }
  
}
