import React, { Fragment, Component } from 'react'
import appStyles from '../../Styles/App.scss'
import otherStyles from '../../Styles/Other.scss'

class PrivateIndexForm extends Component {
    render() {
        return <Fragment>
            <div className={`${appStyles.mainContent}`}>
                <div className={`${otherStyles.errorForm}`}>
                    <label>Index</label>
                </div>
            </div>
        </Fragment>
    }
}
export default PrivateIndexForm;
