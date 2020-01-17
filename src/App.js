import React, { useEffect, useState } from "react";
import CardList from "./component/CardList";
import ShoppingCart from "./component/ShoppingCart";
import ShoppingCartProvider from "./context/ShoppingCartContext";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Message, Button } from "rbx";

const firebaseConfig = {
  apiKey: "AIzaSyDRPW_7KE1FJUDHFL9FeIY-Ol9rzujCVYI",
  authDomain: "new-shopping-cart-1cc6f.firebaseapp.com",
  databaseURL: "https://new-shopping-cart-1cc6f.firebaseio.com",
  projectId: "new-shopping-cart-1cc6f",
  storageBucket: "new-shopping-cart-1cc6f.appspot.com",
  messagingSenderId: "301699650046",
  appId: "1:301699650046:web:cb622e449156875ad1b0af",
  measurementId: "G-JJ0L2ZFN64"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

const Banner = ({ user }) => (
  <React.Fragment>{user ? <Welcome user={user} /> : <SignIn />}</React.Fragment>
);

const SignIn = () => (
  <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
);

const Welcome = ({ user }) => (
  <Message color="info">
    <Message.Header>
      Welcome, {user.displayName}
      <Button primary onClick={() => firebase.auth().signOut()}>
        Log out
      </Button>
    </Message.Header>
  </Message>
);

const App = () => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState({});
  const [inventory, setInventory] = useState({});

  const products = Object.values(data);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/data/products.json");
      const json = await response.json();
      setData(json);
    };

    fetchProducts();

    const handleInventory = snap => {
      if (snap.val()) setInventory(snap.val());
    };
    db.on("value", handleInventory, error => alert(error));
    return () => {
      db.off("value", handleInventory);
    };
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  //google login button under the sidebar
  return (
    <ShoppingCartProvider>
      <ul>
        <ShoppingCart />
        <Banner user={user} />
        <CardList
          products={products}
          inventory={inventory}
          setInventory={setInventory}
        />
      </ul>
    </ShoppingCartProvider>
  );
};

export default App;
