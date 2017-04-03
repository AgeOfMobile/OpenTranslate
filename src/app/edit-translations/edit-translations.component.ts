import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable } from 'rxjs';

import { ConfigService } from '../config.service';
import { Term, Translation, Project, ProjectService } from '../project.service';

@Component({
  selector: 'app-edit-translations',
  templateUrl: './edit-translations.component.html',
  styleUrls: ['./edit-translations.component.css']
})
export class EditTranslationsComponent implements OnInit {
  project = new Project();
  language = '';
  languageName = '';
  translations: Observable<Translation[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private configService: ConfigService,
    private projectService: ProjectService) { }

  ngOnInit() {
    let key = this.route.snapshot.params['projectKey'];
    this.language = this.route.snapshot.params['language'];
    this.projectService.getProject(key)
      .subscribe(project => {
        this.project = project;

        let terms = this.projectService.getTerms(key);
        let translations = this.projectService.getTranslations(key, this.language);

        this.translations = Observable.combineLatest(terms, translations,
          (terms, translations) => {
            var result = [];
            var map = {};
            for (let trans of translations) {
              map[trans.$key] = trans;
            }
            for (let term of terms) {
              let trans = map[term.$key];
              if (trans == undefined) {
                trans = new Translation();
              }
              trans.term = term;
              result.push(trans);
            }
            return result;
          });
      });    

      this.languageName = this.configService.getLanguage(this.language).name;
  }

  save(text: string, translation: Translation) {
    translation.value = text;
    this.projectService.saveTranslation(this.project.$key, this.language, translation.term.$key, translation.value);
  }
}
