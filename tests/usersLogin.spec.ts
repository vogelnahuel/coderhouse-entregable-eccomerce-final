import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import { describe, it } from "mocha";
import { validatorMiddeware } from "../src/middlewares/validatorMiddeware";
import httpMocks from "node-mocks-http";
import faker from "faker";
require("dotenv").config();

import { generateToken, verifyToken } from "../src/utils/token";
import { UsersLoginRequest } from "../src/models/requestDTO/UsersLoginDTO";
import { UserService } from "../src/services/userServices";

import { CartUser } from "../src/interfaces/cartInterfaces";

import { UsersController } from "../src/controllers/usersControllers";
import { UserDao } from "../src/dao/mongo/usersDao";
import { CartDao } from "../src/dao/mongo/cartDao";
import { UserDto } from "../src/models/responseDTO/usersDto";
import { FactoryCreateDao } from "../src/dao/FactoryCreate";


chai.use(chaiHttp);
chai.should();

//abriendo un cliente para ejecutar el test de integracion

describe("Users Login", () => {
  let stub, stubCart;
  let stubValueUser:UserDto;
  let successController
  before( async () => {
    
    const factory: FactoryCreateDao = FactoryCreateDao.getInstance();
    const Instances = await factory.createInstances();
    
    stubValueUser = {
      _id: faker.datatype.uuid(),
      email: "vogelnahuel@gmail.com",
      name: faker.name.findName(),
    };

    const stubValueCart:CartUser = {
      _id: faker.datatype.uuid(),
      _idUser: stubValueUser._id,
      products: [],
      timestamp: "12313213",
      __v: 0
    };

     successController = {
      status:'success',
      code:200,
      message:'OK',
      data:{
        
      }
    }

    stub = sinon.stub(Instances.UserDao, "getCarrito").resolves(stubValueUser);
    stubCart = sinon.stub(Instances.CartDao, "getByIdUser").resolves(stubValueCart);
  });

  /**
   *
   *  @brief verifica que las validaciones del request sean correctas segun document y password
   *  @assert  valida si se ejecuta correctamente la llamada de la clase validadora
   */
  it("validatorMiddeware Positive", async () => {
    const nextSpy: sinon.SinonSpy<any[], any> = sinon.spy();
    const req = httpMocks.createRequest({
      method: "POST",
      url: `/flexservice/api/login`,
      body: {
        email: "vogelnahuel@gmail.com",
        password: "1234",
      },
    });

    const res = httpMocks.createResponse();
    await validatorMiddeware(req, res, nextSpy, new UsersLoginRequest());
    expect(nextSpy.calledOnce).to.be.true;
  });

  /**
   *
   *  @brief verifica que las validaciones del request sean incorrectos segun document y password
   *  @assert  valida si se ejecuta incorrectamente la llamada de la clase validadora
   */
  it("validatorMiddeware Negative", async () => {
    const nextSpy: sinon.SinonSpy<any[], any> = sinon.spy();
    const req = httpMocks.createRequest({
      method: "POST",
      url: `/flexservice/api/login`,
    });
    const res = httpMocks.createResponse();
    await validatorMiddeware(req, res, nextSpy, new UsersLoginRequest());
    expect(nextSpy.calledOnce).to.be.false;
  });

  /**
   *
   *  @brief verifica que las validaciones del request sean incorrectos segun document y password
   *  @assert  valida si se ejecuta incorrectamente la llamada de la clase validadora
   */
  it("validatorMiddeware Negative", async () => {
    const nextSpy: sinon.SinonSpy<any[], any> = sinon.spy();
    const req = httpMocks.createRequest({
      method: "POST",
      url: `/flexservice/api/login`,
      body: {
        email: "",
        password: "Password01",
      },
    });
    const res = httpMocks.createResponse();
    await validatorMiddeware(req, res, nextSpy, new UsersLoginRequest());
    expect(nextSpy.calledOnce).to.be.false;
  });

  /**
   *
   *  @brief  verifica que la respuesta del metodo funcione correctamente
   *  @assert  compara res si tiene la propiedad document
   */

   it("User usersPostLogin Positive", async () => {

    const req = httpMocks.createRequest({
      method: "POST",
      url: `/flexservice/api/login`,
      isAuthenticated:()=>true,
      body: {
        email: "vogelnahuel@gmail.com",
        password: "1234",
      },
    });
    const response = httpMocks.createResponse();

    const mock = sinon.mock(response);
    mock
      .expects("json")
      .once()
    await UsersController.usersPostLogin(req,response);
    expect(stub.calledOnce).to.be.true;
    mock.verify();
    
  });


  it("User usersPostLoginService Positive", async () => {
    const data = {
      email: "vogelnahuel@gmail.com",
      password: "1234",
    };
    const res = await UserService.usersPostLoginService(data);

    expect(res.User.email).to.equal("vogelnahuel@gmail.com");
  });
//   it("User userDao getCarrito Positive", async () => {
//     // const stub =  sinon.stub(UserDao, "getCarrito").resolves(stubValue);
//     // const stub = sinon.stub(UserModel, "create").returns(stubValue);
//     // expect(user.id).to.equal(stubValue.id);
//     const res = await UserDao.getCarrito("vogelnahuel@gmail.com");

//     expect(res.email).to.equal("vogelnahuel@gmail.com");
//   });
//   /**
//    *
//    *  @brief  verifica que la respuesta del metodo funcione incorrectamente
//    *  @assert  compara res si es igual a falso
//    */
//   it("User userDao getCarrito Negative", async () => {
//     // const stub =  sinon.stub(UserDao, "getCarrito").resolves(stubValue);
//     const res = await UserDao.getCarrito("notFound@gmail.com");

//     expect(res.email).to.equal("vogelnahuel@gmail.com");
//   });

  /**
   *
   *  @brief  verifica que la respuesta del generar token
   *  @assert  compara si la respuesta es un string
   */
  it("Login generateToken Positive", async () => {
    const res: string = generateToken("vogelnahuel@gmail.com");
    expect(res).to.be.a("string");
  });

  /**
   *
   *  @brief  verifica que el metodo funcione  incorrectamente
   *  @assert  compara si se ejecuto incorrectamente la funcion next()
   */
  it("Login verifyToken Negative", async () => {
    const nextSpy: sinon.SinonSpy<any[], any> = sinon.spy();
    const req = httpMocks.createRequest({
      method: "POST",
      url: `/api/carrito`,
    });
    const response = httpMocks.createResponse();
    verifyToken(req, response, nextSpy);
    expect(nextSpy.calledOnce).to.be.false;
  });
  /**
   *
   *  @brief  verifica que el metodo funcione  correctamente   ----- el token esta vencido  ----
   *  @assert  compara si se ejecuto correctamente la funcion next()
   */
  it("Login verifyToken Positive", async () => {
    const nextSpy: sinon.SinonSpy<any[], any> = sinon.spy();
    const req = httpMocks.createRequest({
      method: "POST",
      url: `/api/carrito`,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiMzk3NjY1MDEiLCJpYXQiOjE2NDc4OTA5NjQsImV4cCI6MTY0NzkxOTc2NH0.EnRBo7REtjZfksT5kZIhNwyoz3ggmTOxQ92Soascy_8",
    });
    const response = httpMocks.createResponse();
    verifyToken(req, response, nextSpy);
    expect(nextSpy.calledOnce).to.be.false;
  });
  /**
   *
   *  @brief  verifica que el metodo funcione  correctamente
   *  @assert  compara si se ejecuto correctamente la funcion next()
   */
  it("Login verifyToken Positive", async () => {
    const nextSpy: sinon.SinonSpy<any[], any> = sinon.spy();
    const req = httpMocks.createRequest({
      method: "POST",
      url: `/api/users/login`,
    });
    const response = httpMocks.createResponse();
    verifyToken(req, response, nextSpy);
    expect(nextSpy.calledOnce).to.be.true;
  });
});
