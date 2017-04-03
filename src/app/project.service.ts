import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';

export class Project {
    $key: string;
    name: string;
    description: string;
    languages: Array<object>;
}

export class Term {
  $key: string;
  context: string;
}

export class Translation {
  $key: string;
  term: Term;
  value: string;
}

@Injectable()
export class ProjectService {
  constructor(private http: Http, private af: AngularFire) { }

  save(project: Project): Promise<any> {    
    console.log(project);
    if (project.$key == null) {
      const items = this.af.database.list('/projects');
      return Promise.resolve(items.push(project));
    } else {
      const obj = this.af.database.object(`/projects/${project.$key}`);
      return Promise.resolve(obj.update(project));
    }    
  }

  getProjects(): Observable<Project[]> {
    return this.af.database.list('/projects');      
  }

  getProject(projectKey: string): Observable<Project> {
    return this.af.database.object(`/projects/${projectKey}`);
  }

  deleteProject(projectKey: string) {
    this.af.database.object(`/projects/${projectKey}`).remove();
  }

  addLanguage(projectKey: string, language: string) {
    this.af.database.object(`/projects/${projectKey}/languages/${language}`)
      .update({ name: language, updated: new Date().getTime() });
  }

  removeLanguage(projectKey: string, language: string) {
    // TODO: update in transaction
    this.af.database.object(`/projects/${projectKey}/languages/${language}`).remove();
    this.af.database.list(`/translations/${projectKey}/${language}`).remove();
  }

  addTerm(projectKey: string, term: Term) {
    this.af.database.object(`/terms/${projectKey}/${term.$key}`)
      .update({ context: term.context });
  }

  removeTerm(projectKey: string, termKey: string) {
    this.af.database.object(`/terms/${projectKey}/${termKey}`).remove();
  }

  getTerms(projectKey: string): Observable<Term[]> {
    return this.af.database.list(`/terms/${projectKey}`);
  }

  saveTranslation(projectKey: string, language: string, term: string, text: string) {
    this.af.database.object(`/translations/${projectKey}/${language}/${term}`)
      .update({ value: text, updated: new Date().getTime() });
  }

  getTranslations(projectKey: string, language: string): Observable<Translation[]> {
    return this.af.database.list(`/translations/${projectKey}/${language}`);
  }
}
