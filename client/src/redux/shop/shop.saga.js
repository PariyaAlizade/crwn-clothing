import { takeLatest,call,put,all } from 'redux-saga/effects';
import { convertCollectionsSnapshotToMap, firestore } from '../../assets/firebase/firebase.utils';
import { fetchCollectionFailure, fetchCollectionSuccess } from './shop.action';

import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync(){
    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionMap = yield call(convertCollectionsSnapshotToMap,snapshot);
        yield put(fetchCollectionSuccess(collectionMap))
    } catch (error) {
        yield put(fetchCollectionFailure(error.message))
    }
    
}

export function* fetchCollectionsStart(){
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}

export function* shopSaga(){
    yield all([call(fetchCollectionsStart)]);
}
