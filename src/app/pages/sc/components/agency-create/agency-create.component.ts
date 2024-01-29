import { Component, DestroyRef, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SCService } from '../../sc.service';
import { lastValueFrom } from 'rxjs';
import { ActionEnum,PageEnum } from 'src/app/core/models/utility.model';

@Component({
  selector: 'app-agency-create',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './agency-create.component.html',
  styleUrls: ['./agency-create.component.scss']
})
export class AgencyCreateComponent implements OnInit{
  router = inject(Router);
  location = inject(Location);
  scService = inject(SCService);
  destroyRef = inject(DestroyRef);
  @ViewChild('form') form!:NgForm;

  navigation!:any;
  state!:any;
  operationTitle = '';
  category:any = {
    name:'',
    body:''
  }

  mode!:ActionEnum;
  fromPageMode!:ActionEnum;
  formPage!:string
  actionMode = ActionEnum;
  
  constructor() {
    this.navigation = this.router.getCurrentNavigation()
    this.state = this.location.getState();
  }


  ngOnInit(): void {
    this.checkPermission();
    this.fetchMaster();
    this.setup()
  }

  checkPermission() {
    console.log("State");
    console.log(this.state);

    console.log("Navigation");
    console.log(this.navigation);

    if(!this.state.mode) {
      this.router.navigate(['./crud/categories']);
      return;
    }

    // if(!this.navigation?.mode) {
    // // this.router.navigate(['./crud'])
    // }

    // if(!this.navigation?.extras?.state?.mode){
    //   this.router.navigate(['./crud'])
    // }
    
    //check Permission here
    
  }

  setup() {
    //const {mode,fromPage,returnPage} = this.navigation.extras.state;
    const {mode,fromPage,returnPage} = this.state;
    if(fromPage) {
      this.fromPageSetup();
    }else 
    if(returnPage) {
      this.returnPageSetup();
    }else {
      this.mode = mode;
      this.generalSetup();
    }

  }

  generalSetup() {
    if(this.mode === ActionEnum.Create) {
      this.createSetup()
    }else 
    if(this.mode === ActionEnum.Edit) {
      this.editSetup();
    }else 
    if(this.mode === ActionEnum.View) {
      this.veiwSetup();
    }
  }

  fromPageSetup() {
    console.log("fromPageSetup");
    /**
     * eg: Post => Category
     * fromPage : name of page, Post
     * fromPageMode : mode of from page, (Create,View,Edit)
     * mode: mode of this page; In which mode, we want to open Category page
     * categoryId: requried in case of edit and view
     * data: JSON.stringify({
     *   ui,
     *   form
     * }); UI variables, form data,  
     */
    this.fromPageMode = this.state.fromPageMode; 
    this.formPage = this.state.fromPage;
    this.mode = this.state.mode;
    if(this.state.fromPage === PageEnum.Post) {
      //setUp According Post page; eg PostPageSetUp()
    }
    this.generalSetup();
  }

  returnPageSetup() {
    console.log("returnPageSetup");
    /**
     * Post => Category
     * returnFrom: return from page: Category
     * returnPageMode: fromPageMode
     * data: { ui, form, other} UI variables, form,
     */
  }

  createSetup() {
    this.operationTitle = ActionEnum.Create;
    console.log("createSetup")
    this.mode = ActionEnum.Create;
  }

  editSetup() {
    this.operationTitle = ActionEnum.Edit;
    console.log("editSetup")
    this.mode = ActionEnum.Edit;
    this.fetchCategory();
  }

  veiwSetup() {
    this.operationTitle = ActionEnum.View;
    console.log("viewsetUp");
    this.mode = ActionEnum.View;
    this.fetchCategory();
  }

  fetchCategory() {
    this.scService.getCategory(this.state.categoryId)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(res=> {
      this.category = res;
    })
  }

  async fetchMaster() {
    // console.log("fetchMaster") 
  }


  onSubmit() {
    if(this.form.invalid) {
      return;
    }
    console.log("OnSubmit");

    if(this.mode === ActionEnum.Create) {
      this.addCategory();
    }else 
    if(this.mode === ActionEnum.Edit) {
      this.editCategory();
    }

    this.onReturn();

  }

  async addCategory() {
    const res = await  lastValueFrom(this.scService.addCategory(this.category))
    this.onReturn();
  }

  async editCategory() {
    const res = await lastValueFrom(this.scService.updateCategory(this.category.id,this.category))
    this.onReturn();
  }

  getReturnPageState(otherData:any={}) {
    return {
      returnPage:PageEnum.Category,
      mode: this.state.fromPageMode,
      data: this.state.data,
      ...otherData
    }
  }

  addToForm() {
    if(this.form.invalid) {
      return;
    }

    const returnData = {
      returnPageData: {
        category: this.category
      }
    };

    if(this.state?.fromPage === PageEnum.Post) {
      this.returnToPreviousPage('/crud',returnData);
      return;
    }

  }


  returnToPreviousPage(prePage:string,retunPageData:any = {}) {
    const returnUrl = [prePage];
    this.state.fromPageMode === ActionEnum.Create 
    ? returnUrl.push('create')
    : returnUrl.push('edit');

    this.router.navigate(returnUrl,{
        state: this.getReturnPageState(retunPageData)
    });
  }

  onReturn() {
    if(this.state?.fromPage === PageEnum.Post) {
      this.returnToPreviousPage('/crud');
      return;
    }
    this.router.navigate(['/crud/categories'])
  }

  
}
