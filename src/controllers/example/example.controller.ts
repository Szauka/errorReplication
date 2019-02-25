import { Controller, Get, PathParams, Required } from '@tsed/common';
import { NotFound } from 'ts-httpexceptions';
import { ExampleService } from '../../services/example/example.service';

@Controller('/examples')
export class ExampleController {

    constructor(private exampleService: ExampleService) { }

    @Get('/:id')
    async get(@Required() @PathParams('id') id: string) {
        const example = await this.exampleService.find(id);

        if (example) {
            return example;
        }

        throw new NotFound('Example not found');
    }
}