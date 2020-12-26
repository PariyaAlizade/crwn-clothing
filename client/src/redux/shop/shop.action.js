import ShopActionTypes from './shop.types';
import { firestore,convertCollectionsSnapshotToMap } from "../../assets/firebase/firebase.utils";

export const fetchCollectionStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionSuccess = collectionMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionMap
});

export const fetchCollectionFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
});

export const fetchCollectionStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionStart());

        collectionRef.get().then(snapshot => {
            const collectionMaps = convertCollectionsSnapshotToMap(snapshot);
            dispatch(fetchCollectionSuccess(collectionMaps));
        }).catch(error => dispatch(fetchCollectionFailure(error.message)))
    }
};