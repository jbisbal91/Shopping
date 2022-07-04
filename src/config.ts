export const config = {
  //apiUrl: 'http://ui-lib-demo-api.herokuapp.com',
  apiUrl: 'https://62bb00447bdbe01d529522f4.mockapi.io/api/store',
  authRoles: {
    sa: ['Admin'], // Only Super Admin has access
    admin: ['ProUser', 'Admin'], // Only SA & Admin has access
    editor: ['User', '', ''], // Only SA & Admin & Editor has access
    user: ['SA', 'Admin', 'Editor', 'User'], // Only SA & Admin & Editor & User has access
    guest: ['SA', 'Admin', 'Editor', 'User', 'Guest'] // Everyone has access
  }
}