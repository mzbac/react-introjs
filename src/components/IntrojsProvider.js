import { Component, Children } from 'react';
import { introJs } from 'intro.js';
import PropTypes from 'prop-types';
import { optionsPropTypes } from '../proptypes/PropTypes';

class IntrojsProvider extends Component {
  static defaultProps = {
    onStart: null,
    onBeforeChange: null,
    onAfterChange: null,
    onChange: null,
    onComplete: null,
    options: {},
  };

  constructor(props, context) {
    super(props, context);
    this.steps = [];
    this.stepsData = [];
    this.hints = [];
    this.isVisible = false;
    this.isConfigured = false;
    this.installIntroJs();
  }

  getChildContext() {
    return {
      setIntrojsSteps: this.setIntrojsSteps.bind(this),
      getIntrojsSteps: this.getIntrojsSteps.bind(this),
      setIntrojsHints: this.setIntrojsHints.bind(this),
      getIntrojsHints: this.getIntrojsHints.bind(this),
      startRenderIntrojsSteps: this.startRenderSteps.bind(this),
      introjsIsConfigured: this.introjsIsConfigured.bind(this),
    };
  }

  componentDidMount() {
    this.configureIntroJs();
  }

  componentWillUnmount() {
    this.introJs.exit();
  }

  onExit = () => {
    const { onExit } = this.props;

    this.isVisible = false;

    onExit(this.introJs._currentStep);
  };

  onBeforeChange = element => {
    if (!this.isVisible) {
      return;
    }

    const { onBeforeChange } = this.props;

    if (onBeforeChange) {
      onBeforeChange(this.introJs._currentStep, element);
    }
  };

  onAfterChange = element => {
    if (!this.isVisible) {
      return;
    }

    const { onAfterChange } = this.props;

    if (onAfterChange) {
      onAfterChange(this.introJs._currentStep, element);
    }
  };

  onChange = element => {
    if (!this.isVisible) {
      return;
    }

    const { onChange } = this.props;

    if (onChange) {
      onChange(this.introJs._currentStep, element);
    }
  };

  onComplete = () => {
    const { onComplete } = this.props;

    if (onComplete) {
      onComplete();
    }
  };

  setIntrojsSteps = steps => {
    this.steps = steps;
    // if (!this.isVisible) {
    //   return;
    // }
    // const currentStep = this.introJs._currentStep;
    // this.introJs.exit();
    // this.introJs.start();
    // this.introJs.goToStep(currentStep + 1);
  };
  getIntrojsSteps = () => this.steps;
  setIntrojsHints = hints => {
    this.hints = hints;
  };
  getIntrojsHints = () => this.hints;
  introjsIsConfigured = () => this.isConfigured;

  installIntroJs() {
    this.introJs = introJs();
    this.introJs.onexit(this.onExit);
    this.introJs.onbeforechange(this.onBeforeChange);
    this.introJs.onafterchange(this.onAfterChange);
    this.introJs.onchange(this.onChange);
    this.introJs.oncomplete(this.onComplete);
  }

  configureIntroJs() {
    const { options, onConfigureIntroJs } = this.props;
    onConfigureIntroJs().then(steps => {
      this.introJs.setOptions({ ...options, steps });
      this.stepsData = steps;
      this.isConfigured = true;
    });
  }

  startRenderSteps(initialStep = 0) {
    const { onStart } = this.props;

    if (this.stepsData.length > 0 && !this.isVisible) {
      this.introJs.start();

      this.isVisible = true;

      this.introJs.goToStepNumber(initialStep + 1);

      if (onStart) {
        onStart(this.introJs._currentStep);
      }
    }
  }

  render() {
    return Children.only(this.props.children);
  }
}

IntrojsProvider.propTypes = {
  children: PropTypes.element.isRequired,
  onExit: PropTypes.func.isRequired,
  onConfigureIntroJs: PropTypes.func.isRequired,
  onStart: PropTypes.func,
  onBeforeChange: PropTypes.func,
  onAfterChange: PropTypes.func,
  onChange: PropTypes.func,
  onComplete: PropTypes.func,
  options: optionsPropTypes,
};

IntrojsProvider.childContextTypes = {
  setIntrojsSteps: PropTypes.func.isRequired,
  getIntrojsSteps: PropTypes.func.isRequired,
  setIntrojsHints: PropTypes.func.isRequired,
  getIntrojsHints: PropTypes.func.isRequired,
  startRenderIntrojsSteps: PropTypes.func.isRequired,
  introjsIsConfigured: PropTypes.func.isRequired,
};
export default IntrojsProvider;
