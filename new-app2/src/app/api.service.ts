import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }
  notes = [{
    title: "Sample TITLE1",
    description: "Sample DESC1",
    color: '#F2E7FE',
  },
  {
    title: "Sample TITLE2",
    description: "Sample DESC2",
    color: '#FFCCBC'
  }
];

  addNote(newNote) {
    this.notes.push(newNote);
  }

  deleteNote(index) {
    console.log(index);
    this.notes.splice(index, 1);
  }
}
