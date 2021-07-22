# ChiuKong Gothic 秋空黑體 秋空黑体 秋空ゴチック
[简体中文]() [秋明通表字体]()
## 簡介
An experiment font family project with IVS feature derived from Source Han Sans.

一款基於思源黑體，同時整合異體字選擇器特性的實驗性開源印刷體風格字體家族專案。

## 版本
  _目前僅提供傳統字形版本及未新造字符。_

- **傳統字形版本（CL）：** 基於思源黑體2.004版，透過限制性方式將字符映射到已有的傳統印刷體字形字圖的傳統印刷體風格字體。

- **新字形版本（M）：** 以傳統字形版爲基礎進行修改，兼顧當代慣用字形及印刷體骨架的新字形印刷體風格字體。（中期計劃）

- **秋明新字形版本（CM）：** 以新字形版爲基礎進行修改，符合[秋明通用漢字表字形](https://glyphwiki.org/wiki/Group:chiuming-neko_cm-chara-list)的󠄀實験演示性新字形風格字体。（長期計劃）

## 特性及預覽

### 漢字印刷體風格

思源黑體所提供給中文世界的分流版或多或少都有楷化的成分——其中以臺灣「正體」中文分流版修改漢字字形情況最爲嚴重。雖然十分接近各地的手寫體楷書字形規範，但有文本排版文字跳動感較大、字符重心不穩等諸多問題，不符合漢字印刷體的審美及使用習慣。

![diff2](https://github.com/ChiuMing-Neko/ChiuKongGothic/blob/main/images/diff2.png)

### 異體字選擇器

現時中文字體因種種原因並不像日文字體般支持異體字選擇器特性，導致使用者只能被迫使用字體默認字形而無法選擇自己心目中的字形，亦在需要區分字形的場景中只能透過使用不同字體簡單粗暴的方式來實現類似的效果。但透過這種方式進行區分字形具有一定程度上的侷限性，包括但不限於不支持部分文本使用其他字體的場景等。

因此，攷慮到使用者可能並不滿意字體所預設的字形、使用不同字形的需求或異體字混排便利性等等，故本專案攷慮將當前日文字體使用有一段時間的異體字選擇器特性同樣應用在中文字體上以滿足不同人士的需求。


>註：出於使用者或有使用不同字形的需求及尊重使用者選擇不同字形的權利，不攷慮統一基本區內的歷史遺留問題——原規格分離原則分別編碼的字符字形。如有「統一」風格的需求，輸入指定的字符卽可。

**字範樣本**

![IVS-Sample](https://github.com/ChiuMing-Neko/ChiuKongGothic/blob/main/images/IVS-sample.png)

**目前所支援的IVD字集：**

- Adobe-Japan1

- KRName

**未來可能會支援的IVD字集：**

- 常用字範圍內的部分Hanyo-Denshi （泛用電子）集所定義的字形

- 常用字範圍內的部分Moji-Joho（MJ文字情報）集所定義的字形

- 部分MSARG（澳門特別行政區）集所定義的字形

- 未收錄於任何IVD字集但個人認爲亦可整合的字形 （編碼區間：E01EA ~ E01EF）


> 註：如以上計劃新增字集所定義的字形已和現有的字集重複（如部分Hanyo-Denshi與Adobe-Japan1的字形重複），將不重複編碼。

### 版本差異

![diff1](https://github.com/ChiuMing-Neko/ChiuKongGothic/blob/main/images/diff1.png)

## 著作權及授權信息
依照SIL Open Font License 1.1授權許可發佈，您可以：
- 可自由使用本字體，不限個人或商業用途。
- 自由分發本字体。
- 基於SIL Open Font License 1.1授權許可修改、二次創作本字体。

## 鳴謝
- [思源黑體](https://github.com/adobe-fonts/source-han-sans) by Adobe
- [思源黑體 傳統](https://github.com/redchenjs/source-han-sans-classic) by [Jack Chen](https://github.com/redchenjs) （技術參攷）
- [源音黑體](https://github.com/MoneMizuno/Genne-Gothic) by [Huán-Syuān](https://github.com/MoneMizuno)（技術參攷、舊字形版部分字形參攷）
- [源樣黑體](https://github.com/ButTaiwan/genyog-font) by [But Ko](https://github.com/ButTaiwan)（舊字形版部分字形參攷）
- [傳承字形部件檢校表](https://github.com/ichitenfont/inheritedglyphs) 以及其代表字體 [一點明體](https://github.com/ichitenfont/I.Ming) by [一點字坊](https://github.com/ichitenfont) （舊字形版參攷——僅作參攷用途，非字形依據標準）
- [滙文明朝体](https://zhuanlan.zhihu.com/p/344103391) by 特里王 （築地體——舊字形版字形參攷）
- [字統網](http://zi.tools)（各地規範字形參攷、IVD資料參攷）
- [康煕字典網上版](https://www.kangxizidian.com/)（康煕字典字形——舊字形版主要參攷資料·壹）
- [東京築地活版製造所の活字見本帖](http://www.asahi-net.or.jp/~sd5a-ucd/Tsukiji-5go-S11-Specimenbook.html)（築地體字形——舊字形版主要參攷資料·貳）
- [字形維基](https://glyphwiki.org/)（秋明新字形參攷資料、大漢和辭典字形——舊字形版主要參攷資料·叁）
