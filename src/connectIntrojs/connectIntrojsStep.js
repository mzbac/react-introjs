import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default (WrappedComponent, selector) => {
  class connectedIntrojsStep extends Component {
    componentDidMount() {
      const steps = this.context.getIntrojsSteps();
      steps.push(selector);
      this.context.setIntrojsSteps(steps);
      const node = findDOMNode(this);
      if (node) node.setAttribute('introjs-step-id', selector);
    }

    componentWillUnmount() {
      const steps = this.context.getIntrojsSteps();
      this.context.setIntrojsSteps(steps.filter(item => item !== selector));
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  connectedIntrojsStep.displayName = `WithConnectedIntrojsStep(${getDisplayName(WrappedComponent)})`;
  connectedIntrojsStep.contextTypes = {
    setIntrojsSteps: PropTypes.func.isRequired,
    getIntrojsSteps: PropTypes.func.isRequired,
  };
  return connectedIntrojsStep;
};
