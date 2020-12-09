Vue.component('employee', {
  props: ['job-title', 'name', 'department','headshot'],

  template: `
    <article class="uk-card uk-card-default">
      <div class="uk-card-media-top">
          <img :src="headshot" alt="">
      </div>
      <div class="uk-card-body">
          <h3 class="uk-card-title">{{ name }}</h3>
          <p>{{ job-title }}</p>
      </div>
    </article>
  `
});


new Vue({
  el: 'main',
  data: {
    employeeDirectory: [],
    searchParam: '',
    department: ''
  },

  methods: {
    // Define parameters for searchResults() based on user input
    filterResults(selectedFilters) {

    }
  },

  computed: {
    // Search for results with given parameters
    // Returns array
    searchResults() {
      // return this.employeeDirectory.filter(employee => employee.name.first == this.searchParam && employee.department == 'Executive');
      return this.employeeDirectory.filter(employee => employee.name.first == this.searchParam && employee.department == this.department);
      // alert(this.searchParam);
    }
  },

  mounted() {

    axios.get('https://raw.githubusercontent.com/pnalexander/cardinal-financial-code-challenge/v1/directory.json').then(response => this.employeeDirectory = response.data.results)

  }
});
