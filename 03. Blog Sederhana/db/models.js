const pool = require('./koneksi'); 

module.exports = {
    query:async (text,params)=>{
        try{
            const res = await pool.query(text,params)
            return res
        } catch(err){
            throw err
        }
    }
};