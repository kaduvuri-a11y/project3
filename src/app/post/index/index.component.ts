import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';
      
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
      
  posts: Post[] = [];
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(public postService: PostService) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.postService.getAll().subscribe((data: Post[])=>{
      this.posts = data;
      console.log(this.posts);
    })  
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  deletePost(id:number){
     const confirmDelete = confirm(' you want to delete this id?');
  if (confirmDelete) {
    this.postService.delete(id).subscribe(() => {
      alert('Post deleted successfully!');
      // Reload the posts list
      this.loadPosts();
    });
  } else {
    // User cancelled
    console.log('Delete cancelled');
  }
    this.postService.delete(id).subscribe(res => {
         this.posts = this.posts.filter(item => item.id !== id);
         console.log('Post deleted successfully!');
    })
  }
  loadPosts() {
    throw new Error('Method not implemented.');
  }
    
}