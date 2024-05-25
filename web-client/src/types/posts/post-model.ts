import { postId, userId } from "../shared-types";

export interface PostCreateDto {
  title: string;
  description: string;
  company: string;
  date: Date;
  location: string;
  image: File | null;
}

export class Post {
  constructor(
    public title: string,
    public description: string,
    public company: string,
    public date: Date,
    public location: string,
    public image_url: string,
    public id: postId,
    public userId: userId,
    public fullTime?: boolean,
    public payment?: number,
    public requirements?: string[],
    public advantages?: string[]
  ) {}
}
