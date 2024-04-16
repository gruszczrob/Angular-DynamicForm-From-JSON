import { Component } from '@angular/core';
import * as fsPromise from 'fs/promises'; 
import { FileService } from './file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'dynamicFormApp';
 
  constructor(private fileService: FileService){}

  CreateNewFormBtnClicked(){
    const file = document.getElementById('inputFile') as HTMLInputElement;
    
    if (file != null) {
      //console.log(file.value)
      const file2 = file.files![0] as File;
      if (file2) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          const fileContent = fileReader.result as string;
          //console.log(jsonData);
          this.fileService.setFile(fileContent)


          //console.log(jsonData.name);
        };
        fileReader.readAsText(file2);
        //console.log(file2)
      }
    }
  }
}
