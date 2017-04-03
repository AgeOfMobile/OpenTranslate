import { Component, OnInit, AfterViewChecked, Input, Pipe, PipeTransform } from '@angular/core';
import { Project, ProjectService } from '../project.service';
import { Language, ConfigService } from '../config.service';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit {
  allLanguages: Language[];

  newLanguage: object;
  editing = false;

  @Input() project: Project;

  constructor(private projectService: ProjectService, private configService: ConfigService) { }

  ngOnInit() {
    this.allLanguages = this.configService.getAvailableLanguages();
  }

  showAddForm() {
    this.editing = true;
  }

  add() {
    this.projectService.addLanguage(this.project.$key, this.newLanguage['code']);
    this.editing = false;
  }

  cancel() {
    this.editing = false;
  }

  delete(language: string) {
    this.projectService.removeLanguage(this.project.$key, language);
  }
  
  get languages(): Language[] {
    var result = [];
    if (this.project != null && this.project.languages != null) {
      for (let language in this.project.languages) {
        result.push(this.configService.getLanguage(language));
      }
    }
    return result;
  }
}
