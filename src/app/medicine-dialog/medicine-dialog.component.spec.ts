import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineDialogComponent } from './medicine-dialog.component';

describe('MedicineDialogComponent', () => {
  let component: MedicineDialogComponent;
  let fixture: ComponentFixture<MedicineDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicineDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
