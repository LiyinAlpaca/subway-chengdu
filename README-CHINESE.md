# :train2::train2::train2: 成都地铁线路图

删除了我不需要的数据功能,增加了表单,以及最短的路径的计算

* 单击线路隐藏其他线路
* 单击站点弹出卡片
* 双击SVG或指定按钮复原
* 数据量太大,只做了很小一部分
* 练习react为主,数据不精确

## 组件结构

将整个地图理解成一个 Map 组件，再将其分为 4 个小组件：

![map.png](http://ozfo4jjxb.bkt.clouddn.com/map.png)

* Label: 地图上的文本信息，包括地铁站名，线路名称
* Station: 地铁站点，包括普通站点和中转站点
* Line： 地铁线路
* SubwayForm: 表单,实现了双向绑定
* InfoCard: 弹出的卡片,目前只能设置起始站和终点站

## LICENSE

[MIT](https://github.com/neal1991/subway-shanghai/blob/master/LICENSE.md)




