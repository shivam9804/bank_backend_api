const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
var session = require('express-session');
var flash = require('express-flash');
const fileUpload = require('express-fileupload');

//routes
const customer = require('./routes/customer.routes.js');
const employee = require('./routes/employee.routes.js');
const service = require('./routes/service.routes');
const getInTouch = require('./routes/gteintouch.routes');
const customerLogin = require('./routes/customerLogin.routes');
const pages = require('./routes/pages.routes');
const logout =  require('./routes/logout.routes');
const applyNow = require('./routes/applyNow.routes');
const employeeLogin = require('./routes/employeeLogin.routes');
const updateLoanStatus = require('./routes/updateLoanStatus.routes');

const app = express();
app.use(express.static(__dirname + '/public'));

//setting template engine
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

// setting cors
app.use(cors());

//display messages
app.use(flash());

//setting session configuration
app.use(session({
    name: process.env.SESSSION_NAME,
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,
        maxAge: Number(process.env.SESSION_AGE)
    }
}));

//to use json and parse the form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(fileUpload());

const ports = process.env.PORT || 3000;

app.use('/', pages);
app.use('/customer', customer);
app.use('/employee', employee);
app.use('/service', service);
app.use('/getInTouch', getInTouch);
app.use('/customerLogin', customerLogin);
app.use('/logout', logout);
app.use('/applynow', applyNow);
app.use('/employeeLogin', employeeLogin);
app.use('/updateloanstatus', updateLoanStatus);


app.listen(ports, () => console.log(`Listening on port ${ports}`));