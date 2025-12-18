import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { MatButtonModule } from '@angular/material/button';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent, MatButtonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display make and model', () => {
    component.makeAndModel = 'Honda Accord';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.hero__makeAndModelText')?.textContent).toContain('Honda Accord');
  });

  it('should display MSRP', () => {
    component.msrp = 25000;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const msrpText = compiled.querySelector('.hero__msrpText');
    expect(msrpText).toBeTruthy();
  });

  it('should display make logo when provided', () => {
    component.makeLogo = 'path/to/logo.png';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const logo = compiled.querySelector('.hero__makeLogo') as HTMLImageElement;
    expect(logo).toBeTruthy();
    expect(logo.src).toContain('path/to/logo.png');
  });

  it('should display car image when provided', () => {
    component.carImage = 'path/to/car.png';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const carImg = compiled.querySelector('.hero__carImage') as HTMLImageElement;
    expect(carImg).toBeTruthy();
    expect(carImg.src).toContain('path/to/car.png');
  });

  it('should display score when provided', () => {
    component.score = 8.5;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('8.5');
  });

  it('should display owner score when provided', () => {
    component.ownerScore = 9.0;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('9');
  });

  it('should call onFindCarsClick when Find Cars button is clicked', () => {
    spyOn(component, 'onFindCarsClick');
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');
    buttons[0].click();
    expect(component.onFindCarsClick).toHaveBeenCalled();
  });

  it('should call onCompareClick when Compare button is clicked', () => {
    spyOn(component, 'onCompareClick');
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');
    buttons[1].click();
    expect(component.onCompareClick).toHaveBeenCalled();
  });
});
