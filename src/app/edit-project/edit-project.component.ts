import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Project, ProjectService } from '../project.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  project = new Project();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService) { }

  ngOnInit() {
    let key = this.route.snapshot.params['projectKey'];
    if (key != undefined) {
      this.projectService.getProject(key)
        .subscribe(project => this.project = project);   
    }
  }

  save() {
    this.projectService.save(this.project)
      .then(() => this.router.navigate(['/projects']))
      .catch(error => alert(error));
  }
}
