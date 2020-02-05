
   $(function(){
    $("#building-type-select").change(function(){
        $("#standard").checked=false;
       
        var test = $("#building-type-select option:selected").text();
     if (test==="residential") {
                   $("#residential-form").css("display", "block");
                   $("#commercial-form").css("display", "none");
                   $("#corporate-form").css("display", "none");
                   $("#hybrid-form").css("display", "none");
    }else if ( test==="commercial" ){
                     $("#residential-form").css("display", "none");
                     $("#commercial-form").css("display", "block");
                     $("#corporate-form").css("display", "none");
                     $("#hybrid-form").css("display", "none");
    }else if ( test==="corporate" ){
                     $("#residential-form").css("display", "none");
                     $("#commercial-form").css("display", "none");
                     $("#corporate-form").css("display", "block");
                     $("#hybrid-form").css("display", "none");
    }else if ( test==="hybrid" ){
                     $("#residential-form").css("display", "none");
                     $("#commercial-form").css("display", "none");
                     $("#corporate-form").css("display", "none");
                     $("#hybrid-form").css("display", "block");
    }else {
                     $("#residential-form").css("display", "none");
                     $("#commercial-form").css("display", "none");
                     $("#corporate-form").css("display", "none");
                     $("#hybrid-form").css("display", "none");
    }
    }); 
    
    $("#fancy-form1 :radio").change(function() {
        var prixInSt = 7565*0.10;
        var prixInPr = 12345*0.13;
        var prixInEx = 15400*0.16;

     if (this.value === "standard") {
         ShowPrice(7565,prixInSt);
                     
    }else if (this.value === "premium") {
     ShowPrice(12345,prixInPr);
                      
    } else if (this.value === "excelium") {
        ShowPrice(15400,prixInEx);
                    
    }else{
     $("#PriceUnit").val("");
    }
                      });

  //show the price Unit & Installation
  var ShowPrice =function( PriceUnit,PriceInsCost){
     var type = $("#building-type-select option:selected").text();
     
      if(type === "residential"){
      var residentialOp = new residentialOpject($("#residential-appartments").val(),$("#residential-stories").val(),$("#residential-basements").val());
                      $("#PriceUnit").val(PriceUnit * residentialOp.NbCages());
                      $("#InstallationCost").val(PriceInsCost * residentialOp.NbCages());
      }else if (type === "commercial") {
         var commercialOp = new commercialObject($("#commercial-stories").val(),$("#corporate-basements").val(),$("#commercial-parking-spaces").val(),$("#commercial-elevator-shafts").val(),$("#commercial-elevator-shafts").val());
                     $("#PriceUnit").val(PriceUnit * parseInt(commercialOp.NbElevatorShafts));
                     $("#InstallationCost").val(PriceInsCost * parseInt(commercialOp.NbElevatorShafts));
      }else if (type === "corporate" ){
          var corporateOp = new corporeteObject($("#corporate-stories").val(),$("#corporate-units").val(),$("#corporate-basements").val(),$("#corporate-parking-spaces").val(),$("#corporate-max-occupants").val());
                          $("#PriceUnit").val(PriceUnit * parseInt(corporateOp.NbCages()));
                          $("#InstallationCost").val(PriceInsCost * parseInt(corporateOp.NbCages()));
      }
      else if (type === "hybrid") {
          
      }
             
  }; 
    
    
});



