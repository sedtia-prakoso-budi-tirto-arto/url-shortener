<template>
    <div class="flex justify-center items-center w-full h-screen bg-neutral-200 text-neutral-900">
      <div class="m-9 p-9 w-96 bg-neutral-50 shadow-lg" style="border-radius: 5%;">
        <h1 class="font-bold text-2xl text-center">Registrasi</h1>
        <!-- <h1 class="text-sm text-center">Please fill out all the fields.</h1> -->
  
        <div class="mt-8">
          <div class="lg:col-span-2">
            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div class="md:col-span-5">
                <!-- <label for="full_name">Nama Lengkap</label>
                <input type="text" name="full_name" id="full_name" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="nama" v-model="App.input.user.name" /> -->
                <label>Email</label><br />
                <input type="text" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="Email" v-model="email" required/>
              </div>
  
              <div class="md:col-span-5">
                <!-- <label for="email">Alamat Email</label>
                <input type="text" name="email" id="email" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" v-model="App.input.user.email" placeholder="email@domain.com" /> -->
                <label class="password">Password</label><br />
                <input type="password" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="Password" v-model="password" required/>
              </div>
  
              <div class="md:col-span-5 text-center">
                <div class="mt-3 text-center">
                  <!-- <button @click="App.addUser(App.input.user)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button> -->
                  <button @click="postUser()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                </div>
                <div class="mt-3 text-center">
                  <p>Have an account? | <button @click="$router.push('/')" >Login</button></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  </template>

  <script>
import axios from "axios";
import Swal from 'sweetalert2';
export default {
    data() {
      return {
      };
    },
    methods: {
    async postUser() {
            await axios.post(`http://127.0.0.1:3000/api/register`, {
                email: this.email,
                password: this.password
            })
            .then((response) => {
              if(response.status) {
                Swal.fire({
                  title: 'Success!',
                  text: `Succesesfully added user ${this.email}`,
                  icon: 'success',
                  timer: 1500,
                  showConfirmButton: false,
                });
                this.$router.push({name : "login"});
                console.log(response);
                status: success;
              }
            },
            (error) => {
                console.log(response);
                status: failed;
            });
    }
    
    },
    mounted() {
    },
};
</script>