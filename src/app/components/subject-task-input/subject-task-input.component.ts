import { Component } from "@angular/core";
import {OverlayModule} from '@angular/cdk/overlay';
import { CommonModule } from "@angular/common";
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
    selector: 'app-subject-task-input',
    standalone:true,
    imports: [CommonModule, OverlayModule, MatExpansionModule],
    styleUrl: './subject-task-input.component.scss',
    template: `
            <div class="input-field" (click)="toggleOpen()" cdkOverlayOrigin #trigger="cdkOverlayOrigin">
            <span class="input-value">Selecione o assunto</span>
            </div>

            <!-- ng-template (não renderiza sozinho) -->
            <ng-template #expansionTemplate>
            <mat-expansion-panel *ngFor="let elements of data">
                <mat-expansion-panel-header>
                    {{elements.law}}
                </mat-expansion-panel-header>
                <p *ngFor="let group of elements.groups">{{group.name}}</p>
            </mat-expansion-panel>
            </ng-template>

            <!-- Container onde o template será renderizado -->
            <ng-container *ngIf="isOpen" [ngTemplateOutlet]="expansionTemplate"></ng-container>
    `
})
export default class SubjectTaskInputComponent{
    protected isOpen: boolean = false;

    protected data = [
        {
            law:"Volume 1",
            groups:[{id:1,name:"Grupo 1"},{id:2,name:"Grupo 2"},{id:3,name:"Grupo 3"}]
        },
        {
            law:"Volume 2",
            groups:[{id:3,name:"Grupo 3"},{id:4,name:"Grupo 4"},{id:5,name:"Grupo 5"}]
        }
    ]
    protected toggleOpen(){
        this.isOpen =!this.isOpen;
    }
}