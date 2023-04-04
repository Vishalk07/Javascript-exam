$(document).ready(function () {
  var arrayObj = [];
  $("#result").click(function () {
    document.getElementById("frm1").reset();
  });
  var Edit;
  var flag = false;
  var table = new DataTable("#tab1");
  $("#submit1").click(function (e) {
    e.preventDefault();
    document.querySelectorAll(".val").forEach((ele) => {
      var input = $(ele).val();
      // This is the jquery object of the input, do what you will
      var pattern = /[+-]?([0-9]*[.])?[0-9]+/;
      if (!pattern.test(ele.value)) {
        ele.nextElementSibling?.remove();
        let errText = document.createElement("p");
        errText.style.color = "red";
        errText.innerHTML = "Please Fill Valid Format ";
        ele.parentNode.appendChild(errText);
        flag = false;
      } else {
        ele.nextElementSibling?.remove();
        flag = true;
      }
    });
    //console.log(flag);
    if (flag) {
      $("#exampleModal").modal("hide");
      obj = {};

      obj.var1 = $("#Val-1").val();
      obj.var2 = $("#Val-2").val();
      obj.Add = $("#Add").is(":checked")
        ? parseInt($("#Val-1").val()) + parseInt($("#Val-2").val())
        : null;
      obj.Sub = $("#Sub").is(":checked")
        ? $("#Val-1").val() - $("#Val-2").val()
        : null;
      obj.Mul = $("#Mul").is(":checked")
        ? $("#Val-1").val() * $("#Val-2").val()
        : null;
      obj.Div = $("#Div").is(":checked")
        ? $("#Val-1").val() / $("#Val-2").val()
        : null;
      obj.btn =
        '<button class="btn btn-info edit">Edit</button>' +
        " " +
        '<button class="btn btn-danger delete">Delete</button>';
      arrayObj.push(obj);
      draw();
      document.getElementById("frm1").reset();
      dt = $("#tab1").DataTable();
      // var convertedIntoArray = [];
      // $("table#tab1 tr").each(function () {
      //   var rowDataArray = [];
      //   var actualData = $(this).find("td");
      //   if (actualData.length > 0) {
      //     actualData.each(function () {
      //       rowDataArray.push($(this).html());
      //     });
      //     convertedIntoArray.push(rowDataArray);
      //   }
      // });
    }
  });

  function draw() {
    $("#tab1").html("");
    table.destroy();
    table = new DataTable("#tab1");
    //debugger ;
    arrayObj.forEach((obj) => {
      obj.Id = arrayObj.indexOf(obj) + 1;
      table.row
        .add([
          obj.Id,
          obj.var1,
          obj.var2,
          obj.Add,
          obj.Sub,
          obj.Mul,
          obj.Div,
          obj.btn,
        ])
        .draw(false);
    });
    // console.log(arrayObj);
  }

  $("#tab1").on("click", ".edit", function () {
    console.log(1);
    $("#exampleModal1").modal("show");
    $("#Val1-1").val($(this).closest("tr").find("td").eq(1).html());
    $("#Val1-2").val($(this).closest("tr").find("td").eq(2).html());
    $(this).closest("tr").find("td").eq(3).text() == ""
      ? $("#Add1").prop("checked", false)
      : $("#Add1").prop("checked", true);
    $(this).closest("tr").find("td").eq(4).text() == ""
      ? $("#Sub1").prop("checked", false)
      : $("#Sub1").prop("checked", true);
    $(this).closest("tr").find("td").eq(5).text() == ""
      ? $("#Mul1").prop("checked", false)
      : $("#Mul1").prop("checked", true);
    $(this).closest("tr").find("td").eq(6).text() == ""
      ? $("#Div1").prop("checked", false)
      : $("#Div1").prop("checked", true);
    Edit = $(this).closest("tr").find("td:first").html();

    $("#submit2").click(function () {
      console.log(Edit);
      objIndex = arrayObj.findIndex((obj) => obj.Id == Edit);
      console.log(arrayObj[objIndex]);
      arrayObj[objIndex].var1 = $("#Val1-1").val();
      arrayObj[objIndex].var2 = $("#Val1-2").val();
      arrayObj[objIndex].Add = $("#Add1").is(":checked")
        ? parseInt($("#Val1-1").val()) + parseInt($("#Val1-2").val())
        : null;
      arrayObj[objIndex].Sub = $("#Sub1").is(":checked")
        ? $("#Val1-1").val() - $("#Val1-2").val()
        : null;
      arrayObj[objIndex].Mul = $("#Mul1").is(":checked")
        ? $("#Val1-1").val() * $("#Val1-2").val()
        : null;
      arrayObj[objIndex].Div = $("#Div1").is(":checked")
        ? $("#Val1-1").val() / $("#Val1-2").val()
        : null;
      arrayObj[objIndex].btn =
        '<button class="btn btn-info edit">Edit</button>' +
        " " +
        '<button class="btn btn-danger delete">Delete</button>';

      console.log(arrayObj);
      draw();
      $("#exampleModal1").modal("hide");
    });
  });

  $("#tab1").on("click", ".delete", function () {
    dt.row($(this).parents("tr")).remove().draw();
    arrayObj.splice($(this).closest("tr").find("td:first").html() - 1, 1);
    console.log(arrayObj);
    draw();
  });
});
