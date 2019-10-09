// Global variables
// Request path module for relative path
//const path = require('path')
// Request File System Module
//var fs = require('fs');

export class ApiCall<T> {
// GET request for the /list_user page.
// get('/listUsers', function (req, res) {
//    console.log("Got a GET request for list of users");

//      // Create a relative path URL
//     let reqPath = path.join(__dirname, '../mock/users.json');

//     //Read JSON from relative path of this file
//     fs.readFile(reqPath , 'utf8', function (err, data) {
//         //Handle Error
//        if(!err) {
//          //Handle Success
//           console.log("Success"+data);
//          // Parse Data to JSON OR
//           var jsonObj = JSON.parse(data)
//          //Send back as Response
//           res.end( data );
//         }else {
//            //Handle Error
//            res.end("Error: "+err )
//         }
//    });
// })
}