import { takeLatest } from "redux-saga/effects";


function* helloSaga() {
    console.log("Hello Saga");
}

export function* watchEditorGlobalSaga() {
    yield takeLatest("EDITOR_GLOBAL_SAGA", helloSaga);
}