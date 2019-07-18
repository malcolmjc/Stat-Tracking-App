import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictorStatsResultsComponent } from './predictor-stats-results.component';

describe('PredictorStatsResultsComponent', () => {
  let component: PredictorStatsResultsComponent;
  let fixture: ComponentFixture<PredictorStatsResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredictorStatsResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictorStatsResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
