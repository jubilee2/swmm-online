import React from "react";
import PropTypes from 'prop-types';
import SwmmModal from "./utility/swmm_modal.jsx";

const keyNames = {
  shape: "Shape",
  numberOfBarrels: "Number of Barrels",
  maximumHeight: "Maximum Height",
  topWidth: "Top Width",
  bottomWidth: "Bottom Width",
  leftSlope: "Left Slope",
  rightSlope: "Right Slope",
  sidewallsRemoved: "Sidewalls Removed",
  power: "Power",
};

const shapeMap = {
  CIRCULAR: "circular",
  TRIANGULAR: "triangular",
  PARABOLIC: "parabolic",
  EGG: "egg",
  HORSESHOE: "horse_shoe",
  SEMIELLIPTICAL: "semi_elliptical",
  BASKETHANDLE: "basket_handle",
  SEMICIRCULAR: "semi_circular",
  GOTHIC: "gothic",
  CATENARY: "catenary",
  TRAPEZOIDAL: "trapezoidal",
  RECT_OPEN: "rectangular",
  POWER: "power",
};

const SwmmConduitSectionModal = (props) => {
  const {section} = props;
  const imageURL = `/images/section/${shapeMap[section.shape]}.bmp`;

  const toHtml = properties => {
    return Object.keys(properties).map(key =>
      <tr key={key}>
        <th className="property-col">{keyNames[key]}</th>
        <th className="value-col">{properties[key]}</th>
      </tr>
    );
  }

  return (
    <SwmmModal {...props} width={400}>
    <div className="columns">
      <div className="column is-one-quarter"><img src={imageURL}/></div>
      <div className="column">
        <table className="table is-hoverable is-bordered" id="swmm-property-list">
          <tbody>{toHtml(section)}</tbody>
        </table>
      </div>
    </div>
    </SwmmModal>
  );
}

SwmmConduitSectionModal.propTypes = {
  section: PropTypes.object.isRequired,
}

export default SwmmConduitSectionModal;