<!-- <template>
    <div class="text-center">Shortener Link</div>
    <button @click="logout" type="button" class="inline-flex items-center rounded-md border border-transparent bg-gray-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
            Logout
          </button>
    <div class="relative flex justify-center flex-col overflow-hidden">
      <Navbar :name="this.nama_user" @logout="logout" class="pt-10"> </Navbar>
      <div
        class="flex flex-col justify-center w-full max-w-[900px] pt-32 mx-auto"
      >
        <input
          type="text"
          class="rounded-2xl text-base text-white py-4 px-10 bg-[#252836] focus:outline-2 focus:outline-[#08A0F7] active:outline-2 active:outline-[#08A0F7] hover:outline-1 hover:outline-[#08A0F7] outline-none w-full shadow-lg"
          name=""
          id=""
          placeholder="Paste url ..."
          v-model="url"
        />
        <div class="flex justify-between pt-7">
          <input
            type="text"
            class="rounded-2xl text-base text-white py-4 px-10 bg-[#252836] focus:outline-2 focus:outline-[#08A0F7] active:outline-2 active:outline-[#08A0F7] hover:outline-1 hover:outline-[#08A0F7] outline-none w-72 shadow-lg"
            placeholder="Alias (optional)"
            v-model="shorten"
          />
          <button
            class="py-4 px-16 rounded-xl font-bold text-white hover:text-slate-300 bg-[#08A0F7] shadow-lg hover:outline-2 hover:outline hover:outline-[#08A0F7]"
            @click="generateLink(url, shorten)"
          >
            Create
          </button>
        </div>
        <div
          class="font-semibold text-white rounded-xl py-3 text-center text-xl bg-gradient-to-r from-[#957ADC] to-[#4B89DD] tracking-widest mt-16 shadow-lg"
        >
          URL LIST
        </div>
        <div class="bg-[#252836] mt-8 mb-24 rounded-xl shadow-xl px-12 py-10">
          <div class="grid grid-cols-6 py-3" v-for="(link, index) in links" :key="index">
            <div
            class="text-white col-span-2 font-normal tracking-wider flex"
              @click="redirectLinks(link.alias)"
            >
              <p class="self-center">{{ link.alias }}</p>
            </div>
            <div class="text-[#08A0F7] col-span-3 tracking-wider flex">
              <p class="self-center hover:cursor-pointer truncate max-w-xs">
                {{ link.url }}
              </p>
            </div>
            <div
            class="font-bold text-white text-center rounded-2xl bg-[#957ADC] px-6 py-1 w-fit col-span-1 tracking-wider cursor-pointer"
            @click="$router.push(`/dashboard/url/${link.alias}`)"
            >
            <p class="self-center">Detail</p>
          </div>
          </div>
        </div>
      </div>
    </div>
  </template>

<script>

//   import axios from "axios";
//   import cookies from "vue-cookies";
//   import Navbar from "../components/Navbar.vue";
  import { auth } from "../firebase/firebase";
  import { signOut } from "@firebase/auth";
  import Swal from 'sweetalert2';
  // import Alert from "../components/Alert.vue";
  // const port = 3001;
  // const token = cookies.get("token");

  export default{
    methods: {
        async logout() {
        await signOut(auth)
        .then(() => {
        Swal.fire({
              title: 'Success!',
              text: `Succesesfully logout`,
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
        });
        // cookies.remove("token");
        this.$router.push({ name: "login" });
        })
        .catch((err) => console.log(err));
        }
    },
  }
  
</script> -->


<template>
  <nav class="menu-container">
  <input type="checkbox" aria-label="Toggle menu" />
    <a class="menu-logo"></a>
    <h2 class="font-bold text-2xl">Joko Kendil Moncrot</h2>
    <div class="menu">
        <ul>
        </ul>
        <ul>
        <li>
            <a @click="Logout()" class="font-bold text-2xl text-center">
              Logout
            </a>
        </li>
        </ul>
    </div>
