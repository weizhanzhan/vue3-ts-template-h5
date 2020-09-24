import Bmob from "hydrogen-js-sdk";
import { getCurrentInstance } from "vue";

export interface BmobMessageOption {
  objectId?: string;
  name: string;
  createdAt?: string;
  content: string;
}

export class BmobMessage {
  content: BmobMessageOption;
  loading = false;
  constructor(content: BmobMessageOption) {
    this.content = content;
  }

  create = () => {
    this.loading = true;
    console.log(getCurrentInstance());
    return new Promise<BmobMessageOption[]>((resolve, reject) => {
      const query = Bmob.Query("message");
      query.set("name", this.content.name);
      query.set("content", this.content.content);
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
  static findAll() {
    return new Promise<BmobMessageOption[]>(resolve => {
      const query = Bmob.Query("message");
      query.find().then(res => {
        const messages: BmobMessageOption[] = res as never;
        resolve(messages);
      });
    });
  }
}
