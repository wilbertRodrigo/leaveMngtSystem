import { Component } from '@angular/core';
import { Employee } from 'src/employee';
import { EmployeeService } from '../employee.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent {
  employees$: Observable<Employee[]>;
  showAddEmployeeForm = false;
  showViewEmployee = false;
  showEditForm = false;
  employeeForm!: FormGroup;
  editForm!: FormGroup;
  employees: any;
  employeeData: any;
  employeeObj: Employee = {
    id: '',
    name: '',
    email: '',
  };

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    this.editForm = this.fb.group({
      edit_name: ['', Validators.required],
      edit_email: ['', [Validators.required, Validators.email]],
    });
    this.employees$ = this.employeeService.getEmployees();
  }

  toggleAddEmployeeForm() {
    this.showAddEmployeeForm = !this.showAddEmployeeForm;
  }
  toggleViewEmployee() {
    this.showViewEmployee = !this.showViewEmployee;
  }
  toggleEditEmployeeForm() {
    this.showEditForm = !this.showEditForm;
  }

  addEmployee() {
    if (this.employeeForm.valid) {
      const { value } = this.employeeForm;
      this.employeeObj.id = '';
      this.employeeObj.name = value.name;
      this.employeeObj.email = value.email;

      this.employeeService
        .addEmployee(this.employeeObj)
        .then((employee) => {
          if (employee) {
            this.employeeForm.reset();
            this.showAddEmployeeForm = false;
            alert('Added successfully!');
          }
        })
        .catch((error) => {
          console.error('Error adding employee: ', error);
        });
    } else {
      alert('Form is not valid');
    }
  }

  getAllEmployees() {
    this.employeeService.getEmployees().subscribe((res: Employee[]) => {
      this.employees = res;
    });
  }

  ngOnInit() {
    this.getAllEmployees();
  }

  deleteEmployee(employee: Employee) {
    const confirmation = confirm(
      'Are you sure you want to remove this employee?'
    );
    if (confirmation) {
      this.employeeService
        .removeEmployee(employee)
        .then(() => {
          alert('Employee successfully removed');
        })
        .catch((error) => {
          console.error('Error removing employee: ', error);
          alert('There was an error removing the employee');
        });
    }
  }
  getEmployeeDetails(employee: Employee) {
    this.employeeData = employee;
    this.showViewEmployee = !this.showViewEmployee;
  }

  // getEmployeeDetailsandEdit(employee: Employee) {
  //   this.employeeData = employee;
  //   console.log(this.employeeData);
  //   this.showEditForm = !this.showEditForm;
  // }
  getEmployeeDetailsandEdit(employee: Employee) {
    this.employeeData = employee;
    this.editForm.patchValue({
      edit_name: employee.name,
      edit_email: employee.email,
    });
    this.showEditForm = true;
  }

  //update employee
  updateEmployee(employee: Employee) {
    // const { value } = this.editForm;
    // console.log(value);
    // this.employeeData.id = employee.id;
    // this.employeeData.name = value.edit_name;
    // this.employeeData.email = value.edit_email;
    // this.employeeService.updateEmployee(employee, this.employeeObj).then(() => {
    //   alert('Employee Updated Successfully');
    // });
    // this.editForm.reset();
    alert('Employee Updated Successfully');
    this.showEditForm = !this.showEditForm;
  }
}
