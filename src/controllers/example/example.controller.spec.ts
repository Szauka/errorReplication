// import { InjectorService } from '@tsed/common';
// import { inject } from '@tsed/testing';
// import { expect } from 'chai';
// import * as Sinon from 'Sinon';
// import { ExampleService } from '../../services/example/example.service';
// import { ExampleController } from './example.controller';

// describe('Example Controller', () => {

//     describe('test example using InjectorService to mock other service', () => {
//         before(inject([InjectorService], (injectorService: InjectorService) => {

//             this.exampleService = {
//                 find: Sinon.stub().returns(Promise.resolve({ id: '1' }))
//             };

//             const locals = new Map<any, any>();
//             locals.set(ExampleService, this.exampleService);

//             this.ExampleController = injectorService.invoke<ExampleController>(ExampleController, locals);
//             this.result = this.ExampleController.get('1');

//             return this.result;

//         }));


//         it('should get the service from InjectorService', () => {
//             expect(this.ExampleController).to.be.an.instanceof(ExampleController);
//         });

//         it('it should have a fake exampleService', () => {
//             expect(this.ExampleController.exampleService).to.equal(this.exampleService);
//         });

//         it('should have called the ExampleService.find() method', () => {
//             this.exampleService.find.should.be.calledWithExactly('1');
//         });

//         it('should return the example', () => {
//             return this.result.should.eventually.deep.equal({ id: '1' });
//         });
//     });
// });