import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbercubeComponent } from './numbercube.component';

describe('NumbercubeComponent', () => {
  let component: NumbercubeComponent;
  let fixture: ComponentFixture<NumbercubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumbercubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumbercubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
