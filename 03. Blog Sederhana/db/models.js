const pool = require('./koneksi'); 

module.exports = {
    query:async (text,params,callback)=>{
        return await pool.query(text,params,callback)
    }
};