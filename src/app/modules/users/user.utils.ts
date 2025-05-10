import { User } from "./user.modelAndSchema"

const findLastAuthorId = async() => {
   const lastAuthor = await User.findOne({role: "Author"}, {Id:1, _id:0}).sort({createdAt: -1}).lean();
   return lastAuthor?.Id?lastAuthor.Id : undefined;
};

export const generatedAuthorId = async() => {
    //if no author exists, current/first author got it 0
    let currentId = (0).toString();

    const lastAuthorId = await findLastAuthorId();
    
    if(lastAuthorId){
        currentId = lastAuthorId.split('-')[1];
    }

    //increment generated Id by 1
    let incrementId = (Number(currentId)+1).toString().padStart(4, '0');
    incrementId = `Author-${incrementId}`;
   // console.log(lastAuthorId)

    return incrementId;
    
}


