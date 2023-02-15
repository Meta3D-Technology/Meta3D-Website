---
sidebar_position: 1
---

# 搭建您的自定义引擎：实现WebGPU光栅化管线绘制三角形

在本文中，您将学习到：    

- 如何开发您的扩展、贡献、扩展协议、贡献协议，并发布到平台
<!-- - 如何搭建您的自定义引擎包，并下载到本地使用 -->
- 如何搭建您的引擎演示应用，来在线演示引擎效果
<!-- - 如何通过自定义来支持WebGPU -->


我们将搭建的引擎演示应用会使用WebGPU的光栅化管线来全屏地绘制一个三角形

引擎演示应用的在线运行截图如下：
![运行结果.png](/img/搭建您的自定义引擎：实现WebGPU光栅化管线绘制三角形/运行结果.png)

如果您希望搭建您的自定义引擎包并下载到本地使用，只需要将引擎相关的扩展、贡献打包并下载，具体请参考[搭建您的第一个引擎](搭建您的第一个引擎)

<!-- [教程视频](TODO) -->

下面我们来一步步操作：

## 开发和发布imgui-webgpu-renderer扩展

目前Meta3D发布的[imgui-webgl1-renderer](https://github.com/Meta3D-Technology/Meta3D/tree/master/extensions/meta3d-imgui-webgl1-renderer)扩展只支持WebGL1，所以我们需要增加imgui-webgpu-renderer扩展来支持WebGPU

该扩展实现的协议不变，仍然为meta3d-imgui-renderer-protocol


我们首先[获得扩展模板代码](开发和发布扩展#获得模板代码)

然后在它的基础上修改，修改为[这样](https://github.com/Meta3D-Technology/Meta3D/tree/master/extensions/meta3d-imgui-webgpu-renderer)
（注意：要修改package.json->name,displayName，可将meta3d前缀名换成你自己的前缀名；并且修改package.json->version, repoLink, description, publisher）

最后[发布该扩展到平台](开发和发布扩展#发布扩展)


## 开发和发布webgpu扩展和对应的扩展协议

现在我们需要封装WebGPU的浏览器API

我们首先[获得扩展协议模板代码](开发和发布扩展协议#获得模板代码)

然后在它的基础上修改，修改为[这样](https://github.com/Meta3D-Technology/Meta3D/tree/master/protocols/extension_protocols/meta3d-webgpu-protocol)
（注意：一样要修改package.json的name, version, publisher, displayName, repoLink, description，并且可以修改icon.png）

然后[发布该扩展协议到平台](开发和发布扩展协议#发布扩展协议)


然后[获得扩展模板代码](开发和发布扩展#获得模板代码)

然后在它的基础上修改，修改为[这样](https://github.com/Meta3D-Technology/Meta3D/tree/master/extensions/meta3d-webgpu)
（注意：一样要修改package.json的name, version, publisher, displayName, repoLink, description，并且要重命名package.json->protocol->name为您的扩展协议名+对应修改package.json->dependencies中对应的协议名和版本号）

最后[发布该扩展到平台](开发和发布扩展#发布扩展)



## 开发和发布pipeline-editor-webgpu-triangle贡献和对应的贡献协议

现在我们需要实现使用WebGPU光栅化管线绘制三角形的init、render的逻辑。
具体就是加入对应的Pipeline贡献和贡献协议，实现init、render管线中的job。其中InitJob创建了device、RenderPipeline等WebGPU对象，RenderJob执行了RenderPasss来绘制三角形。


我们首先在[这里](https://github.com/Meta3D-Technology/Meta3D/tree/master/templates/contribute-pipeline-protocol-template)获得Pipeline贡献协议模板代码

然后在它的基础上修改，修改为[这样](https://github.com/Meta3D-Technology/Meta3D/tree/master/protocols/contribute_protocols/meta3d-pipeline-editor-webgpu-triangle-protocol)
（注意：一样要修改package.json的name, version, publisher, displayName, repoLink, description，并且可以修改icon.png）

然后发布该贡献协议到平台，具体操作步骤如下：
请在项目根目录执行下面的命令来发布到平台：
```js
npm run meta3d:publish
```


然后在[这里](https://github.com/Meta3D-Technology/Meta3D/tree/master/templates/contribute-pipeline-template)获得Pipeline贡献模板代码

然后在它的基础上修改，修改为[这样](https://github.com/Meta3D-Technology/Meta3D/tree/master/contributes/meta3d-pipeline-editor-webgpu-triangle)
（注意：一样要修改package.json的name, version, publisher, displayName, repoLink, description，并且要重命名package.json->protocol->name为您的扩展协议名+重命名dependentExtensionProtocolNameMap->meta3dWebgpuExtensionProtocolName和protocolName为您的webgpu扩展协议名+对应重命名DependentMapType->meta3dWebgpuExtensionProtocolName+对应修改package.json->dependencies中对应的协议名和版本号）

最后发布该贡献到平台，具体操作步骤如下：
请在项目根目录执行下面的命令来发布到平台：
```js
npm run meta3d:publish
```


## 开发和发布ui-control-webgpu-fullscreen-scene-view贡献

我们加入一个空的UIControl贡献，对应的贡献协议使用现有的meta3d-ui-control-scene-view-protocol


首先在[这里](https://github.com/Meta3D-Technology/Meta3D/tree/master/templates/contribute-ui-control-template)获得UIControl贡献模板代码

然后在它的基础上修改，修改为[这样](https://github.com/Meta3D-Technology/Meta3D/tree/master/contributes/meta3d-ui-control-webgpu-fullscreen-scene-view)
（注意：一样要修改package.json的name, version, publisher, displayName, repoLink, description）

最后发布该贡献到平台


## 开发和发布editor-engine-webgpu-render扩展和对应的扩展协议

因为需要注册WebGPU而不是WebGL的Pipeline贡献，所以需要加入新的engine-render扩展和对应的扩展协议

我们首先[获得扩展协议模板代码](开发和发布扩展协议#获得模板代码)

然后在它的基础上修改，修改为[这样](https://github.com/Meta3D-Technology/Meta3D/tree/master/protocols/extension_protocols/meta3d-editor-engine-webgpu-render-protocol)
（注意：一样要修改package.json的name, version, publisher, displayName, repoLink, description，并且可以修改icon.png）

然后[发布该扩展协议到平台](开发和发布扩展协议#发布扩展协议)


然后[获得扩展模板代码](开发和发布扩展#获得模板代码)

然后在它的基础上修改，修改为[这样](https://github.com/Meta3D-Technology/Meta3D/tree/master/extensions/meta3d-editor-engine-webgpu-render)
（注意：一样要修改package.json的name, version, publisher, displayName, repoLink, description，并且要重命名package.json->protocol->name为您的扩展协议名+重命名dependentContributeProtocolNameMap->meta3dPipelineEditorWebgpuTriangleContributeName和protocolName为您的pipeline贡献协议名+对应重命名DependentMapType->meta3dPipelineEditorWebgpuTriangleContributeName+对应修改package.json->dependencies中对应的协议名和版本号）

最后[发布该扩展到平台](开发和发布扩展#发布扩展)


## 开发和发布editor-engine-webgpu-whole扩展和对应的扩展协议

需要加入新的engine-whole扩展和对应的扩展协议

我们首先[获得扩展协议模板代码](开发和发布扩展协议#获得模板代码)

然后在它的基础上修改，修改为[这样](https://github.com/Meta3D-Technology/Meta3D/tree/master/protocols/extension_protocols/meta3d-editor-engine-webgpu-whole-protocol)
（注意：一样要修改package.json的name, version, publisher, displayName, repoLink, description，并且可以修改icon.png）

然后[发布该扩展协议到平台](开发和发布扩展协议#发布扩展协议)


然后[获得扩展模板代码](开发和发布扩展#获得模板代码)

然后在它的基础上修改，修改为[这样](https://github.com/Meta3D-Technology/Meta3D/tree/master/extensions/meta3d-editor-engine-webgpu-whole)
（注意：一样要修改package.json的name, version, publisher, displayName, repoLink, description，并且要重命名package.json->protocol->name为您的扩展协议名+重命名dependentExtensionProtocolNameMap->meta3dEditorEngineWebgpuRenderExtensionProtocolName和protocolName为您的editor-engine-webgpu-render扩展协议名+对应重命名DependentMapType->meta3dEditorEngineWebgpuRenderExtensionProtocolName+对应修改package.json->dependencies中对应的协议名和版本号）

最后[发布该扩展到平台](开发和发布扩展#发布扩展)



## 开发和发布editor-run-webgpu-engine扩展

加入新的run-engine扩展，实现的协议不变

我们首先[获得扩展模板代码](开发和发布扩展#获得模板代码)

然后在它的基础上修改，修改为[这样](https://github.com/Meta3D-Technology/Meta3D/tree/master/extensions/meta3d-editor-run-webgpu-engine)
（注意：一样要修改package.json的name, version, publisher, displayName, repoLink, description，并且要重命名package.json->protocol->name为您的扩展协议名+重命名dependentExtensionProtocolNameMap->meta3dEditorEngineWebgpuWholeExtensionProtocolName和protocolName为您的editor-engine-webgpu-whole扩展协议名+对应重命名DependentMapType->meta3dEditorEngineWebgpuWholeExtensionProtocolName+对应修改package.json->dependencies中对应的协议名和版本号）

最后[发布该扩展到平台](开发和发布扩展#发布扩展)


## 获得引擎演示应用需要的扩展、贡献

这个应用需要下面的扩展：
- most（实现的协议名：most protocol）
- event（实现的协议名：event protocol）
- immutable（实现的协议名：immutable protocol）
- meta3d-engine-core（实现的协议名：meta3d-engine-core）
- ui（实现的协议名：ui protocol）
- meta3d-engine-basic（实现的协议名：meta3d-engine-basic-protocol）
- meta3d-use-editor（实现的协议名：use editor protocol）
该扩展为应用的启动扩展
- 本文发布的所有扩展

这个编辑器需要下面的贡献：
- meta3d-pipeline-root（实现的协议名：meta3d-pipeline-root-protocol）
- 本文发布的所有贡献

我们从扩展市场和贡献市场中选择它们


## 搭建引擎演示应用页面

我们首先进入装配空间，选中所有的扩展和贡献

然后设置页面的宽度为800px，高度为600px

然后进入Element装配，选中webgpu-fullscreen-scene-view UIControl控件




## 运行引擎演示应用页面

点击运行按钮，出现运行页面，全屏渲染了一个三角形



## 剩余的步骤

剩余的步骤的操作方法跟[搭建您的第一个编辑器](搭建您的第一个编辑器)中一样，具体有下面的步骤：
- 发布引擎演示应用页面
- 选择引擎演示应用页面贡献
- 搭建引擎演示应用
- 发布引擎演示应用
- 运行引擎演示应用

最后我们看到成功运行了该引擎演示应用