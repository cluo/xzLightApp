module.exports ={
  type:"tpageview",
  root:["page00_tabbar1"],
  components:{
      page00_tabbar1:{
        type:"xz.tabbar",
        style:{height:45,backgroundColor:"#313541"},
        root:["page0tabitem","hometabitem","whytabitem","settingtabitem"]
      },page0tabitem:{
        type:"xz.icon",
        text:"首页",
        selectedcolor:"#007DDC",
        font:"icomoon_e90c",
        style:{flex:1},
        iconStyle:{fontSize:17,color:"#828282"},
        textStyle:{common:"tabtext"},
        textPos:"bottom",
        tabpage:"page0"
      },
      hometabitem:{
        type:"xz.icon",
        selectedcolor:"#007DDC",
        text:"分类",
        font:"icomoon_e92a",
        style:{flex:1},
        iconStyle:{fontSize:17,color:"#828282"},
        textStyle:{common:"tabtext"},
        textPos:"bottom",
        tabpage:"home"
      },
      whytabitem:{
        type:"xz.icon",
        text:"购物车",
        selectedcolor:"#007DDC",
        font:"icomoon_e90f",
        selectedicon:"e922",
        style:{flex:1},
        iconStyle:{fontSize:17,color:"#828282"},
        textStyle:{common:"tabtext"},
        textPos:"bottom",
        tabpage:"why"
      },
      settingtabitem:{
        type:"xz.icon",
        text:"我的",
        style:{flex:1},
        selectedcolor:"#007DDC",
        font:"icomoon_e928",
        iconStyle:{fontSize:17,color:"#828282"},
        textStyle:{common:"tabtext"},
        textPos:"bottom",
        tabpage:"setting"
      }
    }
};
