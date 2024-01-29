import { Component, DestroyRef, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActionEnum, PageEnum } from '../../../../core/models/utility.model';
import { PostService } from '../../post.service';
import { last, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  router = inject(Router);
  location = inject(Location);
  postService = inject(PostService);
  destroyRef = inject(DestroyRef);
  @ViewChild('form') form!:NgForm;

  navigation!:any;
  state!:any;
  operationTitle = '';
  post:any = {
    id:null,
    title:'',
    category:'',
    body:''
  }

  categories:any[] = [];
  userList:any[] = [];
  mode!:ActionEnum;
  fromPageMode!:ActionEnum;
  actionMode = ActionEnum;
  constructor() {
    this.navigation = this.router.getCurrentNavigation()
    this.state = this.location.getState();
  }


  async ngOnInit() {
    this.checkPermission();
    await this.fetchMaster();
    this.setup()
  }

  checkPermission() {
    console.log("State");
    console.log(this.state);

    console.log("Navigation");
    console.log(this.navigation);

    if(!this.state.mode) {
      this.router.navigate(['./crud']);
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
    const { mode,fromPage,returnPage } = this.state;
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
    console.log("returnPageSetup");
    if(this.state.returnPage === PageEnum.Category) {
      this.setUpLocalFromReturnPage();
      this.setByCategory()
    }
    /**
     * Post => Category
     * returnPage: return from page: Category
     * mode: fromPageMode
     * data: { ui, form, other} UI variables, form,
     * returnPageData: {}
     */
  }

  setUpLocalFromReturnPage() {
    const data = JSON.parse(this.state.data);
    this.post = data.form;
    this.operationTitle = data.ui.operationTitle;
    this.mode = this.state.mode;
  }

  setByCategory() {
    if(this.state?.returnPageData?.category) {
      const category = this.state.returnPageData.category;
      this.categories.push({
        id: -1,
        ...category
      });

      this.post.category = -1;
    }
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
    this.fetchPost();
  }

  veiwSetup() {
    this.operationTitle = ActionEnum.View;
    console.log("viewsetUp");
    this.mode = ActionEnum.View;
    this.fetchPost();
  }

  fetchPost() {
    this.postService.getPost(this.state.postId)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(res=> {
      this.post = res;
    })
  }

  async fetchMaster() {
    const request = [
      lastValueFrom(this.postService.getCategories()),
      lastValueFrom(this.postService.getUsers()),
    ];

    const res = await Promise.all(request);
    this.categories = res[0];
    const postId = this.state.postId;
    res[1].forEach(user => {
      const posts = user.posts  ? JSON.parse(user.posts) : [];
      if(postId && posts.includes(postId)) {
        this.userList.push(user);
      }
    })
  }


  async onSubmit() {
    if(this.form.invalid) {
      return;
    }
    console.log("OnSubmit");

    if(this.mode === ActionEnum.Create) {
      await this.addPost();
    }else 
    if(this.mode === ActionEnum.Edit) {
      await this.editPost();
    }

    this.onReturn();
  }

  

  async addPost() {
    if(!(await this.saveCategory())) {
      alert('Something went wrong');
      return false;
    }

    const res = await lastValueFrom(this.postService.addPost(this.post));
    return res;

  }

  async saveCategory() {
    if(this.post.category === -1 && this.state?.returnPageData?.category) {
      const category = this.state.returnPageData.category;
      const res = await lastValueFrom(this.postService.addCategory(category));
      this.post.category = +res.id;
    }

    this.post.category = +this.post.category;
    return true;
  }

  async editPost() {
    if(!(await this.saveCategory())) {
      alert('Something went wrong');
      return false;
    }
    const res = await lastValueFrom(this.postService.updatePost(this.post.id,this.post));
    if(res.id) {
      return true;
    }
    return false;
  }

  onReturn() {
    if(this.state?.fromPage === 'user') {
      this.router.navigate(['/crud/user']);
      return;
    }
    
    this.router.navigate(['/crud'])
  }

  fromPageData(toPageMode:ActionEnum,other:any={}) {
    return {
      fromPage: PageEnum.Post,
      fromPageMode: this.mode,
      mode: toPageMode,
      data: JSON.stringify({
        form: this.post,
        ui: {
          operationTitle: this.operationTitle
        },
        other: {
          ...other
        }
      })
    }
  }

  addCategory(event:Event) {
    event.preventDefault();
    this.router.navigate(['/crud/categories/create'],{
      state: this.fromPageData(ActionEnum.Create)
    })
  } 

  openUser(event:Event,user:any) {
    event.preventDefault();
    console.log("openUser")
    console.log(user);
  }

  async getPostId() {
    if(this.mode === ActionEnum.Create) {
      const post = await this.addPost();
      return post.id;
    }else 
    if(this.mode === ActionEnum.Edit) {
      return this.post.id;
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
    console.log("removeUser");
    console.log(user);
  }
}
