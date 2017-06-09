import React from "react"
import "../css/segmentdemo.less"
import {xz,style,shallowEqual,Navigation} from "../../../index"

class PageView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      demo2SelectedKey:"1"
    }
  }

  demo2Select(){
    this.setState({demo2SelectedKey:"2"});
  }
  

  renderIndicatorThree(params){
    var rect = params.itemInstance.Dom.children[0].getBoundingClientRect();
    var indicatorStyle = {
      position:"absolute",
      bottom:"0",
      left:rect.left,
      width:style.px2rem(rect.width)+"rem",
      height:style.px2rem(5)+"rem",
    };
    var arr = ["segment-indi-nomal"];
    if(params.curIndex!=params.preIndex){
    	arr.push("segment-indi-nomal-ani");
    }
    return <div className={arr.join(" ")} style={indicatorStyle}></div>
  }


  renderIndicatorTwo(params){
    var rect = params.rect;
    var indicatorStyle = {
      position:"absolute",
      bottom:"0",
      left:rect.left,
      width:style.px2rem(rect.width)+"rem",
      height:style.px2rem(5)+"rem",
    };
    var arr = ["segment-indi-nomal"];
    if(params.curIndex!=params.preIndex){
    	arr.push("segment-indi-nomal-ani");
    }
    return <div className={arr.join(" ")} style={indicatorStyle}></div>
  }

  renderIndicatorOne(params){
    var rect = params.rect;

    var indicatorStyle = {
      left:rect.left,//
      right:style.screen.width-rect.right,//
      height:style.px2rem(5)+"rem",
    };
    var indiClassArr = ["segement-indi"];
    if(params.curIndex>params.preIndex){
      indiClassArr.push("segement-indi-ltr");
    }else if(params.curIndex<params.preIndex){
      indiClassArr.push("segement-indi-rtl");
    }
    return <div className={indiClassArr.join(" ")} style={indicatorStyle}></div>
  }


  render() {
    return (<div className='full-screen'>
        <xz.Segment  selectedKey="1" scroll={true}>
          <xz.Segment.Item key='1'>首页</xz.Segment.Item>
          <xz.Segment.Item key='2'>商城</xz.Segment.Item> 
          <xz.Segment.Item key='3'>应用</xz.Segment.Item>  
          <xz.Segment.Item key='4'>设计</xz.Segment.Item>
          <xz.Segment.Item key='5'>设置</xz.Segment.Item>
          <xz.Segment.Item key='6'>我的</xz.Segment.Item>
          <xz.Segment.Item key='7'>更多</xz.Segment.Item>
          <xz.Segment.Item key='61'>我的</xz.Segment.Item>
          <xz.Segment.Item key='71'>更多</xz.Segment.Item>
          <xz.Segment.Item key='62'>我的</xz.Segment.Item>
          <xz.Segment.Item key='73'>更多</xz.Segment.Item>
         </xz.Segment>
<br/>
        <xz.Segment selectedKey="1">
          <xz.Segment.Item key='1'>首页</xz.Segment.Item>
          <xz.Segment.Item key='2'>商城</xz.Segment.Item> 
          <xz.Segment.Item key='3'>应用</xz.Segment.Item>  
          <xz.Segment.Item key='6'>我的</xz.Segment.Item>
         </xz.Segment>
         <br/>

         <xz.Segment className="segement-demo-2" renderIndicator={this.renderIndicatorOne.bind(this)} selectedKey={this.state.demo2SelectedKey} scroll={true}>
          <xz.Segment.Item key='1'>首页</xz.Segment.Item>
          <xz.Segment.Item key='2'>商城</xz.Segment.Item> 
          <xz.Segment.Item key='3'>应用</xz.Segment.Item>  
          <xz.Segment.Item key='4'>设计</xz.Segment.Item>
          <xz.Segment.Item key='5'>设置</xz.Segment.Item>
          <xz.Segment.Item key='6'>我的</xz.Segment.Item>
          <xz.Segment.Item key='7'>更多</xz.Segment.Item>
         </xz.Segment>
         <br/>
         <div>
         <xz.Button onClick={this.demo2Select.bind(this)}>selected</xz.Button>
         </div>
         <br/>
        <div>

          <xz.Segment selectedKey="1" className="ios-style-segment">
          <xz.Segment.Item key='1'>首页</xz.Segment.Item>
          <xz.Segment.Item key='2'>商城</xz.Segment.Item> 
          <xz.Segment.Item key='3'>应用</xz.Segment.Item>  
        </xz.Segment>
        </div>

        <xz.Segment renderIndicator={this.renderIndicatorTwo.bind(this)} selectedKey="1">
          <xz.Segment.Item key='1'>首页</xz.Segment.Item>
          <xz.Segment.Item key='2'>商城</xz.Segment.Item> 
          <xz.Segment.Item key='3'>应用</xz.Segment.Item>  
          <xz.Segment.Item key='6'>我的</xz.Segment.Item>
         </xz.Segment>
         <br/>


          <xz.Segment renderIndicator={this.renderIndicatorThree.bind(this)} selectedKey="1">
          <xz.Segment.Item key='1'><span>首页</span></xz.Segment.Item>
          <xz.Segment.Item key='2'><span>商城</span></xz.Segment.Item> 
          <xz.Segment.Item key='3'><span>应用</span></xz.Segment.Item>  
          <xz.Segment.Item key='6'><span>我de的</span></xz.Segment.Item>
         </xz.Segment>
         <br/>


    	</div>);
  }
}
export default PageView;
