const {collection}=require('../config/connection');
const {admincol} = require("../config/connection");
module.exports={
    tableinuser:()=>{
        return new Promise(async(resolve,reject) => {
            alluserdata=await collection.find().lean()
            if(alluserdata){
                resolve(alluserdata)
            }
            else{
                reject("no user found")
                return
            }
            
        })
    },





// const {collection}=require('../config/connection');
// const {admincol} = require("../config/connection");

// const moduleone={
//     tableinuser:()=>{
//         return new Promise(async(resolve,reject) => {
          
//             alluserdata=await collection.find().lean()
//             //  console.log(alluserdata);
//             if(alluserdata){
//                 resolve(alluserdata)
//             }
//             else{
//                 reject("no user found")
//                 return
//             }
            
//         })
//     }
// }
// module.exports=moduleone
deleteuser:(userid)=>{
    return new Promise(async(resolve,reject)=>{
        if(userid){
            const userremove=await collection.deleteOne({_id:userid})
            resolve(userremove)
        }else{
            reject("user data removed")
        }
    })
},
// edituser:(userid)=>{
    
//     return new Promise(async(resolve,reject)=>{
//         if(userid){
            
//             const userdata=await collection.findById(userid)
//             // console.log(userdata);
//             resolve(userdata)
//         }else{
//             reject("user data removed")
//         }
//     })
// },
userupdate:(userid,data)=>{
    return new Promise((resolve,reject)=>{
        console.log(userid);
     const userupdate=  collection.updateOne({_id:userid},{$set:{
            name:data.name,
            lname:data.lname,
            email:data.email,
            pass:data.pass
        }}).then((result)=>{
            resolve()
        })
        
        })
    
}
}