"use strict"
var rooturl = "https://scrumserver.tenobe.org/scrum/api";

function changeURL(sNewRoot){
    rooturl = sNewRoot;
    console.log('root set to : ' + rooturl)
}

window.onload = function () {

    /*
    --------------------------------------
    -- knoppen voor profielen
    --------------------------------------
    */

    document.getElementById('knop1').addEventListener('click', function (e) {
        let url=rooturl+'/profiel/read.php';
        //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api
        fetch(url)
            .then(function (resp)   { return resp.json(); })
            .then(function (data)   { console.log(data);  })
            .catch(function (error) { console.log(error); });
    });

   /* document.getElementById('knop12').addEventListener('click', function (e) {             
        let page =  document.getElementById('input12_1').value;             
        let pageSize =  document.getElementById('input12_2').value;

        let url=rooturl+'/profiel/read.php?page='+page+'&pageSize='+pageSize;
        //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api
        fetch(url)
            .then(function (resp)   { return resp.json(); })
            .then(function (data)   { console.log(data);  })
            .catch(function (error) { console.log(error); });
    });*/

   /* document.getElementById('knop2').addEventListener('click', function (e) {                
        let profielId =  document.getElementById('input2_1').value;

        let url=rooturl+'/profiel/read_one.php?id='+profielId;
        //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api
        fetch(url)
            .then(function (resp)   { return resp.json(); })
            .then(function (data)   { console.log(data);  })
            .catch(function (error) { console.log(error); });


    });*/

    document.getElementById('knop3').addEventListener('click', function (e) {
        let grootte =  document.getElementById('input3_1').value;
        let grootteOperator =  document.getElementById('input3_2').value;
        let orderby =  document.getElementById('input3_3').value;

        let url=rooturl+'/profiel/search.php?grootte='+ grootte + '&grootteOperator='+ grootteOperator + '&orderBy='+ orderby ;
        //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api                
        fetch(url)
            .then(function (resp)   { return resp.json(); })
            .then(function (data)   { console.log(data);  })
            .catch(function (error) { console.log(error); });
    }); 

    document.getElementById('knop4').addEventListener('click', function (e) {
        let voornaam  =  document.getElementById('input4_1').value;

        let url=rooturl+'/profiel/search.php?voornaam='+ voornaam  ;
        //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api                
        fetch(url)
            .then(function (resp)   { return resp.json(); })
            .then(function (data)   { console.log(data);  })
            .catch(function (error) { console.log(error); });
    });

    /*document.getElementById('knop13').addEventListener('click', function (e) {
        let nickname  =  document.getElementById('input13_1').value;
        let fuzzy  =  document.getElementById('input13_2').checked;
        
        let url=rooturl+'/profiel/search.php?voornaam='+ nickname;
        //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api
        if(fuzzy){
            url+='&voornaamFuzzy=1' ;
        }
        
        fetch(url)
            .then(function (resp)   { return resp.json(); })
            .then(function (data)   { console.log(data);  })
            .catch(function (error) { console.log(error); });
    });*/

    document.getElementById('knop5').addEventListener('click', function (e) {
        let geslacht  =  document.getElementById('input5_1').value;

        let url=rooturl+'/profiel/search.php?sexe='+geslacht;
        //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api
        fetch(url)
            .then(function (resp)   { return resp.json(); })
            .then(function (data)   { console.log(data);  })
            .catch(function (error) { console.log(error); });
    });

    /*document.getElementById('knop11').addEventListener('click', function (e) {
        let rangeMinGeboortedatum  =  document.getElementById('input11_1').value;
        let rangeMaxGeboortedatum  =  document.getElementById('input11_2').value;

        let rangeMinGrootte =  document.getElementById('input11_3').value;
        let rangeMaxGrootte =  document.getElementById('input11_4').value;

        let url=rooturl+'/profiel/search.php'
        url+='?geboortedatumOperator=range&rangeMinGeboortedatum='+ rangeMinGeboortedatum +'&rangeMaxGeboortedatum='+ rangeMaxGeboortedatum ;
        url+='&grootteOperator=range&rangeMinGrootte='+ rangeMinGrootte +'&rangeMaxGrootte='+ rangeMaxGrootte ;
        
        //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api
        fetch(url)
            .then(function (resp)   { return resp.json(); })
            .then(function (data)   { console.log(data);  })
            .catch(function (error) { console.log(error); });
    });*/

    document.getElementById('knop6').addEventListener('click', function (e) {
        let geboortedatum  =  document.getElementById('input6_1').value;
        let geboortedatumOperator  =  document.getElementById('input6_2').value;

        let url=rooturl+'/profiel/search.php?geboortedatum='+ geboortedatum + '&geboortedatumOperator='+ geboortedatumOperator;
        //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api
        fetch(url)
            .then(function (resp)   { return resp.json(); })
            .then(function (data)   { console.log(data);  })
            .catch(function (error) { console.log(error); });
    });

   /* document.getElementById('knop7').addEventListener('click', function (e) {  
        let profielId =  document.getElementById('input7_1').value;
        let nieuweVoornaam =  document.getElementById('input7_2').value;

        let url=rooturl+'/profiel/read_one.php?id='+profielId;
        //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api                
        fetch(url)
            .then(function (resp) { return resp.json(); }) //haal de JSON op en stuur die als resultaat van je promise                         
            .then(function (data) {
                //nadat de vorige promise opgelost werd kwamen we in deze procedure tercht
                //hier kunnen we nu , met het resultat (data) van de vorige promise, aan de slag
                //we passen de voornaam aan en sturen ook dit terug zodat deze promise afgesloten kan worden                        
                let urlUpdate=rooturl+'/profiel/update.php';

                data['voornaam']=nieuweVoornaam; 

                var request = new Request(urlUpdate, {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                });
                fetch(request)
                    .then(function (resp)   { return resp.json(); })
                    .then(function (data)   { console.log(data);  })
                    .catch(function (error) { console.log(error); });



            })
            .catch(function (error) {
                console.log(error);
            });
    });*/

    /*document.getElementById('knop8').addEventListener('click', function (e) {  
        let url=rooturl+'/profiel/create.php';
        //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api
        let quotes=["Chuck Norris can divide by zero.",
        "Chuck Norris can kill two stones with one bird.",
        "Outer space exists because it's afraid to be on the same planet with Chuck Norris.",
        "Chuck Norris counted to infinity ... three times.",
        "Chuck Norris can slam a revolving door.",
        "There is no theory of evolution. Just a list of creatures Chuck Norris has allowed to live.",
        "Chuck Norris is so fast, he can run around the world and punch himself in the back of the head.",
        "If you have five dollars and Chuck Norris has five dollars, Chuck Norris has more money than you."];

        let min = 0;
        let max = quotes.length-1;
        let rndIndex = Math.floor(Math.random() * (max - min + 1) + min);

        let data = {
            familienaam: "Norris",
            voornaam: "Chuck" ,
            geboortedatum: "0001-01-01",
            email: "me@Chuck.Norris",
            nickname: "The Chuck" + Date.now(),
            foto: "no_picture.jpg",
            beroep: "Moviestar",
            sexe: "x",
            haarkleur: "brown",
            oogkleur: "blue",
            grootte: "1095",
            gewicht: "",
            wachtwoord: "iamgod",
            metadata: quotes[rndIndex],
            lovecoins: "1000000"
        }

        var request = new Request(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        
        fetch(request)
            .then( function (resp)  { return resp.json(); })
            .then( function (data)  { console.log(data);  })
            .catch(function (error) { console.log(error); });

    });*/

    /*document.getElementById('knop9').addEventListener('click', function (e) {  
        let profielId =  document.getElementById('input9_1').value;

        let url=rooturl+'/profiel/delete.php';
        //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api
        let data = {
            id: profielId
        }

        var request = new Request(url, {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        
        fetch(request)
            .then( function (resp)  { return resp.json(); })
            .then( function (data)  { console.log(data);  })
            .catch(function (error) { console.log(error); });
    });*/

    /*document.getElementById('knop10').addEventListener('click', function (e) {  
        let nickname =  document.getElementById('input10_1').value; 
        let wachtwoord =  document.getElementById('input10_2').value;

        let url=rooturl+'/profiel/authenticate.php';
        //LET OP : rooturl = https://scrumserver.tenobe.org/scrum/api
        let data = {
            nickname: nickname,
            wachtwoord: wachtwoord
        }

        var request = new Request(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        
        fetch(request)
            .then( function (resp)  { return resp.json(); })
            .then( function (data)  { console.log(data);  })
            .catch(function (error) { console.log(error); });
    });*/
}

