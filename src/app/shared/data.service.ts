import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import * as firebase from 'firebase';
import { ToastrService } from 'ngx-toastr'; 
// import { v4 as uuidv4 } from 'uuid';
// import { promises } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  jobsArray = [];
  // usersArray = [];
  id;
  constructor(private toast: ToastrService,private firestore:AngularFirestore, private authService: AuthenticationService) { }
  // this.firestore.collection('users').doc(res.user.uid).set(
  addJobs(jobname, description){
    // if(this.authService.uid == undefined){
    //   // this.id = this.authService.getCurrentUseruid();
    //   // console.log(this.id);
    //   this.id = this.authService.getCurrentUseruid();
    //   console.log(this.id);
    //   // this.id = this.authService.uid;
    //   this.firestore.collection('Jobs').doc(this.id).set({
    //     jobs: [
    //       {
    //         jobId: jobid,
    //         jobName: jobname,
    //         description: description
    //       }
    //     ]
    //   })
      // this.firestore.collection('Jobs').doc(this.id).ref.get()
      // .then(res =>{
      //   console.log(res.data())
      //   if(res.data() == null ){
      //     console.log('no data for this user') 
      //   }
      // })
    // }
    // else {

      // console.log(this.authService.uid)
      // var testid = uuidv4();
      // console.log(testid);
    // this.firestore.collection('Jobs').doc(this.authService.uid).ref.get()
    //   .then(res =>{
    //     console.log(res.data())
    //   })
    // console.log(firebase.auth().currentUser);
    var ref = firebase.firestore().collection('Jobs');
    var doc = ref.doc();
    doc.set({
            jobId: doc.id,
            jobName: jobname,
            description: description,
            userId: firebase.auth().currentUser.uid
          })
    // ref.update({
    //     jobs: firebase.firestore.FieldValue.arrayUnion({
    //       jobId: ref.,
    //       jobName: jobname,
    //       description: description,
    //       userdId: firebase.auth().currentUser.uid
    //     }) 
    // })

    // }
    
  }

  getAllJobs(){
    this.jobsArray = [];
    return new Promise((resolve,reject) =>{
      this.firestore.collection('Jobs').ref.get().then(res =>{
        res.forEach((val) => {
          this.jobsArray.push(val.data());
          // this.jobsArray.push([...doc.data().jobs])
          // console.log(val.data());
        })
        resolve(this.jobsArray)
      });

    })
    // return this.jobsArray;
  }

  // getSpecificJobs(){
    
  //   return new Promise((resolve,reject) =>{
  //     firebase.firestore().collection('Jobs').where('userId','==',firebase.auth().currentUser.uid).onSnapshot(doc =>{
  //       this.jobsArray = [];
  //       doc.forEach(val =>{
  //         this.jobsArray.push(val.data());
  //       })
  //       resolve(this.jobsArray)
  //     })
  //     firebase.firestore().collection('Jobs').where('userId','==',firebase.auth().currentUser.uid).get()
  //     .then( res=>{
  //       // resolve(res);
  //       res.forEach((val)=>{
  //         this.jobsArray.push(val.data());
  //         // console.log(val.data());
  //       })
  //       resolve(this.jobsArray);
  //     })
  //   })
  // }

  applyJob(job){
    // var check = false;
    var flag =0;
    firebase.firestore().collection('applied').where('userId','==',firebase.auth().currentUser.uid).get()
      .then(res =>{
        res.forEach((val)=>{
          // console.log(val.data().jobid);
          if(val.data().jobid == job){
              // console.log('exists');
              flag = 1;
          }
        })
        if(flag == 1){
          this.toast.warning('Already Applied!!','',{
            timeOut: 2500
          })
        }else {
          firebase.firestore().collection('applied').add({
            jobid: job,
            userId: firebase.auth().currentUser.uid
          })
          this.toast.success('Successfully Applied !!!','',{
            timeOut:2500
          })
        }
    })
  }

  checkApplied(job){
    console.log(job);
    var usersArray = [];
    var promises = [];
    return new Promise((resolve,reject) =>{
      firebase.firestore().collection('applied').where('jobid','==',job).get()
      .then( res => {
        res.forEach((val)=>{
          var userid = val.data().userId;
          promises.push(firebase.firestore().collection('users').doc(userid).get())
        })
        Promise.all(promises).then(res =>{
            res.forEach((val) => {
              usersArray.push(val.data())
            })
              // console.log(res.data());
              resolve(usersArray)
            })
      })
    })
    
  }

  getCandidateAppliedjob(){
    var appliedArray = []
    var promises = []
    return new Promise((resolve,reject) =>{
      firebase.firestore().collection('applied').where('userId','==',firebase.auth().currentUser.uid).get()
      .then( res =>{
        res.forEach( (val) =>{
          promises.push(firebase.firestore().collection('Jobs').doc(val.data().jobid).get())
        })
        Promise.all(promises).then(res=>{
          res.forEach((val)=>{
            appliedArray.push(val.data())
          })
          resolve(appliedArray)
        })
      })
    })
    

  }
}
