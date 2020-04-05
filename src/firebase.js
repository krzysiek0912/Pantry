import firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyCZzzfMIBFVCp7da4rWgzuw2PMDuyUyj0Q',
    authDomain: 'pantry-7e078.firebaseapp.com',
    databaseURL: 'https://pantry-7e078.firebaseio.com',
    projectId: 'pantry-7e078',
    storageBucket: 'pantry-7e078.appspot.com',
    messagingSenderId: '934391885510',
    appId: '1:934391885510:web:ce79a34df1b2ffd968f1c7',
};
firebase.initializeApp(config);

const db = firebase.firestore();
const productColection = db.collection('products');
const settingsColection = db.collection('settings');

export const getAllProducts = (order, callback = () => {}) => {
    productColection
        .orderBy(order)
        .get()
        .then((querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => doc.data());
            callback(data);
        });
};
export const getOneProductRequest = (id, callback = () => {}) => {
    productColection
        .where('id', '==', id)
        .get()
        .then((querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => doc.data());
            const product = data[0];
            callback(product);
        });
};
export const getOneSettingRequest = (settingName, callback = () => {}) => {
    settingsColection
        .where('name', '==', settingName)
        .get()
        .then((querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => doc.data());
            const settingValue = data[0].value;
            callback(settingValue);
        });
};

export const addNewProductRequest = (newProduct, callback = () => {}) => {
    const ref = productColection.doc();
    const id = ref.id;
    productColection
        .add({
            ...newProduct,
            id,
        })
        .then(callback(id));
};

export const editProductRequest = (editProduct, callback = () => {}) => {
    productColection
        .where('id', '==', editProduct.id)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.update(editProduct);
            });
        })
        .then(() => {
            callback();
        });
};
export const editSettingRequest = (settingName, newValue, callback = () => {}) => {
    settingsColection
        .where('name', '==', settingName)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.update({ value: newValue });
            });
        })
        .then((res) => {
            callback(res);
        });
};

export const deleteProductRequest = (deletedProductId, callback = () => {}) => {
    productColection
        .where('id', '==', deletedProductId)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.delete();
            });
        })
        .then(() => {
            callback();
        });
};

export default firebase;
