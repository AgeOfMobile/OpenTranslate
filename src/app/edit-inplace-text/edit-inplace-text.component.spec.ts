import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInplaceTextComponent } from './edit-inplace-text.component';

describe('EditInplaceTextComponent', () => {
  let component: EditInplaceTextComponent;
  let fixture: ComponentFixture<EditInplaceTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInplaceTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInplaceTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
