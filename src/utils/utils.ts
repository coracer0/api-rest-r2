import bcrypt from 'bcryptjs';

class Utils {
    public async hashPassword(password: string){
        const salt = await bcrypt.genSaltSync(10);
        
        return await bcrypt.hashSync(password, salt);
    }

    public async checkPassword(password:string, encryptPassword:string):Promise<boolean>{
        return await bcrypt.compareSync(password,encryptPassword);
    }


}
export const utils = new Utils();