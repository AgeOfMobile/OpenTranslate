import { Component, OnInit, AfterViewChecked, Input, Pipe, PipeTransform } from '@angular/core';
import { Project, ProjectService } from '../project.service';
import { Language, ConfigService } from '../config.service';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit {
  languageMap = {};
  allLanguages: Language[];

  newLanguage: object;
  editing = false;

  @Input() project: Project;

  constructor(private projectService: ProjectService, private configService: ConfigService) { }

  ngOnInit() {
    this.allLanguages = this.configService.getAvailableLanguages();
    for (let language of this.allLanguages) {
      this.languageMap[language.code] = language;
    }
  }

  showAddForm() {
    this.editing = true;
  }

  add() {
    this.projectService.addLanguage(this.project.$key, this.newLanguage['code']);
  }

  delete(language: string) {
    this.projectService.removeLanguage(this.project.$key, language);
  }
  
  get languages(): Language[] {
    var result = [];
    if (this.project != null && this.project.languages != null) {
      for (var name in this.project.languages) {
        result.push(this.languageMap[name]);
      }
    }
    return result;
  }
}
