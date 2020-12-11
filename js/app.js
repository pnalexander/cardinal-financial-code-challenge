let directory = Vue.component('directory', { // employee info card wrapper. Currently not in use.
  props: ['searchResults'],

  template: `
    <div>
      <employee
        v-for="(employee, index) in searchResults"
        :key="employee.id"
        v-bind:employee-id="employee.id"
        v-bind:job-title="employee.job_title"
        v-bind:full-name="employee.name.first + ' ' + employee.name.last"
        v-bind:first-name="employee.name.first"
        v-bind:last-name="employee.name.last"
        v-bind:department="employee.department"
        v-bind:headshot="employee.headshot.large"
      ></employee>
    </div>
  `
});

Vue.component('employee', { // employee info card
  props: ['employeeId', 'jobTitle', 'fullName', 'firstName', 'lastName', 'department','headshot', 'profile'],

  data() {
    return {
      //
    }
  },

  // template: `
  //   <article class="col s12 m6 l4">
  //     <div class="card">
  //       <div class="card-content">
  //         <router-link :to="/profile/ + employeeId">
  //           <span v-on:hideDirectory="showProfile">
  //           <img :src="headshot">
  //             <h4 class="hide-on-small-only truncate">{{ fullName }}</h4>
  //             <h4 class="hide-on-med-and-up truncate">{{ firstName }}<br>{{ lastName }}</h4>
  //           </span>
  //         </router-link>
  //       </div>
  //       <div class="card-action">
  //         <p class="truncate medium">{{ jobTitle }}</p>
  //         <p class="truncate small">{{ department }} Department</p>
  //       </div>
  //       <div class="card-reveal">
  //         <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
  //         <p>Here is some more information about this product that is only revealed once clicked on.</p>
  //       </div>
  //     </div>
  //   </article>
  // `,

  template: `
    <article class="col s12 m6 l4">
      <div class="card">
        <div class="card-content">
            <a href="#"><img :src="headshot" class="activator"></a>
            <a href="#"><h4 class="hide-on-small-only truncate activator">{{ fullName }}</h4></a>
            <a href="#"><h4 class="hide-on-med-and-up truncate activator">{{ firstName }}<br>{{ lastName }}</h4></a>
        </div>
        <div class="card-action">
          <p class="truncate medium">{{ jobTitle }}</p>
          <p class="truncate small">{{ department }} Department</p>
        </div>
        <div class="card-reveal">
          <span class="card-title">{{ profile.name.first + ' ' + profile.name.last }}<i class="material-icons right">close</i></span>
          <p class="truncate medium">Job Title: {{ jobTitle }}</p>
          <p class="truncate small">Department: {{ department }}</p>
          <p class="smallest">Phone: {{ profile.phone }}</p>
          <p class="smallest">Email: {{ profile.email }}</p>
          <p class="smallest">Hire Date: {{ profile.date_started }}</p>
          <p class="small skill-heading">Skills:</p>
          <ul class="skills">
            <li v-for="skill in profile.skills">{{ skill.id }}</li>
          </ul>
        </div>
      </div>
    </article>
  `,

  methods: {
    showProfile() { // Should emit event that root element can listen for and update isHidden value. Currently not working.
      this.$emit('hide-directory');
    }
  }
});

let profile = Vue.component('profile', { // Employee profile. Presents further employee info once their card is selected. Works, but not as originally intended.
  props: ['profileId'],

  data() {
    return {
      profile: {}
    }
  },

  methods: { // Find the individual employee based on their id (passed via routes)
    getProfile() {
      axios.get('https://raw.githubusercontent.com/pnalexander/cardinal-financial-code-challenge/v1/directory.json').then(response => this.profile = response.data.results.find(profile => profile.id == this.$route.params.id));
    }
  },

  // Starter to verify that data is passed correctly. Eventually, the entire employee profile will live here
  template: `

  <article>
    <h2>{{ this.profile.name.first + ' ' + this.profile.name.last }}</h2>
    <h5>Job Title: {{ this.profile.job_title }}</h5>
    <h6>Department: {{ this.profile.department }}</h6>
  </article>
  `,

  created() { // get the selected employee profile
    this.getProfile();
  }
});

let routes = [
  { // returns default view. Not currently in use.
    path: '/',
    component: directory
  },
  { // returns profile view
    path: '/profile/:id',
    component: profile
  },

];

const router = new VueRouter({
  routes
});


new Vue({ // root Vue instance
  el: 'main',
  router,
  data: {
    employeeDirectory: [],
    searchParam: '',
    department: '',
    searchQuery: '',
    id: '',
    isHidden: false
  },

  methods: {
    directoryHide() { // should fire when an employee name is clicked. Currently not working. Data binding or component communication issue?
      isHidden: true;
    }
  },

  computed: {
    // Search for results with given parameters
    // Returns array
    searchResults() {
      if(this.department != 0) { // search by name and department matching user input
        results = this.employeeDirectory.filter(employee => (employee.name.first.toLowerCase().includes(this.searchParam.toLowerCase()) || employee.name.last.toLowerCase().includes(this.searchParam.toLowerCase()) || (employee.name.first.toLowerCase() + ' ' + employee.name.last.toLowerCase()).includes(this.searchParam.toLowerCase())) && employee.department == this.department)
      }
      else { // search only by name with no further filters. In reality, this just checks for character strings matching user input
        results = this.employeeDirectory.filter(employee => employee.name.first.toLowerCase().includes(this.searchParam.toLowerCase()) || employee.name.last.toLowerCase().includes(this.searchParam.toLowerCase()) || (employee.name.first.toLowerCase() + ' ' + employee.name.last.toLowerCase()).includes(this.searchParam.toLowerCase()))
      }
      return results;
    }
  },

  mounted() { // get dummy information from provided json file and store in employeeDirectory

    // json file is hosted on github due to codepen CORS errors
    axios.get('https://raw.githubusercontent.com/pnalexander/cardinal-financial-code-challenge/v1/directory.json').then(response => this.employeeDirectory = response.data.results)

  }
});
