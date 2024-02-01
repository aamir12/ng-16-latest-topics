import { Component, DestroyRef, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SCService } from '../../sc.service';
import { last, lastValueFrom } from 'rxjs';
import { CryptoService } from 'src/app/core/services/crypto.service';
import { ActionEnum, PageEnum, SessionKey } from 'src/app/core/models/utility.model';
import { setSession } from 'src/app/core/services/utility.fn';

@Component({
  selector: 'app-iaa-create',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './iaa-create.component.html',
  styleUrls: ['./iaa-create.component.scss']
})
export class IAACreateComponent implements OnInit {
  router = inject(Router);
  location = inject(Location);
  scService = inject(SCService);
  destroyRef = inject(DestroyRef);
  cryptoService = inject(CryptoService);
  route = inject(ActivatedRoute);

  @ViewChild('form') form!:NgForm;

  navigation!:any;
  state!:any;
  operationTitle = '';
  iaaId!:number;
  iaa:any = {
    id:null,
    title:'',
    serviceAgency:'',
    requestAgency:'',
    contractor:'',
    body:''
  }

  agencyList:any[] = [];
  contractorList:any[] = [];
  mode!:ActionEnum;
  fromPageMode!:ActionEnum;
  actionMode = ActionEnum;

  serviceAgency:any = null;
  requestAgency:any = null;
  constractor:any = null;

  fromPage:any = null;
  constructor() {
    this.navigation = this.router.getCurrentNavigation()
    this.state = this.location.getState();
  }


  async ngOnInit() {
    if(!this.decodeParams()) return;
    await this.fetchMaster();
    this.setup()
  }

  decodeParams() {
    const param = this.route.snapshot.params['encId'];
    if(param === 'create') {
      this.mode = ActionEnum.Create
    }else {
      const decodedData:any = this.cryptoService.decrypt(param);
      if(!decodedData) {
        this.router.navigate(['./sc','iaas']);
        return false;
      }
      const data = JSON.parse(decodedData);
      if(data['mode'] === ActionEnum.Edit) {
        this.mode = ActionEnum.Edit;
        this.iaaId = data['iaaId'];
      }else if(data['mode'] === ActionEnum.View) {
        this.mode = ActionEnum.View;
        this.iaaId = data['iaaId'];
      }

    }

    return true;
    
  }

