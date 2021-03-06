const cron = require('node-cron'),
 spawn = require('child_process').spawn;

 let namef = new Date();

let dbBackupTask = cron.schedule('*/10 * * * * *', () => {
    let backupProcess = spawn('mongodump', [
        '--host=localhost',
	'--port=27017',
	'--out=/opt/backup/mongodump-2013-10'+ getDate()
      ]);

    backupProcess.on('exit', (code, signal) => {
        if(code) 
            console.log('Backup process exited with code ', code);
        else if (signal)
            console.error('Backup process was killed with singal ', signal);
        else 
            console.log('Successfully backedup the database')
            namef++;
            console.log(namef) 
    });
});