import React, { Fragment, PureComponent, Component } from 'react'
import {Header} from './contaniners/Header.jsx'
import {Container} from './contaniners/Container.jsx'
import styles from './Styles/App.scss'

class App extends Component {
    render() {
        return <Fragment>
            <div className={styles.app}>
                <Header />
                <Container />
            </div>
        </Fragment>
    }
}
export default App;
