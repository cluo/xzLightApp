import React from "react"
import {observer} from 'mobx-react'
import {xz,Navigation,style} from "../../../../../index"
import TabScroll from './tabscroll'

@observer
class StatusView extends React.Component {


  constructor(props) {
    super(props)

    this.limit = style.rem2px(2.5);
  }

  renderItem(params){
    var child = [];
    for(var i=0;i<80;i++){
      child.push(<div key={i}>{i}</div>);
    }
    return <TabScroll 
    scrollKey={params.key} 
    store={this.props.store}
    pageview={this.props.pageview} 
    className='qq-fir-scrollview'>{params.key}<div style={{height:"25rem"}}>{child}</div></TabScroll>
  }

  render() {
    return (
        <xz.StatusView className='qq-fri-status' 
        renderItem={this.renderItem.bind(this)} 
        config={this.props.store.tabSelctedConfig}/>
      );
  }
}
export default StatusView;