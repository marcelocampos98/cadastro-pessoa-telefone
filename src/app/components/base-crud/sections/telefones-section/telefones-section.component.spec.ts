import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelefonesSectionComponent } from './telefones-section.component';

describe('TelefonesSectionComponent', () => {
  let component: TelefonesSectionComponent;
  let fixture: ComponentFixture<TelefonesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelefonesSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelefonesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
