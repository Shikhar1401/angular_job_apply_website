import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-view-jpplied-jobs',
  templateUrl: './view-jpplied-jobs.component.html',
  styleUrls: ['./view-jpplied-jobs.component.scss']
})
export class ViewJppliedJobsComponent implements OnInit {

  appliedJobs: any = [];
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.appliedJobs = [];
    this.dataService.getCandidateAppliedjob().then(res=>{
      this.appliedJobs = res;
      console.log(this.appliedJobs);
    })

    

  }

}
