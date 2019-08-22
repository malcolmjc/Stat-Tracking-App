import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, ViewChild } from '@angular/core';

import { MatProgressSpinnerModule } from '@angular/material';

import { LoadingIndicatorComponent } from './loading-indicator.component';
import { By } from '@angular/platform-browser';

@Component({
  template: '<app-loading-indicator [fullPage]="fullPage"></app-loading-indicator>'
})
class TestComponent {
  @ViewChild(LoadingIndicatorComponent) public component: LoadingIndicatorComponent;
  public fullPage = true;
}

describe('LoadingIndicatorComponent', () => {
  let component: LoadingIndicatorComponent;
  let testComponent: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatProgressSpinnerModule
      ],
      declarations: [
        LoadingIndicatorComponent,
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

  test('should get correct classname if fullPage', () => {
    expect(testComponent.fullPage).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.loading-indicator-container-full'))).toBeTruthy();
  });

  test('should get correct classname if not fullPage', () => {
    testComponent.fullPage = false;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.loading-indicator-container'))).toBeTruthy();
  });
});
