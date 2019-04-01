<template>
  <div id="app">
   <div class="todaysmatches">
     <h1>Todays Matches</h1>
     <div class="matches">
       <div v-for="(match,index) in todaysMatches" :key="index" class="match">
         <div class="flex">
           <div class="team">
              <h2>{{match.Team}} -- {{match.Team2Votes}} Votes</h2>
              <button @click="voteforteama(match.Team, match.id)">Vote</button>
           </div>
           <div class="team">
              <h2>{{match.Team2}} -- {{match.Team2Votes}} Votes</h2>
              <button @click="voteforteamb(match.Team2, match.id)">Vote</button>
           </div>
         </div>
         <p>Venue: {{match.Venue}}</p>
         <p>Time: {{match.Time}}</p>
       </div>
     </div>
     <div class="teams">
       <div v-for="(team, index) in teams " :key="index" class="team">
         <h2>{{team.name}} ({{team.shortCut}})</h2>
         <h4>{{team.voteCount}} Votes</h4>
         <button @click="voteforteam(team.shortCut)">Vote for {{team.shortCut}}</button>
       </div>
     </div>
   </div>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  data(){
    return{
      todaysMatches: [],
      teams: []
    }
  },
  created(){
    var vm = this;
    var dateObject = new Date();
    var today = dateObject.getDate() + "-" + Number(dateObject.getMonth() + 1)+ "-" + dateObject.getFullYear();
    firebase.firestore().collection("Matches").where("Date", "==", today).onSnapshot((doc)=>{
      vm.todaysMatches = [];
      doc.forEach((match)=>{
        console.log(match.data())
        vm.todaysMatches.push({...match.data(), id: match.id});
      })
    })
    firebase.firestore().collection("Teams").onSnapshot((doc)=>{
      vm.teams = [];
      doc.forEach((team)=>{
        vm.teams.push({...team.data(), id: team.id})
      })
    })
  },
  methods: {
    voteforteama(teamName, id){
      firebase.firestore().collection("Matches").doc(id).get().then((doc)=>{
        var updateObject = {...doc.data()};
        if(updateObject.TeamVotes == undefined){
          updateObject.TeamVotes = 1;
        }else{
          updateObject.TeamVotes = Number(updateObject.TeamVotes + 1);
        }
        firebase.firestore().collection("Matches").doc(id).update(updateObject).then(()=>{
          console.log("Update Succesful")
        })
      })
    },
    voteforteamb(teamName, id){
      firebase.firestore().collection("Matches").doc(id).get().then((doc)=>{
        var updateObject = {...doc.data()};
        if(updateObject.Team2Votes == undefined){
          updateObject.Team2Votes = 1;
        }else{
          updateObject.Team2Votes = Number(updateObject.Team2Votes + 1);
        }
        firebase.firestore().collection("Matches").doc(id).update(updateObject).then(()=>{
          console.log("Update Succesful")
        })
      })
    },
    voteforteam(teamName){var vm = this;
      firebase.firestore().collection("Teams").doc(teamName).get().then((doc)=>{
        var updateObject = doc.data();
        updateObject = {...updateObject, voteCount: updateObject.voteCount+1}
        firebase.firestore().collection("Teams").doc(teamName).set(updateObject).then(()=>{
          vm.$swal("Voted For " + teamName)
        })
      })

    }
  }
}
</script>


<style lang="scss">
  .todaysmatches{
    h1{
      text-align: center;
    }
    .matches{
      .match{
        border: 1px solid black;
        padding: 2em;
        margin: 1em;

        .flex{
          display: flex;
          justify-content: space-between;
          padding: 1em;
        }
        h2{
          text-align: center;
        }
        p{
          font-size: 1.3em;
          text-align: center;
        }
      }
    }
  }

  .teams{
    display: grid;
    grid-template-columns: repeat(4,1fr);
    .team{
      margin: 1em;
      border: 1px solid black;
      padding: 1em;
      h2{
        font-size: 1.5em;
      }
      h4{
        font-size: 1.3em;
      }
    }
  }
</style>
