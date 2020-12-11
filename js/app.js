Vue.component('employee', {
  props: ['employeeId', 'jobTitle', 'name', 'department','headshot'],

  data() {
    return {
      // employeeId: ''
    }
  },

  template: `
    <article class="uk-card uk-card-default uk-link-toggle uk-width-1-3@m uk-padding-remove">
        <div class="uk-card-body">
          <div class="uk-grid-small uk-flex-middle" uk-grid>
              <div class="uk-width-auto">
                  <img class="uk-border-circle" width="94" height="94" :src="headshot">
              </div>
              <div class="uk-width-expand">
                  <h3 class="uk-card-title uk-link-heading uk-margin-remove-bottom">{{ name }}</h3>
                  <p class="uk-text-meta uk-margin-remove-top uk-margin-remove-bottom">{{ jobTitle }}</p>
                  <p class="uk-text-meta uk-margin-remove-top small">{{ department }} Department</p>
              </div>
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
  {
    path: '/profile/:id',
    component: profile
  }
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
