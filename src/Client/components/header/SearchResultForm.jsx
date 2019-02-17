import React, { PureComponent, Fragment } from 'react'
import styles from '../../Styles/Header/SearchForm.scss'
import {UPDATE_CHAT_BOX_MUTATION} from '../../graphql/mutations/user_mutation'
import MutationPropRender from '../../components/hocOrProprender/MutationPropRender.jsx'
class SearchResultForm extends PureComponent {
    openChatBox = async (action,to) => {
        let result = await action({
            variables: { isOpen: true, to}
        });
    }
    fillColorResult = (text,k) => {
        if(text != null && text !=''){
            let l = k.length;
            let textLower = text.toLowerCase();
            let keyWord = k.toLowerCase();
            let idx = textLower.indexOf(k);
            if(idx >0){
                let text1 = text.substring(0,idx).replace(/ /g,'\u00a0');
                let text2 = text.substring(idx,idx+l);
                let text3 = text.substring(idx+l).replace(/ /g,'\u00a0');
                return <Fragment>
                    <label>{text1}</label>
                    <label className={styles.fillColor}>{text2}</label>
                    <label>{text3}</label>
                </Fragment>
            }
            if(idx==0){
                let text2 = text.substring(0,l);
                let text3 = text.substring(l).replace(/ /g,'\u00a0');
                return <Fragment>
                    <label className={styles.fillColor}>{text2}</label>
                    <label >{text3}</label>
                </Fragment>
            } return <label>{text}</label>
        }
    }
    render() {
        const { loading, searchResult,keyWord } = this.props;
        return <Fragment>
            <div className={styles.resultDiv}>
                {loading ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={styles.loadingResult} width="32" height="32" fill="red">
                    <circle cx="16" cy="3" r="0">
                        <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
                    </circle>
                    <circle transform="rotate(45 16 16)" cx="16" cy="3" r="0">
                        <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.125s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
                    </circle>
                    <circle transform="rotate(90 16 16)" cx="16" cy="3" r="0">
                        <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.25s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
                    </circle>
                    <circle transform="rotate(135 16 16)" cx="16" cy="3" r="0">
                        <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.375s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
                    </circle>
                    <circle transform="rotate(180 16 16)" cx="16" cy="3" r="0">
                        <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
                    </circle>
                    <circle transform="rotate(225 16 16)" cx="16" cy="3" r="0">
                        <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.625s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
                    </circle>
                    <circle transform="rotate(270 16 16)" cx="16" cy="3" r="0">
                        <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.75s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
                    </circle>
                    <circle transform="rotate(315 16 16)" cx="16" cy="3" r="0">
                        <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.875s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
                    </circle>
                    <circle transform="rotate(180 16 16)" cx="16" cy="3" r="0">
                        <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
                    </circle>
                </svg> :
                    <div className={styles.resultMainDiv} id="test">
                        {searchResult.filterAllByKeyWord.userSearchResult.length == 0
                            && searchResult.filterAllByKeyWord.postSearchResult.length == 0
                            && <label className={styles.notFoundLabel}>Sory. No result found</label>}
                        <div className={styles.userSearchResultDiv}>
                            <MutationPropRender mutation={UPDATE_CHAT_BOX_MUTATION}
                                mutationPropRender={(action) => (
                                    <Fragment>
                                        {searchResult.filterAllByKeyWord.userSearchResult.map((user, key1) => {
                                            return <span className={styles.userInfo} key={key1} onClick={() => {this.props.closeResultDiv();
                                            this.openChatBox(action,user)}}>
                                                {user.avatar ? <img src={`${user.avatar}`} className={styles.avatar} /> :
                                                    <label className={styles.avatarLabel}>{user.profileName.charAt(0)}</label>}
                                                {this.fillColorResult(user.profileName,keyWord)}
                                            </span>

                                        })}
                                    </Fragment>
                                )} />
                        </div>
                        <div className={styles.postSearchResultDiv}>
                            {searchResult.filterAllByKeyWord.postSearchResult.map((post, key2) => {
                                return <Fragment key={key2}>
                                    <div className={styles.postContent}>
                                        <label className={styles.contentPost}>{post.content}</label>
                                       
                                        <span className={styles.postIndo}>
                                            <label className={styles.dateTime}>
                                                <svg viewBox="0 0 24 24">
                                                    <path fill="#000000" d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22A9,9 0 0,0 21,13A9,9 0 0,0 12,4M12.5,8H11V14L15.75,16.85L16.5,15.62L12.5,13.25V8M7.88,3.39L6.6,1.86L2,5.71L3.29,7.24L7.88,3.39M22,5.72L17.4,1.86L16.11,3.39L20.71,7.25L22,5.72Z" />
                                                </svg>
                                                Mon Jan 21 2019</label>
                                            <label className={styles.labelName}>
                                                <img src={`${post.userInfo2.avatar}`} className={styles.avatar} />
                                                {post.userInfo2.profileName}
                                            </label>
                                        </span>
                                    </div>
                                </Fragment>

                            })}
                        </div>
                    </div>
                }
            </div>
        </Fragment>
    }
}
export default SearchResultForm;