export type Post = {
  id: number;
  title: string;
  votes: number;
}

export type Query = {
  posts: Post[];
}
