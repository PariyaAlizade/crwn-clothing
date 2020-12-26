import React,{useEffect} from 'react';
import { Route } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import { fetchCollectionStart } from '../../redux/shop/shop.action';


import CollectionPageContainer from "../collection/collection.container";
import CollectionoverviewContainer from '../../components/collections-overview/collection-overview.container';

const ShopPage = ({ fetchCollectionStart, match }) => {
   useEffect(() => {
      fetchCollectionStart();
   });

   return (
      <div className='shop-page' >
         <Route exact path={`${match.path}`} component={CollectionoverviewContainer} />
         <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
      </div>
   )
}


const mapDispatchToProps = dispatch => ({
   fetchCollectionStart: () => dispatch(fetchCollectionStart())

});

export default connect(null, mapDispatchToProps)(ShopPage);