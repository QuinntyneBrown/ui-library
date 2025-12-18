import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalService } from './modal.service';
import { Component } from '@angular/core';

@Component({
  selector: 'lib-test-component',
  template: '<div>Test</div>'
})
class TestComponent {}

describe('ModalService', () => {
  let service: ModalService;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<any>>;

  beforeEach(() => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    dialogSpy.open.and.returnValue(dialogRefSpy);

    TestBed.configureTestingModule({
      providers: [
        ModalService,
        { provide: MatDialog, useValue: dialogSpy }
      ]
    });

    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open dialog with component', () => {
    service.open(TestComponent);
    expect(dialogSpy.open).toHaveBeenCalledWith(TestComponent, jasmine.any(Object));
  });

  it('should open dialog with data', () => {
    const testData = { test: 'data' };
    service.open(TestComponent, testData);
    expect(dialogSpy.open).toHaveBeenCalledWith(
      TestComponent,
      jasmine.objectContaining({ data: testData })
    );
  });

  it('should close dialog', () => {
    service.open(TestComponent);
    service.close();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should handle close when no dialog is open', () => {
    expect(() => service.close()).not.toThrow();
  });
});
