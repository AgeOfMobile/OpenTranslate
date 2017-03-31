import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Term, Project, ProjectService } from '../project.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {
  terms: Observable<Term[]>;

  private _project: Project;

  @Input()
  set project(project: Project) {
    this._project = project;
    this.terms = this.projectService.getTerms(project.$key);
  }   

  editing = false;
  newTerm = new Term();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService) { }

  ngOnInit() {
    
  }

  addTerm() {
    this.editing = true;
  }

  save() {
    this.projectService.addTerm(this._project.$key, this.newTerm);
    this.newTerm = new Term();
  }

  cancel() {
    this.editing = false;
  }
}
