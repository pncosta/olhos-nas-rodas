import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { UploadFileService } from '../upload-file.service';
import { FileUpload } from '../fileupload';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

export interface Image {
  id: string;
  path: string;
  name: string;
  size: number;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  
}

@Component({
  selector: 'app-form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.scss']
})
export class FormUploadComponent implements OnInit {

  @Input() get images() { return this._images; }
  @Output() imagesChange = new EventEmitter();
  _images: Image[];
  isHovering: boolean; // State for dropzone CSS toggling
  private spinnersize = 30;
  private storagePath = 'images/'
  public static MAX_PHOTOS = 5;
  public static MAX_MB_PHOTO = 1;
  constructor(private afStorage: AngularFireStorage, 
              private uploadService: UploadFileService) { }

  ngOnInit() {
    this._images = new Array();
  }

  set images(img) {
    this._images = img;
    this.imagesChange.emit(this.images);
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  /**
   * @param event 
   */
  startUpload(event: FileList) {
    const image = {} as Image;
    const file = event.item(0);
   
    if (this.fileIsAllowed(file)) {
      image.id = Math.random().toString(36).substring(2); // create a random id
      image.path = `${this.storagePath}${image.id}`;  // path and ID
      image.ref = this.afStorage.ref(`${this.storagePath}${image.id}`);  // reference to the storage location
      image.task = image.ref.put(file); // kick off the upload
      image.percentage = image.task.percentageChanges();
      image.snapshot   = image.task.snapshotChanges();
      image.size = file.size;
      image.name = file.name;

      this._images.push(image);
      this.imagesChange.emit(this.images);

      //Detect when upload is finished
      image.task.snapshotChanges().pipe(
        finalize(() => image.ref.getDownloadURL().subscribe(val => 
                image.downloadURL = val))
      ).subscribe()
    }
    else {
      console.error('file not allowed!');
    }
  }

  public fileIsAllowed(f: File) {    
    console.log (f);
    return this._images.length < FormUploadComponent.MAX_PHOTOS && 
           f.size <= FormUploadComponent.MAX_MB_PHOTO * 1024 * 1024 &&
           (f.type === 'image/jpeg' || f.type === 'image/png') ;
  }
    // Determines if the upload task is active
    isActive(snapshot) {
      return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
    }

    /**
     * removes the given image from the list and from firebase storage
     * @param e 
     */
    remove (img) {
      this.afStorage.ref(`${this.storagePath}${img.id}`).delete();
      var index = this._images.indexOf(img);
      this._images.splice(index, 1);
      this.imagesChange.emit(this.images);
    }
}
