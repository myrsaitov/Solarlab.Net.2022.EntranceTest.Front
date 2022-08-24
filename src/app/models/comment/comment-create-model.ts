export interface ICreateComment {
  body: string;
  contentId: number;
  parentCommentId: number;
}

export class CreateComment implements ICreateComment {
  body: string;
  contentId: number;
  parentCommentId: number;

  constructor(
    data?: Partial<ICreateComment>) {
    const defaults: ICreateComment = {
      body: '',
      contentId: 0,
      parentCommentId: 0,
      ...data
    };
    this.body = defaults.body;
    this.contentId = defaults.contentId;
    this.parentCommentId = defaults.parentCommentId;
  }
}
