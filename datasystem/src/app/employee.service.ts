import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  doc,
  collectionData,
  deleteDoc,
  updateDoc,
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { Employee } from 'src/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  ngOnInit() {}

  constructor(private firestore: Firestore) {}

  //adding Employee
  addEmployee(employee: Employee) {
    employee.id = doc(collection(this.firestore, 'id')).id;
    return addDoc(collection(this.firestore, 'employees'), employee);
  }

  //getting all Employees
  getEmployees(): Observable<Employee[]> {
    let employeesRef = collection(this.firestore, 'employees');
    return collectionData(employeesRef) as Observable<Employee[]>;
  }

  //delete employee
  removeEmployee(employee: Employee): Promise<void> {
    const docRef = doc(this.firestore, `employees/${employee.id}`);
    return deleteDoc(docRef);
  }

  // updating employee
  updateEmployee(employee: Employee, employees: any) {
    let docRef = doc(collection(this.firestore, `employees/${employee.id}`));
    return updateDoc(docRef, employees);
  }
}
