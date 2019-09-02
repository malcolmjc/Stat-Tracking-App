import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image-uploader',
  template: 'MOCK image uploader'
})
export class MockImageUploaderComponent {
  @Input() public defaultImagePath = 'assets/question.png';
  @Output() public imageChosen = new EventEmitter<File>();
}
