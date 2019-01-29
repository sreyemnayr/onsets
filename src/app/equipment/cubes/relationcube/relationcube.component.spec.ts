import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationcubeComponent } from './relationcube.component';

describe('RelationcubeComponent', () => {
  let component: RelationcubeComponent;
  let fixture: ComponentFixture<RelationcubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationcubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationcubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
