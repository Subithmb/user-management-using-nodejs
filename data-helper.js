const { Promise } = require("mongoose")
const { find } = require("./config/connection")

// adduser:((user)=>{
//     return new Promise((resolve,rejected)=>{
//         if(find({'user.email':{$exists:true}})){

//             rejected(existerr)
//         }
//         else

//     resolve(async(user)=>{
//         const data={
//             name:req.body.name,
//             lname:req.body.lname,
//             email:req.body.email,
//             pass:req.body.pass
//               }
//               await collection.insertMany([data])
            
//     })
// })
// }
// ) 