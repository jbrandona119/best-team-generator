$("#document").ready(function () {
  var showManager = function () {
    $(".intern-col").hide();
    $(".engineer-col").hide();
    $(".manager-col").show();
    console.log("manager");
  };
  var showEngineer = function () {
    $(".intern-col").hide();
    $(".engineer-col").show();
    $(".manager-col").hide();
    console.log("engineer");
  };
  var showIntern = function () {
    $(".intern-col").show();
    $(".engineer-col").hide();
    $(".manager-col").hide();
    console.log("intern");
  };
  var showAll = function () {
    $(".intern-col").show();
    $(".engineer-col").show();
    $(".manager-col").show();
    console.log("all");
  };

  $(".btn-manager").on("click", showManager);
  $(".btn-engineer").on("click", showEngineer);
  $(".btn-intern").on("click", showIntern);
  $(".btn-all").on("click", showAll);
});
