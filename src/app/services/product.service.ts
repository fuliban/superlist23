import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Section } from '../models/section.model';
import { Product } from '../models/product.model';

import { firstValueFrom, from, map, Observable,of } from 'rxjs';

import { HistoricalService } from './historical.service';
import { TranslateService } from './translate.service';
import { AuthService } from './auth.service';
import { doc,getDoc, Firestore, getFirestore, onSnapshot, query, collection, where, DocumentData, updateDoc, setDoc, getDocs, DocumentSnapshot, addDoc } from 'firebase/firestore';

import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
    firebaseApp = initializeApp (environment.firebaseConfig);    
    db = getFirestore(this.firebaseApp);
  
  constructor(
    private authService:AuthService,
    private translateService:TranslateService,
    private historicalService:HistoricalService
  ) { }


  //USE CASES
  

  updateProductPurchased(user:User,idProduct:string) {
    const product=doc(this.db, `users/${user.uid}/products/${idProduct}`);
    return updateDoc(product, {status:'C',lastBuy:new Date}).then(()=>{return true});
  }


  updateProductAddedToList(user:User,idProduct:string):Promise<boolean>  {
    const product=doc(this.db, `users/${user.uid}/products/${idProduct}`);
    return updateDoc(product, {status:'P'}).then(()=>{return true});
  }

  removeProductFromLists(oProd:Product,user:User) {
    
      return new Promise((resolve)=>{
          this.setStatusProduct(oProd,'',user).then(function() {resolve(true)});
      })                
            
  }



  getPurchasedList(user:User):Observable<Product[]> {
      return this.userProductsByStatus(user,'C');
  }
  
  getAllBaseProducts():Observable<Product[]> {
    /*todo
      return this.firestore.collection<Product>('products').snapshotChanges().pipe(            
          map(actions => {
              return this.payloadToModelProduct(actions) 
          })
      ) 
      */
     return of ([]);
  }

  getAllProducts(user:User):Observable<Product[]> {        

     return new Observable<Product[]>((observer)=>{   
      const q = query(collection(this.db, `users/${user.uid}/products`));
      
      onSnapshot(q, (querySnapshot) => {
        const products:Product[] = [];
        querySnapshot.forEach((doc) => {
            products.push(this.firebaseProductConverter.fromFireBase(doc.data(),doc.id));              
        });
                  
        observer.next(products);
      });

      return {unsubscribe(){}}
    })     
  }


  userProductsByStatus(user:User,status:string): Observable<Product[]>{
    return new Observable<Product[]>((observer)=>{   
        //const q = query(collection(this.db, `users/${user.uid}/products`));
        const q = query(collection(this.db, `users/${user.uid}/products`), where("status", "==", status));
        onSnapshot(q, (querySnapshot) => {
          const products:Product[] = [];
          querySnapshot.forEach((doc) => {
              products.push(this.firebaseProductConverter.fromFireBase(doc.data(),doc.id));              
          });
                    
          observer.next(products);
        });

        return {unsubscribe(){}}
      })
  }


  timestampToDate(timestamp:any):Date {
    /*
      if (timestamp) {
          return new Date(timestamp.seconds * 1000);      
        }
        else return null;
    */
   return new Date();
  }

  toModelProduct(prod:Product):Product {
      return prod;
  }

  payloadToModelProduct(actions:any) {
    /*
      return actions.map(p => {
          const prod = p.payload.doc;
          const id = prod.id;
          
          return { id:id,
              code: prod.data() ['code'],
              desc: prod.data() ['desc'],
              section: prod.data() ['section'],
              status: prod.data() ['status'],
              favourite: prod.data() ['favourite'],
              urlImg: prod.data() ['urlImg'],                
              lastBuy: this.timestampToDate(prod.data() ['lastBuy'])
          } as Product;		
        });
        */
  }


  getUserSectionProducts(user:User,section:Section): Observable<Product[]>{
    return new Observable<Product[]>((observer)=>{   
        const q = query(collection(this.db, `users/${user.uid}/products`), where("section", "==", section.name));
        onSnapshot(q, (querySnapshot) => {
          const products:Product[] = [];
          querySnapshot.forEach((doc) => {
            products.push(this.firebaseProductConverter.fromFireBase(doc.data(),doc.id));              
          });
                    
          observer.next(products);
        });

        return {unsubscribe(){}}
      })
  }

  getIdProductByCodeNO(user:User,code: string): Observable<string> {       
    return new Observable<string>((observer)=>{   

      const q = query(collection(this.db, `users/${user.uid}/products`), where("code", "==", code));
      onSnapshot(q, (querySnapshot) => {       
        querySnapshot.forEach((doc) => {                       
            observer.next(doc.id);
        });          
      });

      return {unsubscribe(){}}
    })  
  }


  async userProductByCodePromise(user:User,code: string): Promise <Product | null>  {
    const q = query(collection(this.db, `users/${user.uid}/products`), where("code", "==", code));
    
    let rs=await getDocs(q);
    
    let p:Product | null=null;

    rs.forEach((doc)=> {
      console.log(`upbcp ${doc.id}`);      
      p=this.firebaseProductConverter.fromFireBase(doc.data(),doc.id)
      console.log(p.code);
      //return  p;  
    })
    console.log('exit');
    return p;
  }

  //GET PRODUCT BY CODE (VALUECHANGES)
  userProductByCode(user:User,code: string): Observable<Product> {       
    return new Observable<Product>((observer)=>{   

      const q = query(collection(this.db, `users/${user.uid}/products`), where("code", "==", code));
      onSnapshot(q, (querySnapshot) => {       
        querySnapshot.forEach((doc) => { 
          console.log(`upbc ${doc.id}`)
            const d=this.firebaseProductConverter.fromFireBase(doc.data(),doc.id);

            observer.next(this.firebaseProductConverter.fromFireBase(doc.data(),doc.id));
        });          
      });

      return {unsubscribe(){}}
    }        
    )  
  }

