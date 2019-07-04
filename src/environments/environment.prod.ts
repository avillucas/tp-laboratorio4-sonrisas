
export const environment = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyCiop5VHmLFwjEmAKaPCAJKJBmRJlj-Y_4',
    authDomain: 'sonrisastp-8a3c9.firebaseapp.com',
    databaseURL: 'https://sonrisastp-8a3c9.firebaseio.com',
    projectId: 'sonrisastp-8a3c9',
    storageBucket: 'gs://sonrisastp-8a3c9.appspot.com',
    messagingSenderId: '202373428554',
    appId: '1:202373428554:web:7b80147a04a39969'
  },
  usuarios: [
    { email: 'administrador@test.com', password: 'administrador131313' },
    { email: 'especialista@test.com', password: 'especialista131313' },
    { email: 'recepcionista@test.com', password: 'recepcionista131313' },
    { email: 'cliente@test.com', password: 'cliente131313' },
  ],
  db: {
    usuarios: 'usuarios',
    encuestas: 'encuestas',
    turnos: 'turnos'
  },
  storage: {
    profileFolder: 'profile'
  },
  clinica: {
    tiempoMinimoConsulta: 15,
    lav: {
      inicio: 8,
      fin: 19,
    },
    sab: {
      inicio: 8,
      fin: 14,
    }
  }
};
