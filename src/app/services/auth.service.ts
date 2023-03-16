import { Injectable } from '@angular/core';
import { from, Observable,Observer,of } from 'rxjs';
import { User } from '../models/user.model';

import {initializeApp} from 'firebase/app';
import {getFirestore,doc, DocumentData, DocumentReference} from 'firebase/firestore';

import { getAuth,signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User as FirebaseUser, NextOrObserver, NextFn } from 'firebase/auth';
import { convertToParamMap, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
/*
  sequenceSubscriber(observer: Observer<number>) {    
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.complete();
  
    return {unsubscribe() {}};
  }
  
  // Create a new Observable that will deliver the above sequence
  sequence = new Observable(this.sequenceSubscriber);
*/
  suscriptor(observer:Observer<User>) { 
    observer.next({uid: '33',email:'f@a.com'});   
    observer.next({uid: '32',email:'m@j.com'});   
    return {unsubscribe() {}};
  }
  
  //user$: Observable<User>=of(<User>{});    
  user$:Observable<User>= new Observable(this.suscriptor);


  firebaseApp = initializeApp (environment.firebaseConfig);
  auth = getAuth(this.firebaseApp);
  db = getFirestore(this.firebaseApp);

  provider = new GoogleAuthProvider();

  constructor(
    private router: Router
  ) {
    console.log('prod:' + environment.production)
    
    this.user$=new Observable<User>((observer)=>{               
      onAuthStateChanged(this.auth, (user) => {      
        if (user) {                  
          this.updateUserData(user);
          console.log('onstatechanged'+ user.email);
          
          observer.next(this.firebaseUserConverter.fromFireBase(user));
          
        } else {
        }
      });
      
      return {unsubscribe(){}}
    })
/*
    onAuthStateChanged(this.auth, (user) => {      
      if (user) {        
        const uid = user.uid;
        this.updateUserData(user);
        console.log('onstatechangedddddd'+ user.email);
        
        this.user$=new Observable<User>((observer)=>{          
          observer.next(this.firebaseUserConverter.fromFireBase(user));
          return {unsubscribe(){}}
        })

      } else {
      }
    });   
    */
   }

   async googleSignin() {
    console.log('googleSignin');
    signInWithPopup(this.auth,this.provider).then((result)=>{
      const credential = GoogleAuthProvider.credentialFromResult(result);     
      if (credential) {
        const token = credential.accessToken;
        const user = result.user;  
      } 
    }).catch((error)=> {
      const errorCode = error.code;
      const errorMessage = error.message;    
      const email = error.customData.email;    
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
    }
    
    async signOut() {
      //todo await this.afAuth.signOut();
      return this.router.navigate(['/']);
    }   
    
    firebaseUserConverter= {
      fromFireBase: (firebaseUser:FirebaseUser): User => {
        return <User> {email:firebaseUser.email,uid:firebaseUser.uid} ;
      }
    }

    firestoreConverter = {
      toFirestore: (user:User) => {
          return {
            uid: user.uid,
            email:user.email,
            photoURL: user.photoURL,
            displayName: user.displayName,
          };
      },
      fromFirestore: (snapshot:any, options:any):User => {
          const data = snapshot.data(options);
          
          return <User> {email:data.email,uid:data.uid} ;
      }
  };

    private updateUserData(user:FirebaseUser) {
      //console.log(user.uid);
      const userRef=doc(this.db,`users/${user.uid}`,'').withConverter(this.firestoreConverter);
      //console.log(userRef.id);            

      // Sets user data to firestore on login
      //const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
      /*
      const data = { 
        uid: user.uid, 
        email: user.email, 
        displayName: user.displayName, 
        photoURL: user.photoURL
      } 
  */
      //todo return setDoc(doc(this.db, `users/${user.uid}`), data);
      //return userRef.set(data, { merge: true })
      
    }
}


