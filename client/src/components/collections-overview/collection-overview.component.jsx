import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import  CollectionPerview  from "../collection-preview/collection-preview.component";
import { selectCollectionForPreview } from "../../redux/shop/shop.selector";
import './collection-overview.styles.scss';

const CollectionOverView = ({collections}) => (
    <div className='collection-overview'>
         {
                    collections.map(({id , ...otherCollectionProps}) => (
                        <CollectionPerview key={id} {...otherCollectionProps} />

                    ))
                }
    </div>
)

const mapStateToProps = createStructuredSelector({
    collections : selectCollectionForPreview
})

export default connect(mapStateToProps)(CollectionOverView)