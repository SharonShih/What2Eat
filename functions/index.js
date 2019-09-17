const functions = require('firebase-functions');
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.createGroup = functions.https.onRequest((request, response) => {
  let body = JSON.parse(request.body)
  let userId = body.userId
  if (request.method !== 'POST') {
    return response.status(400).send('Request Not allowed')
  }
  function storeGroup() {
    function generateId() {
      const chars = '0123456789'
      let autoId = ''
      for (let i = 0; i < 6; i++) {
        autoId += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      return autoId
    }
    let autoId = generateId();
    const groupRef = db.collection('groups').doc(autoId)
    let docSnapshot = groupRef.get()
    if (!docSnapshot.exists) {
      groupRef.set({
        groupOwner: userId,
        groupMember: [userId],
        result: '',
      }) // create the document
        .then(() => {
          return response.status(200).send(autoId)
        })
        .catch((err) => {
          return response.status(500).send(err.message)
        })
    } else {
      this.storeGroup();
    }
  }
  storeGroup();
});

exports.joinGroup = functions.https.onRequest((request, response) => {
  let body = JSON.parse(request.body)
  let userId = body.userId
  if (request.method !== 'POST') {
    return response.status(400).send('Request Not allowed')
  }

})