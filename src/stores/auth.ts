import { defineStore } from "pinia";

interface State {
  accsess_token: string;
  uid: string;
  client: string;
}

export const useUserStore = defineStore({
  id: "user",
  state: (): State => {
    return {
      accsess_token: "",
      uid: "",
      client: "",
    };
  },
  getters: {},
});
