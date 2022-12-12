<template>
  <nav class="menu-container">
    <div class="navbar" style="width: 100%; height: 75px; background-color: #232323; margin-bottom: 50px;">
      <h2 class="font-bold text-2xl text-white pt-5 pl-9 mb-3" style="width: 500px;">Joko Kendil Ngecor | Shortener Link</h2>
      <button @click="Logout()" class="bg-gray-500 hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded" style="transition: color 0.3s ease; margin-left: 90%; z-index: 1000; margin-top: -100px;">
              Logout
      </button>
    </div>
  </nav>

  <div class="text-center">
    <input type="text" placeholder="http://domain.com or https://domain.com" class="type rounded" style="width: 500px;" v-model="flink" required/>
    <input required type="text" placeholder="alias" class="alias rounded ml-9" v-model="slink"/>
    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  @click="postLink()">Submit</button>
  </div>
  
  <div class="edit text-center mt-7" v-show="editbar">
    <input type="text" placeholder="new alias" v-model="newLink.newslink" class="rounded"/>
    <input type="text" placeholder="new url" v-model="newLink.newflink" class="rounded"/>
    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="editHandler(newLink.id)">Submit Edit</button>
  </div>
      
  <div class="table-responsive text-center" style="margin-top: 50px; margin-left: 14%;">
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
          <td> <a @click="clickLink()" target="_blank" v-bind:href="'http://127.0.0.1:5173/' + link.slink" style="color: #3F83F8;">Joko.kendil/{{ link.slink }}</a></td>
          <td style="max-width: 500px; word-wrap: break-word; padding-left: 10px;">{{ link.flink }}</td>
          <td scope="row" style="padding-left: 50px; padding-right: 50px;">{{ link.uses }}</td>
          <td><button class="bg-yellow-400 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" @click="editLink(link.id)"> Edit </button></td>
          <td><button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" @click="deleteLink(link.id)"> Delete </button></td>
        </tr>
      </tbody>

    </table>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import { signOut } from "firebase/auth"
import { auth } from '../firebase/firebase.js';

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
          Swal.fire({
                  title: 'Success!',
                  text: `Succesesfully logout`,
                  icon: 'success',
                  timer: 1500,
                  showConfirmButton: false,
                })
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
      // console.log(this.userID)
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
        uid: this.userID,
        uses: 0,
      })
      .then((response) =>{
        Swal.fire({
                  title: 'Success!',
                  text: `Succesesfully add link`,
                  icon: 'success',
                  timer: 1500,
                  showConfirmButton: false,
                })
        console.log(response.data)
        location.reload()
      })
    },
    async deleteLink(id) {
      const res = await axios.delete('http://localhost:3000/link/' + id)
      .then((response)=>{
        Swal.fire({
                  title: 'Success!',
                  text: `Succesesfully delete link`,
                  icon: 'success',
                  timer: 1500,
                  showConfirmButton: false,
                })
        console.log(response.data)
        location.reload()
      })
    },
    async clickLink() {
        const q = query(collection(db, "link"))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((docSnap) => {
          id = docSnap.id
          const docData = docSnap.data()
          updateDoc(doc(db, "link", id))
          console.log(doc.id, " => ", doc.data());
        });
        window.location.reload()
    },
    async editHandler(id) {
      const res = await axios.patch('http://localhost:3000/link/' + id, {
        newflink: this.newLink.newflink,
        newslink: this.newLink.newslink,
      })
      .then((response) => {
        Swal.fire({
                  title: 'Success!',
                  text: `Succesesfully edit link`,
                  icon: 'success',
                  timer: 2000,
                  showConfirmButton: false,
                })
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