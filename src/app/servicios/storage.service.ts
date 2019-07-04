import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  constructor(private storage: AngularFireStorage) {
    this.downloadURL = new Observable<string>();
    this.uploadPercent = new Observable<number>();
  }

  uploadFileOnEvent(event) {
    const file = event.target.files[0];
    const filePath = environment.storage.profileFolder + '/' + Math.random().toString(36).substring(7) + new Date().getTime() + file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = fileRef.getDownloadURL())
    ).subscribe();
  }


}
