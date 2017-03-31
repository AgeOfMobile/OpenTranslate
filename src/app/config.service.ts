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
  constructor() { 

  }

  getAvailableLanguages(): Language[] {
    return LANGUAGES;
  }
}
