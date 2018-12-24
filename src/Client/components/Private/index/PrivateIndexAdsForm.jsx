import React, { Fragment,useEffect } from 'react'
import { Link } from 'react-router-dom'
import adsIndexStyles from '../../../Styles/AdsIndex.scss'
const listMostPopular = [
    {
        content: "Let's say the parent container was 60% wide and centered. That means there is 20% width on either side of it. But margin is calculated based on the parent element, so to pull it to the left 20% of the browser window, you'd need 1/3 of the width of the parent",
        profileName: "Ninh An",
        count: {
            likes: 100,
            comments: 146,
            views: 200
        }
    },
    {
        content: "Under most other circumstances, we just don't have enough information to know exactly how far to pull out the full width container with negative margins.",
        profileName: "Quynh Meomeo",
        count: {
            likes: 96,
            comments: 135,
            views: 187
        }
    },
    {
        content: "A fixed width like that feels a little red-flaggy (i.e. what happens on narrower screens?), all this would likely be wrapped in a media query that makes it only apply on larger screens",
        profileName: "Hoang Linh",
        count: {
            likes: 83,
            comments: 113,
            views: 176
        }
    }
]
export const PrivateIndexAdsForm = React.memo((props) => {
    return <Fragment>
        <div className={adsIndexStyles.mainDiv} id="ads-div">
            <div className={adsIndexStyles.divAds}>
                <label>Advance Banner</label>
            </div>
        </div>
    </Fragment>


})