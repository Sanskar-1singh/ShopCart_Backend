const UserService=require('../../src/services/user-service');
const CartRepository=require('../../src/repositories/cart-repository');
const UserRepository=require('../../src/repositories/user-repository');
const bcrypt=require('bcrypt');
const Authutils=require('../../src/utils/auth');
const AppError = require('../../src/errors/app-error');

jest.mock('../../src/repositories/user-repository.js');
jest.mock('../../src/repositories/cart-repository.js');
jest.mock('../../src/utils/auth.js');

//generally we use spyOn mocking in those function we we directly use from third party service
//which inside implemetation we dont know 
//for those function we import from any module reside in our project we have to do mocking as we have did in
// beforAll() function>>>

const mockUser={
    id:1,
    email:'a@b.com',
    password:'sdjfioiojfiopa65456',
    createdAt:'2020-12-12',
    updatedAt:'2020-12-12'
}

describe('test for user service signin method',()=>{

    beforeAll(()=>{
        jest.clearAllMocks();
    });

    test('should return valid jwt token',async ()=>{
         //way to mock the ay respository or service and it internal function customally
        UserRepository.mockImplementation(()=>{
            return {
                getUserByemail:(email)=>{
                    return mockUser;
                },
                getUsers:()=>{
                     return [mockUser];
                },
                getUser:(id)=>{
                     return mockUser;
                }
            }
        });
        Authutils.generateToken.mockImplementation(()=>{
            return "14567578";
        })
        //prepare
      const userService=new UserService(new UserRepository(),new CartRepository());

      jest.spyOn(bcrypt,'compareSync').mockImplementation(()=>{
            return true;
        });

      //act
      try {
        const response=await userService.signinUser({email:'ad@b.com',password:'1234'});
        expect(response).toBe('14567578');
      } catch (error) {
         expect(error).toBeInstanceOf(AppError);
      }
     
    });

    test('should throw unauthorised error for password mismatch',async ()=>{
        //way to mock the ay respository or service and it internal function customally
       UserRepository.mockImplementation(()=>{
           return {
               getUserByemail:(email)=>{
                   return mockUser;
               },
               getUsers:()=>{
                    return [mockUser];
               },
               getUser:(id)=>{
                    return mockUser;
               }
           }
       });
       Authutils.generateToken.mockImplementation(()=>{
           return "14567578";
       })
       //prepare
     const userService=new UserService(new UserRepository(),new CartRepository());

     jest.spyOn(bcrypt,'compareSync').mockImplementation(()=>{
           return false;
       });

     //act
     try {
       const response=await userService.signinUser({email:'ad@b.com',password:'1234'});
       expect(response).toBe('14567578');
     } catch (error) {
        expect(error).toBeInstanceOf(AppError);
     }
    
   });

   test('should throw unauthorised error for password mismatch',async ()=>{
    //way to mock the ay respository or service and it internal function customally
   UserRepository.mockImplementation(()=>{
       return {
           getUserByemail:(email)=>{
               return undefined;
           },
           getUsers:()=>{
                return [];
           },
           getUser:(id)=>{
                return undefined;
           }
       }
   });
   Authutils.generateToken.mockImplementation(()=>{
       return "14567578";
   })
   //prepare
 const userService=new UserService(new UserRepository(),new CartRepository());

 jest.spyOn(bcrypt,'compareSync').mockImplementation(()=>{
       return true;
   });

 //act
 try {
   const response=await userService.signinUser({email:'ad@b.com',password:'1234'});
   expect(response).toBe('14567578');
 } catch (error) {
    expect(error).toBeInstanceOf(AppError);
 }

});
});
