import { ImagePreview } from "vant";

export const useRandomName = () => {
  const firstName = [
    "李",
    "西门",
    "沈",
    "张",
    "上官",
    "司徒",
    "欧阳",
    "轩辕",
    "皮",
    "卞",
    "齐",
    "康",
    "冯",
    "陈",
    "褚",
    "卫",
    "蒋",
    "沈",
    "韩",
    "杨",
    "孔",
    "曹",
    "严",
    "华",
    "项",
    "祝",
    "董",
    "梁"
  ];
  const secondName = [
    "彪",
    "巨昆",
    "锐",
    "翠花",
    "小小",
    "撒撒",
    "熊大",
    "宝强",
    "靖川",
    "源",
    "俊一",
    "佩华",
    "家乐",
    "小川",
    "康",
    "斌",
    "帅",
    "敏",
    "泰",
    "进",
    "童"
  ];

  const first = firstName[Math.floor(Math.random() * secondName.length)];
  const second = secondName[Math.floor(Math.random() * secondName.length)];
  return (
    first +
    second +
    new Date()
      .getTime()
      .toString()
      .substr(-4)
  );
};

export const getRandomAvatar = (identicon: HTMLElement) => {
  if (identicon.children.length) return;
  const colors = ["#8473C6", "#DBBB9A", "#84BED4", "#6F99D2", "#9EDB90"];
  let data = [];
  for (let i = 0; i < 5; i++) {
    data.push([
      Math.floor(Math.random() * 2),
      Math.floor(Math.random() * 2),
      Math.floor(Math.random() * 2)
    ]);
  }
  data = data.map(function(d) {
    d.push(d[1], d[0]);
    return d;
  });
  identicon.innerHTML = "";
  const color = colors[Math.floor(Math.random() * colors.length)];
  data.forEach(function(d) {
    d.forEach(function(_d) {
      const el = document.createElement("div");
      el.setAttribute("data", _d.toString());
      el.style.background = color;
      identicon.appendChild(el);
    });
  });
};

export const getBeforeNowCount = (date: string) => {
  date = date.replace(/-/g, "/");
  // 苹果浏览器不支持replaceAll
  // TODO 苹果浏览器统计的时间和安卓不一样，有人知道欢迎提PR😊
  const diffDate = Date.parse(date);
  const now = Date.parse(new Date().toString());
  let diffDay = Math.abs(diffDate - now);
  diffDay = Math.floor(diffDay / (24 * 3600 * 1000));
  if (diffDay > 0) {
    return diffDay + "天前";
  } else {
    const diffHour = new Date(date).getHours();
    const nowHour = new Date().getHours();
    const diffed = Math.abs(diffHour - nowHour);
    if (diffed > 0) return diffed + "小时前";
    const diffSecond = new Date(date).getSeconds();
    const nowSecond = new Date().getSeconds();
    const diffedSecond = Math.abs(diffSecond - nowSecond);
    return diffedSecond + "秒前";
  }
};

export const showImg = (
  imgs: Array<string>,
  option?: { startPosition: number }
) => {
  ImagePreview({
    images: imgs,
    startPosition: option ? option.startPosition || 0 : 0
  });
};
