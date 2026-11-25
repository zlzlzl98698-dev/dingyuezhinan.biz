export interface CouponRecord {
  code: string;
  discount: string;
  status: string;
}

export interface AffiliateLinkRecord {
  brandSlug: string;
  brandName: string;
  registerUrl: string | null;
  secondaryRegisterUrl: string | null;
  coupons: CouponRecord[];
  urlFormatWarning: boolean;
  isHistoricalUrl: boolean;
  rel: 'nofollow sponsored noopener';
  target: '_blank';
  disclosure: string;
}

export const AFFILIATE_LINKS: Record<string, AffiliateLinkRecord> = {
  "guangsuyun": {
    "brandSlug": "guangsuyun",
    "brandName": "光速云",
    "registerUrl": "https://sahude.gsyvipaff.com/#/?code=keqgvT5Y",
    "secondaryRegisterUrl": null,
    "coupons": [
      {
        "code": "AMM",
        "discount": "新人优惠券（具体额度以结算页为准）",
        "status": "vendor"
      }
    ],
    "urlFormatWarning": false,
    "isHistoricalUrl": false,
    "rel": "nofollow sponsored noopener",
    "target": "_blank",
    "disclosure": "含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。"
  },
  "muguang": {
    "brandSlug": "muguang",
    "brandName": "暮光加速",
    "registerUrl": "https://varnexa.twilightaff.com/#/?code=D1LHglg3",
    "secondaryRegisterUrl": null,
    "coupons": [
      {
        "code": "muguang5555",
        "discount": "优惠额度未标注（介绍正文同时称未查到公开优惠码）",
        "status": "conflicting"
      }
    ],
    "urlFormatWarning": false,
    "isHistoricalUrl": false,
    "rel": "nofollow sponsored noopener",
    "target": "_blank",
    "disclosure": "含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。"
  },
  "feimao": {
    "brandSlug": "feimao",
    "brandName": "飞猫云",
    "registerUrl": "https://guangs.flycataff.com/#/?code=6uq0Xe9y",
    "secondaryRegisterUrl": null,
    "coupons": [
      {
        "code": "flycat888",
        "discount": "8折（总表标注）",
        "status": "vendor"
      }
    ],
    "urlFormatWarning": false,
    "isHistoricalUrl": false,
    "rel": "nofollow sponsored noopener",
    "target": "_blank",
    "disclosure": "含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。"
  },
  "weifeng": {
    "brandSlug": "weifeng",
    "brandName": "微风网络",
    "registerUrl": "https://edp01.breezenetaff.com/#/?code=t3huofyI",
    "secondaryRegisterUrl": null,
    "coupons": [
      {
        "code": "flat888",
        "discount": "9折（总表标注）",
        "status": "vendor"
      }
    ],
    "urlFormatWarning": false,
    "isHistoricalUrl": false,
    "rel": "nofollow sponsored noopener",
    "target": "_blank",
    "disclosure": "含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。"
  },
  "dalaoyun": {
    "brandSlug": "dalaoyun",
    "brandName": "大佬云",
    "registerUrl": "https://qwerty.dalaoyunaff.com/#/?code=jCPLmoWN",
    "secondaryRegisterUrl": null,
    "coupons": [
      {
        "code": "dly888",
        "discount": "季付及以上 7 折（品牌资料）",
        "status": "vendor"
      }
    ],
    "urlFormatWarning": false,
    "isHistoricalUrl": false,
    "rel": "nofollow sponsored noopener",
    "target": "_blank",
    "disclosure": "含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。"
  },
  "xingdaomeng": {
    "brandSlug": "xingdaomeng",
    "brandName": "星岛梦",
    "registerUrl": "https://guangs.xingdaomeng.com/#/?code=1TynBYnR",
    "secondaryRegisterUrl": null,
    "coupons": [
      {
        "code": "nmw888",
        "discount": "具体折扣未标注",
        "status": "vendor"
      }
    ],
    "urlFormatWarning": false,
    "isHistoricalUrl": false,
    "rel": "nofollow sponsored noopener",
    "target": "_blank",
    "disclosure": "含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。"
  },
  "yinxingren": {
    "brandSlug": "yinxingren",
    "brandName": "隐形人",
    "registerUrl": "https://yinxingren1.invisibleaff.com/#/?code=kcyEeoJT",
    "secondaryRegisterUrl": null,
    "coupons": [
      {
        "code": "yxr888",
        "discount": "总表记录（未标折扣）",
        "status": "conflicting"
      },
      {
        "code": "moon80",
        "discount": "8折（正文记录）",
        "status": "conflicting"
      }
    ],
    "urlFormatWarning": false,
    "isHistoricalUrl": false,
    "rel": "nofollow sponsored noopener",
    "target": "_blank",
    "disclosure": "含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。"
  },
  "ermao": {
    "brandSlug": "ermao",
    "brandName": "二猫云",
    "registerUrl": "https://guangs.2maoyunaff.cc/#/?code=7mjvgGbW",
    "secondaryRegisterUrl": null,
    "coupons": [
      {
        "code": "ermao5555",
        "discount": "具体折扣未标注",
        "status": "vendor"
      }
    ],
    "urlFormatWarning": false,
    "isHistoricalUrl": false,
    "rel": "nofollow sponsored noopener",
    "target": "_blank",
    "disclosure": "含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。"
  },
  "wuyou": {
    "brandSlug": "wuyou",
    "brandName": "无忧链接",
    "registerUrl": "https://wep01.worryfreeaff.com/#/?code=4ZoSbLdL",
    "secondaryRegisterUrl": null,
    "coupons": [
      {
        "code": "wuyou666",
        "discount": "具体折扣未标注",
        "status": "vendor"
      }
    ],
    "urlFormatWarning": false,
    "isHistoricalUrl": false,
    "rel": "nofollow sponsored noopener",
    "target": "_blank",
    "disclosure": "含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。"
  },
  "weitu": {
    "brandSlug": "weitu",
    "brandName": "唯兔云",
    "registerUrl": "https://guangs.v2yunvipaff.com/#/?code=xIutqOBA",
    "secondaryRegisterUrl": null,
    "coupons": [
      {
        "code": "weitu666",
        "discount": "具体折扣未标注",
        "status": "vendor"
      }
    ],
    "urlFormatWarning": false,
    "isHistoricalUrl": false,
    "rel": "nofollow sponsored noopener",
    "target": "_blank",
    "disclosure": "含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。"
  },
  "firefly": {
    "brandSlug": "firefly",
    "brandName": "Firefly",
    "registerUrl": "https://vip02.fireflyaff.com/#/?code=2n7VURre",
    "secondaryRegisterUrl": "https://vip02.fireflyaff.com/#/?code=jTp9wSgZ",
    "coupons": [
      {
        "code": "firefly",
        "discount": "新用户 8 折（年付版不适用）",
        "status": "vendor"
      }
    ],
    "urlFormatWarning": false,
    "isHistoricalUrl": false,
    "rel": "nofollow sponsored noopener",
    "target": "_blank",
    "disclosure": "含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。"
  },
  "yuzhou": {
    "brandSlug": "yuzhou",
    "brandName": "宇宙云",
    "registerUrl": "https://wzjc.yuzoucloud.cc/#/?code=yrThwMP1",
    "secondaryRegisterUrl": null,
    "coupons": [
      {
        "code": "YUZHOU553",
        "discount": "历史资料称新用户 8 折",
        "status": "historical"
      }
    ],
    "urlFormatWarning": false,
    "isHistoricalUrl": false,
    "rel": "nofollow sponsored noopener",
    "target": "_blank",
    "disclosure": "含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。"
  },
  "u1s1": {
    "brandSlug": "u1s1",
    "brandName": "U1S1",
    "registerUrl": "https://guangs.vipaff.cc/#/?code=xhX5X22f",
    "secondaryRegisterUrl": null,
    "coupons": [
      {
        "code": "akaka",
        "discount": "具体折扣未标注",
        "status": "vendor"
      }
    ],
    "urlFormatWarning": false,
    "isHistoricalUrl": false,
    "rel": "nofollow sponsored noopener",
    "target": "_blank",
    "disclosure": "含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。"
  },
  "lingmao": {
    "brandSlug": "lingmao",
    "brandName": "灵猫网络",
    "registerUrl": "https://vip01.civetnet.com/#/?code=8MIAyxak",
    "secondaryRegisterUrl": null,
    "coupons": [
      {
        "code": "lmao888",
        "discount": "基础数据与总表记录",
        "status": "conflicting"
      },
      {
        "code": "lingmao",
        "discount": "8折（年付小包不适用）",
        "status": "conflicting"
      }
    ],
    "urlFormatWarning": false,
    "isHistoricalUrl": false,
    "rel": "nofollow sponsored noopener",
    "target": "_blank",
    "disclosure": "含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。"
  },
  "jilian": {
    "brandSlug": "jilian",
    "brandName": "极连云",
    "registerUrl": "https://guangs.jlyvipaff.com/#/?code=VM1rKGUu",
    "secondaryRegisterUrl": null,
    "coupons": [
      {
        "code": "ji8888",
        "discount": "具体折扣未标注",
        "status": "vendor"
      }
    ],
    "urlFormatWarning": false,
    "isHistoricalUrl": false,
    "rel": "nofollow sponsored noopener",
    "target": "_blank",
    "disclosure": "含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。"
  },
  "guangnian": {
    "brandSlug": "guangnian",
    "brandName": "光年梯",
    "registerUrl": "https://guangs.gntaff.com/#/?code=X1FoxjGE",
    "secondaryRegisterUrl": null,
    "coupons": [
      {
        "code": "gnt6666",
        "discount": "具体折扣未标注",
        "status": "vendor"
      }
    ],
    "urlFormatWarning": false,
    "isHistoricalUrl": false,
    "rel": "nofollow sponsored noopener",
    "target": "_blank",
    "disclosure": "含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。"
  },
  "yifan": {
    "brandSlug": "yifan",
    "brandName": "一翻云",
    "registerUrl": "https://guangs.1flyunaff.cc/#/register?code=Yr7FhB7r",
    "secondaryRegisterUrl": null,
    "coupons": [
      {
        "code": "yfy6666",
        "discount": "基础数据与总表记录",
        "status": "conflicting"
      },
      {
        "code": "1FLYYUN",
        "discount": "9折（介绍正文记录）",
        "status": "conflicting"
      }
    ],
    "urlFormatWarning": false,
    "isHistoricalUrl": false,
    "rel": "nofollow sponsored noopener",
    "target": "_blank",
    "disclosure": "含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。"
  },
  "sogo": {
    "brandSlug": "sogo",
    "brandName": "SOGO云",
    "registerUrl": "https://guangs.sogoyunaff.cc/#/?code=327Vs0w7",
    "secondaryRegisterUrl": null,
    "coupons": [
      {
        "code": "SOGO10000",
        "discount": "9折（正文记录）",
        "status": "conflicting"
      },
      {
        "code": "sss777",
        "discount": "总表记录",
        "status": "conflicting"
      }
    ],
    "urlFormatWarning": false,
    "isHistoricalUrl": false,
    "rel": "nofollow sponsored noopener",
    "target": "_blank",
    "disclosure": "含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。"
  },
  "kexin": {
    "brandSlug": "kexin",
    "brandName": "可信云",
    "registerUrl": "https://guangs.kosingaff.com/#/register?code=UYDtNlCY",
    "secondaryRegisterUrl": null,
    "coupons": [
      {
        "code": "kkk333",
        "discount": "具体折扣未标注",
        "status": "vendor"
      }
    ],
    "urlFormatWarning": false,
    "isHistoricalUrl": false,
    "rel": "nofollow sponsored noopener",
    "target": "_blank",
    "disclosure": "含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。"
  },
  "sujie": {
    "brandSlug": "sujie",
    "brandName": "速界",
    "registerUrl": "https://guangs.speedworldaff.cc/#/register?code=xgXzEfZB",
    "secondaryRegisterUrl": null,
    "coupons": [
      {
        "code": "sss1111",
        "discount": "具体折扣未标注",
        "status": "vendor"
      }
    ],
    "urlFormatWarning": false,
    "isHistoricalUrl": false,
    "rel": "nofollow sponsored noopener",
    "target": "_blank",
    "disclosure": "含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。"
  },
  "shanyue": {
    "brandSlug": "shanyue",
    "brandName": "闪跃",
    "registerUrl": "https://vip02.flashleapaff.com/#/?code=3lgzm9mm",
    "secondaryRegisterUrl": null,
    "coupons": [
      {
        "code": "shanyue",
        "discount": "8折（仅限闪动/飞跃/瞬移/跃迁，年付不适用）",
        "status": "vendor"
      }
    ],
    "urlFormatWarning": false,
    "isHistoricalUrl": false,
    "rel": "nofollow sponsored noopener",
    "target": "_blank",
    "disclosure": "含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。"
  },
  "quanqiu": {
    "brandSlug": "quanqiu",
    "brandName": "全球云",
    "registerUrl": "https://guangs.gcvipaff.com/#/?code=Ov2nvU9C",
    "secondaryRegisterUrl": null,
    "coupons": [
      {
        "code": "qq88",
        "discount": "8折（基础信息记录）",
        "status": "conflicting"
      },
      {
        "code": "qqy7777",
        "discount": "总表记录",
        "status": "conflicting"
      }
    ],
    "urlFormatWarning": false,
    "isHistoricalUrl": false,
    "rel": "nofollow sponsored noopener",
    "target": "_blank",
    "disclosure": "含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。"
  },
  "shandianshu": {
    "brandSlug": "shandianshu",
    "brandName": "闪电鼠",
    "registerUrl": "https://qwerty.shandianshuaff.com/#/?code=rUE75iYh",
    "secondaryRegisterUrl": null,
    "coupons": [
      {
        "code": "sd88",
        "discount": "季付及以上 7 折",
        "status": "vendor"
      }
    ],
    "urlFormatWarning": false,
    "isHistoricalUrl": false,
    "rel": "nofollow sponsored noopener",
    "target": "_blank",
    "disclosure": "含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。"
  },
  "yunjiexian": {
    "brandSlug": "yunjiexian",
    "brandName": "云界线",
    "registerUrl": "https://qwerty.yunjiexianaff.com/?code=aycnwNUi",
    "secondaryRegisterUrl": null,
    "coupons": [
      {
        "code": "yjx888",
        "discount": "季付及以上 7 折",
        "status": "vendor"
      }
    ],
    "urlFormatWarning": true,
    "isHistoricalUrl": false,
    "rel": "nofollow sponsored noopener",
    "target": "_blank",
    "disclosure": "含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。"
  },
  "liulianyun": {
    "brandSlug": "liulianyun",
    "brandName": "榴莲云",
    "registerUrl": "https://qwerty.liulianyunaff.com#/?code=hS5pvbfE",
    "secondaryRegisterUrl": null,
    "coupons": [
      {
        "code": "ll88",
        "discount": "季付及以上 7 折",
        "status": "vendor"
      }
    ],
    "urlFormatWarning": false,
    "isHistoricalUrl": false,
    "rel": "nofollow sponsored noopener",
    "target": "_blank",
    "disclosure": "含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。"
  },
  "shenxing": {
    "brandSlug": "shenxing",
    "brandName": "神行加速",
    "registerUrl": "https://qwerty.shenxingaff.com/#/?code=gawDQqVE",
    "secondaryRegisterUrl": null,
    "coupons": [
      {
        "code": "xs0077",
        "discount": "新用户 7 折",
        "status": "vendor"
      }
    ],
    "urlFormatWarning": false,
    "isHistoricalUrl": false,
    "rel": "nofollow sponsored noopener",
    "target": "_blank",
    "disclosure": "含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。"
  },
  "huanqiuti": {
    "brandSlug": "huanqiuti",
    "brandName": "环球梯",
    "registerUrl": "https://qwerty.huanqiutiaff.com/?code=9I4KRNPH",
    "secondaryRegisterUrl": null,
    "coupons": [
      {
        "code": "HQ66",
        "discount": "季付及以上 7 折",
        "status": "vendor"
      }
    ],
    "urlFormatWarning": true,
    "isHistoricalUrl": false,
    "rel": "nofollow sponsored noopener",
    "target": "_blank",
    "disclosure": "含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。"
  },
  "tiziyun": {
    "brandSlug": "tiziyun",
    "brandName": "梯子云",
    "registerUrl": "https://tiziyun3.ladderaff.com/#/?code=7EmnpHs0",
    "secondaryRegisterUrl": null,
    "coupons": [
      {
        "code": "tiziyun",
        "discount": "具体折扣未标注",
        "status": "vendor"
      }
    ],
    "urlFormatWarning": false,
    "isHistoricalUrl": false,
    "rel": "nofollow sponsored noopener",
    "target": "_blank",
    "disclosure": "含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。"
  },
  "lingdong": {
    "brandSlug": "lingdong",
    "brandName": "灵动云",
    "registerUrl": "https://varnexa.lingdongaff.com/#/?code=wZvEhEoI",
    "secondaryRegisterUrl": null,
    "coupons": [
      {
        "code": "待核实",
        "discount": "优惠码尚未核实",
        "status": "unverified"
      }
    ],
    "urlFormatWarning": false,
    "isHistoricalUrl": true,
    "rel": "nofollow sponsored noopener",
    "target": "_blank",
    "disclosure": "含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。"
  },
  "langwang": {
    "brandSlug": "langwang",
    "brandName": "浪网",
    "registerUrl": "https://varnexa.wavenetaff.com/#/?code=xwAM4tTd",
    "secondaryRegisterUrl": null,
    "coupons": [
      {
        "code": "待核实",
        "discount": "优惠码尚未核实",
        "status": "unverified"
      }
    ],
    "urlFormatWarning": false,
    "isHistoricalUrl": true,
    "rel": "nofollow sponsored noopener",
    "target": "_blank",
    "disclosure": "含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。"
  },
  "edgenova": {
    "brandSlug": "edgenova",
    "brandName": "边缘节点 EdgeNova",
    "registerUrl": "https://work.edgenovaaff.cc/#/register?code=cl3iB5YG",
    "secondaryRegisterUrl": null,
    "coupons": [
      {
        "code": "TH888",
        "discount": "8 折（历史资料）",
        "status": "historical"
      }
    ],
    "urlFormatWarning": false,
    "isHistoricalUrl": true,
    "rel": "nofollow sponsored noopener",
    "target": "_blank",
    "disclosure": "含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。"
  }
};

export function getAffiliateLink(slug: string): AffiliateLinkRecord | undefined {
  return AFFILIATE_LINKS[slug];
}
