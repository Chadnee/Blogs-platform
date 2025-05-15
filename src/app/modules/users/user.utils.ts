import { User } from "./user.modelAndSchema"

const findLastId = async(role:string) => {
   const lastAuthor = await User.findOne({role: role}, {Id:1, _id:0}).sort({createdAt: -1}).lean();
   return lastAuthor?.Id?lastAuthor.Id : undefined;
}

// create a global id generator by paremeter
export const generatedId = async(credential: string) => {
    //if no person exists, current/first person got it 0
    let currentId = (0).toString();
    const lastId = await findLastId(credential);
    //console.log(lastId)
    
    if(lastId){
        currentId = lastId.split('-')[1];
    }

    //increment generated Id by 1
    let incrementId = (Number(currentId)+1).toString().padStart(4, '0');
    incrementId = `${credential}-${incrementId}`;
    //console.log(lastId, incrementId)

    return incrementId;
    
}
// const findLastAuthorId = async() => {
//    const lastAuthor = await User.findOne({role: "Author"}, {Id:1, _id:0}).sort({createdAt: -1}).lean();
//    return lastAuthor?.Id?lastAuthor.Id : undefined;
// };

// export const generatedId = async(credential: string) => {
//     //if no author exists, current/first author got it 0
//     let currentId = (0).toString();

//     const lastAuthorId = await findLastAuthorId();
    
//     if(lastAuthorId){
//         currentId = lastAuthorId.split('-')[1];
//     }

//     //increment generated Id by 1
//     let incrementId = (Number(currentId)+1).toString().padStart(4, '0');
//     incrementId = `${credential}-${incrementId}`;
//    // console.log(lastAuthorId)

//     return incrementId;
    
// }


