var mysql = require('mysql');

var inquirer = require("inquirer");

var connnection = mysql.createConnection({
    host:"localhost",
    port:3300,
    user:"root",
    password:"root",
    database:"bamazon"
})

connection.connnect(function(err){
    if(err)throw err;
    console.log("connection successful!");
    makeTable();

})

var MakeTable = function(){
    connection.query("SELECT * FROM product", function(er,res){
        for(var i=0; i<res.length; i++){
            console.log(res[i].itemid+" || " +res[i].productname+ "||" + res[i].departmentname+ "||" +res[i].price+ "||"
        +res.stockquantity+"\n");
        }

        promptCustomer(res);
    })


}

var promptCustomer =function(res){
    inquirer.prompt([{
        type:'input',
        name:'choice',
        message:"What do you wany?[Quit with Q]"
    }]).then(function(answer){
        var correct = false;
        for(var i=0;i <res.length; i++){
            if(res[i].productname==answer.choice){
                correct=true;
                var product=answer.choice;
                var id=i;
                inquirer.prompt({
                    type:"input",
                    name:"quant",
                    message:"How much yu want",
                    validate:function(value){
                       if(isNaN(value)==false){
                           return true;
                       }else{
                           return false;
                       } 
                    }

                });.then(function(answer){
                    if((re[id].stockquantity-answer.quant)>0){
                        connnection.query("UPDATE products SET stockquanity=' "+(res[id]. stockquantity))
                    }
                })
            }
        }
    })
}

