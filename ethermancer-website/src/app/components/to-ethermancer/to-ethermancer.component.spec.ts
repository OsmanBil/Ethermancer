import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToEthermancerComponent } from './to-ethermancer.component';

describe('ToEthermancerComponent', () => {
  let component: ToEthermancerComponent;
  let fixture: ComponentFixture<ToEthermancerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToEthermancerComponent],
    });
    fixture = TestBed.createComponent(ToEthermancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
