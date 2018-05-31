import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EMPLOYEES } from '../mock-employees';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employee: Employee = {
    id: 1000,
    name: 'omer'
  };
  selectedEmployee: Employee;
  employees = EMPLOYEES;

  constructor() { }

  ngOnInit() {
  }

  onSelect(employee: Employee): void {
    this.selectedEmployee = employee;
  }

}
