import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CryptoService } from 'src/app/core/services/crypto.service';

@Component({
  selector: 'app-nested-child',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nested-child.component.html',
  styleUrls: ['./nested-child.component.scss']
})
export class NestedChildComponent implements OnInit{
  route = inject(ActivatedRoute);
  cryptoService = inject(CryptoService);
  paramId!:any;
  mode!:any;
  testID!:any;
  ngOnInit(): void {


    this.route.params.subscribe((params)=> {
      if(params['postId']){
        this.paramId = params['postId'];
        this.testID = this.cryptoService.decrypt(params['testID']);
        if(this.testID) {
          console.log("Valid");
        }
        console.log(this.testID);
      }
    })

    this.route.queryParams.subscribe((queryParams)=> {
      if(queryParams['mode']){
        this.mode = queryParams['mode']
      }
    })
  }
}