  checkPermission() {
    // console.log("State");
    // console.log(this.state);

    // console.log("Navigation");
    // console.log(this.navigation);


    // if(!this.state.mode) {
    //   this.router.navigate(['./crud']);
    // }
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
    const { mode,fromPage,returnPage } = this.state;
    if(fromPage) {
      this.fromPageSetup();
    }else 
    if(returnPage) {
      this.returnPageSetup();
    }else {
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
    // console.log("fromPageSetup");
    /**
     * eg: Post => Category
     * fromPage : name of page, Post
     * fromPageMode : mode of from page, (Create,View,Edit)
     * mode: mode of this page;
     * postId: in case of veiw and edit mode
     * data: {
     *   ui,
     *   form
     * }; UI variables, form data,  
     */
    this.fromPageMode = this.state.fromPageMode; 
    this.mode = this.state.mode;
    this.generalSetup();
  }

  returnPageSetup() {
    // console.log("returnPageSetup");
    if(this.state.returnPage === PageEnum.Category) {
      this.setUpLocalFromReturnPage();
      this.setByCategory()
    }
    /**
     * Category => Post
     * returnPage: return from page: Category
     * mode: fromPageMode
     * data: { ui, form, other} UI variables, form,
     * returnPageData: {}
     */
  }

  setUpLocalFromReturnPage() {
    const data = JSON.parse(this.state.data);
    this.iaa = data.form;
    this.operationTitle = data.ui.operationTitle;
    this.mode = this.state.mode;
  }

  setByCategory() {
    if(this.state?.returnPageData?.category) {
      const category = this.state.returnPageData.category;
      this.agencyList.push({
        id: -1,
        ...category
      });

      this.iaa.serviceAgency = -1;
    }
  }

  createSetup() {
    this.operationTitle = ActionEnum.Create;
    // console.log("createSetup")
    this.mode = ActionEnum.Create;
  }

  editSetup() {
    this.operationTitle = ActionEnum.Edit;
    this.mode = ActionEnum.Edit;
    this.fetchIaa();
  }

  veiwSetup() {
    this.operationTitle = ActionEnum.View;
    this.mode = ActionEnum.View;
    this.fetchIaa();
  }

  fetchIaa() {
    this.scService.getIaa(this.iaaId)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(res=> {
      this.iaa = res;
    })
  }

  async fetchMaster() {
    const request = [
      lastValueFrom(this.scService.getAgencies()),
      lastValueFrom(this.scService.getContractors()),
    ];

    const res = await Promise.all(request);
    this.agencyList = res[0];
    this.contractorList = res[1];

    // const postId = this.postId;
    // res[1].forEach(user => {
    //   const posts = user.posts  ? JSON.parse(user.posts) : [];
    //   if(postId && posts.includes(postId)) {
    //     this.userList.push(user);
    //   }
    // })

    // console.log("fetchMaster")
  }


  async onSubmit() {
    if(this.form.invalid) {
      return;
    }

    if(this.mode === ActionEnum.Create) {
      await this.addPost();
    }else 
    if(this.mode === ActionEnum.Edit) {
      await this.editPost();
    }

    this.onReturn();
  }

  

  async addPost() {
    if(!(await this.saveAgency())) {
      alert('Something went wrong');
      return false;
    }

    const res = await lastValueFrom(this.scService.addPost(this.iaa));
    return res;

  }

  async saveAgency() {
    if(this.iaa.serviceAgency === -1 && this.state?.returnPageData?.category) {
      const category = this.state.returnPageData.category;
      const res = await lastValueFrom(this.scService.addCategory(category));
      this.iaa.serviceAgency = +res.id;
    }

    this.iaa.category = +this.iaa.category;
    return true;
  }

  async editPost() {
    if(!(await this.saveAgency())) {
      alert('Something went wrong');
      return false;
    }
    const res = await lastValueFrom(this.scService.updatePost(this.iaa.id,this.iaa));
    if(res.id) {
      return true;
    }
    return false;
  }

  onReturn() {  
    this.router.navigate(['/sc','iaas'])
  }

  createFromPageData(toPageMode:ActionEnum,type:string='',other:any={}) {
    return {
      fromPage: PageEnum.Post, //return page
      fromPageMode: this.mode, // return mode
      toPagemode: toPageMode, // landing page mode
      data: {
        form: this.iaa,
        formId: this.iaa.id,
        agency: {
          serviceAgency: this.serviceAgency,
          requestAgency: this.requestAgency,
          agencyType: type
        },
        contractor: this.constractor,
        ui: {
          operationTitle: this.operationTitle
        },
        other: {
          ...other
        }
      }
    }
  }

  addAgency(event:Event,type:string) {
    event.preventDefault();
    const data = JSON.stringify(this.createFromPageData(ActionEnum.Create,type));
    const encryptData = this.cryptoService.encrypt(data);
    setSession(SessionKey.IAA,encryptData);
    this.router.navigate(['/sc/agencies/create'])
  } 

  addContractor(event:Event) {
    event.preventDefault();
    const data = JSON.stringify(this.createFromPageData(ActionEnum.Create));
    const encryptData = this.cryptoService.encrypt(data);
    setSession(SessionKey.IAA,encryptData);
    this.router.navigate(['/sc/contractors/create'])
  } 

  openUser(event:Event,user:any) {
    event.preventDefault();
  }

  async getPostId() {
    if(this.mode === ActionEnum.Create) {
      const post = await this.addPost();
      return post.id;
    }else 
    if(this.mode === ActionEnum.Edit) {
      return this.iaa.id;
    }
  }


  async addUser() {
    if(this.form.invalid) {
      alert("First save the Post")
      return;
    }

    let postId = await this.getPostId();
    
  }

  removeUser(event:Event, user:any) {
    event.preventDefault();
    event.stopPropagation();
  }

  addActivity() {

  }

  addInvoice() {
    
  }
}
