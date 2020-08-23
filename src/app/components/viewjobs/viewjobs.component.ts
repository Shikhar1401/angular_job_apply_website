import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import * as firebase from 'firebase';
import { DataService } from 'src/app/shared/data.service';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-viewjobs',
  templateUrl: './viewjobs.component.html',
  styleUrls: ['./viewjobs.component.scss']
})
export class ViewjobsComponent implements OnInit {

  jobData:any = [];
  userData: any =[];
  userType = '';
  noone: boolean = false;
  constructor(private toast: ToastrService, private authService: AuthenticationService, private dataService: DataService) { }
  
  ngOnInit(): void {
    console.log(this.jobData)
    this.jobData = [];
    console.log(this.authService.userType);
    this.userType = this.authService.userType;
    console.log(firebase.auth().currentUser);
    if(this.authService.userType == 'c'){
      this.dataService.getAllJobs().then(res =>{
        this.jobData = res
      });
      console.log(this.jobData);
    }else {

      firebase.firestore().collection('Jobs').where('userId','==',firebase.auth().currentUser.uid).onSnapshot(doc =>{
        var jobsArray = [];
        doc.forEach(val =>{
          jobsArray.push(val.data());
        })
        this.jobData = jobsArray;
        
      })
    }
  }

  getJobId(jobid){
    if(this.userType == 'r'){
      this.userData = [];
      this.noone = false;
      this.dataService.checkApplied(jobid).then(res =>{
        this.userData = res;
        console.log(res);
        if(this.userData == ''){
          this.noone = true;
          // console.log('noone applied');
          this.toast.success('No-one Has Applied Till','',{
            timeOut: 2500
          })
        }
      });
      

    }else {
      this.dataService.applyJob(jobid);
      
    }
  }

}
