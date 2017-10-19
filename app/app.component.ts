import { Component } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';

import gql from 'graphql-tag';

import 'rxjs/add/operator/map';

import { Post, Query } from './types';

@Component({
  selector: 'my-app',
  template: `
    <ActionBar title="Blog" class="action-bar"></ActionBar>
    <ListView [items]="posts | async">
      <ng-template let-item="item">
        <GridLayout columns="*, auto" class="container">
          <StackLayout col="0" orientation="horizontal" class="tap-target" (tap)="upvote(item.id, item.votes)">
            <Label [text]="item.title"></Label>
            <Label class="votes" [text]="displayVotes(item)"></Label>
          </StackLayout>
        </GridLayout>
      </ng-template>
    </ListView>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  postsRef: QueryRef<Query>;
  posts: Observable<Post[]>;

  constructor(
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.postsRef = this.apollo.watchQuery<Query>({
      query: gql`
        query allPosts {
          posts {
            id
            title
            votes
          }
        }
      `,
    });

    this.posts = this.postsRef
      .valueChanges
      .map(r => r.data.posts);
  }

  upvote(id: number, votes: number) {
    this.apollo.mutate({
      mutation: gql`
        mutation upvotePost($postId: Int!) {
          upvotePost(postId: $postId) {
            id
            votes
          }
        }
      `,
      variables: {
        postId: id,
      },
      optimisticResponse: {
        upvotePost: {
          id,
          votes: votes + 1,
          __typename: 'Post'
        }
      },
    }).subscribe();
  }

  displayVotes(post: Post): string {
    return `${post.votes} votes`;
  }
}
