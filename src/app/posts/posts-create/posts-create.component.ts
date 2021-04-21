import { PostsService } from './../services/posts.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.css']
})
export class PostsCreateComponent implements OnInit {
  enteredTitle: String = '';
  enteredContent: String = '';

  constructor(public postsService: PostsService) { }

  ngOnInit(): void {
  }

  onAddPost(form: NgForm) {
    if (form.valid) {
      const post: Post = {
        title: form.value.title,
        content: form.value.content
      };
      this.postsService.addPost(post);
      form.resetForm();
    }
  }
}
