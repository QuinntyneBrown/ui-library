import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScoreComponent } from './score.component';

describe('ScoreComponent', () => {
  let component: ScoreComponent;
  let fixture: ComponentFixture<ScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render content projection', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.score')).toBeTruthy();
  });
});
