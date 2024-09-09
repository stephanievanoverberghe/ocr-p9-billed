import { ROUTES_PATH } from '../constants/routes.js';
export let PREVIOUS_LOCATION = '';

// we use a class so as to test its methods in e2e tests
export default class Login {
  constructor({ document, localStorage, onNavigate, PREVIOUS_LOCATION, store }) {
    this.document = document;
    this.localStorage = localStorage;
    this.onNavigate = onNavigate;
    this.PREVIOUS_LOCATION = PREVIOUS_LOCATION;
    this.store = store;

    // Assigner les routes
    this.routeBills = ROUTES_PATH['Bills'];
    this.routeDashboard = ROUTES_PATH['Dashboard'];

    // Gestion des formulaires
    const formEmployee = this.document.querySelector(`form[data-testid="form-employee"]`);
    if (formEmployee) {
      formEmployee.addEventListener('submit', this.handleSubmitEmployee);
    } else {
      console.error('Employee form not found');
    }

    const formAdmin = this.document.querySelector(`form[data-testid="form-admin"]`);
    if (formAdmin) {
      formAdmin.addEventListener('submit', this.handleSubmitAdmin);
    } else {
      console.error('Admin form not found');
    }
  }

  handleSubmitEmployee = (e) => {
    e.preventDefault();
    const emailInput = e.target.querySelector(`input[data-testid="employee-email-input"]`);
    const passwordInput = e.target.querySelector(`input[data-testid="employee-password-input"]`);

    if (emailInput && passwordInput) {
      const user = {
        type: 'Employee',
        email: emailInput.value,
        password: passwordInput.value,
        status: 'connected',
      };

      this.localStorage.setItem('user', JSON.stringify(user));
      this.login(user)
        .catch((err) => this.createUser(user))
        .then(() => {
          this.onNavigate(this.routeBills);
          this.PREVIOUS_LOCATION = this.routeBills;
          PREVIOUS_LOCATION = this.PREVIOUS_LOCATION;
          this.document.body.style.backgroundColor = '#fff';
        });
    } else {
      console.error('Employee email or password input not found');
    }
  };

  handleSubmitAdmin = (e) => {
    e.preventDefault();
    const emailInput = e.target.querySelector(`input[data-testid="admin-email-input"]`);
    const passwordInput = e.target.querySelector(`input[data-testid="admin-password-input"]`);

    if (emailInput && passwordInput) {
      const user = {
        type: 'Admin',
        email: emailInput.value,
        password: passwordInput.value,
        status: 'connected',
      };

      this.localStorage.setItem('user', JSON.stringify(user));
      this.login(user)
        .catch((err) => this.createUser(user))
        .then(() => {
          this.onNavigate(this.routeDashboard);
          this.PREVIOUS_LOCATION = this.routeDashboard;
          PREVIOUS_LOCATION = this.PREVIOUS_LOCATION;
          this.document.body.style.backgroundColor = '#fff';
        });
    } else {
      console.error('Admin email or password input not found');
    }
  };

  // Gestion de la connexion
  login = (user) => {
    if (this.store) {
      return this.store
        .login(
          JSON.stringify({
            email: user.email,
            password: user.password,
          })
        )
        .then(({ jwt }) => {
          localStorage.setItem('jwt', jwt);
        });
    } else {
      return Promise.reject(new Error('Store is not available'));
    }
  };

  // Création d'un utilisateur s'il n'existe pas
  createUser = (user) => {
    if (this.store) {
      return this.store
        .users()
        .create({
          data: JSON.stringify({
            type: user.type,
            name: user.email.split('@')[0],
            email: user.email,
            password: user.password,
          }),
        })
        .then(() => {
          console.log(`User with ${user.email} is created`);
          return this.login(user);
        });
    } else {
      return Promise.reject(new Error('Store is not available'));
    }
  };
}
