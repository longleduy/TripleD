import React, { Fragment, PureComponent } from 'react'
import materialUIStyles from '../../Styles/MaterialUICustomize.scss'
import CircularProgress from '@material-ui/core/CircularProgress'
export const ProgressBarButton = props => {
    const { loading, text } = props;
    if (loading) {
        return <CircularProgress className={materialUIStyles.myCircularProgress} thickness={5} size={20} />
    }
    else {
        return text;
    }
}
