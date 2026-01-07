// import { Component, OnInit } from '@angular/core';
// import { PostService } from '../post.service';
// import { ActivatedRoute, CanActivate, Router } from '@angular/router';
// import { Post } from '../post';
// import { FormGroup, FormControl, Validators} from '@angular/forms';
// import { CanComponentDeactivate } from 'src/app/unsaved-changes.guard';
     
// @Component({
//   selector: 'app-edit',
//   templateUrl: './edit.component.html',
//   styleUrls: ['./edit.component.css']
// })
// export class EditComponent implements OnInit  {
      
//   id!: number;
//   post!: Post;
//   form!: FormGroup;
    
//   /*------------------------------------------
//   --------------------------------------------
//   Created constructor
//   --------------------------------------------
//   --------------------------------------------*/
//   constructor(
//     public postService: PostService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) { }
    
//   /**
//    * Write code on Method
//    *
//    * @return response()
//    */
//   ngOnInit(): void {
//     this.id = this.route.snapshot.params['postId'];
//     this.postService.find(this.id).subscribe((data: Post)=>{
//       this.post = data;
//     }); 
      
//     this.form = new FormGroup({
//       title: new FormControl('', [Validators.required]),
//       body: new FormControl('', Validators.required)
//     });
//   }
    
//   /**
//    * Write code on Method
//    *
//    * @return response()
//    */
//   get f(){
//     return this.form.controls;
//   }
    
//   /**
//    * Write code on Method
//    *
//    * @return response()
//    */
//   submit(){
//     console.log(this.form.value);
//     this.postService.update(this.id, this.form.value).subscribe((res:any) => {
//          console.log('Post updated successfully!');
//          this.router.navigateByUrl('post/index');
//     })
//   }
   
// }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { Post } from '../post';
import { CanComponentDeactivate } from 'src/app/unsaved-changes.guard';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, CanComponentDeactivate {

  id!: number;
  form!: FormGroup;
  post!: Post;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    // ✅ form first create cheyyali
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required)
    });

    // ✅ route nundi id
    this.id = this.route.snapshot.params['postId'];

    // ✅ API call + form prefill
    this.postService.find(this.id).subscribe((data: Post) => {
      this.post = data;

      this.form.patchValue({
        title: data.title,
        body: data.body
      });
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.postService.update(this.id, this.form.value).subscribe(() => {
      alert('Post updated successfully!');
      this.form.markAsPristine(); // 🔥 important
      this.router.navigateByUrl('post/index');
    });
  }

  // ✅ THIS IS THE KEY PART (GUARD ALERT)
  canDeactivate(): boolean {
    console.log('DIRTY:', this.form.dirty);
    if (this.form.dirty) {
      return confirm('You have unsaved changes! Do you really want to leave?');
    }
    return true;
  }
}
