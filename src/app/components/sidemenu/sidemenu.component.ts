import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { v4 as uuidv4 } from 'uuid';
import { AuthenticationService } from 'src/app/shared/authentication.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  desc : string;
  jobName : string;
  userType = '';

  constructor(private dataService: DataService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.userType = this.authService.userType;
  }

  submitJob(){
    this.dataService.addJobs(this.desc,this.jobName);
    console.log(this.desc,this.jobName);
    this.desc = '';
    this.jobName = '';
  }

}
