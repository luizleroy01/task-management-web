import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../../services/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent implements OnInit {
  isLoading = false;
constructor(private loadingService: LoadingService){}
  ngOnInit(): void {
    this.loadingService.loading$.subscribe((loading)=>{
      this.isLoading = loading;
    })
  }


}
