import React from "react";
import { connect } from "react-redux";
import ConnectedSwmmRightPanePropertyList from "./swmm_right_pane_property_list.jsx";

class SwmmRightPane extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div className="right-pane">
      <div id="pane-header">
      </div>
      <div id="right-pane-body">
        <ConnectedSwmmRightPanePropertyList/>
      </div>
    </div>
    );
  }
}

const mapStateToProps = () => ({ });

const mapDispatchToProps = () => ({ });

const ConnectedSwmmRightPane = connect(mapStateToProps, mapDispatchToProps)(SwmmRightPane);

export default ConnectedSwmmRightPane;