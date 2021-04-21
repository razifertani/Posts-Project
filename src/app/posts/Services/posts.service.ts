import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from '../models/post.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private httpClient: HttpClient) { }

    getPosts() {
        this.httpClient.get<any>('http://127.0.0.1:3000/api/posts')
            .pipe(map((data) => {
                return data.posts.map((post: any) => {
                    return {
                        id: post._id,
                        title: post.title,
                        content: post.content,
                    }
                });
            }))
            .subscribe((posts) => {
                this.posts = posts;
                this.postsUpdated.next([...this.posts]);
            });
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    addPost(post: Post) {
        this.httpClient.post<any>('http://127.0.0.1:3000/api/posts', post)
            .subscribe((data) => {
                post.id = data.postId;
                this.posts.push(post);
                this.postsUpdated.next([...this.posts]);
            });
    }

    deletePost(id: string) {
        this.httpClient.delete<any>('http://127.0.0.1:3000/api/posts/' + id)
            .subscribe(() => {
                const updatedPosts = this.posts.filter(post => post.id != id);
                this.posts = updatedPosts;
                this.postsUpdated.next([...this.posts]);
            });
    }
}