import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

export default class Image extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    height: PropTypes.string,
    width: PropTypes.string
  }

  constructor() {
    super();
    this.state = {
      loaded: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.src !== this.props.src) {
      this.setState({
        loaded: false
      });
    }
  }

  render() {
    const style = require('./Image.scss');
    const { src, height, width } = this.props; // eslint-disable-line no-shadow
    const classname = classnames('image', this.state.loaded ? style.imageLoaded : null);

    return (
      <img
        className={classname}
        onLoad={ () => this.setState({ loaded: true })}
        height={height}
        width={width}
        src={src} />
    );
  }
}
