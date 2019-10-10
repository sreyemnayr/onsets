import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParencubeComponent } from './parencube.component';

describe('ParencubeComponent', () => {
  let component: ParencubeComponent;
  let fixture: ComponentFixture<ParencubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParencubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParencubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
