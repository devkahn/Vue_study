const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: '127.0.0.1', 
     user:'root', 
     password: 'bongcRo391!',
     connectionLimit: 5,
     database:'memo_Practice'
});


module.exports ={
    async run(query, params){
        return new Promise((resolve) => {
            pool.getConnection()
                .then(conn => {
                    conn.query(query, params)
                        .then((rows) => {
                            resolve(rows);
                        })
                        .catch(err => {
                            console.log(err); 
                            conn.end();
                        })
                }).catch(err => {
                  //not connected
                });
        })


        
    }
}


