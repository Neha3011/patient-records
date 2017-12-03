import React from 'react';
import ReactModal from 'react-modal';
import classNames from 'classnames';

class Popup extends React.Component {
  componentWillMount() {
    ReactModal.setAppElement('body');
  }

  render() {
    return (
      <ReactModal
        contentLabel={this.props.contentLabel}
        className={classNames('noPadding', this.props.popupType)}
        isOpen={true}
        style={{
          'content': {
            'borderRadius': 3,
            'outlineStyle': 'none'
          },
          'overlay': {
            'backgroundColor': 'rgba(24, 39, 56, 0.85)',
            'zIndex': 4,
            'display': 'flex',
            'alignItems': 'center',
            'justifyContent': 'center'
          }
        }}
        closeTimeoutMS={150}
      >
        <div
          className={classNames(
            'popup',
            `popup--${this.props.popupType}`
          )}
        >
          {this.props.children}
        </div>
      </ReactModal>
    );
  }
}

export default Popup;
