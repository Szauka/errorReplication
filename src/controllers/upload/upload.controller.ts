import { Controller, Put, Status } from '@tsed/common';
import { MulterOptions, MultipartFile } from '@tsed/multipartfiles';
import { Responses } from '@tsed/swagger';

type MulterFile = Express.Multer.File;

@Controller('/upload')
export class UploadController {

    constructor() { }

    @Put('/')
    @Status(201)
    @Responses('201', { description: 'Created' })
    @Responses('400', { description: 'Bad Request' })
    @MulterOptions({ dest: 'c:\\tmp' })
    async add(@MultipartFile('file') file: MulterFile): Promise<any> {

        console.log('file: ', file);

        return true;
    }


}