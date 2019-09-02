import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material';

import { ImageUploaderComponent } from './image-uploader.component';

@Component({
  template: `<app-image-uploader
               [defaultImagePath]="defaultImagePath"
               (imageChosen)="onImageChosen($event)">
             </app-image-uploader>`
})
class TestComponent {
  @ViewChild(ImageUploaderComponent) public component: ImageUploaderComponent;
  public defaultImagePath = 'test-image-path';
  public onImageChosen(event: File) {
    return event;
  }
}

describe('ImageUploaderComponent', () => {
  let component: ImageUploaderComponent;
  let testComponent: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule
      ],
      declarations: [
        ImageUploaderComponent,
        TestComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    component = testComponent.component;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should set up form', () => {
    expect(component.form).toBeTruthy();
  });

  describe('image selected', () => {
    test('button should open input', () => {
      const button = fixture.debugElement.query(By.css('button')).nativeElement;
      const fileInput = fixture.debugElement.query(By.css('[type="file"]')).context;
      button.click();
      fixture.detectChanges();
    });
  });

  describe('form functionality', () => {
    test('should reject invalid form', () => {
      jest.spyOn(testComponent, 'onImageChosen');
      expect(component.form.invalid).toBeTruthy();
      component.onSaveImage();
      expect(testComponent.onImageChosen).not.toHaveBeenCalled();
    });

    test('should emit an event with correct form', () => {
      jest.spyOn(testComponent, 'onImageChosen');
      const imageControl = component.form.controls.image;
      imageControl.setValue('blah.png');
      component.onSaveImage();
      expect(testComponent.onImageChosen).toHaveBeenCalled();
    });
  });
});
