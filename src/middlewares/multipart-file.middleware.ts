import { EndpointInfo, EndpointMetadata, IMiddleware, OverrideMiddleware, Req, Res, ServerSettingsService } from '@tsed/common';
import { MultipartFileMiddleware } from '@tsed/multipartfiles';
import * as Express from 'express';
import * as multer from 'multer';
import * as Path from 'path';
import { BadRequest } from 'ts-httpexceptions';
import mkdirp = require('mkdirp');

@OverrideMiddleware(MultipartFileMiddleware)
export class GTArchiveMultipartFileMiddleware implements IMiddleware {

    private multer: any = multer;

    constructor(private serverSettingsService: ServerSettingsService) { }

    use(@EndpointInfo() endpoint: EndpointMetadata, @Req() request: Express.Request, @Res() response: Express.Response) {


        if (1 === 1) {
            throw new BadRequest(`This should be thrown and seen on the test failure.`);
        }


        const dest = this.serverSettingsService.uploadDir;
        const conf = endpoint.store.get(MultipartFileMiddleware);
        const options = Object.assign({ dest }, this.serverSettingsService.get('multer') || {}, conf.options || {});


        return new Promise((resolve, reject) => {
            const onResponse = (err: any) => (err ? reject(err) : resolve());

            if (!conf.any) {
                const fields = conf.fields.map(({ name, maxCount }: any) => ({ name, maxCount }));

                return this.multer(options).fields(fields)(request, response, onResponse);
            }

            return this.multer(options).any()(request, response, onResponse);
        }).catch(er => {
            throw er.code ? new BadRequest(`${er.message} ${er.field || ''}`.trim()) : er;
        });
    }
}