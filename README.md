<p align="center">
<img src="./assets/app.png" width=100px height=100px></p>
<h1 align="center"> Kanban-Desktop </h1>
<h3 align="center"> An AI Based Kanban for Windows and Linux* Desktop Users </h3>
<br/>
<p align="center">
<img src="https://img.shields.io/badge/Build-passing-green.svg?style=flat-square">
<img src="https://img.shields.io/badge/Version-2.2.2 Stable-red.svg?style=flat-square">
<img src="https://img.shields.io/badge/Electron-18.0.4-blue.svg?style=flat-square">
<img src="https://img.shields.io/badge/License-GPL-purple.svg?style=flat-square">
</p>

语言/Language:
[中文](https://github.com/JimHans/kanban-desktop/blob/master/README.md) | [English](https://github.com/JimHans/kanban-desktop/blob/master/README_EN.md)

---

### 🎉可以在你的桌面上随意调教的看板娘！专为Windows与Linux* 桌面设计，模型库丰富，支持云端与本地模型加载**，功能全面，持续不定期更新中（咕咕咕）
---
## 🎰目前拥有的功能有：
- 特别为桌面用户优化的伪·高斯模糊UI以及工具箱设计，更方便桌面使用
- 承接上一代网页版本，接入腾讯NLP，支持文字实时对话
- 底部输入框一键切换网页搜索，可以方便地随时搜索所需的内容，更可以随时切换搜索引擎
- 全新的接入原生通知的日程提醒功能，只要输入倒数时间与提醒内容即可到点提醒，同时包括多种取自MIUI的随机通知铃声
- 全新小窗模式，在需要专心工作/不想暴露自己是个2ch的时候，可以点击叉号进入小窗专注模式，此时，看板娘将最小化为气泡在右下角待命
- 云端api加入大量全新模型，设置窗口中可以自行填写自建api地址
- 本地模型加载，可选择本地模型Json文件（仅Prerelease）或云端API加载模型
- 2x高清渲染，看板娘画质更清晰，高分屏全面适配
- 加入全局设置，工具箱功能可以自己设定，看板娘行为也可以全局设置并保存
- 桌面全局拖拽，按住一言气泡拖动即可全局拖拽，放在哪里都合适
- 更多功能仍在努力开发中，你可以在本仓库的Projects选项卡内查看相关开发进度
---
## 📺安装：
请移步到本项目Release中，获取最新版本安装包。稳定版Release中默认包含Windows平台下zip绿色版与安装程序，同时也包含在Endeavour OS环境下编译的Linux版本可执行程序。由于设备限制，Mac用户需要自行搭建环境进行编译，感谢理解。
<br/>测试版Prerelease通道将发布提前预览的版本，拥有更新的功能的同时由于未开发完成，可能拥有影响使用的Bug，仅供尝鲜测试。
Release地址：[Release](https://github.com/JimHans/kanban-desktop/releases)

---
## 📚使用指南：
<br/>
<p align="center">
<img src="./demo.png" width=100% height=auto></p>

---
## 📌注意：
- #### 1.本项目使用Electron开发，支持Windows,Mac OS,Linux跨平台运行。Release中默认只提供Windows安装包，如果需要其他平台使用，你可以使用`git clone` 本仓库后在本地编译打包。
- #### 2.在使用本项目自带的NLP时，请注意不要发送过多请求导致腾讯云API免费次数到达限制。后期，本项目将在设置中加入NLPAPI手动填写功能，并对公用API设置限制。自行注册腾讯云API的方式，请见下方附录教程
- #### 3.本项目使用的模型文件版权均归相关版权方所有，后期本项目将在设置中提供自建模型API选项，并可能加入本地模型加载功能来避开这个限制。至于这个功能什么时候上线，我也不知道ㄟ( ▔, ▔ )ㄏ
- #### 4.由于使用Electron进行构建，所以性能开销略大，耗电量较高，不建议给笔记本使用，建议挂在台式机食用

---
## 🤔FAQ
* Q:为什么我打开后不会显示live2d模型？
* A:视网络情况而定，初次使用时需要从模型API获取模型数据。由于默认API服务器带宽不够（穷），所以可能需要等待一段时间才能加载完成，请您耐心等待或者在设置界面中填写其他API地址来提升加载速度。未来，本项目将加入本地加载功能来弥补此问题。
- Q:我要如何才能关闭日程提醒的响铃？
- A:您可以在设定日程到达时间后，点击弹出的日程通知来关闭响铃。
* Q:什么时候能加入对moc3与本地模型文件的支持？
* A:好问题，本地模型加载模式目前已经基本开发完成（能用级别）并已经在Prerelease通道内开放测试，moc3支持可能要等等了，我也不知道啥时候能加。

<br/>

*✨如果您有对本项目的更多运行、部署与代码方面的问题，以及对本项目有更好的看法与构思，欢迎在本项目Issue下留言，或者为本项目Pull Requests！*

---

## 📝附录
- 1.如果你需要自己申请腾讯NLP自然语言处理服务，可以参考本项目的前身-网页版本AI看板娘的NLP搭建教程，链接如下：[搭建教程](https://github.com/JimHans/AI-waifu)
- 2.新的本地模式目前仍不稳定，其需要在模型配置清单Json文件内加入hit_areas_custom配置才能读取到触摸范围，从而响应触摸行为。其他需要注意的配置我将在未来进行整理。相应的Json可视化配置功能未来也将纳入开发规划中。

---
## 🧡感谢

[live2d_demo / ©fghrsh / GPL v2.0][1]  
[live2d-widget / ©xiazeyu / GPL v2.0][2]  
[live2d_src / ©journey-ad / GPL v2.0][3]    
[AI-Waifu / ©jimhans / GPL v2.0][4]  

Live2d Cubism SDK WebGL 2.1 Project & All model authors.

Open sourced under the GPL v3.0 license.

### 🔗注释：
*: 对Linux的支持暂不完全。
**: 本地模式暂时仅在Prerelease通道提供，目前不稳定，仅供测试使用。

  [1]: https://github.com/fghrsh/live2d_demo
  [2]: https://github.com/xiazeyu/live2d-widget.js
  [3]: https://github.com/journey-ad/live2d_src
  [4]: https://github.com/JimHans/AI-waifu