getBaseProductByCode(stCode: string): Observable<Product> {   
  /*todo
      var lista$: Observable<any>;
      
      var post=this.firestore.collection('products',ref=>ref.where("code","==",stCode));
      
      lista$=post.valueChanges({ idField: 'id' })
      
      return lista$.pipe(
          take(1),
          map(actions=>actions[0]) 
      )     
      */          
      return of (<Product>{});
  }	

  //GET PRODUCT BY DESC

  async getProductByDesc(user:User,stDesc: string): Promise<Product> {                 
    const os=new Observable<Product>((observer)=>{   

      const q = query(collection(this.db, `users/${user.uid}/products`), where("desc", "==", stDesc));
      onSnapshot(q, (querySnapshot) => {       
        querySnapshot.forEach((doc) => {                         
            observer.next(this.firebaseProductConverter.fromFireBase(doc.data(),doc.id));
        });          
      });

      return {unsubscribe(){}}
    })  

    const doc= await firstValueFrom(os) ;
    return doc;
}

 

  //CREATE PRODUCT
  createProduct(product: Product,user:User){
    return new Promise(resolve => {

      const fbProduct=this.firebaseProductConverter.toFirebase (product);
      const fbCollection = doc(collection(this.db, `users/${user.uid}/products`));

      setDoc(fbCollection,fbProduct);
    }
    )    
  }

  
  
  
  //CREATE BASE PRODUCT
  createBaseProduct(product: Product){
    /*todo
    this.firestore.collection('products').add(this.toFSProduct(product))
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
                return docRef.id;
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            })    
            */    
  }
    

  //UPDATE PRODUCT
  updateBaseProduct(product: Product){
    /*
      return new Promise(resolve => {
          console.log('updateProduct.Init : '+product.code);
          this.getBaseProductByCode(product.code).pipe(take(1)).subscribe(prod => {                                
              this.firestore.doc('products/' + prod.id).update(this.toFSProduct(product)).then(function() {
                          console.log(`updateProduct.updated`);                
                          resolve(true);
              })
          }
          );            
      }
      )
      */
  }
  
  
  private async setStatusProduct(product:Product, stStatus: string,user:User) {    
    const idProduct=await this.getIdProductByCode(user,product.code)
    console.log('setStatusProduct' + product.id)
    const fbProduct=doc(this.db, `users/${user.uid}/products/${idProduct}`);
    updateDoc(fbProduct, {status:stStatus});
  }

  //UPDATE PRODUCT
  updateProduct(product: Product,user:User){    
    return new Promise(resolve => {

        this.getIdProductByCode(user,product.code).then((id)=>{
          const fbProduct=doc(this.db, `users/${user.uid}/products/${id}`);
          updateDoc(fbProduct,this.firebaseProductConverter.toFirebase (product))
        })
    }
    )      
  }
  

  //CREATE SECTION	
  createSection( user:User,section: Section){      
      return new Promise(resolve => {

        const fbSection=this.firebaseSectionConverter.toFirebase (section);
        const fbCollection = doc(collection(this.db, `users/${user.uid}/sections`));
  
        setDoc(fbCollection,fbSection);
      }
      )  

  }



  

  //UPDATE SECTION

  async updateSectionById(user:User,section: Section,id:string){
    return new Promise(resolve => {      
      const fbDocument=doc(this.db, `users/${user.uid}/sections/${id}`);
      updateDoc(fbDocument,this.firebaseSectionConverter.toFirebase (section))     
    }
    )  
  }

  async updateSection(user:User,section: Section){
    console.log(`updatesection ${section.name}`)
    let id=await this.getIdSectionByName(user,section.name)
    console.log(`updatesection ${id}`)
    return new Promise(resolve => {
      
      const fbDocument=doc(this.db, `users/${user.uid}/sections/${id}`);
      updateDoc(fbDocument,this.firebaseSectionConverter.toFirebase (section))     
    
    }
    )  

  }



    
  async getIdSectionByName(user:User,name: string): Promise<string> {                 
    const os=new Observable<string>((observer)=>{   

      const q = query(collection(this.db, `users/${user.uid}/sections`), where("name", "==", name));
      onSnapshot(q, (querySnapshot) => {       
        querySnapshot.forEach((doc) => {                         
            observer.next(doc.id);
        });          
      });

      return {unsubscribe(){}}
    })  

    const doc= await firstValueFrom(os) ;
    return doc;
  }

  
