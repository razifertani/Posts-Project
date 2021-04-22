import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from '../models/post.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<{ posts: Post[], postsLength: number }>();

    constructor(
        private httpClient: HttpClient,
        private router: Router,
    ) { }

    getPosts(postSize: number, currentPage: number) {
        const queryParams = "?pagesize=" + postSize + "&currentpage=" + currentPage;
        this.httpClient.get<any>('http://127.0.0.1:3000/api/posts' + queryParams)
            .pipe(map((data) => {
                return {
                    postsLength: data.postsLength,
                    posts: data.posts.map((post: any) => {
                        return {
                            id: post._id,
                            title: post.title,
                            content: post.content,
                        }
                    }),
                }
            }))
            .subscribe((data) => {
                this.posts = data.posts;
                this.postsUpdated.next({
                    postsLength: data.postsLength,
                    posts: [...this.posts],
                });
            });
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    addPost(post: Post) {
        this.httpClient.post<any>('http://127.0.0.1:3000/api/posts', post)
            .subscribe((data) => {
                this.router.navigate(['/']);
            });
    }

    deletePost(id: string) {
        return this.httpClient.delete<any>('http://127.0.0.1:3000/api/posts/' + id)

    }
}