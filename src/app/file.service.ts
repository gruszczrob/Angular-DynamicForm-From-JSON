import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private file = new BehaviorSubject('');
  getFile = this.file.asObservable();
  constructor() { }

  setFile(file: string){
    this.file.next(file)
    //console.log(this.file.value)
  }

}
