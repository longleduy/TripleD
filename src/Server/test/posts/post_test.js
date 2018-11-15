import "regenerator-runtime/runtime";
import chai from 'chai'
import chaiHttp from 'chai-http'
import { HOST, SERVER_PORT, GRAPHQL_ENDPOINT } from '../../config/contants/uri_contans'
const should = chai.should()
chai.use(chaiHttp)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
process.env.STATUS = "Test"
export const createPost = (action = 'run') => {
    let jwt;
    return describe('Posts', () => {
        it('sign in success', async () => {
            const signInData = `{
                email: "longldseatechit@gmail.com",
                password: "longkhanh"
            }`
            try {
                const res = await chai.request(`${HOST}:${SERVER_PORT}`).post(`/${GRAPHQL_ENDPOINT}`).send({ 'query': `mutation{signIn(formData:${signInData}){profile_name,level,...on SignInInfo{jwt}}}` })
                res.body.data.signIn.should.to.be.an('object');
                res.body.data.signIn.should.have.property('jwt');
                res.body.data.signIn.should.have.property('profile_name');
                res.body.data.signIn.should.have.property('level');
                res.body.data.signIn.jwt.should.not.be.equal(null);
                res.body.data.signIn.profile_name.should.not.be.equal(null);
                res.body.data.signIn.level.should.not.be.equal(null);
                jwt = res.body.data.signIn.jwt
            } catch (error) {
                throw error
            }
        })
        it('createPost success', async () => {
            try {
                const res = await chai.request(`${HOST}:${SERVER_PORT}`)
                    .post(`/${GRAPHQL_ENDPOINT}`)
                    .send('Authorization', 'Bearer ' + jwt)
                    .send({ 'query': `mutation{createPost(postData:{content:"1234"role:"answer",tag:["nodejs","reactjs"]}){id,author,content,stringDate,role,tag}}` })
                res.body.data.createPost.should.not.be.equal(null)
                res.body.data.createPost.should.to.be.an('object');
                res.body.data.createPost.tag.should.to.be.an('array');
            } catch (error) {
                throw error
            }
        })
    })
}
