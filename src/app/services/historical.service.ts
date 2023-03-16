import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore';
import { environment } from 'src/environments/environment';

import { Product } from '../models/product.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class HistoricalService {
  firebaseApp = initializeApp (environment.firebaseConfig);    
  db = getFirestore(this.firebaseApp);

  constructor(
    //todo private firestore:AngularFirestore  
    ) { }


  //USE CASES
  createHistorical(product:Product,user:User,date:Date) {

/*    
    return new Promise((resolve, reject) => {      

      this.firestore.doc(`users/${user.uid}`).collection('historical').add(this.toFSHistorical(product,user,date))
      .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          resolve (docRef.id);
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
          reject(error)
      })    
    })
    */

      return new Promise(resolve => {
  
        const fbHistorical=this.toFSHistorical (product,user,date);
        const fbCollection = doc(collection(this.db, `users/${user.uid}/historical`));
  
        setDoc(fbCollection,fbHistorical);
      }
      )    

  }

  toFSHistorical(oProduct: Product, oUser: User, date:Date ) {

    return {
      productCode: oProduct.code,
      userid: oUser.uid,
      date: date
    }
  }
}
