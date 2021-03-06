import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'
import 'firebase/storage'
import { debug } from 'util';
import  guid  from 'guid';

const config = {
  apiKey: "AIzaSyAKs6HGdK3B0mJ7HAV3NWgWyXkzPAB8kXU",
  authDomain: "plant-service.firebaseapp.com",
  databaseURL: "https://plant-service.firebaseio.com",
  projectId: "plant-service",
  storageBucket: "plant-service.appspot.com",
  messagingSenderId: "1073198893164",
  appId: "1:1073198893164:web:9a74aab54a07e98f313049",
  measurementId: "G-CEM5VPERQG"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    
    
    this.db = app.database();
    this.auth = app.auth();
    this.storage = app.storage();

  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  user = uid => this.db.ref(`users/${uid}`); 

  users = () => this.db.ref('users');
  
  category = uid => this.db.ref(`categories/${uid}`);

  categories = () => this.db.ref("categories");

  archive = () => this.db.ref("archive");

  archivedProduct = (uid) => this.db.ref(`archive/${uid}`); 


  createOrder = (cart, user) => {

    if(!!!cart || cart.length == 0 || !user){
      console.log(cart);

      return Promise.reject(new Error("Invalid cart"));
    }
      
    let promises = [];

    cart.forEach(e => {
      let ref = this.db.ref('orders').push();

      console.log(ref);

      promises.push(ref.set({
        ...user,
        productId:e.key,
        purchaseTime:Date.now(),     
      }))
    })

    return Promise.all(promises);

  }

  onAuthUserListener = (next, fallback) =>
    
    this.auth.onAuthStateChanged(authUser => {
     
      if (authUser) {
        
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();
            
            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              //emailVerified: authUser.emailVerified,
              //providerData: authUser.providerData,
              ...dbUser,
            };
            
            // check if user is admin
            this.db.ref(`admins/${authUser.uid}/isAdmin`).once('value').then(snapshot => {
              if(snapshot.exists()){
                authUser = {
                  isAdmin: true,
                  ...authUser
                }
              }
            }).then(() => {
              next(authUser);
            })         
          });
      } else {
        fallback();
      }
    });
    
  
  productRef = () => this.db.ref("products");

  categoryRef = () => this.db.ref("categories");

  subCategoryRef = () => this.db.ref("categories/subCategories");

  getSubCategories = (categoryName) => {
    
  }

  product = (uid) => this.db.ref(`products/${uid}`);

  deleteCategory = (category, subCategory) =>{

    let productRef;
    console.log(category + " " + subCategory);

    if(!!!subCategory){
      productRef = 
        this.products()
          .orderByChild("category")
          .equalTo(category);

          this.db.ref(`categories/${category}`).remove();
    }
    else{
      productRef = 
        this.products()
          .orderByChild("categoryId")
          .equalTo(`${category}/${subCategory}`);

      this.db.ref(`categories/${category}/subCategories/${subCategory}`).remove();
    }

    productRef.once('value', (snapshot) => {
      snapshot.forEach(c => {
        console.log(c.key);
        this.archiveProduct(c.key);
      })
    })
  }

  setCategoryVisible = (category, subcategory, visible) => {
    let update = {visible};

    if(subcategory == null){
      let ref = this.db.ref(`categories/${category}`);
      ref.update(update);
    }
    else{
      console.log('asd');
      this.db.ref(`categories/${category}/subCategories/${subcategory}`).update(update);
    }
    
  } 



  
  archiveProduct = (uid) =>{
    this.product(uid).once('value', (snapshot) =>{
      if(snapshot.exists()){
        this.db.ref(`archive/${uid}`).set(snapshot.val())
         .then(() => this.product(uid).remove())      
      }
    })
  }

  //TODO:[Validation]
  editProduct = (uid, val) => {
    let updates = {};

    for(let [key, value] of Object.entries(val)){

      if((key == 'previewImage' ) && value != null && value[0]){
        console.log(value);
        console.log(value[0]);
        
        let ref = guid.create().value;
        this.storage.ref().child(ref).put(value[0])
        updates[key] = ref;
      }
      else if(value != null){
        updates[key] = value
      }
      
    }

    
    console.log(updates);

    this.createCategory(val.category, val.subCategory)
    updates['categoryId'] = this.getCategoryId(val.category, val.subCategory)

    return this.product(uid).update(updates);
  }

  createProductWithCategory = (category, subCategory) => {
    this.createProduct({
      category,
      subCategory,
      tags:'',
      name:"New Product",
      description:"Description...",
      details:'',
      price:0,
      previewImage:null,
      isPublic:false,
      model:''
    });
  }

  //getCategoryId = (product) => !!product ? this.getCategoryId(product.category, product.subCategory) : "";
  getCategoryId = (category, subCategory) => `${category}/${subCategory}`;



  deleteArchivedProduct = (uid) => {
    this.archivedProduct(uid).once('value', snapshot => {
      this.storage.ref().child(snapshot.val().previewImage).delete();
    });

    return this.archivedProduct(uid).remove();
  }

  deleteProduct = (uid) => {

    return this.product(uid).remove();
  }

    //restores archived product
  restoreArchivedProduct = (uid) => {
    
      //when restoring a product set visible to false
      this.db.ref(`archive/${uid}`).once('value', (snapshot) => {
          this.restoreProduct(snapshot.val()).then(()=> {
            this.db.ref(`archive/${uid}`).remove();
          })
      })
    }

  restoreProduct = (product) => {

    try{

      const {
        category,
        subCategory,
        tags,
        name,
        description,
        details,
        price,
        previewImage,
        isPublic,
        model} = product;

      let ref = this.categoryRef().child(`${product.category}/subCategories/${product.subCategory}`);


      // Check if category/subcategory exists
      return ref.once("value")
        .then((snapshot) => {
          if(!snapshot.exists()) {
            //console.log(snapshot.key);
            // Create new category if it doesent already exist
            return this.createCategory(product.category, product.subCategory)
          }
        })      
        // create the product
        .then(() => {

          this.productRef().push().set({
            categoryId:this.getCategoryId(category,subCategory),
            category,
            subCategory,
            tags,
            name,
            description,
            details,
            price,
            previewImage,
            isPublic:false,
            model
          })
        })
    }
    catch (err){     
      return Promise.reject(new Error(err));
    }
  }

  createProduct = (product) => {

    console.log(product);

    try{

      const {
        category,
        subCategory,
        tags,
        name,
        description,
        details,
        price,
        previewImage,
        isPublic,
        model} = product;

      let ref = this.categoryRef().child(`${product.category}/subCategories/${product.subCategory}`);
      let imageRef = "null.jpg" 

      // default image refs, if no image is selected
      let previewImageRef = "null.jpg"; 

      // Check if category/subcategory exists
      return ref.once("value")
        .then((snapshot) => {
          if(!snapshot.exists()) {
            //console.log(snapshot.key);
            // Create new category if it doesent already exist
            return this.createCategory(product.category, product.subCategory)
          }
        })      
        .then(() => {

          let promises = []

          // upload the images to firebase storage
          if(previewImage != null && previewImage[0]){
            
            previewImageRef = guid.create().value;               
            promises.push(this.storage.ref().child(previewImageRef).put(previewImage[0]))
          }

          return Promise.all(promises);
        })
        // create the product
        .then(() => {

          this.productRef().push().set({
            categoryId:this.getCategoryId(category,subCategory),
            category,
            subCategory,
            tags,
            name,
            description,
            details,
            price,
            previewImage:previewImageRef,
            isPublic,
            model
          })
        })
    }
    catch (err){     
      return Promise.reject(new Error(err));
    }
  }

  createCategory = (category, subCategory) =>{
    try{
      let ref = this.categoryRef().child(category);
      let childRef = ref.child(`subCategories/${subCategory}`);

      return ref.once("value")
        .then((snapshot) => {
          if(snapshot.exists() && snapshot.child(`subCategories/${subCategory}`).exists()){
            throw "Category already exists"
          }
          else{

            if(!!category && !snapshot.exists())
              ref.set({visible:"true"});

            if(!!subCategory)
              childRef.set({visible:"true", id:`${category}/${subCategory}`});   //TODO:[Database] Think of better way to store ids  
          }
        })   
    }
    catch(err){
      return Promise.reject(new Error(err));
    }
  }


  orders = () => this.db.ref('orders');

  order = uid => this.db.ref(`orders/${uid}`);

  product = uid => this.db.ref(`products/${uid}`);

  products = () => this.db.ref("products");
  
  /*
     User - id, role, name, cart
     Category - id, name, isSubCategory
     Tag - id, name
     Product - id, Category, SubCategory, Tags, description, price,  
  */
}

export default Firebase;