async getIdProductByCode(user:User,code: string): Promise<string> {                 
  const os=new Observable<string>((observer)=>{   

    const q = query(collection(this.db, `users/${user.uid}/products`), where("code", "==", code));
    onSnapshot(q, (querySnapshot) => {       
      querySnapshot.forEach((doc) => {                         
          observer.next(doc.id);
      });          
    });

    return {unsubscribe(){}}
  })  

  const doc= await firstValueFrom(os) ;
  return doc;
}

async userSectionByNamePromise(user:User,name: string): Promise <Section | null>  {
  const q = query(collection(this.db, `users/${user.uid}/sections`), where("name", "==", name));
  
  let rs=await getDocs(q);
  
  let sec:Section | null=null;

  rs.forEach((doc)=> {
    console.log(`upbcp ${doc.id}`);      
    sec=this.firebaseSectionConverter.fromFireBase(doc.data(),doc.id)
    console.log(sec.name);
  })
  console.log('exit');
  return sec;
}



//GET SECTIONS NAME
getSectionsName(user:User): Observable<string[]> {  
  return new Observable<string[]>((observer)=>{   
    const q = query(collection(this.db, `users/${user.uid}/products`));
    onSnapshot(q, (querySnapshot) => {
      const aSec:string[] = [];
      querySnapshot.forEach((doc) => {
        
        if (aSec.indexOf(doc.data() ['section']) < 0) {
          aSec.push(doc.data() ['section']);
        }
      });
  
      observer.next(aSec);
    });

    return {unsubscribe(){}}
  })
}




  
  
//GET SECTION BY NAME (VALUECHANGES)
async getSectionByName(stName: string, user:User): Promise<Section> {   
  /*      
      if (user && user.uid) {
          var lista$: Observable<any>;
      
          var post=this.firestore.doc(`users/${user.uid}`).collection('sections',ref=>ref.where("name","==",stName));
          lista$=post.valueChanges({ idField: 'id' })
          
          return lista$.pipe(
              take(1),
              map(actions=>actions[0]) 
          )
      }          
      else return of(null) 
      */                             
    const os=new Observable<Section>((observer)=>{   
  
      const q = query(collection(this.db, `users/${user.uid}/sections`), where("name", "==", stName));
      onSnapshot(q, (querySnapshot) => {       
        querySnapshot.forEach((doc) => {                         
            observer.next(this.firebaseSectionConverter.fromFireBase(doc.data(),doc.id));
        });          
      });
  
      return {unsubscribe(){}}
    })  
  
    const doc= await firstValueFrom(os) ;
    return doc;
  
  }
  

  getUserSections(user:User): Observable<Section[]>{
    return new Observable<Section[]>((observer)=>{   
        const q = query(collection(this.db, `users/${user.uid}/sections`));
        onSnapshot(q, (querySnapshot) => {
          const sections:Section[] = [];
          querySnapshot.forEach((doc) => {
              sections.push(this.firebaseSectionConverter.fromFireBase(doc.data(),doc.id));              
          });
                    
          observer.next(sections);
        });

        return {unsubscribe(){}}
      })
  }
  
  
  firebaseSectionConverter= {
    fromFireBase: (firebaseUser:DocumentData, id:string): Section => {
      return <Section> {name:firebaseUser['name'],order:firebaseUser['order'],id:id} ;
    },
    toFirebase: (section:Section): DocumentData => {
      return <DocumentData> {
        'name':section.name,
        'order':section.order,
      } ;
    }
  }

  
  firebaseProductConverter= {
    fromFireBase: (firebaseProduct:DocumentData,id:string): Product => {
      return <Product> {id: id,
                        code: firebaseProduct['code'],
                        desc: firebaseProduct['desc'],
                        section:firebaseProduct['section'],
                        status: firebaseProduct['status'],
                        lastBuy: firebaseProduct['lastBuy'],
                        favourite: firebaseProduct['favourite'],
                        urlImg: firebaseProduct['urlImg'],
                        quantity:firebaseProduct['quantity']} ;
    },

    toFirebase: (product:Product): DocumentData => {
      return <DocumentData> {
          'code':product.code,
          'desc':product.desc,
          'section':product.section,
          'status':product.status || '',
          'lastBuy':product.lastBuy || null,
          'favourite':product.favourite || false,
          'urlImg':product.urlImg || '',
          'quantity':product.quantity || 0} ;
    }
  }
  
  numberOfProductsToBuy(user:User): Observable<number> {    
    return this.userProductsByStatus(user,'P').pipe(map(prod=> prod? prod.length: 0))       
  }

       


