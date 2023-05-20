export default defineNuxtRouteMiddleware((to, from) => {
  const localStorage = process.client ? window.localStorage : null;
  const user = localStorage?.getItem("user");

  //   if (!user) {
  //     return navigateTo("/login");
  //   }
  //   if (user?.role == "USER") {
  //     return navigateTo("/");
  //   }
});
