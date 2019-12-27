import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CulqiComponent } from './culqi.component';

describe('CulqiComponent', () => {
  let component: CulqiComponent;
  let fixture: ComponentFixture<CulqiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CulqiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CulqiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
