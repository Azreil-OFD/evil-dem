export default defineNuxtRouteMiddleware((to, from) => {
    const authToken = useCookie('token').value
    const refreshToken = useCookie('refreshToken').value
    
    if (!['/signin', '/signup'].includes(to.path) && (!authToken || !refreshToken)) {
      return navigateTo('/signup')
    }  
})
