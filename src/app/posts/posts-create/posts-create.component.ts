import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.css']
})
export class PostsCreateComponent implements OnInit {
  enteredTitle: string = '';
  enteredContent: string = '';
  isLoading = false;
  form: FormGroup;

  constructor(public postsService: PostsService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(
        null,
        { validators: [Validators.required, Validators.maxLength(40),] }
      ),
      content: new FormControl(
        null,
        { validators: [Validators.required] }
      ),
      image: new FormControl(
        null,
        { validators: [Validators.required] }
      ),
    });
  }

  onAddPost() {
    if (this.form.valid) {
      const post: Post = {
        id: 'undefined',
        title: this.form.value.title,
        content: this.form.value.content
      };
      this.isLoading = true;
      this.postsService.addPost(post);
      this.form.reset();
    }
  }
}