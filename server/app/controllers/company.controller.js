const client = require('../config/db.config');

module.exports.companyRegister = async (request, response) => {
    const { company_name, registration_number, email, phone_number, logo } = request.body

    try {
        const data = await client.query(`SELECT * FROM company WHERE registration_number = $1`, [registration_number]);
        const regData = data.rows;

        if (regData.length != 0) {
            return response.status(400).json({
                error: "Company already exist, No need to register again.",
            });
        }
        else {
            client.query(`INSERT INTO company (company_name,registration_number,email,phone_number,logo) VALUES ($1,$2,$3,$4,$5) returning company_id`,
                [company_name, registration_number, email, phone_number, logo], (error, results) => {
                    if (error) {
                        return response.status(500).json({
                            error: "Unable to post insert",
                        });
                    }
                    response.status(200).json(results.fields)
                })
        }
    }
    catch (err) {
        response.status(500).json({
            error: "Database error while registaring company!",
        });
    }
}


exports.getAllC = (request, response) => {
    client.query(`SELECT * FROM company`, (error, results) => {
        if (error) {
            return response.status(400).json({
                error: "Error while trying to get companies from the database",
            });
        }
        response.status(200).json(results.rows)
    })
}

exports.getCompanyById = (request, response) => {
    const company_id = request.params.company_id;
    client.query(`SELECT * FROM company where company_id = $1`, [company_id], (error, results) => {
        if (error) {
            return response.status(400).json({
                error: "Error while trying to get users from the database",
            });
        }
        response.status(200).json(results.rows)
    })
}

exports.getNotifications = (request, response) => {

    client.query(`SELECT * FROM users u 
                    INNER JOIN notifications n ON u.employee_number = n.user_id 
                    WHERE deleted = false AND u.company_id = n.notifs_company_id AND u.user_type = 2 
                    ORDER BY n.time_stamp DESC`, (error, results) => {
        if (error) {
            return response.status(400).json({
                error: "Error while trying to get notifications from the database",
            });
        }
        response.status(200).json(results.rows)
    })
}

exports.getNotified = (request, response) => {

    client.query(`SELECT * FROM users u 
                    INNER JOIN notifications n ON u.employee_number = n.user_id 
                    INNER JOIN company c ON n.notifs_company_id = u.company_id 
                    WHERE deleted = false ORDER BY time_stamp DESC`, (error, results) => {
        if (error) {
            return response.status(400).json({
                error: "Error while trying to get notifications from the database",
            });
        }
        response.status(200).json(results.rows)
    })
}

module.exports.ApprovePictureRequest = (request, response) => {

    const user_id = request.params.user_id

    try {
        client.query(
            `UPDATE notifications SET imageold = imagenew WHERE user_id = $1`,
            [user_id], (error, results) => {
                if (error) {
                    return response.status(401).send({ message: "query error, unable to update" })
                }
                return response.status(200).send({ message: "User profile picture updated successfully" })
            })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error while creating post!", //Database connection error
        });
    }

}

module.exports.softDeleteNotifications = (request, res) => {
    const id = parseInt(request.params.id);

    const now = new Date()
    const time_stamp = now.toLocaleString("af-ZA")
 
    client.query(
        `UPDATE notifications SET deleted = true, user_time_stamp = $2, response = false  WHERE id = $1`,
        [id, time_stamp], (error, results) => {
          if (error) {
            return response.status(401).send({ message: "query error, unable to delete notification" })
          }
          return response.status(200).json(results.rows)
        })
};

module.exports.addCompanyID = (request, response) => {

    const employee_number = request.params.user_id

    try {
        client.query(
            `UPDATE notifications 
                SET notifs_company_id = company_id
                FROM users
                WHERE users.employee_number = notifications.user_id
                AND users.employee_number = $1`,
            [employee_number], (error, results) => {
                if (error) {
                    return response.status(401).send({ message: "query error, unable to update" })
                }
                return response.status(200).send({ message: "User notifications updated successfully" })
            })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error while creating update!", //Database connection error
        });
    }

}