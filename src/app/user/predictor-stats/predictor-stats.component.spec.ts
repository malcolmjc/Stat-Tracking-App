import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictorStatsComponent } from './predictor-stats.component';

describe('PredictorStatsComponent', () => {
  let component: PredictorStatsComponent;
  let fixture: ComponentFixture<PredictorStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredictorStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictorStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
