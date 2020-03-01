import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';


import { FileUploader } from 'ng2-file-upload';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-Photo',
  templateUrl: './add-Photo.component.html',
  styleUrls: ['./add-Photo.component.scss'],
})
export class AddPhotoComponent implements OnInit {
  date: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: true,
    defaultOpen: false,
  }

  @ViewChild('variable') myform: NgForm;
  public uploader: FileUploader = new FileUploader({ url: "http://localhost:7878/" + 'createPhoto' });
  startDate: any = {};
  endDate: any = {};
  url: any;
  reader:any;
  updateAttendanceReq: any = {};
  classAndSection: any = {};
  getClassAndSection: any = {};
  getClassAndSectionUrl: string;
  addPhoto: any = {};
  fetchPhotoProfileUrl: string;
  addPhotoUrl: string;
  resAddPhoto: any = {};
  event: any;
  fetchStudentProfileUrl: string;
  eventdata: any;
  stuFulldata: any;
  private sub: any;
  form: FormGroup;
  formData: FormData = new FormData();
  loading: boolean = false;

  constructor(
    public http: HttpClient,
    public router: Router,
    private fb: FormBuilder,
  )
  {

    this.createForm();
  }
  ngOnInit() {

  }
  public files: any[];
  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      avatar: null
    });
  }
  contructor() {
    this.files = [];
  }

  imageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.reader = new FileReader();

      this.reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
      }
      this.reader.readAsDataURL(event.target.files[0]);
    }
  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files[0].size > 1000000) {
      console.log("Ohoto size is more than 1 MB")
    }
    else if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      this.formData.append('schoolId', localStorage.getItem('schoolId'));
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('avatar').setValue({
          filename: file.name,
          filetype: file.type,
          value: this.reader.result.split(',')[1]
        })
      };
    }
  }

  addPhotoFunc() {
    const formModel = this.form.value;
    this.addPhoto.file = formModel;
    this.loading = true;
    this.addPhotoUrl = "http://localhost:7878/" + 'PhotoAdd';
    this.http.post(this.addPhotoUrl, this.formData)
      .subscribe(x => {
      }, () => {
      });
  }
}
