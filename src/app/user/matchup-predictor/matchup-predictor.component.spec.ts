import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchupPredictorComponent } from './matchup-predictor.component';

describe('MatchupPredictorComponent', () => {
  let component: MatchupPredictorComponent;
  let fixture: ComponentFixture<MatchupPredictorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchupPredictorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchupPredictorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
