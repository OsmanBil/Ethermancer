import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Angulartics2, RouterlessTracking } from 'angulartics2';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent]
      ,
      providers: [
        { provide: Angulartics2, useValue: { startTracking: () => { } } }, // Mock Angulartics2
     ]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
