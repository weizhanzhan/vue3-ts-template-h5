import { getCurrentInstance } from "vue";
import { useBmob } from "@/hooks/useBmob";

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
    return new Promise<BmobMessageOption[]>((resolve, reject) => {
      const [bomb] = useBmob();
      console.log(123, bomb);
      if (bomb) {
        const query = bomb.Query("message");
        query.set("name", this.content.name);
        query.set("content", this.content.content);
        query
          .save()
          .then((res: any) => {
            console.log(res);
            resolve(res);
          })
          .catch(() => {
            reject();
          });
      } else {
        resolve([]);
      }
      this.loading = false;
    });
  };
  static findAll() {
    return new Promise<BmobMessageOption[]>(resolve => {
      const [bomb] = useBmob();
      if (bomb) {
        const query = bomb.Query("message");
        query.find().then((res: BmobMessageOption[]) => {
          resolve(res);
        });
      } else {
        resolve([]);
      }
    });
  }
}
