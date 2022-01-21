import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaReadComponent } from './pessoa-read.component';

describe('PessoaReadComponent', () => {
  let component: PessoaReadComponent;
  let fixture: ComponentFixture<PessoaReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PessoaReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoaReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
