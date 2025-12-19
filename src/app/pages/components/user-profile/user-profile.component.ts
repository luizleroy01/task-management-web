import { Component, inject } from '@angular/core';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import ModalMessageComponent from '../../../components/modal-message/modal-message.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ComponenteA } from "../../../components/componente-a/componente-a.component";
import { ComponenteB } from '../../../components/componente-b/componente-b.component';

@Component({
    selector: 'page-user-profile',
    standalone:true,
    styleUrl: './user-profile.component.scss',
    imports: [MatTabsModule, MatButtonModule, NgSwitch, NgSwitchCase, NgSwitchDefault, ComponenteA,ComponenteB],
    template:`
        <div>
            <h1>Página de usuário</h1>
            <div>
                <nav mat-tab-nav-bar [tabPanel]="tabPanel">
                @for (tab of tabs; track tab) {
                    <a 
                    mat-tab-link
                    (click)="onChangeIndex(tab.label)"
                    [active]="activeTab === tab.label">
                    {{ tab.label }}
                    </a>
                }

                <!-- Última aba com botões -->
                <a mat-tab-link disabled>
                    <div class="flex gap-2">
                    <button mat-stroked-button color="primary" (click)="onVoltar()">Voltar</button>
                    <button mat-flat-button color="warn" (click)="onCancelar()">Cancelar</button>
                    </div>
                </a>
                </nav>

            <mat-tab-nav-panel #tabPanel>
            <ng-container [ngSwitch]="activeTab">
                <div *ngSwitchCase="'Aba 1'">Conteúdo 1</div>
                <div *ngSwitchCase="'Aba 2'">Conteúdo 2</div>
                <div *ngSwitchCase="'Aba 3'">Conteúdo 3</div>
                <div *ngSwitchDefault>Selecione uma aba</div>
            </ng-container>
            </mat-tab-nav-panel>



            </div>

            <div>
                <mat-tab-group [(selectedIndex)]="selectedIndex" (selectedTabChange)="onTabChange($event)">
                    <mat-tab label="Aba 1">Conteúdo 1</mat-tab>
                    <mat-tab label="Aba 2">Conteúdo 2</mat-tab>
                    <mat-tab label="Aba 3">Conteúdo 3</mat-tab>
                    <mat-tab label="Bloqueada">Não quero selecionar</mat-tab>
                </mat-tab-group>
            </div>
            <div>
                <mat-tab-group id="vert-tabs" class="vertical-tabs custom-tabs
                        [&_.mdc-tab]:px-3 
                    [&_.mdc-tab]:py-4
                    [&_.mdc-tab--active]:text-blue-600 
                    [&_.mdc-tab--active]:font-bold
                    [&_.mdc-tab--active::after]:content-[''] 
                    [&_.mdc-tab--active::after]:absolute
                    [&_.mdc-tab--active::after]:top-0 
                    [&_.mdc-tab--active::after]:bottom-0 
                    [&_.mdc-tab--active::after]:right-0
                    [&_.mdc-tab--active::after]:w-[3px] 
                    [&_.mdc-tab--active::after]:bg-[var(--mat-tab-active-indicator-color,#3f51b5)]
                    [&_.mdc-tab--active::after]:rounded-[2px] 
                    [&_.mdc-tab--active::after]:z-[1]
                    
                    ">
                    <mat-tab label="Dashboard">
                        <app-componente-a></app-componente-a>
                    </mat-tab>
                    <mat-tab label="Relatórios">
                        <div>
                           <p>Conteúdo dos Relatórios</p>
                            <app-componente-b></app-componente-b> 
                        </div>
                        
                        
                    </mat-tab>
                    <mat-tab label="Configurações">
                        <p>Conteúdo das Configurações</p>
                    </mat-tab>
                </mat-tab-group>

            </div>
        </div>

    `
})
export default class UserProfile{


    activeTab = 'Aba 1';

  tabs = [
    { label: 'Aba 1' },
    { label: 'Aba 2' },
    { label: 'Aba 3' },
  ];
    protected onCancelar(){
        console.log("cancelar")
    }

    protected onVoltar(){
        console.log("voltar")
    }

    protected onChangeIndex(tab :string):void{
        if(tab === 'Aba 3'){
            this.activeTab = 'Aba 2'
            return;
        }

        this.activeTab = tab;

    }

    selectedIndex = 0;

  onTabChange(event: any) {
    // se a aba clicada for a última (índice 3), não permitir seleção
    if (event.index === 3) {
      console.log('Essa aba não pode ser selecionada!');
      this.selectedIndex = 2; // volta para a anterior
    } else {
      this.selectedIndex = event.index;
    }
  }
    

}