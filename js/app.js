Vue.component('employee', { // employee profile card
  props: ['profile'],

  template: `
    <article class="col s12 m6 l4">
      <div class="card">
        <div class="card-content">
            <a href="#"><img :src="profile.headshot.large" class="activator"></a>
            <a href="#"><h4 class="hide-on-small-only truncate activator">{{ profile.name.first + ' ' + profile.name.last }}</h4></a>
            <a href="#"><h4 class="hide-on-med-and-up truncate activator">{{ profile.name.first }}<br>{{ profile.name.last }}</h4></a>
        </div>
        <div class="card-action">
          <p class="truncate medium">{{ profile.job_title }}</p>
          <p class="truncate small">{{ profile.department }} Department</p>
        </div>
        <div class="card-reveal">
          <span class="card-title">{{ profile.name.first + ' ' + profile.name.last }}<i class="material-icons right">close</i></span>
          <p class="truncate medium">Job Title: {{ profile.job_title }}</p>
          <p class="truncate small">Department: {{ profile.department }}</p>
          <p class="smallest">Phone: {{ profile.phone }}</p>
          <p class="smallest">Email: {{ profile.email }}</p>
          <p class="smallest">Hire Date: {{ profile.date_started }}</p>
          <p class="smallest">Location: {{ profile.location.city + ', ' + profile.location.state }}</p>
          <p class="small skill-heading">Skills:</p>
          <ul class="skills">
            <li v-for="skill in profile.skills">{{ skill.id }}</li>
          </ul>
        </div>
      </div>
    </article>
  `
});

new Vue({ // root Vue instance
  el: 'main',
  data: {
    employeeDirectory: [],
    searchParam: '',
    department: '',
    searchQuery: '',
    id: '',
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
