const client = require("../../app/config/db.config");
const { json } = require("express");
const { request } = require("express");
const { response } = require("express");
const { async } = require("q");

//get all data from skills
exports.getAll = (request, response) => {
    client.query(`SELECT * FROM Skills`, (error, results) => {
        if (error) {
            return response.status(400).json({
                error: "Error while trying to get users from the database",
            });
        }
        response.status(200).json(results.rows);
    });
};

// INSERT INTO SKILLS TABLE
module.exports.skills = (request, response) => {
    const { description, id } = request.body;
    try {
        client.query(
            `INSERT INTO Skills (description) VALUES ($1) `, [description],
            (error, results) => {
                if (error) {
                    return response.status(400).json({
                        error: "Database error",
                    });
                }
                response.status(200).json(results.rows);
            }
        );
    } catch (err) {
        console.log(err);
        response.status(500).json({
            error: "Database error while inserting the skills!",
        });
    }
};

//get all from Expertise table
exports.getExpertise = (request, response) => {
    client.query(`SELECT * FROM Expertise`, (error, results) => {
        if (error) {
            return response.status(400).json({
                error: "Error while trying to get users from the database",
            });
        }
        response.status(200).json(results.rows);
    });
};

//INSERT INTO EXPERTISE TABLE
module.exports.expertise = (request, response) => {
    const { description } = request.body;
    try {
        client.query(
            `INSERT INTO Expertise (description) VALUES ($1)`, [description],
            (error, results) => {
                if (error) {
                    return response.status(400).json({
                        error: error,
                    });
                }
                response.status(200).json(results.rows);
            }
        );
    } catch (err) {
        console.log(err);
        response.status(500).json({
            error: "Database error while inserting into Education!",
        });
    }
};

//UPDATE SUMMARY
module.exports.updateSummary = async (request, response) => {

    const { summary } = request.body;
    const user_id = parseInt(request.params.user_id)
    try {
            client.query(
                `UPDATE Portfolio SET summary = $2 WHERE user_id = $1`,
                [user_id,summary],
                (error, results) => {
                    if (error) {
                        return response.status(400).json({
                            error: error,
                        });

                    }
                    response.status(200).json(results.rows);
                }
            );
        }
    catch (err) {
        console.log(err);
        response.status(500).json({
            error: "Database error while inserting to my portfolio!",
        });
    }
};

//Update skills ratings
module.exports.updateRatings = async (request, response) => {

    const { ratings, skill_id } = request.body;
    const user_id = parseInt(request.params.user_id)
    try {
            client.query(
                `UPDATE mySkills SET ratings = $2 WHERE user_id = $1 and skill_id = $3`,
                [user_id,ratings,skill_id],
                (error, results) => {
                    if (error) {
                        return response.status(400).json({
                            error: error,
                        });

                    }
                    response.status(200).json(results.rows);
                }
            );
        }
    catch (err) {
        console.log(err);
        response.status(500).json({
            error: "Database error",
        });
    }
};


//portfolio
module.exports.portfolio = async(request, response) => {
    const { summary } = request.body;
    const user_id = parseInt(request.params.user_id)
    try { const data = await client.query(
        `SELECT * FROM portfolio WHERE user_id = $1`,
        [user_id]
    );
    const regdata =  data.rows;
    if (regdata.length != 0) {
        return response.status(400).send({
            error: "Summary already exist, No need to add again.",
        });
    } else 
    {
        client.query(
            `INSERT INTO portfolio (summary,user_id) VALUES($1,$2)`,
            [summary, user_id],
            (error, results) => {
                if (error) {
                    return response.status(400).json({
                        error: "Database error",
                    });
                }
                response.status(200).json(results.rows);
            }
        );
    } 
}catch (err) {
        console.log(err);
        response.status(500).json({
            error: "Database error while inserting to my Summary!",
        });
    }
};
//UPDATE MYEXPERTISE
module.exports.update = async (request, response) => {

    const { skill_id, ratings } = request.body;
    const user_id = parseInt(request.params.user_id)
    try {
            client.query(
                `UPDATE mySkills SET ratings = $3 WHERE skill_id = $2 AND user_id = $1`,
                [user_id,skill_id,ratings],
                (error, results) => {
                    if (error) {
                        return response.status(400).json({
                            error: error,
                        });

                    }
                    response.status(200).json(results.rows);
                }
            );
        }
    catch (err) {
        console.log(err);
        response.status(500).json({
            error: "Database error while inserting to my Skills!",
        });
    }
};

