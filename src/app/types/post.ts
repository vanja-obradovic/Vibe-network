export type PostType = {
  id: string;
  msg: string;
  timestamp: number;
  postID: number;
};

export type RawPostType = [bigint, string, string];
