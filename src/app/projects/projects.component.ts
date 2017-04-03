import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Project, ProjectService } from '../project.service';
import { Language, ConfigService } from '../config.service';

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Observable<Project[]>;

  constructor(
    private router: Router, 
    private configService: ConfigService,
    private projectService: ProjectService) { }

  ngOnInit() {
    this.projects = this.projectService.getProjects();
  }

  onEdit(project: Project) {
    this.router.navigate(['/edit-project', project.$key]);
  }

  onDelete(project: Project) {
    this.projectService.deleteProject(project.$key);
  }

  getLanguages(project: Project): Language[] {
    let result = [];
    for (let name in project.languages) {
      result.push(this.configService.getLanguage(name));
    }
    return result;
  }
}
