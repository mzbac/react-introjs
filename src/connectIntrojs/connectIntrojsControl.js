import React from 'react';
import PropTypes from 'prop-types';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'IntrojsControlComponent';
}

export default WrappedComponent => {
  const connectedIntrojsControl = (props, context) =>
    <WrappedComponent
      {...props}
      introjsStart={context.startRenderIntrojsSteps}
      introjsIsConfigured={context.introjsIsConfigured}
    />;

  connectedIntrojsControl.displayName = `WithConnectedIntrojsControl(${getDisplayName(WrappedComponent)})`;
  connectedIntrojsControl.contextTypes = {
    startRenderIntrojsSteps: PropTypes.func,
    introjsIsConfigured: PropTypes.func,
  };
  return connectedIntrojsControl;
};
