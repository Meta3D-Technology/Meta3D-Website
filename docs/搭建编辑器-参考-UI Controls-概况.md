---
sidebar_position: 1
---

# 概况

UI Control使用IMGUI来绘制，因此整个编辑器就是一个canvas

在“Selected UI Controls”中加入UI Control后，会自动选中它，并在右侧显示它的Inspector，如下图所示：
![](/img/搭建编辑器/UIControlInspector.jpg)

其中：    

- Rect    
设置坐标和大小
- Input    
选择通过哪个Input来获得数据
- Specific    
设置配置
- Event    
显示支持的事件，可选择对应的Action来处理该事件

