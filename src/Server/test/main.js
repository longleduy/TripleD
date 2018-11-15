import "regenerator-runtime/runtime";
import chai from 'chai'
import chaiHttp from 'chai-http'
import cloudinary from 'cloudinary'
import { userAccountTest } from './users/user_test'
import { convertToBase64URI } from '../utils/common'
const should = chai.should()
chai.use(chaiHttp)
// cloudinary.config({
//     cloud_name: 'seatechit',
//     api_key: '697115945411315',
//     api_secret: '4X8rw_3mR8WC5G19C5JohhRYHlg'
// })
describe('Main', () => {
    beforeEach(done => {
        done()
    })
    userAccountTest();
    //getListLibFrame();
    //createPost();
    // describe('TestUpload', () => {
    //     it('upload success', async () => {
    //         try {
    //             const result = await cloudinary.v2.uploader.upload(convertToBase64URI('author.jpg'),
    //                 { width: 300, height:300,gravity: 'face',radius: 'max',crop: "crop" });
    //             console.log(result);
    //         } catch (error) {
    //             throw error
    //         }
    //     })
    // })
})
