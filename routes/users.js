const express=require("express");
const {users}=require("../data/users.json");
const router=express.Router()

router.get('/',(req,res)=>{
    res.status(200).json({
        success: true,
        data: users
    })
});

router.get('/:id',(req,res)=>{
    const {id}=req.params;
    const user= users.find((each)=>each.id===id);
    if(!user){
        return res.status(404).json({
            success: false,
            message:`User not found ${id}`
        })
    }
    res.status(200).json({
        success: true,
        data: user
    })
});

router.post('/',(req,res)=>{
    // "id": "2",
    // "Name": "Jane",
    // "surname": "Doe",
    // "email": "user@gmail.com",
    // "issuedBook": "2",
    // "issuedDate": "01/07/2021",
    // "returnDate": "01/10/2021",
    // "subscriptionType": "Standard",
    // "subscriptionDate": "01/07/2021"
    const {id,Name,surname,email,subscriptionType,subscriptionDate}=req.body;
    if(!id||!Name||!surname||!email||!subscriptionType||!subscriptionDate){
        return res.status(400).json({
            success: false,
            message: "Please provide all the required fields"
        })
    }
    const user=users.find((each)=>each.id===id);
    if(user){
        return res.status(409).json({
            success:false,
            message:"the user details already exists."
        })
    }
    users.push({
        id,
        Name,
        surname,
        email,
        subscriptionType,
        subscriptionDate
    })
    res.status(201).json({
        success: true,
        data: users,
        message: "User created successfully"
    })
});

router.put('/:id',(req,res)=>{
    const {id}=req.params;
    const {Name,surname,email,subscriptionType,subscriptionDate}=req.body;
    const user=users.find((each)=>each.id===id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: `User not found at id: ${id}`
        })
    }
    // Object.assign(user,data);
    // const updateUser=users.map((each)=>{
    //     if (each.id===id){
    //         return{
    //             ...each,
    //             ...data
    //         }
    //     }
    //     return each;
    // })

     //update the book details
    user.Name=Name;
    user.email=email;
    user.surname=surname;
    user.subscriptionType=subscriptionType;
    user.subscriptionDate=subscriptionDate;

    res.status(200).json({
        success: true,
        data: user,
        message: `user data is updated successfully`
    })
});

router.delete('/:id',(req,res)=>{
    const {id}=req.params;
    const user=users.find((each)=>each.id===id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: `Users not found at id: ${id}`
        })
    }
    const updateUser=users.filter((each)=>each.id!==id);
    res.status(200).json({
        success: true,
        data:updateUser,
        message: "User deleted successfully"
    })
});

router.get('/subscription-details/:id',(req,res)=>{
    const {id}=req.params;
    const user=users.find((each)=>each.id===id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:`User not found for id ${id}`
        })
    }
    // const issuedBooks=books.filter((book)=>book.issued===true & book.issuedTo===id);
    const getDateInDays=(data='')=>{
        let date;
        if (data){
            date=new Date(data);
        }
        else{
            date=new Date();
        }
        let days= Math.floor(date/(1000*60*60*24));
        return days;
    }
    const subscriptionType=(date)=>{
        if(user.subscriptionType==="Basic"){
            date=date+90;
        }
        else if(user.subscriptionType==="Standard"){
            date=date+180;
        }
        else if(user.subscriptionType==="Premium"){
            date=date+365;
        }
        return date;
    }
    let returnDate=getDateInDays(user.returnDate);
    let currentDate=getDateInDays();
    let subscriptionDate=getDateInDays(user.subscriptionDate);
    let subscriptionExpiryDate=subscriptionType(subscriptionDate);

    const data={
        ...user,
        subscriptionExpired: subscriptionExpiryDate < currentDate,
        subscriptionDaysLeft: subscriptionExpiryDate-currentDate,
        daysLeftForExpiration: returnDate-currentDate,
        returnDate: returnDate<currentDate? "Book is OverDue": returnDate,
        fine: returnDate<currentDate? subscriptionExpiryDate<=currentDate? 200:100:0
    }

    res.status(200).json({
        success:true,
        data:data
    })
})

module.exports=router;