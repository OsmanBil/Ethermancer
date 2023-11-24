import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutEthermancerComponent } from './about-ethermancer.component';
import { DOCUMENT } from '@angular/common';

describe('AboutEthermancerComponent', () => {
  let component: AboutEthermancerComponent;
  let fixture: ComponentFixture<AboutEthermancerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutEthermancerComponent],
      providers: [{ provide: DOCUMENT, useValue: document }]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutEthermancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should initially have isLoading as true', () => {
    expect(component.isLoading).toBeTrue();
  });
  
  it('should call scrollToElement without errors', () => {
    spyOn(component, 'scrollToElement').and.callThrough();
    component.scrollToElement('systems');
    expect(component.scrollToElement).toHaveBeenCalled();
  });
  
});
