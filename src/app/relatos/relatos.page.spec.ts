import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RelatosPage } from './relatos.page';

describe('RelatosPage', () => {
  let component: RelatosPage;
  let fixture: ComponentFixture<RelatosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
