/*  

Data Manager

*/

let profils = ['USER', 'TEAM_LEADER', 'DIRECTEUR_DES_RESSOURCES_HUMAINES']
let demandes = {
  CONGE_PAYE : {
    id : 'CONGE_PAYE',
    title : 'Congé payé',
    jourPayer : true,
    dates : [
      '2018/11/12'
    ]
  },
  RECUPERATION : {
    id : 'RECUPERATION',
    title : 'Récupération',
    jourPayer : true,
    dates : [
      '2018/11/13'
    ]
  },
  AMENAGEMENT_HORAIRE : {
    id : 'AMENAGEMENT_HORAIRE',
    title : 'Aménagment d\'horaire',
    jourPayer : true,
    dates : [
      '2018/11/14'
    ]
  }, 
  ABSENCE : {
    id : 'ABSENCE',
    title : 'Absence',
    jourPayer : false,
    dates : [
      '2018/11/15'
    ]
  }
}

let copy = obj => JSON.parse(JSON.stringify(obj))
let getData = ()=> JSON.parse(localStorage.getItem('data'))
let setData = a => localStorage.setItem('data', JSON.stringify(a))
let isLogged = false

let checkData = ()=> {
  if (getData() == null){
    setData({
      user : [{
        login : "admin", 
        password : "admin",
        pseudo : "Admin",
        roles : ['USER', 'TEAM_LEADER', 'DIRECTEUR_DES_RESSOURCES_HUMAINES' ],
        contrats : [{
          dateDebut : "2018/11/08",
          dateFin : "2018/11/16",
          demandes : []
        }]
      },{
        login : "user", 
        password : "user",
        pseudo : "User",
        roles : ['USER'],
        contrats : [{
          dateDebut : "2018/11/08",
          dateFin : "2018/11/16",
          demandes : [
          {
            id : 'CONGE_PAYE',
            title : 'Congé payé',
            jourPayer : true,
            dates : [
              '2018/11/12'
            ]
          },{
            id : 'RECUPERATION',
            title : 'Récupération',
            jourPayer : true,
            dates : [
              '2018/11/13'
            ]
          },{
            id : 'AMENAGEMENT_HORAIRE',
            title : 'Aménagment d\'horaire',
            jourPayer : true,
            dates : [
              '2018/11/14'
            ]
          },{
            id : 'ABSENCE',
            title : 'Absence',
            jourPayer : false,
            dates : [
              '2018/11/15'
            ]
          }]
        }]
      }

      ]
    })
  }
}
export default {
  getData : () => getData(),
  setData : obj => setData(obj),
  isLogged : ()=> {
    isLogged = sessionStorage.getItem('user')!=null
    return isLogged
  },
  getLoggedUser : ()=> JSON.parse(sessionStorage.getItem('user')),
  logout : ()=> {
    isLogged = false;
    console.log("datamanager -> isLogged : " + isLogged)
    return sessionStorage.removeItem('user')
  },
  login : (login, password)=> {
    checkData()
    let user = getData().user.find(e=>e.login == login && e.password == password)
    if(user != undefined){
      isLogged = true;
      sessionStorage.setItem('user', JSON.stringify(user))
      console.log("datamanager -> isLogged : " + isLogged)
    }
    return user
  }
}