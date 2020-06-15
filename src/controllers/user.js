import log4js from '../config/log4js';
const logger = log4js.getLogger('USER-CTRL');
var firebase = require('firebase');

firebase.initializeApp({
    serviceAccout: './dvara-80c54-firebase-adminsdk-12hf1-bf4efa80ef.json',
    databaseURL: 'https://dvara-80c54.firebaseio.com/'
});

logger.debug('Connected to Firebase');
var dbRef = firebase.database().ref('Files');


export const getData = async (req, res, next) => {
    var farmer_id;
    var cattle_id;
    if (req.body && req.body.CATTLE_ID) {
        if(!req.body.FARMER_ID) {
            return res.json({message: 'FARMER_ID is missing'});
        }
        farmer_id = req.body.FARMER_ID;
        cattle_id = req.body.CATTLE_ID;
    }
    else if (req.body && req.body.FARMER_ID) {
        farmer_id = req.body.FARMER_ID;
    }
    else    return res.json({message: 'FARMER_ID is missing'});
    var return_data;
    if (farmer_id && !cattle_id) {
        var user_data;
        dbRef.child(farmer_id).once('value').then(snapshot => {
            user_data = snapshot.val();
            if (user_data) {
                logger.debug('Got the User data');
                return_data = user_data.personal_details;
                return_data['Total_Cattle'] = Object.keys(user_data.cattles).length;
                return res.json(return_data);
            }
            else return res.json({message: 'Not Found'});
        }).catch(err=> {
            logger.error(err);
        });
    }
    if (farmer_id && cattle_id) {
        var user_data;
        dbRef.child(farmer_id).child('cattles').orderByChild('cattle_ID').equalTo(cattle_id).once('value').then(snapshot => {
            user_data = snapshot.val();
            if (user_data) {
                logger.debug('Got the User data');
                return_data = user_data;
                return res.json(return_data);
            }
            else return res.json({message: 'Not Found'});
        }).catch(err => {
            logger.error(err);
        });
    }
};
