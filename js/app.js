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
  // props: [],

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

  template: `
    <h1>{{ this.profile.name.first + ' ' + this.profile.name.last }}</h1>
  `,

  created() {
    this.getProfile();
  }
});

let routes = [
  // {
  //   path: '/',
  //   component: directory
  // },
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
