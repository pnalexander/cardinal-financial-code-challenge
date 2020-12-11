// Vue.component('search-form', {
//   props: [],
//
//   template: `
//     <form class="row">
//       <search-input v-model="searchParam"></search-input>
//
//       <div class="input-field col s12 m6">
//         <select v-model="department">
//           <option value="0" diabled selected>Choose Department</option>
//           <option value="Engineering">Engineering</option>
//           <option value="Executive">Executive</option>
//           <option value="Finance">Finance</option>
//           <option value="Marketing">Marketing</option>
//           <option value="Human Resources">Human Resources</option>
//           <option value="Information Technology">Information Technology</option>
//           <option value="Operations">Operations</option>
//           <option value="Sales">Sales</option>
//         </select>
//         <label>Department</label>
//       </div>
//     </form>
//   `
// });
//
// Vue.component('search-input', {
//   props: ['value'],
//
//   template: `
//     <div class="input-field col s12 m6">
//       <input id="searchParam" type="text" v-bind="value" v-on:input="$emit('input', $event.target.value)">
//       <label for="searchParam">Search by Name...</label>
//     </div>
//   `
// });

let directory = Vue.component('directory', {
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

Vue.component('employee', {
  props: ['employeeId', 'jobTitle', 'fullName', 'firstName', 'lastName', 'department','headshot'],

  data() {
    return {
      // employeeId: ''
    }
  },

  template: `
    <article class="col s12 m6 l4">
      <div class="card">
        <div class="card-content">
          <router-link :to="/profile/ + employeeId">
            <img :src="headshot">
            <h4 class="hide-on-small-only truncate">{{ fullName }}</h4>
            <h4 class="hide-on-med-and-up truncate">{{ firstName }}<br>{{ lastName }}</h4>
          </router-link>
        </div>
        <div class="card-action">
          <p class="truncate medium">{{ jobTitle }}</p>
          <p class="truncate small">{{ department }} Department</p>
        </div>
      </div>
    </article>
  `
});

let profile = Vue.component('profile', {
  props: ['profileId'],

  data() {
    return {
      profile: {}
    }
  },

  methods: {
    getProfile() {
      axios.get('https://raw.githubusercontent.com/pnalexander/cardinal-financial-code-challenge/v1/directory.json').then(response => this.profile = response.data.results.find(profile => profile.id == this.$route.params.id));
    }
  },

// <h1>{{ this.profile.name.first + ' ' + this.profile.name.last }}</h1>
  template: `
    <h1>{{ this.profile.name.first + ' ' + this.profile.name.last }}</h1>
  `,

  created() {
    this.getProfile();
  }
});

let routes = [
  {
    path: '/',
    component: directory
  },
  {
    path: '/profile/:id',
    component: profile
  },

];

const router = new VueRouter({
  routes
});


new Vue({
  el: 'main',
  router,
  data: {
    employeeDirectory: [],
    searchParam: '',
    department: '',
    searchQuery: '',
    id: ''
  },

  computed: {
    // Search for results with given parameters
    // Returns array
    searchResults() {
      if(this.department != 0) { // search by name and department
        results = this.employeeDirectory.filter(employee => (employee.name.first.toLowerCase().includes(this.searchParam.toLowerCase()) || employee.name.last.toLowerCase().includes(this.searchParam.toLowerCase()) || (employee.name.first.toLowerCase() + ' ' + employee.name.last.toLowerCase()).includes(this.searchParam.toLowerCase())) && employee.department == this.department)
      }
      else { // search only by name with no further filters
        results = this.employeeDirectory.filter(employee => employee.name.first.toLowerCase().includes(this.searchParam.toLowerCase()) || employee.name.last.toLowerCase().includes(this.searchParam.toLowerCase()) || (employee.name.first.toLowerCase() + ' ' + employee.name.last.toLowerCase()).includes(this.searchParam.toLowerCase()))
      }
      // return this.employeeDirectory.filter(employee => (employee.name.first.toLowerCase().includes(this.searchParam.toLowerCase()) || employee.name.last.toLowerCase().includes(this.searchParam.toLowerCase())) && employee.department == this.department);
      return results;
    }
  },

  mounted() {

    axios.get('https://raw.githubusercontent.com/pnalexander/cardinal-financial-code-challenge/v1/directory.json').then(response => this.employeeDirectory = response.data.results)

  }
});
