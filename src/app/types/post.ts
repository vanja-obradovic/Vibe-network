export type PostType = {
  id: string;
  msg: string;
  timestamp: number;
};

export type RawPostType = [bigint, string, string];
