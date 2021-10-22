import Bmob from "hydrogen-js-sdk";

export interface BmobMessageOption {
  objectId?: string;
  name: string;
  createdAt?: string;
  content: string;
  state: false;
  files?: Array<string>;
}

export interface MessageStateOPtion {
  messages: BmobMessageOption[];
  input: string;
  loading: boolean;
  finished: boolean;
}
export class BmobMessage {
  content: BmobMessageOption;
  loading = false;
  page = 0;
  size = 1;
  constructor(content: BmobMessageOption) {
    this.content = content;
  }

  create = () => {
    this.loading = true;
    return new Promise<BmobMessageOption[] | void>((resolve, reject) => {
      const query = Bmob.Query("message");
      query.set("name", this.content.name);
      query.set("content", this.content.content);
      query.add("files", this.content.files || []);
      query
        .save()
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject();
        });

      this.loading = false;
    });
  };
  findAll() {
    return new Promise<BmobMessageOption[]>((resolve, reject) => {
      const query = Bmob.Query("message");
      query.order("-createdAt");
      query.limit(this.size);
      query.skip(this.page * this.size);

      query
        .find()
        .then(res => {
          const messages: BmobMessageOption[] = res as never;
          messages.forEach(item => {
            item.state = false;
          });
          resolve(messages);
        })
        .catch(() => {
          reject();
        });
    });
  }
}
