import { createStore, bindActionCreators } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import reducer from './reducer';
import * as actions from './actions';

const store = createStore(reducer);

const { dispatch } = store;

const { setState,
        setEditor
      } = bindActionCreators(actions, dispatch);

const getBaseAdress = (Arg = '') => {
    return 'crm-api.php';
}

const setStoreField = (Field, Value) => {
    let State = store.getState();

    State[Field] = Value;

    invokeEvent('onChangeStoreField', {Field: Field});

    setState(State);
}

const setEditorField = (Field ,Value) => {
    let Editor = store.getState().editor;

    if (typeof Value == 'undefined') {
        Value = '';
    }

    Editor[Field] = Value;

    store.dispatch(setEditor(Editor));
}

const onChangeStoreField = (Field) => {
    switch (Field) {
        case 'limit':
            break;

        default:
            console.log(store.getState()[Field]);
            break;
    }
}

const invokeEvent = (Event, Params) => {
    switch (Event) {
        case 'onChangeStoreField':
            onChangeStoreField(Params.Field);
            break;
    }
}

const makeRequestUrl = (base, params) => {
    let ParamArray = [];

    for (let key in params) {
        ParamArray.push(key + '=' + params[key]);
    }

    return base + '?' + ParamArray.join('&');
}

const reloadTableDataSet = () => {
    const state = store.getState();

    const Params = {
        method: "",
        limit: state.limit,
        offset: state.offset
    };

    axios
        .post(makeRequestUrl(getBaseAdress(), Params))
        .then((Response) => {
            setStoreField('TableDataSet', Response.data.data.result);
        });

}

const resetOffset = () => {
    setStoreField('offset', 0);
}

const wndRefresh = () => {

};

const clearEditor = () => {
    setStoreField(
        'editor',
        {
            id: 0
        }
    );
}

const setActiveRecordId = (Id) => {

    let EditorInstance = {
        id: 0
    };

    const TableDataSet = store.getState().TableDataSet;

    for (let i = 0; i < TableDataSet.length; i++) {
        if (TableDataSet[i].id == Id) {
            EditorInstance = {
                id: parseInt(TableDataSet[i].id)
            };
        }
    }

    setEditor(EditorInstance);
}

const init = () => {
    reloadTableDataSet();

    wndRefresh();
};

store.subscribe(() => {
    wndRefresh();
});

init();