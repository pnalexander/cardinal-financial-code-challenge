// Vue.use(vueRouter);

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
  `,

  methods: {
    // selectedEmployee(id) {
    //   // console.log(this.employeeDirectory.find(employee => employee.id == this.key));
    //   alert(id);
    // }
  }
});

let profile = Vue.component('profile', {
  // props: [],

  data() {
    return {
      // employeeId: ''
    }
  },

  template: `
    <h1>{{ this.$route.params.id}}</h1>
  `
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

  methods: {
    // Define parameters for searchResults() based on user input
    filterResults(searchParam, resultFilters) {
      //
    },

    selectedEmployee(id) {
      // console.log(this.employeeDirectory.find(employee => employee.id == this.key));
      // alert(id);
      console.log(this.key);
    }
  },

  computed: {
    // Search for results with given parameters
    // Returns array
    searchResults() {
      return this.employeeDirectory.filter(employee => (employee.name.first.toLowerCase().includes(this.searchParam.toLowerCase()) || employee.name.last.toLowerCase().includes(this.searchParam.toLowerCase())) && employee.department == this.department);
    }
  },

  mounted() {

    axios.get('https://raw.githubusercontent.com/pnalexander/cardinal-financial-code-challenge/v1/directory.json').then(response => this.employeeDirectory = response.data.results)

  }
});
