import "reflect-metadata"
import "../../container"
import cors from "cors";
import 'express-async-errors'
import express, { Request, Response, NextFunction} from "express";
import { AppDataSource } from "../typeorm";
import AppError from "../../errors/AppError";
import routes from "./routes";

const app = express();




const server = async () => {
  try {

      app.use(cors());
      app.use(express.json());
      app.use(routes)

      app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
            status: 'error',
            message: err.message
          })
        }
        console.log(err)
        return response.status(500).json({
            status: 'error',
            message: 'Internal server error'
          })
      })

      app.get("/", (request, response) => {
        return response.json({message: "hello world"})
      })
      
      await AppDataSource.initialize();
      console.log("database initialize")

      app.listen(process.env.PORT)
      console.log("server is listening On port:", process.env.PORT)
      
  } catch (err) {
      console.log(err);
  }
}

server();



// AppDataSource.initialize().then(() => {
//     console.log("database initialize")

//     app.listen(3333, () => {
//         console.log("server On port:", 3333)
//     })

// }).catch((err) => {
//     console.log(err)
// })




