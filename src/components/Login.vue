<template>
  <div class="q-ml-lg">
    <q-btn-dropdown
      v-if="isLoggedIn"
      flat
      no-caps
    >
      <template #label>
        <div class="row items-center no-wrap">
          <q-avatar>
            <q-icon name="person" />
          </q-avatar>
        </div>
      </template>
      <q-list>
        <q-item v-close-popup>
          <q-item-section>
            <q-item-label>{{ user.username }}</q-item-label>
            <q-item-label caption>{{ user.email }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-close-popup clickable>
          <q-item-section>
            <q-btn class="bg-primary text-white" @click="logout">
              {{ $t('logout') }}
            </q-btn>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>

    <q-btn
      v-else
      outline
      :label="$t('login')"
      class="align-items-center"
      @click="prompt = true"
    />
    <q-dialog v-model="prompt" persistent>
      <q-card style="width: 400px; overflow-x: hidden;">
        <q-card-section>
          <div class="text-h6">{{ $t('login') }}</div>
        </q-card-section>

        <q-card-section class="q-ml-md">
          <q-input
            v-model="user_name"
            class="q-pa-md"
            outlined label="Email"
            :dense="false"
          />
          <q-input
            v-model="password"
            class="q-pa-md" :type="isPwd ? 'password' : 'text'"
            outlined
            label="Password"
            :dense="false"
          >
            <template #append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn v-close-popup flat label="Cancel" />
          <q-btn flat label="Login" :loading="isLoading" @click="login" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import { useQuasar } from 'quasar';

export default {
  name: 'Login',
  setup()
  {
    const $q = useQuasar();
    return {
      loginSuccess()
      {
        $q.notify({
          message: 'Logged in successfully!',
          color: 'green',
          type: 'positive',
          position: 'top'
        });
      },
      loginFail()
      {
        $q.notify({
          message: 'Logged in Failed, Invalid credentials.',
          color: 'red',
          type: 'negative',
          position: 'top'
        });
      }
    };
  },
  data()
  {
    return {
      prompt: false,
      user_name: '',
      password: '',
      isPwd: false,
      isLoading: false,
      isLoggedIn: false,
      user: {
        username: '',
        email: ''
      }
    };
  },
  mounted()
  {
    this.checkUserLogged();
  },
  methods: {
    logout()
    {
      this.isLoggedIn = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    login()
    {
      this.isLoading = true;
      axios.post(process.env.YAWIK_AUTH_URL + '/api/auth/local', {
        identifier: this.user_name,
        password: this.password
      }).then(response =>
      {
        const token = response.data.jwt;
        const user = response.data.user;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.loginSuccess();
        this.prompt = false;
        this.checkUserLogged();
      }).catch(error =>
      {
        console.log(error);
        this.loginFail();
      }).finally(() =>
      {
        this.isLoading = false;
      });
    },
    checkUserLogged()
    {
      const token = localStorage.getItem('token');
      if (token != null)
      {
        this.isLoggedIn = true;
        const storedUser = localStorage.getItem('user');
        if (storedUser)
        {
          const user = JSON.parse(storedUser);
          this.user.username = user.username;
          this.user.email = user.email;
        }
      }
    }
  }
};
</script>

<i18n>
{
  "en":
  {
    "logout": "Logout",
    "login": "Login",
  },
  "de":
  {
    "logout": "Logout",
    "login": "Login",
  },
  "fr":
  {
    "logout": "Logout",
    "login": "Login",

  },
}
</i18n>
