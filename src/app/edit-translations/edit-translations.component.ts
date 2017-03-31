import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Term, Translation, Project, ProjectService } from '../project.service';

@Component({
  selector: 'app-edit-translations',
  templateUrl: './edit-translations.component.html',
  styleUrls: ['./edit-translations.component.css']
})
export class EditTranslationsComponent implements OnInit {
  project = new Project();
  language = '';
  translations: Observable<Translation[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
            console.log(translations);

            var result = [];
            var map = {};
            for (let trans of translations) {
              map[trans.$key] = trans;
            }
            console.log(map);
            for (let term of terms) {
              let trans = map[term.$key];
              console.log(`Translation for key ${term.$key}: `, trans);
              if (trans == undefined) {
                trans = new Translation();
              }
              trans.term = term;
              result.push(trans);
            }
            return result;
          });
      });    
  }

  save(translation: Translation) {
    this.projectService.saveTranslation(this.project.$key, this.language, translation.term.$key, translation.value);
  }
}
