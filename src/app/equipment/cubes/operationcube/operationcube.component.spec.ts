import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationcubeComponent } from './operationcube.component';

describe('OperationcubeComponent', () => {
  let component: OperationcubeComponent;
  let fixture: ComponentFixture<OperationcubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationcubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationcubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
