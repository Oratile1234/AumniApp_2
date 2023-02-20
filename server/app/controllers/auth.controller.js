const client = require("../config/db.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/auth.config");
const cloudinary = require("../cloudinary/cloudinary");

exports.register = async (request, response) => {
  const {
    image,
    name,
    surname,
    job_title,
    email,
    phone_number,
    password,
    employee_number,
    employement_status,
    looking,
    user_type,
    company_id,
  } = request.body;
  const account_status = true;

  try {
    const data = await client.query(
      `SELECT * FROM users WHERE employee_number = $1`,
      [employee_number]
    );
    const regdata = data.rows;
    // const image  = req.file.path;

    //           const profile = await cloudinary.uploader.upload(image, {
    //               folder: "/user_profile/",
    //           })
    if (regdata.length != 0) {
      return response.status(400).send({
        error: "Employee number already exist, No need to register again.",
      });
    } else {
      bcrypt.hash(password, 10, (error, hash) => {
        if (error) {
          response.status(500).json({
            error: "server error",
          });
        }
        const companyUsers = {
          image,
          name,
          surname,
          job_title,
          email,
          phone_number,
          password: hash,
          employee_number,
          employement_status,
          account_status,
          looking,
          user_type,
          company_id,
        };
        var flag = 1;

        client.query(
          `INSERT INTO users (employee_number,image,name,surname,job_title,email,phone_number,password,employement_status,account_status,looking,user_type,company_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13);`,
          [
            companyUsers.employee_number,
            companyUsers.image,
            companyUsers.name,
            companyUsers.surname,
            companyUsers.job_title,
            companyUsers.email,
            companyUsers.phone_number,
            companyUsers.password,
            companyUsers.employement_status,
            companyUsers.account_status,
            companyUsers.looking,
            companyUsers.user_type,
            companyUsers.company_id,
          ],
          (error) => {
            if (error) {
              flag = 0;
              console.error(error);
              return response.status(500).json({
                error: "Database error",
              });
            } else {
              flag = 1;
              response.status(200).send({ error: "User added to database" });
            }
          //   if (flag) {
          //     const  token  = jwt.sign({
          //       employee_number: companyUsers.employee_number}, process.env.SECRET_KEY
          //     );
          //     companyUsers.token = token
          //   };
          }
        );
      });
    }
  } catch {
    response.status(500).json({
      error: "Database error while registring user!",
    });
  }
};

exports.login = async (request, response) => {
  const { employee_number, password } = request.body;
  try {
    if (!(employee_number && password)) {
      res.status(400).json({ error: "user input required" });
    }

    const logData = await client.query(
      `SELECT * FROM users WHERE employee_number = $1;`,
      [employee_number]
    ); //Check if user exist
    arrData = logData.rows;

    if (arrData.length == 0) {
      response.status(400).json({
        error: "user doesn't exist",
      });
    } else {
      bcrypt.compare(password, arrData[0].password, (err, results) => {
        if (err) {
          response.status(500).json({
            error: "Server error",
          });
        } else if (results === true) {
          const token = jwt.sign(
            { employee_number: employee_number },
            SECRET_KEY,
            { expiresIn: "1m" }
          );
          logData.rows.token = token;
          response.status(200).json({
            error: "User successfully signed in",
            arrData,
            expiresIn: 60,
            token: token,
          });
        } else {
          //define errors
          if (results != true) {
            response.status(400).json({
              error: "incorrect password",
            });
          }
        }
      });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({
      error: "Database error while logging in!",
    });
  }
};

module.exports.logout = (req, res) => {
  res.status(200).json({ token: "" });
};

