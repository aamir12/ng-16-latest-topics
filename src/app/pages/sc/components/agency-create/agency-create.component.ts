import { Component, DestroyRef, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SCService } from '../../sc.service';
import { lastValueFrom } from 'rxjs';
import { ActionEnum,PageEnum, SessionKey } from 'src/app/core/models/utility.model';
import { CryptoService } from 'src/app/core/services/crypto.service';
import { getSession, setSession } from 'src/app/core/services/utility.fn';

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
  route = inject(ActivatedRoute);

  agencyId:any = null;
  agency:any = {
    id:null,
    name:''
  }
  
  cryptoService = inject(CryptoService);
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
  fromPage!:string
  actionMode = ActionEnum;
  
  fromPagedata:any = null;
  constructor() {
    this.navigation = this.router.getCurrentNavigation()
    this.state = this.location.getState();
  }

  decodeParams() {
    const param = this.route.snapshot.params['encId'];
    if(param === 'create') {
      this.mode = ActionEnum.Create
    }else {
      const decodedData:any = this.cryptoService.decrypt(param);
      if(!decodedData) {
        this.router.navigate(['./sc','agencies']);
        return false;
      }
      const data = JSON.parse(decodedData);
      if(data['mode'] === ActionEnum.Edit) {
        this.mode = ActionEnum.Edit;
        this.agencyId = data['agencyId'];
      }else if(data['mode'] === ActionEnum.View) {
        this.mode = ActionEnum.View;
        this.agencyId = data['agencyId'];
      }

    }

    return true;
    
  }

  async ngOnInit() {
    if(!this.decodeParams()) return;
    await this.fetchMaster();
    this.setup()
  }

  checkPermission() {
    // console.log("State");
    // console.log(this.state);

    // console.log("Navigation");
    // console.log(this.navigation);

    // if(!this.state.mode) {
    //   this.router.navigate(['./crud/categories']);
    //   return;
    // }

    // if(!this.navigation?.mode) {
    // // this.router.navigate(['./crud'])
    // }

    // if(!this.navigation?.extras?.state?.mode){
    //   this.router.navigate(['./crud'])
    // }
    
    //check Permission here
    
  }

  getSessionValue() {
    this.fromPagedata = getSession(SessionKey.IAA) || getSession(SessionKey.PROJECT) || {};
  }

  setup() {
    this.getSessionValue();
    const {mode,fromPage,fromPageMode ,toPagemode} = this.fromPagedata;
    if(fromPage) {
      this.fromPageSetup(fromPage,fromPageMode,toPagemode);
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

  fromPageSetup(fromPage:string,fromPageMode:ActionEnum,toPagemode:ActionEnum) {
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
    this.fromPageMode = fromPageMode; 
    this.fromPage = fromPage;
    this.mode = toPagemode; 
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
    this.fetchAgency();
  }

  veiwSetup() {
    this.operationTitle = ActionEnum.View;
    console.log("viewsetUp");
    this.mode = ActionEnum.View;
    this.fetchAgency();
  }

  fetchAgency() {
    this.scService.getCategory(this.agencyId)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(res=> {
      this.agency = res;
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
      returnPage:PageEnum.Agency,
      mode: this.fromPageMode,
      data: this.fromPagedata,
      ...otherData
    }
  }

  addToForm() {
    if(this.form.invalid) {
      return;
    }

    this.setUpReturn(false)

  }



  returnBack() {
    const returnUrl = [];
    if(this.fromPage === PageEnum.IAA) {
      returnUrl.push('/sc/iaas');
    }

    if(this.fromPage === PageEnum.Project) {
      returnUrl.push('/sc/projects');
    }

    if(this.fromPageMode === ActionEnum.Create) {
      returnUrl.push('create')
    }
  
    if(this.fromPageMode !== ActionEnum.Create) {
      const param:any = {
        mode: this.fromPageMode,
        iaaId: this.fromPagedata?.data?.formId
      }

      const encId = JSON.stringify(this.cryptoService.encrypt(param));
      returnUrl.push(encId);
      this.router.navigate(returnUrl);
      return;
    }

    this.router.navigate(['/sc/agencies'])
  }

  //if isCanceled is true means we click cancel button
  setUpReturn(isCanceled:boolean) {
    if(this.fromPage === PageEnum.IAA) {
      let agencyData = {}

      // isCanceled is false means we are comming from add to form button
      if(!isCanceled) {
        agencyData = {
          agency : this.agency,
          agencyType : this.fromPagedata?.data?.agency?.agencyType
        }
      }
      this.iaaReturnData(agencyData);
    }
  }


  iaaReturnData(agencyData:any = {}) {
    const returnPageData = {
      returnPage: PageEnum.Agency,
      returnData: {
        iaaPage: this.fromPagedata.data,
        agencyData
      }
    }
    const encData = this.cryptoService.encrypt(JSON.stringify(returnPageData));
    setSession(SessionKey.IAA,encData);
  }

  onReturn() {
      this.setUpReturn(true);
      this.returnBack();
  }

  
}
