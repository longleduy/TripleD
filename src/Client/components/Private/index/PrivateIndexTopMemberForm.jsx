import React, { Fragment } from 'react'
import topMemberStyles from '../../../Styles/TopMember.scss'
export const PrivateIndexTopMemberForm = React.memo((props) => {
    return <Fragment>
        <div className={topMemberStyles.mainDiv} id="topmember-div">
        <label className={topMemberStyles.labelTitle}>Top member</label>
            <span className={topMemberStyles.contentDiv}>
                <div className={topMemberStyles.rank}>
                    <img src={require(`../../../../../public/images/rank/chevron-21.svg`)} />
                    <label>Chevon21</label>
                </div>
                <div className={topMemberStyles.info}>
                    <div className={topMemberStyles.userName}>
                        <label>Duy Long</label>
                        <img src="https://res.cloudinary.com/seatechit/image/upload/v1543147951/wesmqszimghcnotr9buc.jpg" />
                    </div>
                    <div className={topMemberStyles.point}>
                        <span>
                            <svg viewBox="0 0 24 24"><path fill="#ccc" d="M16.23,18L12,15.45L7.77,18L8.89,13.19L5.16,9.96L10.08,9.54L12,5L13.92,9.53L18.84,9.95L15.11,13.18L16.23,18M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"></path></svg>
                            <label>1568 Points</label>
                        </span>
                        <span>
                            <svg viewBox="0 0 24 24"><path fill="#ccc" d="M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6M6,4H13V9H18V20H6V4M8,12V14H16V12H8M8,16V18H13V16H8Z"></path></svg>
                            <label>72 Posts</label>
                        </span>
                    </div>
                </div>
            </span>
            <span className={topMemberStyles.contentDiv}>
                <div className={topMemberStyles.rank}>
                    <img src={require(`../../../../../public/images/rank/chevron-19.svg`)} />
                    <label>Chevon19</label>
                </div>
                <div className={topMemberStyles.info}>
                    <div className={topMemberStyles.userName}>
                        <label>Quynh Nga</label>
                        <img src="https://res.cloudinary.com/seatechit/image/upload/v1543147933/hedw9edhtyfwzueuxo0l.jpg" />
                    </div>
                    <div className={topMemberStyles.point}>
                        <span>
                            <svg viewBox="0 0 24 24"><path fill="#ccc" d="M16.23,18L12,15.45L7.77,18L8.89,13.19L5.16,9.96L10.08,9.54L12,5L13.92,9.53L18.84,9.95L15.11,13.18L16.23,18M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"></path></svg>
                            <label>1464 Points</label>
                        </span>
                        <span>
                            <svg viewBox="0 0 24 24"><path fill="#ccc" d="M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6M6,4H13V9H18V20H6V4M8,12V14H16V12H8M8,16V18H13V16H8Z"></path></svg>
                            <label>67 Posts</label>
                        </span>
                    </div>
                </div>
            </span>
            <span className={topMemberStyles.contentDiv}>
                <div className={topMemberStyles.rank}>
                    <img src={require(`../../../../../public/images/rank/chevron-17.svg`)} />
                    <label>Chevon17</label>
                </div>
                <div className={topMemberStyles.info}>
                    <div className={topMemberStyles.userName}>
                        <label>Duy Khanh</label>
                        <img src="https://res.cloudinary.com/seatechit/image/upload/v1542958715/dytx7rfcnq0cmfala8ae.png" />
                    </div>
                    <div className={topMemberStyles.point}>
                        <span>
                            <svg viewBox="0 0 24 24"><path fill="#ccc" d="M16.23,18L12,15.45L7.77,18L8.89,13.19L5.16,9.96L10.08,9.54L12,5L13.92,9.53L18.84,9.95L15.11,13.18L16.23,18M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"></path></svg>
                            <label>1372 Points</label>
                        </span>
                        <span>
                            <svg viewBox="0 0 24 24"><path fill="#ccc" d="M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6M6,4H13V9H18V20H6V4M8,12V14H16V12H8M8,16V18H13V16H8Z"></path></svg>
                            <label>60 Posts</label>
                        </span>
                    </div>
                </div>
            </span>
            <span className={topMemberStyles.contentDiv}>
                <div className={topMemberStyles.rank}>
                    <img src={require(`../../../../../public/images/rank/chevron-14.svg`)} />
                    <label>Chevon14</label>
                </div>
                <div className={topMemberStyles.info}>
                    <div className={topMemberStyles.userName}>
                        <label>Song Nhi</label>
                        <img src="https://res.cloudinary.com/seatechit/image/upload/v1542894503/ayp6xyoz1ymylfjoqhjt.jpg" />
                    </div>
                    <div className={topMemberStyles.point}>
                        <span>
                            <svg viewBox="0 0 24 24"><path fill="#ccc" d="M16.23,18L12,15.45L7.77,18L8.89,13.19L5.16,9.96L10.08,9.54L12,5L13.92,9.53L18.84,9.95L15.11,13.18L16.23,18M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"></path></svg>
                            <label>1124 Points</label>
                        </span>
                        <span>
                            <svg viewBox="0 0 24 24"><path fill="#ccc" d="M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6M6,4H13V9H18V20H6V4M8,12V14H16V12H8M8,16V18H13V16H8Z"></path></svg>
                            <label>54 Posts</label>
                        </span>
                    </div>
                </div>
            </span>
        </div>
    </Fragment>
})