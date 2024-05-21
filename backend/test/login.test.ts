import { Request, Response } from "express";
import GestorController from "../src/controllers/GestorController";
import gestorModel, { Gestor } from "../src/models/gestoresModel";

jest.mock("../src/models/gestoresModel");

describe("GestorController", () => {
  /*
  describe("getAll", () => {
    it("Deve retornar todos os gestores com status 201", async () => {
      const mockResponse = jest.fn();
      const gestores = [
        {
          _id: "6619cfd91e1dd8912918034c",
          idGestor: 1,
          name: "Michael Morais",
          email: "michael_morais@outlook.com.br",
          password: "123",
          __v: 0,
        },
        {
          _id: "6619cfee1e1dd89129180350",
          idGestor: 2,
          name: "Claudia Nunes",
          email: "claudia_nunes@gmail.com",
          password: "123",
          __v: 0,
        },
        {
          _id: "6619d01a1e1dd89129191cfa",
          idGestor: 4,
          name: "Abner Rodrigo",
          email: "paiDoAno@gmail.com",
          password: "123",
          __v: 0,
        },
        {
          _id: "6619d072dedd7ffef4be61e9",
          idGestor: 5,
          name: "Juliana Manso",
          email: "Ju_manso@yahoo.com",
          password: "123",
          __v: 0,
        },
        {
          _id: "661a78c5782c16db9e09a7f3",
          idGestor: 6,
          name: "Fernando Corintiano",
          email: "corinthians@email.com",
          password: "123",
          __v: 0,
        },
        {
          _id: "661a78dc782c16db9e0a0c96",
          idGestor: 7,
          name: "MIke",
          email: "moraisdpm@outlook.com",
          password: "123",
          __v: 0,
        },
        {
          _id: "662c521ebb4d20420a08ce2f",
          idGestor: 8,
          name: "Yara",
          email: "yara@visiona.com.br",
          password: "123",
          __v: 0,
        },
        {
          _id: "662c53fbd660116218b8e3ed",
          idGestor: 9,
          name: "Joaquim Barbosa",
          email: "joaquim@barbosa.visiona.com",
          password: "123",
          __v: 0,
        },
        {
          _id: "662c547ad660116218b8e408",
          idGestor: 10,
          name: "Marcelo Souza",
          email: "marcelo.visiona@email.com",
          password: "123",
          __v: 0,
        },
      ];
      (gestorModel.find as jest.Mock).mockResolvedValueOnce(gestores);

      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnValueOnce({ json: mockResponse }),
      } as unknown as Response;

      await GestorController.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(mockResponse).toHaveBeenCalledWith({
        gestores: gestores.map((gestor: Gestor) => ({
          idGestor: gestor.idGestor,
          nomeGestor: gestor.name,
          emailGestor: gestor.email,
        }))
      });
      
    });
  });
  */

  describe("findGestor", () => {
    it("Deve retornar o gestor com status 201 se encontrado", async () => {
      const mockResponse = jest.fn();
      const gestor = {
        _id: "6619cfd91e1dd8912918034c",
        idGestor: 1,
        name: "Michael Morais",
        email: "michael_morais@outlook.com.br",
        password: "123",
        __v: 0,
      };
      (gestorModel.findOne as jest.Mock).mockResolvedValueOnce(gestor);

      const req = { body: { idGestor: 1 } } as Request;
      const res = {
        status: jest.fn().mockReturnValueOnce({ json: mockResponse }),
      } as unknown as Response;

      await GestorController.findGestor(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(mockResponse).toHaveBeenCalledWith(gestor);
    });
  });
});
