import { NextFunction, Router, Request, Response } from "express";
import userRepository from "../repositories/user.repository";
import { StatusCodes } from 'http-status-codes'
 
const usersRoute = Router();

usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepository.findAllUsers();

    res.status(StatusCodes.OK).send(users);
});

usersRoute.get('/users/:uuid', async (req: Request, res: Response, next: NextFunction) => {

    try
    {
    const uuid = req.params.uuid;

    const user = await userRepository.findById(uuid);

    if(user == undefined){
        res.status(StatusCodes.NOT_FOUND).send(); 
    }

    res.status(StatusCodes.OK).send(user); 

    }
    
    catch(error){
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
});

usersRoute.post('/users', async(req: Request, res: Response, next: NextFunction) => {

    try{

    const newUser = req.body;
    
    const userCreate = userRepository.userCreate(newUser);

    res.status(StatusCodes.CREATED).send(userCreate);
    
    }

    catch(error){
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
});

usersRoute.put('/users/:uuid', async(req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {

    try{

    const uuid = req.params.uuid;
    const userUpdate = req.body;

    userUpdate.uuid = uuid;

    const userExists = await userRepository.findById(userUpdate.uuid);

    if(userExists == undefined){
        res.status(StatusCodes.NOT_FOUND).send();
    }

    await userRepository.userUpdate(userUpdate);

    res.status(StatusCodes.OK).send();

    }

    catch(error){
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
});

usersRoute.delete('/users/:uuid', async(req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {

    try{

    const uuid = req.params.uuid;
    const userExists = await userRepository.findById(uuid);

    if(userExists == undefined){
        res.status(StatusCodes.NOT_FOUND).send();
    }

    await userRepository.userDelete(uuid);

    res.status(StatusCodes.OK).send();

    }

    catch(error){
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
})

export default usersRoute;