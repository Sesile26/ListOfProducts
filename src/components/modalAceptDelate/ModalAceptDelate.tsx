import classNames from 'classnames';
import React from 'react';

type Props = {
  isVisible: {
    aceptDelate: boolean,
  },
  changeVisible: (name: string, boolen: boolean) => void,
  acceptDelate: () => void,
};

export const ModalAceptDelate: React.FC<Props> = React.memo(
  ({ isVisible, changeVisible, acceptDelate }) => {
    return (
      <div className={classNames('modal', { 'is-active': isVisible.aceptDelate })}>
        <div className="modal-background"></div>

        <div className="modal-content">
          <div className="box">
            <p>Are you sure?</p>
            <div className="field is-grouped">
              <div className="control">
                <button type="button" className="button is-danger" onClick={() => acceptDelate()}>Yes</button>
              </div>
              <div className="control">
                <button type="button" className="button" onClick={() => changeVisible('aceptDelate', false)}>No</button>
              </div>
            </div>

            <button type="button" className="modal-close is-large" onClick={() => changeVisible('aceptDelate', false)}> </button>
          </div>
        </div>
      </div>
    );
  },
);
