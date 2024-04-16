import { Component } from '@angular/core';
import { FileService } from '../file.service';

interface FormData {
  [key: string]: string; // Define an index signature for the object
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  HtmlInputTypes: string[] = [
    "button",
    "checkbox",
    "color",
    "date",
    "datetime-local",
    "email",
    "file",
    "hidden",
    "image",
    "month",
    "number",
    "password",
    "range",
    "reset",
    "search",
    "tel",
    "text",
    "time",
    "url",
    "week"
  ];

  constructor(private fileService: FileService){}
  showButton: boolean = false;
  json:any = ''
  ngOnInit():void{
    try{
      this.fileService.getFile.subscribe(file => {
        if(file!=""){
          var jsonData = JSON.parse(file);
          this.json = jsonData
          //console.log(Object.keys(jsonData)[0])
          
          //console.log("aa")
          const formPlace = document.getElementById('formPlace') as HTMLDivElement;
          if (formPlace != null){
            var toInner: string = "<form>"
            formPlace.innerHTML = ""
            for(let i=0; i<Object.keys(jsonData).length; i+=1){
              var key = Object.keys(jsonData)[i]
              this.showButton = true;
              if(this.HtmlInputTypes.includes(jsonData[key].type)){
                toInner += "<label>"+ key +"</label><input name='"+ key +"' type='"+jsonData[key].type+"'><br>"
              }else{
                if(jsonData[key].type == "select"){
                  var optionList = jsonData[key].options
                  toInner += "<p>" + key + ":</p>"
                  toInner += "<form>"
                  for(let l = 0; l<optionList.length; l+=1){
                    toInner += "<input type='radio' value='" + optionList[l] + "' name='"+ key +"'><label>"+ optionList[l] +"</label><br>"
                  }
                  toInner += "</form>"
  
                }
              }
            }
            toInner += "</form>"
            formPlace.innerHTML = toInner
            
          }else{
            console.log(formPlace)
          }
        }
      });
    }catch(e){
      console.log("Zły format")
    }
    
    
    
  }

  
  onSubmit(): void {
    const formData:FormData = {};
    //console.log(document.querySelectorAll(`input[name="kota"]`))
    var jsonJ = this.json
    for(let i=0; i<Object.keys(jsonJ).length; i+=1){
      var key = Object.keys(jsonJ)[i]
      const input = document.querySelectorAll(`input[name="${key}"]`) as NodeListOf<HTMLInputElement>;
      console.log(input)
      if(input.length>1){
        for(let g=0; g<input.length; g+=1){
          if(input[g].checked){
            formData[key] = input[g].value;
          }
        }
      }else{
        if (input.length>0) {
          if(jsonJ[key].type == "checkbox"){
            formData[key] = String(input[0].checked);
          }else{
            formData[key] = input[0].value;
          }
        }
      }

    }

    // Convert form data to JSON
    const jsonData = JSON.stringify(formData, null, 2);

    // Create a blob with the JSON data
    const blob = new Blob([jsonData], { type: 'application/json' });

    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'form_data.json';

    // Append the anchor to the document body and trigger the click event
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
  }
}
