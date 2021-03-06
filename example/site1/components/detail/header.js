import React from "react"
import {observer} from 'mobx-react'
import {xz,style,shallowEqual,Navigation} from "../../../../index"

@observer
class Header extends React.Component {

  constructor(props) {
    super(props)
  }

  
  renderIndicatorThree(params){
    var rect = params.rect;
    var indicatorStyle = {
      position:"absolute",
      bottom:"0",
      left:params.itemInstance.Dom.children[0].offsetLeft,
      width:params.itemInstance.Dom.children[0].offsetWidth+"px",
      height:style.px2rem(5)+"rem",
    };
    var arr = ["segment-indi-nomal"];
    if(params.curIndex!=params.preIndex){
      arr.push("segment-indi-nomal-ani");
    }
    return <div className={arr.join(" ")} style={indicatorStyle}></div>
  }

 


 
  onChange(params){
    this.props.store.segmentSelectedIndex  = params.selectedIndex;
  }


  render() {
    var SegmentclassNameArr = ["detail-segment"];
    var detailTitleClassNameArr = ["detail-de-title"];
    if(this.props.store.verticalSwiperSelectedIndex===0){
      detailTitleClassNameArr.push("displaynone");
    }else{
       SegmentclassNameArr.push("displaynone");
    }
    return (
      <div className='detail-header'>
      <span className={detailTitleClassNameArr.join(" ")}>商品详情</span>
    	 <xz.Segment
       onChange={this.onChange.bind(this)}
        className={SegmentclassNameArr.join(" ")}
       renderIndicator={this.renderIndicatorThree.bind(this)} 
        selectedIndex={this.props.store.segmentSelectedIndex}>
          <xz.Segment.Item key='1'><span>商品</span></xz.Segment.Item>
          <xz.Segment.Item key='2'><span>详情</span></xz.Segment.Item> 
          <xz.Segment.Item key='3'><span>评价</span></xz.Segment.Item>  
         </xz.Segment></div>);
  }
}
export default Header;