increaseQuantity(prod:Product, user:User) {  
  if ((prod.quantity || 0)>0) prod.quantity=(prod.quantity || 0) +1; else prod.quantity=2; 
  this.updateQuantity(prod.code,prod.quantity,user)  
}  

decreaseQuantity(prod:Product, user:User) {  
  if ((prod.quantity || 0)>1) {
      prod.quantity=(prod.quantity || 0) -1;
      this.updateQuantity(prod.code,prod.quantity,user)
  } 
}


async updateFavourite(code: string, favorite: boolean,user:User) {
  const idProduct=await this.getIdProductByCode(user,code)

  const product=doc(this.db, `users/${user.uid}/products/${idProduct}`);
  updateDoc(product, {favorite:favorite});
}

async updateQuantity(code: string, quantity: number,user:User) {
  const idProduct=await this.getIdProductByCode(user,code)

  const product=doc(this.db, `users/${user.uid}/products/${idProduct}`);
  updateDoc(product, {quantity:quantity});
}

//CONVERT
toFSProduct(oProduct: Product) {
  /*
    var fav: boolean;

    if (!oProduct.favourite) fav=false; else fav=oProduct.favourite;

    return {
        code: oProduct.code,
        desc: oProduct.desc,            
        section:oProduct.section,
        status: oProduct.status,  
        favourite: fav,
        urlImg: oProduct.urlImg || '',
        lastBuy:oProduct.lastBuy || new Date(1980,1,1),
        quantity:oProduct.quantity || 1
    }
    */
}

toFSSection(oSection: Section) {
    return {
        name: oSection.name,
  order: oSection.order
    }
}
 


loadDatabaseSections(user:User) {
  /*
    if (user) {
        return new Promise(resolve=> {
            this.firestore.collection<Section>('sections').valueChanges().pipe(
                take(1)
            ).subscribe(secs=> {
                secs.forEach(s=> {
                    console.log('add section '+s.name);
                    var sec:Section={name:s.name,order:s.order,id:''}
                    this.firestore.doc(`users/${user.uid}`).collection('sections').add(this.toFSSection(sec));                    
                });
                resolve(true)
            },
            error=> {console.log(`loadDatabaseSections ${error.toString()}`)}
            )
            
        })           
    }       
    */               
}

loadDatabaseProducts(user:User) {
  /*
    if (user) {
        return new Promise(resolve=>{
            this.firestore.collection<Product>('products').valueChanges().pipe(
                take(1)
            ).subscribe(prods=> {
                prods.forEach(p=> {  
                    //console.log(p.desc);                  
                    var prod:Product={desc:p.desc,code:p.code,section:p.section,id:'',status:'',urlImg:p.urlImg}
                    this.firestore.doc(`users/${user.uid}`).collection('products').add(this.toFSProduct(prod));
                    
                });
                resolve(true)
            })
        })            
    }     
    */   
}

//LOAD PRODUCT DATABASE
loadProductDatabase() {            
    // /*this.productsDatabase.forEach(async reg=> {
    //     console.log(reg.code);
    //     console.log(await this.ProductExists(reg.code));
    // }*/


    // this.productsDatabase.forEach(reg=> {
    //     this.ProductExists(reg.code).then(
    //         bExist=> {
    //             console.log(reg.code);
    //             if (bExist==true) {
    //                 console.log('exists')
    //                 this.getProductByCode(reg.code).subscribe(prd=> {
    //                     prd.desc=reg.desc;
    //                     prd.section=reg.section;
    //                     if (reg.urlImg && reg.urlImg.length>0) prd.urlImg=reg.urlImg;
    //                     this.updateProduct(prd)
    //                 }
    //                 )
    //                 /*var p:Product =  {code:reg.code, desc:reg.desc, section:reg.section, id:'', status:'',urlImg:reg.urlImg};
    //                 this.updateProduct(p)*/
    //             }
    //             else {
    //                 console.log('doesnt exist')
                                            
    //                 var p:Product = {code:reg.code, desc:reg.desc, section:reg.section, id:'', status:'',urlImg:reg.urlImg};
    //                 this.createProduct(p)
    //             }

    //         }
    //     )
    // }        
    // );
}
}
