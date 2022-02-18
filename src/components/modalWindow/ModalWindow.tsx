import classNames from 'classnames';
import React from 'react';
import './ModalWindow.scss';

type Props = {
  isVisible: {
    modal: boolean,
    delateButton: boolean,
  },
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
  formState: {
    name: string,
    imageUrl: string,
    count: string,
    width: string,
    height: string,
    weight: string,
    comments: string[],
  },
  handlerForm: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  changeVisible: (name: string, boolen: boolean) => void,
  delateProduct: () => void,
  addDelateComment: (type: string, index: number) => void,
  addComment: string,
};

export const ModalWindow: React.FC<Props> = React.memo(
  ({
    isVisible,
    handleSubmit,
    formState,
    handlerForm,
    changeVisible,
    delateProduct,
    addDelateComment,
    addComment,
  }) => {
    return (
      <div className={classNames('modal', { 'is-active': isVisible.modal })}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="box">
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label className="label" htmlFor="name">
                  Name
                  <div className="control">
                    <input id="name" className="input" type="text" placeholder="Text input" value={formState.name} onChange={handlerForm}></input>
                  </div>
                </label>
              </div>

              <div className="field">
                <label className="label" htmlFor="imageUrl">
                  imageUrl
                  <div className="control">
                    <input id="imageUrl" className="input" type="text" placeholder="Text input" value={formState.imageUrl} onChange={handlerForm}></input>
                  </div>
                </label>
              </div>

              <div className="field">
                <label className="label" htmlFor="count">
                  count
                  <div className="control">
                    <input id="count" className="input" type="number" placeholder="Text input" value={formState.count} onChange={handlerForm}></input>
                  </div>
                </label>
              </div>

              <div className="field">
                <label className="label" htmlFor="width">
                  width
                  <div className="control">
                    <input id="width" className="input" type="number" placeholder="Text input" value={formState.width} onChange={handlerForm}></input>
                  </div>
                </label>
              </div>

              <div className="field">
                <label className="label" htmlFor="height">
                  height
                  <div className="control">
                    <input id="height" className="input" type="number" placeholder="Text input" value={formState.height} onChange={handlerForm}></input>
                  </div>
                </label>
              </div>

              <div className="field">
                <label className="label" htmlFor="weight">
                  weight
                  <div className="control">
                    <input id="weight" className="input" type="text" placeholder="Text input" value={formState.weight} onChange={handlerForm}></input>
                  </div>
                </label>
              </div>

              <div className="comments">
                <h2>Comments</h2>
                {formState.comments.map((comment, index) => (
                  <>
                    <div className="box comments__item" key={comment}>
                      {comment}
                      <button
                        type="button"
                        className="button is-danger"
                        onClick={() => addDelateComment('delate', index)}
                      >
                        Delate
                      </button>
                    </div>
                  </>
                ))}
                <input id="addComment" className="textarea" placeholder="Add new comment" value={addComment} onChange={handlerForm}></input>
                <button
                  type="button"
                  className="button"
                  onClick={() => addDelateComment('add', -1)}
                >
                  Add new Comment
                </button>
              </div>

              <div className="field is-grouped">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Save
                  </button>
                </div>
                <div className="control">
                  <button
                    type="button"
                    className="button"
                    onClick={() => changeVisible('modal', false)}
                  >
                    Cancel
                  </button>
                </div>
                <div className="control">
                  <button
                    type="button"
                    className={classNames(
                      'button', 'is-danger', { visibleNone: isVisible.delateButton },
                    )}
                    onClick={delateProduct}
                  >
                    Delate
                  </button>
                </div>
                <button
                  type="button"
                  className="modal-close is-large"
                  onClick={() => changeVisible('modal', false)}
                >
                  X
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  },
);
