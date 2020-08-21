const router = require('express').Router()
const crypto = require('crypto')
const fs = require('fs')
const Sequelize = require("sequelize")
const Op = Sequelize.Op
const models = require('./models')
const { log } = require('console')
const url = require('url')

router.get('/', (req, res) => {
    // fs.readFile('start.html',function (err, data){
    //     res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
    //     res.write(data);
    //     res.end();
    // });
    models.Profile.findAll({
        attributes: [ 'profileName' ],
        order: [
            ['profileName', 'ASC'],
        ],
      }).then(profiles => {
     
        res.render('home', {
          horses: profiles.map(profiles =>profiles.profileName)
        })
      }).catch(error => {
        res.status(500).send("Something went wrong")
      })
})

router.get('/calculate/:profile', (req, res) => {
    
    models.Profile.findOne({
        where: { profileName: req.params.profile }
    }).then(profile => {
        if (!profile) return res.status(404).status('Profile! Not found.<br><a href="/">Tillbaka till startsidan</a>')

        let horse_ration = [];

        if (req.query.q) {
            models.Ration.findOne({
                where: {rationId: req.query.q}
            }).then(rations => {
                
                
                // Get the data.
                let amount = JSON.parse(rations.rationAmount);
                let ts = JSON.parse(rations.rationTs);
                let mj = JSON.parse(rations.rationMj);
                let smrp = JSON.parse(rations.rationSmrp);
                let ca = JSON.parse(rations.rationCa);
                let p = JSON.parse(rations.rationP);
                let mg = JSON.parse(rations.rationMg);
                let selenium = JSON.parse(rations.rationSelenium);
                
                // Collect values from the same "row".
                for (let i = 0; i < amount.length; i++) { 
                    horse_ration[i] = {
                        'amount': amount[i],
                        'ts': ts[i],
                        'mj': mj[i],
                        'smrp': smrp[i],
                        'ca': ca[i],
                        'p': p[i],
                        'mg': mg[i],
                        'selenium': selenium[i]
                    }  
                }
                
            }) 
        }
        
        res.render('calculate', {
            name: profile.profileName,
            born: profile.profileBorn,
            gender: profile.profileGender,
            weight: profile.profileWeight,
            type: profile.profileType,
            look: profile.profileLook,
            walk: profile.profileWalk,
            trotCanter: profile.profileTrotCanter,
            horse_ration: horse_ration,
            ration_id: req.query.q,
            
        })
    })

    console.log(req.query.q)
})

router.post('/calculate/:profile', (req, res) => {
    console.log(req)
    models.Profile.findOne({
        where: { profileName: req.params.profile }
    }).then(profile => {
        if (!profile) return res.status(404).status('Profile! Not found.<br><a href="/">Tillbaka till startsidan</a>')
        let profile_name = profile.profileName;
        let amount;
        let ts;
        let mj;
        let smrp;
        let ca;
        let p;
        let mg;
        let selenium;
        console.log(req.body)
        if (Array.isArray(req.body.amount)) {
            amount = JSON.stringify(req.body.amount)
            ts = JSON.stringify(req.body.solids)
            mj = JSON.stringify(req.body.mj)
            smrp =  JSON.stringify(req.body.smrp)
            ca = JSON.stringify(req.body.ca)
            p = JSON.stringify(req.body.p)
            mg =  JSON.stringify(req.body.mg)
            selenium = JSON.stringify(req.body.selenium)
        }
        else {
            amount = JSON.stringify([req.body.amount])
            ts = JSON.stringify([req.body.solids])
            mj = JSON.stringify([req.body.mj])
            smrp =  JSON.stringify([req.body.smrp])
            ca = JSON.stringify([req.body.ca])
            p = JSON.stringify([req.body.p])
            mg =  JSON.stringify([req.body.mg])
            selenium = JSON.stringify([req.body.selenium])
        }

        if (req.query.rid) {
            // check if we have a ration with that id.
            models.Ration.findOne({
                where: {rationId: req.query.rid}
            }).then(ration => {
                if (!ration) return res.status(404).status('Ration Not found.<br><a href="//calculate">Tillbaka till beräkningssidan</a>')
                
                    ration.rationAmount = amount,
                    ration.rationTs = ts,
                    ration.rationMj = mj,
                    ration.rationSmrp = smrp,
                    ration.rationCa = ca,
                    ration.rationP = p,
                    ration.rationMg = mg,
                    ration.rationSelenium = selenium,
            
                ration.save().then(name =>{

                    // Create url to send user to profile page.
                    let redirect_url = url.format({
                        protocol: req.protocol,
                        host: req.get('host'),
                        pathname: '/profile/' + profile_name
                      });

                    // Update values for the ration.
                    ration.reload();

                    // Redirect user to profile page when done.
                    res.redirect(redirect_url)
                
                }).catch(error=>{
                    console.log(error)
        
                    if (error)
                    res.status(500).status("Something went wrong")
                })
            })
        }
        else {

            // No errors, validation is done frontend, create profile.
            models.Ration.create({
                rationAmount: amount,
                rationTs: ts,
                rationMj: mj,
                rationSmrp: smrp,
                rationCa: ca,
                rationP: p,
                rationMg: mg,
                rationSelenium: selenium,
                profileId: profile.profileId
            }).then(ration=>{
                
                  // Create url to send user to profile page.
                  let redirect_url = url.format({
                    protocol: req.protocol,
                    host: req.get('host'),
                    pathname: '/profile/' + profile_name
                  });

                  res.redirect(redirect_url)

                
            }).catch(error=>{
                console.log(error)
                
                if (error)
                res.status(500).status("Something went wrong")
            })
        }
    })
})

