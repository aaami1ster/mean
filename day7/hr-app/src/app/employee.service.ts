import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { EMPLOYEES } from './mock-employees';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class EmployeeService {

  constructor(private http: HttpClient) { }

  // getEmployees(): Observable<Employee[]> {
  //   return of(EMPLOYEES);
  // }
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('http://localhost:3000/employees');
  }

  // getEmployee(id: number): Observable<Employee> {
  //   return of(EMPLOYEES.find(user => user.id === id));
  // }
  getEmployee(id: number) {
    const headers = { 'Content-Type': 'application/json' };

    return this.http.get<Employee>('http://localhost:3000/employees/' + id, { headers: headers });
  }

}
