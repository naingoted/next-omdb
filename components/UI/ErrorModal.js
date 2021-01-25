import React from 'react';

const ErrorModal = React.memo(props => {
    return (
      <React.Fragment>
        <div className="backdrop" onClick={props.onClose} />
        <div className="error-modal">
          <p>{props.children}</p>
          <div className="error-modal__actions">
            <button type="button" className="btn" onClick={props.onClose}>
              Okay
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  });
  
export default ErrorModal;