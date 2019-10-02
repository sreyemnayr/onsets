import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreencubeComponent } from './greencube.component';

describe('GreencubeComponent', () => {
  let component: GreencubeComponent;
  let fixture: ComponentFixture<GreencubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreencubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreencubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
