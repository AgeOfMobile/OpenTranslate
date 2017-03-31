import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Project, ProjectService } from '../project.service';


@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project = new Project();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService) { }

  ngOnInit() {
    let key = this.route.snapshot.params['projectKey'];
    this.projectService.getProject(key)
      .subscribe(project => this.project = project);
  }
}
