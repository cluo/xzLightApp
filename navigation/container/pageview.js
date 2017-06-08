import React from "react";

var showAnimateConfig = {
  fromBottom:{
        showPage:{
          show:"xz-showpage-frombottom-show",
          hide:"xz-showpage-frombottom-hide"
        },
        basePage:{
          show:"",
          hide:""
        }
  },
  fromLeft:{
    showPage:{
      show:"xz-showpage-fromleft-show",
      hide:"xz-showpage-fromleft-hide"
    },
    basePage:{
      show:"xz-basepage-fromleft-show",
      hide:"xz-basepage-fromleft-hide"
    }
  },

  fromTop:{

  },
  none:{
        showPage:{
          show:"",
          hide:""
        },
        basePage:{
          show:"",
          hide:""
        }
  }

};

class PageView extends React.Component {
  constructor(props) {
    super(props)
    this.shouldUpdate = true;
    this.curShowPageInfo = null;
    this.basePage = null;
    this.bkCover = null;
    this.store = null;
    this.showPageDict = {};
    this.state={
      leftroute:props.leftroute,
      pagename:props.pagename,
      isDestory:false,
      basePageClassName:"",
      showPages:[]
    };
    this.repaireUrlWhenRepalceGo = this.repaireUrlWhenRepalceGo.bind(this);
  }


  componentWillReceiveProps(props){
    this.setState({pagename:props.pagename,leftroute:props.leftroute});
  }

  resume(){
    if(!this.state.isDestory){
      return;
    }
    this.setState({isDestory:false});
  }

  destroy(){
    this.setState({isDestory:true});
  }

  repaireUrlWhenRepalceGo(params){
    this.setState(params);
  }

  componentWillUnmount(){
    console.log(this.props.pkey+"     unmount>>>");

    if(this.props.pagemanager.pageInstanceDict[this.props.pkey]){
      delete this.props.pagemanager.pageInstanceDict[this.props.pkey];
    }
  }

  componentDidMount(){
    console.log(this.props.pkey+"     didmount>>>");
    this.props.pagemanager.pageInstanceDict[this.props.pkey] = {
      instance:this.pageInstance,
      basePageView:this,
      isInit:true
    };
  }


  refresh(){
    
  }

  bkClick(){
    this.closeShowPage();
  }

  closeShowPage(){
    if(this.curShowPageInfo&&this.curShowPageInfo.page){
      this.curShowPageInfo.page.props.owner.props.base._close();
    }
  }

  close(){
    if(this.props.owner){
      this.props.owner.props.base._close();
    }
  }
  _close(){
    if(this.curShowPageInfo&&this.curShowPageInfo.page){

      var showpageinfo = this.props.pagemanager.pageInstanceDict[this.curShowPageInfo.key];
      if(showpageinfo.instance.onPageBeforeLeave){
          var re = showpageinfo.instance.onPageBeforeLeave();
          if(!re){
            return false;
          }
      }
      if(this.curShowPageInfo.page._close()){
        var hideClassName = "xz-showpage "+this.curShowPageInfo.animateConfig.showPage.hide;
        this.curShowPageInfo.showPage.className = hideClassName;
        this.basePage.className = "xz-page-base-page "+this.curShowPageInfo.animateConfig.basePage.hide;
        if(!this.curShowPageInfo.cache){
          var pageKey = this.curShowPageInfo.pageKey;
          this.bkCover.className = "xz-showpage-bk xz-showpage-bk-hide";
          setTimeout(()=>{
            delete this.showPageDict[pageKey];
            this.setState({showPages:null});
          },400)
        }
        this.pageInstance.onPageResume&&this.pageInstance.onPageResume();

        this.curShowPageInfo = null;

        return false;
      }
      return false;
    }else{
      return true;
    }
  
  }

  prepareAnimateConfig(config){
    if(!config.showPage){
      config.showPage = {show:"",hide:""};
    }
    if(!config.showPage.show){
      config.showPage.show = "";
    }
    if(!config.showPage.hide){
      config.showPage.hide = "";
    }

    if(!config.basePage){
      config.basePage = {show:"",hide:""};
    }
    if(!config.basePage.show){
      config.basePage.show = "";
    }
    if(!config.basePage.hide){
      config.basePage.hide = "";
    }

    return config;
  }
  /*
    params:{
      pageKey:"",
      
      animateType:"",//string default fromBottom
      
      customAnimateConfig:{
  
      },
      cache:true, //boolean default false
      params:{
  
      }
    }
  */