// information of company
var InfoCompany = function(fullName,Email,phoneNumber,companytName,message,departemet){
    this.fullName =fullName;
    this.Email = Email;
    this.phoneNumber = phoneNumber ;
    this.companytName = companytName;
    this.message = message;
    this.departemet = departemet;

};
//    residentialOpject
var residentialOpject= function(NbAppartements,NbStories,NbBasements){
   this.NbAppartements = NbAppartements;
   this.NbStories = NbStories;
   this.NbBasements = NbBasements;

};
//    nombre de cages function for residetile type
residentialOpject.prototype.NbCages = function(){
            
            var moyenneLogement = this.NbAppartements / (this.NbStories-this.NbBasements);
            var nbAscenseur ;
            if (moyenneLogement % 6 === 0){
                console.log("%6" );
                nbAscenseur = moyenneLogement / 6 ;
            }else{
             console.log("else %6" );
                nbAscenseur = parseInt((moyenneLogement / 6)+1);
            }
            if (this.NbStories <= 20) {
             console.log("<= 20");
                return nbAscenseur;
                
            }else if(this.NbStories % 20 === 0){
             console.log("else <= 20 && % 20 === 0" );
                return parseInt((this.NbStories/20)+1)*nbAscenseur;
            }
            else{
             return (this.NbStories/20)*nbAscenseur;
            }
             return nbAscenseur; 
        };

 //  CommercialObject
var commercialObject = function(  NbStories , NbBasements ,NbParkingSpaces ,NbElevatorShafts ,NbSparateBusinesses){
     this.NbStories =NbStories;
     this.NbBasements = NbBasements;
     this.NbParkingSpaces = NbParkingSpaces;
     this.NbElevatorShafts = NbElevatorShafts;
     this.NbSparateBusinesses = NbSparateBusinesses ;
    

    
};


  

//   corporeteObject
var corporeteObject = function(NbStories,NbUnits,NbBasements,NbParkingSpaces,NbMaxOccupants){
    this.NbStories=NbStories;
    this.NbUnits = NbUnits ;
    this.NbBasements = NbBasements;
    this.NbParkingSpaces=NbParkingSpaces;
    this.NbMaxOccupants = NbMaxOccupants;
};
 //    nombre de cages function for corporete type
 corporeteObject.prototype.NbCages = function(){
             var NbMaxOccupantsTotal = this.NbMaxOccupants * (this.NbStories + this.NbBasements);
             var NbCages = parseInt(NbMaxOccupantsTotal/1000);
             var NbColonnesAscenseurs;
             if (this.NbStories <= 20) {
                 NbColonnesAscenseurs = NbStories/20;
                
            }else if(this.NbStories % 20 === 0){
             console.log("else <= 20 && % 20 === 0" );
                NbColonnesAscenseurs= parseInt((this.NbStories/20)+1);
            }
            else{
             NbColonnesAscenseurs = this.NbStories/20;
            }
             
            return parseInt(NbCages/NbColonnesAscenseurs);

 };

// hybridObject
var hybridObject = function(NbStories,NbUnits,NbBasements,NbParkingSpaces,NbMaxOccupants,NbWorkingHours){
    this.NbStories = NbStories;
    this.NbUnits = NbUnits;
    this.NbBasements =NbBasements;
    this.NbParkingSpaces = NbParkingSpaces
    this.NbMaxOccupants = NbMaxOccupants;
    this.NbWorkingHours = NbWorkingHours;
};
//    nombre de cages function for hybrid type
hybridObject.prototype.NbCages = function(){
             var NbMaxOccupantsTotal = this.NbMaxOccupants * (this.NbStories + this.NbBasements);
             var NbCages = parseInt(NbMaxOccupantsTotal/1000);
             var NbColonnesAscenseurs;
             if (this.NbStories <= 20) {
                 NbColonnesAscenseurs = NbStories/20;
                
            }else if(this.NbStories % 20 === 0){
             console.log("else <= 20 && % 20 === 0" );
                NbColonnesAscenseurs= parseInt((this.NbStories/20))+1;
            }
            else{
             NbColonnesAscenseurs = this.NbStories/20;
            }
             
             return parseInt(NbCages/NbColonnesAscenseurs);


 };
 $("#submitquote").on("click",function(){
     var test = new CommercialObject($("#commercial-stories").val(),$("#corporate-basements").val(),$("#commercial-parking-spaces").val(),$("#commercial-elevator-shafts").val(),$("#commercial-elevator-shafts").val());
      var test1 = new residentialOpject($("#residential-appartments").val(),$("#residential-stories").val(),$("#residential-basements").val());
      var x = test1.NbCages();
       console.log(x);
 });
  







