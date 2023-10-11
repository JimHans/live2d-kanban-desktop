<p align="center">
<img src="./assets/app.png" width=100px height=100px></p>
<h1 align="center"> Kanban-Desktop </h1>
<h3 align="center"> An AI Based Kanban for Windows and Linux* Desktop Users </h3>
<br/>
<p align="center">
<img src="https://img.shields.io/badge/Build-passing-green.svg?style=flat-square">
<img src="https://img.shields.io/github/package-json/v/JimHans/live2d-kanban-desktop?color=red&style=flat-square">
<img src="https://img.shields.io/badge/Electron-22.0.0-blue.svg?style=flat-square">
<img src="https://img.shields.io/badge/License-GPL v3.0-purple.svg?style=flat-square">
</p>

语言/Language:
[中文](https://github.com/JimHans/kanban-desktop/blob/master/README.md) | [English](https://github.com/JimHans/kanban-desktop/blob/master/README_EN.md)

---

### 🎉可以在你的桌面上随意调教的看板娘！专为Windows与Linux* 桌面设计，模型库丰富，支持云端与本地模型加载**，功能全面，持续不定期更新中（咕咕咕）
---
## 🎰目前拥有的功能有：
- 特别为桌面用户优化的伪·高斯模糊UI以及工具箱设计，更方便桌面使用
- ~~承接上一代网页版本，接入腾讯NLP，支持文字实时对话，支持自己部署NLP服务~~
- 加入ChatGPT-API支持，填入APIKey后即可解锁ChatGPT对话功能
- 底部输入框一键切换网页搜索，可以方便地随时搜索所需的内容，更可以随时切换自定义搜索引擎
- 全新的接入原生通知的日程提醒功能，只要输入倒数时间与提醒内容即可到点提醒，同时包括多种取自MIUI的随机通知铃声
- 全新小窗模式，在需要专心工作/不想暴露自己是个2ch的时候，可以点击叉号进入小窗专注模式，此时，看板娘将最小化为气泡在右下角待命
- 小窗气泡新增自定义背景功能，更加个性化
- 云端api加入大量全新模型，设置窗口中可以自行填写自建api地址
- 本地模型加载，可选择本地模型Json文件（实验性）或云端API加载模型
- Live2D V2~V5 全版本模型支持
- 自定义缩放与模型坐标位置，自由调节模型显示大小与位置
- 2x高清渲染，看板娘画质更清晰，高分屏全面适配
- 加入全局设置，基于WinUI3的全新设置窗口，工具箱功能可以自己设定，看板娘行为也可以全局设置并保存
- 桌面全局拖拽，按住拖拽手柄拖动即可全局拖拽，放在哪里都合适
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
- #### 2.在使用本项目自带的NLP时，请注意不要发送过多请求导致腾讯云API免费次数到达限制。在2.0.0版本后，本项目在设置中加入了NLPAPI手动填写功能，并对公用API设置限制。自行注册腾讯云API的方式，请见下方附录教程
- #### 3.本项目使用的模型文件版权均归相关版权方所有，2.2.0版本后，本项目已在设置中提供自建模型API选项，并已加入本地模型加载功能来避开这个限制。/*至于这个功能什么时候上线，我也不知道ㄟ( ▔, ▔ )ㄏ*/
- #### 4.在使用moc3模型加载模式时，根据Cubism EULA条款，本程序无法自带渲染器分发，因此默认使用官方CDN提供支持，若需要离线使用，请参照软件内提示自行下载渲染器文件并放置在软件根目录下。
- #### 5.由于使用Electron进行构建，所以性能开销略大，耗电量较高，不建议给笔记本使用，建议挂在台式机食用

---
## 🤔FAQ
* Q:为什么我打开后不会显示live2d模型？
* A:如果你使用的是在线模型加载模式，则视网络情况而定，初次使用时需要从模型API获取模型数据。由于默认API服务器带宽不够（穷），所以可能需要等待一段时间才能加载完成，请您耐心等待或者在设置界面中填写其他API地址来提升加载速度；如果你使用的是本地模型加载模式，请检查模型JSON描述文件是否符合要求。/*未来，本项目将加入本地加载功能来弥补此问题。*/
- Q:我要如何才能关闭日程提醒的响铃？
- A:您可以在设定日程到达时间后，点击弹出的日程通知来关闭响铃。
* Q:是否已经加入对moc3与本地模型文件的支持？
* A:好问题，本地模型加载模式目前已经基本开发完成，现在已经支持Live2D V2-V5全版本模型加载，你可以在实验室选项卡启用此功能。由于存在部分模型加载错误或功能缺失问题仍在努力修复中，因此本功能仍不是默认启用，敬请期待之后优化。/*并已经在Prerelease通道内开放测试，moc3支持现在已经在进行测试，预计将在下个版本作为测试功能添加，敬请期待。*/
- Q:为什么对话功能无法使用？
- A:由于腾讯云于2023年8月关停了NLP对话服务，因此此功能暂不可用，你可以暂时使用ChatGPT对话服务，为填补空白，未来将会加入其他对话API如Bing AI的支持。

<br/>

*✨如果您有对本项目的更多运行、部署与代码方面的问题，以及对本项目有更好的看法与构思，欢迎在本项目Issue下留言，或者为本项目Pull Requests！*

---

## 📝附录
- ~~1.如果你需要自己申请腾讯NLP自然语言处理服务，可以参考本项目的前身-网页版本AI看板娘的NLP搭建教程，链接如下：[搭建教程](https://github.com/JimHans/AI-waifu)~~
- 1.本地模式需要在模型配置清单Json文件内加入hit_areas_custom配置才能读取到触摸范围，从而响应触摸行为。其他需要注意的配置我将在未来进行整理。相应的Json可视化配置功能未来也将纳入开发规划中。
- 2.ChatGPT对话功能需要您拥有OpenAI账号与API Key。本软件使用OpenAI官方API进行对话请求。
- 注意：本软件不提供公有API Key, 使用此功能时请保持在科学网络环境下使用。任何由于使用本软件造成的账户封锁或Key失效等问题，本软件不承担任何责任。

---
## 🧡感谢

[live2d_demo / ©fghrsh / GPL v2.0][1]  
[live2d-widget / ©xiazeyu / GPL v2.0][2]  
[live2d_src / ©journey-ad / GPL v2.0][3]    
[AI-Waifu / ©jimhans / GPL v2.0][4]  
[ChatGPT-API / ©lxfriday / MIT license][5]  
[live2d_on_website / ©Himehane / GPL v2.0][6]  

Live2d Cubism SDK WebGL 2.1 & 5.0 Project & All model authors.

This program is subject to the terms of Cubism EULA.

Open sourced under the GPL v3.0 license.

### 🔗注释：
*: 对Linux的支持暂不完全。
**: 本地模式暂时仅在实验室选项卡内提供可选开关，目前不稳定，仅供测试使用。

  [1]: https://github.com/fghrsh/live2d_demo
  [2]: https://github.com/xiazeyu/live2d-widget.js
  [3]: https://github.com/journey-ad/live2d_src
  [4]: https://github.com/JimHans/AI-waifu
  [5]: https://github.com/lxfriday/ChatGPT-API
  [6]: https://github.com/Himehane/live2d_on_website