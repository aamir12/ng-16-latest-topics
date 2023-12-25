import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/core/loading.service';

@Component({
  selector: 'app-global-loader',
  templateUrl: './global-loader.component.html',
  styleUrl: './global-loader.component.scss',
})
export class GlobalLoaderComponent implements OnInit{
  loaderService = inject(LoadingService);
  isLoading!:boolean
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.loaderService.loading$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        Promise.resolve().then(() => this.isLoading = res)
    })
  }
}
