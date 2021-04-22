import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import { Post } from '../models/post.model';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  postsSub: Subscription | undefined;
  isLoading = false;
  totalPosts = 10;
  postsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [2, 5, 20, 50];

  constructor(public postsService: PostsService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: { posts: Post[], postsLength: number }) => {
        this.isLoading = false;
        this.posts = posts.posts;
        this.totalPosts = posts.postsLength;
      });
  }

  ngOnDestroy(): void {
    this.postsSub?.unsubscribe();
  }

  onDelete(id: string) {
    this.isLoading = true;
    this.postsService.deletePost(id)
      .subscribe(() => {
        this.postsService.getPosts(this.postsPerPage, this.currentPage);
      });
  }

  onChangedPage(pageEvent: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageEvent.pageIndex + 1;
    this.postsPerPage = pageEvent.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }


}