  showPage(params){
    var pageKey = params.pageKey;
    var animateConfig,showClassName ;
    this.curShowPageInfo = this.showPageDict[pageKey];
    if(this.curShowPageInfo){
      
      animateConfig = this.curShowPageInfo.animateConfig;
      showClassName = "xz-showpage "+animateConfig.showPage.show;
      this.curShowPageInfo.showPage.className = showClassName;
      var showpageinfo = this.props.pagemanager.pageInstanceDict[this.curShowPageInfo.key];
      showpageinfo.instance.onPageResume && showpageinfo.instance.onPageResume();
      
      this.bkCover.className = "xz-showpage-bk xz-showpage-bk-hide";
      return;
    }
    animateConfig = showAnimateConfig[params.animateType];
    if(!animateConfig){
      if(params.customAnimateConfig){
        animateConfig = params.customAnimateConfig;
      }else{
        animateConfig = showAnimateConfig["fromBottom"];
      }
    }

    animateConfig = this.prepareAnimateConfig(animateConfig);
    var cachePage = params.cache === true;
    if(!pageKey){
      console.error("showPage 方法参数没有指明pageKey");
    }
    var showpages = [];
    showClassName = "xz-showpage "+animateConfig.showPage.show;
    var key = this.props.pkey+'_show_'+pageKey;
    this.curShowPageInfo={cache:cachePage,pageKey:pageKey,animateConfig:animateConfig,key:key};
    this.showPageDict[pageKey] = this.curShowPageInfo;
    this.curShowPageInfo.instance = (<div ref={(showPage)=>{
      if(showPage){this.showPageDict[pageKey].showPage = showPage;}
    }} className={showClassName} key={key+"_wrapper"} >
        <PageView 
          ref={(page)=>{
              if(page){
                this.showPageDict[pageKey].page = page;
              }
            }
          } 
          leftroute={[]} 
          pagename={pageKey} 
          owner={this.pageInstance}
          pagemanager={this.props.pagemanager} 
          key={key} pkey={key}></PageView>
      </div>);
    for(var key in this.showPageDict){
      showpages.push(this.showPageDict[key].instance);
    }
    this.bkCover.className = "xz-showpage-bk xz-showpage-bk-show";
    this.setState({showPages:showpages,basePageClassName:animateConfig.basePage.show});
  }



  render() {
    console.log("render>>>>"+this.props.pkey);
    if(this.state.isDestory){
      return null;
    }
    var pagename = this.state.pagename||"";
    var realpagename = pagename.split("_")[0];

    var ToPageInstance = this.props.pagemanager.props.config.pages[realpagename];
    if(!ToPageInstance){
       console.error("pages属性中没有引入["+realpagename+"]页面");
       return null;
    }


    var params = {
      url:this.props.pagemanager.getUrlInfo(),
      pagemanager:this.props.pagemanager,
      base:this,
      pagename:realpagename,
      key:this.props.pkey
    };

    if(!this.store){
      if(ToPageInstance.connectStore){
        this.store = ToPageInstance.connectStore(params);
      }
    }


    
    //this.props.pkey
    var basePageClassName = "xz-page-base-page "+this.state.basePageClassName;
    return (<div className='xz-page-inner' key={this.props.pkey+"_outer"}>
        {this.state.showPages}
        <div 
        ref={(bkCover)=>{
          this.bkCover = bkCover;
        }}
        onClick={this.bkClick.bind(this)} className="xz-showpage-bk xz-showpage-bk-hide"></div>
        <div ref={(basepage)=>{
          this.basePage = basepage;
        }} className={basePageClassName}>
        <div className='xz-pfull'>
          <ToPageInstance 
            base={this} 
            {...this.store}
            ref={(instance)=>{
              this.pageInstance = instance;
            }}
            owner = {this.props.owner}
            urlinfo={this.props.pagemanager.getUrlInfo()}
            pagename={this.state.pagename}
            leftroute = {this.state.leftroute}
            pagemanager={this.props.pagemanager}
            basekey={this.props.pkey}
            pkey={this.props.pkey+"_inner"} 
            key={this.props.pkey+"_inner"}>
          </ToPageInstance>
        </div>
        </div>
      </div>);
  }
}
export default PageView;
