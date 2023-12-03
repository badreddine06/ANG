import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";

import {Observable, of} from "rxjs";
import {ProductModule} from "../models/product/product.model";
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements  OnInit{





  products!: Array<ProductModule>;
  currentPage: number=0;
  pageSize: number=5;
  totalPages: number=0;
  errorMessage! :string;
  SearchFormGroup!:FormGroup;
  currentAction:string="all";


  constructor( private productService : ProductService ,
     private fb :FormBuilder,
     private router : Router,
     public authService : AuthenticationService) {
  }


  ngOnInit(): void {
    this.SearchFormGroup = this.fb.group({
      //par defaut est null 
      keyword: this.fb.control(null)
    });
    this.handleGetPageProducts();
  }
  handleGetPageProducts(){

    
    this.productService.GetAllPages(this.currentPage,this.pageSize).subscribe({
      
      next : (data )=>{
        //car si t'une liste non objet si objet on fait seulement this.products=data;
        this.products=data.products;
        this.totalPages=data.totalPages;
      },
     
      error: (err)=>{
        this.errorMessage=err;
      }
    });
  }
  handleGetAllProducts(){

    //je doit initialiser a partir de service
    // facon imperative this.products=this.productService.GetAllProducts();
    this.productService.GetAllProducts().subscribe({
      //si sa marche bien
      next : (data )=>{
        this.products=data;
      },
      //else si erreur
      error: (err)=>{
        this.errorMessage=err;
      }
    });
  }

  handleDeleteProduct(p: any) {
    //ajouter confirmation
    let conf=confirm("Are you sure te delete !!!!!!!!! ");
    if(conf==false) return ;

    this.productService.DeleteProduct(p.id).subscribe({
      //si sa marche bien
      next : (data )=>{
        //comme sa je doit afficher tout une deuxiem  fois
        // this.handleGetAllProducts();
        let index=this.products.indexOf(p);
        //vas vers le backend(data base ) et supprimer se element et moi dans le front je doit suppeimer element specefique
        //mais je doit pas aller ver back et je dit donne moi tout la liste avant
        this.products.splice(index,1);
      }
    });
  }

   handleSetPromotion(p:ProductModule) {
    let promo=p.promotion;
   this.productService.SetPromotion(p.id).subscribe({
  //     //si sa marche bien
       next : (data )=>{
  
  
  //       //pour voir resultat si sa marche bien dans console
        console.log("ok");
      p.promotion=!promo;
      return of(true);
   },
       error : err => {
  
      this.errorMessage=err;
    }
  });
  }
  handleSearchProduct() {
    this.currentAction="search";
    let keyword = this.SearchFormGroup.value.keyword;

    
    //pour chaque recherge il m'affiche une liste de 0 non par numero 5 ou 4  
    
    this.productService.SearchProsuct(keyword,this.currentPage,this.pageSize).subscribe({
      //     //si sa marche bien
       
           next : (data )=>{   
            console.log(this.currentPage);
          this.products=data.products; 
          this.totalPages=data.totalPages;
       }
      });
    }

    Gotopage(i: number) {
      //donner le current le nombre xliquer et appler la methode qui utilise currentpage
      this.currentPage=i;
      
      
      //car si je fait pas quand je cherche c je trouve 3 page une fois cliquer sur 2 page je doit avoir tout comme quiter pour sela je test input de recherche
      if(this.currentAction==="all")
      this.handleGetPageProducts();
      else
      this.handleSearchProduct();
        }
        
      handleNewProduct() {
        this.router.navigateByUrl("/admin/newProduct")
        }

        handleEditProduct(p: ProductModule) {
          this.router.navigateByUrl("/admin/editProduct/"+p.id);
          } 
      
}
