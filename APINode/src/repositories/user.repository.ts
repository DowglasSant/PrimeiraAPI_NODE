import db from "../database/db";
import { DatabaseError } from "../models/errors/database.error.model";
import User from "../models/user.model";

class UserRepository{

    async findAllUsers(): Promise<User[]>{
        const query = 'SELECT uuid, username FROM application_user';

        const { rows } = await db.query<User>(query);

        return rows || [];
    }

    async findById(uuid: string): Promise<User>{

        try{
            
        const query = "SELECT uuid, username FROM application_user WHERE uuid = $1";

        const values = [uuid]
        const { rows } = await db.query<User>(query, values);

        const [user] = rows;

        return user;
    }

        catch(error){

            throw new DatabaseError("Erro na consulta por ID", error);
        }
    }

    async userCreate(user: User): Promise<User> {
        
        try{

        const script = "INSERT INTO application_user (username, password) VALUES ($1, crypt($2, 'my_salt'))";

        const values = [user.username, user.password];

        const { rows } = await db.query<User>(script, values);
        const [newUser] = rows;

        return newUser;

        }

        catch(error){
            throw new DatabaseError("Erro ao criar usuario", error);
        }

    }

    async userUpdate(user: User): Promise<void> {

        try{

        const script = "UPDATE application_user SET username = $1, password = crypt($2, 'my_salt') WHERE uuid = $3";

        const values = [user.username, user.password, user.uuid];

        await db.query<User>(script, values); 

        }
        
        catch(error){
            throw new DatabaseError("Erro ao atualizar usuario", error);
        }
    }

    async userDelete(uuid: string): Promise<void> {

        try{
            
        const script = "DELETE FROM application_user WHERE uuid = $1";
        
        const values = [uuid];

        await db.query(script, values);

        }

        catch(error){
            throw new DatabaseError("Erro ao deletar usuario", error);
        }
    }
}

export default new UserRepository();