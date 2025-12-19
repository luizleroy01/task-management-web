import { Component } from "@angular/core";
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
    selector: 'app-teste-card-space-component',
    styleUrl: './teste-card-space.component.scss',
    standalone: true,
    imports:[MatCardModule,MatSidenavModule],
    template: `
        <mat-sidenav-container class="page-container">
            <mat-sidenav-content>
                <mat-card>
                <mat-card-content>
                    Conteúdo centralizado com espaçamento lateral
                </mat-card-content>
                </mat-card>
            </mat-sidenav-content>
        </mat-sidenav-container>
    `
})
export default class AppTesteCardSpaceComponent {

}