Page({
    data:{

    },
    onLoad(e){
        let id = e.id;
        //console.log(id)
        if(id){
            getData(id,this);
        }else{
            this.setData({
                id:Date.now()
            })
        }
    },
    change(e){
       let val = e.detail.value;
       console.log(val);
       this.setData({
           content:val
       })
    },
    cancel(){
        wx.navigateBack()
    },
    sure(){
       let re = /^\s*$/g;
       if(!this.data.content || re.test(this.data.content)){
           return;
       } 
       this.setData({
           time:Date.now()
       })
       setValue(this);
       wx.navigateBack() 
    }
})

function getData(id,page){
    let arr = wx.getStorageSync('txt');
    if(arr.length){
        arr.forEach((item)=>{
            if(item.id == id){
               page.setData({
                   id:item.id,
                   content:item.content
               })
            }
        })
    }
}

function setValue(page){
    let arr = wx.getStorageSync('txt');
    let data = [],flag = true;
    if(arr.length){
        arr.forEach((item) => {
            if(item.id == page.data.id){
                item.time = Date.now();
                item.content = page.data.content;
                flag = false;
            }
            data.push(item);
        })
    }
    if(flag){
        data.push(page.data);
    }
    wx.setStorageSync('txt', data);
}