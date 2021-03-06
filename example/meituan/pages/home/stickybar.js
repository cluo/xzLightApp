import React from "react"
import {observer} from 'mobx-react'
import {xz,style,shallowEqual,Navigation} from "../../../../index"

@observer
class SearchBar extends React.Component {

  constructor(props) {
    super(props)
    this.selectedDropDownKey = "";
  }

  renderZongHeItems(){
    var data = [{id:0,name:"综合排序"},{id:0,name:"速度最快"}
    ,{id:0,name:"评分最高"}
    ,{id:0,name:"起送价最低"}
    ,{id:0,name:"配送费最低"}
    ,{id:0,name:"人均高到低"}
    ,{id:0,name:"人均低到高"}];
    var items = [];
    for(var i=0,j=data.length;i<j;i++){
      var itemdata = data[i];
      items.push(<li key={itemdata.name}>{itemdata.name}</li>);
    }
    return <ul className='meituan-home-dd'>{items}</ul>
  }

  renderFilterItems(){
    return <div style={{height:"11rem",backgroundColor:"#fff"}}>fitler</div>
  }
  renderItem(selectedKey){
    if(selectedKey==="zonghe"){
      return this.renderZongHeItems();
    }else if(selectedKey==="filter"){
      return this.renderFilterItems();
    }
  }

  showDropDown(key,e){
    var scrollTop = this.root.wrap.offsetTop;
    if(this.props.pageview.mainScroll.props.disableCheckSticky===true){
      scrollTop -= style.rem2px(1.14);
    }
    this.props.pageview.mainScroll.scrollarea.scrollTop = scrollTop;

    setTimeout(()=>{
       if(this.props.store.dropdownSelectedKey===key){
        this.props.store.dropdownSelectedKey = "";
      }else{
         this.props.store.dropdownSelectedKey = key;
      }
    },220)

  }
  repairTop(){
    //因为结合了 StickyView所以 Top不准 需要修复
    //或者直接视具体情况写死变量  
    if(!this.StickyViewBottom){
      this.StickyViewBottom = this.props.pageview.mainScroll.stickyWrapper.rootDom.getBoundingClientRect().bottom;
      if(this.props.pageview.mainScroll.props.disableCheckSticky===true){
        this.StickyViewBottom+=style.rem2px(1.06);
      }
    }
    
    return this.StickyViewBottom;
  }

  onShow(){
    this.props.pageview.mainScroll.disableScroll(true);
  }

  onHide(){
    this.props.pageview.mainScroll.disableScroll(false);
  }


  render() {
   
    return (
        <xz.StickyView 
        ref={(root)=>{this.root = root;}}
        scrollKey={this.props.scrollKey}
        pageview={this.props.pageview}>
        <xz.DropDownGroup 
        className='meituan-home-ddg'
        onShow={this.onShow.bind(this)}
        onHide={this.onHide.bind(this)}
        repairTop = {this.repairTop.bind(this)}
        renderItem = {this.renderItem.bind(this)}
        selectedKey={this.props.store.dropdownSelectedKey}>
          <div onClick={this.showDropDown.bind(this,'zonghe')} className='meituan-sticky-item'>综合排序</div>
          <div className='meituan-sticky-item'>销量最高</div>
          <div className='meituan-sticky-item'>距离最近</div>
          <div onClick={this.showDropDown.bind(this,'filter')}className='meituan-sticky-item'>筛选</div>
        </xz.DropDownGroup></xz.StickyView>
    );
  }
}
export default SearchBar;
