import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Settings } from '../settings';

const STORAGE_KEY = 'local_onsets_v190228a';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {}

  public saveSettings(settings: Settings): Settings {
    if (settings) {
      this.storage.set(STORAGE_KEY, settings);
    }
    return this.getSettings();
  }

  public getSettings(): Settings {
    return this.storage.get(STORAGE_KEY) || new Settings();
  }
}
