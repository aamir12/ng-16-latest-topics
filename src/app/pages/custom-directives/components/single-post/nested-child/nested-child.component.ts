import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nested-child',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nested-child.component.html',
  styleUrls: ['./nested-child.component.scss']
})
export class NestedChildComponent implements OnInit{
  route = inject(ActivatedRoute);
  paramId!:any;
  mode!:any;
  ngOnInit(): void {
    this.route.params.subscribe((params)=> {
      if(params['postId']){
        this.paramId = params['postId']
      }
    })

    this.route.queryParams.subscribe((queryParams)=> {
      if(queryParams['mode']){
        this.mode = queryParams['mode']
      }
    })
  }
}
