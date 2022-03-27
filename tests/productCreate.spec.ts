import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import { describe, it } from "mocha";

import httpMocks from "node-mocks-http";
import faker from "faker";
require("dotenv").config();

import { ProductRequest } from "../src/interfaces/productInterfaces";
import { ProductsDao } from '../src/dao/productDao';
import { ProductController } from "../src/controllers/productControllers";

chai.use(chaiHttp);
chai.should();

//abriendo un cliente para ejecutar el test de integracion

describe("Product Create", () => {
  let stub;
  let successController
  before(() => {

    const stubProduct:ProductRequest={
        name: faker.name.firstName(),
        price: 30,
        stock: 20,
        photo: faker.image.avatar(),
        code: faker.address.countryCode(),
        description: faker.address.direction()
    }


     successController = {
      status:'success',
      code:200,
      message:'OK',
      data:{ text: "se creo con exito" }
    }
    

    stub = sinon.stub(ProductsDao, "add").resolves(stubProduct);
  });


   it("User productCreate Positive", async () => {
    const product:ProductRequest={
        name: faker.name.findName(),
        price: 0,
        stock: 0,
        photo:faker.name.findName(),
        code: faker.name.findName(),
        description: faker.name.findName()
    }
    const req = httpMocks.createRequest({
      method: "POST",
      url: `/api/productos`,
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiMzk3NjY1MDEiLCJpYXQiOjE2NDc4OTA5NjQsImV4cCI6MTY0NzkxOTc2NH0.EnRBo7REtjZfksT5kZIhNwyoz3ggmTOxQ92Soascy_8",
      body: product,
    });
    const response = httpMocks.createResponse();

    const mock = sinon.mock(response);
    mock
      .expects("json")
      .once()
      .withArgs(successController) // verificar como mockear el token

    await ProductController.productCreate(req,response);
    expect(stub.calledOnce).to.be.true;
    mock.verify();
    
  });


  
});
