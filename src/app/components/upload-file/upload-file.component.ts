import { Component } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {

  isUploading = false;
  uploadFile(event: any): void {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      console.log("Aucun fichier choisi pour l'upload.");
      return;
    }

    this.isUploading = true;

    setTimeout(() => {
      this.isUploading = false;
      console.log("Transfert terminé.");
    }, 3000);
  }

}
