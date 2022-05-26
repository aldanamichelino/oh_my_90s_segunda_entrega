const cluster = require('cluster');
const os = require('os');
const {initServer} = require('./initServer');
require('dotenv').config();
const { write } = require('./config');


const args = {
    PORT: process.env.PORT || 8080,
    MODE: process.env.MODE || 'FORK'
};

const CPUS_NUM = os.cpus().length;

if(args.MODE =='CLUSTER'){
    if(cluster.isMaster){
        write('info', `Proceso principal pid: ${process.pid}`);
        write('info', `Cantidad de procesadores en cluster: ${CPUS_NUM}`);
        for(let i = 0; i< CPUS_NUM;i++){
            cluster.fork();
        }
    }else{
        initServer(args);
        write('info', `Proceso secundario pid: ${process.pid}`);
    }
}else{
    initServer(args);
    write('info', `Cantidad de procesadores en Fork: ${CPUS_NUM}`);
}



