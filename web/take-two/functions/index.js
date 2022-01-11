const express = require("express");
const admin = require("firebase-admin");
const functions = require('firebase-functions');
const app = express();
const cred = require("./volunity-creds.json");

admin.initializeApp({
  credential: admin.credential.cert(cred),
  databaseURL: "nope"
});

const db = admin.firestore();


app.get("/", async (req, res) => {
  return res.send("ack");
})

// Get all opportunities
app.get("/opportunities", async (req, res) => {
  const snapshot = await db.collection("opportunities").get();
  const ops = [];
  snapshot.forEach((doc) => {
    ops.push(doc.data());
  });
  return res.json({ msg: "Success", data: ops });
});

// Create opportunity
app.post("/opportunities", async (req, res) => {
  const body = req.body;
  const docRef = await db.collection("opportunities").doc(body.title);
  const exists = await docRef.get().then((doc) => {
    if (doc.exists) {
      return true;
    } else {
      return false;
    }
  });
  if (exists) {
    return res.send({ msg: "Error, opportunity already exists" });
  } else {
    const data = await docRef.set(req.body);
    return res.send({ msg: "Success", data: data });
  }
});

app.post("/orgUser", async (req, res) => {
  const body = req.body;
  console.log(body)
  const docRef = await db.collection("organizations").doc(body.uid);
  const exists = await docRef.get().then((doc) => {
    if (doc.exists) {
      return true;
    } else {
      return false;
    }
  });
  if (exists) {
    return res.send({ msg: "Error, user already exists" });
  } else {
    const data = await docRef.set(req.body);
    return res.send({ msg: "Success", data: data });
  }
})

exports.app = functions.https.onRequest(app);