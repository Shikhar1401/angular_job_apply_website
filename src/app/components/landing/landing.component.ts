import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  
  desc = '';
  jobName = '';

  constructor(private dataService: DataService,private activatedRoute: ActivatedRoute, private authService: AuthenticationService) { }

  ngOnInit(): void {
    console.log(this.authService.userType);
    this.authService.getJobs();
    // this.activatedRoute.paramMap.pipe(map(()=>{
    //   console.log(window.history.state);
    // }))
  }
  // submitJob(){
  //   this.dataService.addJobs(this.desc,this.jobName,'1234');
  //   console.log(this.desc,this.jobName);
  // }
//   $(document).ready(function () {

//     $('#sidebarCollapse').on('click', function () {
//         $('#sidebar').toggleClass('active');
//     });

// });
// showModal(): void {   
//   this.displayService.setShowModal(true); 
//   // communication to show the modal, I use a behaviour subject from a service layer here
// }


}
