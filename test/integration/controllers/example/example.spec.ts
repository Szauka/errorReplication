import { ExpressApplication } from '@tsed/common';
import { TestContext } from '@tsed/testing';
import { expect } from 'chai';
import * as SuperTest from 'supertest';
import { Server } from '../../../../src/app';


describe('Example', () => {

    // bootstrap the express application
    before(TestContext.bootstrap(Server));
    before(TestContext.inject([ExpressApplication], (expressApplication: ExpressApplication) => {
        this.app = expressApplication;
    }));
    after(TestContext.reset);

    // run the tests
    describe('GET /api/examples/:id', () => {

        it('should return an example', (done) => {
            SuperTest(this.app)
                .get('/api/examples/1')
                .expect(200)
                .end((err, response: any) => {
                    if (err) {
                        throw (err);
                    }

                    const obj = JSON.parse(response.text);

                    expect(obj).to.be.an('object');

                    done();
                });
        });

        it('should throw an error', (done) => {
            SuperTest(this.app)
                .get('/api/examples/765')
                .expect(404)
                .end((err, response: any) => {
                    if (err) {
                        throw (err);
                    }

                    expect(response.error.text).equal('Example not found');

                    done();
                });
        });
    });
});