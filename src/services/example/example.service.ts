import { Service } from '@tsed/common';

@Service()
export class ExampleService {


    $onInit() {
        // console.log('Example service $onInit.');
    }

    async find(id: string): Promise<any> {

        if (id === '1') {
            return {
                exampleId: 1,
                exampleName: 'name',
                exampleResource: 'resource'
            };
        }

        return undefined;
    }
}
