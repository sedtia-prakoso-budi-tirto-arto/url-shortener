<template>
    <div class="flex justify-center items-center w-full h-screen bg-neutral-200 text-neutral-900">
    <div class="m-9 p-9 w-96 bg-neutral-50 shadow-lg" style="border-radius: 5%;">
      <h1 class="font-bold text-2xl text-center">Login</h1>
      <h1 class="text-sm text-center">please fill out the fields below correctly.</h1>

      <div class="mt-8">
        <div class="lg:col-span-2">
          <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
            
            <div class="md:col-span-5">
              <label for="email">Alamat Email</label>
              <input type="text" v-model="login_email" name="email" id="email" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="email@domain.com" />
            </div>
            
            <div class="md:col-span-5">
              <label for="password">Password</label>
              <input type="password" v-model="login_pass" name="password" id="password" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="password" />
            </div>

            <div class="md:col-span-5 text-center">
              <div class="mt-3 text-center">
                <button @click="login(login_email, login_pass)" v-on:keyup.enter="login()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
              </div>
              <div class="mt-3 text-center">
                <p>Don't have an account? <button @click="$router.push('/register')" style="color: #3F83F8;">Register</button></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
// import { db, auth } from "../firebase/firebase";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import Swal from 'sweetalert2';
// import axios from "axios";
// import cookies from "vue-cookies";

export default {
  data() {
    return {
      status: false,
    };
  },
  methods: {
    async login(email, password) {
      const auth = getAuth();
      const res = await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        Swal.fire({
              title: 'Success!',
              text: `Succesesfully login user ${email}`,
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
        });
        const user = userCredential.user;
        this.$router.push({ name: "dashboard" });
        // ...
      })
      .catch(
        (err) => {
          Swal.fire({
            title: 'Error!',
            text: `Seems like there is an error while login ${err}`,
            icon: 'error',
            timer: 1500,
            showConfirmButton: false,
          });
          console.log(err.code);
        }
      );
      // cookies.set("token", res._tokenResponse.idToken);
    },
    // checkForm() {
    //   let email = this.email;
    //   let password = this.password;
    //   if (email == "" || password == "") {
    //     alert("Ada yang kosong ngab")
    //     return false;
    //   }
    //   else{
    //     this.postUser();
    //   }
    // }
  },
};
</script>