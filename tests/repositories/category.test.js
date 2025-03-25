const AppError = require('../../src/errors/app-error');
const {category}=require('../../src/models');

const mockCategory={
    id:1,
    name:'fashion',
    description:'fashion related propduct',
    createdAt:'2020-25-96',
    updatedAt:'2020-25-96',
}

const CategoryRepository=require('../../src/repositories/category-repository');
describe('test for category respository category creation',()=>{
    test('should create a new category',async ()=>{
        
        //Prepare
        const respository=new CategoryRepository();

          jest.spyOn(category,'create').mockImplementation(()=>{
            return mockCategory
          })
        //Act
        const response=await respository.createCategory({name:'fashion',description:'fashion related propduct'});

        //Assert 
        expect(response.name).toBe('fashion');
        expect(response.description).toBe('fashion related propduct')
    });

    test('should not create a new category and throw error',async ()=>{
        //prepare
        const repositories=new CategoryRepository();

        jest.spyOn(category,'create').mockImplementation(()=>{
               throw new Error ('bye bye');
        });
        //act
         try {
        const response=await repositories.createCategory({name:'fashion',description:'fashion related  propduct'});
         } catch (error) {
            expect(error).toBeInstanceOf(AppError);
         }
    })
});

describe('Test for category repository getcategory',()=>{
    test('should get one category',async ()=>{
        //prepare
        const repository=new CategoryRepository();
        jest.spyOn(category,'findByPk').mockImplementation(()=>{
            return mockCategory;
        });
        //Act
        const response=await repository.getCategory(1);
        //Assert
        expect(response).toBe(mockCategory);
    });

    test('should get all categories',async ()=>{
        //Prepare
        const repository=new CategoryRepository();
        
        jest.spyOn(category,'findAll').mockImplementation(()=>{
            return [mockCategory];
        })

        const response=await repository.getCategories();
        //Assert
        const ans=[mockCategory];
        expect(response).toStrictEqual(ans);
    })
});