import { Component } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-task',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule,MatDividerModule,MatFormFieldModule,MatInputModule],
  templateUrl: './form-task.component.html',
  styleUrl: './form-task.component.scss'
})
export class FormTaskComponent {
  userForm = new UntypedFormGroup({
    name: new UntypedFormControl('',Validators.required),
    description: new UntypedFormControl('', Validators.required),
    date: new UntypedFormControl('', Validators.required),
    status: new UntypedFormControl('', [Validators.required, Validators.email]),
    anexos: new UntypedFormControl([])
  });

  confirm(){
    console.log("confirmar ação")
  }

}
