---
sidebar_position: 1
---

# UI Control需要的数据的类型

## 说明

现在举一个实际的例子来说明：    
如果您需要写“窗口”这个UI Control的Input，则希望知道它返回的类型。为此，您先找到“meta3d-ui-control-window-protocol”的代码，找到其中的“inputFunc”的类型。如果它为null，则说明该UI Control不需要Input；否则，找到它使用了哪个func。具体如下所示：    
meta3d-ui-control-window-protocol的代码：
```ts
...
import { func } from "meta3d-input-window-protocol"

...
export type inputFunc = nullable<func>
```

我们可以看到，它使用了“meta3d-input-window-protocol”的func，所以我们打开它的代码，如下所示：
meta3d-input-window-protocol的代码：
```ts
import { inputFunc } from "meta3d-ui-protocol/src/contribute/InputContributeType"

type isShow = boolean

export type data = isShow

export type func = inputFunc<data>
```

这里只看data的类型。此处它是boolean类型，因此Input应该返回Promise<boolean>类型，即Input代码应该为：
```ts
import { api } from "meta3d-type"
import { service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"

    export let getContribute = (api:api) => {
      return {
        inputName: "TODO 输入您的Input名",
        func: (meta3dState) =>{
            ...

            return Promise.resolve(TODO true or false)
        }
      }
    }
```

## 相关代码

“meta3d-ui-control-xxx-protocol”和“meta3d-input-xxx-protocol”的代码在[这里](https://github.com/Meta3D-Technology/Meta3D/tree/master/protocols/contribute_protocols)可以找到