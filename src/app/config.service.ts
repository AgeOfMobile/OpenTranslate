import { Injectable } from '@angular/core';

export class Language {
  code: string;
  name: string;  
}

const LANGUAGES = [
  { code: "en", name: "English"},
  { code: "fr", name: "French"},
  { code: "vi", name: "Tiếng Việt"}
];

@Injectable()
export class ConfigService {
  private languagesMap = {};

  constructor() { 
    for (let language of LANGUAGES) {
      this.languagesMap[language.code] = language;
    }
  }

  getAvailableLanguages(): Language[] {
    return LANGUAGES;
  }

  getLanguage(code: string): Language {
    return this.languagesMap[code];
  }
}
