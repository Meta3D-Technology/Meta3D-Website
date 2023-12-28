---
sidebar_position: 2
---

# 加入Material Inspector

在本文中，您将学习到：

- 如何在“完整的编辑器”这个编辑器模板基础上，加入Material Inspector

Material Inspector是跟Transform Inspector平级的面板，用于修改材质。这里只包括“修改材质的Diffuse颜色”的功能

加入后，运行编辑器的截图如下：
TODO tu


## 具体步骤

首先，我们加入对应的UI Control，具体步骤如下：

- 导入“完整的编辑器”，具体步骤详见[导入模板](/导入模板)
<!-- - 选中“Selected UI Controls”中的root -->
- 选中“Selected UI Controls”中的“Inspector”   
这是Inspector面板，目前有一个设置Game Name的文字输入框、一个Transform Inspector
<!-- - 加入UI Control：窗口 -->
- 加入UI Control：折叠面板    
这将会加入到Inspector中
- 修改右侧的Rect的宽、高分别为400、30
- 修改右侧的Specific->label为Material Inspector、isOpen为true、cond为Once
<!-- 如下图红框所示：    
TODO tu -->
- 加入UI Control：数字输入框    
这将会加入到Material Inspector中
- 修改右侧的Rect的宽为90
- 修改右侧的Specific->label为Diffuse Color、step为0.02、stepFast为0.1

然后，我们加入Input，为Diffuse Color这个数字输入框提供数据，具体步骤如下：

- 在左侧的Inputs中，加入一个Input
- 将其代码替换为：    
```ts
import { api } from "meta3d-type"
import { service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"

const selectSceneTreeNodeActionName = "SelectSceneTreeNode"

export let getContribute = (api: api) => {
    return {
        inputName: "DiffuseColorInput",
        func: (meta3dState) => {
            let { gameObject, pbrMaterial } = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).scene(meta3dState)
            return Promise.resolve(api.nullable.bind(selectSceneTreeNodeState => {
                return api.nullable.bind(selectedGameObject => {
                    if (gameObject.hasPBRMaterial(meta3dState, selectedGameObject)) {
                        return api.nullable.return(pbrMaterial.getDiffuseColor(meta3dState, gameObject.getPBRMaterial(meta3dState, selectedGameObject)))
                    }

                    return api.nullable.getEmpty()
                }, selectSceneTreeNodeState.selectedGameObject)
            }, api.action.getActionState(meta3dState, selectSceneTreeNodeActionName)))
        }
    }
}
```
- 选中“Selected UI Controls”中的“Diffuse Collor”   
- 修改右侧的Input为DiffuseColorInput

然后，我们加入Action，处理Diffuse Color这个数字输入框的input_change事件，具体步骤如下：

- 在左侧的Actions中，加入一个Action
- 将其代码替换为：    
```ts
import { api } from "meta3d-type"
import { service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"

const actionName = "SetDiffuseColor";
const eventName = "SetDiffuseColorEvent";
const selectSceneTreeNodeActionName = "SelectSceneTreeNode";
let runGameViewRenderOnlyOnce = (meta3dState, api, { getPluggablePackageService }) => {
    return api.nullable.getWithDefault(api.nullable.map(({ runOnlyOnce }) => {
        return runOnlyOnce(meta3dState);
    }, getPluggablePackageService(meta3dState, "meta3d-editor-gameview-render-protocol")), meta3dState);
};

export let getContribute = (api: api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState);
            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on(meta3dState, eventName, 0, (meta3dState, gameObject, diffuseColor) => {
                    let editorWholeService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"));
                    let engineSceneService = editorWholeService.scene(meta3dState);
                    let oldDiffuseColor = engineSceneService.pbrMaterial.getDiffuseColor(meta3dState, engineSceneService.gameObject.getPBRMaterial(meta3dState, gameObject));
                    meta3dState = engineSceneService.pbrMaterial.setDiffuseColor(meta3dState, engineSceneService.gameObject.getPBRMaterial(meta3dState, gameObject), diffuseColor);
                    let state = api.nullable.getExn(api.action.getActionState(meta3dState, actionName));
                    meta3dState = api.action.setActionState(meta3dState, actionName, Object.assign(Object.assign({}, state), { allDiffuseColorData: state.allDiffuseColorData.push([gameObject, oldDiffuseColor]) }));
                    return Promise.resolve(runGameViewRenderOnlyOnce(meta3dState, api, api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))));
                }, (meta3dState) => {
                    let { allDiffuseColorData } = api.nullable.getExn(api.action.getActionState(meta3dState, actionName));
                    if (api.nullable.isNullable(allDiffuseColorData.last())) {
                        return Promise.resolve(meta3dState);
                    }
                    let [gameObject, diffuseColor] = api.nullable.getExn(allDiffuseColorData.last());
                    let engineSceneService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))
                        .scene(meta3dState);
                    meta3dState = engineSceneService.pbrMaterial.setDiffuseColor(meta3dState, engineSceneService.gameObject.getPBRMaterial(meta3dState, gameObject), diffuseColor);
                    let state = api.nullable.getExn(api.action.getActionState(meta3dState, actionName));
                    meta3dState = api.action.setActionState(meta3dState, actionName, Object.assign(Object.assign({}, state), { allDiffuseColorData: state.allDiffuseColorData.pop() }));
                    return Promise.resolve(meta3dState);
                }));
            });
        },
        handler: (meta3dState, uiData) => {
            return new Promise((resolve, reject) => {
                let { selectedGameObject, } = api.nullable.getExn(api.action.getActionState(meta3dState, selectSceneTreeNodeActionName));
                if (api.nullable.isNullable(selectedGameObject)) {
                    resolve(meta3dState);
                    return;
                }
                let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState);
                resolve(eventSourcingService.addEvent(meta3dState, {
                    name: eventName,
                    inputData: [
                        api.nullable.getExn(selectedGameObject),
                        uiData
                    ]
                }));
            });
        },
        createState: (meta3dState) => {
            return {
                allDiffuseColorData: api.immutable.createList()
            };
        }
    };
};
```
- 选中“Selected UI Controls”中的“Diffuse Collor”   
- 选择右侧Event->input_change的下拉框为SetDiffuseColor


最后，我们运行并发布编辑器，具体步骤如下：

- 运行编辑器    
可以这样来运行编辑器中测试：首先点击左侧Scene Treed中的Cube；然后在右侧的Material Inspector中修改颜色；在Scene View中查看修改后的效果

- 可以发布您的编辑器

