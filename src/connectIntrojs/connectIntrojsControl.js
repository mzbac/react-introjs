import React from 'react';
import PropTypes from 'prop-types';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default WrappedComponent => {
  const connectedIntrojsControl = (props, context) =>
    <WrappedComponent {...props} introjsStart={context.startRenderIntrojsSteps} />;

  connectedIntrojsControl.displayName = `WithConnectedIntrojsControl(${getDisplayName(WrappedComponent)})`;
  connectedIntrojsControl.contextTypes = {
    startRenderIntrojsSteps: PropTypes.func,
  };
  return connectedIntrojsControl;
};
