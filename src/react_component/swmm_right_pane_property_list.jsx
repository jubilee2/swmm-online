import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import CONSTS from "./consts";

const getEntityProperties = entity => ({"Name": entity.name});

const getNodeProperties = node => {
  var properties = getEntityProperties(node);
  properties["X"] = node.position.x;
  properties["Y"] = node.position.y;
  properties["Invert El."] = node.invertElevation;

  return properties;
};

const getJunctionProperties = junction => {
  var properties = getNodeProperties(junction);
  properties["Max. Depth"] = junction.maxWaterDepth;
  properties["Init Depth"] = junction.initialWaterDepth;
  properties["Surcharge Depth"] = junction.surchargeWaterDepth;
  properties["Ponded Area"] = junction.pondedWaterArea;

  return properties;
};

const getProperties = (activeFeature, activeItem) => {
  switch(activeFeature) {
    case CONSTS.OUTFALL_FEATURE:
    case CONSTS.DIVIDER_FEATURE:
    case CONSTS.STORAGE_FEATURE:
      return getNodeProperties(activeItem);
    case CONSTS.JUNCTION_FEATURE:
      return getJunctionProperties(activeItem);
    default:
      return {};
  }
};

const getPropertiesHtml = (activeFeature, activeItem) => {
  const properties = getProperties(activeFeature, activeItem);
  let lists = [];
  for(const key in properties) {
    lists.push(<tr key={`property-item-${key}`}><th className="property-col">{key}</th><th className="value-col">{properties[key]}</th></tr>);
  }

  return (
    <tbody>
      {lists}
    </tbody>
  );
}

class SwmmRightPanePropertyList extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    const {activeItem, activeFeature} = this.props;
    return (
      <table className="table is-hoverable is-bordered" id="swmm-property-list">
        <thead>
          <tr><th className="property-col">Property</th><th className="value-col">Value</th></tr>
        </thead>
        {activeItem !== null && getPropertiesHtml(activeFeature, activeItem)}
      </table>
    );
  }
}

SwmmRightPanePropertyList.propTypes = {
  activeItem: PropTypes.object,
  activeFeature: PropTypes.string.isRequired,
}

const getActiveItem = state => {
  const project = state.project;
  const activeId = state.ui.activeId;
  const activeFeature = state.ui.activeFeature;
  if (activeFeature !== CONSTS.NONE_FEATURE &&activeId !== CONSTS.EMPTY_STRING) {
    switch(activeFeature) {
    case CONSTS.JUNCTION_FEATURE:
      return project.junctions.find(j => j.name === activeId);
    case CONSTS.OUTFALL_FEATURE:
      return project.outfalls.find(o => o.name === activeId);
    case CONSTS.DIVIDER_FEATURE:
      return project.dividers.find(d => d.name === activeId);
    case CONSTS.STORAGE_FEATURE:
      return project.storages.find(s => s.name === activeId);
    }
  }

  return null;
};

const mapStateToProps = state => ({
  activeFeature: (state && state.ui) ? state.ui.activeFeature : CONSTS.NONE_FEATURE,
  activeItem: getActiveItem(state),
});

const mapDispatchToProps = () => ({});

const ConnectedSwmmRightPanePropertyList = connect(mapStateToProps, mapDispatchToProps)(SwmmRightPanePropertyList);

export default ConnectedSwmmRightPanePropertyList;