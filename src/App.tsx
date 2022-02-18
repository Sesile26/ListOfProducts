import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import listOfProducts from './api/ListOfProducts';
import './App.scss';
import { ModalAceptDelate } from './components/modalAceptDelate/ModalAceptDelate';
import { ModalWindow } from './components/modalWindow/ModalWindow';
import { ProductsList } from './components/ProductsList/ProductsList';

export const App: React.FC = () => {
  const [list, setList] = useState<Product[]>(listOfProducts);
  const [filter, setFilter] = useState('');

  const [addComment, setAddComment] = useState('');

  const [formState, setFormState] = useState({
    name: '',
    imageUrl: '',
    count: '',
    width: '',
    height: '',
    weight: '',
    comments: [''],
  });

  const [editState, setEditState] = useState({
    type: '',
    id: 0,
    index: -1,
  });

  const [isVisible, setIsVisible] = useState({
    modal: false,
    delateButton: true,
    aceptDelate: false,
  });

  const changeVisible = (name: string, boolen: boolean) => {
    setIsVisible(prev => ({
      ...prev,
      [name]: boolen,
    }));
  };

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.currentTarget.value);
  };

  const handleClear = () => {
    setFormState({
      name: '',
      imageUrl: '',
      count: '',
      width: '',
      height: '',
      weight: '',
      comments: [],
    });
  };

  const getMaxId = () => {
    const ids = list.map(item => item.id);

    return Math.max(...ids);
  };

  const addProduct = () => {
    const itemForAdd = {
      id: getMaxId() + 1,
      imageUrl: formState.imageUrl,
      name: formState.name,
      count: Number(formState.count),
      size: {
        width: Number(formState.width),
        height: Number(formState.height),
      },
      weight: formState.weight,
      comments: [],
    };

    const AddToList = [...list, itemForAdd];

    setList(AddToList);
    handleClear();
    changeVisible('modal', false);
  };

  const isValidForm = () => {
    if (!formState.name
      || !formState.imageUrl
      || !formState.count
      || !formState.width
      || !formState.height
      || !formState.weight
    ) {
      return false;
    }

    return true;
  };

  const changeEditType = (type: string) => {
    if (type === 'Add') {
      changeVisible('delateButton', true);
    }

    setEditState(prev => ({
      ...prev,
      type,
    }));
  };

  const editProduct = () => {
    const itemForAdd = {
      id: editState.id,
      imageUrl: formState.imageUrl,
      name: formState.name,
      count: Number(formState.count),
      size: {
        width: Number(formState.width),
        height: Number(formState.height),
      },
      weight: formState.weight,
      comments: formState.comments,
    };

    const updateList = [...list].map(item => {
      if (item.id === editState.id) {
        return itemForAdd;
      }

      return item;
    });

    setList(updateList);
  };

  const delateProduct = () => {
    if (editState.type !== 'Edit') {
      return;
    }

    changeVisible('aceptDelate', true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // eslint-disable-next-line
    console.log('handlesubmit')
    if (isValidForm() && editState.type === 'Edit') {
      editProduct();
    }

    if (isValidForm() && editState.type === 'Add') {
      addProduct();
    }
  };

  const loadProductDetails = (product: Product, productIndex: number) => {
    setEditState(prev => ({
      ...prev,
      type: 'Edit',
      id: product.id,
      index: productIndex,
    }));
    changeVisible('delateButton', false);

    setFormState({
      name: product.name,
      imageUrl: product.imageUrl,
      count: String(product.count),
      width: String(product.size.width),
      height: String(product.size.height),
      weight: product.weight,
      comments: product.comments,
    });
  };

  const handlerForm = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    switch (event.target.id) {
      case 'name':
        return setFormState(prev => ({
          ...prev,
          name: event.target.value,
        }));
      case 'imageUrl':
        return setFormState(prev => ({
          ...prev,
          imageUrl: event.target.value,
        }));
      case 'count':
        return setFormState(prev => ({
          ...prev,
          count: event.target.value,
        }));
      case 'width':
        return setFormState(prev => ({
          ...prev,
          width: event.target.value,
        }));
      case 'height':
        return setFormState(prev => ({
          ...prev,
          height: event.target.value,
        }));
      case 'weight':
        return setFormState(prev => ({
          ...prev,
          weight: event.target.value,
        }));
      case 'addComment':
        return setAddComment(event.target.value);
      default:
        return null;
    }
  };

  const acceptDelate = () => {
    const delateItem = [...list].filter(item => {
      if (item.id === editState.id) {
        return null;
      }

      return item;
    });

    setIsVisible(prev => ({
      ...prev,
      modal: false,
      aceptDelate: false,
    }));
    setList(delateItem);
    handleClear();
  };

  const addDelateComment = (type: string, delateIndex: number) => {
    if (type === 'delate') {
      const updateComment = [...list].map(product => {
        product.comments.map((item, index) => {
          if (index === delateIndex) {
            product.comments.splice(index, 1);
          }

          return item;
        });

        return product;
      });

      setList(updateComment);
    } else {
      const copyList = [...list];

      copyList[editState.index].comments.push(addComment);

      setAddComment('');
      setList(copyList);
    }
  };

  useEffect(() => {
    switch (filter) {
      case 'name':
        return setList(list.sort((a, b) => a.name.localeCompare(b.name)));
      case 'count':
        return setList(list.sort((a, b) => a.count - b.count));

      default:
        return setList(list
          .sort((a, b) => a.name.localeCompare(b.name))
          .sort((a, b) => a.count - b.count));
    }
  }, [filter]);

  return (
    <div className="app">
      <div className="select">
        <select
          value={filter}
          onChange={handleFilter}
        >
          <option value="name">Name</option>
          <option value="count">Count</option>
        </select>
      </div>
      <ProductsList
        list={list}
        loadProductDetails={loadProductDetails}
        changeVisible={changeVisible}
      />

      <button
        type="button"
        className={classNames('js-modal-trigger', 'button', 'is-primary')}
        data-target="modal-js-example"
        onClick={() => {
          changeEditType('Add');
          changeVisible('modal', true);
        }}
      >
        Add product
      </button>

      <ModalWindow
        isVisible={isVisible}
        handleSubmit={handleSubmit}
        formState={formState}
        handlerForm={handlerForm}
        changeVisible={changeVisible}
        delateProduct={delateProduct}
        addDelateComment={addDelateComment}
        addComment={addComment}
      />

      <ModalAceptDelate
        isVisible={isVisible}
        changeVisible={changeVisible}
        acceptDelate={acceptDelate}
      />
    </div>
  );
};