</nav>
  <!-- <button @click="Logout()">Sign Out</button> -->

  <!-- <div class="inputlink ml-5">
    <input type="text" placeholder="link asli" class="type rounded" v-model="flink"/>
  </div> -->

  <div class="text-center">
    <!-- <h5 class="title">Joko Kendil ngecrit</h5> -->
    <input type="text" placeholder="http://domain.com or https://domain.com" class="type rounded" style="width: 500px;" v-model="flink"/>
    <input type="text" placeholder="alias" class="alias rounded ml-9" v-model="slink"/>
    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  @click="postLink()">Submit</button>
  </div>
  
  <div class="edit text-center mt-7" v-show="editbar">
    <input type="text" placeholder="new slink" v-model="newLink.newslink" />
    <input type="text" placeholder="new url" v-model="newLink.newflink"/>
    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="editHandler(newLink.id)">Submit Edit</button>
  </div>

  <!-- <div class="list" v-for="link in links" :key="link">
    <div class="box" v-if="link.uid == userID"> -->
      
  <div class="table-responsive" style="margin-top: 50px; margin-left: 13%;">
    <table class="table table-hover table-borderless table-striped text-center">
      <thead>
        <tr>
          <th scope="col">Alias</th>
          <th scope="col">Link</th>
          <th scope="col">Count</th>
        </tr>
      </thead>
      <tbody v-for="link in links" :key="link">
        <tr v-if="link.uid == userID">
          <th><a target="_blank" v-bind:href="link.flink">JokoKendilMoncrot/{{ link.slink }}</a></th>
          <td style="max-width: 500px; word-wrap: break-word;">{{ link.flink }}</td>
          <td scope="row">{{ link.uses }}</td>
          <td><button class="bg-yellow-400 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" @click="editLink(link.id)"> Edit </button></td>
          <td><button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" @click="deleteLink(link.id)"> Delete </button></td>
        </tr>
      </tbody>

    </table>
  </div>
</template>

<script>
import { initializeApp } from "firebase/app";
import { signOut, getAuth } from "firebase/auth"
import { auth } from '../firebase/firebase.js'

import axios from 'axios'

export default {
  data(){
    return {
      links: [],
      flink: "",
      slink: "",
      userID: "",
      newLink: [{
        id: "",
        newslink: "",
        newflink: "",
      }],
      editbar: false,
    }
  },
  methods: {
    async Logout() {
      try {
        signOut(auth)
        .then(() => {
          localStorage.removeItem('uid')
          this.$router.push("/")
        })
      }
      catch(error){
        console.log(error)
      }
    },
    async getLink() {
      this.userID = localStorage.getItem('uid')
      console.log(this.userID)
      const res = await axios.get('http://localhost:3000/link')
        .then((response)=>{
          this.links.push(...response.data)
          console.log(response.data)
        }
      )
    },
    async postLink() {
      const res = await axios.post('http://localhost:3000/link', {
        flink: this.flink,
        slink: this.slink,
        id: this.id,
        uid: this.userID,
        uses: 1,
      })
      .then((response) =>{
        console.log(response.data)
        location.reload()
      })
    },
    async deleteLink(id) {
      const res = await axios.delete('http://localhost:3000/link/' + id)
      .then((response)=>{
        console.log(response.data)
        location.reload()
      })
    },
    async editHandler(id) {
      const res = await axios.patch('http://localhost:3000/link/' + id, {
        newflink: this.newLink.newflink,
        newslink: this.newLink.newslink,
      })
      .then((response) => {
        location.reload()
        console.log(response)
      })
    },
    editLink(id){
      this.links.forEach((link) => {
        if(link.id == id){
          this.newLink.id = link.id
          this.newLink.newflink = link.flink
          this.newLink.newslink = link.slink
        }
      })
      this.editbar = true;
    },
  }, 
  mounted() {
    this.getLink();
  }
}
</script>

