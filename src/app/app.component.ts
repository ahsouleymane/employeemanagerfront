import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  public employees: Employee[] | null = null; // public employees: Employee[] | null = [];

  constructor (private employeeService: EmployeeService) {}

  ngOnInit() {
    this.getEmployees();
  }
    
  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe (
      (response: Employee[]) => {
        this.employees = response;
      },
    );
  }

  public onAddEmployee (addForm: NgForm): void {
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
    );
  }

  public onOpenModal (employee: Employee | null, mode: string): void {

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }

    if (mode === 'edit') {
      button.setAttribute('data-target', '#updateEmployeeModal');
    }

    if (mode === 'delete') {
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }

    container?.appendChild(button);
    button.click();

  }


  
}
