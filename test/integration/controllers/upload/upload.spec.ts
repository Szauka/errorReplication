import {ExpressApplication} from '@tsed/common';
import {TestContext} from '@tsed/testing';
import * as Path from 'path';
import * as SuperTest from 'supertest';
import {expect} from 'chai';
import {Server} from '../../../../src/app';

describe('Archive endpoint', () => {

    // bootstrap the express application
    before(TestContext.bootstrap(Server));
    before(TestContext.inject([ExpressApplication], (expressApplication: ExpressApplication) => {
        this.app = expressApplication;
    }));
    after(TestContext.reset);


    describe('PUT /api/upload', () => {

        it('should return 401', (done) => {
            SuperTest(this.app)
                .put('/api/upload')
                .attach('file', Path.join(__dirname, '/test.txt'))
                .expect(400)
                .end((err, res: any) => {
                    if (err) {
                        throw (err);
                    }

                    expect(res.text).to.eq('This should be thrown and seen on the test failure.');

                    done();
                });
        });
    });
});
