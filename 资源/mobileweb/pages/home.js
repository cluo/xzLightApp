module.exports = {
  type:"pageview",
  root:["头部","Body"],
  components:{
    头部:{
      type:"xz.header",
      root:["退出","headertitle","headerRightIcon"],
      style:{
        common:"header"
      }
    },
    Body:{
      type:"xz.view",
      overflow:"auto",
      root:["测试ScrollView滑动"],
      style:{
        flex:1,
        flexDirection:"row"
      }
    },
    退出:{
      type:"xz.icon",
      font:"icomoon_e960",
      style:{
        common:"lefticon",
        width:55
      },
      iconStyle:{color:"#fff",fontSize:18},
      textStyle:{color:"#fff"},
      text:"退出",
      onClick:[
        {type:"goback"}
      ]
    },
    headertitle:{
      type:"xz.text",
      text:"Home",
      style:{
        color:"#fff",
        fontSize:17
      }
    },
    headerRightIcon:{
      type:"xz.icon",
      font:"FontAwesome_f007",
      iconStyle:{color:"#fff",fontSize:20},
      style:{
        common:"righticon"
      },
      onClick:[
        {type:"showpage",to:"sliderP"}
      ]
    }
  }
}
