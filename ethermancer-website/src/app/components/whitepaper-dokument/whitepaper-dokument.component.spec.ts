import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhitepaperDokumentComponent } from './whitepaper-dokument.component';

describe('WhitepaperDokumentComponent', () => {
  let component: WhitepaperDokumentComponent;
  let fixture: ComponentFixture<WhitepaperDokumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WhitepaperDokumentComponent],
    });
    fixture = TestBed.createComponent(WhitepaperDokumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
