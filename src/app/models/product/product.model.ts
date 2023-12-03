export interface ProductModule {
  id :string;
  name:string;
  price:number;
  promotion:boolean;

}

export interface Pageproduct{
  products:ProductModule[];
  page:number;
  size:number;
  totalPages:number;
}
