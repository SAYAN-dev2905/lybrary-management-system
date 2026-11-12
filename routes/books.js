const express=require("express");
const {books}=require("../data/books.json");
const {users}=require("../data/users.json");

const router=express.Router()

router.get('/',(req,res)=>{
    res.status(200).json({
        success: true,
        data: books
    })
});

router.get('/:id',(req,res)=>{
    const {id}=req.params;
    const book= books.find((each)=>each.id===id);
    if(!book){
        return res.status(404).json({
            success: false,
            message:`book not found ${id}`
        })
    }
    res.status(200).json({
        success: true,
        data: book
    })
});

router.post('/',(req,res)=>{
    // "id": "1",
    // "Name": "The Hobbit",
    // "author": "J.R.R. Tolkien",
    // "genre": "Fantasy",
    // "price": "12.99",
    // "publisher": "Houghton Mifflin"
    const {id,Name,author,genre,price,publisher}=req.body;
    if(!id||!Name||!author||!genre||!price||!publisher){
        return res.status(400).json({
            success: false,
            message: "Please provide all the required fields"
        })
    }
    const book=books.find((each)=>each.id===id);
    if(book){
        return res.status(409).json({
            success:false,
            message:"the book details already exists."
        })
    }
    books.push({
        id,
        Name,
        author,
        genre,
        price,
        publisher
    })
    res.status(201).json({
        success: true,
        data: books,
        message: "Book created successfully"
    })
});

router.put('/:id',(req,res)=>{
    const {id}=req.params;
    const {Name,author,genre,price,publisher}=req.body;
    const book=books.find((each)=>each.id===id);
    if(!book){
        return res.status(404).json({
            success: false,
            message: `Book not found at id: ${id}`
        })
    }
    // Object.assign(user,data);
    // const updateBook=books.map((each)=>{
    //     if (each.id===id){
    //         return{
    //             ...each,
    //             ...data
    //         }
    //     }
    //     return each;
    // })

    //update the book details
    book.id=id;
    book.Name=Name;
    book.author=author;
    book.genre=genre;
    book.price=price;
    book.publisher=publisher;

    res.status(200).json({
        success: true,
        data: book,
        message: `Book data is updated successfully`
    })
});

router.delete('/:id',(req,res)=>{
    const {id}=req.params;
    const book=books.find((each)=>each.id===id);
    if(!book){
        return res.status(404).json({
            success: false,
            message: `Books not found at id: ${id}`
        })
    }
    const updateBook=books.filter((each)=>each.id!==id);
    res.status(200).json({
        success: true,
        data:updateBook,
        message: "book deleted successfully"
    })
});

router.get('/issued/for-users',(req,res)=>{
    // const issuedBooks=books.filter((each)=>each.issued===true);
    const userWithIssuedBooks=users.filter((each)=>{
        if(each.issuedBook){
            return each;
        }
    })
    const issuedBooks=[];
    userWithIssuedBooks.forEach((each)=>{
        const book=books.find((book)=>book.id===each.issuedBook);

        book.issuedBy=each.Name;
        book.issuedDate=each.issuedDate;
        book.returnDate=each.issuedDate;

        issuedBooks.push(book)
    })
    if(!issuedBooks===0){
        return res.status(404).json({
            success:false,
            message:'No books issued yet'
        })
    }

    res.status(200).json({
        success: true,
        data: issuedBooks
    })
})

module.exports=router;
