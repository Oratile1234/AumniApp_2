const client = require('../../app/config/db.config');
const { json } = require('express')
const cloudinary = require('../cloudinary/cloudinary')

exports.getAll = (request, response) => {
     client.query ( `SELECT * FROM users ORDER BY employee_number`, (error,results) =>{
      if (error) {
        return response.status(400).json({
            error: "Error while trying to get companies from the database",
        });
       } 
       response.status(200).json(results.rows)
     });
} 

module.exports.updateStatus = async (request, res) => {
  const employee_number = parseInt(request.params.employee_number);
  const { account_status } = request.body;
  try {
    //get all post form the database
    const data = await client.query(
      `
            UPDATE users
            SET account_status = $2
            WHERE employee_number = $1`,
      [employee_number, account_status],
      (err, result) => {
        if (err) {
          //If payments are not available is not available
          console.error(err);
          return res.status(500).json({
            error: "Database error",
          });
        } else {
          res.status(200).send({ error: "suceesfully updated" });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error while creating post!", //Database connection error
    });
  }
};

module.exports.getByStatus = (request, response) => {
  const employement_status = request.params.employement_status;

  client.query(
    `select * from users where employement_status = $1`,
    [employement_status],
    (error, results) => {
      if (error) {
        return response.status(400).json({
          error: "Error while trying to get users from the database",
        });
      }
      response.status(200).json(results.rows);
    }
  );
};

module.exports.updateLookingStatus = async (request, res) => {
  const employee_number = parseInt(request.params.employee_number);
  const { looking } = request.body;
  try {
    //get all post form the database
    const data = await client.query(
      `
          UPDATE users
          SET looking = $2
          WHERE employee_number = $1`,
      [employee_number, looking],
      (err, result) => {
        if (err) {
          //If payments are not available is not available
          console.error(err);
          return res.status(500).json({
            error: "Database error",
          });
        } else {
          res.status(200).send({ error: "suceesfully updated" });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error while creating post!", //Database connection error
    });
  }
};

module.exports.getlooking = (request, response) => {
  const looking = request.params.looking;

  client.query(
    `select * from users where looking = $1`,
    [looking],
    (error, results) => {
      if (error) {
        return response.status(400).json({
          error: "Error while trying to get users from the database",
        });
      }
      response.status(200).json(results.rows);
    }
  );
};

// search employee by skills
exports.search = (request, response) => {
  const name = request.params.name;

  client.query(
    "SELECT * FROM users WHERE name = $1",
    [name],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

//  get employee by Id
exports.getById = (request, response) => {
  const employee_number = request.params.employee_number;
  client.query(
    `SELECT * FROM users where employee_number = $1`,
    [employee_number],
    (error, results) => {
      if (error) {
        return response.status(400).json({
          error: "Error while trying to get users from the database",
        });
      }
      response.status(200).json(results.rows)
    })
}

module.exports.updatePicture = (request, response) => {
  const id = parseInt(request.params.id)
  var val = 0

  const now = new Date()
  const time_stamp = now.toLocaleString("af-ZA")

  client.query(
    `UPDATE users 
      SET image = imagenew
      FROM (SELECT imagenew, user_id,id FROM notifications ) AS subquery
      WHERE users.employee_number = subquery.user_id
      AND subquery.id = $1`,
    [id], (error, results) => {
      val = 1
      if (val == 1) {
       client.query(
          `UPDATE notifications SET deleted = true, user_time_stamp = $2, response = true WHERE id = $1`,
          [id, time_stamp], (error, results) => {
            if (error) {
              return response.status(401).send({ message: "query error, unable to delete notification" })
            }
            return response.status(200).json(results.rows)
          })
      // } else {
      //   if (error) {
      //     console.log(error)
      //     return response.status(401).send({ message: "query error, unable to update" })
      //   }
      //   return response.status(200).send({ message: "User profile updated successfully" })
      }
    }) 
}

module.exports.InsertPicture = async (request, response) => {

  const user_id = parseInt(request.params.user_id)

  const now = new Date()
  const time_stamp = now.toLocaleString("af-ZA")

  const result = await cloudinary.uploader.upload(request.file.path, {
    folder: "/user_profile/",
  });
   
  client.query(
    `INSERT INTO notifications(imagenew, user_id, time_stamp, notifs_company_id) VALUES ($1,$2,$3,(select company_id from users where employee_number = $2))`,
    [result.secure_url, user_id, time_stamp], (error, results) => {
      if (error) {
        return response.status(401).send({ message: "query error, unable to update" })
      }
      return response.status(200).send({ message: "User profile updated successfully" })
    })

}

module.exports.acceptUserNotifs = (request, response) => {

  const user_id = parseInt(request.params.user_id)
  const now = new Date()
  const user_time_stamp = now.toLocaleString("af-ZA")

  client.query(
    `UPDATE notifications SET response = $3, user_time_stamp = $2
    WHERE user_id = $1`,
    [user_id, user_time_stamp,true], (error, results) => {
      if (error) {
        return response.status(401).send({ message: "query error, unable to get user notifications" })
      }
      return response.status(200).send({ message: "User notification updated successfully" })
    })
}

module.exports.declineUserNotifs = (request, response) => {

  const user_id = parseInt(request.params.user_id)
  const now = new Date()
  const user_time_stamp = now.toLocaleString("af-ZA")

  client.query(
    `UPDATE notifications SET response = $3, user_time_stamp = $2
    WHERE user_id = $1`,
    [user_id, user_time_stamp,false], (error, results) => {
      if (error) {
        return response.status(401).send({ message: "query error, unable to get user notifications" })
      }
      return response.status(200).send({ message: "User notification updated successfully" })
    })
}

exports.getUserNotifs = (request, response) => {

  const user_id = parseInt(request.params.user_id)
  
  client.query(
    `SELECT * FROM notifications WHERE user_id = $1
    ORDER BY user_time_stamp DESC`,
    [user_id], (error, results) => {
      if (error) {
        return response.status(400).json({
          error: "Error while trying to get users from the database",
        });
      }
      response.status(200).json(results.rows)
    });
};
3