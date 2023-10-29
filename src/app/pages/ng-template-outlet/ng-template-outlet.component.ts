import { CommonModule } from '@angular/common';
import { AfterContentInit, AfterViewInit, Component, Injector, Input, TemplateRef, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { MaterialModule } from 'src/app/core/modules/material.module';
import { WidgetActions } from './widget-actions.service';
import { WidgetState } from './widget-state.service';

@Component({
  selector: 'app-ng-template-outlet',
  templateUrl: './ng-template-outlet.component.html',
  styleUrls: ['./ng-template-outlet.component.scss'],
  standalone: true,
  imports: [CommonModule,MaterialModule],
  providers:[WidgetActions,WidgetState]
})
export class NgTemplateOutletComponent implements AfterViewInit {
  
  //Approch 1
  //this is imperative approch: we need to define each and every step
  // @ViewChild('container',{read:ViewContainerRef}) container!: ViewContainerRef;
  // @ViewChild('defaultHeaderTemplate') headerTemplate!: TemplateRef<any>;  

  // ngAfterViewInit() {
  //   this.container.createEmbeddedView(this.headerTemplate)
  // }

  //Approch 2 Declrative
  @Input() headerTemplate!: TemplateRef<any>;
  @Input() contentTemplate!: TemplateRef<{state:WidgetState}>;
  @Input()
  actionTemplate!: TemplateRef<any>;

  state = inject(WidgetState);
  actions = inject(WidgetActions);
  injector = inject(Injector);

  ngAfterViewInit(): void {
    
  }
}
