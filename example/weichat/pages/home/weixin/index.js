import React from "react"
import "./index.less"
import {observer} from 'mobx-react'
import Popover from './components/popover'
import {xz,Navigation} from "../../../../../index"

@observer
class PageView extends React.Component {

  constructor(props) {
    super(props)
  }

  showPopover(e){
  	this.props.store.headerPopoverConfig={target:e.target,direction:"bottom"};
  }

  render() {
    return (<div>
    	<Popover store={this.props.store}/>
    	<div className='weichat-header'><span className='weichat-title'>微信(30)</span>
    	<span className='weichat-wx-more' onClick={this.showPopover.bind(this)}>更多</span>
    	</div>
      </div>);
  }
}
export default PageView;
