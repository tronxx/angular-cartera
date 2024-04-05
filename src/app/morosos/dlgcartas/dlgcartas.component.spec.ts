import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgcartasComponent } from './dlgcartas.component';

describe('DlgcartasComponent', () => {
  let component: DlgcartasComponent;
  let fixture: ComponentFixture<DlgcartasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DlgcartasComponent]
    });
    fixture = TestBed.createComponent(DlgcartasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
