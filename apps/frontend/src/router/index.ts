import LocationView from '@/views/LocationView.vue'
import EmailConfirmationView from '../views/EmailConfirmationView.vue'
import InstitutionAddressView from '../views/InstitutionAddressView.vue'
import UserView from '../views/UserView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/profile', name: 'User', component: UserView },
    { path: '/confirm-email/:id', name: 'EmailConfirmation', component: EmailConfirmationView },
    { path: '/institution-address/:id', name: 'InstitutionAddress', component: InstitutionAddressView },
    { path: '/map/:id', name: 'Location', component: LocationView },
    {
      path: '/:pathMatch(.*)*',
      redirect: "/profile"
    },
  ],

})

export default router
