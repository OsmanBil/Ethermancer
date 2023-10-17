import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutEthermancerComponent } from './about-ethermancer.component';

describe('AboutEthermancerComponent', () => {
  let component: AboutEthermancerComponent;
  let fixture: ComponentFixture<AboutEthermancerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutEthermancerComponent],
    });
    fixture = TestBed.createComponent(AboutEthermancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
