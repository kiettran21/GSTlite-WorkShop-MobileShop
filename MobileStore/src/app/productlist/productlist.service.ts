export class ProductlistServices {
    
   private urlAPI = 'http://localhost:8080';
   
   constructor() {

   }
  
   public getProductList = async () => {
        try {
            const productList = await fetch(`${this.urlAPI}/api/v1/product/list`);
            return await productList.json();
        }
       catch (error) {
           console.log(error);
       }  
   }
}
