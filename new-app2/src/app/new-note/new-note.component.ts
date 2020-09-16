import { ApiService } from './../api.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MatBottomSheet, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';




@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.css']
})
export class NewNoteComponent implements OnInit {
  constructor(private _bottomSheet: MatBottomSheet, public apiService: ApiService) { }
  ngOnInit(): void {
  }

  deleteNote(index) {
    this.apiService.deleteNote(index);
  }

  addNote() {
    this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  }

  editNote(index) {
    this._bottomSheet.open(BottomSheetOverviewExampleSheet,{ data: index });
  }

}





@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: 'bottom-sheet-overview-example-sheet.html',
})
export class BottomSheetOverviewExampleSheet implements OnInit {
  constructor(private formBuilder: FormBuilder, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
     private  apiService: ApiService, private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>) {}
  formGroup: FormGroup;
  colors = ['#03DAC5', '#F2E7FE', '#FFDE03', '#FFCCBC' ]

  pageTitle = "New Note";
  ngOnInit () {
    this.createForm(this.data);
  }

  onSubmit(post) {
    if(this.pageTitle == "New Note")  {
      this.apiService.addNote(post);
    }
    else{
      this.apiService.notes[this.data]=post;
    }

    console.log(post);
    this._bottomSheetRef.dismiss(true);
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  createForm(data) {
    if(data==null)  {
      this.pageTitle="New Note"
      this.formGroup = this.formBuilder.group({
        title: [null, Validators.required],
        description: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
        color: ['#F2E7FE', [Validators.required]],
      });
    }
    else {
      this.pageTitle = "Edit Note"
      this.formGroup = this.formBuilder.group({
        title: [this.apiService.notes[data].title, Validators.required],
        description: [this.apiService.notes[data].description, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
        color: ['#F2E7FE', [Validators.required]],
      });
    }

  }

}