<style>
  .title {
    font-size: 50px;
  }
  .inputlink input{
    margin: 15px 1rem;
  }
  .box {
    display: flex;
    margin-bottom: 15px;
  }
  .content{
    margin-right: 50px;
  }
  .content {
	box-shadow: 3px 4px 0px 0px #8a2a21;
	background:linear-gradient(to bottom, #c62d1f 5%, #f24437 100%);
	background-color: "#c62d1f";
	border-radius: 25px;
	border: 3px solid #d02718;
	display: inline-block;
	cursor: pointer;
	color:#ffffff;
	font-family:Impact;
	font-size:12px;
	padding:4px 27px;
	text-decoration:none;
}
  /* button:hover {
	background:linear-gradient(to bottom, #f24437 5%, #c62d1f 100%);
	background-color:#001eff;
} */
button:active {
	position:relative;
	top:1px;
}
.type{
     padding: 4px 10px;
     font-size: 17px;
     border-width: 1px;
     border-color: #ff00e4;
     background-color: #ffffff;
     color: #000000;
     border-style: groove;
     border-radius: 12px;
     box-shadow: 0px 0px 3px rgba(66,66,66,.75);
}
 .type:focus {
     outline:none;
}
.alias{
     padding: 10px;
     font-size: 25px;
     border-width: 1px;
     border-color: #ff00e4;
     background-color: #ffffff;
     color: #000000;
     border-style: groove;
     border-radius: 12px;
     box-shadow: 0px 0px 3px rgba(66,66,66,.75);
}
 .alias:focus {
     outline:none;
}
.menu-container {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    background: #232323;
    color: #cdcdcd;
    padding: 20px;
    z-index: 1;
    -webkit-user-select: none;
    user-select: none;
    box-sizing: border-box;
}

.menu-logo {
    line-height: 0;
    margin: 0 10px;
}

.menu-logo img {
    max-height: 40px;
    max-width: 100px;
    flex-shrink: 0;
}

.menu-container a {
  text-decoration: none;
  color: #232323;
  transition: color 0.3s ease;
}

.menu-container a:hover {
  color: #00C6A7;
}

.menu-container input {
  display: block;
  width: 35px;
  height: 25px;
  margin: 0;
  position: absolute;
  cursor: pointer;
  opacity: 0; /* hide this */
  z-index: 2; /* and place it over the hamburger */
  -webkit-touch-callout: none;
}

/* Burger menu */
.menu-container span {
    display: block;
    width: 33px;
    height: 4px;
    margin-bottom: 5px;
    position: relative;
    background: #cdcdcd;
    border-radius: 3px;
    z-index: 1;
    transform-origin: 4px 0px;
    transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
    background: 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
    opacity: 0.55s ease;
}

.menu-container span:first-child {
  transform-origin: 0% 0%;
}

.menu-container span:nth-child(3) {
  transform-origin: 0% 100%;
}

.menu-container input:checked ~ span {
  opacity: 1;
  transform: rotate(45deg) translate(3px,-1px);
  background: #232323;
}

.menu-container input:checked ~ span:nth-child(4) {
  opacity: 0;
  transform: rotate(0deg) scale(0.2, 0.2);
}

.menu-container input:checked ~ span:nth-child(3) {
  transform: rotate(-45deg) translate(-5px,11px);
}

.menu ul {
  list-style: none;
}

.menu li {
  padding: 10px 0;
  font-size: 22px;
}

/* mobile styles */
@media only screen and (max-width: 767px) { 
  .menu-container {
    flex-direction: column;
    align-items: flex-end;
  }
  
  .menu-logo {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .menu-logo img {
    max-height: 30px;
  }

  .menu {
    position: absolute;
    box-sizing: border-box;
    width: 300px;
    right: -300px;
    top: 0;
    margin: -20px;
    padding: 75px 50px 50px;
    background: #cdcdcd;
    -webkit-font-smoothing: antialiased;
    /* to stop flickering of text in safari */
    transform-origin: 0% 0%;
    transform: translateX(0%);
    transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
  }

  .menu-container input:checked ~ .menu {
    transform: translateX(-100%);
  }
}

/* desktop styles */
@media only screen and (min-width: 768px) { 
  .menu-container {
    width: 100%;
  }

  .menu-container a {
    color: #cdcdcd;
  }

  .menu-container input {
    display: none;
  }

  /* Burger menu */
  .menu-container span {
    display: none;
  }

  .menu {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .menu ul {
    display: flex;
    padding: 0;
  }

  .menu li {
    padding: 0 20px;
  }
}
</style>
