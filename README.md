# WeiXin-mini-apps-domes  小程序-domes
**小程序是什么：运行在微信里的app**

**组成结构**
视图层wxml：
   wxml结构文件
   wxss样式文件

逻辑层js：
   数据
   交互

工作原理：
    数据的双向绑定
    用户在视图上的修改会自动同步到数据模型中去
    数据模型中的值发生了变化，也会立刻同步到视图中


使用小程序：
1.安装小程序：微信开发者工具
    1）登录微信公众号
    2）进入小程序平台找到工具下载
        地址：mp.weixin.qq.com/debug/wxadoc/devtools/download.html

2.安装完成新建项目
    1）项目地址
    2）项目名称
    3）AppID(需要实名注册获取) 
        注册完了之后再微信公众号中的设置开发设置可以看得到AppID码
        如果不注册的话不设置AppID那么有些功能会受限制，比如验证啥的

3.新建后的项目中包含：
    app.js
    app.json   //配置文件  
        pages  //是放哪些页面
        window //小程序的页面设置
    app.wxss   //全局样式
    pages文件夹包含：
        页面组成：
            样式文件   //指定页面样式
            结构文件   //指定页面的结构html
            逻辑文件   //数据处理  模块处理  指定页面的生命周期函数进行监听   
            JSON文件  //指定页面的配置  标题  背景颜色
    utils文件包含：
        不是必须的文件，可以取其他名字
        util.js
            用来提供接口 ES6  导出函数  用于模块化开发  
            初始化生成的代码是一个时间转换的模块，用来格式化的时间（包含时间戳的转换、补零函数、导出函数）
            需要使用这个函数时那么引用该模块  
                let time = require("../../utils/util");  //引用模块
    
        
微信小程序API地址：
	https://developers.weixin.qq.com/miniprogram/document/render/canvas/createCanvas.html?t=201812
	
     
## 逻辑层js写法
```javascript
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
```
        
#### 事件处理函数  
事件处理函数主要是在渲染层的组件加入绑定，当触发事件时，就会执行Page中定义的事件处理函数  

**事件绑定函数的例子：** 
index.wxml  
```javascript
    <!---bindtap="" 默认是冒泡的事件--->
	<view bindtap="viewTap"> 点我 </view>
```

index.js
```javascript
	Page({
	  viewTap(){   
		console.log('viewTap ===>');
	  }
	})
```


**setData函数**
在事件绑定中常常会使用setData函数，这个函数非常重要，它是函数用于将数据从逻辑层发送到视图层，同时改变对应的this.data值

setData()参数格式：
接受一个对象，以key，value的形式

注意：直接修改 this.data 而不调用 this.setData 是无法改变页面的状态的，还会造成数据不一致

lists.wxml：
```javascript
<scroll-view scroll-y="true">
	<block wx:for="{{lists}}">
	  <view>
	     <view class="content">{{item.content}}</view>
	     <view class="time">创建日期：{{item.time}}</view>
	  </view>
	</block>
</scroll-view>
```

index.js：
```javascript
Page({
    data:{
        lists:[
            {
                content:"hello",
                time:Date.now(),
                id:1
            }
        ]
    },
    onLoad(){
        initData(this);  //初始化一个方法，这里的this指的是实例化对象Page
    },
    onShow(){
        initData(this);  //初始化一个方法，这里的this指的是实例化对象Page
    },
    edit(e){
        let id = e.currentTarget.dataset.id;  //获取到对应的id
        wx.navigateTo({   //跳转路由
            url:"../add/add?id=" + id   //在路由跳转的时候把id传到要跳转的页面中
        })
    },
    add(){
        wx.navigateTo({   //跳转路由
            url:"../add/add"
        })
    }
})

function initData(page){
    var arr = wx.getStorageSync('txt');  //获取本地存储的数据
    if(arr.length){
        arr.forEach((item,i) => {
            let t = new Date(Number(item.time));
            item.time = time.formatTime(t);
        })
        page.setData({  //等同于this.data.lists = arr  更新数据
            lists:arr
        })
    }
}

```

**模块化**
可以将一些公共的代码抽离成为一个单独的 js 文件，作为一个模块。模块只有通过 module.exports 或者 exports 才能对外暴露接口。
```javascript
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}

```

在需要使用这些模块的文件中，使用require(path)将公共代码引入
```javascript
let time = require("../../utils/util");
```




