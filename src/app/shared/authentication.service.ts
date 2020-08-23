import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData: Observable<firebase.User>;
  userType: string;
  uid;
  jobsArray = [];
  authState: any = null;
  constructor(private toast: ToastrService, private router: Router,private angularFireAuth: AngularFireAuth, private firestore:AngularFirestore) {
    this.angularFireAuth.authState.subscribe( state =>{
      this.authState = state;
    } )
   }

  signup(email: string, password: string, type: string){
    this.angularFireAuth.createUserWithEmailAndPassword(email,password)
      .then(res =>{
        if(res.user){
          console.log(res.user.uid);
          this.firestore.collection('users').doc(res.user.uid).set(
            {
              email: email,
              password: password,
              // uid: res.user.uid,
              type: type
            }
          )
        }
        
        this.toast.success('successfully signed up','',{
          timeOut:2500
        })
      }).catch(err => {
        this.toast.error(err.message,'',{
          timeOut:2500
        })
        // console.log('Something is wrong:', error.message);
      })
  }

  signin(email: string, password: string){
    this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.uid = res.user.uid;
        console.log(this.uid);
        this.firestore.collection('users').doc(res.user.uid).ref.get()
          .then(res =>{
            const data = res.data();
            this.userType = data.type;
            this.router.navigateByUrl('/landing');
            console.log(res.data());
          })
        console.log('Successfully signed in!');
      }).catch(err =>{
        this.toast.error(err.message,'',{
          timeOut: 2500
        })
      });
  }

  resetPassword(email: string){
    return this.angularFireAuth.sendPasswordResetEmail(email);
  }

  getCurrentUseruid(){
    if(this.authState !== null){
      console.log(this.authState.uid);
      const val = this.authState.uid;
      return val;
      // return this.authState.uid; here it should return this uid so it could be captured in the data service instead it return a promise
    }
  }

  SignOut() {
    this.angularFireAuth
      .signOut();
  } 

  getJobs(){
    this.firestore.collection('jobs').ref.get().then(res =>{
      res.forEach((doc) => {
        // this.jobsArray.push([...doc.data().jobs])
        console.log(doc.data());
        doc.data().jobs.forEach((res) =>{
          this.jobsArray.push(res);
        })
        console.log(this.jobsArray);
      })
    })
  }

  public checkAuth() {
    return new Promise(resolve => {
      this.angularFireAuth.onAuthStateChanged(user => {
        resolve(user);
      })
        // this.angularFireAuth.auth.onAuthStateChanged(user => {
        //     resolve(user);
        //  })    
    })
  }
}