//INSERT INTO MYSKILLS TABLE 
module.exports.addSkills = async (request, response) => {

    const { ratings, skill_id, skill_description } = request.body;
    const user_id = parseInt(request.params.user_id)

    try {
        const data = await client.query(
            `SELECT * FROM mySkills WHERE skill_id = $1 and user_id = $2`,
            [skill_id,user_id]
        );
     
        const regdata = data.rows;
        if (regdata.length != 0) {
            return response.status(400).send({
                error: "Skill already exist, No need to add again.",
            });
        } else 
        {

            client.query(
                `INSERT INTO myskills (user_id, skill_id, skill_description, ratings) VALUES($1,$2,$3,$4)`, [user_id, skill_id, skill_description, ratings],
                (error, results) => {
                    if (error) {
                        return response.status(400).json({
                            error: error,
                        });

                    }
                    response.status(200).json(results.rows);
                }
            );
        }
    } catch (err) {
        console.log(err);
        response.status(500).json({
            error: "Database error while inserting to my skills!",
        });
    }
    console.log('Rating ', ratings, 'Skill ID', skill_id,'skill name', skill_description);
    console.log('userID', user_id);
};

//ADD INTO MYEXPERTISE TABLE
module.exports.addExpertise = async (request, response) => {

    const { expertise_id, description } = request.body;
    const user_id = parseInt(request.params.user_id)
    try {
        const data = await client.query(
            `SELECT * FROM myExpertise WHERE expertise_id = $1 and user_id = $2`,
            [expertise_id,user_id]
        );
        const regdata = data.rows;
        if (regdata.length != 0) {
            return response.status(400).send({
                error: "Expertise  already exist, No need to add again.",
            });
        } else {
            client.query(
                `INSERT INTO myExpertise (expertise_id,user_id, description) VALUES($1,$2,$3)`, [expertise_id, user_id, description],
                (error, results) => {
                    if (error) {
                        return response.status(400).json({
                            error: "Database error",
                        });
                    }
                    response.status(200).json(results.rows);
                }
            );
        }
    } catch (err) {
        console.log(err);
        response.status(500).json({
            error: "Database error while inserting to my Expertise!",
        });
    }
};

//get all data from projects
module.exports.getprojects = (request, response) => {
    const employee_number = parseInt(request.params.employee_number);

    client.query(
        `SELECT * FROM Projects where user_id =$1`, [employee_number],
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

//Insert into projects
module.exports.addProjects = (request, response) => {
    const { title, description } = request.body;
    const user_id = parseInt(request.params.user_id)
    try {
        client.query(
            `INSERT INTO projects (user_id, title, description) VALUES($1,$2,$3)`, [user_id, title, description],
            (error, results) => {
                if (error) {
                    return response.status(400).json({
                        error: "Database error",
                    });
                }
                response.status(200).json(results.rows);
            }
        );
    } catch (err) {
        console.log(err);
        response.status(500).json({
            error: "Database error while inserting to my skills!",
        });
    };
}

//GET  MYSKILLS 
module.exports.getMySkills = (request, response) => {

    const user_id = request.params.user_id

    client.query(`SELECT * FROM mySkills WHERE user_id = $1`, [user_id],
        (error, results) => {
            if (error) {
                return response.status(400).json({
                    error: "Error while trying to get users from the database",
                });
            }
            response.status(200).json(results.rows);
        });
};

//GET EXPERTISE
module.exports.getMyExpertise = (request, response) => {

    const user_id = request.params.user_id

    client.query(`SELECT * FROM myExpertise WHERE user_id = $1`, [user_id],
        (error, results) => {
            if (error) {
                return response.status(400).json({
                    error: "Error while trying to get users from the database",
                });
            }
            response.status(200).json(results.rows);
        });
};

//Get from portfolio
module.exports.getPortfolio = (request, response) => {
    const user_id = parseInt(request.params.user_id);

    client.query(
        `SELECT * FROM Portfolio WHERE user_id = $1`, [user_id],
        (error, results) => {
            if (error) {
                return response.status(400).json({
                    error: "Error while trying to get users from the database",
                });
            }
            response.status(200).json(results.rows);
        }
    );
}

//Delete Project
module.exports.deleteProject = (request, response) => {

    const id = parseInt(request.params.id)
//  const id = request.params.id

    client.query(`DELETE FROM projects WHERE id = $1`, [id],
        (error, results) => {
            if (error) {
                return response.status(400).json({
                    error: "Error while trying to delete project"
                });
            }
            response.status(200).json(results.rows);
        });
};