router.get('/calculator', (req, res) => {
    res.render('calculator')
})

router.get('/profiles/:profileName?', (req, res) => { 
    if (req.query.profileName) {
        models.Profile.findAll({
            where: {
                profileName: {
                    [Op.like]: '%' + req.query.profileName + '%' }
                }
        }).then(profiles => {    
            if (!profiles) return res.status(404).status('Profile! Not found.<br><a href="/">Tillbaka till startsidan</a>')
            res.render('profiles', {
                horses: profiles.map(profiles =>profiles.profileName)
              })
            }).catch(error => {
              res.status(500).send("Something went wrong " + error)
        })
    }
    else {
        models.Profile.findAll({
            attributes: [ 'profileName' ],
            order: [
                ['profileName', 'ASC'],
            ],
          }).then(profiles => {
         
            res.render('profiles', {
              horses: profiles.map(profiles =>profiles.profileName)
            })
          }).catch(error => {
            res.status(500).send("Something went wrong")
          })
    }

    
})

router.get('/profile/add', (req, res) => {
    res.render('add-profile')
})

router.post('/profile/add', (req, res) => {

    models.Profile.findOne({
        where: { profileName: req.body.name }
      }).then(name => {
        // if error return 500 error.
        if (name) return res.status(500, errorRun)

        // No errors, validation is done frontend, create profile.
        models.Profile.create({
            profileName: req.body.name,
            profileBorn: req.body.born,
            profileGender: req.body.gender,
            profileWeight: req.body.weight,
            profileType: req.body.type,
            profileLook: req.body.look,
            profileWalk: req.body.walk,
            profileTrotCanter: req.body.trotCanter
        }).then(name=>{
              // Create url to send user to profile page.
              let redirect_url = url.format({
                protocol: req.protocol,
                host: req.get('host'),
                pathname: '/profile/' + req.body.name
              });

              res.redirect(redirect_url)
        
        }).catch(error=>{
            console.log(error)

            if (error)
            res.status(500).status("Something went wrong")
        })
    })
})

// Display profile page.
router.get('/profile/:profile', (req, res) => {
    models.Profile.findOne({
        where: { profileName: req.params.profile }
    }).then(profile => {
        if (!profile) return res.status(404).status('Profile! Not found.<br><a href="/">Tillbaka till startsidan</a>')

        models.Ration.findAll({
            where: { profileId: profile.profileId}
        }). then(rations => {

            // Due to a stupid "bug" we have to do a workaround.
            const context = {
                horse_ration: rations.map(rations => {
                    return {
                        amount: JSON.parse(rations.rationAmount),
                        ts: JSON.parse(rations.rationTs),
                        mj: JSON.parse(rations.rationMj),
                        smrp: JSON.parse(rations.rationSmrp),
                        ca: JSON.parse(rations.rationCa),
                        p: JSON.parse(rations.rationP),
                        mg: JSON.parse(rations.rationMg),
                        selenium: JSON.parse(rations.rationSelenium),
                        id: rations.rationId,
                        edited: rations.updatedAt.toISOString().split('T')[0]
                    }
                })
            }
            
            res.render('profile', {
                name: profile.profileName,
                born: profile.profileBorn,
                gender: profile.profileGender,
                weight: profile.profileWeight,
                type: profile.profileType,
                look: profile.profileLook,
                walk: profile.profileWalk,
                trotCanter: profile.profileTrotCanter,
                rations: context.horse_ration,
            })
        })
    })
})

module.exports = router