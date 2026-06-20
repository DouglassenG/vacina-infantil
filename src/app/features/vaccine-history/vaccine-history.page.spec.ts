import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VaccineHistoryPage } from './vaccine-history.page';

describe('VaccineHistoryPage', () => {
  let component: VaccineHistoryPage;
  let fixture: ComponentFixture<VaccineHistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccineHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
