export let adminLteConf = {
  skin: 'blue',
  sidebarLeftMenu: [
    { label: 'Home', route: '/', iconClasses: 'fa fa-th' },
    { label: 'Usuarios', route: '/usuarios', iconClasses: 'fa fa-calendar-check-o' },
    { label: 'Especialistas', route: '/especialistas', iconClasses: 'fa fa-people' },
    { label: 'Turnos', route: '/turnos', iconClasses: 'fa fa-calendar-check-o' },
    { label: 'Turnos Especilista', route: '/turnos-especialista', iconClasses: 'fa fa-calendar-check-o' },
    { label: 'Turnos Recepcionista', route: '/turnos-recepcionista', iconClasses: 'fa fa-calendar-check-o' },
  ],
  isSidebarLeftMini: true,
  //isSidebarRightOverContent:false
};
