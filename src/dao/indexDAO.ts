import pool from '../database/database'

class IndexDAO{

    public async test(){
        const result = await pool.then( async (connection) => {
            return await connection.query('Select * from rol');
        });
        
        return result;
    }

}

export const dao = new IndexDAO();