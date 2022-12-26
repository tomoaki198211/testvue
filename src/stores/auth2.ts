import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")),
    returnUrl: null,
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        const user: any = await axios.post(
          "http://localhost:3000/auth/sign_in",
          {
            email: email,
            password: password,
          }
        );
        this.user = user;
        localStorage.setItem("user", JSON.stringify(user));
        console.log(this.user);
      } catch (error) {
        console.log(error);
      }
    },
    logout(): void {
      const user = JSON.parse(localStorage.getItem("user"));

      axios.delete("http://localhost:3000/auth/sign_out", {
        headers: {
          uid: user.headers.uid,
          "access-token": user.headers.access_token,
          client: user.headers.client,
        },
      });
      this.user = null;
      localStorage.removeItem("user");
    },
  },
});
